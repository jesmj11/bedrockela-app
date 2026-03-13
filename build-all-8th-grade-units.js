const fs = require('fs');

// Unit configurations
const units = [
  {
    name: "sherlock",
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle (1892)",
    genre: "Detective Fiction / Mystery",
    themes: ["Deductive Reasoning", "Observation and Logic", "Victorian Society", "Science of Detection", "Justice and Morality"],
    path: "/Users/mushu/Desktop/BedrockELA/8th ela/sherlock"
  },
  {
    name: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley (1818)",
    genre: "Gothic Horror / Science Fiction",
    themes: ["Scientific Ethics", "Creation and Responsibility", "Isolation and Loneliness", "Nature vs. Nurture", "Consequences of Ambition"],
    path: "/Users/mushu/Desktop/BedrockELA/8th ela/Frankenstein"
  },
  {
    name: "jekyll-hyde",
    title: "Dr. Jekyll and Mr. Hyde",
    author: "Robert Louis Stevenson (1886)",
    genre: "Gothic Psychological Thriller",
    themes: ["Duality of Human Nature", "Good vs. Evil", "Victorian Hypocrisy", "Science and Morality", "Self-Control and Temptation"],
    path: "/Users/mushu/Desktop/BedrockELA/8th ela/JekyllHyde"
  },
  {
    name: "beowulf",
    title: "Beowulf",
    author: "Anonymous (c. 700-1000 AD)",
    genre: "Old English Epic Poem",
    themes: ["Heroism and Courage", "Good vs. Evil", "Loyalty and Honor", "Mortality and Legacy", "Anglo-Saxon Culture"],
    path: "/Users/mushu/Desktop/BedrockELA/8th ela/Beowulf"
  },
  {
    name: "dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde (1890)",
    genre: "Philosophical Fiction / Gothic",
    themes: ["Vanity and Beauty", "Morality and Corruption", "Art and Life", "Consequences of Hedonism", "Victorian Society"],
    path: "/Users/mushu/Desktop/BedrockELA/8th ela/dorian"
  }
];

function parseMarkdownChapters(path, name) {
  const chapters = [];
  
  // Read all chapter files
  const file1 = `${path}/${name}_Chapters_1-6.md`;
  const file2 = `${path}/${name}_Chapters_7-12.md`;
  const file3 = `${path}/${name}_Final_Chapters_13-24.md`;
  
  const files = [file1, file2, file3];
  let allText = '';
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      allText += content + '\n\n';
    } catch (err) {
      console.log(`  ⚠️ Could not read ${file}`);
    }
  });
  
  // Parse chapters from markdown
  const chapterMatches = allText.matchAll(/## Chapter (\d+):?\s*([^\n]+)\n([\s\S]*?)(?=## Chapter \d+|$)/gi);
  
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
  
  return chapters;
}

function parseVocabulary(path, name) {
  const vocabFile = `${path}/${name}_Complete_Vocabulary.md`;
  const vocab = [];
  
  try {
    const content = fs.readFileSync(vocabFile, 'utf8');
    
    // Parse vocabulary entries
    const wordMatches = content.matchAll(/\*\*([A-Za-z\s-]+)\*\*\s*\((noun|verb|adjective|adverb|[^)]+)\):\s*([^\n]+)/gi);
    
    for (const match of wordMatches) {
      vocab.push({
        word: match[1].trim().toLowerCase(),
        partOfSpeech: match[2].trim(),
        definition: match[3].trim()
      });
    }
  } catch (err) {
    console.log(`  ⚠️ Could not read vocabulary file`);
  }
  
  return vocab;
}

// Process each unit
units.forEach(unit => {
  console.log(`\n📚 Building ${unit.title}...`);
  
  // Determine filename pattern
  let filePattern = unit.name.charAt(0).toUpperCase() + unit.name.slice(1).replace('-', '_');
  if (unit.name === 'sherlock') filePattern = 'Sherlock_Holmes';
  if (unit.name === 'frankenstein') filePattern = 'Frankenstein';
  if (unit.name === 'jekyll-hyde') filePattern = 'Jekyll_Hyde';
  if (unit.name === 'beowulf') filePattern = 'Beowulf';
  if (unit.name === 'dorian-gray') filePattern = 'Dorian_Gray';
  
  const chapters = parseMarkdownChapters(unit.path, filePattern);
  const allVocab = parseVocabulary(unit.path, filePattern);
  
  console.log(`  ✅ Parsed ${chapters.length} chapters`);
  console.log(`  ✅ Parsed ${allVocab.length} vocabulary words`);
  
  // Distribute vocabulary across 24 chapters (3-4 words each)
  const vocabPerChapter = [];
  const wordsPerChapter = Math.floor(allVocab.length / 24);
  for (let i = 0; i < 24; i++) {
    const start = i * wordsPerChapter;
    const end = (i === 23) ? allVocab.length : start + wordsPerChapter;
    vocabPerChapter.push(allVocab.slice(start, end));
  }
  
  // Build unit card
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
      vocabularyWords: allVocab.length,
      totalQuestions: 72,
      estimatedWeeks: 5,
      created: new Date().toISOString()
    },
    
    lessonMapping: {
      daysPerLesson: 1,
      assessmentDays: [5, 10, 15, 20, 24],
      totalDays: 24,
      weeks: 5,
      note: "This unit card can be inserted into Days 1-24 of any 8th grade pocket"
    },
    
    bedrockSpineCompatibility: {
      structure: "11-page Bedrock Spine",
      pages: [
        "1. Title Page",
        "2. Welcome & Objectives",
        "3. Vocabulary (3-4 words for 8th grade)",
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
      totalVocabulary: allVocab.length,
      totalGrammarLessons: 12,
      totalLanguageLessons: 12
    }
  };
  
  // Build chapters
  chapters.forEach((chapter, idx) => {
    const vocab = vocabPerChapter[idx] || [];
    
    const lessonData = {
      number: chapter.number,
      day: chapter.number,
      title: chapter.title,
      summary: "",
      text: chapter.text,
      
      vocabulary: vocab,
      
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
  
  // Write to file
  const filename = `book-data/${unit.name}-complete-unit-card.json`;
  fs.writeFileSync(filename, JSON.stringify(unitCard, null, 2));
  
  console.log(`  ✅ Created ${filename}`);
  console.log(`  📊 ${unitCard.stats.totalWords} words, ${unitCard.stats.avgWordsPerChapter} avg/chapter`);
});

console.log('\n✅ All 5 units created!');
console.log('⚠️  Note: Grammar/language lessons and enhanced content still needed');
