// Parse 2nd & 3rd grade books from text files into complete unit cards
// Combines chapter texts with unit card metadata

const fs = require('fs');

// Helper: Parse chapter text file into chapters array
function parseChapterText(textContent, gradeLevel) {
  const chapters = [];
  const chapterRegex = /Chapter (\d+):(.*?)(?=Chapter \d+:|$)/gs;
  
  let match;
  while ((match = chapterRegex.exec(textContent)) !== null) {
    const chapterNum = parseInt(match[1]);
    const chapterContent = match[2].trim();
    
    // Extract chapter title (first line after chapter number)
    const titleMatch = chapterContent.match(/^(.+?)(?:\n|Page)/);
    const title = titleMatch ? titleMatch[1].trim() : `Chapter ${chapterNum}`;
    
    // Extract pages (text between "Page X" markers)
    const pageRegex = /Page \d+\n(.*?)(?=Page \d+|Chapter \d+ Vocabulary|$)/gs;
    let pages = [];
    let pageMatch;
    while ((pageMatch = pageRegex.exec(chapterContent)) !== null) {
      pages.push(pageMatch[1].trim());
    }
    
    // Extract vocabulary
    const vocabMatch = chapterContent.match(/Chapter \d+ Vocabulary\n([\s\S]*?)(?=Chapter \d+ Comprehension|$)/);
    const vocabText = vocabMatch ? vocabMatch[1].trim() : '';
    const vocabLines = vocabText.split('\n').filter(l => l.trim());
    const vocabulary = [];
    
    for (let i = 0; i < vocabLines.length; i++) {
      const line = vocabLines[i].trim();
      if (line.match(/^\d+\./)) {
        const [word, def] = line.replace(/^\d+\.\s*/, '').split(' - ');
        if (word && def) {
          vocabulary.push({
            word: word.trim(),
            definition: def.trim(),
            sentence: `"${word.trim()}" is used in this chapter.`
          });
        }
      }
    }
    
    // Extract comprehension questions
    const compMatch = chapterContent.match(/Chapter \d+ Comprehension Questions\n([\s\S]*?)$/);
    const compText = compMatch ? compMatch[1].trim() : '';
    const questions = [];
    const qRegex = /\d+\.\s*(.+?)\n\s*•\s*(.+?)\n\s*•\s*(.+?)\n\s*•\s*(.+?)(?=\n\d+\.|$)/gs;
    
    let qMatch;
    while ((qMatch = qRegex.exec(compText)) !== null) {
      questions.push({
        question: qMatch[1].trim(),
        options: [
          qMatch[2].trim(),
          qMatch[3].trim(),
          qMatch[4].trim()
        ]
      });
    }
    
    // Combine pages into chapter text
    const text = pages.join('\n\n');
    
    chapters.push({
      number: chapterNum,
      title,
      text,
      vocabulary,
      comprehension: questions.length > 0 ? questions : [
        { question: 'What happened in this chapter?' },
        { question: 'What did you learn?' }
      ]
    });
  }
  
  return chapters;
}

// Process 2nd grade books
console.log('🏗️  Parsing 2nd grade books...\n');

const secondGradeBooks = [];
for (let i = 1; i <= 24; i++) {
  const bookNum = i.toString().padStart(2, '0');
  const unitCardPath = `book-data/2nd-grade-book-${bookNum}-`;
  
  // Find the unit card file
  const files = fs.readdirSync('book-data');
  const unitCardFile = files.find(f => f.startsWith(`2nd-grade-book-${bookNum}-`) && f.endsWith('-unit-card.json'));
  
  if (!unitCardFile) {
    console.log(`⚠️  Book ${bookNum}: Unit card not found`);
    continue;
  }
  
  // Find the chapter text file
  const textFile = files.find(f => f.startsWith(`book-${bookNum}-`) && f.endsWith('-complete.txt'));
  
  if (!textFile) {
    console.log(`⚠️  Book ${bookNum}: Text file not found`);
    continue;
  }
  
  try {
    // Load unit card
    const unitCard = JSON.parse(fs.readFileSync(`book-data/${unitCardFile}`, 'utf8'));
    
    // Load and parse chapter text
    const chapterText = fs.readFileSync(`book-data/${textFile}`, 'utf8');
    const chapters = parseChapterText(chapterText, 2);
    
    // Merge chapters with unit card metadata
    chapters.forEach((chapter, idx) => {
      const day = idx + 1;
      const vocabLesson = unitCard.vocabularyLessons?.find(v => v.day === day);
      const compLesson = unitCard.comprehensionQuestions?.find(c => c.day === day);
      const infoText = unitCard.informationalTexts?.find(i => i.day === day);
      const grammar = unitCard.grammarLessons?.find(g => g.day === day);
      const language = unitCard.languageLessons?.find(l => l.day === day);
      const writing = unitCard.writingPrompts?.find(w => w.day === day);
      const journal = unitCard.journalPrompts?.find(j => j.day === day);
      
      // Add metadata from unit card
      chapter.informationalText = infoText || {
        title: 'Did You Know?',
        text: `This story teaches important lessons about ${unitCard.themes?.join(', ') || 'friendship and kindness'}.`,
        question: 'What lesson can you learn from this chapter?'
      };
      
      chapter.writingPrompt = writing || {
        prompt: 'Write about what happened in this chapter. Use details from the story.'
      };
      
      chapter.journalPrompt = journal || {
        prompt: 'How would you feel if you were in this story? Write about your thoughts.'
      };
    });
    
    // Create complete unit card
    const completeCard = {
      unitInfo: {
        book: unitCard.title,
        author: unitCard.author || 'Traditional',
        grade: 2
      },
      chapters
    };
    
    // Save complete unit card
    const outputFile = `book-data/2nd-grade-book-${bookNum}-complete-unit-card.json`;
    fs.writeFileSync(outputFile, JSON.stringify(completeCard, null, 2));
    
    console.log(`✅ Book ${bookNum}: ${unitCard.title} (${chapters.length} chapters)`);
    secondGradeBooks.push({ bookNum, file: outputFile, dayCount: chapters.length });
    
  } catch (error) {
    console.log(`❌ Book ${bookNum}: Error - ${error.message}`);
  }
}

