#!/usr/bin/env node
/**
 * MERGE ROBIN HOOD DATA INTO COMPLETE UNIT CARD
 * 
 * Combines unit card + curriculum data into one self-contained file.
 * Each chapter gets its own story, vocab, comprehension, grammar/language,
 * informational text, and writing/journal prompt.
 */

const fs = require('fs');

console.log('📦 Merging Robin Hood data into complete unit card...\n');

// Load both files
const unitCard = JSON.parse(fs.readFileSync('./book-data/robin-hood-unit-card.json', 'utf-8'));
const curriculum = JSON.parse(fs.readFileSync('./book-data/robin-hood-curriculum-complete.json', 'utf-8'));

// Create complete unit card with all data
const completeUnitCard = {
  unitInfo: unitCard.unitInfo,
  lessonMapping: unitCard.lessonMapping,
  bedrockSpineCompatibility: unitCard.bedrockSpineCompatibility,
  chapters: []
};

// Merge data for each chapter
for (let i = 0; i < unitCard.chapters.length; i++) {
  const chapter = unitCard.chapters[i];
  const chapterNum = chapter.number;
  const day = chapterNum; // Assuming 1:1 mapping (chapter 1 = day 1, etc.)
  
  // Find matching curriculum data BY DAY (not chapter)
  const grammar = curriculum.grammarLessons.find(g => g.day === day);
  const language = curriculum.languageLessons.find(l => l.day === day);
  const infoText = curriculum.informationalTexts.find(t => t.day === day);
  const writing = curriculum.writingPrompts.find(w => w.day === day);
  const journal = curriculum.journalPrompts.find(j => j.day === day);
  
  // Build complete chapter object
  const completeChapter = {
    number: chapter.number,
    day: day,
    title: chapter.title,
    summary: chapter.summary,
    
    // Story text
    text: chapter.text,
    
    // Vocabulary (3 words for 6th grade)
    vocabulary: chapter.vocabulary.slice(0, 3),
    
    // Reading comprehension (3 questions)
    comprehension: chapter.comprehension,
    
    // Grammar OR Language (alternates odd/even)
    grammar: grammar || null,
    language: language || null,
    
    // Informational text
    informationalText: infoText || null,
    
    // Writing OR Journal (alternates Mon/Wed vs Tue/Thu)
    writingPrompt: writing || null,
    journalPrompt: journal || null
  };
  
  completeUnitCard.chapters.push(completeChapter);
}

// Add summary stats
completeUnitCard.stats = {
  totalChapters: completeUnitCard.chapters.length,
  totalVocabulary: completeUnitCard.chapters.reduce((sum, ch) => sum + ch.vocabulary.length, 0),
  totalComprehension: completeUnitCard.chapters.reduce((sum, ch) => sum + ch.comprehension.length, 0),
  grammarLessons: completeUnitCard.chapters.filter(ch => ch.grammar).length,
  languageLessons: completeUnitCard.chapters.filter(ch => ch.language).length,
  informationalTexts: completeUnitCard.chapters.filter(ch => ch.informationalText).length,
  writingPrompts: completeUnitCard.chapters.filter(ch => ch.writingPrompt).length,
  journalPrompts: completeUnitCard.chapters.filter(ch => ch.journalPrompt).length
};

// Write complete unit card
fs.writeFileSync('./book-data/robin-hood-complete-unit-card.json', JSON.stringify(completeUnitCard, null, 2), 'utf-8');

console.log('✅ Complete unit card created!');
console.log(`📄 Saved to: book-data/robin-hood-complete-unit-card.json\n`);

console.log('📊 Summary:');
console.log(`   • ${completeUnitCard.stats.totalChapters} chapters (complete with all data)`);
console.log(`   • ${completeUnitCard.stats.totalVocabulary} vocabulary words`);
console.log(`   • ${completeUnitCard.stats.totalComprehension} comprehension questions`);
console.log(`   • ${completeUnitCard.stats.grammarLessons} grammar lessons`);
console.log(`   • ${completeUnitCard.stats.languageLessons} language lessons`);
console.log(`   • ${completeUnitCard.stats.informationalTexts} informational texts`);
console.log(`   • ${completeUnitCard.stats.writingPrompts} writing prompts`);
console.log(`   • ${completeUnitCard.stats.journalPrompts} journal prompts`);
console.log('');
console.log('🎯 Each chapter now contains:');
console.log('   - Story text');
console.log('   - Vocabulary (3 words)');
console.log('   - Comprehension questions (3)');
console.log('   - Grammar OR Language lesson');
console.log('   - Informational text');
console.log('   - Writing OR Journal prompt');
console.log('');
console.log('🚀 Ready to generate 24 complete HTML lessons!');
