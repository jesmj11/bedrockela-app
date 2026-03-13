const fs = require('fs');

// Read the raw text files
const chaptersRaw = fs.readFileSync('book-data/20k-leagues-chapters-raw.txt', 'utf8');
const vocabRaw = fs.readFileSync('book-data/20k-leagues-vocab-raw.txt', 'utf8');
const questionsRaw = fs.readFileSync('book-data/20k-leagues-questions-raw.txt', 'utf8');

// Parse chapters
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

// Parse vocabulary (4 words per chapter)
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
      
      vocab[num] = words.slice(0, 4); // Only take first 4
    }
  }
  
  return vocab;
}

// Parse questions (2 MC + 1 short answer per chapter)
function parseQuestions(text) {
  const questions = {};
  const chapterMatches = text.matchAll(/CHAPTER (\d+)\n[^\n]+\n\n([\s\S]*?)(?=CHAPTER \d+|$)/g);
  
  for (const match of chapterMatches) {
    const num = parseInt(match[1]);
    const content = match[2];
    
    if (num <= 24) {
      const questionList = [];
      
      // Parse multiple choice
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
      
      // Parse short answer
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

// Grammar lessons for 6th grade (12 lessons for odd days)
const grammarLessons = {
  1: {
    topic: "Complex Sentences",
    explanation: "A complex sentence contains one independent clause and at least one dependent clause. Example from 20K Leagues: 'When the Scotia was attacked, the world stopped arguing.'",
    example: "Although the creature was fast, the Abraham Lincoln pursued it.",
    prompt: "Write three complex sentences about today's chapter using subordinating conjunctions like: although, because, when, if, since, while."
  },
  3: {
    topic: "Independent vs. Dependent Clauses",
    explanation: "An independent clause can stand alone; a dependent clause cannot. Verne uses both to create complex narratives.",
    example: "Independent: 'The ship sailed forward.' / Dependent: 'As darkness fell' (needs more)",
    prompt: "Find two sentences in today's reading. Identify the clauses. Write two of your own and label them."
  },
  5: {
    topic: "Active and Passive Voice",
    explanation: "Active voice: subject performs action. Passive voice: subject receives action. Active: 'Nemo built the submarine.' Passive: 'The submarine was built by Nemo.'",
    example: "Active: 'The crew spotted the creature.' / Passive: 'The creature was spotted by the crew.'",
    prompt: "Find three sentences from today's chapter. Identify voice. Rewrite one active as passive and vice versa."
  },
  7: {
    topic: "Semicolons and Compound Sentences",
    explanation: "Semicolons join related independent clauses without conjunctions: 'The ocean was vast; Nemo knew every inch.'",
    example: "Aronnax studied science; Ned studied the sea.",
    prompt: "Write four compound sentences about today's chapter: two with semicolons, two with coordinating conjunctions."
  },
  9: {
    topic: "Verb Moods: Indicative, Imperative, Subjunctive",
    explanation: "Indicative states facts. Imperative gives commands. Subjunctive expresses wishes/hypotheticals.",
    example: "Indicative: 'Nemo is mysterious.' / Imperative: 'Follow me!' / Subjunctive: 'If I were Nemo, I would explore forever.'",
    prompt: "Write six sentences: two indicative, two imperative, two subjunctive about today's chapter."
  },
  11: {
    topic: "Parallel Structure",
    explanation: "Using the same grammatical form for items in a series creates balance and clarity.",
    example: "Poor: 'Nemo was brave, intelligent, and liked mysteries.' / Better: 'Nemo was brave, intelligent, and mysterious.'",
    prompt: "Find three sentences in today's reading that use parallel structure. Write three of your own."
  },
  13: {
    topic: "Appositives",
    explanation: "An appositive renames or explains a noun, set off by commas. Example: 'Captain Nemo, the commander of the Nautilus, was enigmatic.'",
    example: "Professor Aronnax, a marine biologist, studied the ocean.",
    prompt: "Write five sentences using appositives to add detail about characters or objects from today's chapter."
  },
  15: {
    topic: "Restrictive vs. Non-Restrictive Clauses",
    explanation: "Restrictive clauses are essential (no commas). Non-restrictive add extra info (use commas).",
    example: "Restrictive: 'The submarine that Nemo built was extraordinary.' / Non-restrictive: 'The Nautilus, which Nemo built, was extraordinary.'",
    prompt: "Write four sentences: two with restrictive clauses, two with non-restrictive clauses about today's reading."
  },
  17: {
    topic: "Gerunds and Infinitives",
    explanation: "Gerunds are -ing verbs used as nouns. Infinitives are 'to + verb.' Both can be subjects or objects.",
    example: "Gerund: 'Swimming was Ned's specialty.' / Infinitive: 'To explore was Aronnax's dream.'",
    prompt: "Write six sentences about today's chapter: three using gerunds, three using infinitives."
  },
  19: {
    topic: "Subjunctive Mood in Conditional Sentences",
    explanation: "Use subjunctive for hypothetical situations: 'If I were aboard the Nautilus, I would study everything.'",
    example: "If Ned were captain, he would return to land immediately.",
    prompt: "Write four conditional sentences using subjunctive mood about choices characters could have made."
  },
  21: {
    topic: "Participial Phrases",
    explanation: "Phrases beginning with participles (-ing or -ed verbs) that modify nouns.",
    example: "Glowing beneath the waves, the creature mesmerized the crew.",
    prompt: "Write five sentences using participial phrases to describe actions or scenes from today's chapter."
  },
  23: {
    topic: "Absolute Phrases",
    explanation: "A phrase that modifies the whole sentence, not just one word. Format: noun + participle.",
    example: "The storm having passed, the Nautilus surfaced.",
    prompt: "Write four sentences using absolute phrases to add context to events in today's chapter."
  }
};

// Language lessons for even days (12 lessons)
const languageLessons = {
  2: {
    topic: "Context Clues",
    explanation: "Use surrounding words and sentences to figure out unfamiliar words.",
    example: "From the text, you can tell 'frigate' is a type of ship because it's described as a warship built for speed.",
    prompt: "Find three unfamiliar words in today's reading. Use context clues to guess their meanings, then check a dictionary."
  },
  4: {
    topic: "Latin and Greek Roots",
    explanation: "Many English words come from Latin and Greek. 'Sub' = under, 'marine' = sea → submarine = under the sea.",
    example: "Expedition: 'ex' (out) + 'ped' (foot) = journey out on foot",
    prompt: "Find five words in today's chapter with Latin or Greek roots. Break them down and explain their meanings."
  },
  6: {
    topic: "Connotation and Denotation",
    explanation: "Denotation = dictionary definition. Connotation = emotional association.",
    example: "'Monster' denotes a large creature, but connotes something scary and dangerous.",
    prompt: "Choose five words from today's reading. Explain both their denotation and connotation."
  },
  8: {
    topic: "Figurative Language: Similes and Metaphors",
    explanation: "Similes use 'like' or 'as' to compare. Metaphors say one thing IS another.",
    example: "Simile: 'The submarine moved like a fish.' / Metaphor: 'The submarine was a steel fish.'",
    prompt: "Find three examples of figurative language in today's chapter. Write three of your own."
  },
  10: {
    topic: "Tone and Mood",
    explanation: "Tone = author's attitude. Mood = reader's feeling. Verne creates suspense through pacing and word choice.",
    example: "The tone is mysterious; the mood is tense.",
    prompt: "Describe the tone and mood of today's chapter. Quote three passages that create this atmosphere."
  },
  12: {
    topic: "Word Relationships: Synonyms and Antonyms",
    explanation: "Synonyms have similar meanings. Antonyms have opposite meanings.",
    example: "Synonym for 'luminous': glowing, bright. Antonym: dark, dim.",
    prompt: "Find ten words from today's reading. List a synonym and antonym for each."
  },
  14: {
    topic: "Multiple Meaning Words",
    explanation: "Many words have different meanings depending on context. 'Vessel' can mean ship or container.",
    example: "'Light' can mean brightness, weight, or to ignite something.",
    prompt: "Find five words in today's chapter that have multiple meanings. Write sentences showing different uses."
  },
  16: {
    topic: "Idiomatic Expressions",
    explanation: "Idioms are phrases whose meaning isn't literal. 'Break the ice' doesn't mean breaking actual ice.",
    example: "'At sea' can mean on the ocean or confused.",
    prompt: "Find or invent three nautical idioms. Explain their literal and figurative meanings."
  },
  18: {
    topic: "Prefixes and Suffixes",
    explanation: "Prefixes attach to word beginnings; suffixes to endings. They change meaning.",
    example: "Extra + ordinary → extraordinary (beyond ordinary)",
    prompt: "Find ten words with prefixes or suffixes in today's reading. Break them down and explain how the affix changes meaning."
  },
  20: {
    topic: "Word Nuance and Precision",
    explanation: "Precise word choice creates vivid images. 'Walk' vs. 'stride' vs. 'lumber' vs. 'tiptoe.'",
    example: "Verne writes 'phosphorescent' instead of just 'glowing' to be more specific.",
    prompt: "Find five verbs in today's chapter. Replace each with three synonyms of different intensities."
  },
  22: {
    topic: "Domain-Specific Vocabulary",
    explanation: "Specialized terms used in specific fields. Verne uses nautical and scientific vocabulary.",
    example: "Frigate, harpoon, narwhal, phosphorescent are domain-specific to maritime/science contexts.",
    prompt: "List ten domain-specific words from today's chapter. Categorize them by field (nautical, scientific, etc.)."
  },
  24: {
    topic: "Etymology: Word Origins",
    explanation: "Understanding where words come from helps us understand their meanings.",
    example: "'Nautilus' comes from Greek 'nautilos' meaning sailor.",
    prompt: "Research the etymology of five words from the vocabulary lists. Explain how their origins relate to current meanings."
  }
};

// Parse all the data
console.log('Parsing chapters...');
const chapters = parseChapters(chaptersRaw);
console.log(`✅ Found ${Object.keys(chapters).length} chapters`);

console.log('Parsing vocabulary...');
const vocab = parseVocab(vocabRaw);
console.log(`✅ Found ${Object.keys(vocab).length} vocabulary sets`);

console.log('Parsing questions...');
const questions = parseQuestions(questionsRaw);
console.log(`✅ Found ${Object.keys(questions).length} question sets`);

// Build the complete unit card
const unitCard = {
  unitInfo: {
    title: "Twenty Thousand Leagues Under the Sea",
    subtitle: "A BedrockELA Adaptation",
    originalAuthor: "Jules Verne (1870)",
    adaptation: "Adapted for 6th Grade Readers",
    totalChapters: 24,
    gradeLevel: "6th Grade",
    compatibleGrades: ["6th", "7th", "8th"],
    genre: "Science Fiction / Adventure",
    themes: [
      "Exploration and Discovery",
      "Science and Technology",
      "Freedom vs. Captivity",
      "Human Impact on Nature",
      "The Unknown Depths"
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
    note: "This unit card can be inserted into Days 1-24 of any 6th-8th grade pocket"
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
    grammarDays: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
    languageDays: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
    assessmentDays: [5, 10, 15, 20],
    note: "This 24-lesson unit follows Bedrock Spine structure"
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

// Merge everything into chapters array
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
      title: "Jules Verne and the Birth of Science Fiction",
      text: "Historical context for this chapter.",
      questions: []
    },
    
    writingPrompt: `Reflect on the events of Chapter ${i}. What would you do in this situation?`,
    journalPrompt: `How would you react if you were aboard the Nautilus?`
  };
  
  unitCard.chapters.push(lessonData);
  unitCard.stats.totalWords += chapter.text.split(/\s+/).length;
}

unitCard.stats.avgWordsPerChapter = Math.round(unitCard.stats.totalWords / 24);

// Write to file
fs.writeFileSync(
  'book-data/twenty-thousand-leagues-complete-unit-card.json',
  JSON.stringify(unitCard, null, 2)
);

console.log('✅ Twenty Thousand Leagues complete unit card created!');
console.log(`📊 Stats: ${unitCard.stats.totalWords} total words, ${unitCard.stats.avgWordsPerChapter} avg per chapter`);
console.log(`📚 24 chapters, ${unitCard.chapters.reduce((sum, ch) => sum + ch.vocabulary.length, 0)} vocab words, ${unitCard.chapters.reduce((sum, ch) => sum + ch.comprehension.length, 0)} questions`);
console.log(`📝 Grammar lessons: 12, Language lessons: 12`);
