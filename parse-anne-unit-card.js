// Parse Anne of Green Gables into unit card JSON
const fs = require('fs');

const chaptersText = fs.readFileSync('book-data/anne-chapters-raw.txt', 'utf8');
const qvText = fs.readFileSync('book-data/anne-qv-raw.txt', 'utf8');

// Split into chapters
const chapterSections = chaptersText.split(/\n\nChapter \d+\n\n/).slice(1);
const chapterTitles = chaptersText.match(/Chapter \d+\n\n([^\n]+)/g).map(m => m.replace(/Chapter \d+\n\n/, ''));

// Split Q&V into chapters
const qvSections = qvText.split(/\n\nChapter \d+\n\n/).slice(1);

const unitCard = {
  title: "Anne of Green Gables by L.M. Montgomery",
  grade: 7,
  book: 2,
  totalDays: 30,
  theme: "Who You Want to Be vs. Who You Actually Are",
  description: "A YA adaptation exploring identity, belonging, and the power of imagination",
  chapters: []
};

for (let i = 0; i < Math.min(chapterSections.length, 24); i++) {
  const chapterNum = i + 1;
  const title = chapterTitles[i];
  const text = chapterSections[i].trim();
  
  // Parse vocabulary and questions from Q&V section
  const qvSection = qvSections[i] || '';
  
  // Extract vocabulary (3 words)
  const vocabMatches = qvSection.matchAll(/(\w+)\s+—\s+(.+?)(?=\n\n|\n\w+\s+—|COMPREHENSION)/gs);
  const vocabulary = [];
  for (const match of vocabMatches) {
    vocabulary.push({
      word: match[1].trim(),
      definition: match[2].trim()
    });
  }
  
  // Extract questions
  const questionMatches = qvSection.matchAll(/\d+\.\s+(.+?)\n\nA\)(.+?)\n\nB\)(.+?)\n\nC\)(.+?)(?:\n\nD\)(.+?))?\n\nAnswer:\s+([A-D])/gs);
  const comprehension = [];
  for (const match of questionMatches) {
    const options = [
      match[2].trim(),
      match[3].trim(),
      match[4].trim()
    ];
    if (match[5]) options.push(match[5].trim());
    
    comprehension.push({
      question: match[1].trim(),
      type: "multiple-choice",
      options: options,
      correct: match[6].trim(),
      standard: "RL.7.1"
    });
  }
  
  unitCard.chapters.push({
    number: chapterNum,
    title: title,
    text: text,
    vocabulary: vocabulary.slice(0, 3), // Ensure exactly 3
    comprehension: comprehension.slice(0, 2) // Ensure exactly 2
  });
}

// Save unit card
fs.writeFileSync(
  'book-data/anne-green-gables-unit-card.json',
  JSON.stringify(unitCard, null, 2)
);

console.log(`\n✅ Anne of Green Gables Unit Card Created!`);
console.log(`   Title: ${unitCard.title}`);
console.log(`   Chapters: ${unitCard.chapters.length}`);
console.log(`   Total vocabulary: ${unitCard.chapters.reduce((sum, ch) => sum + ch.vocabulary.length, 0)}`);
console.log(`   Total questions: ${unitCard.chapters.reduce((sum, ch) => sum + ch.comprehension.length, 0)}`);
console.log(`   File: book-data/anne-green-gables-unit-card.json\n`);
