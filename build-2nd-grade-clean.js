// Build ALL 2nd Grade Lessons (180 days)
// Using clean template (based on 4th grade layout)

const fs = require('fs');
const { generateLesson } = require('./lesson-template-clean.js');

// Load grammar/language topics
const grammarLanguage = JSON.parse(fs.readFileSync('book-data/2nd-grade-grammar-language-spiral-curriculum.json', 'utf8'));

// 24 books for 2nd grade
const books = [];
for (let i = 1; i <= 24; i++) {
  const bookNum = i.toString().padStart(2, '0');
  books.push({
    file: `2nd-grade-book-${bookNum}-complete-unit-card.json`,
    bookNum: i,
    emoji: ['📚', '🐱', '🍪', '🥣', '👞', '🕯️', '🦁', '🐦', '🐕', '🌬️', '🐈', '🦆', '🥛', '🌳', '🐑', '🪵', '🥚', '✂️', '🐾', '🦔', '🐰', '🐿️', '🦆', '🎭'][i - 1] || '📖'
  });
}

// Helper: Get cyclic day (1-30) for grammar/language topics
function getTopicDay(day) {
  return ((day - 1) % 30) + 1;
}

// Helper: Get grammar or language topic
function getGrammarLanguageTopic(day) {
  const topicDay = getTopicDay(day);
  const topics = grammarLanguage.topics || grammarLanguage;
  
  // Find the topic for this day
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
  
  // Fallback
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
console.log('🏗️  Building 2nd grade lessons...\n');

let dayCounter = 1;

books.forEach(book => {
  try {
    const unitCard = JSON.parse(fs.readFileSync(`book-data/${book.file}`, 'utf8'));
    console.log(`📚 Book ${book.bookNum}: ${unitCard.unitInfo.book} (${unitCard.chapters.length} chapters)`);
    
    unitCard.chapters.forEach((chapter, chIdx) => {
      const relativeDay = chIdx + 1;
      const isAssessment = relativeDay % 5 === 0;
      
      if (isAssessment) {
        console.log(`  📝 Day ${dayCounter} - Assessment (building placeholder)`);
        
        // Build simple assessment placeholder
        const assessmentHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day ${dayCounter} Assessment - BedrockELA</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
    h1 { color: #305853; }
    p { line-height: 1.8; }
    .home-btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #305853; color: white; text-decoration: none; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📝 Day ${dayCounter} - Assessment</h1>
    <p>Assessment content coming soon.</p>
    <a href="../student-dashboard.html" class="home-btn">← Back to Dashboard</a>
  </div>
</body>
</html>`;
        
        const filename = `curriculum/grade2/2nd-grade-lesson-${dayCounter.toString().padStart(3, '0')}.html`;
        fs.writeFileSync(filename, assessmentHTML);
        
        dayCounter++;
        return;
      }
      
      const week = Math.ceil(dayCounter / 5);
      const grammarLanguage = getGrammarLanguageTopic(dayCounter);
      const isWriting = dayCounter % 2 === 1;
      
      const lessonData = {
        grade: 2,
        day: dayCounter,
        week: week,
        title: chapter.title,
        bookTitle: unitCard.unitInfo.book,
        emoji: book.emoji,
        objectives: [
          `Read ${chapter.title}`,
          `Learn ${chapter.vocabulary?.length || 2} new words`,
          `Practice ${grammarLanguage.topic}`,
          `${isWriting ? 'Write' : 'Journal'} about the story`
        ],
        vocabularyWords: chapter.vocabulary || [],
        storyParts: splitStory(chapter.text),
        comprehensionQuestions: chapter.comprehension?.map(q => q.question) || [],
        grammarOrLanguage: grammarLanguage,
        informationalText: chapter.informationalText || {
          title: 'Did You Know?',
          content: `This story teaches us important lessons.`,
          question: 'What did you learn from this chapter?'
        },
        writingPrompt: {
          type: isWriting ? 'writing' : 'journal',
          prompt: isWriting ?
            (chapter.writingPrompt?.prompt || 'Write about what happened in this chapter.') :
            (chapter.journalPrompt?.prompt || 'How did this chapter make you feel?')
        }
      };
      
      const html = generateLesson(lessonData);
      const filename = `curriculum/grade2/2nd-grade-lesson-${dayCounter.toString().padStart(3, '0')}.html`;
      
      // Create directory if needed
      if (!fs.existsSync('curriculum/grade2')) {
        fs.mkdirSync('curriculum/grade2', { recursive: true });
      }
      
      fs.writeFileSync(filename, html);
      console.log(`  ✅ Day ${dayCounter} - ${chapter.title}`);
      
      dayCounter++;
    });
    
    console.log('');
    
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }
});

console.log(`🎉 Built ${dayCounter - 1} lessons for 2nd grade!`);
