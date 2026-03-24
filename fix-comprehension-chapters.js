const fs = require('fs');

console.log('🔧 Fixing comprehension chapter references...');

const unitCard = JSON.parse(fs.readFileSync('book-data/wizard-of-oz-unit-card.json', 'utf8'));

// Fix: Each day should reference the SAME chapter number
unitCard.comprehension = unitCard.comprehension.map((c, index) => ({
  day: index + 1,
  chapter: index + 1,  // Changed from 'Chapter X' string to just the number
  questions: c.questions
}));

fs.writeFileSync('book-data/wizard-of-oz-unit-card.json', JSON.stringify(unitCard, null, 2));

console.log('✓ Fixed', unitCard.comprehension.length, 'comprehension entries');
console.log('✓ Day 1 → Chapter 1');
console.log('✓ Day 2 → Chapter 2');
console.log('✓ etc.');
console.log('\n✅ Ready to generate!');
