#!/usr/bin/env node

const fs = require('fs');

// Extract vocab words from a lesson file
function extractVocab(filename) {
  if (!fs.existsSync(filename)) return [];
  const content = fs.readFileSync(filename, 'utf8');
  const vocabMatches = content.matchAll(/<h3>(\d+)\. (\w+)<\/h3>/g);
  const words = [];
  for (const match of vocabMatches) {
    words.push(match[2]);
  }
  return words.slice(0, 2); // Only first 2 (before matching game)
}

// Extract skill name from a lesson file
function extractSkill(filename) {
  if (!fs.existsSync(filename)) return '';
  const content = fs.readFileSync(filename, 'utf8');
  const skillMatch = content.match(/<h2>✏️ ([^<]+)<\/h2>/);
  return skillMatch ? skillMatch[1] : '';
}

// Placeholder vocab definitions
const vocabDefs = {
  'prairie': 'A large, flat area of grassland with few or no trees.',
  'cyclone': 'A powerful, spinning windstorm that can cause great destruction.',
  'extraordinary': 'Very unusual, remarkable, or surprising.',
  'sorceress': 'A woman who practices magic or sorcery.',
  'tiresome': 'Causing one to feel bored or annoyed.',
  'companion': 'A person or animal with whom one spends time or travels.',
  'gloomy': 'Dark, dim, or depressing in character or appearance.',
  'undergrowth': 'Dense vegetation growing beneath trees in a forest.'
};

// Skill-specific questions
function getSkillQuestion(skill) {
  const questions = {
    'Sentence Types: Statements and Questions': 'Write one statement and one question about the story.',
    'Context Clues': 'How do context clues help you understand new words? Give an example.',
    'Verbs: Action Words': 'List 5 action verbs from this week\'s story.',
    'Prefixes and Suffixes': 'Explain how prefixes and suffixes change word meanings. Give 2 examples.'
  };
  return questions[skill] || 'Explain what you learned about this topic.';
}

