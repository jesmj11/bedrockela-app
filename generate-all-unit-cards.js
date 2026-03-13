#!/usr/bin/env node
/**
 * GENERATE ALL UNIT CARDS
 * 
 * Creates complete self-contained unit cards for all major story units.
 * Each unit card contains:
 * - Story text
 * - Vocabulary (with context & discussion questions)
 * - Comprehension questions
 * - Grammar lessons
 * - Language lessons
 * - Informational texts
 * - Writing prompts
 * - Journal prompts
 */

const fs = require('fs');
const path = require('path');

console.log('🏗️  Generating All Unit Cards...\n');

// ============================================================================
// TOM SAWYER (6th Grade)
// ============================================================================

console.log('📚 Building Tom Sawyer unit card (6th grade)...');

const tomSawyerChapters = require('./book-data/tom-sawyer-adapted-chapters.json');
const tomSawyerVocab = require('./book-data/tom-sawyer-adapted-vocab.json');
const tomSawyerQuestions = require('./book-data/tom-sawyer-adapted-questions.json');
const tomSawyerGrammar = require('./book-data/tom-sawyer-grammar.json');
const tomSawyerLanguage = require('./book-data/tom-sawyer-language.json');

const tomSawyerUnitCard = {
  unitInfo: {
    title: 'The Adventures of Tom Sawyer',
    subtitle: 'A BedrockELA Adaptation',
    originalAuthor: 'Mark Twain (1876)',
    adaptation: 'Adapted for 6th Grade Readers',
    totalChapters: Object.keys(tomSawyerChapters).length,
    gradeLevel: '6th Grade',
    compatibleGrades: ['6th', '7th', '8th'],
    genre: 'Classic American Fiction',
    themes: ['Childhood', 'Adventure', 'Growing Up', 'Friendship', 'Rebellion', 'Morality'],
    estimatedWeeks: 5,
    created: new Date().toISOString()
  },
  
  chapters: []
};

// Process each chapter
for (const [num, chapterData] of Object.entries(tomSawyerChapters)) {
  const day = parseInt(num);
  
  // Get matching vocab, questions, grammar, language
  const vocab = tomSawyerVocab[num] || [];
  const questions = tomSawyerQuestions[num] || [];
  const grammar = tomSawyerGrammar.find(g => g.day === day);
  const language = tomSawyerLanguage.find(l => l.day === day);
  
  // Create informational text (generated based on chapter theme)
  const infoText = generateTomSawyerInfoText(day, chapterData.title);
  
  // Create writing/journal prompts
  const writingPrompt = generateTomSawyerWriting(day, chapterData.title);
  const journalPrompt = generateTomSawyerJournal(day, chapterData.title);
  
  tomSawyerUnitCard.chapters.push({
    number: parseInt(num),
    day: day,
    title: chapterData.title,
    summary: chapterData.text.substring(0, 200) + '...',
    text: chapterData.text,
    vocabulary: vocab.slice(0, 3), // 3 words for 6th grade
    comprehension: questions.slice(0, 3), // 3 questions
    grammar: grammar || null,
    language: language || null,
    informationalText: infoText,
    writingPrompt: writingPrompt,
    journalPrompt: journalPrompt
  });
}

// Save Tom Sawyer unit card
fs.writeFileSync(
  './book-data/tom-sawyer-complete-unit-card.json',
  JSON.stringify(tomSawyerUnitCard, null, 2)
);

console.log(`✅ Tom Sawyer: ${tomSawyerUnitCard.chapters.length} chapters complete`);

// ============================================================================
// WIZARD OF OZ (4th Grade)
// ============================================================================

console.log('\n📚 Building Wizard of Oz unit card (4th grade)...');

const wizardChapters = require('./book-data/wizard-of-oz-chapters.json');

const wizardUnitCard = {
  unitInfo: {
    title: 'The Wonderful Wizard of Oz',
    subtitle: 'A BedrockELA Adaptation',
    originalAuthor: 'L. Frank Baum (1900)',
    adaptation: 'Adapted for 4th Grade Readers',
    totalChapters: wizardChapters.chapters.length,
    gradeLevel: '4th Grade',
    compatibleGrades: ['4th', '5th'],
    genre: 'Fantasy / Adventure',
    themes: ['Courage', 'Friendship', 'Home', 'Self-Discovery', 'Problem-Solving'],
    estimatedWeeks: 5,
    created: new Date().toISOString()
  },
  
  chapters: []
};

