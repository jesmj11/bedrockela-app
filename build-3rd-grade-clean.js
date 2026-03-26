// Build ALL 3rd Grade Lessons
// Using clean template (based on 4th grade layout)

const fs = require('fs');
const { generateLesson } = require('./lesson-template-clean.js');

// Load grammar/language topics
const grammarLanguage = JSON.parse(fs.readFileSync('book-data/3rd-grade-grammar-language-spiral-curriculum.json', 'utf8'));

// 10 books available (need 12 for full 180 days)
const books = [
  { file: '3rd-grade-cinderella-complete-unit-card.json', emoji: '👗' },
  { file: '3rd-grade-heidi-complete-unit-card.json', emoji: '⛰️' },
  { file: '3rd-grade-jack-and-the-beanstalk-complete-unit-card.json', emoji: '🌱' },
  { file: '3rd-grade-rapunzel-complete-unit-card.json', emoji: '👸' },
  { file: '3rd-grade-the-elves-and-the-shoemaker-complete-unit-card.json', emoji: '👞' },
  { file: '3rd-grade-the-frog-prince-complete-unit-card.json', emoji: '🐸' },
  { file: '3rd-grade-the-snow-queen-complete-unit-card.json', emoji: '❄️' },
  { file: '3rd-grade-the-ugly-duckling-complete-unit-card.json', emoji: '🦢' },
  { file: '3rd-grade-the-velveteen-rabbit-complete-unit-card.json', emoji: '🐰' },
  { file: '3rd-grade-thumbelina-complete-unit-card.json', emoji: '🌸' }
  // Missing: Hansel and Gretel, Twelve Dancing Princesses
];

// Helper: Get cyclic day for topics
function getTopicDay(day) {
  return ((day - 1) % 30) + 1;
}

// Helper: Get grammar or language topic
function getGrammarLanguageTopic(day) {
  const topicDay = getTopicDay(day);
  const topics = grammarLanguage.topics || grammarLanguage;
  
  const topic = Array.isArray(topics) ?
    topics.find(t => t.day === topicDay) :
    topics[topicDay];
  
  if (topic) {
    return {
      type: topic.type || 'grammar',
      topic: topic.topic || topic.skill,
      learn: topic.explanation || topic.learn,
      example: topic.example
    };
  }
  
  return {
    type: 'grammar',
    topic: 'Review',
    learn: 'Practice what we\'ve learned.',
    example: 'Review your work.'
  };
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

// Build all lessons
console.log('🏗️  Building 3rd grade lessons...\n');

let dayCounter = 1;

books.forEach((book, bookIdx) => {
  try {
    const unitCard = JSON.parse(fs.readFileSync(`book-data/${book.file}`, 'utf8'));
    console.log(`📚 Book ${bookIdx + 1}: ${unitCard.unitInfo.book} (${unitCard.chapters.length} chapters)`);
    
    // Each book should be 15 days (12 regular + 3 assessment)
    const chaptersToUse = Math.min(unitCard.chapters.length, 12);
    
    for (let chIdx = 0; chIdx < 15 && dayCounter <= 180; chIdx++) {
      const relativeDay = chIdx + 1;
      const isAssessment = relativeDay % 5 === 0;
      
      if (isAssessment) {
        console.log(`  📝 Day ${dayCounter} - Assessment (skipping)`);
        dayCounter++;
        continue;
      }
      
      const chapterIndex = chIdx - Math.floor(chIdx / 5); // Account for assessment days
      if (chapterIndex >= chaptersToUse) break;
      
      const chapter = unitCard.chapters[chapterIndex];
      if (!chapter) break;
      
      const week = Math.ceil(dayCounter / 5);
      const grammarLanguage = getGrammarLanguageTopic(dayCounter);
      const isWriting = dayCounter % 2 === 1;
      
      const lessonData = {
        grade: 3,
        day: dayCounter,
        week: week,
        title: chapter.title,
        bookTitle: unitCard.unitInfo.book,
        emoji: book.emoji,
        objectives: [
          `Read and understand ${chapter.title}`,
          `Master ${chapter.vocabulary?.length || 3} vocabulary words`,
          `Practice ${grammarLanguage.topic}`,
          `${isWriting ? 'Write analytically' : 'Journal reflectively'} about the story`
        ],
        vocabularyWords: chapter.vocabulary || [],
        storyParts: splitStory(chapter.text),
        comprehensionQuestions: chapter.comprehension?.map(q => q.question) || [],
        grammarOrLanguage: grammarLanguage,
        informationalText: chapter.informationalText || {
          title: 'Did You Know?',
          content: `This classic tale has been told for generations.`,
          question: 'Why do you think this story is still popular today?'
        },
        writingPrompt: {
          type: isWriting ? 'writing' : 'journal',
          prompt: isWriting ?
            (chapter.writingPrompt?.prompt || 'Write about the most important event in this chapter and explain why it matters.') :
            (chapter.journalPrompt?.prompt || 'If you were the main character, what would you do differently? Explain your thinking.')
        }
      };
      
      const html = generateLesson(lessonData);
      const filename = `curriculum/grade3/3rd-grade-lesson-${dayCounter.toString().padStart(3, '0')}.html`;
      
      // Create directory if needed
      if (!fs.existsSync('curriculum/grade3')) {
        fs.mkdirSync('curriculum/grade3', { recursive: true });
      }
      
      fs.writeFileSync(filename, html);
      console.log(`  ✅ Day ${dayCounter} - ${chapter.title}`);
      
      dayCounter++;
    }
    
    console.log('');
    
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }
});

console.log(`🎉 Built ${dayCounter - 1} lessons for 3rd grade!`);
console.log('\n💡 Note: Missing 2 books (Hansel/Gretel, Twelve Dancing Princesses) for full 180 days');
