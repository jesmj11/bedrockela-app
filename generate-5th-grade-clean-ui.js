// Generate 5th Grade Robin Hood lessons with CLEAN UI template
// Based on templates/lesson-template.html structure

const fs = require('fs');

// Load data
const unitCard = JSON.parse(fs.readFileSync('book-data/robin-hood-complete-unit-card.json', 'utf8'));
const grammarLessons = JSON.parse(fs.readFileSync('book-data/robin-hood-grammar.json', 'utf8'));
const languageLessons = JSON.parse(fs.readFileSync('book-data/robin-hood-language.json', 'utf8'));

// Helper to split text into 3 parts
function splitTextIntoParts(text, parts = 3) {
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  const totalParagraphs = paragraphs.length;
  const paragraphsPerPart = Math.ceil(totalParagraphs / parts);
  
  const result = [];
  for (let i = 0; i < parts; i++) {
    const start = i * paragraphsPerPart;
    const end = Math.min((i + 1) * paragraphsPerPart, totalParagraphs);
    result.push(paragraphs.slice(start, end).join('\n\n'));
  }
  return result;
}

// Helper to escape HTML
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate a regular lesson
function generateLesson(day) {
  // Find the chapter for this day
  const chapter = unitCard.chapters.find(c => c.day === day);
  if (!chapter) {
    console.log(`  ⚠️  No chapter found for day ${day}`);
    return null;
  }
  
  // Determine week number
  const week = Math.ceil(day / 5);
  
  // Grammar or Language (odd days = grammar, even days = language)
  const isOdd = day % 2 === 1;
  const grammarTopic = grammarLessons[day.toString()];
  const languageTopic = languageLessons[day.toString()];
  const skillTopic = isOdd ? grammarTopic : languageTopic;
  const skillType = isOdd ? 'Grammar' : 'Language';
  
  if (!skillTopic) {
    console.log(`  ⚠️  No ${skillType.toLowerCase()} topic for day ${day}, using placeholder`);
  }
  
  // Split story into 3 parts
  const storyParts = splitTextIntoParts(chapter.text, 3);
  
  // Generate HTML
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lesson ${day} - BedrockELA</title>
  <style>
    /* Reset */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    /* Body */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    
    /* Top Navigation Bar */
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
    
    /* Container */
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      min-height: calc(100vh - 120px);
    }
    
    /* Page content */
    .page {
      display: none;
      padding: 40px 30px 80px;
    }
    
    .page.active {
      display: block;
    }
    
    /* Bottom Navigation */
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
    
    /* Content styles */
    h1 { font-size: 2rem; margin-bottom: 1rem; color: #305853; }
    h2 { font-size: 1.5rem; margin-bottom: 1rem; color: #B06821; margin-top: 2rem; }
    h3 { font-size: 1.25rem; margin-bottom: 0.75rem; color: #305853; margin-top: 1.5rem; }
    p { margin-bottom: 1rem; line-height: 1.8; }
    ul, ol { margin-left: 1.5rem; margin-bottom: 1rem; }
    li { margin-bottom: 0.5rem; }
    
    /* Form elements */
    textarea, input[type="text"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-family: inherit;
      font-size: 1rem;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    
    textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    /* Vocab words */
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
    
    /* Story text */
    .story p {
      text-indent: 2em;
      line-height: 1.8;
      margin-bottom: 15px;
    }
    
    /* Info box */
    .info-box {
      background: #f0f8ff;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #305853;
    }
  </style>
</head>
<body>
  
  <!-- TOP NAVIGATION -->
  <div class="top-nav">
    <a href="../student-dashboard.html" class="home-btn">← Home</a>
    <div class="day-info">Lesson ${day}: ${escapeHtml(chapter.title)}</div>
    <div class="page-progress" id="topProgress">Page 1 of 11</div>
  </div>
  
  <div class="container">
    
    <!-- PAGE 1: TITLE -->
    <div class="page active" data-page="1">
      <div style="text-align: center; padding: 60px 30px;">
        <div style="font-size: 4rem; margin-bottom: 20px;">🏹</div>
        <h1>Lesson ${day}</h1>
        <div style="font-size: 1.25rem; color: #666; margin-bottom: 10px;">${escapeHtml(chapter.title)}</div>
        <div style="font-size: 1rem; color: #999;">Week ${week} • The Merry Adventures of Robin Hood • 5th Grade</div>
      </div>
    </div>
    
    <!-- PAGE 2: WELCOME & OBJECTIVES -->
    <div class="page" data-page="2">
      <h2>Welcome to Lesson ${day}!</h2>
      <p>Today we're reading <strong>${escapeHtml(chapter.title)}</strong> from <em>The Merry Adventures of Robin Hood</em>.</p>
      
      <h3>📚 Today's Objectives:</h3>
      <ul>
        <li>Understand key events and character development in Chapter ${chapter.number}</li>
        <li>Learn 3 new vocabulary words in context</li>
        ${skillTopic ? `<li>Master ${skillTopic.topic} (${skillType})</li>` : ''}
        <li>Practice close reading and analytical thinking</li>
      </ul>
      
      <div class="info-box">
        <p><strong>🏹 Remember:</strong> Robin Hood is a legendary outlaw who fought for justice. As you read, think about what makes someone a hero or a villain.</p>
      </div>
    </div>
    
    <!-- PAGE 3: VOCABULARY -->
    <div class="page" data-page="3">
      <h2>📖 Vocabulary</h2>
      <p>These words appear in today's chapter. As you read, notice how they're used in context!</p>
      
      ${chapter.vocabulary.map((v, i) => `
      <div class="vocab-word">
        <h3>${i + 1}. ${v.word}</h3>
        <p><strong>Part of Speech:</strong> ${v.partOfSpeech || 'noun'}</p>
        <p><strong>Definition:</strong> ${escapeHtml(v.definition)}</p>
        ${v.contextSentence ? `<p><strong>In context:</strong> <em>"${escapeHtml(v.contextSentence)}"</em></p>` : ''}
      </div>
      `).join('')}
    </div>
    
    <!-- PAGE 4: VOCABULARY PRACTICE -->
    <div class="page" data-page="4">
      <h2>🎯 Vocabulary Practice</h2>
      <p>Match each word to its definition by writing them below:</p>
      
      ${chapter.vocabulary.map((v, i) => `
      <h3>${i + 1}. ${v.word}</h3>
      <input type="text" placeholder="Write the definition in your own words...">
      `).join('')}
    </div>
    
    <!-- PAGE 5: STORY PART 1 -->
    <div class="page" data-page="5">
      <h2>📜 ${escapeHtml(chapter.title)} (Part 1)</h2>
      <div class="story">
        ${storyParts[0].split('\n\n').map(p => `<p>${escapeHtml(p.trim())}</p>`).join('')}
      </div>
    </div>
    
    <!-- PAGE 6: STORY PART 2 -->
    <div class="page" data-page="6">
      <h2>📜 ${escapeHtml(chapter.title)} (Part 2)</h2>
      <div class="story">
        ${storyParts[1].split('\n\n').map(p => `<p>${escapeHtml(p.trim())}</p>`).join('')}
      </div>
    </div>
    
    <!-- PAGE 7: STORY PART 3 -->
    <div class="page" data-page="7">
      <h2>📜 ${escapeHtml(chapter.title)} (Part 3)</h2>
      <div class="story">
        ${storyParts[2].split('\n\n').map(p => `<p>${escapeHtml(p.trim())}</p>`).join('')}
      </div>
    </div>
    
    <!-- PAGE 8: COMPREHENSION -->
    <div class="page" data-page="8">
      <h2>🤔 Reading Comprehension</h2>
      <p>Answer these questions about today's chapter. Use evidence from the text to support your answers.</p>
      
      ${chapter.comprehension.map((q, i) => `
      <h3>${i + 1}. ${q.question}</h3>
      ${q.choices ? `
        ${q.choices.map((choice, idx) => `
        <label style="display: block; margin: 8px 0; padding: 10px; background: #f9f9f9; border-radius: 6px; cursor: pointer;">
          <input type="radio" name="q${i}" value="${String.fromCharCode(65 + idx)}" style="margin-right: 10px;">
          ${String.fromCharCode(65 + idx)}) ${escapeHtml(choice)}
        </label>
        `).join('')}
      ` : `
        <textarea placeholder="Write your answer with evidence from the text..."></textarea>
      `}
      `).join('')}
    </div>
    
    <!-- PAGE 9: GRAMMAR OR LANGUAGE -->
    <div class="page" data-page="9">
      ${skillTopic ? `
      <h2>📝 ${skillType}: ${skillTopic.topic}</h2>
      
      <div class="info-box">
        <p><strong>What is it?</strong></p>
        <p>${escapeHtml(skillTopic.explanation)}</p>
        <p style="margin-top: 15px;"><strong>Example:</strong></p>
        <p><em>"${escapeHtml(skillTopic.example)}"</em></p>
      </div>
      
      <h3>✍️ Your Turn:</h3>
      <p>${escapeHtml(skillTopic.prompt)}</p>
      <textarea rows="10" placeholder="Write your response here..."></textarea>
      ` : `
      <h2>📝 ${skillType} Practice</h2>
      <p>Review your grammar and language skills from previous lessons.</p>
      <textarea rows="10" placeholder="Practice writing here..."></textarea>
      `}
    </div>
    
    <!-- PAGE 10: INFORMATIONAL TEXT -->
    <div class="page" data-page="10">
      <h2>📰 Informational Text</h2>
      ${chapter.informationalText ? `
      <h3>${chapter.informationalText.title}</h3>
      ${chapter.informationalText.text.split('\n\n').map(p => `<p>${escapeHtml(p.trim())}</p>`).join('')}
      
      ${chapter.informationalText.questions ? `
      <h3 style="margin-top: 30px;">Questions:</h3>
      ${chapter.informationalText.questions.map((q, i) => `
      <h3>${i + 1}. ${q}</h3>
      <textarea placeholder="Write your answer..."></textarea>
      `).join('')}
      ` : ''}
      ` : `
      <p>Historical context and background information about medieval outlaws and English folklore.</p>
      `}
    </div>
    
    <!-- PAGE 11: WRITING/JOURNAL -->
    <div class="page" data-page="11">
      <h2>✏️ ${isOdd ? 'Writing Practice' : 'Journal Entry'}</h2>
      ${isOdd ? `
      <div class="info-box">
        <p><strong>Prompt:</strong></p>
        <p>Write a paragraph analyzing an important decision made in today's chapter. Was it the right choice? What were the consequences? What does this reveal about the character?</p>
      </div>
      <p><strong>Requirements:</strong></p>
      <ul>
        <li>8-10 sentences minimum</li>
        <li>Include specific details from the text</li>
        <li>Check spelling and grammar</li>
      </ul>
      ` : `
      <p>Reflect on today's reading in your own words:</p>
      <ul>
        <li>What was the most interesting part of today's chapter?</li>
        <li>Do you agree with Robin Hood's actions? Why or why not?</li>
        <li>What questions do you have about the story?</li>
      </ul>
      `}
      <textarea rows="15" placeholder="${isOdd ? 'Write your essay here...' : 'Write your journal entry here...'}"></textarea>
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
    let currentPage = 1;
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
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    });
    
    // Initialize
    showPage(1);
  </script>
</body>
</html>`;
}

// Main execution
console.log('\n🏗️  Generating 5th Grade Robin Hood lessons with CLEAN UI\n');

let generated = 0;
for (let day = 1; day <= 29; day++) {
  // Skip assessment days (5, 10, 15, 20, 25, 30) - Robin Hood only has 24 chapters
  if (day % 5 === 0 || day > 24) {
    if (day % 5 === 0) {
      console.log(`⏭️  Day ${day}: Assessment (skipping for now)`);
    }
    continue;
  }
  
  const html = generateLesson(day);
  if (html) {
    const filename = `curriculum/grade5/5th-grade-lesson-${day.toString().padStart(3, '0')}.html`;
    
    // Create directory if needed
    if (!fs.existsSync('curriculum/grade5')) {
      fs.mkdirSync('curriculum/grade5', { recursive: true });
    }
    
    fs.writeFileSync(filename, html, 'utf8');
    console.log(`✅ Day ${day}: ${filename}`);
    generated++;
  }
}

console.log(`\n✨ Done! Generated ${generated} lessons for 5th grade.\n`);
