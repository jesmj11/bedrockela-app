const fs = require('fs');

console.log('🔧 Fixing Wizard of Oz unit card property names...');

const unitCard = JSON.parse(fs.readFileSync('book-data/wizard-of-oz-unit-card.json', 'utf8'));

// Rename properties to match what the generator expects
unitCard.grammar = unitCard.grammarLessons;
unitCard.language = unitCard.languageSkills;
unitCard.writing = unitCard.writingPrompts;
unitCard.journal = unitCard.journalPrompts;

// Remove old property names
delete unitCard.grammarLessons;
delete unitCard.languageSkills;
delete unitCard.writingPrompts;
delete unitCard.journalPrompts;

// Also ensure vocabulary and comprehension use "day" not "chapter"
if (unitCard.vocabulary && unitCard.vocabulary[0].chapter) {
  unitCard.vocabulary = unitCard.vocabulary.map((v, index) => ({
    day: index + 1,
    word1: v.word1,
    word2: v.word2
  }));
}

if (unitCard.comprehension && unitCard.comprehension[0].chapter) {
  unitCard.comprehension = unitCard.comprehension.map((c, index) => ({
    day: index + 1,
    chapter: c.chapter,
    questions: c.questions
  }));
}

// Save fixed unit card
fs.writeFileSync('book-data/wizard-of-oz-unit-card.json', JSON.stringify(unitCard, null, 2));

console.log('✓ Fixed property names');
console.log('✓ Grammar:', unitCard.grammar ? unitCard.grammar.length : 0);
console.log('✓ Language:', unitCard.language ? unitCard.language.length : 0);
console.log('✓ Writing:', unitCard.writing ? unitCard.writing.length : 0);
console.log('✓ Journal:', unitCard.journal ? unitCard.journal.length : 0);
console.log('✓ Vocabulary:', unitCard.vocabulary ? unitCard.vocabulary.length : 0);
console.log('✓ Comprehension:', unitCard.comprehension ? unitCard.comprehension.length : 0);
console.log('\n✅ Unit card ready for generator!');
