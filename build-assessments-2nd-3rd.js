// Build Comprehensive Assessments for 2nd and 3rd Grade
// Each assessment reviews the 4 lessons from that week

const fs = require('fs');

function generateAssessment({
  grade,
  day,
  week,
  weekLessons, // Array of 4 lesson data objects
  bookTitle,
  emoji
}) {
  
  // Collect all vocabulary from the week
  const allVocab = [];
  weekLessons.forEach(lesson => {
    if (lesson.vocabulary) {
      allVocab.push(...lesson.vocabulary);
    }
  });
  
  // Get comprehension questions from the week
  const weekSummary = weekLessons.map(l => l.title).join(', ');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Week ${week} Assessment - ${grade}th Grade</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
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
    
    .vocab-item {
      padding: 15px;
      margin-bottom: 15px;
      background: #f9f9f9;
      border-radius: 6px;
      border-left: 4px solid #B06821;
    }
    
    .question {
      padding: 20px;
      margin-bottom: 20px;
      background: #f0f8ff;
      border-radius: 8px;
      border-left: 4px solid #305853;
    }
    
    .info-box {
      background: #fff9e6;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #B06821;
    }
  </style>
</head>
<body>
  
  <div class="top-nav">
    <a href="../student-dashboard.html" class="home-btn">← Home</a>
    <div class="day-info">Week ${week} Assessment</div>
    <div class="page-progress" id="topProgress">Page 1 of 6</div>
  </div>
  
  <div class="container">
    
    <!-- PAGE 1: TITLE -->
    <div class="page active" data-page="1">
      <div style="text-align: center; padding: 60px 30px;">
        <div style="font-size: 4rem; margin-bottom: 20px;">${emoji}</div>
        <h1>Week ${week} Assessment</h1>
        <div style="font-size: 1.25rem; color: #666; margin-bottom: 10px;">${bookTitle}</div>
        <div style="font-size: 1rem; color: #999;">${grade}th Grade • Day ${day}</div>
      </div>
    </div>
    
    <!-- PAGE 2: INSTRUCTIONS -->
    <div class="page" data-page="2">
      <h2>📝 Assessment Instructions</h2>
      
      <div class="info-box">
        <p><strong>Welcome to your Week ${week} assessment!</strong></p>
        <p>This assessment covers everything you learned this week:</p>
        <ul style="margin-left: 20px; margin-top: 10px;">
          <li>${weekSummary}</li>
        </ul>
      </div>
      
      <h3>What's on this assessment:</h3>
      <ul style="margin-left: 20px; line-height: 2;">
        <li>📖 <strong>Vocabulary Review</strong> - ${allVocab.length} words from this week</li>
        <li>🤔 <strong>Reading Comprehension</strong> - Questions about the stories</li>
        <li>✏️ <strong>Grammar & Language</strong> - Practice what you learned</li>
        <li>📝 <strong>Writing</strong> - Show what you can do!</li>
      </ul>
      
      <p style="margin-top: 30px;"><strong>Remember:</strong> Take your time and do your best work!</p>
    </div>
    
    <!-- PAGE 3: VOCABULARY -->
    <div class="page" data-page="3">
      <h2>📖 Vocabulary Review</h2>
      <p>Match each word with its definition by writing your answer in the box.</p>
      
      ${allVocab.slice(0, 8).map((v, i) => `
      <div class="vocab-item">
        <h3>${i + 1}. ${v.word}</h3>
        <p><strong>Write the definition you remember:</strong></p>
        <input type="text" placeholder="What does this word mean?">
        <p style="margin-top: 10px; font-size: 0.9rem; color: #666;"><em>Hint: ${v.definition.split(' ').slice(0, 3).join(' ')}...</em></p>
      </div>`).join('\n      ')}
    </div>
    
    <!-- PAGE 4: COMPREHENSION -->
    <div class="page" data-page="4">
      <h2>🤔 Reading Comprehension</h2>
      <p>Answer these questions about the stories you read this week.</p>
      
      <div class="question">
        <h3>1. What were the main events this week?</h3>
        <p>Summarize what happened in the stories. Write at least 3 sentences.</p>
        <textarea rows="5" placeholder="Write your answer here..."></textarea>
      </div>
      
      <div class="question">
        <h3>2. Who was your favorite character this week? Why?</h3>
        <textarea rows="5" placeholder="Write your answer here..."></textarea>
      </div>
      
      <div class="question">
        <h3>3. What lesson did you learn from this week's stories?</h3>
        <textarea rows="5" placeholder="Write your answer here..."></textarea>
      </div>
    </div>
    
    <!-- PAGE 5: GRAMMAR & LANGUAGE -->
    <div class="page" data-page="5">
      <h2>✏️ Grammar & Language</h2>
      
      <div class="info-box">
        <p><strong>Show what you learned this week!</strong></p>
      </div>
      
      <div class="question">
        <h3>1. Write 3 complete sentences about this week's stories.</h3>
        <p>Make sure each sentence has:</p>
        <ul style="margin-left: 20px;">
          <li>A capital letter at the beginning</li>
          <li>Punctuation at the end (. ! ?)</li>
          <li>A complete thought</li>
        </ul>
        <textarea rows="8" placeholder="Write your sentences here..."></textarea>
      </div>
      
      <div class="question">
        <h3>2. Use TWO vocabulary words in sentences.</h3>
        <p>Write sentences that show you understand what the words mean.</p>
        <textarea rows="6" placeholder="Write your sentences here..."></textarea>
      </div>
    </div>
    
    <!-- PAGE 6: WRITING -->
    <div class="page" data-page="6">
      <h2>📝 Writing Assessment</h2>
      
      <div class="question">
        <h3>Writing Prompt</h3>
        <p><strong>${grade === 2 ? 
          'If you could be a character from this week\'s stories, who would you be? Why? What would you do?' :
          'Choose your favorite story from this week. Write about the most important part and explain why it matters.'
        }</strong></p>
        
        <div class="info-box" style="margin-top: 15px;">
          <p><strong>Your writing should have:</strong></p>
          <ul style="margin-left: 20px; margin-top: 10px;">
            <li>A clear beginning, middle, and end</li>
            <li>At least ${grade === 2 ? '5-7' : '8-10'} sentences</li>
            <li>Details from the stories</li>
            <li>Your best spelling and punctuation</li>
          </ul>
        </div>
        
        <textarea rows="20" placeholder="Start writing here..."></textarea>
      </div>
    </div>
    
  </div>
  
  <div class="bottom-nav">
    <button id="prevBtn" onclick="prevPage()">← Previous</button>
    <div class="progress">
      <div class="progress-bar" id="progressBar"></div>
    </div>
    <button id="nextBtn" onclick="nextPage()">Next →</button>
  </div>

  <script>
    let currentPage = 1;
    const totalPages = 6;
    
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
    
    showPage(1);
  </script>
</body>
</html>`;
}

// Build all assessments for 2nd grade
console.log('🏗️  Building 2nd grade assessments...\n');

// Load all books to get chapter data
const books2nd = [];
for (let i = 1; i <= 24; i++) {
  const bookNum = i.toString().padStart(2, '0');
  const unitCard = JSON.parse(fs.readFileSync(`book-data/2nd-grade-book-${bookNum}-complete-unit-card.json`, 'utf8'));
  books2nd.push({
    unitCard,
    emoji: ['📚', '🐱', '🍪', '🥣', '👞', '🕯️', '🦁', '🐦', '🐕', '🌬️', '🐈', '🦆', '🥛', '🌳', '🐑', '🪵', '🥚', '✂️', '🐾', '🦔', '🐰', '🐿️', '🦆', '🎭'][i - 1] || '📖'
  });
}

// Flatten all chapters
const allChapters2nd = [];
books2nd.forEach(book => {
  book.unitCard.chapters.forEach(chapter => {
    allChapters2nd.push({
      chapter,
      bookTitle: book.unitCard.unitInfo.book,
      emoji: book.emoji
    });
  });
});

// Build 36 assessment pages
for (let week = 1; week <= 36; week++) {
  const assessmentDay = week * 5;
  const weekStartChapter = (week - 1) * 4;
  
  // Get the 4 lessons from this week
  const weekLessons = [];
  for (let i = 0; i < 4; i++) {
    const chapterIndex = weekStartChapter + i;
    if (chapterIndex < allChapters2nd.length) {
      weekLessons.push(allChapters2nd[chapterIndex]);
    }
  }
  
  if (weekLessons.length === 0) continue;
  
  const html = generateAssessment({
    grade: 2,
    day: assessmentDay,
    week: week,
    weekLessons: weekLessons.map(l => ({
      title: l.chapter.title,
      vocabulary: l.chapter.vocabulary
    })),
    bookTitle: weekLessons[0].bookTitle,
    emoji: weekLessons[0].emoji
  });
  
  const filename = `curriculum/grade2/2nd-grade-lesson-${assessmentDay.toString().padStart(3, '0')}.html`;
  fs.writeFileSync(filename, html);
  
  console.log(`✅ Week ${week} Assessment (Day ${assessmentDay})`);
}

console.log('\n🏗️  Building 3rd grade assessments...\n');

// Load all books for 3rd grade
const bookFiles3rd = [
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
];

const allChapters3rd = [];
bookFiles3rd.forEach(book => {
  const unitCard = JSON.parse(fs.readFileSync(`book-data/${book.file}`, 'utf8'));
  const chaptersToUse = unitCard.chapters.slice(0, 12);
  
  chaptersToUse.forEach(chapter => {
    allChapters3rd.push({
      chapter,
      bookTitle: unitCard.unitInfo.book,
      emoji: book.emoji
    });
  });
});

// Build 30 assessment pages
for (let week = 1; week <= 30; week++) {
  const assessmentDay = week * 5;
  const weekStartChapter = (week - 1) * 4;
  
  // Get the 4 lessons from this week
  const weekLessons = [];
  for (let i = 0; i < 4; i++) {
    const chapterIndex = weekStartChapter + i;
    if (chapterIndex < allChapters3rd.length) {
      weekLessons.push(allChapters3rd[chapterIndex]);
    }
  }
  
  if (weekLessons.length === 0) continue;
  
  const html = generateAssessment({
    grade: 3,
    day: assessmentDay,
    week: week,
    weekLessons: weekLessons.map(l => ({
      title: l.chapter.title,
      vocabulary: l.chapter.vocabulary
    })),
    bookTitle: weekLessons[0].bookTitle,
    emoji: weekLessons[0].emoji
  });
  
  const filename = `curriculum/grade3/3rd-grade-lesson-${assessmentDay.toString().padStart(3, '0')}.html`;
  fs.writeFileSync(filename, html);
  
  console.log(`✅ Week ${week} Assessment (Day ${assessmentDay})`);
}

console.log('\n🎉 All assessments built!');
console.log('   2nd Grade: 36 assessments');
console.log('   3rd Grade: 30 assessments');
