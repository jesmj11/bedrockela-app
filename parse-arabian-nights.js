// Parse Arabian Nights content into unit card JSON
const fs = require('fs');

// Read the text files
const storyText = fs.readFileSync('/Users/mushu/Desktop/BedrockELA/7th ela/arabian-nights-complete.txt', 'utf8');
const vocabText = fs.readFileSync('/Users/mushu/Desktop/BedrockELA/7th ela/arabian-nights-vocab-questions.txt', 'utf8');

// Split into chapters
const chapters = [];
const chapterMatches = storyText.split(/\nChapter \d+\n/).slice(1);
const titleMatches = storyText.match(/Chapter \d+\n([^\n]+)/g);

// Parse vocab and questions
const vocabSections = vocabText.split(/\n\nChapter \d+\n/).slice(1);

for (let i = 0; i < 24; i++) {
  const chapterNum = i + 1;
  const title = titleMatches && titleMatches[i] ? titleMatches[i].replace(/Chapter \d+\n/, '').trim() : `Chapter ${chapterNum}`;
  const text = chapterMatches[i] ? chapterMatches[i].trim() : '';
  
  // Parse vocabulary and questions from the vocab file
  const vocabSection = vocabSections[i] || '';
  
  // Extract vocabulary words
  const vocab = [];
  const vocabPattern = /([a-z]+)\s+—\s+([^\.]+\.[^\n]*)/gi;
  let vocabMatch;
  while ((vocabMatch = vocabPattern.exec(vocabSection)) !== null && vocab.length < 3) {
    vocab.push({
      word: vocabMatch[1].trim(),
      definition: vocabMatch[2].trim()
    });
  }
  
  // Extract comprehension questions
  const questions = [];
  const questionPattern = /\d+\.\s+([^\n]+(?:\n(?![A-D]\)|Answer:)[^\n]+)*)\n([A-D]\).*?\n)+Answer:\s*([A-D])/gi;
  let qMatch;
  while ((qMatch = questionPattern.exec(vocabSection)) !== null && questions.length < 2) {
    const questionText = qMatch[1].trim();
    const answers = qMatch[0].match(/([A-D])\)\s*([^\n]+)/g) || [];
    const correctAnswer = qMatch[3].trim();
    
    const options = answers.map(a => {
      const match = a.match(/([A-D])\)\s*(.+)/);
      return match ? match[2].trim() : '';
    });
    
    questions.push({
      question: questionText,
      type: "multiple-choice",
      options: options,
      correct: correctAnswer,
      standard: "RL.7.1"
    });
  }
  
  chapters.push({
    number: chapterNum,
    title: title,
    text: text,
    vocabulary: vocab,
    comprehension: questions
  });
}

// Create the unit card
const unitCard = {
  title: "Tales from the Arabian Nights",
  grade: 7,
  book: 1,
  totalDays: 30,
  theme: "Who You Want to Be vs. Who You Actually Are",
  description: "A YA adaptation of One Thousand and One Nights exploring identity, wisdom, and the power of storytelling",
  chapters: chapters
};

// Write to JSON file
fs.writeFileSync('book-data/arabian-nights-unit-card.json', JSON.stringify(unitCard, null, 2));
console.log(`✅ Created Arabian Nights unit card with ${chapters.length} chapters`);
console.log(`📖 Chapters: ${chapters.map(c => c.title).join(', ')}`);
console.log(`📝 Total vocabulary words: ${chapters.reduce((sum, c) => sum + c.vocabulary.length, 0)}`);
console.log(`❓ Total questions: ${chapters.reduce((sum, c) => sum + c.comprehension.length, 0)}`);
