const mammoth = require('mammoth');
const fs = require('fs');

async function parseConnecticutYankee() {
  console.log('Parsing Connecticut Yankee files...\n');

  // Parse chapters
  const chaptersPath = '/Users/mushu/Desktop/BedrockELA/6th ELA/yankee2/Connecticut_Yankee_BedrockELA_18ch.docx';
  const chaptersResult = await mammoth.extractRawText({ path: chaptersPath });
  const chaptersText = chaptersResult.value;
  
  // Parse comprehension questions
  const questionsPath = '/Users/mushu/Desktop/BedrockELA/6th ELA/yankee2/Connecticut_Yankee_Comprehension_Questions.docx';
  const questionsResult = await mammoth.extractRawText({ path: questionsPath });
  const questionsText = questionsResult.value;
  
  // Parse vocabulary
  const vocabPath = '/Users/mushu/Desktop/BedrockELA/6th ELA/yankee2/Connecticut_Yankee_Vocab_Companion.docx';
  const vocabResult = await mammoth.extractRawText({ path: vocabPath });
  const vocabText = vocabResult.value;

  // Save raw text files
  fs.writeFileSync('book-data/connecticut-yankee-chapters-raw.txt', chaptersText);
  fs.writeFileSync('book-data/connecticut-yankee-questions-raw.txt', questionsText);
  fs.writeFileSync('book-data/connecticut-yankee-vocab-raw.txt', vocabText);

  console.log('✅ Saved raw text files to book-data/');
  console.log('\nChapters preview:');
  console.log(chaptersText.substring(0, 500));
  console.log('\nQuestions preview:');
  console.log(questionsText.substring(0, 500));
  console.log('\nVocab preview:');
  console.log(vocabText.substring(0, 500));
}

parseConnecticutYankee().catch(console.error);
