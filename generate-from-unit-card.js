#!/usr/bin/env node
/**
 * Universal Bedrock Spine Lesson Generator
 * Reads from unit card JSON and chapter text file
 * 
 * Usage: node generate-from-unit-card.js <unit-card.json> <chapters.txt> <output-folder>
 * Example: node generate-from-unit-card.js book-data/three-musketeers-unit-card.json book-data/three-musketeers-complete.txt curriculum/grade4
 */

const fs = require('fs');
const path = require('path');

// Parse arguments
const args = process.argv.slice(2);
if (args.length < 3) {
    console.error('Usage: node generate-from-unit-card.js <unit-card.json> <chapters.txt> <output-folder>');
    console.error('Example: node generate-from-unit-card.js book-data/three-musketeers-unit-card.json book-data/three-musketeers-complete.txt curriculum/grade4');
    process.exit(1);
}

const [unitCardPath, chaptersPath, outputFolder] = args;

// Load unit card
console.log(`\n📚 Bedrock Spine Lesson Generator\n`);
console.log(`Loading unit card: ${unitCardPath}`);
const unitCard = JSON.parse(fs.readFileSync(unitCardPath, 'utf-8'));

console.log(`Loading chapters: ${chaptersPath}`);
const chaptersText = fs.readFileSync(chaptersPath, 'utf-8');

// Parse chapters from text file
const chapters = {};
const chapterMatches = chaptersText.split(/^Chapter \d+:/gm).slice(1);
const chapterTitles = chaptersText.match(/^Chapter \d+:[^\n]+/gm) || [];

chapterTitles.forEach((titleLine, idx) => {
    const title = titleLine.replace(/^Chapter \d+:\s*/, '').trim();
    const text = chapterMatches[idx] ? chapterMatches[idx].trim() : '';
    chapters[title] = text;
});

console.log(`✓ Loaded ${Object.keys(chapters).length} chapters`);
console.log(`✓ Unit: ${unitCard.title}`);
console.log(`✓ Days: ${unitCard.days} (${unitCard.totalDays} total)`);
console.log(`\n🔨 Generating lessons...\n`);

// Create output folder
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

// Build lesson mapping (24 chapters across days, skipping assessments)
const [startDay, endDay] = unitCard.days.split('-').map(Number);
const regularDayMap = [];
for (let day = startDay; day <= endDay; day++) {
    if (!unitCard.assessmentSchedule.includes(day)) {
        regularDayMap.push(day);
    }
}

// Generate each lesson
let lessonCount = 0;
regularDayMap.forEach((day, chapterIndex) => {
    const weekNum = Math.floor((day - startDay) / 5) + Math.ceil(startDay / 5);
    const vocabData = unitCard.vocabulary.find(v => v.day === day);
    const compData = unitCard.comprehension.find(c => c.day === day);
    const infoData = unitCard.informationalTexts.find(i => i.day === day);
    const grammarData = unitCard.grammar.find(g => g.day === day);
    const languageData = unitCard.language.find(l => l.day === day);
    const writingData = unitCard.writing.find(w => w.day === day);
    const journalData = unitCard.journal.find(j => j.day === day);
    
    if (!compData) {
        console.log(`  ⏭️  Day ${day}: No chapter data (skipping)`);
        return;
    }
    
    const chapterTitle = compData.chapter;
    const chapterText = chapters[chapterTitle];
    
    if (!chapterText) {
        console.log(`  ❌ Day ${day}: Chapter "${chapterTitle}" not found`);
        return;
    }
    
    generateLesson(day, weekNum, chapterTitle, chapterText, {
        vocab: vocabData,
        comp: compData,
        info: infoData,
        grammar: grammarData,
        language: languageData,
        writing: writingData,
        journal: journalData
    });
    
    lessonCount++;
    console.log(`  📖 Day ${day}: ${chapterTitle}`);
});

