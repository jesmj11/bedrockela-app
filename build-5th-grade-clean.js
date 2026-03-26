// Build ALL 180 5th Grade Lessons
// Using clean template (based on 4th grade layout)

const fs = require('fs');
const { generateLesson } = require('./lesson-template-clean.js');

// Load grammar/language topics
const grammarLanguage = JSON.parse(fs.readFileSync('book-data/7th-grade-grammar-language.json', 'utf8'));

// 6 books for 5th grade (30 days each = 180 total)
// NOTE: Only Robin Hood unit card exists currently - need 5 more books
const books = [
  { file: 'robin-hood-complete-unit-card.json', dayStart: 1, dayEnd: 30, emoji: '🏹' }
  // TODO: Add 5 more books for days 31-180
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

// Build lessons for all books
console.log('🏗️  Building 5th grade lessons...\n');

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
      grade: 5,
      day: day,
      week: week,
      title: chapter.title,
      bookTitle: unitCard.unitInfo?.book || unitCard.metadata?.title || 'The Merry Adventures of Robin Hood',
      emoji: book.emoji,
      objectives: [
        `Read and analyze ${chapter.title}`,
        `Master ${chapter.vocabulary?.length || 3} vocabulary words`,
        `Practice ${grammarLanguage.type === 'grammar' ? 'grammar' : 'language'}: ${grammarLanguage.topic}`,
        `Complete ${isWriting ? 'analytical writing' : 'reflective journal'} exercise`
      ],
      vocabularyWords: chapter.vocabulary ? chapter.vocabulary.map(v => ({
        word: v.word,
        definition: v.definition,
        sentence: v.sentence
      })) : [
        { word: 'Example', definition: 'A sample word.', sentence: 'This is an example.' }
      ],
      storyParts: splitStory(chapter.text),
      comprehensionQuestions: chapter.comprehension ? chapter.comprehension.map(q => q.question) : [
        'What happened in this chapter?',
        'Who are the main characters?',
        'What lesson can we learn?'
      ],
      grammarOrLanguage: grammarLanguage,
      informationalText: chapter.informationalText || {
        title: 'Did You Know?',
        content: `The Merry Adventures of Robin Hood was written by Howard Pyle and first published in 1883. It's one of the most famous retellings of the Robin Hood legend, combining historical elements with folklore and adventure.`,
        question: 'How do you think Robin Hood\'s story reflects the time period in which it was written? What makes it still relevant today?'
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
    const filename = `curriculum/grade5/5th-grade-lesson-${day.toString().padStart(3, '0')}.html`;
    fs.writeFileSync(filename, html);
    
    console.log(`  ✅ Day ${day} - ${chapter.title}`);
  }
  
  console.log('');
});

console.log('🎉 Robin Hood unit built successfully (Days 1-30)!');
console.log('📂 Files saved to: curriculum/grade5/');
console.log('\n💡 Next: Need 5 more books for Days 31-180');
