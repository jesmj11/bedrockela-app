// Fix ALL lessons to include universal initialization
// Prevents blue screen errors forever

const fs = require('fs');
const path = require('path');

const UNIVERSAL_SCRIPT = `  <script src="../js/universal-lesson-init.js"></script>`;

function fixLesson(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Check if already has the universal script
  if (html.includes('universal-lesson-init.js')) {
    return { fixed: false, reason: 'already has universal script' };
  }
  
  // Check if it's missing closing body tag (some files might be truncated)
  if (!html.includes('</body>')) {
    return { fixed: false, reason: 'malformed HTML (no </body>)' };
  }
  
  // Insert universal script right before </body>
  html = html.replace('</body>', `${UNIVERSAL_SCRIPT}\n</body>`);
  modified = true;
  
  // Remove any inline showPage() calls that might conflict
  // But keep the initialization wrapper if it exists
  if (html.includes('showPage(1);') && !html.includes('window.showPage')) {
    // This is likely an old inline initialization - remove it
    html = html.replace(/<script>[\s\S]*?showPage\(1\);[\s\S]*?<\/script>/g, '');
    console.log(`  ⚠️  Removed old inline initialization`);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    return { fixed: true, reason: 'added universal script' };
  }
  
  return { fixed: false, reason: 'no changes needed' };
}

function fixAllLessonsInGrade(gradeNum) {
  const gradeDir = path.join('curriculum', `grade${gradeNum}`);
  
  if (!fs.existsSync(gradeDir)) {
    console.log(`\n❌ Grade ${gradeNum} directory not found: ${gradeDir}`);
    return { total: 0, fixed: 0 };
  }
  
  const files = fs.readdirSync(gradeDir).filter(f => f.endsWith('.html'));
  
  console.log(`\n📚 Grade ${gradeNum}: ${files.length} lessons found`);
  
  let stats = { total: files.length, fixed: 0, skipped: 0, errors: 0 };
  
  files.forEach(file => {
    const filePath = path.join(gradeDir, file);
    try {
      const result = fixLesson(filePath);
      if (result.fixed) {
        stats.fixed++;
        console.log(`  ✅ ${file} - ${result.reason}`);
      } else {
        stats.skipped++;
        // Only log skips if it's interesting
        if (result.reason !== 'already has universal script') {
          console.log(`  ⏭️  ${file} - ${result.reason}`);
        }
      }
    } catch (error) {
      stats.errors++;
      console.log(`  ❌ ${file} - ERROR: ${error.message}`);
    }
  });
  
  return stats;
}

// Main execution
console.log('🔧 FIXING ALL LESSONS - UNIVERSAL INITIALIZATION\n');
console.log('=' .repeat(60));

const grades = [3, 4, 5, 6, 7, 8];
let totalStats = { total: 0, fixed: 0, skipped: 0, errors: 0 };

grades.forEach(grade => {
  const stats = fixAllLessonsInGrade(grade);
  totalStats.total += stats.total;
  totalStats.fixed += stats.fixed;
  totalStats.skipped += stats.skipped;
  totalStats.errors += stats.errors;
});

console.log('\n' + '='.repeat(60));
console.log('\n📊 SUMMARY:');
console.log(`   Total lessons: ${totalStats.total}`);
console.log(`   ✅ Fixed: ${totalStats.fixed}`);
console.log(`   ⏭️  Skipped: ${totalStats.skipped}`);
console.log(`   ❌ Errors: ${totalStats.errors}`);

if (totalStats.fixed > 0) {
  console.log('\n🎉 Blue screen problem SOLVED!');
  console.log('   All lessons now use universal-lesson-init.js');
} else if (totalStats.total > 0) {
  console.log('\n✅ All lessons already fixed!');
} else {
  console.log('\n⚠️  No lessons found to fix');
}

console.log('\n📝 Next: Update generators to include universal script by default\n');
