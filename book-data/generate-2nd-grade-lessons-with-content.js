#!/usr/bin/env node

/**
 * Generate Complete 2nd Grade HTML Lessons with Full Chapter Content
 * Pulls actual story text from complete text files
 */

const fs = require('fs');
const path = require('path');

// Parse chapter content from complete text files
function parseChapterContent(completeTextFile, chapterNum) {
  if (!fs.existsSync(completeTextFile)) {
    return null;
  }
  
  const content = fs.readFileSync(completeTextFile, 'utf-8');
  
  // Find the chapter section
  const chapterRegex = new RegExp(`Chapter ${chapterNum}:([^\\n]+)([\\s\\S]*?)(?=Chapter ${chapterNum + 1}:|Chapter ${chapterNum} Vocabulary|$)`, 'i');
  const match = content.match(chapterRegex);
  
  if (!match) {
    return null;
  }
  
  const chapterTitle = match[1].trim();
  let chapterText = match[2].trim();
  
  // Clean up the chapter text
  // Remove "Page X" markers and combine into paragraphs
  chapterText = chapterText
    .split(/Page \d+\s*/g)
    .filter(section => section.trim().length > 0)
    .map(section => section.trim())
    .join('\n\n');
  
  // Split into paragraphs
  const paragraphs = chapterText
    .split(/\n\n+/)
    .filter(p => p.trim().length > 0)
    .map(p => p.replace(/\n/g, ' ').trim());
  
  return {
    title: chapterTitle,
    paragraphs: paragraphs
  };
}

