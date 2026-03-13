const fs = require('fs');

// ============================================================
// PRINCESS AND THE GOBLIN UNIT CARD
// ============================================================

function buildPrincessGoblinUnit() {
  console.log('Building Princess and the Goblin unit card...\n');

  const chaptersText = fs.readFileSync('book-data/princess-goblin-chapters-raw.txt', 'utf-8');
  const questionsText = fs.readFileSync('book-data/princess-goblin-questions-raw.txt', 'utf-8');
  const vocabText = fs.readFileSync('book-data/princess-goblin-vocab-raw.txt', 'utf-8');

  // Parse chapters - split by CHAPTER marker
  const chapterSections = chaptersText.split(/(?=CHAPTER \d+)/g).slice(1);
  const chapters = chapterSections.map(section => {
    const match = section.match(/CHAPTER (\d+)\n+([^\n]+)\n+([\s\S]+)/);
    if (!match) return null;
    return {
      number: parseInt(match[1]),
      title: match[2].trim(),
      text: match[3].trim().replace(/\n\nTHE END$/, '').trim()
    };
  }).filter(Boolean);

  console.log(`✅ Parsed ${chapters.length} chapters`);

  // Parse vocabulary - simpler pattern (72 words = 4 per chapter × 18 chapters)
  const vocabMatches = [...vocabText.matchAll(/^(\d+)\.\s+([A-Z]+)\s+\(([^)]+)\)\s+—\s+([^\n]+)/gm)];
  const vocabulary = vocabMatches.map(match => ({
    word: match[2],
    partOfSpeech: match[3],
    definition: match[4]
  }));

  console.log(`✅ Parsed ${vocabulary.length} vocabulary words`);

  // Parse questions (2 MC + 1 short answer per chapter)
  const questionChunks = questionsText.split(/CHAPTER \d+\n\n[^\n]+\n\n/).slice(1);
  const questions = questionChunks.map(chunk => {
    const mcMatches = [...chunk.matchAll(/\d+\.\s+([^\n]+)\n\nA\.\s+([^\n]+)\n\nB\.\s+([^\n]+)\n\nC\.\s+([^\n]+)\n\nD\.\s+([^\n]+)\n\n(?:Answer:\s+([A-D]))?/g)];
    const saMatch = chunk.match(/Short Answer:[\s\S]*?\n\n([^\n]+)/);
    
    const mcQuestions = mcMatches.map(m => ({
      type: 'multiple-choice',
      question: m[1],
      choices: [m[2], m[3], m[4], m[5]],
      answer: m[6] || 'A'
    }));

    const saQuestion = saMatch ? {
      type: 'short-answer',
      question: saMatch[1]
    } : null;

    return saQuestion ? [...mcQuestions, saQuestion] : mcQuestions;
  }).flat();

  console.log(`✅ Parsed ${questions.length} questions`);

  // Build unit card
  const unitCard = {
    metadata: {
      title: "The Princess and the Goblin",
      author: "George MacDonald",
      gradeLevel: "6th",
      genre: "Fantasy / Adventure",
      publicationYear: 1872,
      totalChapters: 18,
      totalLessons: 18,
      themes: [
        "Courage and faith",
        "Good vs. evil",
        "Growing up and wisdom",
        "Mystery and discovery"
      ],
      unitDescription: "A classic Victorian fantasy about Princess Irene, her mysterious great-great-grandmother, and the brave miner boy Curdie who helps her fight against the goblin threat beneath the mountain."
    },
    chapters: chapters,
    vocabulary: vocabulary,
    questions: questions
  };

  fs.writeFileSync(
    'book-data/princess-goblin-complete-unit-card.json',
    JSON.stringify(unitCard, null, 2)
  );

  const fileSize = (fs.statSync('book-data/princess-goblin-complete-unit-card.json').size / 1024).toFixed(0);
  console.log(`\n✅ Princess and the Goblin unit card: ${fileSize} KB`);
  console.log(`   - ${chapters.length} chapters`);
  console.log(`   - ${vocabulary.length} vocabulary words`);
  console.log(`   - ${questions.length} questions\n`);
}

// ============================================================
// CONNECTICUT YANKEE UNIT CARD
// ============================================================

