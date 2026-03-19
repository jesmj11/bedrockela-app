const fs = require('fs');

// Read the broken file
const html = fs.readFileSync('4th-grade-day-004.html', 'utf8');

// Fix: wrap all page content in proper divs
const fixed = html
  .replace(/render: \(\) => `\s*<h2>📖 Vocabulary<\/h2>/g, 
    'render: () => `<div class="lesson-page-card content-page"><h2>📖 Vocabulary</h2>')
  .replace(/render: \(\) => `\s*<h2>🎮 Vocabulary Matching Game<\/h2>/g,
    'render: () => `<div class="lesson-page-card content-page"><h2>🎮 Vocabulary Matching Game</h2>')
  .replace(/render: \(\) => `\s*<h2>📖 The Road Through the Forest - Part [123]<\/h2>/g,
    'render: () => `<div class="lesson-page-card content-page"><h2>📖 The Road Through the Forest - Part $1</h2>')
  .replace(/render: \(\) => `\s*<h2>💭 Reading Comprehension<\/h2>/g,
    'render: () => `<div class="lesson-page-card content-page"><h2>💭 Reading Comprehension</h2>')
  .replace(/render: \(\) => `\s*<h2>✏️/g,
    'render: () => `<div class="lesson-page-card content-page"><h2>✏️')
  .replace(/render: \(\) => `\s*<h2>🌍 Informational Text:/g,
    'render: () => `<div class="lesson-page-card content-page"><h2>🌍 Informational Text:')
  .replace(/render: \(\) => `\s*<h2>📝 Journal Response<\/h2>/g,
    'render: () => `<div class="lesson-page-card content-page"><h2>📝 Journal Response</h2>')
  .replace(/render: \(\) => `\s*<h2>✍️ Writing Practice<\/h2>/g,
    'render: () => `<div class="lesson-page-card content-page"><h2>✍️ Writing Practice</h2>')
  // Close divs before backtick-newlines at end of pages
  .replace(/\n\s*`\n\s*}/g, '\n                    </div>\n                `\n    }')
  // Fix textbox heights
  .replace(/rows="5"/g, 'rows="5" style="height: 120px;"')
  .replace(/rows="6"/g, 'rows="6" style="height: 120px;"')
  .replace(/rows="8"/g, 'rows="8" style="height: 150px;"')
  .replace(/rows="12"/g, 'rows="12" style="height: 200px;"');

fs.writeFileSync('4th-grade-day-004.html', fixed);
console.log('✅ Fixed Day 4 formatting');
