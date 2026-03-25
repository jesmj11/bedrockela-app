// Parse Anne of Green Gables and Moby Dick for 7th Grade
const mammoth = require('mammoth');
const fs = require('fs');

async function parseDocx(filepath) {
  const result = await mammoth.extractRawText({ path: filepath });
  return result.value;
}

async function parseAnne() {
  console.log('\n📚 Parsing Anne of Green Gables...\n');
  
  // Extract text from both files
  const storyText = await parseDocx('book-data/anne_green_gables_7th_grade.docx');
  const qvText = await parseDocx('book-data/anne_questions_vocab.docx');
  
  // Save raw text for inspection
  fs.writeFileSync('book-data/anne-chapters-raw.txt', storyText);
  fs.writeFileSync('book-data/anne-qv-raw.txt', qvText);
  
  console.log('✅ Anne raw text extracted');
  console.log(`   Story: ${storyText.length} chars`);
  console.log(`   Q&V: ${qvText.length} chars`);
  console.log('   Files: anne-chapters-raw.txt, anne-qv-raw.txt\n');
}

async function parseMoby() {
  console.log('📚 Parsing Moby Dick...\n');
  
  // Extract text from both files
  const storyText = await parseDocx('book-data/moby_dick_7th_grade.docx');
  const qvText = await parseDocx('book-data/moby_dick_questions_vocab.docx');
  
  // Save raw text for inspection
  fs.writeFileSync('book-data/moby-chapters-raw.txt', storyText);
  fs.writeFileSync('book-data/moby-qv-raw.txt', qvText);
  
  console.log('✅ Moby Dick raw text extracted');
  console.log(`   Story: ${storyText.length} chars`);
  console.log(`   Q&V: ${qvText.length} chars`);
  console.log('   Files: moby-chapters-raw.txt, moby-qv-raw.txt\n');
}

async function main() {
  await parseAnne();
  await parseMoby();
  console.log('🎉 Extraction complete! Review raw text files, then create unit card parsers.\n');
}

main().catch(console.error);
