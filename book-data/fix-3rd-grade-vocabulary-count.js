#!/usr/bin/env node

/**
 * Fix 3rd Grade Vocabulary Count
 * Change from 3 words to 2 words per lesson (Bedrock Spine standard)
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing 3rd Grade Vocabulary Count (3 → 2 words)...\n');

const unitCards = fs.readdirSync(__dirname).filter(f => 
  f.startsWith('3rd-grade-') && f.endsWith('-unit-card.json')
);

let fixed = 0;

unitCards.forEach(filename => {
  const unitCard = JSON.parse(fs.readFileSync(path.join(__dirname, filename), 'utf-8'));
  
  let changed = false;
  
  // Fix vocabulary lessons - keep only first 2 words
  unitCard.vocabularyLessons.forEach(lesson => {
    if (lesson.words && lesson.words.length > 2) {
      lesson.words = lesson.words.slice(0, 2);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(unitCard, null, 2));
    console.log(`✅ ${unitCard.title} - Reduced to 2 words per lesson`);
    fixed++;
  }
});

console.log(`\n🎉 Fixed ${fixed} unit cards!`);
console.log('✅ All 3rd grade lessons now have 2 vocabulary words (Bedrock Spine compliant)');