// Generate assessment days
unitCard.assessmentSchedule.forEach((day, idx) => {
    const weekNum = Math.floor((day - startDay) / 5) + Math.ceil(startDay / 5);
    const assessmentWords = unitCard.assessmentWords.find(a => a[0] === day);
    if (assessmentWords) {
        generateAssessment(day, weekNum, assessmentWords[1]);
        console.log(`  📝 Day ${day}: Assessment (Week ${weekNum})`);
    }
});

console.log(`\n✅ Generation complete!`);
console.log(`   Regular lessons: ${lessonCount}`);
console.log(`   Assessment days: ${unitCard.assessmentSchedule.length}`);
console.log(`   Total files: ${lessonCount + unitCard.assessmentSchedule.length}`);
console.log(`\n📁 Output: ${outputFolder}\n`);

// ===== LESSON GENERATION FUNCTIONS =====

function generateLesson(day, week, chapterTitle, chapterText, data) {
    const filename = `${outputFolder}/4th-grade-lesson-${day}.html`;
    
    // Split story into 3 parts
    const storyParts = splitStory(chapterText, 3);
    
    // Determine grammar/language (odd days = grammar, even = language)
    const isOddDay = (day % 2) === 1;
    const skillSection = isOddDay ? data.grammar : data.language;
    const skillType = isOddDay ? 'Grammar' : 'Language';
    
    // Determine writing/journal (odd days = writing, even = journal)
    const creativeSection = isOddDay ? data.writing : data.journal;
    const creativeType = isOddDay ? 'Writing' : 'Journal';
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>4th Grade - Day ${day}: ${chapterTitle}</title>
    <link rel="stylesheet" href="../../../css/lesson-styles.css">
    <link rel="stylesheet" href="../../../css/lesson-complete-styles.css">
</head>
<body>
    <!-- Page 1: Title & Objectives -->
    <div class="lesson-page" id="page1">
        <div class="page-header">
            <h1>Day ${day} - Week ${week}</h1>
            <h2>${unitCard.title.split(' by ')[0]}</h2>
        </div>
        <div class="lesson-title">
            <h1>${chapterTitle}</h1>
        </div>
        <div class="learning-objectives">
            <h3>📚 What You'll Learn Today</h3>
            <ul>
                <li>Read: ${chapterTitle}</li>
                <li>Learn ${data.vocab ? data.vocab.words.length : 2} new vocabulary words</li>
                <li>Answer comprehension questions</li>
                <li>Practice ${skillType.toLowerCase()}</li>
                <li>Complete ${creativeType.toLowerCase()} prompt</li>
            </ul>
        </div>
        <button class="btn-next" onclick="nextPage()">Begin Lesson →</button>
    </div>

    <!-- Page 2: Vocabulary -->
    ${generateVocabPage(data.vocab, week)}

    <!-- Page 3: Vocabulary Game -->
    ${generateVocabGame(data.vocab)}

    <!-- Pages 4-6: Story (3 parts) -->
    ${generateStoryPages(storyParts, chapterTitle, data.vocab)}

    <!-- Page 7: Comprehension -->
    ${generateComprehensionPage(data.comp)}

    <!-- Page 8: Grammar or Language -->
    ${generateSkillPage(skillSection, skillType, day)}

    <!-- Page 9: Informational Text -->
    ${generateInfoTextPage(data.info)}

    <!-- Page 10: Writing or Journal -->
    ${generateCreativePage(creativeSection, creativeType)}

    <!-- Page 11: Completion -->
    ${generateCompletionPage(day, chapterTitle)}

    <script src="../../../js/lesson-viewer.js"></script>
    <script>initLessonViewer();</script>
</body>
</html>`;
    
    fs.writeFileSync(filename, html, 'utf-8');
}

function generateAssessment(day, week, words) {
    const filename = `${outputFolder}/4th-grade-lesson-${day}.html`;
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>4th Grade - Day ${day}: Vocabulary Assessment</title>
    <link rel="stylesheet" href="../../../css/lesson-styles.css">
    <link rel="stylesheet" href="../../../css/assessment-styles.css">
</head>
<body>
    <div class="assessment-container">
        <div class="assessment-header">
            <h1>Week ${week} Vocabulary Assessment</h1>
            <p>Day ${day}</p>
        </div>
        
        ${words.map((word, idx) => `
        <div class="word-page">
            <div class="word-number">${idx + 1} of ${words.length}</div>
            <div class="word-display">${word}</div>
            <textarea placeholder="Write the definition..."></textarea>
            <button class="btn-next" onclick="document.querySelectorAll('.word-page')[${idx + 1}]?.scrollIntoView({behavior: 'smooth'})">Next Word →</button>
        </div>`).join('\n        ')}
        
        <div class="completion-page">
            <h2>✅ Assessment Complete!</h2>
            <p>You defined ${words.length} words from this week.</p>
            <button class="btn-submit">Submit for Review</button>
        </div>
    </div>
</body>
</html>`;
    
    fs.writeFileSync(filename, html, 'utf-8');
}

