const fs = require('fs');
const { execSync } = require('child_process');

console.log('8TH GRADE CURRICULUM UNITS\n');

// Check a sample of days to identify units
const sampleDays = [1, 5, 30, 35, 60, 65, 75, 80, 90, 95, 120, 125, 140, 150, 160, 170, 180];

sampleDays.forEach(day => {
  const paddedDay = day.toString().padStart(3, '0');
  const file = `8th-grade-day-${paddedDay}.html`;
  
  try {
    const content = fs.readFileSync(file, 'utf8');
    const titleMatch = content.match(/<h3>(.*?)<\/h3>/);
    const title = titleMatch ? titleMatch[1] : 'Unknown';
    const hasSave = content.includes('lesson-completion.js');
    
    console.log(`Day ${day.toString().padStart(3)}: ${title.padEnd(30)} ${hasSave ? '✅' : '❌'}`);
  } catch (err) {
    console.log(`Day ${day.toString().padStart(3)}: File not found`);
  }
});

console.log('\n════════════════════════════════════════');
console.log('MISSING SAVE FUNCTIONALITY:');
console.log('Days 61-75:   Sherlock Holmes (15 lessons)');
console.log('Days 121-180: Frankenstein + others (60 lessons)');
console.log('════════════════════════════════════════');
