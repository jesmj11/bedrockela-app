#!/usr/bin/env node

/**
 * Integrate Informational Texts into 2nd Grade Unit Cards
 * Parses existing texts and adds content to unit cards
 */

const fs = require('fs');
const path = require('path');

// Parse a single informational text file
function parseInformationalTexts(filename) {
  if (!fs.existsSync(filename)) {
    return [];
  }
  
  const content = fs.readFileSync(filename, 'utf-8');
  const texts = [];
  
  // Split by "Text X:"
  const matches = content.matchAll(/Text (\d+): ([^\n]+)\n([\s\S]*?)(?=Text \d+:|$)/g);
  
  for (const match of matches) {
    const textNum = parseInt(match[1]);
    const title = match[2].trim();
    const body = match[3];
    
    // Extract paragraphs
    const compIndex = body.indexOf('Comprehension Questions');
    const textContent = compIndex > 0 ? body.substring(0, compIndex) : body;
    const paragraphs = textContent.split(/\n\n+/).filter(p => p.trim().length > 50);
    
    // Extract questions
    const questions = [];
    if (compIndex > 0) {
      const questionsText = body.substring(compIndex);
      const qMatches = questionsText.matchAll(/\d+\.\s+(.+?)\n\s*•\s*(.+?)\n\s*•\s*(.+?)\n\s*•\s*(.+?)(?=\n\d+\.|$)/gs);
      
      for (const qMatch of qMatches) {
        questions.push({
          question: qMatch[1].trim(),
          options: [qMatch[2].trim(), qMatch[3].trim(), qMatch[4].trim()],
          correct: 1
        });
      }
    }
    
    texts.push({
      number: textNum,
      title: title,
      content: paragraphs.join('\n\n'),
      questions: questions.slice(0, 2)
    });
  }
  
  return texts;
}

console.log('📚 Integrating Informational Texts into Unit Cards...\n');

// Load all existing informational texts
const q1Texts1 = parseInformationalTexts(path.join(__dirname, '2nd-grade-quarter1-informational-sample.txt'));
const q1Texts2 = parseInformationalTexts(path.join(__dirname, '2nd-grade-quarter1-remainder-11-36.txt'));
const q2Texts = parseInformationalTexts(path.join(__dirname, '2nd-grade-quarter2-informational-sample.txt'));
const q3Texts = parseInformationalTexts(path.join(__dirname, '2nd-grade-quarter3-informational-sample.txt'));

// Combine Q1 texts (remove duplicates from 11-36 file)
const q1Combined = [...q1Texts1, ...q1Texts2.filter(t => t.number > 20)];

console.log(`Loaded informational texts:`);
console.log(`  Quarter 1: ${q1Combined.length} texts`);
console.log(`  Quarter 2: ${q2Texts.length} texts`);
console.log(`  Quarter 3: ${q3Texts.length} texts\n`);

// Map texts to books (6 texts per book = 36 texts per quarter)
function getTextsForBook(bookNum, allTexts) {
  // Each book uses 6 texts
  const startIdx = ((bookNum - 1) % 6) * 6;
  return allTexts.slice(startIdx, startIdx + 6);
}

// Update unit cards
let updated = 0;

for (let bookNum = 1; bookNum <= 24; bookNum++) {
  const bookNumStr = String(bookNum).padStart(2, '0');
  
  // Find unit card
  const files = fs.readdirSync(__dirname).filter(f => 
    f.startsWith(`2nd-grade-book-${bookNumStr}-`) && f.endsWith('-unit-card.json')
  );
  
  if (files.length === 0) continue;
  
  const unitCard = JSON.parse(fs.readFileSync(path.join(__dirname, files[0]), 'utf-8'));
  
  // Determine which texts to use based on quarter
  let texts = [];
  if (bookNum >= 1 && bookNum <= 6) {
    texts = getTextsForBook(bookNum, q1Combined);
  } else if (bookNum >= 7 && bookNum <= 12) {
    texts = getTextsForBook(bookNum, q2Texts);
  } else if (bookNum >= 13 && bookNum <= 18) {
    texts = getTextsForBook(bookNum, q3Texts);
  }
  // Quarter 4 (19-24) will remain empty for now
  
  // Update informational texts in unit card
  let textUpdated = 0;
  for (let i = 0; i < unitCard.informationalTexts.length && i < texts.length; i++) {
    if (texts[i] && texts[i].content) {
      unitCard.informationalTexts[i].title = texts[i].title;
      unitCard.informationalTexts[i].content = texts[i].content;
      
      // Add questions if available
      if (texts[i].questions && texts[i].questions.length > 0) {
        unitCard.informationalTexts[i].questions = texts[i].questions;
      }
      
      textUpdated++;
    }
  }
  
  // Save updated unit card
  if (textUpdated > 0) {
    fs.writeFileSync(path.join(__dirname, files[0]), JSON.stringify(unitCard, null, 2));
    console.log(`✅ Book ${bookNum}: ${unitCard.title} - Updated ${textUpdated} informational texts`);
    updated++;
  }
}

console.log(`\n🎉 Updated ${updated} unit cards with informational text content!`);
console.log(`\n💡 Run the lesson generator again to update HTML files`);
