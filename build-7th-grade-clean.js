// Build ALL 90 7th Grade Lessons (Days 1-90)
// Using clean template (based on 4th grade layout)
// NOTE: Days 91-180 need 3 more books from user

const fs = require('fs');
const { generateLesson } = require('./lesson-template-clean.js');

// Load grammar/language topics
const grammarLanguage = JSON.parse(fs.readFileSync('book-data/7th-grade-grammar-language.json', 'utf8'));

// 3 books for 7th grade (90 days, need 3 more for full 180)
const books = [
  { file: 'arabian-nights-unit-card.json', dayStart: 1, dayEnd: 30, emoji: '🌙' },
  { file: 'anne-green-gables-unit-card.json', dayStart: 31, dayEnd: 60, emoji: '🌸' },
  { file: 'moby-dick-unit-card.json', dayStart: 61, dayEnd: 90, emoji: '🐋' }
  // NOTE: Days 91-180 need 3 more books (user says she has them)
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

// Build lessons for all 3 books
console.log('🏗️  Building 7th grade lessons (Days 1-90)...\n');

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
      grade: 7,
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
      informationalText: chapter.informationalText || {
        title: 'Did You Know?',
        content: `This chapter is part of ${unitCard.book || 'a classic work of literature'} and explores themes of human nature, morality, and society. These timeless stories continue to influence literature and culture today.`,
        question: 'How do you think the themes in this chapter relate to modern life? What lessons can we learn?'
      },
      writingPrompt: {
        type: isWriting ? 'writing' : 'journal',
        prompt: isWriting ? 
          (chapter.writingPrompt?.prompt || 'Write an analytical essay about today\'s chapter. Focus on character development, themes, or literary devices. Support your analysis with evidence from the text. (3-4 paragraphs, 15-20 sentences minimum)') :
          (chapter.journalPrompt?.prompt || 'Reflect on today\'s chapter. What stood out to you? How do you relate to the characters or themes? What questions do you have? (10-15 sentences minimum)')
      }
    };
    
    // Generate HTML
    const html = generateLesson(lessonData);
    
    // Write file
    const filename = `curriculum/grade7/7th-grade-lesson-${day.toString().padStart(3, '0')}.html`;
    fs.writeFileSync(filename, html);
    
    console.log(`  ✅ Day ${day} - ${chapter.title}`);
  }
  
  console.log('');
});

console.log('🎉 First 90 lessons built successfully!');
console.log('📂 Files saved to: curriculum/grade7/');
console.log('\n💡 Next steps:');
console.log('   1. Build assessment pages for days 5, 10, 15, etc.');
console.log('   2. Get 3 more books from user for Days 91-180');
