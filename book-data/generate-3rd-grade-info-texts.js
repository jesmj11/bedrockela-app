#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Generate educational informational text
function generateInfoText(topic) {
  const topics = {
    "Charles Perrault biography": {
      content: "Charles Perrault was a French author who lived over 300 years ago. He wrote down many fairy tales that had been told out loud for generations. His most famous stories include Cinderella, Sleeping Beauty, and Little Red Riding Hood. Perrault helped preserve these stories so children today can still enjoy them.\n\nPerrault worked for the King of France and was an important member of the French Academy. He published his collection of fairy tales in 1697. These stories have been translated into many languages and adapted into movies, plays, and ballets around the world.",
      questions: [{question: "What did Charles Perrault write?", answer: "fairy tales"}, {question: "When did he publish his collection?", answer: "1697"}]
    },
    "Kindness": {
      content: "Kindness means treating others with care, respect, and compassion. When you show kindness, you make the world a better place for everyone. Simple acts like helping a friend, sharing your lunch, or saying encouraging words can brighten someone's day. Kindness costs nothing but means everything.\n\nScientists have discovered that being kind actually makes you happier! When you help others, your brain releases chemicals that make you feel good. Kindness is contagious - when people see kind acts, they're more likely to be kind too. Practice kindness every day and watch how it spreads.",
      questions: [{question: "What does kindness mean?", answer: "treating others with care and respect"}, {question: "What happens in your brain when you're kind?", answer: "it releases chemicals that make you feel good"}]
    }
  };
  
  if (topics[topic]) return topics[topic];
  
  // Generic educational content for other topics
  return {
    content: `Learning about ${topic} helps us understand the world better. This topic connects to the story we're reading and teaches important concepts. By exploring different subjects, we become better students and more knowledgeable people.\n\nWhen you study ${topic}, think about how it relates to your own life. Ask questions, make connections, and share what you learn with others. Every topic we study helps us grow and discover new interests.`,
    questions: [{question: `Why is ${topic} important?`, answer: "it helps us understand the world"}, {question: "What should you do when studying?", answer: "ask questions and make connections"}]
  };
}

console.log('📚 Generating 3rd Grade Informational Texts...\\n');

const unitCards = fs.readdirSync(__dirname).filter(f => 
  f.startsWith('3rd-grade-') && f.endsWith('-unit-card.json')
);

let updated = 0;

unitCards.forEach(filename => {
  const unitCard = JSON.parse(fs.readFileSync(path.join(__dirname, filename), 'utf-8'));
  
  unitCard.informationalTexts.forEach(infoText => {
    if (!infoText.content || infoText.content === '') {
      const generated = generateInfoText(infoText.topic);
      infoText.content = generated.content;
      infoText.questions = generated.questions;
    }
  });
  
  fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(unitCard, null, 2));
  console.log(`✅ ${unitCard.title} - Added ${unitCard.informationalTexts.length} informational texts`);
  updated++;
});

console.log(`\\n🎉 Updated ${updated} unit cards with informational content!`);
