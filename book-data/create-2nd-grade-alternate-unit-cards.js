#!/usr/bin/env node

/**
 * Create 2nd Grade Alternate Unit Cards
 * Parses complete story files and creates unit card JSONs
 */

const fs = require('fs');
const path = require('path');

const books = [
  {
    file: 'mr-jeremy-fisher-complete.txt',
    title: 'The Tale of Mr. Jeremy Fisher',
    bookNumber: 'ALT-1',
    theme: 'adventure and humility',
    quarter: 4
  },
  {
    file: 'peter-rabbit-complete.txt',
    title: 'The Tale of Peter Rabbit',
    bookNumber: 'ALT-2',
    theme: 'consequences and obedience',
    quarter: 4
  },
  {
    file: 'thumbelina-complete.txt',
    title: 'Thumbelina',
    bookNumber: 'ALT-3',
    theme: 'perseverance and kindness',
    quarter: 4
  },
  {
    file: 'puss-in-boots-complete.txt',
    title: 'Puss in Boots',
    bookNumber: 'ALT-4',
    theme: 'cleverness and loyalty',
    quarter: 4
  },
  {
    file: 'little-match-girl-complete.txt',
    title: 'The Little Match Girl',
    bookNumber: 'ALT-5',
    theme: 'compassion and hope',
    quarter: 4
  }
];

function parseChapters(content) {
  const chapters = [];
  
  // Split by chapter headers
  const chapterSections = content.split(/Chapter \d+:/);
  
  for (let i = 1; i < chapterSections.length; i++) {
    const section = chapterSections[i];
    const chapterNum = i;
    
    // Extract chapter title
    const titleMatch = section.match(/^([^\n]+)/);
    const title = titleMatch ? titleMatch[1].trim() : `Chapter ${chapterNum}`;
    
    // Extract story text (everything before "Chapter X Vocabulary")
    const storyMatch = section.match(/([\s\S]*?)(?=Chapter \d+ Vocabulary|$)/);
    const story = storyMatch ? storyMatch[1].trim() : '';
    
    // Extract vocabulary
    const vocabMatch = section.match(/Chapter \d+ Vocabulary\s+([\s\S]*?)(?=Chapter \d+ Comprehension|$)/);
    const vocab = [];
    
    if (vocabMatch) {
      const vocabText = vocabMatch[1];
      const vocabLines = vocabText.match(/\d+\.\s+(\w+)\s+-\s+(.+?)(?=\n|$)/g);
      
      if (vocabLines) {
        vocabLines.forEach(line => {
          const match = line.match(/\d+\.\s+(\w+)\s+-\s+(.+)/);
          if (match) {
            vocab.push({
              word: match[1].trim(),
              definition: match[2].trim(),
              sentence: `From ${title}`
            });
          }
        });
      }
    }
    
    // Extract comprehension questions
    const compMatch = section.match(/Chapter \d+ Comprehension Questions\s+([\s\S]*?)(?=Chapter \d+:|$)/);
    const questions = [];
    
    if (compMatch) {
      const compText = compMatch[1];
      const questionBlocks = compText.split(/\d+\.\s+/).filter(q => q.trim().length > 10);
      
      questionBlocks.forEach(block => {
        const lines = block.split('\n').filter(l => l.trim().length > 0);
        if (lines.length >= 4) {
          const question = lines[0].trim();
          const options = [];
          
          for (let j = 1; j < lines.length; j++) {
            const opt = lines[j].trim().replace(/^[•\-]\s*/, '');
            if (opt.length > 0) {
              options.push(opt);
            }
          }
          
          if (options.length >= 3) {
            questions.push({
              type: 'multiple-choice',
              question: question,
              options: options.slice(0, 3),
              correct: 1 // Default to middle option
            });
          }
        }
      });
    }
    
    chapters.push({
      number: chapterNum,
      title: title,
      story: story,
      vocab: vocab.slice(0, 2), // 2 words per chapter for 2nd grade
      questions: questions.slice(0, 2) // 2 questions per chapter
    });
  }
  
  return chapters;
}

