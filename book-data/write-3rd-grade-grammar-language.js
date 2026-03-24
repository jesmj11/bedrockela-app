#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Generate grammar/language content for 3rd grade
function generateContent(topic, type = 'grammar') {
  const templates = {
    "Nouns": "**Nouns** are words that name people, places, things, or ideas.\n\n**Examples:**\n• People: teacher, doctor, friend\n• Places: school, park, library\n• Things: book, pencil, computer\n• Ideas: happiness, courage, freedom\n\n**Practice:** Find 3 nouns in today's story!",
    
    "Verbs": "**Verbs** are action words that tell what someone or something does.\n\n**Examples:**\n• run, jump, dance, sing\n• think, feel, hope, dream\n• was, were, is, are (linking verbs)\n\n**Practice:** Circle the verbs in these sentences from the story.",
    
    "Adjectives": "**Adjectives** describe nouns. They tell us more details about people, places, or things.\n\n**Examples:**\n• beautiful princess\n• dark forest\n• brave knight\n\n**Practice:** Add adjectives to make these sentences more interesting!",
    
    "ABC Order": "**ABC Order** (alphabetical order) helps us organize words and find them in dictionaries.\n\n**Steps:**\n1. Look at the first letter\n2. If first letters match, look at second letter\n3. Keep going until you find the difference\n\n**Practice:** Put these words from the story in ABC order.",
    
    "Rhyming Words": "**Rhyming words** sound the same at the end.\n\n**Examples:**\n• cat, hat, mat, sat\n• sing, ring, wing, king\n\n**Practice:** Find pairs of rhyming words in today's story!"
  };
  
  return templates[topic] || `**${topic}**\n\nThis lesson teaches about ${topic}. Look for examples in today's story.\n\n**Practice:** Apply what you learned!`;
}

console.log('🎨 Generating 3rd Grade Grammar & Language Content...\\n');

const unitCards = fs.readdirSync(__dirname).filter(f => 
  f.startsWith('3rd-grade-') && f.endsWith('-unit-card.json')
);

let updated = 0;

unitCards.forEach(filename => {
  const unitCard = JSON.parse(fs.readFileSync(path.join(__dirname, filename), 'utf-8'));
  
  // Update grammar lessons
  unitCard.grammarLessons.forEach(lesson => {
    if (!lesson.content || lesson.content === '') {
      lesson.content = generateContent(lesson.topic, 'grammar');
    }
  });
  
  // Update language lessons
  unitCard.languageLessons.forEach(lesson => {
    if (!lesson.content || lesson.content === '') {
      lesson.content = generateContent(lesson.topic, 'language');
    }
  });
  
  fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(unitCard, null, 2));
  console.log(`✅ ${unitCard.title} - Added grammar & language content`);
  updated++;
});

console.log(`\\n🎉 Updated ${updated} unit cards with grammar & language content!`);