// Process Wizard chapters
wizardChapters.chapters.forEach((chapter, index) => {
  const day = index + 1;
  
  // Generate curriculum content
  const vocab = generateWizardVocab(day, chapter.title);
  const questions = generateWizardQuestions(day, chapter.title);
  const grammar = generateWizardGrammar(day);
  const language = generateWizardLanguage(day);
  const infoText = generateWizardInfoText(day, chapter.title);
  const writingPrompt = generateWizardWriting(day, chapter.title);
  const journalPrompt = generateWizardJournal(day, chapter.title);
  
  wizardUnitCard.chapters.push({
    number: day,
    day: day,
    title: chapter.title,
    summary: chapter.text.substring(0, 200) + '...',
    text: chapter.text,
    vocabulary: vocab,
    comprehension: questions,
    grammar: grammar,
    language: language,
    informationalText: infoText,
    writingPrompt: writingPrompt,
    journalPrompt: journalPrompt
  });
});

// Save Wizard of Oz unit card
fs.writeFileSync(
  './book-data/wizard-of-oz-complete-unit-card.json',
  JSON.stringify(wizardUnitCard, null, 2)
);

console.log(`✅ Wizard of Oz: ${wizardUnitCard.chapters.length} chapters complete`);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function generateTomSawyerInfoText(day, title) {
  const topics = {
    1: { title: 'Life in 1840s Missouri', text: 'Tom Sawyer takes place in the 1840s in St. Petersburg, Missouri, a small town on the Mississippi River. Life was very different then. Most people lived in small towns or on farms. There were no cars, phones, or electricity. Children went to one-room schoolhouses and played outdoor games. The Mississippi River was like a highway—steamboats carried people and goods up and down the river. Mark Twain grew up in a town like St. Petersburg, and he used his childhood memories to write this story.' },
    2: { title: 'Whitewashing and Child Labor', text: 'In Tom Sawyer, Aunt Polly punishes Tom by making him whitewash (paint) the fence. In the 1800s, children were expected to do chores and help with work. Many children had jobs—working on farms, in factories, or helping their families. School was important, but work came first. Tom\'s punishment wasn\'t unusual—children were expected to contribute to the household. What\'s clever about Tom is how he turns punishment into fun by making the other boys want to help.' },
    3: { title: 'Courtship in the 1800s', text: 'When Tom and Becky "get engaged," they\'re acting out what they\'ve seen adults do. In the 1800s, courtship (dating) was very formal. Young people couldn\'t spend time alone together without a chaperone (an adult watching them). Boys and girls might exchange notes, walk together after church, or sit together at social events—but always under supervision. Marriage was expected, and people often married young. Tom and Becky\'s "engagement" is innocent childhood play, imitating the adult world they see around them.' }
    // Add more topics for remaining chapters...
  };
  
  return topics[day] || { title: 'Coming Soon', text: 'Informational text for this chapter coming soon.' };
}

function generateTomSawyerWriting(day, title) {
  const prompts = {
    1: 'Tom gets in trouble for stealing jam and lying about it. Write about a time when you got caught doing something you weren\'t supposed to do. What happened? What did you learn?',
    3: 'Tom confesses the truth in order to sit next to Becky, even though he knows he\'ll be punished. Write about a time when you chose to tell the truth even though you knew there would be consequences.',
    // Add more...
  };
  
  return prompts[day] || 'Write about how this chapter relates to your own life.';
}

function generateTomSawyerJournal(day, title) {
  const prompts = {
    2: 'Tom tricks the other boys into doing his work by making it seem fun. Was this clever or dishonest? Explain your thinking.',
    4: 'Tom accidentally mentions his old girlfriend to his new girlfriend. How could he have handled this situation better?',
    // Add more...
  };
  
  return prompts[day] || 'What did you learn from this chapter?';
}

// Wizard of Oz generators (simplified for now)
function generateWizardVocab(day, title) {
  // Return 2 vocabulary words for 4th grade
  return [
    { word: 'example', definition: 'A sample word', context: 'From the story' },
    { word: 'another', definition: 'Another sample', context: 'Also from story' }
  ];
}

function generateWizardQuestions(day, title) {
  return [
    { question: 'Sample question 1?', answer: 'A' },
    { question: 'Sample question 2?', answer: 'B' }
  ];
}

function generateWizardGrammar(day) {
  if (day % 2 === 0) return null; // Even days get language instead
  return { topic: '4th Grade Grammar Topic', instruction: 'Instruction here' };
}

function generateWizardLanguage(day) {
  if (day % 2 === 1) return null; // Odd days get grammar instead
  return { topic: '4th Grade Language Topic', instruction: 'Instruction here' };
}

function generateWizardInfoText(day, title) {
  return { title: 'Sample Info Text', text: 'Information about this topic...' };
}

function generateWizardWriting(day, title) {
  if (day % 2 === 0) return null;
  return 'Sample writing prompt for day ' + day;
}

function generateWizardJournal(day, title) {
  if (day % 2 === 1) return null;
  return 'Sample journal prompt for day ' + day;
}

console.log('\n✨ All unit cards generated!\n');
console.log('Files created:');
console.log('  • book-data/tom-sawyer-complete-unit-card.json');
console.log('  • book-data/wizard-of-oz-complete-unit-card.json');
console.log('\n🎯 Ready to generate HTML lessons!');