function createUnitCard(book, chapters) {
  const totalChapters = chapters.length;
  const totalDays = totalChapters + 2; // 6 chapters + 2 assessment days = 8 days
  
  const unitCard = {
    title: book.title,
    bookNumber: book.bookNumber,
    gradeLevel: 2,
    totalDays: totalDays,
    totalChapters: totalChapters,
    assessmentDays: [totalChapters + 1, totalChapters + 2],
    structure: `${totalChapters} chapters across ${totalChapters} lessons, 2 assessment day(s)`,
    theme: book.theme,
    quarter: book.quarter,
    vocabularyLessons: [],
    comprehensionQuestions: [],
    informationalTexts: [],
    grammarLessons: [],
    languageLessons: [],
    writingPrompts: [],
    journalPrompts: [],
    assessmentWords: []
  };
  
  // Build lessons from chapters
  chapters.forEach((chapter, idx) => {
    const day = idx + 1;
    
    // Vocabulary
    unitCard.vocabularyLessons.push({
      day: day,
      chapter: chapter.number,
      words: chapter.vocab
    });
    
    // Comprehension
    unitCard.comprehensionQuestions.push({
      day: day,
      chapter: chapter.number,
      questions: chapter.questions
    });
    
    // Informational text topics
    unitCard.informationalTexts.push({
      day: day,
      topic: `About ${chapter.title}`,
      title: '',
      content: ''
    });
    
    // Grammar (odd days 1, 3, 5)
    if (day % 2 === 1) {
      const grammarTopics = ['Nouns', 'Verbs', 'Adjectives'];
      unitCard.grammarLessons.push({
        day: day,
        topic: grammarTopics[Math.floor(day / 2) % 3],
        content: ''
      });
      
      unitCard.writingPrompts.push({
        day: day,
        prompt: `Write about a time like in ${book.title}.`
      });
    }
    
    // Language (even days 2, 4, 6)
    if (day % 2 === 0) {
      const languageTopics = ['ABC Order', 'Rhyming Words', 'Opposites'];
      unitCard.languageLessons.push({
        day: day,
        topic: languageTopics[Math.floor(day / 2) - 1],
        content: ''
      });
      
      unitCard.journalPrompts.push({
        day: day,
        prompt: `What do you think will happen next?`
      });
    }
  });
  
  // Assessment words (empty for now)
  unitCard.assessmentWords.push({
    week: 1,
    day: totalChapters + 1,
    words: []
  });
  unitCard.assessmentWords.push({
    week: 2,
    day: totalChapters + 2,
    words: []
  });
  
  return unitCard;
}

// Main execution
console.log('Creating 2nd Grade Alternate Unit Cards...\n');

let created = 0;

books.forEach(book => {
  const filePath = path.join(__dirname, book.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Missing: ${book.file}`);
    return;
  }
  
  console.log(`Processing: ${book.title}...`);
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const chapters = parseChapters(content);
  const unitCard = createUnitCard(book, chapters);
  
  // Save unit card
  const outputName = `2nd-grade-alternate-${book.bookNumber.toLowerCase()}-${book.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-unit-card.json`;
  const outputPath = path.join(__dirname, outputName);
  
  fs.writeFileSync(outputPath, JSON.stringify(unitCard, null, 2));
  
  console.log(`✅ Created ${outputName}`);
  console.log(`   - ${chapters.length} chapters`);
  console.log(`   - ${chapters.reduce((sum, ch) => sum + ch.vocab.length, 0)} vocab words`);
  console.log(`   - ${chapters.reduce((sum, ch) => sum + ch.questions.length, 0)} questions\n`);
  
  created++;
});

console.log(`\n=== Summary ===`);
console.log(`✅ Created: ${created} alternate unit cards`);
