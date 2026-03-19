const fs = require('fs');
let html = fs.readFileSync('4th-grade-day-004.html', 'utf8');

// Remove duplicate closing divs at end of pages (double </div></div>)
html = html.replace(/\s*<\/div>\s*<\/div>\s*`\s*\n\s*}/g, '\n                    </div>\n                `\n    }');

// Fix the objectives page that has triple closing divs
html = html.replace(/<\/div>\s*<\/div>\s*<\/div>\s*`/g, '</div>\n                    </div>\n                `');

fs.writeFileSync('4th-grade-day-004.html', html);
console.log('✅ Removed extra closing divs');