// Helper functions for HTML generation
function splitStory(text, parts = 3) {
    const paragraphs = text.split('\n\n').filter(p => p.trim() && p.trim() !== '~ ~ ~');
    const parasPerPart = Math.ceil(paragraphs.length / parts);
    
    const result = [];
    for (let i = 0; i < parts; i++) {
        const start = i * parasPerPart;
        const end = Math.min((i + 1) * parasPerPart, paragraphs.length);
        result.push(paragraphs.slice(start, end).join('\n\n'));
    }
    return result;
}

function generateVocabPage(vocabData, week) {
    if (!vocabData || !vocabData.words) return '';
    
    return `
    <div class="lesson-page" id="page2" style="display: none;">
        <div class="page-header">
            <h2>📖 Vocabulary</h2>
            <p>Week ${week}</p>
        </div>
        <div class="vocab-section">
            <h3>Today's Words</h3>
            ${vocabData.words.map((w, idx) => `
            <div class="vocab-word">
                <h4>${idx + 1}. ${w.word}</h4>
                <p><strong>Definition:</strong> ${w.definition}</p>
                <p class="vocab-sentence"><em>"${w.sentence}"</em></p>
                <label>Use it in your own sentence:</label>
                <textarea rows="2" placeholder="Write your sentence here..."></textarea>
            </div>`).join('\n            ')}
        </div>
        <button class="btn-prev" onclick="prevPage()">← Back</button>
        <button class="btn-next" onclick="nextPage()">Next →</button>
    </div>`;
}

function generateVocabGame(vocabData) {
    if (!vocabData || !vocabData.words) return '';
    
    return `
    <div class="lesson-page" id="page3" style="display: none;">
        <div class="page-header">
            <h2>🎮 Vocabulary Game</h2>
            <p>Match the words!</p>
        </div>
        <div class="vocab-game">
            <p>Draw lines to match each word with its definition:</p>
            ${vocabData.words.map(w => `
            <div class="match-pair">
                <div class="match-word">${w.word}</div>
                <div class="match-def">${w.definition}</div>
            </div>`).join('\n            ')}
        </div>
        <button class="btn-prev" onclick="prevPage()">← Back</button>
        <button class="btn-next" onclick="nextPage()">Next →</button>
    </div>`;
}

function generateStoryPages(storyParts, title, vocabData) {
    const vocabWords = vocabData && vocabData.words ? vocabData.words.map(w => w.word) : [];
    
    return storyParts.map((part, idx) => `
    <div class="lesson-page" id="page${4 + idx}" style="display: none;">
        <div class="page-header">
            <h2>📖 ${title} - Part ${idx + 1}</h2>
        </div>
        <div class="story-text">
            ${highlightVocab(part, vocabWords)}
        </div>
        <button class="btn-prev" onclick="prevPage()">← Back</button>
        <button class="btn-next" onclick="nextPage()">Next →</button>
    </div>`).join('\n\n    ');
}

