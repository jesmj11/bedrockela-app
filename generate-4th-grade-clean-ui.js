// Generate 4th Grade Wizard of Oz lessons with CLEAN UI template
// Based on templates/lesson-template.html structure

const fs = require('fs');

// Load data
const unitCard = JSON.parse(fs.readFileSync('book-data/wizard-of-oz-unit-card-COMPLETE.json', 'utf8'));
const grammarLessons = JSON.parse(fs.readFileSync('book-data/wizard-oz-grammar.json', 'utf8'));
const languageLessons = JSON.parse(fs.readFileSync('book-data/wizard-oz-language.json', 'utf8'));

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
  // Find the vocab for this day
  const vocabEntry = unitCard.vocabulary.find(v => v.chapter === day);
  if (!vocabEntry) {
    console.log(`  ⚠️  No vocabulary found for day ${day}`);
    return null;
  }
  
  // Build vocab array
  const vocabulary = [vocabEntry.word1, vocabEntry.word2];
  
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
  
  // Get chapter title (simplified)
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
  const chapterTitle = chapterTitles[day - 1] || `Chapter ${day}`;
  
  // Create simple story text (placeholder - would need actual chapter content)
  const storyText = `[Story content for ${chapterTitle} would go here. This is where Dorothy's adventure continues in the Land of Oz...]`;
  const storyParts = [storyText, '', ''];
  
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
    <div class="day-info">Lesson ${day}: ${escapeHtml(chapterTitle)}</div>
    <div class="page-progress" id="topProgress">Page 1 of 11</div>
  </div>
  
  <div class="container">
    
    <!-- PAGE 1: TITLE -->
    <div class="page active" data-page="1">
      <div style="text-align: center; padding: 60px 30px;">
        <div style="font-size: 4rem; margin-bottom: 20px;">🌪️</div>
        <h1>Lesson ${day}</h1>
        <div style="font-size: 1.25rem; color: #666; margin-bottom: 10px;">${escapeHtml(chapterTitle)}</div>
        <div style="font-size: 1rem; color: #999;">Week ${week} • The Wonderful Wizard of Oz • 4th Grade</div>
      </div>
    </div>
    
    <!-- PAGE 2: WELCOME & OBJECTIVES -->
    <div class="page" data-page="2">
      <h2>Welcome to Lesson ${day}!</h2>
      <p>Today we're reading <strong>${escapeHtml(chapterTitle)}</strong> from <em>The Wonderful Wizard of Oz</em> by L. Frank Baum.</p>
      
      <h3>📚 Today's Objectives:</h3>
      <ul>
        <li>Follow Dorothy's adventure in Chapter ${day}</li>
        <li>Learn 2 new vocabulary words</li>
        ${skillTopic ? `<li>Practice ${skillTopic.topic} (${skillType})</li>` : ''}
        <li>Answer questions about the story</li>
      </ul>
      
      <div class="info-box">
        <p><strong>🌈 Remember:</strong> Dorothy is trying to find her way home to Kansas. Pay attention to the friends she meets and the challenges she faces!</p>
      </div>
    </div>
    
    <!-- PAGE 3: VOCABULARY -->
    <div class="page" data-page="3">
      <h2>📖 Vocabulary</h2>
      <p>These words appear in today's chapter. Look for them as you read!</p>
      
      ${vocabulary.map((v, i) => `
      <div class="vocab-word">
        <h3>${i + 1}. ${v.word}</h3>
        <p><strong>Definition:</strong> ${escapeHtml(v.definition)}</p>
        <p><strong>In the story:</strong> <em>"${escapeHtml(v.sentence)}"</em></p>
      </div>
      `).join('')}
    </div>
    
    <!-- PAGE 4: VOCABULARY PRACTICE -->
    <div class="page" data-page="4">
      <h2>🎯 Vocabulary Practice</h2>
      <p>Write the definitions in your own words:</p>
      
      ${vocabulary.map((v, i) => `
      <h3>${i + 1}. ${v.word}</h3>
      <input type="text" placeholder="What does this word mean?">
      `).join('')}
    </div>
    
    <!-- PAGE 5: STORY PART 1 -->
    <div class="page" data-page="5">
      <h2>📜 ${escapeHtml(chapterTitle)} (Part 1)</h2>
      <div class="story">
        <p>${escapeHtml(storyParts[0])}</p>
      </div>
      <div class="info-box">
        <p><strong>Note:</strong> Full chapter text will be added here.</p>
      </div>
    </div>
    
    <!-- PAGE 6: STORY PART 2 -->
    <div class="page" data-page="6">
      <h2>📜 ${escapeHtml(chapterTitle)} (Part 2)</h2>
      <div class="story">
        <p><em>[Story continues...]</em></p>
      </div>
    </div>
    
    <!-- PAGE 7: STORY PART 3 -->
    <div class="page" data-page="7">
      <h2>📜 ${escapeHtml(chapterTitle)} (Part 3)</h2>
      <div class="story">
        <p><em>[Story concludes...]</em></p>
      </div>
    </div>
    
    <!-- PAGE 8: COMPREHENSION -->
    <div class="page" data-page="8">
      <h2>🤔 Reading Comprehension</h2>
      <p>Answer these questions about today's chapter:</p>
      
      <h3>1. What happened in today's chapter?</h3>
      <textarea placeholder="Write your answer..."></textarea>
      
      <h3>2. Who did Dorothy meet? What did they want?</h3>
      <textarea placeholder="Write your answer..."></textarea>
    </div>
    
    <!-- PAGE 9: GRAMMAR OR LANGUAGE -->
    <div class="page" data-page="9">
      ${skillTopic ? `
      <h2>📝 ${skillType}: ${skillTopic.topic}</h2>
      
      <div class="info-box">
        <p><strong>Learn:</strong></p>
        <p>${escapeHtml(skillTopic.explanation)}</p>
        <p style="margin-top: 15px;"><strong>Example:</strong></p>
        <p><em>"${escapeHtml(skillTopic.example)}"</em></p>
      </div>
      
      <h3>✍️ Your Turn:</h3>
      <p>${escapeHtml(skillTopic.prompt)}</p>
      <textarea rows="10" placeholder="Write your practice here..."></textarea>
      ` : `
      <h2>📝 ${skillType} Practice</h2>
      <p>Practice your writing skills:</p>
      <textarea rows="10" placeholder="Write about today's story..."></textarea>
      `}
    </div>
    
    <!-- PAGE 10: INFORMATIONAL TEXT -->
    <div class="page" data-page="10">
      <h2>📰 Did You Know?</h2>
      <p>The Wizard of Oz was written by L. Frank Baum in 1900. It's one of the most famous children's books ever written!</p>
      <p>Dorothy's journey teaches us about courage, friendship, and believing in yourself. Each character she meets is looking for something they think they don't have.</p>
      
      <h3>Think About It:</h3>
      <p>What do you think Dorothy is learning on her journey? Write your thoughts below:</p>
      <textarea placeholder="What is Dorothy learning?"></textarea>
    </div>
    
    <!-- PAGE 11: WRITING/JOURNAL -->
    <div class="page" data-page="11">
      <h2>✏️ ${isOdd ? 'Writing Time' : 'Journal Entry'}</h2>
      ${isOdd ? `
      <p><strong>Writing Prompt:</strong></p>
      <p>If you could travel to the Land of Oz, what would you want to see? Who would you want to meet? Write about your own adventure!</p>
      <p><strong>Write at least 5 sentences.</strong></p>
      ` : `
      <p><strong>Journal Prompt:</strong></p>
      <p>How did you feel about today's chapter? What was your favorite part? What do you think will happen next?</p>
      <p><strong>Write at least 5 sentences.</strong></p>
      `}
      <textarea rows="15" placeholder="Start writing here..."></textarea>
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
console.log('\n🏗️  Generating 4th Grade Wizard of Oz lessons with CLEAN UI\n');

let generated = 0;
for (let day = 1; day <= 29; day++) {
  // Skip assessment days (5, 10, 15, 20, 25, 30) - Wizard has 24 chapters
  if (day % 5 === 0 || day > 24) {
    if (day % 5 === 0) {
      console.log(`⏭️  Day ${day}: Assessment (skipping for now)`);
    }
    continue;
  }
  
  const html = generateLesson(day);
  if (html) {
    const filename = `curriculum/grade4/4th-grade-lesson-${day.toString().padStart(3, '0')}.html`;
    
    // Create directory if needed
    if (!fs.existsSync('curriculum/grade4')) {
      fs.mkdirSync('curriculum/grade4', { recursive: true });
    }
    
    fs.writeFileSync(filename, html, 'utf8');
    console.log(`✅ Day ${day}: ${filename}`);
    generated++;
  }
}

console.log(`\n✨ Done! Generated ${generated} lessons for 4th grade.\n`);
