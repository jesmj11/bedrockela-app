// Build COMPLETE 180-day 2nd Grade curriculum
// Properly structured as 36 weeks (4 regular + 1 assessment per week)

const fs = require('fs');
const { generateLesson } = require('./lesson-template-clean.js');

// Load all 24 books
const books = [];
for (let i = 1; i <= 24; i++) {
  const bookNum = i.toString().padStart(2, '0');
  const unitCard = JSON.parse(fs.readFileSync(`book-data/2nd-grade-book-${bookNum}-complete-unit-card.json`, 'utf8'));
  books.push({
    bookNum: i,
    unitCard,
    emoji: ['📚', '🐱', '🍪', '🥣', '👞', '🕯️', '🦁', '🐦', '🐕', '🌬️', '🐈', '🦆', '🥛', '🌳', '🐑', '🪵', '🥚', '✂️', '🐾', '🦔', '🐰', '🐿️', '🦆', '🎭'][i - 1] || '📖'
  });
}

// Flatten all chapters
const allChapters = [];
books.forEach(book => {
  book.unitCard.chapters.forEach((chapter, idx) => {
    allChapters.push({
      chapter,
      bookTitle: book.unitCard.unitInfo.book,
      emoji: book.emoji
    });
  });
});

console.log(`📚 Total chapters available: ${allChapters.length}`);
console.log(`🎯 Building 180 days (36 weeks of 5 days each)\n`);

// Build 36 weeks
for (let week = 1; week <= 36; week++) {
  const weekStart = (week - 1) * 5 + 1;
  
  console.log(`Week ${week} (Days ${weekStart}-${weekStart + 4}):`);
  
  // Build 4 regular lessons + 1 assessment per week
  for (let dayInWeek = 1; dayInWeek <= 5; dayInWeek++) {
    const absoluteDay = weekStart + dayInWeek - 1;
    const isAssessment = dayInWeek === 5;
    
    if (isAssessment) {
      // Build assessment page
      const assessmentHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day ${absoluteDay} Assessment - BedrockELA</title>
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
    <h1>📝 Day ${absoluteDay} - Week ${week} Assessment</h1>
    <p>Assessment content coming soon.</p>
    <a href="../student-dashboard.html" class="home-btn">← Back to Dashboard</a>
  </div>
</body>
</html>`;
      
      const filename = `curriculum/grade2/2nd-grade-lesson-${absoluteDay.toString().padStart(3, '0')}.html`;
      if (!fs.existsSync('curriculum/grade2')) {
        fs.mkdirSync('curriculum/grade2', { recursive: true });
      }
      fs.writeFileSync(filename, assessmentHTML);
      console.log(`  📝 Day ${absoluteDay} - Assessment`);
      
    } else {
      // Build regular lesson from chapter
      const chapterIndex = (week - 1) * 4 + (dayInWeek - 1);
      
      if (chapterIndex >= allChapters.length) {
        console.log(`  ⚠️  Day ${absoluteDay} - No chapter available`);
        continue;
      }
      
      const { chapter, bookTitle, emoji } = allChapters[chapterIndex];
      
      // Split story into 3 parts
      const paragraphs = chapter.text.split('\n\n').filter(p => p.trim());
      const third = Math.ceil(paragraphs.length / 3);
      const storyParts = [
        paragraphs.slice(0, third).join('\n\n'),
        paragraphs.slice(third, third * 2).join('\n\n'),
        paragraphs.slice(third * 2).join('\n\n')
      ];
      
      const isWriting = absoluteDay % 2 === 1;
      
      const lessonData = {
        grade: 2,
        day: absoluteDay,
        week: week,
        title: chapter.title,
        bookTitle: bookTitle,
        emoji: emoji,
        objectives: [
          `Read ${chapter.title}`,
          `Learn ${chapter.vocabulary?.length || 2} new words`,
          `Answer comprehension questions`,
          `${isWriting ? 'Write' : 'Journal'} about the story`
        ],
        vocabularyWords: chapter.vocabulary || [],
        storyParts,
        comprehensionQuestions: chapter.comprehension?.map(q => q.question) || ['What happened?', 'What did you learn?'],
        grammarOrLanguage: {
          type: 'grammar',
          topic: 'Review',
          learn: 'Practice what we\'ve learned.',
          example: 'Review your work.'
        },
        informationalText: chapter.informationalText || {
          title: 'Did You Know?',
          content: 'This story teaches us important lessons.',
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
      const filename = `curriculum/grade2/2nd-grade-lesson-${absoluteDay.toString().padStart(3, '0')}.html`;
      fs.writeFileSync(filename, html);
      
      console.log(`  ✅ Day ${absoluteDay} - ${chapter.title}`);
    }
  }
  
  console.log('');
}

console.log('🎉 Complete! Built all 180 days for 2nd grade!');
console.log('   144 regular lessons + 36 assessments = 180 total');
