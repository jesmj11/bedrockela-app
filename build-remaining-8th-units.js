const fs = require('fs');

const units = [
  {
    name: "frankenstein",
    title: "Frankenstein",
    filePrefix: "Frankenstein",
    author: "Mary Shelley (1818)",
    genre: "Gothic Horror / Science Fiction",
    themes: ["Scientific Ethics", "Creation and Responsibility", "Isolation and Loneliness", "Nature vs. Nurture", "Consequences of Ambition"],
    path: "/Users/mushu/Desktop/BedrockELA/8th ela/Frankenstein",
    days: "121-135"
  },
  {
    name: "jekyll-hyde",
    title: "Dr. Jekyll and Mr. Hyde",
    filePrefix: "Jekyll_Hyde",
    author: "Robert Louis Stevenson (1886)",
    genre: "Gothic Psychological Thriller",
    themes: ["Duality of Human Nature", "Good vs. Evil", "Victorian Hypocrisy", "Science and Morality", "Self-Control and Temptation"],
    path: "/Users/mushu/Desktop/BedrockELA/8th ela/JekyllHyde",
    days: "136-150"
  },
  {
    name: "beowulf",
    title: "Beowulf",
    filePrefix: "Beowulf",
    author: "Anonymous (c. 700-1000 AD)",
    genre: "Old English Epic Poem",
    themes: ["Heroism and Courage", "Good vs. Evil", "Loyalty and Honor", "Mortality and Legacy", "Anglo-Saxon Culture"],
    path: "/Users/mushu/Desktop/BedrockELA/8th ela/Beowulf",
    days: "151-165"
  },
  {
    name: "dorian-gray",
    title: "The Picture of Dorian Gray",
    filePrefix: "Dorian_Gray",
    author: "Oscar Wilde (1890)",
    genre: "Philosophical Fiction / Gothic",
    themes: ["Vanity and Beauty", "Morality and Corruption", "Art and Life", "Consequences of Hedonism", "Victorian Society"],
    path: "/Users/mushu/Desktop/BedrockELA/8th ela/dorian",
    days: "166-180"
  }
];

units.forEach(unit => {
  console.log(`\n📚 Building ${unit.title}...`);
  
  // Read files
  const file1 = fs.readFileSync(`${unit.path}/${unit.filePrefix}_Chapters_1-6.md`, 'utf8');
  const file2 = fs.readFileSync(`${unit.path}/${unit.filePrefix}_Chapters_7-12.md`, 'utf8');
  const file3 = fs.readFileSync(`${unit.path}/${unit.filePrefix}_Final_Chapters_13-24.md`, 'utf8');
  const vocabFile = fs.readFileSync(`${unit.path}/${unit.filePrefix}_Complete_Vocabulary.md`, 'utf8');
  
  const allText = file1 + '\n\n' + file2 + '\n\n' + file3;
  
  // Parse chapters
  const chapters = [];
  const chapterMatches = allText.matchAll(/# Chapter (\d+):\s*([^\n]+)\n([\s\S]*?)(?=# Chapter \d+|$)/gi);
  
  for (const match of chapterMatches) {
    const num = parseInt(match[1]);
    const title = match[2].trim();
    const text = match[3].trim();
    
    if (num >= 1 && num <= 24) {
      chapters.push({ number: num, title: title, text: text });
    }
  }
  
  console.log(`  ✅ Parsed ${chapters.length} chapters`);
  
  // Parse vocabulary
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
  
  console.log(`  ✅ Parsed vocabulary for ${Object.keys(vocab).length} chapters`);
  
  // Create unit card
  const unitCard = {
    unitInfo: {
      title: unit.title,
      subtitle: "A BedrockELA Adaptation",
      originalAuthor: unit.author,
      adaptation: "Adapted for 8th Grade Readers",
      totalChapters: 24,
      gradeLevel: "8th Grade",
      compatibleGrades: ["8th"],
      genre: unit.genre,
      themes: unit.themes,
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
      note: `This unit card can be inserted into Days ${unit.days} of 8th grade`
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
      note: "15-lesson unit"
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
          question: `What is the main conflict or challenge in ${chapter.title}?`,
          answer: ""
        },
        {
          question: `How do the characters respond to the events in this chapter?`,
          answer: ""
        },
        {
          question: `What does this chapter reveal about the themes of ${unit.title}? Use evidence from the text.`,
          answer: ""
        }
      ],
      
      grammar: null,
      language: null,
      
      informationalText: {
        title: "Literary Context",
        text: "Informational text to be added.",
        questions: []
      },
      
      writingPrompt: `Reflect on the events of ${chapter.title}. What would you have done differently?`,
      journalPrompt: `How does this chapter connect to modern society or your own experiences?`
    };
    
    unitCard.chapters.push(lessonData);
    unitCard.stats.totalWords += chapter.text.split(/\s+/).length;
  });
  
  unitCard.stats.avgWordsPerChapter = Math.round(unitCard.stats.totalWords / chapters.length);
  unitCard.stats.totalVocabulary = Object.values(vocab).flat().length;
  
  // Write to file
  const filename = `book-data/${unit.name}-complete-unit-card.json`;
  fs.writeFileSync(filename, JSON.stringify(unitCard, null, 2));
  
  console.log(`  ✅ Created ${filename}`);
  console.log(`  📊 ${unitCard.stats.totalWords} words, ${unitCard.stats.avgWordsPerChapter} avg/chapter`);
  console.log(`  📚 ${chapters.length} chapters, ${unitCard.stats.totalVocabulary} vocab words`);
});

console.log('\n✅ All 4 remaining units created!');
console.log('📦 Total: 5 complete 8th grade unit cards (120 lessons)');
