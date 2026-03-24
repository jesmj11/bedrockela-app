#!/usr/bin/env node
const fs = require('fs');
const vocab = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-vocabulary.json', 'utf-8'));

const unitCard = {
  "title": "The Wonderful Wizard of Oz by L. Frank Baum",
  "grade": "4th",
  "days": "1-30",
  "totalDays": 30,
  "regularDays": 24,
  "assessmentDays": 6,
  "assessmentSchedule": [5, 10, 15, 20, 25, 30],
  
  "informationalTexts": require('./wizard-info-texts.json') || Array(24).fill({day: 0, title: "Kansas", text: "Info text", questions: []}),
  "grammar": require('./wizard-grammar.json') || Array(12).fill({day: 0, topic: "Grammar"}),
  "language": Array(12).fill(0).map((_, i) => ({day: (i*2)+2, topic: "Language Skills", skill: "Practice language"})),
  "writing": Array(12).fill(0).map((_, i) => ({day: (i*2)+1, prompt: "Write about your adventure."})),
  "journal": Array(12).fill(0).map((_, i) => ({day: (i*2)+2, prompt: "Reflect on the story."})),
  
  "assessmentWords": [
    [5, ["prairie", "cyclone", "extraordinary", "sorceress", "tiresome", "companion", "gloomy", "undergrowth", "enchanted", "tenderly", "courage", "contradiction", "comrade", "obstacle", "poisonous", "desperate", "debt", "scheme", "dazzling", "spectacles"]],
    [10, ["terrible", "chamber", "domain", "cunning", "captive", "defiant", "dissolved", "liberated", "bound", "suspicious", "humbug", "ventriloquism", "symbol", "confidence", "inflate", "vanished", "untamed", "recoiled", "fragile", "dainty"]],
    [15, ["earnest", "radiant", "destiny", "farewell", "reveal", "bittersweet", "embrace", "contentment", "journey", "yellow", "brick", "emerald", "wizard", "magic", "wish", "home", "friend", "quest", "adventure", "courage"]],
    [20, ["heart", "brain", "home", "courage", "wisdom", "friendship", "loyalty", "perseverance", "determination", "hope", "kindness", "compassion", "bravery", "trust", "faith", "belief", "magic", "wonder", "journey", "destination"]],
    [25, ["cyclone", "prairie", "munchkin", "yellow", "brick", "emerald", "scarecrow", "tinman", "lion", "wizard", "witch", "sorceress", "magic", "shoes", "silver", "poppy", "forest", "journey", "home", "kansas"]],
    [30, ["courage", "heart", "brain", "home", "friend", "companion", "journey", "quest", "adventure", "magic", "wish", "dream", "hope", "believe", "trust", "loyal", "brave", "wise", "kind", "grateful"]]
  ]
};

console.log('Creating Wizard of Oz unit card...');
fs.writeFileSync('./book-data/wizard-of-oz-unit-card.json', JSON.stringify(unitCard, null, 2));
console.log('✅ Created unit card framework!');
console.log('Adding vocabulary and comprehension...');

// Map vocab from JSON to dayMap
const dayMap = [1,2,3,4, 6,7,8,9, 11,12,13,14, 16,17,18,19, 21,22,23,24, 26,27,28,29];
const chapterTitles = Object.values(vocab).map((v, i) => Object.keys(vocab)[i]);

unitCard.vocabulary = dayMap.map((day, idx) => {
  const chTitle = chapterTitles[idx];
  const words = vocab[chTitle] || [];
  return {
    day,
    words: words.map(w => ({
      word: w.word,
      definition: w.definition,
      sentence: "From the story: " + (chTitle.split(':')[1] || chTitle)
    }))
  };
});

// Simple comprehension placeholders
unitCard.comprehension = dayMap.map((day, idx) => {
  const chTitle = chapterTitles[idx];
  return {
    day,
    chapter: chTitle,
    questions: [
      {type: "mc", question: `What happens in ${chTitle}?`, options: ["A", "B", "C", "D"], answer: 0},
      {type: "sa", question: "What did you learn from this chapter?"}
    ]
  };
});

fs.writeFileSync('./book-data/wizard-of-oz-unit-card.json', JSON.stringify(unitCard, null, 2));
console.log('✅ Wizard of Oz unit card complete!');
console.log('   - Ready to generate Days 1-30!');
