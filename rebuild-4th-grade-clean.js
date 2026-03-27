// Rebuild 4th Grade with Clean UI Template (Wizard of Oz)
// Based on lesson-template-clean.js system from March 24

const fs = require('fs');

// Load 4th grade Wizard of Oz data
const unitCard = JSON.parse(fs.readFileSync('book-data/wizard-of-oz-unit-card-COMPLETE.json', 'utf8'));
const grammarLessons = JSON.parse(fs.readFileSync('book-data/wizard-oz-grammar.json', 'utf8'));
const languageLessons = JSON.parse(fs.readFileSync('book-data/wizard-oz-language.json', 'utf8'));

// Load clean template
const templateFile = fs.readFileSync('templates/lesson-template.html', 'utf8');

// Chapter titles
const chapterTitles = [
  'The Cyclone', 'The Council with the Munchkins', 'How Dorothy Saved the Scarecrow',
  'The Road Through the Forest', 'The Rescue of the Tin Woodman', 'The Cowardly Lion',
  'The Journey to the Great Oz', 'The Deadly Poppy Field', 'The Queen of the Field Mice',
  'The Guardian of the Gate', 'The Wonderful City of Oz', 'The Search for the Wicked Witch',
  'The Rescue', 'The Winged Monkeys', 'The Discovery of Oz, the Terrible',
  'The Magic Art of the Great Humbug', 'How the Balloon Was Launched',
  'Away to the South', 'Attacked by the Fighting Trees', 'The Dainty China Country',
  'The Lion Becomes King of Beasts', 'The Country of the Quadlings',
  'Glinda the Good Witch Grants Dorothy\'s Wish', 'Home Again'
];

// Helper to split text into 3 parts
function splitTextIntoParts(text) {
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  const totalParagraphs = paragraphs.length;
  const perPart = Math.ceil(totalParagraphs / 3);
  
  const part1 = paragraphs.slice(0, perPart).join('\n\n');
  const part2 = paragraphs.slice(perPart, perPart * 2).join('\n\n');
  const part3 = paragraphs.slice(perPart * 2).join('\n\n');
  
  return [part1, part2, part3];
}

