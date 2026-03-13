#!/usr/bin/env node
/**
 * CREATE SWISS FAMILY ROBINSON UNIT CARD
 * 
 * Parses the three Swiss Family Robinson source files and creates a complete
 * Library Pocket unit card JSON that can be inserted into any
 * 6th-8th grade lesson structure.
 */

const fs = require('fs');
const path = require('path');

// Input files
const SOURCE_DIR = '/Users/mushu/Desktop/BedrockELA/6th ELA/SwissFamily ';
const STORY_FILE = path.join(SOURCE_DIR, 'swiss-family-complete.txt');
const QUESTIONS_FILE = path.join(SOURCE_DIR, 'swiss-family-questions.txt');
const VOCAB_FILE = path.join(SOURCE_DIR, 'swiss-family-vocab.txt');

// Output file
const OUTPUT_FILE = './book-data/swiss-family-unit-card.json';

console.log('📚 Creating Swiss Family Robinson Unit Card...\n');

// Read all source files
const storyText = fs.readFileSync(STORY_FILE, 'utf-8');
const questionsText = fs.readFileSync(QUESTIONS_FILE, 'utf-8');
const vocabText = fs.readFileSync(VOCAB_FILE, 'utf-8');

// Parse chapters from story text
function parseChapters(text) {
    const chapters = [];
    const chapterMatches = text.matchAll(/CHAPTER (\d+)\n(.+?)\n([\s\S]+?)(?=\nCHAPTER \d+|$)/g);
    
    for (const match of chapterMatches) {
        const number = parseInt(match[1]);
        const title = match[2].trim();
        const content = match[3].trim();
        
        chapters.push({
            number,
            title,
            text: content
        });
    }
    
    return chapters;
}

// Parse vocabulary from vocab text
function parseVocabulary(text) {
    const chapters = [];
    const chapterMatches = text.matchAll(/CHAPTER (\d+)\n.+?\n\n([\s\S]+?)(?=\nCHAPTER \d+|ACTIVITIES|$)/g);
    
    for (const match of chapterMatches) {
        const chapterNum = parseInt(match[1]);
        const content = match[2];
        
        const words = [];
        const wordMatches = content.matchAll(/(\d+)\.\s+([A-Z]+)\s+\(([^)]+)\)\s+—\s+(.+?)\nFrom the text:\s+"(.+?)"\n(.+?)(?=\n\d+\.|$)/gs);
        
        for (const wordMatch of wordMatches) {
            words.push({
                word: wordMatch[2].toLowerCase(),
                partOfSpeech: wordMatch[3],
                definition: wordMatch[4].trim(),
                contextSentence: wordMatch[5].trim(),
                discussionQuestion: wordMatch[6].trim()
            });
        }
        
        chapters.push({
            number: chapterNum,
            vocabulary: words
        });
    }
    
    return chapters;
}

// Parse comprehension questions
function parseQuestions(text) {
    const chapters = [];
    
    // Split by chapter markers more carefully
    const chapterSections = text.split(/(?=CHAPTER \d+)/);
    
    for (const section of chapterSections) {
        if (!section.trim()) continue;
        
        const chapterMatch = section.match(/CHAPTER (\d+)/);
        if (!chapterMatch) continue;
        
        const chapterNum = parseInt(chapterMatch[1]);
        const questions = [];
        
        // Multiple choice questions
        const mcMatches = section.matchAll(/\n(\d+)\.\s+(.+?)\nA\.\s+(.+?)\nB\.\s+(.+?)\nC\.\s+(.+?)\nD\.\s+(.+?)(?=\n\d+\.|SHORT ANSWER|\n\n\nCHAPTER|$)/gs);
        
        for (const mcMatch of mcMatches) {
            questions.push({
                type: 'multipleChoice',
                question: mcMatch[2].trim(),
                choices: [
                    mcMatch[3].trim(),
                    mcMatch[4].trim(),
                    mcMatch[5].trim(),
                    mcMatch[6].trim()
                ],
                correctAnswer: null, // To be filled in manually or with answer key
                explanation: ''
            });
        }
        
        // Short answer questions
        const saMatches = section.matchAll(/SHORT ANSWER:\s+(.+?)(?=\n\n\n|\n\n\nCHAPTER|$)/gs);
        
        for (const saMatch of saMatches) {
            questions.push({
                type: 'shortAnswer',
                question: saMatch[1].trim(),
                sampleAnswer: ''
            });
        }
        
        chapters.push({
            number: chapterNum,
            comprehension: questions
        });
    }
    
    return chapters;
}

