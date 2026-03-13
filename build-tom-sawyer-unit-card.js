const fs = require('fs');

// Load existing Tom Sawyer data
const chapters = JSON.parse(fs.readFileSync('book-data/tom-sawyer-adapted-chapters.json', 'utf8'));
const vocab = JSON.parse(fs.readFileSync('book-data/tom-sawyer-adapted-vocab.json', 'utf8'));
const questions = JSON.parse(fs.readFileSync('book-data/tom-sawyer-adapted-questions.json', 'utf8'));
const grammar = JSON.parse(fs.readFileSync('book-data/tom-sawyer-grammar.json', 'utf8'));
const language = JSON.parse(fs.readFileSync('book-data/tom-sawyer-language.json', 'utf8'));

// Create complete unit card structure
const unitCard = {
  unitInfo: {
    title: "The Adventures of Tom Sawyer",
    subtitle: "A BedrockELA Adaptation",
    originalAuthor: "Mark Twain (1876)",
    adaptation: "Adapted for 6th Grade Readers",
    totalChapters: 24,
    gradeLevel: "6th Grade",
    compatibleGrades: ["6th", "7th", "8th"],
    genre: "Classic American Fiction",
    themes: [
      "Childhood and Growing Up",
      "Friendship and Loyalty",
      "Adventure and Freedom",
      "Social Justice",
      "Small-town American Life"
    ],
    totalLessons: 24,
    vocabularyWords: 72,
    totalQuestions: 72,
    estimatedWeeks: 5,
    created: new Date().toISOString()
  },
  
  lessonMapping: {
    daysPerLesson: 1,
    assessmentDays: [5, 10, 15, 20, 24],
    totalDays: 24,
    weeks: 5,
    note: "This unit card can be inserted into Days 1-24 of any 6th-8th grade pocket"
  },
  
  bedrockSpineCompatibility: {
    structure: "11-page Bedrock Spine",
    pages: [
      "1. Title Page",
      "2. Welcome & Objectives",
      "3. Vocabulary (3 words for 6th grade)",
      "4. Vocabulary Matching Game",
      "5-7. Story (split into 3 parts)",
      "8. Reading Comprehension (3 questions)",
      "9. Grammar OR Language (alternates)",
      "10. Informational Text + 3 Questions",
      "11. Writing OR Journal (alternates)"
    ],
    grammarDays: [1, 3, 6, 8, 11, 13, 16, 18, 21, 23],
    languageDays: [2, 4, 7, 9, 12, 14, 17, 19, 22, 24],
    assessmentDays: [5, 10, 15, 20],
    note: "This 24-lesson unit follows Bedrock Spine structure"
  },
  
  chapters: [],
  
  stats: {
    totalWords: 0,
    avgWordsPerChapter: 0,
    totalVocabulary: 72,
    totalGrammarLessons: 12,
    totalLanguageLessons: 12
  }
};

// Merge all data into chapters array
for (let i = 1; i <= 24; i++) {
  const chapterNum = i.toString();
  const chapter = chapters[chapterNum];
  const vocabArray = vocab[chapterNum] || [];
  const questionSet = questions[chapterNum] || {};
  
  // Get grammar or language lesson for this day
  const grammarLesson = grammar[chapterNum] || null;
  const languageLesson = language[chapterNum] || null;
  
  // Format comprehension questions
  const comprehension = [];
  if (questionSet.multipleChoice) {
    questionSet.multipleChoice.forEach(q => {
      comprehension.push({
        question: q.text,
        options: q.options,
        answer: ""
      });
    });
  }
  if (questionSet.shortAnswer) {
    comprehension.push({
      question: questionSet.shortAnswer,
      answer: ""
    });
  }
  
  const lessonData = {
    number: i,
    day: i,
    title: chapter.title,
    summary: chapter.summary || "",
    text: chapter.text,
    
    vocabulary: vocabArray.map(w => ({
      word: w.word,
      definition: w.definition,
      partOfSpeech: w.partOfSpeech || ""
    })),
    
    comprehension: comprehension,
    
    grammar: grammarLesson,
    language: languageLesson,
    
    informationalText: {
      title: chapter.informationalTitle || "Life Along the Mississippi in 1840s Missouri",
      text: chapter.informationalText || "Historical context for this chapter.",
      questions: chapter.informationalQuestions || []
    },
    
    writingPrompt: chapter.writingPrompt || `Reflect on the events of Chapter ${i}. What do you think Tom learned?`,
    journalPrompt: chapter.journalPrompt || `How would you have reacted in Tom's situation?`
  };
  
  unitCard.chapters.push(lessonData);
  if (chapter.text) {
    unitCard.stats.totalWords += chapter.text.split(/\s+/).length;
  }
}

unitCard.stats.avgWordsPerChapter = Math.round(unitCard.stats.totalWords / 24);

// Write to file
fs.writeFileSync(
  'book-data/tom-sawyer-complete-unit-card.json',
  JSON.stringify(unitCard, null, 2)
);

console.log('✅ Tom Sawyer complete unit card created!');
console.log(`📊 Stats: ${unitCard.stats.totalWords} total words, ${unitCard.stats.avgWordsPerChapter} avg per chapter`);
console.log(`📚 24 chapters, ${unitCard.chapters.reduce((sum, ch) => sum + ch.vocabulary.length, 0)} vocab words, ${unitCard.chapters.reduce((sum, ch) => sum + ch.comprehension.length, 0)} questions`);
console.log(`📝 Grammar lessons: ${Object.keys(grammar).length}, Language lessons: ${Object.keys(language).length}`);