function generateLessonHTML(unitCard, day, chapterNum, bookNumber) {
  const lesson = {
    day: day,
    week: Math.ceil(day / 4),
    chapter: chapterNum,
    title: unitCard.title,
    bookNumber: unitCard.bookNumber,
    totalDays: unitCard.totalDays
  };
  
  // Get chapter content from complete text file
  const bookNumStr = String(bookNumber).padStart(2, '0');
  const completeFiles = fs.readdirSync(__dirname).filter(f => 
    f.startsWith(`book-${bookNumStr}-`) && f.endsWith('-complete.txt')
  );
  
  let chapterContent = null;
  if (completeFiles.length > 0) {
    const completeTextFile = path.join(__dirname, completeFiles[0]);
    chapterContent = parseChapterContent(completeTextFile, chapterNum);
  }
  
  // Get chapter data
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
    <style>
        .lesson-page {
            display: none;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            min-height: 500px;
        }
        .lesson-page.active {
            display: block;
        }
        .story-content p {
            margin-bottom: 1em;
            line-height: 1.6;
            font-size: 16px;
        }
        .vocab-word {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .question {
            margin-bottom: 25px;
        }
        .choice {
            display: block;
            margin: 8px 0;
            padding: 10px;
            background: #fff;
            border: 2px solid #ddd;
            border-radius: 5px;
            cursor: pointer;
        }
        .choice:hover {
            background: #f0f0f0;
        }
        .lesson-nav {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 15px 30px;
            border-radius: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            gap: 20px;
            align-items: center;
        }
        .lesson-nav button {
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            background: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        .lesson-nav button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>

<div id="lessonViewer">
    <!-- Page 1: Title Page -->
    <div class="lesson-page active" data-page="1">
        <div class="title-page">
            <h1>Day ${day}</h1>
            <h2>${unitCard.title}</h2>
            <p class="book-info">Book ${unitCard.bookNumber} • Week ${lesson.week} • Day ${day} of ${unitCard.totalDays}</p>
            <p class="chapter-info">Chapter ${lesson.chapter}${chapterContent ? `: ${chapterContent.title}` : ''}</p>
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
        <h2>📚 ${chapterContent ? chapterContent.title : `Chapter ${lesson.chapter}`}</h2>
        <div class="story-content">
            ${chapterContent && chapterContent.paragraphs ? 
              chapterContent.paragraphs.map(p => `<p>${p}</p>`).join('') :
              `<p><em>Story content loading...</em></p>`}
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
                ${grammarOrLanguage.content ? grammarOrLanguage.content.split('\n\n').map(para => {
                  // Handle bold formatting
                  const formatted = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                  // Handle bullet points
                  if (para.includes('•') || para.startsWith('-')) {
                    const items = formatted.split(/[•\-]\s+/).filter(item => item.trim().length > 0);
                    return '<ul>' + items.map(item => `<li>${item.trim()}</li>`).join('') + '</ul>';
                  }
                  return `<p>${formatted}</p>`;
                }).join('') : '<p>Lesson content loading...</p>'}
            </div>
            <div class="practice-area">
                <h4>Practice:</h4>
                <textarea class="answer-box" placeholder="Complete the practice exercises..." rows="5" style="width: 100%; padding: 10px; font-size: 14px;"></textarea>
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
            <textarea class="writing-box" placeholder="Write your response here..." rows="15" style="width: 100%; padding: 15px; font-size: 16px; line-height: 1.6;"></textarea>
            <div class="word-count" style="margin-top: 10px; text-align: right; color: #666;">Words: <span id="wordCount">0</span></div>
            ` : '<p>Writing prompt loading...</p>'}
        </div>
    </div>

    <!-- Page 8: Completion -->
    <div class="lesson-page" data-page="8">
        <div class="completion-page" style="text-align: center; padding: 60px 20px;">
            <h1>🎉 Great Job!</h1>
            <p style="font-size: 20px;">You completed Day ${day}!</p>
            <div class="progress-summary" style="margin: 40px 0; line-height: 2;">
                <p>✅ Learned ${vocab.length} new vocabulary words</p>
                <p>✅ Read ${chapterContent ? chapterContent.title : `Chapter ${lesson.chapter}`}</p>
                <p>✅ Practiced ${isOddDay ? 'grammar' : 'language'} skills</p>
                <p>✅ Completed your ${isOddDay ? 'writing' : 'journal'}</p>
            </div>
            ${day < unitCard.totalDays ? `
            <button class="next-lesson-btn" onclick="window.location.href='day-${day + 1}.html'" style="padding: 15px 40px; font-size: 18px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer;">
                Continue to Day ${day + 1} →
            </button>
            ` : `
            <button class="next-lesson-btn" style="padding: 15px 40px; font-size: 18px; background: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer;">
                🎊 Book Complete! 🎊
            </button>
            `}
        </div>
    </div>
</div>

<!-- Navigation -->
<div class="lesson-nav">
    <button id="prevBtn" onclick="prevPage()">← Previous</button>
    <span id="pageIndicator">Page 1 of 8</span>
    <button id="nextBtn" onclick="nextPage()">Next →</button>
</div>

<script>
let currentPage = 1;
const totalPages = 8;

function showPage(pageNum) {
    document.querySelectorAll('.lesson-page').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelector(\`.lesson-page[data-page="\${pageNum}"]\`).classList.add('active');
    
    document.getElementById('pageIndicator').textContent = \`Page \${pageNum} of \${totalPages}\`;
    document.getElementById('prevBtn').disabled = pageNum === 1;
    document.getElementById('nextBtn').disabled = pageNum === totalPages;
    
    window.scrollTo(0, 0);
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
});

// Word count for writing area
const writingBox = document.querySelector('.writing-box');
if (writingBox) {
    writingBox.addEventListener('input', function() {
        const words = this.value.trim().split(/\\s+/).filter(w => w.length > 0);
        document.getElementById('wordCount').textContent = words.length;
    });
}

// Initialize
showPage(1);
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
  
  console.log(`\n📚 Generating lessons for Book ${bookNumber}: ${unitCard.title}`);
  console.log(`   Total days: ${unitCard.totalDays}`);
  
  // Create output directory
  const outputDir = path.join(__dirname, '..', '2nd-grade-lessons', `book-${bookNumStr}`);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let generated = 0;
  
  // Generate lessons for days 1-6 (non-assessment days)
  for (let day = 1; day <= 6; day++) {
    const html = generateLessonHTML(unitCard, day, day, bookNumber);
    const filename = `day-${day}.html`;
    fs.writeFileSync(path.join(outputDir, filename), html);
    generated++;
  }
  
  console.log(`   ✅ Generated ${generated} lessons with full chapter content`);
  return generated;
}

// Run for specified book or all books
const bookArg = process.argv[2];

if (bookArg === 'all') {
  console.log('🚀 Generating ALL 24 books...\n');
  let totalGenerated = 0;
  
  for (let i = 1; i <= 24; i++) {
    const generated = generateAllLessons(i);
    if (generated) totalGenerated += generated;
  }
  
  console.log(`\n🎉 COMPLETE! Generated ${totalGenerated} total lessons across 24 books!`);
} else {
  const bookToGenerate = bookArg ? parseInt(bookArg) : 1;
  generateAllLessons(bookToGenerate);
  console.log(`\n💡 To generate all books, run: node generate-2nd-grade-lessons-with-content.js all`);
}