console.log(`\n✅ Parsed ${secondGradeBooks.length} books for 2nd grade\n`);

// Process 3rd grade books
console.log('🏗️  Parsing 3rd grade books...\n');

const thirdGradeBooks = [
  'cinderella',
  'hansel-and-gretel',
  'heidi',
  'jack-and-the-beanstalk',
  'rapunzel',
  'the-elves-and-the-shoemaker',
  'the-frog-prince',
  'the-snow-queen',
  'the-twelve-dancing-princesses',
  'the-ugly-duckling',
  'the-velveteen-rabbit',
  'thumbelina'
];

const thirdGradeComplete = [];

thirdGradeBooks.forEach((bookSlug, idx) => {
  const unitCardFile = `3rd-grade-${bookSlug}-unit-card.json`;
  
  // Find chapter text file
  const textFiles = fs.readdirSync('book-data');
  const textFile = textFiles.find(f => 
    f.includes(bookSlug) && 
    (f.endsWith('-chapters.txt') || f.includes('12-chapters') || f.includes('15-chapters'))
  );
  
  if (!textFile) {
    console.log(`⚠️  ${bookSlug}: Text file not found`);
    return;
  }
  
  try {
    // Load unit card
    const unitCard = JSON.parse(fs.readFileSync(`book-data/${unitCardFile}`, 'utf8'));
    
    // Load and parse chapter text
    const chapterText = fs.readFileSync(`book-data/${textFile}`, 'utf8');
    const chapters = parseChapterText(chapterText, 3);
    
    // Merge with unit card metadata
    chapters.forEach((chapter, chIdx) => {
      const day = chIdx + 1;
      const vocabLesson = unitCard.vocabularyLessons?.find(v => v.day === day);
      const compQuestions = unitCard.comprehensionQuestions?.find(c => c.day === day);
      const infoText = unitCard.informationalTexts?.find(i => i.day === day);
      const writing = unitCard.writingPrompts?.find(w => w.day === day);
      const journal = unitCard.journalPrompts?.find(j => j.day === day);
      
      chapter.informationalText = infoText || {
        title: 'Did You Know?',
        text: `This classic tale explores themes of ${unitCard.themes?.join(', ') || 'courage and kindness'}.`,
        question: 'What lesson can you learn from this story?'
      };
      
      chapter.writingPrompt = writing || {
        prompt: 'Write about the most important event in this chapter. Explain why it matters.'
      };
      
      chapter.journalPrompt = journal || {
        prompt: 'What would you do if you were the main character? Explain your thinking.'
      };
    });
    
    // Create complete unit card
    const completeCard = {
      unitInfo: {
        book: unitCard.title,
        author: unitCard.author || 'Traditional',
        grade: 3
      },
      chapters
    };
    
    // Save complete unit card
    const outputFile = `book-data/3rd-grade-${bookSlug}-complete-unit-card.json`;
    fs.writeFileSync(outputFile, JSON.stringify(completeCard, null, 2));
    
    console.log(`✅ ${unitCard.title} (${chapters.length} chapters)`);
    thirdGradeComplete.push({ bookSlug, file: outputFile, dayCount: chapters.length });
    
  } catch (error) {
    console.log(`❌ ${bookSlug}: Error - ${error.message}`);
  }
});

console.log(`\n✅ Parsed ${thirdGradeComplete.length} books for 3rd grade`);
console.log(`\n🎉 Total: ${secondGradeBooks.length + thirdGradeComplete.length} books ready to build!`);
