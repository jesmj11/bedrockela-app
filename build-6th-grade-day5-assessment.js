// Build 6th Grade Day 5 Assessment - Complete 8-Page Structure
// Tests Days 1-4 content: Vocab, Grammar, Language, Reading, Writing, Info Text

const fs = require('fs');
const {
  generateGrammarAssessment,
  generateLanguageAssessment,
  generateWritingPrompt,
  generateInformationalText
} = require('./assessment-generators.js');

// Load grammar and language data
const grammarData = JSON.parse(fs.readFileSync('book-data/tom-sawyer-grammar.json', 'utf8'));
const languageData = JSON.parse(fs.readFileSync('book-data/tom-sawyer-language.json', 'utf8'));

// Colors
const colors = {
  white: '#FFFFFF',
  deepTeal: '#305853',
  goldenAmber: '#B06821',
  brickRed: '#9E2C21',
  darkMahogany: '#511B18',
  slateBlue: '#1B2A50'
};

// Vocabulary from Days 1-4
const vocabularyQuiz = [
  // Day 1
  { word: "satire", definition: "the use of humor, irony, or exaggeration to criticize", sentence: "Mark Twain used _______ to make fun of human nature." },
  { word: "episodic", definition: "made up of separate episodes or events", sentence: "Tom Sawyer has an _______ structure with many different adventures." },
  { word: "Mississippi", definition: "the great river along which Tom's town sits", sentence: "The _______ River was central to life in 1840s Missouri." },
  { word: "antebellum", definition: "existing before a war, especially the Civil War", sentence: "The story takes place in the _______ South before the Civil War." },
  { word: "colloquial", definition: "informal language used in everyday conversation", sentence: "Twain's characters speak in _______ dialect rather than formal English." },
  
  // Day 2
  { word: "beguiled", definition: "charmed or enchanted, sometimes in a deceptive way", sentence: "Tom _______ his friends into doing his work for him." },
  { word: "commenced", definition: "began or started", sentence: "Aunt Polly _______ to scold Tom for his mischief." },
  { word: "ornery", definition: "bad-tempered and difficult to deal with", sentence: "Tom could be quite _______ when he didn't get his way." },
  { word: "reckoned", definition: "thought or supposed", sentence: "Tom _______ he could trick Ben into whitewashing the fence." },
  { word: "meditate", definition: "to think deeply or focus one's mind", sentence: "Tom would _______ on ways to avoid work." },
  
  // Day 3
  { word: "conspicuous", definition: "standing out and attracting attention", sentence: "Tom made himself _______ in front of Becky Thatcher." },
  { word: "diligence", definition: "careful and persistent work or effort", sentence: "Tom showed no _______ when it came to his schoolwork." },
  { word: "derision", definition: "contemptuous ridicule or mockery", sentence: "The other boys looked at Tom with _______ when he failed." },
  { word: "mortified", definition: "deeply embarrassed or humiliated", sentence: "Tom was _______ when Becky saw him make a fool of himself." },
  { word: "resolute", definition: "admirably purposeful and determined", sentence: "Tom was _______ in his pursuit of Becky's affection." },
  
  // Day 4
  { word: "rendezvous", definition: "a planned meeting at a specific time and place", sentence: "The boys agreed on a _______ at midnight in the graveyard." },
  { word: "malady", definition: "an illness or disease", sentence: "Tom pretended to have a serious _______ to avoid school." },
  { word: "gratification", definition: "pleasure or satisfaction", sentence: "Tom found great _______ in his freedom with Huck." },
  { word: "impediment", definition: "a hindrance or obstruction", sentence: "School was an _______ to Tom's adventurous plans." },
  { word: "pariah", definition: "an outcast rejected by society", sentence: "Huck Finn was treated as a _______ by the respectable townspeople." }
];

