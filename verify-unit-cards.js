const fs = require('fs');

function verifyUnitCard(filename) {
  const unit = JSON.parse(fs.readFileSync(filename, 'utf8'));
  
  console.log(`\n📚 ${unit.unitInfo.title}`);
  console.log(`   Author: ${unit.unitInfo.originalAuthor}`);
  console.log(`   Total Chapters: ${unit.chapters.length}`);
  
  let issues = [];
  let stats = {
    totalText: 0,
    totalVocab: 0,
    totalQuestions: 0,
    grammarCount: 0,
    languageCount: 0,
    assessmentDays: [5, 10, 15, 20, 24]
  };
  
  unit.chapters.forEach(ch => {
    // Check text
    if (!ch.text || ch.text.length < 100) {
      issues.push(`Chapter ${ch.number}: Missing or too short text`);
    } else {
      stats.totalText += ch.text.split(/\s+/).length;
    }
    
    // Check vocab
    if (!ch.vocabulary || ch.vocabulary.length === 0) {
      issues.push(`Chapter ${ch.number}: Missing vocabulary`);
    } else {
      stats.totalVocab += ch.vocabulary.length;
    }
    
    // Check questions
    if (!ch.comprehension || ch.comprehension.length === 0) {
      issues.push(`Chapter ${ch.number}: Missing questions`);
    } else {
      stats.totalQuestions += ch.comprehension.length;
    }
    
    // Check grammar/language (skip assessment days)
    if (!stats.assessmentDays.includes(ch.number)) {
      if (!ch.grammar && !ch.language) {
        issues.push(`Chapter ${ch.number}: Missing grammar AND language lesson`);
      }
      if (ch.grammar) stats.grammarCount++;
      if (ch.language) stats.languageCount++;
    }
  });
  
  console.log(`   ✅ Text: ${stats.totalText.toLocaleString()} words (${Math.round(stats.totalText / unit.chapters.length)} avg/chapter)`);
  console.log(`   ✅ Vocabulary: ${stats.totalVocab} words total`);
  console.log(`   ✅ Questions: ${stats.totalQuestions} total`);
  console.log(`   ✅ Grammar lessons: ${stats.grammarCount}`);
  console.log(`   ✅ Language lessons: ${stats.languageCount}`);
  
  if (issues.length > 0) {
    console.log(`\n   ⚠️  ISSUES FOUND:`);
    issues.forEach(issue => console.log(`      - ${issue}`));
    return false;
  } else {
    console.log(`   ✅ COMPLETE - All content present!`);
    return true;
  }
}

console.log('═══════════════════════════════════════');
console.log('   UNIT CARD VERIFICATION');
console.log('═══════════════════════════════════════');

const tom = verifyUnitCard('book-data/tom-sawyer-complete-unit-card.json');
const leagues = verifyUnitCard('book-data/twenty-thousand-leagues-complete-unit-card.json');

console.log('\n═══════════════════════════════════════');
if (tom && leagues) {
  console.log('✅ BOTH UNITS COMPLETE AND READY!');
} else {
  console.log('⚠️  Some issues found - review above');
}
console.log('═══════════════════════════════════════\n');
