const fs = require('fs');

// Read chapters
const chaptersText = fs.readFileSync('book-data/wizard-of-oz-complete.txt', 'utf8');
const chapterSplits = chaptersText.split(/Chapter \d+: /);
const chapters = [];

for (let i = 1; i < chapterSplits.length; i++) {
  const lines = chapterSplits[i].split('\n').filter(l => l.trim());
  const title = lines[0];
  chapters.push({ number: i, title: title });
}

console.log('Chapters in text file:');
chapters.slice(0, 5).forEach(ch => {
  console.log('  Chapter', ch.number + ':', ch.title);
});
console.log(' ', '...', chapters.length, 'total\n');

// Check comprehension data
const wizard = JSON.parse(fs.readFileSync('book-data/wizard-of-oz-unit-card.json', 'utf8'));
console.log('Comprehension references (first 5):');
wizard.comprehension.slice(0, 5).forEach(c => {
  console.log('  Day', c.day + ':', c.chapter);
});

console.log('\n❌ Mismatch! Comprehension has "Chapter X" but text file has titles.');
console.log('Solution: Use chapter NUMBER instead of chapter NAME');