// Reading comprehension questions
const comprehensionQuestions = [
  {
    question: "How does Tom trick his friends into whitewashing the fence? Describe at least TWO specific strategies he uses. Use evidence from the text.",
    standard: "RL.6.1",
    answer: "Expected: Tom pretends the work is fun/desirable, refuses to let Ben paint at first, makes it seem like a privilege, trades for treasures."
  },
  {
    question: "What does Mark Twain mean when he writes that Tom 'had discovered a great law of human action'? Explain in your own words.",
    standard: "RL.6.2",
    answer: "Expected: People want things more when they seem difficult to get; making work seem like play changes perception."
  },
  {
    question: "How is Huckleberry Finn different from the other boys in town? Why do the mothers forbid their children to play with him?",
    standard: "RL.6.3",
    answer: "Expected: Huck is free, doesn't attend school, no supervision, mothers see him as bad influence/low class."
  },
  {
    question: "Tom falls in love with Becky Thatcher at first sight and immediately starts showing off. What does this reveal about his character?",
    standard: "RL.6.3",
    answer: "Expected: Tom is vain, loves attention, dramatic, emotional, impulsive, wants to impress others."
  }
];

// Build the complete HTML
function buildDay5Assessment() {
  const pages = [];
  
  // ==========================================
  // PAGE 1: TITLE PAGE
  // ==========================================
  pages.push(`
    <div class="lesson-page" data-page="1">
      <div class="page-content title-page">
        <div class="lesson-icon">📋</div>
        <h1 class="lesson-title">Day 5 Assessment</h1>
        <h2 class="lesson-subtitle">Week 1 Check-In</h2>
        <p class="lesson-meta">The Adventures of Tom Sawyer</p>
        <p class="lesson-focus"><strong>Covers:</strong> Chapters 1-6 (Days 1-4)</p>
        <div style="margin-top: 40px; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h3 style="color: ${colors.deepTeal}; margin-bottom: 15px;">Assessment Sections:</h3>
          <ul style="line-height: 2; font-size: 1.1em;">
            <li>📖 Vocabulary (20 words)</li>
            <li>📝 Grammar Skills</li>
            <li>📚 Language Skills</li>
            <li>🤔 Reading Comprehension</li>
            <li>✍️ Writing Assessment</li>
            <li>📰 Informational Reading</li>
          </ul>
        </div>
      </div>
    </div>
  `);
  
  // ==========================================
  // PAGE 2: VOCABULARY ASSESSMENT
  // ==========================================
  pages.push(`
    <div class="lesson-page" data-page="2">
      <div class="page-content">
        <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">📖 Vocabulary Assessment</h2>
        <p style="margin-bottom: 20px;">Fill in the blanks with the correct vocabulary word from Days 1-4:</p>
        <div class="vocab-quiz">
          ${vocabularyQuiz.map((item, i) => `
            <div class="quiz-item" style="margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
              <p style="font-weight: 700; margin-bottom: 8px;">${i + 1}. ${item.sentence}</p>
              <p style="font-size: 0.9em; color: #666; margin-bottom: 10px;"><em>Hint: ${item.definition}</em></p>
              <input type="text" class="vocab-answer" data-answer="${item.word}" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 1em;" placeholder="Type your answer...">
            </div>
          `).join('')}
        </div>
        <button onclick="window.checkVocab()" style="margin-top: 20px; padding: 15px 30px; background: ${colors.goldenAmber}; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer;">Check Answers</button>
      </div>
    </div>
  `);
  
  // ==========================================
  // PAGE 3: GRAMMAR ASSESSMENT (Generated)
  // ==========================================
  const grammarPage = generateGrammarAssessment(grammarData, 5, 6, "Tom Sawyer");
  pages.push(grammarPage);
  
  // ==========================================
  // PAGE 4: LANGUAGE ASSESSMENT (Generated)
  // ==========================================
  const languagePage = generateLanguageAssessment(languageData, 5, 6, "Tom Sawyer");
  pages.push(languagePage);
  
  // ==========================================
  // PAGE 5: READING COMPREHENSION
  // ==========================================
  pages.push(`
    <div class="lesson-page" data-page="5">
      <div class="page-content">
        <h2 style="color: ${colors.brickRed}; margin-bottom: 20px;">🤔 Reading Comprehension</h2>
        <p style="margin-bottom: 20px;">Answer these questions about Chapters 1-6 of Tom Sawyer:</p>
        <div class="comprehension-questions">
          ${comprehensionQuestions.map((q, i) => `
            <div class="comp-question" style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
              <p style="font-weight: 700; margin-bottom: 10px;">${i + 1}. ${q.question}</p>
              <p style="font-size: 0.85em; color: #666; margin-bottom: 10px;"><em>Standard: ${q.standard}</em></p>
              <textarea class="comp-answer" rows="5" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Write your answer with evidence from the text..."></textarea>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `);
  
  // ==========================================
  // PAGE 6: WRITING PROMPT (Generated)
  // ==========================================
  const writingPage = generateWritingPrompt("tom-sawyer-day5", 6);
  pages.push(writingPage);
  
  // ==========================================
  // PAGE 7: INFORMATIONAL TEXT (Generated)
  // ==========================================
  const infoTextPage = generateInformationalText("tom-sawyer-day5", 6);
  pages.push(infoTextPage);
  
  // ==========================================
  // PAGE 8: COMPLETION PAGE
  // ==========================================
  pages.push(`
    <div class="lesson-page" data-page="8">
      <div class="page-content completion-page" style="text-align: center;">
        <div style="font-size: 5rem; margin-bottom: 20px;">🎉</div>
        <h2 style="color: ${colors.deepTeal}; margin-bottom: 15px;">Week 1 Assessment Complete!</h2>
        <p style="font-size: 1.2em; margin-bottom: 20px;">Great work! You've completed all sections:</p>
        <div style="display: inline-block; text-align: left; margin-bottom: 30px;">
          <ul style="font-size: 1.1em; line-height: 2;">
            <li>✅ 20 Vocabulary Words</li>
            <li>✅ Grammar Skills (Complex Sentences & Clauses)</li>
            <li>✅ Language Skills (Context Clues & Prefixes)</li>
            <li>✅ Reading Comprehension</li>
            <li>✅ Writing Assessment</li>
            <li>✅ Informational Reading</li>
          </ul>
        </div>
        <div style="padding: 20px; background: #f0f8ff; border-radius: 10px; margin-bottom: 30px;">
          <h3 style="color: ${colors.goldenAmber}; margin-bottom: 10px;">What's Next?</h3>
          <p style="font-size: 1.05em;">Day 6 begins Week 2! We'll dive into:</p>
          <ul style="list-style: none; padding: 0; margin-top: 10px;">
            <li>📖 Chapters 7-9 (The graveyard scene!)</li>
            <li>📝 New grammar: Active and Passive Voice</li>
            <li>📚 New language: Suffixes</li>
            <li>🎯 More exciting adventures!</li>
          </ul>
        </div>
        <button onclick="window.submitAssessment()" style="padding: 15px 40px; background: ${colors.deepTeal}; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer; margin-right: 15px;">Submit Assessment</button>
        <button onclick="window.location.href='student-dashboard.html'" style="padding: 15px 40px; background: ${colors.goldenAmber}; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer;">Back to Dashboard</button>
      </div>
    </div>
  `);
  
  return buildFullHTML(pages);
}

function buildFullHTML(pages) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>6th Grade Day 5 Assessment - BedrockELA</title>
  <link rel="stylesheet" href="css/lesson-viewer.css">
  <style>
    body { 
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
      background: ${colors.white}; 
      margin: 0; 
      padding: 0; 
    }
    .lesson-container { max-width: 900px; margin: 0 auto; padding: 20px; }
    .lesson-page { display: none; min-height: 500px; }
    .lesson-page.active { display: block; animation: fadeIn 0.3s; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .page-content { padding: 30px; }
    .title-page { text-align: center; padding: 60px 30px; }
    .lesson-icon { font-size: 5rem; margin-bottom: 20px; }
    .lesson-title { color: ${colors.deepTeal}; font-size: 2.5rem; margin-bottom: 10px; font-weight: 800; }
    .lesson-subtitle { color: ${colors.goldenAmber}; font-size: 1.8rem; margin-bottom: 15px; font-weight: 700; }
    .lesson-meta { color: #666; font-size: 1.2rem; margin-bottom: 10px; }
    .lesson-focus { color: #444; font-size: 1.1rem; font-style: italic; }
    
    .nav-controls { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-top: 30px; 
      padding: 20px; 
      background: #f9f9f9; 
      border-radius: 10px; 
      position: sticky;
      bottom: 20px;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    }
    .nav-btn { 
      padding: 12px 24px; 
      background: ${colors.deepTeal}; 
      color: white; 
      border: none; 
      border-radius: 8px; 
      font-size: 16px; 
      font-weight: 600; 
      cursor: pointer; 
      transition: all 0.2s;
    }
    .nav-btn:hover { background: ${colors.goldenAmber}; transform: translateY(-2px); }
    .nav-btn:disabled { background: #ccc; cursor: not-allowed; transform: none; }
    .progress-bar { 
      flex: 1; 
      margin: 0 20px; 
      height: 10px; 
      background: #e0e0e0; 
      border-radius: 10px; 
      overflow: hidden; 
    }
    .progress-fill { 
      height: 100%; 
      background: linear-gradient(90deg, ${colors.deepTeal}, ${colors.goldenAmber}); 
      transition: width 0.3s ease;
      border-radius: 10px;
    }
    .page-indicator { 
      font-size: 0.9em; 
      color: #666; 
      font-weight: 600; 
    }
    
    input.vocab-answer.correct { border-color: #4CAF50; background: #e8f5e9; }
    input.vocab-answer.incorrect { border-color: #f44336; background: #ffebee; }
  </style>
</head>
<body>
  <div class="lesson-container">
    <div id="lessonContent">
      ${pages.join('\n')}
    </div>
    
    <div class="nav-controls">
      <button class="nav-btn" id="prevBtn" onclick="previousPage()">← Previous</button>
      <span class="page-indicator" id="pageIndicator">Page 1 of 8</span>
      <div class="progress-bar">
        <div class="progress-fill" id="progressBar"></div>
      </div>
      <button class="nav-btn" id="nextBtn" onclick="nextPage()">Next →</button>
    </div>
  </div>

  <script>
    let currentPage = 1;
    const totalPages = 8;
    
    function showPage(pageNum) {
      document.querySelectorAll('.lesson-page').forEach(p => p.classList.remove('active'));
      const page = document.querySelector(\`.lesson-page[data-page="\${pageNum}"]\`);
      if (page) page.classList.add('active');
      
      document.getElementById('prevBtn').disabled = (pageNum === 1);
      document.getElementById('nextBtn').disabled = (pageNum === totalPages);
      
      const progress = (pageNum / totalPages) * 100;
      document.getElementById('progressBar').style.width = progress + '%';
      document.getElementById('pageIndicator').textContent = \`Page \${pageNum} of \${totalPages}\`;
      
      currentPage = pageNum;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function nextPage() { if (currentPage < totalPages) showPage(currentPage + 1); }
    function previousPage() { if (currentPage > 1) showPage(currentPage - 1); }
    
    // Vocabulary checking
    window.checkVocab = function() {
      let correct = 0;
      let total = 0;
      document.querySelectorAll('.vocab-answer').forEach(input => {
        total++;
        const answer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        if (answer === correctAnswer) {
          input.classList.add('correct');
          input.classList.remove('incorrect');
          correct++;
        } else {
          input.classList.add('incorrect');
          input.classList.remove('correct');
        }
      });
      alert(\`You got \${correct} out of \${total} correct! (\${Math.round(correct/total*100)}%)\`);
    };
    
    // Writing word count
    const writingArea = document.querySelector('.writing-response');
    if (writingArea) {
      writingArea.addEventListener('input', function() {
        const words = this.value.trim().split(/\\s+/).filter(w => w.length > 0).length;
        document.getElementById('wordCount').textContent = words;
      });
    }
    
    window.saveWriting = function() {
      alert('Writing saved! ✅ Continue to the next section.');
      nextPage();
    };
    
    window.submitAssessment = function() {
      if (confirm('Submit your assessment? Make sure you\\'ve completed all sections!')) {
        alert('Assessment submitted! ✅ Great work!');
        // In production, this would save to Firebase
      }
    };
    
    // Initialize
    showPage(1);
  </script>
</body>
</html>`;
}

// Generate the file
const html = buildDay5Assessment();
fs.writeFileSync('6th-grade-day-005.html', html);
console.log('✅ Day 5 Assessment created: 6th-grade-day-005.html');
console.log('\n📄 Structure:');
console.log('  Page 1: Title Page');
console.log('  Page 2: Vocabulary (20 words)');
console.log('  Page 3: Grammar Assessment (Days 1 & 3)');
console.log('  Page 4: Language Assessment (Days 2 & 4)');
console.log('  Page 5: Reading Comprehension (4 questions)');
console.log('  Page 6: Writing Prompt (Personal Narrative)');
console.log('  Page 7: Informational Text (Mark Twain biography)');
console.log('  Page 8: Completion Page');
console.log('\n🎯 Ready to test!');
