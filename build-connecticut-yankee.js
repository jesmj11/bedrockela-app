const fs = require('fs');

// Read raw files
const chaptersRaw = fs.readFileSync('book-data/connecticut-yankee-raw.txt', 'utf8');
const vocabRaw = fs.readFileSync('book-data/connecticut-yankee-vocab-raw.txt', 'utf8');
const questionsRaw = fs.readFileSync('book-data/connecticut-yankee-questions-raw.txt', 'utf8');

// Parse chapters (same pattern as 20K Leagues)
function parseChapters(text) {
  const chapters = {};
  const chapterMatches = text.matchAll(/CHAPTER (\d+)\n([^\n]+)\n([\s\S]*?)(?=CHAPTER \d+|$)/g);
  
  for (const match of chapterMatches) {
    const num = parseInt(match[1]);
    const title = match[2].trim();
    const content = match[3].trim();
    
    if (num <= 24) {
      chapters[num] = {
        number: num,
        title: title,
        text: content
      };
    }
  }
  
  return chapters;
}

// Parse vocabulary
function parseVocab(text) {
  const vocab = {};
  const chapterMatches = text.matchAll(/CHAPTER (\d+)\n[^\n]+\n\n([\s\S]*?)(?=CHAPTER \d+|$)/g);
  
  for (const match of chapterMatches) {
    const num = parseInt(match[1]);
    const content = match[2];
    
    if (num <= 24) {
      const words = [];
      const wordMatches = content.matchAll(/(\d+)\.\s+([A-Z]+)\s+\(([^)]+)\)\s+—\s+([^\n]+)/g);
      
      for (const wordMatch of wordMatches) {
        words.push({
          word: wordMatch[2].toLowerCase(),
          partOfSpeech: wordMatch[3],
          definition: wordMatch[4].trim()
        });
      }
      
      vocab[num] = words.slice(0, 4);
    }
  }
  
  return vocab;
}

// Parse questions
function parseQuestions(text) {
  const questions = {};
  const chapterMatches = text.matchAll(/CHAPTER (\d+)\n[^\n]+\n\n([\s\S]*?)(?=CHAPTER \d+|$)/g);
  
  for (const match of chapterMatches) {
    const num = parseInt(match[1]);
    const content = match[2];
    
    if (num <= 24) {
      const questionList = [];
      
      const mcMatches = content.matchAll(/(\d+)\.\s+([^\n]+?)\nA\.\s+([^\n]+)\nB\.\s+([^\n]+)\nC\.\s+([^\n]+)\nD\.\s+([^\n]+)/g);
      
      for (const qMatch of mcMatches) {
        questionList.push({
          question: qMatch[2].trim(),
          options: {
            A: qMatch[3].trim(),
            B: qMatch[4].trim(),
            C: qMatch[5].trim(),
            D: qMatch[6].trim()
          },
          answer: ""
        });
      }
      
      const saMatch = content.match(/SHORT ANSWER:\s+([^\n]+(?:\n(?![A-Z]+:)[^\n]+)*)/);
      if (saMatch) {
        questionList.push({
          question: saMatch[1].trim(),
          answer: ""
        });
      }
      
      questions[num] = questionList;
    }
  }
  
  return questions;
}

// Grammar lessons
const grammarLessons = {
  1: {
    topic: "Complex Sentences with Time Relationships",
    explanation: "Twain uses complex sentences to show time relationships between 19th and 6th centuries. 'When I woke up, I was in a different time.'",
    example: "Although I understood modern science, the medieval people believed in magic.",
    prompt: "Write four complex sentences about time travel or culture clash using: when, although, because, while."
  },
  3: {
    topic: "Active vs. Passive Voice in Historical Narrative",
    explanation: "Active voice emphasizes the actor; passive emphasizes the action. Twain switches to show Hank's control vs. helplessness.",
    example: "Active: 'I introduced technology.' / Passive: 'I was sentenced to death by the king.'",
    prompt: "Find three sentences from today's chapter. Identify voice and explain why Twain chose it."
  },
  6: {
    topic: "Semicolons in Compound Sentences",
    explanation: "Semicolons join related ideas without conjunctions, showing connections between medieval and modern thinking.",
    example: "The king believed in divine right; I believed in democracy.",
    prompt: "Write four compound sentences: two with semicolons, two with coordinating conjunctions, about contrasts in the story."
  },
  8: {
    topic: "Parallel Structure for Contrast",
    explanation: "Parallel structure emphasizes contrasts between 6th century and 19th century life.",
    example: "They had castles, swords, and superstition; I had factories, guns, and science.",
    prompt: "Write five sentences using parallel structure to contrast medieval and modern elements from the story."
  },
  11: {
    topic: "Appositives for Explanation",
    explanation: "Appositives explain unfamiliar concepts without stopping the narrative flow.",
    example: "Merlin, the king's magician and chief advisor, opposed all my ideas.",
    prompt: "Write five sentences with appositives explaining characters, technology, or medieval concepts from today's chapter."
  },
  13: {
    topic: "Participial Phrases for Action",
    explanation: "Participial phrases create vivid descriptions of actions and reactions.",
    example: "Seeing the eclipse, the crowd fell to their knees in terror.",
    prompt: "Write five sentences using participial phrases to describe events or reactions in today's chapter."
  }
};

