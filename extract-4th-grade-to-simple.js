// Extract content from old complex 4th grade files and convert to simple HTML

const fs = require('fs');

function extractContentFromJSConfig(htmlFile) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  
  // Extract the pages array from the JavaScript
  const pagesMatch = content.match(/pages:\s*\[([\s\S]*?)\]\s*(?:};|,\s*})/m);
  if (!pagesMatch) {
    console.log(`⚠️  No pages array found in ${htmlFile}`);
    return null;
  }
  
  // Parse each page's render function
  const pageRegex = /render:\s*\(\)\s*=>\s*`([\s\S]*?)`\s*(?:},|}\s*\])/g;
  const pages = [];
  let match;
  
  while ((match = pageRegex.exec(content)) !== null) {
    const html = match[1]
      .replace(/\$\{/g, '${')  // Keep template literals as-is for now
      .trim();
    pages.push(html);
  }
  
  if (pages.length === 0) {
    console.log(`⚠️  No pages extracted from ${htmlFile}`);
    return null;
  }
  
  return pages;
}

function buildSimpleHTML(pages, day) {
  // Clean up the HTML from each page
  const cleanPages = pages.map(html => {
    // Remove the outer div wrapper that has "lesson-page-card"
    let clean = html.replace(/<div class="lesson-page-card[^"]*">/g, '');
    clean = clean.replace(/<\/div>\s*$/g, '');
    return clean.trim();
  });
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day ${day} - 4th Grade BedrockELA</title>
  <style>
    ${getCSS()}
  </style>
</head>
<body>
  
  <div class="top-nav">
    <a href="student-dashboard.html" class="home-btn">← Home</a>
    <div class="day-info">Day ${day} - The Wizard of Oz</div>
    <div class="page-progress" id="topProgress">Page 1 of ${pages.length}</div>
  </div>
  
  <div class="container">
${cleanPages.map((html, idx) => `
    <div class="page${idx === 0 ? ' active' : ''}" data-page="${idx + 1}">
${html}
    </div>
`).join('\n')}
  </div>
  
  <div class="bottom-nav">
    <button id="prevBtn" onclick="prevPage()">← Previous</button>
    <div class="progress">
      <div class="progress-bar" id="progressBar"></div>
    </div>
    <button id="nextBtn" onclick="nextPage()">Next →</button>
  </div>

  <script>
    ${getJS(pages.length)}
  </script>
</body>
</html>`;
  
  return html;
}

function getCSS() {
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
    p { margin-bottom: 1rem; line-height: 1.8; }
    ul, ol { margin-left: 1.5rem; margin-bottom: 1rem; }
    li { margin-bottom: 0.5rem; }
    
    textarea, input[type="text"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-family: inherit;
      font-size: 1rem;
      resize: vertical;
    }
    
    textarea:focus, input:focus {
      outline: none;
      border-color: #305853;
    }
    
    .vocab-word-card, .question-card, .exercise-card {
      padding: 20px;
      margin-bottom: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      border-left: 4px solid #B06821;
    }
    
    .story-content p {
      text-indent: 2em;
      margin-bottom: 15px;
    }
    
    .title-page {
      text-align: center;
      padding: 60px 30px;
    }
    
    .unit-label, .chapter-info {
      color: #666;
      margin-top: 10px;
    }`;
}

function getJS(totalPages) {
  return `let currentPage = 1;
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
      if (currentPage < totalPages) showPage(currentPage + 1);
    }
    
    function prevPage() {
      if (currentPage > 1) showPage(currentPage - 1);
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    });
    
    showPage(1);`;
}

// MAIN
console.log('\n🔄 Converting 4th Grade to Simple UI\n');

const files = fs.readdirSync('.').filter(f => f.match(/^4th-grade-day-\d{3}\.html$/));
let converted = 0;

files.forEach(file => {
  const day = parseInt(file.match(/\d+/)[0]);
  
  console.log(`Converting Day ${day}...`);
  const pages = extractContentFromJSConfig(file);
  
  if (!pages) return;
  
  const simpleHTML = buildSimpleHTML(pages, day);
  
  // Backup old file
  fs.renameSync(file, file.replace('.html', '.OLD.html'));
  
  // Write new file
  fs.writeFileSync(file, simpleHTML, 'utf8');
  console.log(`  ✅ Converted: ${file}`);
  converted++;
});

console.log(`\n✨ Done! Converted ${converted} lessons to simple UI.\n`);