function generateComprehensionPage(compData) {
    if (!compData || !compData.questions) return '';
    
    const mcQ = compData.questions.find(q => q.type === 'mc');
    const saQ = compData.questions.find(q => q.type === 'sa');
    
    return `
    <div class="lesson-page" id="page7" style="display: none;">
        <div class="page-header">
            <h2>📝 Comprehension Questions</h2>
        </div>
        <div class="questions-section">
            ${mcQ ? `
            <div class="question">
                <h3>1. ${mcQ.question}</h3>
                ${mcQ.options.map((opt, idx) => `
                <label class="option">
                    <input type="radio" name="q1" value="${idx}">
                    <span>${String.fromCharCode(65 + idx)}) ${opt}</span>
                </label>`).join('\n                ')}
            </div>` : ''}
            
            ${saQ ? `
            <div class="question">
                <h3>2. ${saQ.question}</h3>
                <textarea rows="4" placeholder="Write your answer here..."></textarea>
            </div>` : ''}
        </div>
        <button class="btn-prev" onclick="prevPage()">← Back</button>
        <button class="btn-next" onclick="nextPage()">Next →</button>
    </div>`;
}

function generateSkillPage(skillData, skillType, day) {
    if (!skillData) return '';
    
    return `
    <div class="lesson-page" id="page8" style="display: none;">
        <div class="page-header">
            <h2>✏️ ${skillType} Practice</h2>
        </div>
        <div class="skill-section">
            <h3>${skillData.topic}</h3>
            <p>${skillData.skill || skillData.explanation || ''}</p>
            <div class="practice">
                <label>Practice:</label>
                <textarea rows="3" placeholder="Complete the ${skillType.toLowerCase()} exercise..."></textarea>
            </div>
        </div>
        <button class="btn-prev" onclick="prevPage()">← Back</button>
        <button class="btn-next" onclick="nextPage()">Next →</button>
    </div>`;
}

function generateInfoTextPage(infoData) {
    if (!infoData) return '';
    
    return `
    <div class="lesson-page" id="page9" style="display: none;">
        <div class="page-header">
            <h2>📚 Informational Text</h2>
        </div>
        <div class="info-text-section">
            <h3>${infoData.title}</h3>
            <div class="info-text">${formatText(infoData.text)}</div>
            <div class="info-questions">
                <h4>Check Your Understanding:</h4>
                ${infoData.questions.map((q, idx) => `
                <div class="question">
                    <p><strong>${idx + 1}. ${q}</strong></p>
                    <textarea rows="2" placeholder="Your answer..."></textarea>
                </div>`).join('\n                ')}
            </div>
        </div>
        <button class="btn-prev" onclick="prevPage()">← Back</button>
        <button class="btn-next" onclick="nextPage()">Next →</button>
    </div>`;
}

function generateCreativePage(creativeData, creativeType) {
    if (!creativeData) return '';
    
    return `
    <div class="lesson-page" id="page10" style="display: none;">
        <div class="page-header">
            <h2>✍️ ${creativeType} Prompt</h2>
        </div>
        <div class="writing-section">
            <div class="prompt">
                <p>${creativeData.prompt}</p>
            </div>
            <textarea rows="10" placeholder="Write your response here (1-2 paragraphs)..."></textarea>
        </div>
        <button class="btn-prev" onclick="prevPage()">← Back</button>
        <button class="btn-next" onclick="nextPage()">Next →</button>
    </div>`;
}

function generateCompletionPage(day, title) {
    return `
    <div class="lesson-page" id="page11" style="display: none;">
        <div class="completion-page">
            <h1>🎉 Lesson Complete!</h1>
            <p>Great work on Day ${day}!</p>
            <h3>You finished: ${title}</h3>
            <div class="completion-stats">
                <div class="stat">📖 Story read</div>
                <div class="stat">📝 Questions answered</div>
                <div class="stat">✏️ Skills practiced</div>
                <div class="stat">✍️ Writing completed</div>
            </div>
            <button class="btn-submit">Submit Lesson</button>
        </div>
        <button class="btn-prev" onclick="prevPage()">← Back</button>
    </div>`;
}

function highlightVocab(text, vocabWords) {
    let result = text;
    vocabWords.forEach(word => {
        const regex = new RegExp(`\\b(${word})\\b`, 'gi');
        result = result.replace(regex, '<span class="vocab-highlight">$1</span>');
    });
    return formatText(result);
}

function formatText(text) {
    return text.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('\n');
}
