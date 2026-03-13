const fs = require('fs');

// Read all Sherlock files
const path = "/Users/mushu/Desktop/BedrockELA/8th ela/sherlock";
const file1 = fs.readFileSync(`${path}/Sherlock_Holmes_Chapters_1-6.md`, 'utf8');
const file2 = fs.readFileSync(`${path}/Sherlock_Holmes_Chapters_7-12.md`, 'utf8');
const file3 = fs.readFileSync(`${path}/Sherlock_Holmes_Final_Chapters_13-24.md`, 'utf8');
const vocabFile = fs.readFileSync(`${path}/Sherlock_Holmes_Complete_Vocabulary.md`, 'utf8');

const allText = file1 + '\n\n' + file2 + '\n\n' + file3;

// Parse chapters (format: # Chapter 1: Title)
const chapters = [];
const chapterMatches = allText.matchAll(/# Chapter (\d+):\s*([^\n]+)\n([\s\S]*?)(?=# Chapter \d+|$)/gi);

for (const match of chapterMatches) {
  const num = parseInt(match[1]);
  const title = match[2].trim();
  const text = match[3].trim();
  
  if (num >= 1 && num <= 24) {
    chapters.push({
      number: num,
      title: title,
      text: text
    });
  }
}

console.log(`✅ Parsed ${chapters.length} chapters`);

// Parse vocabulary (format: ### **Chapter N: Title**  followed by numbered list)
const vocab = {};
const chapterVocabMatches = vocabFile.matchAll(/### \*\*Chapter (\d+):[^*]+\*\*\n([\s\S]*?)(?=###|$)/gi);

for (const match of chapterVocabMatches) {
  const chapterNum = parseInt(match[1]);
  const vocabText = match[2];
  
  const words = [];
  const wordMatches = vocabText.matchAll(/\d+\.\s+\*\*([^*]+)\*\*\s+-\s+([^\n]+)/g);
  
  for (const wordMatch of wordMatches) {
    words.push({
      word: wordMatch[1].trim().toLowerCase(),
      partOfSpeech: "varies",
      definition: wordMatch[2].trim()
    });
  }
  
  vocab[chapterNum] = words;
}

console.log(`✅ Parsed vocabulary for ${Object.keys(vocab).length} chapters`);

// Create unit card
const unitCard = {
  unitInfo: {
    title: "The Adventures of Sherlock Holmes",
    subtitle: "A BedrockELA Adaptation",
    originalAuthor: "Sir Arthur Conan Doyle (1892)",
    adaptation: "Adapted for 8th Grade Readers",
    totalChapters: 24,
    gradeLevel: "8th Grade",
    compatibleGrades: ["8th"],
    genre: "Detective Fiction / Mystery",
    themes: [
      "Deductive Reasoning and Logic",
      "Observation and Evidence",
      "Justice and Morality",
      "Victorian Society",
      "Science vs. Intuition"
    ],
    totalLessons: 24,
    vocabularyWords: Object.values(vocab).flat().length,
    totalQuestions: 72,
    estimatedWeeks: 5,
    created: new Date().toISOString()
  },
  
  lessonMapping: {
    daysPerLesson: 1,
    assessmentDays: [5, 10, 15, 20, 24],
    totalDays: 24,
    weeks: 5,
    note: "This unit card can be inserted into Days 61-75 of 8th grade"
  },
  
  bedrockSpineCompatibility: {
    structure: "11-page Bedrock Spine",
    pages: [
      "1. Title Page",
      "2. Welcome & Objectives",
      "3. Vocabulary (5 words per chapter)",
      "4. Vocabulary Matching Game",
      "5-7. Story (split into 3 parts)",
      "8. Reading Comprehension (3 questions)",
      "9. Grammar OR Language (alternates)",
      "10. Informational Text + 3 Questions",
      "11. Writing OR Journal (alternates)"
    ],
    grammarDays: [1, 3, 6, 8, 11, 13],
    languageDays: [2, 4, 7, 9, 12, 14],
    assessmentDays: [5, 10, 15],
    note: "15-lesson unit for Days 61-75"
  },
  
  chapters: [],
  
  stats: {
    totalWords: 0,
    avgWordsPerChapter: 0,
    totalVocabulary: 0,
    totalGrammarLessons: 8,
    totalLanguageLessons: 7
  }
};

// Build chapters
chapters.forEach(chapter => {
  const chapterVocab = vocab[chapter.number] || [];
  
  const lessonData = {
    number: chapter.number,
    day: chapter.number,
    title: chapter.title,
    summary: "",
    text: chapter.text,
    
    vocabulary: chapterVocab,
    
    comprehension: [
      {
        question: `What is the main mystery in ${chapter.title}?`,
        answer: ""
      },
      {
        question: `How does Holmes use observation and deduction to solve the case?`,
        answer: ""
      },
      {
        question: `What does this chapter reveal about Holmes's methods or character? Use evidence from the text.`,
        answer: ""
      }
    ],
    
    grammar: null,
    language: null,
    
    informationalText: {
      title: "Victorian Detective Fiction",
      text: "Informational text to be added.",
      questions: []
    },
    
    writingPrompt: `Reflect on Holmes's detective methods in ${chapter.title}. How could you apply observation and logic to solve problems in your own life?`,
    journalPrompt: `How does Holmes's approach to problem-solving compare to how you solve problems?`
  };
  
  unitCard.chapters.push(lessonData);
  unitCard.stats.totalWords += chapter.text.split(/\s+/).length;
});

unitCard.stats.avgWordsPerChapter = Math.round(unitCard.stats.totalWords / chapters.length);
unitCard.stats.totalVocabulary = Object.values(vocab).flat().length;

// Write to file
fs.writeFileSync('book-data/sherlock-complete-unit-card.json', JSON.stringify(unitCard, null, 2));

console.log('\n✅ Sherlock Holmes unit card created!');
console.log(`📊 ${unitCard.stats.totalWords} words, ${unitCard.stats.avgWordsPerChapter} avg/chapter`);
console.log(`📚 ${chapters.length} chapters, ${unitCard.stats.totalVocabulary} vocab words`);
