#!/usr/bin/env node

/**
 * Parse 3rd Grade Vocabulary & Comprehension files
 * Extracts vocab words and questions from text files and updates unit card JSONs
 */

const fs = require('fs');
const path = require('path');

// Book mappings (filename prefix -> unit card name)
const bookMappings = {
  '12-dancing-princesses': '3rd-grade-the-twelve-dancing-princesses',
  'cinderella': '3rd-grade-cinderella',
  'elvesshowmaker': '3rd-grade-the-elves-and-the-shoemaker',
  'frog-prince': '3rd-grade-the-frog-prince',
  'hanselgretel': '3rd-grade-hansel-and-gretel',
  'heidi': '3rd-grade-heidi',
  'jack-and-beanstalk': '3rd-grade-jack-and-the-beanstalk',
  'rapunzel': '3rd-grade-rapunzel',
  'snowqueen-': '3rd-grade-the-snow-queen',
  'thumbelina-': '3rd-grade-thumbelina',
  'uglyduckling-': '3rd-grade-the-ugly-duckling',
  'velveteen-rabbit-': '3rd-grade-the-velveteen-rabbit'
};

function parseVocabCompFile(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const chapters = [];
  
  // Split by chapter headers
  const chapterMatches = content.split(/Chapter \d+:/);
  
  for (let i = 1; i < chapterMatches.length; i++) {
    const chapterText = chapterMatches[i];
    const chapterNum = i;
    
    // Extract vocabulary section
    const vocabMatch = chapterText.match(/Vocabulary Words\s+([\s\S]*?)(?=Comprehension Questions|$)/);
    const vocab = [];
    
    if (vocabMatch) {
      const vocabText = vocabMatch[1];
      // Match patterns like "1. word - definition" or "• 1. word - definition"
      const vocabLines = vocabText.match(/\d+\.\s+(\w+)\s+-\s+(.+?)(?=\n|$)/g);
      
      if (vocabLines) {
        vocabLines.forEach(line => {
          const match = line.match(/\d+\.\s+(\w+)\s+-\s+(.+)/);
          if (match) {
            vocab.push({
              word: match[1].trim(),
              definition: match[2].trim()
            });
          }
        });
      }
    }
    
    // Extract comprehension questions
    const compMatch = chapterText.match(/Comprehension Questions\s+([\s\S]*?)(?=Chapter \d+:|Discussion Questions|Writing Prompts|$)/);
    const questions = [];
    
    if (compMatch) {
      const compText = compMatch[1];
      // Split by bullet points or numbered items
      const lines = compText.split('\n').filter(line => line.trim().length > 0);
      
      lines.forEach(line => {
        // Match patterns: "1. Question?" or "• 1. Question?"
        const match = line.match(/[•\s]*\d+\.\s+(.+?)$/);
        if (match) {
          const question = match[1].trim();
          if (question.length > 10 && question.includes('?')) {
            questions.push(question);
          }
        }
      });
    }
    
    chapters.push({
      chapter: chapterNum,
      vocab,
      questions
    });
  }
  
  return chapters;
}

function updateUnitCard(unitCardFile, chapters) {
  const unitCard = JSON.parse(fs.readFileSync(unitCardFile, 'utf-8'));
  
  // Update vocabulary lessons (days 1-12, non-assessment days)
  chapters.forEach((chapterData, idx) => {
    if (idx < 12 && unitCard.vocabularyLessons[idx]) {
      unitCard.vocabularyLessons[idx].words = chapterData.vocab.map(v => ({
        word: v.word,
        definition: v.definition
      }));
    }
  });
  
  // Update comprehension questions (days 1-12)
  chapters.forEach((chapterData, idx) => {
    if (idx < 12 && unitCard.comprehensionQuestions[idx]) {
      // 3rd grade gets 2 questions per lesson
      unitCard.comprehensionQuestions[idx].questions = chapterData.questions.slice(0, 2).map(q => ({
        type: 'short-answer',
        question: q
      }));
    }
  });
  
  return unitCard;
}

// Main execution
console.log('Parsing 3rd Grade Vocabulary & Comprehension Files...\n');

let processed = 0;
let failed = 0;

Object.entries(bookMappings).forEach(([filePrefix, unitCardName]) => {
  const vocabCompFile = path.join(__dirname, `${filePrefix}-vocab-comp.txt`);
  const unitCardFile = path.join(__dirname, `${unitCardName}-unit-card.json`);
  
  try {
    if (!fs.existsSync(vocabCompFile)) {
      console.log(`❌ Missing: ${vocabCompFile}`);
      failed++;
      return;
    }
    
    if (!fs.existsSync(unitCardFile)) {
      console.log(`❌ Missing: ${unitCardFile}`);
      failed++;
      return;
    }
    
    console.log(`Processing: ${unitCardName}...`);
    
    const chapters = parseVocabCompFile(vocabCompFile);
    const updatedCard = updateUnitCard(unitCardFile, chapters);
    
    // Save updated unit card
    fs.writeFileSync(unitCardFile, JSON.stringify(updatedCard, null, 2));
    
    console.log(`✅ Updated ${unitCardName}`);
    console.log(`   - ${chapters.length} chapters parsed`);
    console.log(`   - ${chapters.reduce((sum, ch) => sum + ch.vocab.length, 0)} vocab words`);
    console.log(`   - ${chapters.reduce((sum, ch) => sum + ch.questions.length, 0)} questions\n`);
    
    processed++;
  } catch (error) {
    console.error(`❌ Error processing ${unitCardName}:`, error.message);
    failed++;
  }
});

console.log(`\n=== Summary ===`);
console.log(`✅ Processed: ${processed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📚 Total: ${Object.keys(bookMappings).length} books`);