// Language lessons  
const languageLessons = {
  2: {
    topic: "Context Clues in Historical Fiction",
    explanation: "Twain uses context to explain unfamiliar medieval terms and customs.",
    example: "From context, 'joust' clearly means a mounted combat between knights with lances.",
    prompt: "Find three unfamiliar words (medieval terms or archaic language) in today's chapter. Use context to predict meanings."
  },
  4: {
    topic: "Anachronism: Language Out of Time",
    explanation: "Twain deliberately uses modern slang in medieval settings for humor. This is anachronism—something from the wrong time period.",
    example: "Hank says 'OK' and 'you bet' in 6th century England—language that wouldn't exist for 1,300 years.",
    prompt: "Find five examples of modern language Hank uses in medieval England. Explain why Twain includes these anachronisms."
  },
  7: {
    topic: "Formal vs. Informal Language",
    explanation: "Medieval characters speak formally ('Fair sir, will you joust?') while Hank speaks informally ('What year is this?'). Language reflects social class and education.",
    example: "Knights: 'Prithee, good sir.' / Hank: 'Cut it out, will you?'",
    prompt: "Compare five examples of formal medieval speech vs. Hank's informal American English. What does language reveal about character?"
  },
  9: {
    topic: "Figurative Language: Satire and Irony",
    explanation: "Twain uses irony and satire to criticize medieval society and sometimes modern society too.",
    example: "Irony: The 'noble' knights are often bullies. Satire: Twain mocks both medieval superstition and modern arrogance.",
    prompt: "Find three examples of irony or satire in today's chapter. Explain what Twain is criticizing."
  },
  12: {
    topic: "Connotation: Words for Progress and Civilization",
    explanation: "Words like 'progress,' 'civilization,' and 'democracy' have positive connotations for Hank but might not be universally good.",
    example: "'Progress' connotes improvement—but Hank's 'progress' sometimes causes harm.",
    prompt: "Choose five words Hank uses to describe modern vs. medieval life. Analyze their connotations and whether they're always accurate."
  },
  14: {
    topic: "Precise Word Choice: Technology Vocabulary",
    explanation: "Twain uses precise technical language when Hank describes inventions, showing expertise.",
    example: "Hank doesn't say 'thing'—he says 'telegraph,' 'steam engine,' 'gunpowder,' 'cement.'",
    prompt: "List ten technical or scientific words Hank uses. How does precise vocabulary establish his character?"
  }
};

console.log('Parsing Connecticut Yankee...\n');
const chapters = parseChapters(chaptersRaw);
const vocab = parseVocab(vocabRaw);
const questions = parseQuestions(questionsRaw);

console.log(`✅ Parsed ${Object.keys(chapters).length} chapters`);
console.log(`✅ Parsed vocabulary for ${Object.keys(vocab).length} chapters`);
console.log(`✅ Parsed questions for ${Object.keys(questions).length} chapters`);

// Build unit card
const unitCard = {
  unitInfo: {
    title: "A Connecticut Yankee in King Arthur's Court",
    subtitle: "A BedrockELA Adaptation",
    originalAuthor: "Mark Twain (1889)",
    adaptation: "Adapted for 6th Grade Readers",
    totalChapters: 24,
    gradeLevel: "6th Grade",
    compatibleGrades: ["6th", "7th", "8th"],
    genre: "Satire / Science Fiction / Historical Fiction",
    themes: [
      "Progress vs. Tradition",
      "Democracy vs. Monarchy",
      "Technology and Power",
      "Cultural Superiority and Arrogance",
      "Time Travel and Perspective"
    ],
    totalLessons: 24,
    vocabularyWords: 96,
    totalQuestions: 72,
    estimatedWeeks: 5,
    created: new Date().toISOString()
  },
  
  lessonMapping: {
    daysPerLesson: 1,
    assessmentDays: [5, 10, 15, 20, 24],
    totalDays: 24,
    weeks: 5,
    note: "This unit card can be inserted into Days 145-168 of 6th grade"
  },
  
  bedrockSpineCompatibility: {
    structure: "11-page Bedrock Spine",
    pages: [
      "1. Title Page",
      "2. Welcome & Objectives",
      "3. Vocabulary (4 words for 6th grade)",
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
    note: "Days 145-168 (24 lessons)"
  },
  
  chapters: [],
  
  stats: {
    totalWords: 0,
    avgWordsPerChapter: 0,
    totalVocabulary: 96,
    totalGrammarLessons: 12,
    totalLanguageLessons: 12
  }
};

// Build chapters
for (let i = 1; i <= 24; i++) {
  const chapter = chapters[i] || { number: i, title: `Chapter ${i}`, text: "" };
  const vocabSet = vocab[i] || [];
  const questionSet = questions[i] || [];
  
  const grammarLesson = grammarLessons[i] || null;
  const languageLesson = languageLessons[i] || null;
  
  const lessonData = {
    number: i,
    day: i,
    title: chapter.title,
    summary: "",
    text: chapter.text,
    
    vocabulary: vocabSet,
    comprehension: questionSet,
    
    grammar: grammarLesson,
    language: languageLesson,
    
    informationalText: {
      title: "Mark Twain and American Satire",
      text: "Informational text to be added.",
      questions: []
    },
    
    writingPrompt: `Write about the themes and ideas in ${chapter.title}.`,
    journalPrompt: `Reflect on how today's chapter connects to your own experiences.`
  };
  
  unitCard.chapters.push(lessonData);
  unitCard.stats.totalWords += chapter.text.split(/\s+/).length;
}

unitCard.stats.avgWordsPerChapter = Math.round(unitCard.stats.totalWords / 24);

fs.writeFileSync(
  'book-data/connecticut-yankee-complete-unit-card.json',
  JSON.stringify(unitCard, null, 2)
);

console.log('\n✅ Connecticut Yankee unit card created!');
console.log(`📊 ${unitCard.stats.totalWords} words, ${unitCard.stats.avgWordsPerChapter} avg/chapter`);
console.log(`📚 24 chapters, ${Object.values(vocab).flat().length} vocab words, ${Object.values(questions).flat().length} questions`);
console.log(`📝 6 grammar + 6 language lessons added`);
console.log(`⚠️  Informational texts need to be added`);
