const fs = require('fs');
const { execSync } = require('child_process');

const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '8th'];

console.log('═══════════════════════════════════════════════════════');
console.log('  FIREBASE SAVE FUNCTIONALITY STATUS BY GRADE');
console.log('═══════════════════════════════════════════════════════\n');

grades.forEach(grade => {
  const files = execSync(`ls ${grade}-grade-day-*.html 2>/dev/null || true`).toString().trim().split('\n').filter(f => f);
  const withSave = execSync(`ls ${grade}-grade-day-*.html 2>/dev/null | xargs grep -l "lesson-completion.js" 2>/dev/null || true`).toString().trim().split('\n').filter(f => f);
  
  const total = files.length;
  const saveCount = withSave.length;
  const missingCount = total - saveCount;
  const percentage = Math.round((saveCount / total) * 100);
  
  console.log(`${grade.toUpperCase()} GRADE:`);
  console.log(`  ✅ ${saveCount} / ${total} lessons (${percentage}%)`);
  
  if (missingCount > 0) {
    const missing = files.filter(f => !withSave.includes(f));
    const ranges = [];
    let start = null;
    let prev = null;
    
    missing.forEach((file, idx) => {
      const num = parseInt(file.match(/day-(\d+)/)[1]);
      if (start === null) {
        start = num;
        prev = num;
      } else if (num === prev + 1) {
        prev = num;
      } else {
        ranges.push(start === prev ? `${start}` : `${start}-${prev}`);
        start = num;
        prev = num;
      }
      
      if (idx === missing.length - 1) {
        ranges.push(start === prev ? `${start}` : `${start}-${prev}`);
      }
    });
    
    console.log(`  ⚠️  Missing on days: ${ranges.join(', ')}`);
  }
  console.log('');
});

console.log('═══════════════════════════════════════════════════════');
console.log('SUMMARY:');
console.log('- 1st grade: Missing Days 1-6 (Week 1)');
console.log('- 2nd-6th grades: ALL lessons have saves ✅');
console.log('- 8th grade: Missing Days 61-75, 121-180');
console.log('═══════════════════════════════════════════════════════');
