#!/usr/bin/env node

/**
 * Create Simple Simon Unit Card (Book 24)
 */

const fs = require('fs');
const path = require('path');

function parseChapters(content) {
  const chapters = [];
  const chapterSections = content.split(/Chapter \d+:/);
  
  for (let i = 1; i < chapterSections.length; i++) {
    const section = chapterSections[i];
    const chapterNum = i;
    
    const titleMatch = section.match(/^([^\n]+)/);
    const title = titleMatch ? titleMatch[1].trim() : `Chapter ${chapterNum}`;
    
    const storyMatch = section.match(/([\s\S]*?)(?=Chapter \d+ Vocabulary|$)/);
    const story = storyMatch ? storyMatch[1].trim() : '';
    
    const vocabMatch = section.match(/Chapter \d+ Vocabulary\s+([\s\S]*?)(?=Chapter \d+ Comprehension|$)/);
    const vocab = [];
    
    if (vocabMatch) {
      const vocabText = vocabMatch[1];
      const vocabLines = vocabText.match(/\d+\.\s+(\w+)\s+-\s+(.+?)(?=\n|$)/g);
      
      if (vocabLines) {
        vocabLines.forEach(line => {
          const match = line.match(/\d+\.\s+(\w+)\s+-\s+(.+)/);
          if (match) {
            vocab.push({
              word: match[1].trim(),
              definition: match[2].trim(),
              sentence: `From ${title}`
            });
          }
        });
      }
    }
    
    const compMatch = section.match(/Chapter \d+ Comprehension Questions\s+([\s\S]*?)(?=Chapter \d+:|$)/);
    const questions = [];
    
    if (compMatch) {
      const compText = compMatch[1];
      const questionBlocks = compText.split(/\d+\.\s+/).filter(q => q.trim().length > 10);
      
      questionBlocks.forEach(block => {
        const lines = block.split('\n').filter(l => l.trim().length > 0);
        if (lines.length >= 4) {
          const question = lines[0].trim();
          const options = [];
          
          for (let j = 1; j < lines.length; j++) {
            const opt = lines[j].trim().replace(/^[•\-]\s*/, '');
            if (opt.length > 0) {
              options.push(opt);
            }
          }
          
          if (options.length >= 3) {
            questions.push({
              type: 'multiple-choice',
              question: question,
              options: options.slice(0, 3),
              correct: 1
            });
          }
        }
      });
    }
    
    chapters.push({
      number: chapterNum,
      title: title,
      story: story,
      vocab: vocab.slice(0, 2),
      questions: questions.slice(0, 2)
    });
  }
  
  return chapters;
}

// Read file
const filePath = path.join(__dirname, 'simple-simon-complete.txt');
const content = fs.readFileSync(filePath, 'utf-8');
const chapters = parseChapters(content);

// Create unit card
const unitCard = {
  title: 'Simple Simon',
  bookNumber: 24,
  gradeLevel: 2,
  totalDays: 8,
  totalChapters: 6,
  assessmentDays: [7, 8],
  structure: '6 chapters across 6 lessons, 2 assessment day(s)',
  theme: 'learning from mistakes',
  quarter: 4,
  vocabularyLessons: [],
  comprehensionQuestions: [],
  informationalTexts: [],
  grammarLessons: [],
  languageLessons: [],
  writingPrompts: [],
  journalPrompts: [],
  assessmentWords: []
};

chapters.forEach((chapter, idx) => {
  const day = idx + 1;
  
  unitCard.vocabularyLessons.push({
    day: day,
    chapter: chapter.number,
    words: chapter.vocab
  });
  
  unitCard.comprehensionQuestions.push({
    day: day,
    chapter: chapter.number,
    questions: chapter.questions
  });
  
  unitCard.informationalTexts.push({
    day: day,
    topic: chapter.title,
    title: '',
    content: ''
  });
  
  if (day % 2 === 1) {
    const grammarTopics = ['Nouns', 'Verbs', 'Adjectives'];
    unitCard.grammarLessons.push({
      day: day,
      topic: grammarTopics[Math.floor(day / 2) % 3],
      content: ''
    });
    
    unitCard.writingPrompts.push({
      day: day,
      prompt: 'Write about a time like in Simple Simon.'
    });
  }
  
  if (day % 2 === 0) {
    const languageTopics = ['ABC Order', 'Rhyming Words', 'Opposites'];
    unitCard.languageLessons.push({
      day: day,
      topic: languageTopics[Math.floor(day / 2) - 1],
      content: ''
    });
    
    unitCard.journalPrompts.push({
      day: day,
      prompt: 'What do you think will happen next?'
    });
  }
});

unitCard.assessmentWords.push({ week: 1, day: 7, words: [] });
unitCard.assessmentWords.push({ week: 2, day: 8, words: [] });

// Save
const outputPath = path.join(__dirname, '2nd-grade-book-24-simple-simon-unit-card.json');
fs.writeFileSync(outputPath, JSON.stringify(unitCard, null, 2));

console.log('✅ Created 2nd-grade-book-24-simple-simon-unit-card.json');
console.log(`   - ${chapters.length} chapters`);
console.log(`   - ${chapters.reduce((sum, ch) => sum + ch.vocab.length, 0)} vocab words`);
console.log(`   - ${chapters.reduce((sum, ch) => sum + ch.questions.length, 0)} questions`);