// Create summaries for each chapter (first 2 sentences)
function createSummary(text) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    return sentences.slice(0, 2).join(' ').trim();
}

console.log('Parsing story chapters...');
const storyChapters = parseChapters(storyText);
console.log(`✓ Found ${storyChapters.length} chapters`);

console.log('Parsing vocabulary...');
const vocabChapters = parseVocabulary(vocabText);
console.log(`✓ Found vocabulary for ${vocabChapters.length} chapters`);

console.log('Parsing comprehension questions...');
const questionChapters = parseQuestions(questionsText);
console.log(`✓ Found questions for ${questionChapters.length} chapters\n`);

// Combine all data
const unitCard = {
    unitInfo: {
        title: 'The Swiss Family Robinson',
        subtitle: 'A BedrockELA Adaptation',
        originalAuthor: 'Based on the novel by Johann David Wyss (1812)',
        adaptation: 'Adapted for 6th Grade Readers',
        totalChapters: 24,
        gradeLevel: '6th Grade',
        compatibleGrades: ['6th', '7th', '8th'],
        genre: 'Adventure / Survival Fiction',
        themes: ['Survival', 'Family', 'Resourcefulness', 'Exploration', 'Adaptation', 'Perseverance'],
        totalLessons: 24,
        vocabularyWords: 96,
        totalQuestions: 72,
        estimatedWeeks: 5,
        created: new Date().toISOString()
    },
    lessonMapping: {
        daysPerLesson: 1,
        assessmentDays: [5, 10, 15, 20, 24],
        totalDays: 24,
        weeks: 5,
        note: 'This unit card can be inserted into Days 1-24 of any 6th-8th grade pocket'
    },
    bedrockSpineCompatibility: {
        structure: '11-page Bedrock Spine',
        pages: [
            '1. Title Page',
            '2. Welcome & Objectives',
            '3. Vocabulary (3 words for 6th grade)',
            '4. Vocabulary Matching Game',
            '5-7. Story (split into 3 parts)',
            '8. Reading Comprehension (3 questions)',
            '9. Grammar OR Language (alternates)',
            '10. Informational Text + Questions',
            '11. Writing OR Journal (alternates)'
        ],
        notes: 'Each chapter maps to one lesson day'
    },
    chapters: []
};

// Merge all chapter data
for (let i = 0; i < storyChapters.length; i++) {
    const story = storyChapters[i];
    const vocab = vocabChapters.find(v => v.number === story.number);
    const questions = questionChapters.find(q => q.number === story.number);
    
    unitCard.chapters.push({
        number: story.number,
        title: story.title,
        summary: createSummary(story.text),
        text: story.text,
        vocabulary: vocab ? vocab.vocabulary : [],
        comprehension: questions ? questions.comprehension : []
    });
}

// Write output
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(unitCard, null, 2), 'utf-8');

console.log(`✅ Robin Hood Unit Card created!`);
console.log(`📄 Saved to: ${OUTPUT_FILE}`);
console.log(`\n📊 Summary:`);
console.log(`   • ${unitCard.chapters.length} chapters`);
console.log(`   • ${unitCard.chapters.reduce((sum, ch) => sum + ch.vocabulary.length, 0)} vocabulary words`);
console.log(`   • ${unitCard.chapters.reduce((sum, ch) => sum + ch.comprehension.length, 0)} comprehension questions`);
console.log(`   • Compatible with grades 6-8`);
console.log(`\n🎯 Ready to generate lessons with the Bedrock Spine architecture!`);
