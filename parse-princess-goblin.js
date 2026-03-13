const mammoth = require('mammoth');
const fs = require('fs');

async function parsePrincessGoblin() {
  console.log('Parsing Princess and the Goblin files...\n');

  // Parse chapters
  const chaptersPath = '/Users/mushu/Desktop/BedrockELA/6th ELA/princess/Princess_Goblin_BedrockELA_18ch.docx';
  const chaptersResult = await mammoth.extractRawText({ path: chaptersPath });
  const chaptersText = chaptersResult.value;
  
  // Parse comprehension questions
  const questionsPath = '/Users/mushu/Desktop/BedrockELA/6th ELA/princess/Princess_Goblin_Comprehension_Questions.docx';
  const questionsResult = await mammoth.extractRawText({ path: questionsPath });
  const questionsText = questionsResult.value;
  
  // Parse vocabulary
  const vocabPath = '/Users/mushu/Desktop/BedrockELA/6th ELA/princess/Princess_Goblin_Vocab_Companion.docx';
  const vocabResult = await mammoth.extractRawText({ path: vocabPath });
  const vocabText = vocabResult.value;

  // Save raw text files
  fs.writeFileSync('book-data/princess-goblin-chapters-raw.txt', chaptersText);
  fs.writeFileSync('book-data/princess-goblin-questions-raw.txt', questionsText);
  fs.writeFileSync('book-data/princess-goblin-vocab-raw.txt', vocabText);

  console.log('✅ Saved raw text files to book-data/');
  console.log('\nChapters preview:');
  console.log(chaptersText.substring(0, 500));
  console.log('\nQuestions preview:');
  console.log(questionsText.substring(0, 500));
  console.log('\nVocab preview:');
  console.log(vocabText.substring(0, 500));
}

parsePrincessGoblin().catch(console.error);
