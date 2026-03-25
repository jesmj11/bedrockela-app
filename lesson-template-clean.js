// Clean Lesson Template (based on 4th grade layout)
// Use this for ALL grades (4-8)

function generateLesson({
  grade,
  day,
  week,
  title,
  bookTitle,
  emoji,
  objectives,
  vocabularyWords, // array of { word, definition, sentence }
  storyParts, // array of 3 strings
  comprehensionQuestions, // array of strings
  grammarOrLanguage, // { type: 'grammar'|'language', topic, learn, example }
  informationalText, // { title, content, question }
  writingPrompt, // { type: 'writing'|'journal', prompt }
  isAssessment = false
}) {
  
  const colors = {
    deepTeal: '#305853',
    goldenAmber: '#B06821'
  };
  
  const totalPages = isAssessment ? 8 : 11;
  
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
      background: ${colors.deepTeal};
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
      background: ${colors.deepTeal};
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
      background: linear-gradient(90deg, ${colors.deepTeal}, ${colors.goldenAmber});
      transition: width 0.3s;
      border-radius: 10px;
    }
    
    /* Content styles */
    h1 { font-size: 2rem; margin-bottom: 1rem; color: ${colors.deepTeal}; }
    h2 { font-size: 1.5rem; margin-bottom: 1rem; color: ${colors.goldenAmber}; margin-top: 2rem; }
    h3 { font-size: 1.25rem; margin-bottom: 0.75rem; color: ${colors.deepTeal}; margin-top: 1.5rem; }
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
      border-left: 4px solid ${colors.goldenAmber};
    }
    
    .vocab-word h3 {
      margin-top: 0;
      color: ${colors.deepTeal};
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
      border-left: 4px solid ${colors.deepTeal};
    }
  </style>
</head>
<body>
  
  <!-- TOP NAVIGATION -->
  <div class="top-nav">
    <a href="../student-dashboard.html" class="home-btn">← Home</a>
    <div class="day-info">Lesson ${day}: ${title}</div>
    <div class="page-progress" id="topProgress">Page 1 of ${totalPages}</div>
  </div>
  
  <div class="container">
    
    <!-- PAGE 1: TITLE -->
    <div class="page active" data-page="1">
      <div style="text-align: center; padding: 60px 30px;">
        <div style="font-size: 4rem; margin-bottom: 20px;">${emoji}</div>
        <h1>Lesson ${day}</h1>
        <div style="font-size: 1.25rem; color: #666; margin-bottom: 10px;">${title}</div>
        <div style="font-size: 1rem; color: #999;">Week ${week} • ${bookTitle} • ${grade}th Grade</div>
      </div>
    </div>
    
    ${generateObjectivesPage(objectives, title, bookTitle)}
    ${generateVocabularyPages(vocabularyWords)}
    ${generateStoryPages(storyParts, title)}
    ${generateComprehensionPage(comprehensionQuestions)}
    ${generateGrammarLanguagePage(grammarOrLanguage)}
    ${generateInformationalPage(informationalText)}
    ${generateWritingPage(writingPrompt)}
    
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
    const totalPages = ${totalPages};
    
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

function generateObjectivesPage(objectives, title, bookTitle) {
  return `
    <!-- PAGE 2: WELCOME & OBJECTIVES -->
    <div class="page" data-page="2">
      <h2>Welcome to this lesson!</h2>
      <p>Today we're reading <strong>${title}</strong> from <em>${bookTitle}</em>.</p>
      
      <h3>📚 Today's Objectives:</h3>
      <ul>
        ${objectives.map(obj => `<li>${obj}</li>`).join('\n        ')}
      </ul>
    </div>`;
}

