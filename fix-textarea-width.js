const fs = require('fs');

const html = fs.readFileSync('4th-grade-day-004.html', 'utf8');

// Add width: 100% to all textareas
const fixed = html.replace(/<textarea /g, '<textarea style="width: 100%; box-sizing: border-box;" ');

fs.writeFileSync('4th-grade-day-004.html', fixed);
console.log('✅ Fixed textarea widths to span full width');