// Generate a single lesson (non-assessment day)
function generateLesson(day) {
  const week = Math.ceil(day / 5);
  const dayInWeek = ((day - 1) % 5) + 1;
  
  // Skip assessment days (every 5th day)
  if (dayInWeek === 5) {
    console.log(`⏭️  Day ${day}: Assessment (needs separate generator)`);
    return;
  }
  
  // Get data for this day
  const vocabEntry = unitCard.vocabulary.find(v => v.chapter === day);
  if (!vocabEntry) {
    console.log(`⚠️  Day ${day}: No vocab data, skipping`);
    return;
  }
  
  const vocabulary = [vocabEntry.word1, vocabEntry.word2];
  const chapterTitle = chapterTitles[day - 1] || `Chapter ${day}`;
  
  // Get story text (should exist in unit card)
  const chapter = unitCard.chapters && unitCard.chapters.find(c => c.day === day);
  let storyText = chapter ? chapter.text : `[Story text for ${chapterTitle} - Chapter ${day} of Wizard of Oz]`;
  const storyParts = splitTextIntoParts(storyText);
  
  // Grammar or Language (odd days = grammar, even = language)
  const isOdd = day % 2 === 1;
  const skillTopic = isOdd ? grammarLessons[day.toString()] : languageLessons[day.toString()];
  const skillType = isOdd ? 'Grammar' : 'Language';
  
  if (!skillTopic) {
    console.log(`⚠️  Day ${day}: No ${skillType} topic found`);
  }
  
  // Get informational text
  const infoText = vocabEntry.informationalText || '[Informational text content]';
  const infoTitle = vocabEntry.informationalTitle || 'Did You Know?';
  
  // Writing or Journal (odd = writing, even = journal)
  const writingPrompt = vocabEntry.writingPrompt || 'Write about what happened in today\'s reading.';
  const journalPrompt = vocabEntry.journalPrompt || 'What did you think about today\'s story?';
  const finalPrompt = isOdd ? writingPrompt : journalPrompt;
  const finalPromptType = isOdd ? 'Writing' : 'Journal';
  
  // Build HTML from template
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day ${day} - 4th Grade BedrockELA</title>
  <style>
    ${getCleanCSS()}
  </style>
</head>
<body>
  
  <!-- TOP NAVIGATION -->
  <div class="top-nav">
    <a href="student-dashboard.html" class="home-btn">← Home</a>
    <div class="day-info">Day ${day}: ${chapterTitle}</div>
    <div class="page-progress" id="topProgress">Page 1 of 11</div>
  </div>
  
  <div class="container">
    
    <!-- PAGE 1: TITLE -->
    <div class="page active" data-page="1">
      <div class="title-page">
        <div class="icon">📚</div>
        <h1>Day ${day}</h1>
        <div class="subtitle">The Wizard of Oz</div>
        <p style="color: #666; margin-top: 20px;">4th Grade • Week ${week}</p>
        <p style="color: #B06821; font-size: 1.2rem; margin-top: 10px;">${chapterTitle}</p>
      </div>
    </div>
    
    <!-- PAGE 2: WELCOME & OBJECTIVES -->
    <div class="page" data-page="2">
      <h2>📖 Welcome to Day ${day}!</h2>
      <p><strong>Today you will:</strong></p>
      <ul style="line-height: 2;">
        <li>Learn 2 new vocabulary words</li>
        <li>Read: ${chapterTitle}</li>
        <li>Practice ${skillType}: ${skillTopic || '(topic)'}</li>
        <li>Read informational text: ${infoTitle}</li>
        <li>Complete a ${finalPromptType.toLowerCase()} activity</li>
      </ul>
      <p style="margin-top: 30px;"><strong>Time needed:</strong> About 45-60 minutes</p>
    </div>
    
    <!-- PAGE 3: VOCABULARY -->
    <div class="page" data-page="3">
      <h2>📚 Vocabulary</h2>
      <p>Look up and learn these 2 words before reading:</p>
      
      <div class="vocab-word">
        <h3>1. ${vocabulary[0]}</h3>
        <label>Write your own definition (20-30 words):</label>
        <textarea id="vocab-1" placeholder="Your definition..."></textarea>
      </div>
      
      <div class="vocab-word">
        <h3>2. ${vocabulary[1]}</h3>
        <label>Write your own definition (20-30 words):</label>
        <textarea id="vocab-2" placeholder="Your definition..."></textarea>
      </div>
    </div>
    
    <!-- PAGE 4: VOCABULARY GAME -->
    <div class="page" data-page="4">
      <h2>🎮 Vocabulary Matching Game</h2>
      <p>Match each word to its definition!</p>
      <div class="vocab-game">
        <p><em>(Interactive game would go here - simplified for now)</em></p>
        <p><strong>${vocabulary[0]}</strong> → Definition from dictionary</p>
        <p><strong>${vocabulary[1]}</strong> → Definition from dictionary</p>
      </div>
    </div>
    
    <!-- PAGES 5-7: STORY (3 PARTS) -->
    <div class="page" data-page="5">
      <h2>📖 ${chapterTitle} (Part 1 of 3)</h2>
      <div class="story">
        ${formatStoryText(storyParts[0])}
      </div>
    </div>
    
    <div class="page" data-page="6">
      <h2>📖 ${chapterTitle} (Part 2 of 3)</h2>
      <div class="story">
        ${formatStoryText(storyParts[1])}
      </div>
    </div>
    
    <div class="page" data-page="7">
      <h2>📖 ${chapterTitle} (Part 3 of 3)</h2>
      <div class="story">
        ${formatStoryText(storyParts[2])}
      </div>
    </div>
    
    <!-- PAGE 8: COMPREHENSION -->
    <div class="page" data-page="8">
      <h2>💭 Reading Comprehension</h2>
      <p>Answer these questions about the story:</p>
      
      <div class="question-box">
        <h3>1. Question placeholder</h3>
        <textarea placeholder="Your answer..."></textarea>
      </div>
      
      <div class="question-box">
        <h3>2. Question placeholder</h3>
        <textarea placeholder="Your answer..."></textarea>
      </div>
    </div>
    
    <!-- PAGE 9: GRAMMAR OR LANGUAGE -->
    <div class="page" data-page="9">
      <h2>✏️ ${skillType}: ${skillTopic || 'Topic'}</h2>
      <p><em>${skillType} lesson content would go here</em></p>
      <textarea placeholder="Practice here..."></textarea>
    </div>
    
    <!-- PAGE 10: INFORMATIONAL TEXT -->
    <div class="page" data-page="10">
      <h2>📰 ${infoTitle}</h2>
      <div class="info-text">
        ${formatStoryText(infoText)}
      </div>
      <div class="question-box" style="margin-top: 30px;">
        <h3>Question about the text:</h3>
        <textarea placeholder="Your answer..."></textarea>
      </div>
    </div>
    
    <!-- PAGE 11: WRITING OR JOURNAL -->
    <div class="page" data-page="11">
      <h2>✍️ ${finalPromptType}</h2>
      <p><strong>Prompt:</strong> ${finalPrompt}</p>
      <textarea style="min-height: 300px;" placeholder="Write your response here..."></textarea>
      <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f8f5; border-radius: 10px;">
        <p style="font-size: 1.2rem; color: #305853; font-weight: bold;">🎉 Great work on Day ${day}!</p>
        <p style="color: #666; margin-top: 10px;">Click the Home button above to return to your dashboard.</p>
      </div>
    </div>
    
  </div>
  
  <!-- BOTTOM NAVIGATION -->
  <div class="bottom-nav">
    <button id="prevBtn" onclick="prevPage()">← Previous</button>
    <div class="progress">
      <div class="progress-bar" id="progressBar"></div>
    </div>
    <button id="nextBtn" onclick="nextPage()">Next →</button>
  </div>

  <script>
    ${getNavigationJS()}
  </script>
</body>
</html>`;
  
  // Write file
  const filename = `4th-grade-day-${day.toString().padStart(3, '0')}.html`;
  fs.writeFileSync(filename, html, 'utf8');
  console.log(`✅ Day ${day}: ${filename}`);
}

// Helper to format story text into paragraphs
function formatStoryText(text) {
  if (!text) return '<p>[Story text]</p>';
  return text.split(/\n\n+/).map(p => `<p>${p.trim()}</p>`).join('\n        ');
}

// CSS for clean template
function getCleanCSS() {
  return `* { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    
    .top-nav {
      background: #305853;
      color: white;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .top-nav .home-btn {
      background: rgba(255,255,255,0.2);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.2s;
    }
    
    .top-nav .home-btn:hover {
      background: rgba(255,255,255,0.3);
    }
    
    .top-nav .day-info {
      flex: 1;
      text-align: center;
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    .top-nav .page-progress {
      font-size: 0.9rem;
      opacity: 0.9;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      min-height: calc(100vh - 120px);
    }
    
    .page {
      display: none;
      padding: 40px 30px 80px;
    }
    
    .page.active {
      display: block;
    }
    
    .bottom-nav {
      position: sticky;
      bottom: 0;
      background: white;
      border-top: 2px solid #eee;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    
    .bottom-nav button {
      padding: 12px 24px;
      background: #305853;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .bottom-nav button:hover:not(:disabled) {
      background: #3d6b65;
    }
    
    .bottom-nav button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .bottom-nav .progress {
      flex: 1;
      height: 8px;
      background: #eee;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .bottom-nav .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #305853, #B06821);
      transition: width 0.3s;
      border-radius: 10px;
    }
    
    h1 { font-size: 2rem; margin-bottom: 1rem; color: #305853; }
    h2 { font-size: 1.5rem; margin-bottom: 1rem; color: #B06821; margin-top: 2rem; }
    h3 { font-size: 1.25rem; margin-bottom: 0.75rem; color: #305853; margin-top: 1.5rem; }
    p { margin-bottom: 1rem; line-height: 1.8; }
    ul, ol { margin-left: 1.5rem; margin-bottom: 1rem; }
    li { margin-bottom: 0.5rem; }
    
    .title-page {
      text-align: center;
      padding: 60px 30px;
    }
    
    .title-page .icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }
    
    .title-page h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    
    .title-page .subtitle {
      font-size: 1.5rem;
      color: #B06821;
      font-weight: 600;
      margin-top: 10px;
    }
    
    textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-family: inherit;
      font-size: 1rem;
      min-height: 120px;
      resize: vertical;
      margin-top: 10px;
    }
    
    textarea:focus {
      outline: none;
      border-color: #305853;
    }
    
    .vocab-word {
      padding: 20px;
      margin-bottom: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      border-left: 4px solid #B06821;
    }
    
    .vocab-word h3 {
      margin-top: 0;
      color: #305853;
    }
    
    .story p {
      text-indent: 2em;
      line-height: 1.8;
      margin-bottom: 15px;
    }
    
    .question-box {
      margin-bottom: 30px;
    }
    
    .info-text p {
      line-height: 1.8;
      margin-bottom: 15px;
    }`;
}

// Navigation JavaScript
function getNavigationJS() {
  return `let currentPage = 1;
    const totalPages = 11;
    
    function showPage(pageNum) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const page = document.querySelector(\`.page[data-page="\${pageNum}"]\`);
      if (page) page.classList.add('active');
      
      document.getElementById('prevBtn').disabled = (pageNum === 1);
      document.getElementById('nextBtn').disabled = (pageNum === totalPages);
      
      const progress = (pageNum / totalPages) * 100;
      document.getElementById('progressBar').style.width = progress + '%';
      document.getElementById('topProgress').textContent = \`Page \${pageNum} of \${totalPages}\`;
      
      currentPage = pageNum;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function nextPage() {
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    }
    
    function prevPage() {
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    });
    
    showPage(1);`;
}

// MAIN EXECUTION
console.log('\n🏗️  Rebuilding 4th Grade with Clean UI Template\n');

// Generate Days 1-24 (skip days 5, 10, 15, 20)
for (let day = 1; day <= 24; day++) {
  if (day % 5 === 0) continue;  // Skip assessment days
  generateLesson(day);
}

console.log('\n✨ Done! Generated 20 clean lessons for 4th grade.');
console.log('📝 Assessment days (5, 10, 15, 20) need separate generator.\n');
