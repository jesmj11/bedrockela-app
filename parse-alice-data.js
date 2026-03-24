#!/usr/bin/env node
/**
 * Parse Alice in Wonderland vocab and comprehension files, add to unit card
 * Days 151-180 - FINAL 4TH GRADE UNIT!
 */

const fs = require('fs');

// Read files
const vocabText = fs.readFileSync('./book-data/alice-vocab.txt', 'utf-8');
const compText = fs.readFileSync('./book-data/alice-comp.txt', 'utf-8');
const unitCard = JSON.parse(fs.readFileSync('./book-data/alice-unit-card.json', 'utf-8'));

// Parse vocabulary (2 words per chapter, 24 chapters, Days 151-174, skipping assessment days)
const vocabulary = [];
const vocabChapters = vocabText.split(/Chapter \d+:/g).slice(1); // Skip intro

const dayMap = [
  151, 152, 153, 154, // Week 31 (Day 155 assessment)
  156, 157, 158, 159, // Week 32 (Day 160 assessment)
  161, 162, 163, 164, // Week 33 (Day 165 assessment)
  166, 167, 168, 169, // Week 34 (Day 170 assessment)
  171, 172, 173, 174, // Week 35 (Day 175 assessment)
  176, 177, 178, 179  // Week 36 (Day 180 assessment)
];

vocabChapters.forEach((chapterText, idx) => {
  const day = dayMap[idx];
  if (!day) return;
  
  const words = [];
  // Split by word entries (each starts with a word in lowercase followed by definition)
  const wordBlocks = chapterText.split(/\n\n(?=[a-z]+\s+\()/g);
  
  wordBlocks.forEach(block => {
    const lines = block.trim().split('\n');
    if (lines.length < 3) return;
    
    const wordLine = lines[0].trim();
    const defLine = lines[1].trim();
    
    // Extract word (before the part of speech)
    const wordMatch = wordLine.match(/^([a-z\s-]+)\s+\(/);
    if (!wordMatch) return;
    const word = wordMatch[1].trim();
    
    // Extract definition
    const definition = defLine;
    
    // Extract sentence (starts with "From the story:")
    let sentence = '';
    for (let i = 2; i < lines.length; i++) {
      if (lines[i].startsWith('From the story:')) {
        sentence = lines[i].replace('From the story:', '').trim();
        break;
      }
    }
    
    words.push({ word, definition, sentence });
  });
  
  if (words.length > 0) {
    vocabulary.push({ day, words });
  }
});

// Parse comprehension (2 questions per chapter: 1 MC + 1 SA)
const comprehension = [];
const compChapters = compText.split(/Chapter \d+:/g).slice(1);

compChapters.forEach((chapterText, idx) => {
  const day = dayMap[idx];
  if (!day) return;
  
  const lines = chapterText.trim().split('\n');
  const chapterTitle = lines[0].trim();
  
  const questions = [];
  let currentQ = null;
  let options = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for question number
    if (/^[12]\.\s/.test(line)) {
      // Save previous question
      if (currentQ) {
        if (options.length > 0) {
          // MC question
          const answerLine = lines[i + options.length + 1];
          let answer = 0;
          if (answerLine && answerLine.startsWith('Answer:')) {
            answer = parseInt(answerLine.match(/\d+/)[0]) - 1;
          }
          questions.push({
            type: 'mc',
            question: currentQ,
            options: options.map(o => o.replace(/^[A-D]\)\s*/, '')),
            answer
          });
          options = [];
        } else {
          // SA question
          questions.push({
            type: 'sa',
            question: currentQ
          });
        }
      }
      
      // Start new question
      currentQ = line.replace(/^[12]\.\s/, '');
    }
    // Check for MC options
    else if (/^[A-D]\)/.test(line)) {
      options.push(line);
    }
  }
  
  // Save last question
  if (currentQ) {
    if (options.length > 0) {
      questions.push({
        type: 'mc',
        question: currentQ,
        options: options.map(o => o.replace(/^[A-D]\)\s*/, '')),
        answer: 1 // Default to B
      });
    } else {
      questions.push({
        type: 'sa',
        question: currentQ
      });
    }
  }
  
  if (questions.length > 0) {
    comprehension.push({ day, chapter: chapterTitle, questions });
  }
});

// Add to unit card
unitCard.vocabulary = vocabulary;
unitCard.comprehension = comprehension;

// Write updated unit card
fs.writeFileSync('./book-data/alice-unit-card.json', JSON.stringify(unitCard, null, 2), 'utf-8');

console.log('✅ Added vocabulary and comprehension to Alice unit card!');
console.log(`   - Vocabulary: ${vocabulary.length} days`);
console.log(`   - Comprehension: ${comprehension.length} days`);
console.log('   - FINAL 4TH GRADE UNIT CARD COMPLETE!');
console.log('\n🎯 Ready to generate the last 30 lessons!');