function generateVocabularyPages(vocabularyWords) {
  const vocabList = vocabularyWords.map((v, i) => `
      <div class="vocab-word">
        <h3>${i + 1}. ${v.word}</h3>
        <p><strong>Definition:</strong> ${v.definition}</p>
        <p><strong>In the story:</strong> <em>"${v.sentence}"</em></p>
      </div>`).join('\n      ');
  
  const vocabPractice = vocabularyWords.map((v, i) => `
      <h3>${i + 1}. ${v.word}</h3>
      <input type="text" placeholder="What does this word mean?">`).join('\n      ');
  
  return `
    <!-- PAGE 3: VOCABULARY -->
    <div class="page" data-page="3">
      <h2>📖 Vocabulary</h2>
      <p>These words appear in today's chapter. Look for them as you read!</p>
      ${vocabList}
    </div>
    
    <!-- PAGE 4: VOCABULARY PRACTICE -->
    <div class="page" data-page="4">
      <h2>🎯 Vocabulary Practice</h2>
      <p>Write the definitions in your own words:</p>
      ${vocabPractice}
    </div>`;
}

function generateStoryPages(storyParts, title) {
  return storyParts.map((part, index) => `
    <!-- PAGE ${5 + index}: STORY PART ${index + 1} -->
    <div class="page" data-page="${5 + index}">
      <h2>📜 ${title} (Part ${index + 1})</h2>
      <div class="story">
        ${part.split('\n\n').map(para => `<p>${para}</p>`).join('\n        ')}
      </div>
    </div>`).join('\n    ');
}

function generateComprehensionPage(comprehensionQuestions) {
  const questions = comprehensionQuestions.map((q, i) => `
      <h3>${i + 1}. ${q}</h3>
      <textarea placeholder="Write your answer..."></textarea>`).join('\n      ');
  
  return `
    <!-- PAGE 8: COMPREHENSION -->
    <div class="page" data-page="8">
      <h2>🤔 Reading Comprehension</h2>
      <p>Answer these questions about today's chapter:</p>
      ${questions}
    </div>`;
}

function generateGrammarLanguagePage(grammarOrLanguage) {
  const { type, topic, learn, example } = grammarOrLanguage;
  const icon = type === 'grammar' ? '📝' : '🗣️';
  const label = type === 'grammar' ? 'Grammar' : 'Language';
  
  return `
    <!-- PAGE 9: GRAMMAR OR LANGUAGE -->
    <div class="page" data-page="9">
      <h2>${icon} ${label}: ${topic}</h2>
      
      <div class="info-box">
        <p><strong>Learn:</strong></p>
        <p>${learn}</p>
        <p style="margin-top: 15px;"><strong>Example:</strong></p>
        <p><em>"${example}"</em></p>
      </div>
      
      <h3>✍️ Your Turn:</h3>
      <p>Practice this concept using examples from today's reading:</p>
      <textarea rows="10" placeholder="Write your practice here..."></textarea>
    </div>`;
}

function generateInformationalPage(informationalText) {
  const { title, content, question } = informationalText;
  
  return `
    <!-- PAGE 10: INFORMATIONAL TEXT -->
    <div class="page" data-page="10">
      <h2>📰 ${title}</h2>
      ${content.split('\n\n').map(para => `<p>${para}</p>`).join('\n      ')}
      
      <h3>Think About It:</h3>
      <p>${question}</p>
      <textarea placeholder="Write your thoughts..."></textarea>
    </div>`;
}

function generateWritingPage(writingPrompt) {
  const { type, prompt } = writingPrompt;
  const icon = type === 'writing' ? '✏️' : '📔';
  const label = type === 'writing' ? 'Writing Time' : 'Journal Entry';
  
  return `
    <!-- PAGE 11: WRITING/JOURNAL -->
    <div class="page" data-page="11">
      <h2>${icon} ${label}</h2>
      <p><strong>${type === 'writing' ? 'Writing Prompt' : 'Journal Prompt'}:</strong></p>
      <p>${prompt}</p>
      <textarea rows="15" placeholder="Start writing here..."></textarea>
    </div>`;
}

module.exports = { generateLesson };
