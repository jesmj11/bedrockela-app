#!/usr/bin/env node

/**
 * Generate Complete 2nd Grade HTML Lessons
 * Creates full interactive lessons from unit cards
 */

const fs = require('fs');
const path = require('path');

function generateLessonHTML(unitCard, day, chapterNum) {
  const lesson = {
    day: day,
    week: Math.ceil(day / 4),
    chapter: chapterNum,
    title: unitCard.title,
    bookNumber: unitCard.bookNumber,
    totalDays: unitCard.totalDays
  };
  
  // Get chapter content
  const chapter = unitCard.vocabularyLessons[chapterNum - 1];
  const vocab = chapter ? chapter.words : [];
  
  // Get comprehension
  const compQuestions = unitCard.comprehensionQuestions[chapterNum - 1];
  
  // Get grammar or language (alternating)
  const isOddDay = day % 2 === 1;
  const grammarOrLanguage = isOddDay 
    ? unitCard.grammarLessons.find(g => g.day === day)
    : unitCard.languageLessons.find(l => l.day === day);
  
  // Get writing or journal prompt
  const writingOrJournal = isOddDay
    ? unitCard.writingPrompts.find(w => w.day === day)
    : unitCard.journalPrompts.find(j => j.day === day);
  
  // Get informational text
  const infoText = unitCard.informationalTexts[chapterNum - 1];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${day} - ${unitCard.title} - BedrockELA 2nd Grade</title>
    <link rel="stylesheet" href="../css/lesson-viewer.css">
</head>
<body>

<div id="lessonViewer">
    <!-- Page 1: Title Page -->
    <div class="lesson-page" data-page="1">
        <div class="title-page">
            <h1>Day ${day}</h1>
            <h2>${unitCard.title}</h2>
            <p class="book-info">Book ${unitCard.bookNumber} • Week ${lesson.week} • Day ${day} of ${unitCard.totalDays}</p>
            <p class="chapter-info">Chapter ${lesson.chapter}</p>
        </div>
    </div>

    <!-- Page 2: Vocabulary -->
    <div class="lesson-page" data-page="2">
        <h2>📖 Vocabulary Words</h2>
        <div class="vocabulary-section">
            ${vocab.map((word, idx) => `
            <div class="vocab-word">
                <h3>${idx + 1}. ${word.word}</h3>
                <p class="definition"><strong>Definition:</strong> ${word.definition}</p>
                ${word.sentence ? `<p class="example"><strong>Example:</strong> ${word.sentence}</p>` : ''}
            </div>
            `).join('')}
        </div>
    </div>

    <!-- Page 3: Story -->
    <div class="lesson-page" data-page="3">
        <h2>📚 Today's Story</h2>
        <div class="story-content">
            <p><em>[Chapter ${lesson.chapter} content would be inserted here from the chapter text files]</em></p>
            <p>Read the story carefully. Look for the vocabulary words we just learned!</p>
        </div>
    </div>

    <!-- Page 4: Comprehension -->
    <div class="lesson-page" data-page="4">
        <h2>🤔 Reading Comprehension</h2>
        <div class="comprehension-section">
            ${compQuestions && compQuestions.questions ? compQuestions.questions.map((q, idx) => `
            <div class="question">
                <p class="question-text"><strong>${idx + 1}. ${q.question}</strong></p>
                <div class="answer-choices">
                    ${q.options ? q.options.map((opt, optIdx) => `
                    <label class="choice">
                        <input type="radio" name="q${idx}" value="${optIdx}">
                        ${opt}
                    </label>
                    `).join('') : `
                    <textarea class="answer-box" placeholder="Write your answer here..." rows="3"></textarea>
                    `}
                </div>
            </div>
            `).join('') : '<p>Comprehension questions loading...</p>'}
        </div>
    </div>

    <!-- Page 5: Grammar or Language -->
    <div class="lesson-page" data-page="5">
        <h2>${isOddDay ? '✏️ Grammar Lesson' : '📝 Language Lesson'}</h2>
        ${grammarOrLanguage ? `
        <div class="grammar-language-section">
            <h3>${grammarOrLanguage.topic}</h3>
            ${grammarOrLanguage.objective ? `<p class="objective"><strong>Goal:</strong> ${grammarOrLanguage.objective}</p>` : ''}
            <div class="lesson-content">
                ${grammarOrLanguage.content ? grammarOrLanguage.content.split('\n\n').map(para => 
                    `<p>${para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`
                ).join('') : '<p>Lesson content loading...</p>'}
            </div>
            <div class="practice-area">
                <h4>Practice:</h4>
                <textarea class="answer-box" placeholder="Complete the practice exercises..." rows="5"></textarea>
            </div>
        </div>
        ` : '<p>Lesson loading...</p>'}
    </div>

    <!-- Page 6: Informational Text -->
    <div class="lesson-page" data-page="6">
        <h2>📰 Learn Something New!</h2>
        <div class="informational-section">
            ${infoText ? `
            <h3>${infoText.topic}</h3>
            ${infoText.title ? `<h4>${infoText.title}</h4>` : ''}
            ${infoText.content ? `
            <div class="info-text">
                ${infoText.content.split('\n\n').map(para => `<p>${para}</p>`).join('')}
            </div>
            ` : '<p><em>Informational text about ${infoText.topic} will be added here.</em></p>'}
            ` : '<p>Informational text loading...</p>'}
        </div>
    </div>

    <!-- Page 7: Writing or Journal -->
    <div class="lesson-page" data-page="7">
        <h2>${isOddDay ? '✍️ Writing Activity' : '📓 Journal Entry'}</h2>
        <div class="writing-section">
            ${writingOrJournal ? `
            <p class="prompt"><strong>Prompt:</strong> ${writingOrJournal.prompt}</p>
            <textarea class="writing-box" placeholder="Write your response here..." rows="15"></textarea>
            <div class="word-count">Words: <span id="wordCount">0</span></div>
            ` : '<p>Writing prompt loading...</p>'}
        </div>
    </div>

    <!-- Page 8: Completion -->
    <div class="lesson-page" data-page="8">
        <div class="completion-page">
            <h1>🎉 Great Job!</h1>
            <p>You completed Day ${day}!</p>
            <div class="progress-summary">
                <p>✅ Learned ${vocab.length} new vocabulary words</p>
                <p>✅ Read Chapter ${lesson.chapter}</p>
                <p>✅ Practiced ${isOddDay ? 'grammar' : 'language'} skills</p>
                <p>✅ Completed your ${isOddDay ? 'writing' : 'journal'}</p>
            </div>
            <button class="next-lesson-btn" onclick="window.location.href='day-${day + 1}.html'">
                Continue to Day ${day + 1} →
            </button>
        </div>
    </div>
</div>

<!-- Navigation -->
<div class="lesson-nav">
    <button id="prevBtn" onclick="prevPage()">← Previous</button>
    <span id="pageIndicator">Page 1 of 8</span>
    <button id="nextBtn" onclick="nextPage()">Next →</button>
</div>

<script src="../js/lesson-viewer.js"></script>
<script>
    initLessonViewer();
    
    // Word count for writing area
    const writingBox = document.querySelector('.writing-box');
    if (writingBox) {
        writingBox.addEventListener('input', function() {
            const words = this.value.trim().split(/\\s+/).filter(w => w.length > 0);
            document.getElementById('wordCount').textContent = words.length;
        });
    }
</script>

</body>
</html>`;
}

// Main function
function generateAllLessons(bookNumber) {
  const bookNumStr = String(bookNumber).padStart(2, '0');
  
  // Find unit card file
  const files = fs.readdirSync(__dirname).filter(f => 
    f.startsWith(`2nd-grade-book-${bookNumStr}-`) && f.endsWith('-unit-card.json')
  );
  
  if (files.length === 0) {
    console.log(`❌ No unit card found for Book ${bookNumber}`);
    return;
  }
  
  const unitCard = JSON.parse(fs.readFileSync(path.join(__dirname, files[0]), 'utf-8'));
  
  console.log(`\nGenerating lessons for Book ${bookNumber}: ${unitCard.title}`);
  console.log(`Total days: ${unitCard.totalDays}`);
  
  // Create output directory
  const outputDir = path.join(__dirname, '..', '2nd-grade-lessons', `book-${bookNumStr}`);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let generated = 0;
  
  // Generate lessons for days 1-6 (non-assessment days)
  for (let day = 1; day <= 6; day++) {
    const html = generateLessonHTML(unitCard, day, day);
    const filename = `day-${day}.html`;
    fs.writeFileSync(path.join(outputDir, filename), html);
    generated++;
  }
  
  console.log(`✅ Generated ${generated} lesson files in ${outputDir}`);
}

// Run for Book 1 as example
const bookToGenerate = process.argv[2] ? parseInt(process.argv[2]) : 1;
generateAllLessons(bookToGenerate);

console.log(`\n🎉 Lesson generation complete!`);
console.log(`\nTo generate other books, run: node generate-2nd-grade-lessons.js [book-number]`);
