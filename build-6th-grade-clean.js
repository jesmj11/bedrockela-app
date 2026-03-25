// Build ALL 180 6th Grade Lessons
// Using clean template (based on 4th grade layout)

const fs = require('fs');
const { generateLesson } = require('./lesson-template-clean.js');

// Load grammar/language topics
const grammarLanguage = JSON.parse(fs.readFileSync('book-data/7th-grade-grammar-language.json', 'utf8'));

// 6 books for 6th grade (30 days each = 180 total)
const books = [
  { file: 'tom-sawyer-complete-unit-card.json', dayStart: 1, dayEnd: 30, emoji: '⛵' },
  { file: 'twenty-thousand-leagues-complete-unit-card.json', dayStart: 31, dayEnd: 60, emoji: '🌊' },
  { file: 'robin-hood-complete-unit-card.json', dayStart: 61, dayEnd: 90, emoji: '🏹' },
  { file: 'swiss-family-complete-unit-card.json', dayStart: 91, dayEnd: 120, emoji: '🏝️' },
  { file: 'journey-complete-unit-card.json', dayStart: 121, dayEnd: 150, emoji: '🌋' },
  { file: 'connecticut-yankee-complete-unit-card.json', dayStart: 151, dayEnd: 180, emoji: '⚔️' }
];

// Helper: Get cyclic topic day (1-30) from absolute day
function getTopicDay(day) {
  return ((day - 1) % 30) + 1;
}

// Helper: Map day to chapter (accounting for assessment days every 5th)
function getChapterForDay(day, dayStart) {
  const relativeDay = day - dayStart + 1; // 1-30 within unit
  const assessmentsSoFar = Math.floor((relativeDay - 1) / 5);
  return relativeDay - assessmentsSoFar - 1; // Chapter index
}

// Helper: Get grammar or language topic for this day
function getGrammarLanguageTopic(day) {
  const topicDay = getTopicDay(day);
  
  // Check if this day has grammar or language topic
  const grammar = grammarLanguage.grammar[topicDay];
  const language = grammarLanguage.language[topicDay];
  
  if (grammar) {
    return {
      type: 'grammar',
      topic: grammar.topic,
      learn: grammar.explanation,
      example: grammar.example
    };
  } else if (language) {
    return {
      type: 'language',
      topic: language.topic,
      learn: language.explanation,
      example: language.example
    };
  } else {
    // Fallback for missing topics
    return {
      type: 'grammar',
      topic: 'Review and Practice',
      learn: 'Today is a review day. Practice the concepts we\'ve learned so far.',
      example: 'Review your previous grammar exercises.'
    };
  }
}

// Helper: Split story into 3 parts
function splitStory(text) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  const third = Math.ceil(paragraphs.length / 3);
  
  return [
    paragraphs.slice(0, third).join('\n\n'),
    paragraphs.slice(third, third * 2).join('\n\n'),
    paragraphs.slice(third * 2).join('\n\n')
  ];
}

// Build lessons for all 6 books
console.log('🏗️  Building all 180 6th grade lessons...\n');

books.forEach(book => {
  console.log(`📚 Loading ${book.file}...`);
  const unitCard = JSON.parse(fs.readFileSync(`book-data/${book.file}`, 'utf8'));
  
  for (let day = book.dayStart; day <= book.dayEnd; day++) {
    const week = Math.ceil(day / 5);
    const relativeDay = day - book.dayStart + 1;
    const isAssessmentDay = relativeDay % 5 === 0;
    
    if (isAssessmentDay) {
      console.log(`  📝 Day ${day} - Assessment (skipping for now)`);
      // TODO: Build assessment page
      continue;
    }
    
    // Get chapter for this day
    const chapterIndex = getChapterForDay(day, book.dayStart);
    const chapter = unitCard.chapters[chapterIndex];
    
    if (!chapter) {
      console.log(`  ⚠️  Day ${day} - No chapter found (index ${chapterIndex})`);
      continue;
    }
    
    // Get topics
    const grammarLanguage = getGrammarLanguageTopic(day);
    const isWriting = day % 2 === 1;
    
    // Build lesson data
    const lessonData = {
      grade: 6,
      day: day,
      week: week,
      title: chapter.title,
      bookTitle: unitCard.unitInfo?.book || unitCard.metadata?.title || 'Classic Literature',
      emoji: book.emoji,
      objectives: [
        `Read and analyze ${chapter.title}`,
        `Master ${chapter.vocabulary.length} vocabulary words`,
        `Practice ${grammarLanguage.type === 'grammar' ? 'grammar' : 'language'}: ${grammarLanguage.topic}`,
        `Complete ${isWriting ? 'analytical writing' : 'reflective journal'} exercise`
      ],
      vocabularyWords: chapter.vocabulary.map(v => ({
        word: v.word,
        definition: v.definition,
        sentence: v.sentence
      })),
      storyParts: splitStory(chapter.text),
      comprehensionQuestions: chapter.comprehension.map(q => q.question),
      grammarOrLanguage: grammarLanguage,
      informationalText: {
        title: chapter.informationalText.title,
        content: chapter.informationalText.text,
        question: chapter.informationalText.question
      },
      writingPrompt: {
        type: isWriting ? 'writing' : 'journal',
        prompt: isWriting ? 
          (chapter.writingPrompt?.prompt || 'Write an analytical essay about today\'s chapter. Focus on character development, themes, or literary devices. (3-4 paragraphs)') :
          (chapter.journalPrompt?.prompt || 'Reflect on today\'s chapter. What stood out to you? How do you relate to the characters or themes? (10-15 sentences)')
      }
    };
    
    // Generate HTML
    const html = generateLesson(lessonData);
    
    // Write file
    const filename = `curriculum/grade6/6th-grade-lesson-${day.toString().padStart(3, '0')}.html`;
    fs.writeFileSync(filename, html);
    
    console.log(`  ✅ Day ${day} - ${chapter.title}`);
  }
  
  console.log('');
});

console.log('🎉 All lessons built successfully!');
console.log('📂 Files saved to: curriculum/grade6/');
console.log('\n💡 Next: Build assessment pages for days 5, 10, 15, 20, 25, 30, etc.');
