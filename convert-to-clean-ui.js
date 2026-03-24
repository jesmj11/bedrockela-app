// Convert existing lessons to new clean UI template
// Reads old lessons, extracts content, wraps in new template

const fs = require('fs');
const path = require('path');

// Read the clean UI template
const template = fs.readFileSync('templates/lesson-template.html', 'utf8');

function convertLesson(oldHtmlPath, outputPath, lessonInfo) {
  console.log(`Converting: ${oldHtmlPath}`);
  
  const oldHtml = fs.readFileSync(oldHtmlPath, 'utf8');
  
  // Extract pages from old HTML (they have class="lesson-page" or class="page")
  const pageRegex = /<div[^>]*class="(?:lesson-page|page)"[^>]*data-page="(\d+)"[^>]*>([\s\S]*?)<\/div>\s*(?=<div[^>]*class="(?:lesson-page|page)"|<\/div>\s*<div[^>]*class="nav-controls"|<script>)/g;
  
  const pages = [];
  let match;
  while ((match = pageRegex.exec(oldHtml)) !== null) {
    const pageNum = match[1];
    const content = match[2];
    pages.push({ num: parseInt(pageNum), html: content });
  }
  
  // Sort pages by number
  pages.sort((a, b) => a.num - b.num);
  
  if (pages.length === 0) {
    console.log(`  ⚠️  No pages found, skipping`);
    return false;
  }
  
  // Build new HTML with clean template structure
  let newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lesson ${lessonInfo.day} - BedrockELA</title>
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
    
    /* Preserve old styles that might exist in content */
    .page-content { padding: 0; }
    .lesson-page { display: block; }
  </style>
</head>
<body>
  
  <!-- TOP NAVIGATION -->
  <div class="top-nav">
    <a href="../student-dashboard.html" class="home-btn">← Home</a>
    <div class="day-info">Lesson ${lessonInfo.day}: ${lessonInfo.title || 'Chapter ' + lessonInfo.day}</div>
    <div class="page-progress" id="topProgress">Page 1 of ${pages.length}</div>
  </div>
  
  <div class="container">
    
`;

  // Add all pages
  pages.forEach((page, idx) => {
    const activeClass = idx === 0 ? ' active' : '';
    newHtml += `    <!-- PAGE ${page.num} -->
    <div class="page${activeClass}" data-page="${page.num}">
${page.html}
    </div>
    
`;
  });

  // Add navigation and script
  newHtml += `  </div>
  
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
    const totalPages = ${pages.length};
    
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

  // Write output
  fs.writeFileSync(outputPath, newHtml, 'utf8');
  console.log(`  ✅ Converted to ${outputPath}`);
  return true;
}

// Main execution
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`
🔄 Convert lessons to clean UI template

Usage:
  node convert-to-clean-ui.js <grade> [output-dir]
  
Examples:
  node convert-to-clean-ui.js 7              # Convert grade 7, overwrite in place
  node convert-to-clean-ui.js 4 curriculum/grade4-new  # Convert grade 4 to new folder
  node convert-to-clean-ui.js all            # Convert all grades
  
Supported grades: 4, 5, 6, 7
  `);
  process.exit(0);
}

const grade = args[0];
const outputDir = args[1];

// Define conversion patterns for each grade
const patterns = {
  '4': {
    input: 'curriculum/grade4/4th-grade-lesson-*.html',
    output: outputDir || 'curriculum/grade4',
    pattern: /4th-grade-lesson-(\d+)\.html/,
    nameFunc: (num) => `4th-grade-lesson-${num}.html`,
    infoFunc: (num) => ({ day: num, grade: 4, title: null })
  },
  '5': {
    input: '5th-grade-day-*.html',
    output: outputDir || 'curriculum/grade5',
    pattern: /5th-grade-day-(\d+)\.html/,
    nameFunc: (num) => `5th-grade-lesson-${num.toString().padStart(3, '0')}.html`,
    infoFunc: (num) => ({ day: num, grade: 5, title: null })
  },
  '6': {
    input: '6th-grade-day-*.html',
    output: outputDir || 'curriculum/grade6',
    pattern: /6th-grade-day-(\d+)\.html/,
    nameFunc: (num) => `6th-grade-lesson-${num.toString().padStart(3, '0')}.html`,
    infoFunc: (num) => ({ day: num, grade: 6, title: null })
  },
  '7': {
    input: 'curriculum/grade7/7th-grade-lesson-*.html',
    output: outputDir || 'curriculum/grade7',
    pattern: /7th-grade-lesson-(\d+)\.html/,
    nameFunc: (num) => `7th-grade-lesson-${num.toString().padStart(3, '0')}.html`,
    infoFunc: (num) => ({ day: num, grade: 7, title: null })
  }
};

if (grade === 'all') {
  console.log('\n🔄 Converting ALL grades to clean UI...\n');
  Object.keys(patterns).forEach(g => {
    console.log(`\n📚 Converting Grade ${g}...`);
    processGrade(g, patterns[g]);
  });
} else if (patterns[grade]) {
  console.log(`\n🔄 Converting Grade ${grade} to clean UI...\n`);
  processGrade(grade, patterns[grade]);
} else {
  console.log(`❌ Unknown grade: ${grade}`);
  process.exit(1);
}

function processGrade(grade, config) {
  const { globSync } = require('glob');
  const files = globSync(config.input);
  
  if (files.length === 0) {
    console.log(`  ⚠️  No files found matching: ${config.input}`);
    return;
  }
  
  // Create output directory if needed
  if (!fs.existsSync(config.output)) {
    fs.mkdirSync(config.output, { recursive: true });
  }
  
  let converted = 0;
  files.forEach(file => {
    const match = path.basename(file).match(config.pattern);
    if (match) {
      const num = parseInt(match[1]);
      const outputFile = path.join(config.output, config.nameFunc(num));
      const info = config.infoFunc(num);
      
      if (convertLesson(file, outputFile, info)) {
        converted++;
      }
    }
  });
  
  console.log(`\n✅ Grade ${grade}: Converted ${converted} lessons\n`);
}