// Build assessment HTML
function buildAssessment(weekNum, vocabWords, skills, lessonNum) {
  const paddedNum = String(lessonNum).padStart(3, '0');
  
  // Shuffle definitions for matching game
  const shuffledDefs = [...vocabWords].sort(() => Math.random() - 0.5);
  
  const vocabHTML = vocabWords.map(word => 
    `<div class="match-word" data-word="${word}" onclick="selectWord(this)">${word}</div>`
  ).join('\n                                ');
  
  const defsHTML = shuffledDefs.map(word => 
    `<div class="match-def" data-word="${word}" onclick="selectDef(this)">${vocabDefs[word] || 'A word from this week\'s reading.'}</div>`
  ).join('\n                                ');

  const skillsHTML = skills.slice(0, 3).map((skill, i) => `
      <div class="question-card">
        <p><strong>${i + 1}. ${skill}:</strong> ${getSkillQuestion(skill)}</p>
        <textarea id="skill-${i + 1}" placeholder="Your answer..."></textarea>
      </div>`).join('\n');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Week ${weekNum} Assessment - 4th Grade BedrockELA</title>
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
    }
    h1 { font-size: 2rem; margin-bottom: 1rem; color: #305853; }
    h2 { font-size: 1.5rem; margin-bottom: 1rem; color: #B06821; }
    h3 { font-size: 1.25rem; margin-bottom: 0.75rem; color: #305853; }
    [data-page="1"] {
      text-align: center;
      padding-top: 144px;
    }
    [data-page="1"] h1 { font-size: 2.5rem; }
    p { margin-bottom: 1rem; line-height: 1.8; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: 0.5rem; }
    textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-family: inherit;
      font-size: 1rem;
      resize: vertical;
      min-height: 100px;
    }
    textarea:focus {
      outline: none;
      border-color: #305853;
    }
    .question-card {
      padding: 20px;
      margin-bottom: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      border-left: 4px solid #B06821;
    }
    .match-word, .match-def {
      padding: 12px 16px;
      margin: 6px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      text-align: center;
      transition: all 0.2s;
    }
    .match-word {
      background: #305853;
      color: white;
    }
    .match-def {
      background: white;
      border: 2px solid #8B4513;
      font-size: 14px;
    }
  </style>
</head>
<body>
  
  <div class="top-nav">
    <a href="student-dashboard.html" class="home-btn">← Home</a>
    <div class="day-info">Week ${weekNum} Assessment - The Wizard of Oz</div>
    <div class="page-progress" id="topProgress">Page 1 of 4</div>
  </div>
  
  <div class="container">

    <div class="page active" data-page="1">
      <h1>Week ${weekNum} Assessment</h1>
      <p style="font-size: 18px; margin-top: 20px; color: #666;">Show what you've learned this week!</p>
      
      <div style="max-width: 600px; margin: 40px auto; padding: 30px; background: #f9f9f9; border-radius: 12px; border: 2px solid #305853;">
        <h3 style="color: #305853; margin-bottom: 20px; font-size: 1.1rem;">📋 This assessment covers:</h3>
        
        <div style="margin-bottom: 25px;">
          <h4 style="color: #B06821; font-size: 1rem; margin-bottom: 10px;">📚 Vocabulary</h4>
          <p style="color: #666; line-height: 1.6; margin: 0;">${vocabWords.join(', ')}</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h4 style="color: #B06821; font-size: 1rem; margin-bottom: 10px;">✏️ Grammar & Language Skills</h4>
          <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px;">
            ${skills.map(skill => `<li>${skill}</li>`).join('\n            ')}
          </ul>
        </div>
        
        <div>
          <h4 style="color: #B06821; font-size: 1rem; margin-bottom: 10px;">✍️ Writing Practice</h4>
          <p style="color: #666; margin: 0;">Paragraph with vocabulary words</p>
        </div>
      </div>
    </div>

    <div class="page" data-page="2">
      <h2>🎮 Vocabulary Review</h2>
      <p style="color: #666; margin-bottom: 5px;">Match each word to its definition!</p>
      <p style="color: #305853; font-weight: 600; margin-bottom: 20px;">Score: <span id="gameScore">0</span> / ${vocabWords.length}</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto;">
        <div style="display: flex; flex-direction: column;">
          <h3 style="text-align: center; color: #305853; margin-bottom: 10px;">Words</h3>
          ${vocabHTML}
        </div>
        <div style="display: flex; flex-direction: column;">
          <h3 style="text-align: center; color: #8B4513; margin-bottom: 10px;">Definitions</h3>
          ${defsHTML}
        </div>
      </div>
      
      <div id="gameFeedback" style="margin-top: 20px; padding: 15px; border-radius: 10px; text-align: center; display: none;"></div>
    </div>

    <div class="page" data-page="3">
      <h2>📝 Skills Review</h2>
      <p style="margin-bottom: 20px;">Answer these questions about what you learned this week.</p>
      ${skillsHTML}
    </div>

    <div class="page" data-page="4">
      <h2>✍️ Writing Assessment</h2>
      <p style="margin-bottom: 20px;">Write a paragraph about this week's story. Try to use at least 3 vocabulary words from this week.</p>
      <textarea id="writing" placeholder="Your paragraph (100-150 words)..." style="min-height: 250px;"></textarea>
      <p class="word-count" style="font-size: 12px; color: #666; margin-top: 10px;">Word count: <span id="writing-count">0</span> / 100-150</p>
      
      <div style="margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 8px; text-align: center;">
        <h3 style="color: #155724;">🎉 Assessment Complete!</h3>
        <p style="color: #155724; margin-top: 10px;">Great work this week! Ready for the next chapter.</p>
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
    const totalPages = 4;
    
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
      if (currentPage < totalPages) showPage(currentPage + 1);
    }
    
    function prevPage() {
      if (currentPage > 1) showPage(currentPage - 1);
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    });
    
    // Vocabulary Matching Game
    let selectedWord = null;
    let selectedDef = null;
    let score = 0;
    let matchedPairs = new Set();
    
    function selectWord(element) {
      const word = element.getAttribute('data-word');
      if (matchedPairs.has(word)) return;
      
      document.querySelectorAll('.match-word').forEach(w => {
        w.style.transform = 'scale(1)';
        w.style.boxShadow = 'none';
      });
      
      element.style.transform = 'scale(1.05)';
      element.style.boxShadow = '0 4px 12px rgba(48,88,83,0.4)';
      selectedWord = word;
      
      if (selectedDef) checkMatch();
    }
    
    function selectDef(element) {
      const word = element.getAttribute('data-word');
      if (matchedPairs.has(word)) return;
      
      document.querySelectorAll('.match-def').forEach(d => {
        d.style.transform = 'scale(1)';
        d.style.boxShadow = 'none';
      });
      
      element.style.transform = 'scale(1.05)';
      element.style.boxShadow = '0 4px 12px rgba(139,69,19,0.4)';
      selectedDef = word;
      
      if (selectedWord) checkMatch();
    }
    
    function checkMatch() {
      const feedback = document.getElementById('gameFeedback');
      
      if (selectedWord === selectedDef) {
        score++;
        matchedPairs.add(selectedWord);
        document.getElementById('gameScore').textContent = score;
        
        const wordEl = document.querySelector(\`.match-word[data-word="\${selectedWord}"]\`);
        const defEl = document.querySelector(\`.match-def[data-word="\${selectedDef}"]\`);
        
        wordEl.style.background = '#4CAF50';
        wordEl.style.opacity = '0.6';
        wordEl.style.pointerEvents = 'none';
        defEl.style.background = '#4CAF50';
        defEl.style.color = 'white';
        defEl.style.opacity = '0.6';
        defEl.style.pointerEvents = 'none';
        
        feedback.style.display = 'block';
        feedback.style.background = '#d4edda';
        feedback.style.color = '#155724';
        feedback.textContent = '✓ Correct! Great match!';
        
        if (score === ${vocabWords.length}) {
          setTimeout(() => {
            feedback.textContent = '🎉 Perfect! You matched all the words!';
          }, 1000);
        }
      } else {
        feedback.style.display = 'block';
        feedback.style.background = '#f8d7da';
        feedback.style.color = '#721c24';
        feedback.textContent = '✗ Not quite. Try again!';
        
        setTimeout(() => {
          document.querySelectorAll('.match-word, .match-def').forEach(el => {
            if (!matchedPairs.has(el.getAttribute('data-word'))) {
              el.style.transform = 'scale(1)';
              el.style.boxShadow = 'none';
            }
          });
          feedback.style.display = 'none';
        }, 1500);
      }
      
      selectedWord = null;
      selectedDef = null;
    }
    
    // Word counter
    const writingArea = document.getElementById('writing');
    if (writingArea) {
      writingArea.addEventListener('input', () => {
        const words = writingArea.value.trim().split(/\\s+/).filter(w => w.length > 0);
        document.getElementById('writing-count').textContent = words.length;
      });
    }
    
    showPage(1);
  </script>
</body>
</html>`;
}

// Build all assessments
console.log('Building all 4th grade assessments...\n');

let built = 0;
for (let week = 1; week <= 36; week++) {
  const lessonNum = week * 5;
  const startLesson = (week - 1) * 5 + 1;
  
  const weekVocab = [];
  const weekSkills = [];
  
  // Collect vocab and skills from the 4 preceding lessons
  for (let i = 0; i < 4; i++) {
    const lesson = startLesson + i;
    const filename = `4th-grade-lesson-${String(lesson).padStart(3, '0')}.html`;
    
    const vocab = extractVocab(filename);
    weekVocab.push(...vocab);
    
    const skill = extractSkill(filename);
    if (skill) weekSkills.push(skill);
  }
  
  if (weekVocab.length > 0) {
    const assessmentHTML = buildAssessment(week, weekVocab, weekSkills, lessonNum);
    const outFile = `4th-grade-lesson-${String(lessonNum).padStart(3, '0')}.html`;
    fs.writeFileSync(outFile, assessmentHTML);
    console.log(`✅ Week ${week}: ${outFile} (${weekVocab.length} vocab, ${weekSkills.length} skills)`);
    built++;
  } else {
    console.log(`⚠️  Week ${week}: Skipped (no vocab found in preceding lessons)`);
  }
}

console.log(`\n✅ Built ${built} assessments!`);