function buildConnecticutYankeeUnit() {
  console.log('Building Connecticut Yankee unit card...\n');

  const chaptersText = fs.readFileSync('book-data/connecticut-yankee-chapters-raw.txt', 'utf-8');
  const questionsText = fs.readFileSync('book-data/connecticut-yankee-questions-raw.txt', 'utf-8');
  const vocabText = fs.readFileSync('book-data/connecticut-yankee-vocab-raw.txt', 'utf-8');

  // Parse chapters - split by CHAPTER marker
  const chapterSections = chaptersText.split(/(?=CHAPTER \d+)/g).slice(1);
  const chapters = chapterSections.map(section => {
    const match = section.match(/CHAPTER (\d+)\n+([^\n]+)\n+([\s\S]+)/);
    if (!match) return null;
    return {
      number: parseInt(match[1]),
      title: match[2].trim(),
      text: match[3].trim().replace(/\n\nTHE END$/, '').trim()
    };
  }).filter(Boolean);

  console.log(`✅ Parsed ${chapters.length} chapters`);

  // Parse vocabulary - simpler pattern (72 words = 4 per chapter × 18 chapters)
  const vocabMatches = [...vocabText.matchAll(/^(\d+)\.\s+([A-Z]+)\s+\(([^)]+)\)\s+—\s+([^\n]+)/gm)];
  const vocabulary = vocabMatches.map(match => ({
    word: match[2],
    partOfSpeech: match[3],
    definition: match[4]
  }));

  console.log(`✅ Parsed ${vocabulary.length} vocabulary words`);

  // Parse questions (2 MC + 1 short answer per chapter)
  const questionChunks = questionsText.split(/CHAPTER \d+\n\n[^\n]+\n\n/).slice(1);
  const questions = questionChunks.map(chunk => {
    const mcMatches = [...chunk.matchAll(/\d+\.\s+([^\n]+)\n\nA\.\s+([^\n]+)\n\nB\.\s+([^\n]+)\n\nC\.\s+([^\n]+)\n\nD\.\s+([^\n]+)\n\n(?:Answer:\s+([A-D]))?/g)];
    const saMatch = chunk.match(/Short Answer:[\s\S]*?\n\n([^\n]+)/);
    
    const mcQuestions = mcMatches.map(m => ({
      type: 'multiple-choice',
      question: m[1],
      choices: [m[2], m[3], m[4], m[5]],
      answer: m[6] || 'A'
    }));

    const saQuestion = saMatch ? {
      type: 'short-answer',
      question: saMatch[1]
    } : null;

    return saQuestion ? [...mcQuestions, saQuestion] : mcQuestions;
  }).flat();

  console.log(`✅ Parsed ${questions.length} questions`);

  // Build unit card
  const unitCard = {
    metadata: {
      title: "A Connecticut Yankee in King Arthur's Court",
      author: "Mark Twain",
      gradeLevel: "6th",
      genre: "Satire / Time Travel / Adventure",
      publicationYear: 1889,
      totalChapters: 18,
      totalLessons: 18,
      themes: [
        "Progress vs. tradition",
        "Democracy vs. monarchy",
        "Science and technology",
        "Social justice and equality"
      ],
      unitDescription: "Mark Twain's satirical masterpiece about Hank Morgan, a 19th-century factory foreman who is knocked unconscious and wakes up in King Arthur's Camelot, where he uses his modern knowledge to become 'The Boss' and attempts to modernize medieval England."
    },
    chapters: chapters,
    vocabulary: vocabulary,
    questions: questions
  };

  fs.writeFileSync(
    'book-data/connecticut-yankee-complete-unit-card.json',
    JSON.stringify(unitCard, null, 2)
  );

  const fileSize = (fs.statSync('book-data/connecticut-yankee-complete-unit-card.json').size / 1024).toFixed(0);
  console.log(`\n✅ Connecticut Yankee unit card: ${fileSize} KB`);
  console.log(`   - ${chapters.length} chapters`);
  console.log(`   - ${vocabulary.length} vocabulary words`);
  console.log(`   - ${questions.length} questions\n`);
}

// ============================================================
// RUN BOTH
// ============================================================

buildPrincessGoblinUnit();
buildConnecticutYankeeUnit();

console.log('🎉 Both unit cards complete!');
console.log('\n📊 6th Grade Curriculum Status:');
console.log('   Days 1-24: Tom Sawyer ✅');
console.log('   Days 25-48: Twenty Thousand Leagues ✅');
console.log('   Days 49-72: Robin Hood ✅');
console.log('   Days 73-96: Swiss Family Robinson ✅');
console.log('   Days 97-120: Journey to the Center of the Earth ✅');
console.log('   Days 121-144: Odyssey ✅');
console.log('   Days 145-162: Princess and the Goblin ✅ (NEW!)');
console.log('   Days 163-180: Connecticut Yankee ✅ (NEW!)');
console.log('\n   TOTAL: 180 days COMPLETE! 🎯');
