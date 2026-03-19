const fs = require('fs');

const html = fs.readFileSync('4th-grade-day-004.html', 'utf8');

// Add word counts and proper labels to all textboxes
const fixed = html
  // Vocab textboxes - 20-30 words
  .replace(/<label>Write the definition in your own words:<\/label>\s*<textarea id="vocab-4-1"/g,
    '<label>Write the definition in your own words (20-30 words):</label>\n                        <textarea id="vocab-4-1"')
  .replace(/<label>Write the definition in your own words:<\/label>\s*<textarea id="vocab-4-2"/g,
    '<label>Write the definition in your own words (20-30 words):</label>\n                        <textarea id="vocab-4-2"')
  // Add word count spans after vocab textboxes
  .replace(/(<textarea id="vocab-4-1"[^>]*><\/textarea>)/g,
    '$1\n                        <p class="word-count" style="font-size: 12px; color: #666; margin-top: 5px;">Word count: <span id="vocab-4-1-count">0</span></p>')
  .replace(/(<textarea id="vocab-4-2"[^>]*><\/textarea>)/g,
    '$1\n                        <p class="word-count" style="font-size: 12px; color: #666; margin-top: 5px;">Word count: <span id="vocab-4-2-count">0</span></p>')
  
  // Comprehension short answer - 75-100 words
  .replace(/<textarea id="comp-short"/g,
    '<label>Write 75-100 words:</label>\n                        <textarea id="comp-short"')
  .replace(/(<textarea id="comp-short"[^>]*><\/textarea>)/g,
    '$1\n                        <p class="word-count" style="font-size: 12px; color: #666; margin-top: 5px;">Word count: <span id="comp-short-count">0</span></p>')
  
  // Grammar/Language skill practice
  .replace(/(<textarea id="skill-4-1"[^>]*><\/textarea>)/g,
    '$1\n                            <p class="word-count" style="font-size: 12px; color: #666; margin-top: 5px;">Word count: <span id="skill-4-1-count">0</span></p>')
  .replace(/(<textarea id="skill-4-2"[^>]*><\/textarea>)/g,
    '$1\n                            <p class="word-count" style="font-size: 12px; color: #666; margin-top: 5px;">Word count: <span id="skill-4-2-count">0</span></p>')
  
  // Info text questions - 40-50 words each
  .replace(/<textarea id="info-4-1"/g,
    '<label>Write 40-50 words:</label>\n                        <textarea id="info-4-1"')
  .replace(/<textarea id="info-4-2"/g,
    '<label>Write 40-50 words:</label>\n                        <textarea id="info-4-2"')
  .replace(/(<textarea id="info-4-1"[^>]*><\/textarea>)/g,
    '$1\n                        <p class="word-count" style="font-size: 12px; color: #666; margin-top: 5px;">Word count: <span id="info-4-1-count">0</span></p>')
  .replace(/(<textarea id="info-4-2"[^>]*><\/textarea>)/g,
    '$1\n                        <p class="word-count" style="font-size: 12px; color: #666; margin-top: 5px;">Word count: <span id="info-4-2-count">0</span></p>')
  
  // Journal - 100-150 words
  .replace(/<textarea id="journal-4"/g,
    '<label>Write 100-150 words:</label>\n                        <textarea id="journal-4"')
  .replace(/(<textarea id="journal-4"[^>]*><\/textarea>)/g,
    '$1\n                        <p class="word-count" style="font-size: 12px; color: #666; margin-top: 5px;">Word count: <span id="journal-4-count">0</span></p>');

fs.writeFileSync('4th-grade-day-004.html', fixed);
console.log('✅ Added word counts and labels to all textboxes');
