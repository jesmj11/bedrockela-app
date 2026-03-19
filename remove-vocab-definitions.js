const fs = require('fs');

const html = fs.readFileSync('4th-grade-day-004.html', 'utf8');

// Remove the given definitions - students must look up the words
const fixed = html
  .replace(/<p class="definition"><strong>Definition:<\/strong> [^<]+<\/p>/g, 
    '<p style="color: #666; font-style: italic;">Look up this word in a dictionary and write the definition in your own words.</p>')
  .replace(/Write the definition in your own words \(20-30 words\):/g,
    'Write the definition (20-30 words):');

fs.writeFileSync('4th-grade-day-004.html', fixed);
console.log('✅ Removed vocab definitions - students must look them up');
