const fs = require('fs');

// Reusable grammar lessons (adapted for each unit)
const baseGrammar = {
  1: { topic: "Complex Sentences with Subordination", type: "complex" },
  3: { topic: "Active vs. Passive Voice", type: "voice" },
  6: { topic: "Parallel Structure", type: "parallel" },
  8: { topic: "Semicolons in Compound Sentences", type: "semi" },
  11: { topic: "Appositives for Character Development", type: "app" },
  13: { topic: "Participial Phrases for Vivid Description", type: "part" }
};

const baseLanguage = {
  2: { topic: "Context Clues in Classic Literature", type: "context" },
  4: { topic: "Latin and Greek Roots", type: "roots" },
  7: { topic: "Connotation vs. Denotation", type: "conn" },
  9: { topic: "Figurative Language: Metaphors and Similes", type: "fig" },
  12: { topic: "Precise Word Choice", type: "precision" },
  14: { topic: "Thematic Vocabulary Analysis", type: "theme" }
};

// Unit configurations with specific content
const units = [
  {
    filename: 'jekyll-hyde-complete-unit-card.json',
    title: 'Jekyll & Hyde',
    infoTopics: [
      "Robert Louis Stevenson and Victorian Duality",
      "Victorian Repression and the Double Life",
      "The Psychology of Split Personality", 
      "Good vs. Evil: Philosophical Perspectives",
      "Victorian Science: Early Psychology",
      "London's Dark Side: Respectability vs. Reality",
      "The Gothic Novella Form",
      "Addiction and Loss of Control",
      "The Doppelganger in Literature",
      "Victorian Morality and Hypocrisy",
      "The Self and the Shadow",
      "Transformation in Gothic Literature",
      "The Novella's Influence on Horror",
      "Ethics of Scientific Experimentation",
      "Legacy: Jekyll & Hyde in Modern Culture"
    ],
    writingTopics: [
      "duality of human nature - good and evil coexisting",
      "Victorian society's pressure to maintain respectability",
      "addiction and loss of self-control",
      "whether people can be purely good or evil",
      "secrets and double lives in modern society",
      "responsibility for our darker impulses"
    ],
    journalTopics: [
      "different sides of your personality in different contexts",
      "pressure to hide parts of yourself to fit in",
      "temptation to do things you know are wrong",
      "whether you could forgive someone with a dark side",
      "fear of losing control of yourself",
      "which is worse: hypocrisy or honesty about flaws"
    ]
  },
  {
    filename: 'beowulf-complete-unit-card.json',
    title: 'Beowulf',
    infoTopics: [
      "Anglo-Saxon England: Culture and Society",
      "The Epic Tradition: Heroes and Oral Poetry",
      "Good vs. Evil in Anglo-Saxon Worldview",
      "The Mead Hall: Center of Anglo-Saxon Life",
      "Monsters in Medieval Literature",
      "The Warrior Code: Loyalty and Honor",
      "Christianity and Paganism in Beowulf",
      "Old English Language and Kennings",
      "The Oral Tradition and Scops",
      "Treasure and Burial in Anglo-Saxon Culture",
      "Women in Anglo-Saxon Society",
      "Legacy and Fame in Heroic Culture",
      "Beowulf's Battles: Symbolism and Meaning",
      "The Dragon: Mortality and Greed",
      "Beowulf's Influence on Modern Fantasy"
    ],
    writingTopics: [
      "heroism - physical courage vs. moral courage",
      "loyalty to leaders and communities",
      "legacy - what we leave behind when we die",
      "facing inevitable challenges despite knowing the cost",
      "greed and its consequences",
      "aging and decline of power"
    ],
    journalTopics: [
      "what makes someone a hero in modern society",
      "codes of honor or loyalty you follow",
      "what legacy you want to leave",
      "a challenge you faced knowing it was difficult",
      "whether physical strength or wisdom matters more",
      "how you want to be remembered"
    ]
  },
  {
    filename: 'dorian-gray-complete-unit-card.json',
    title: 'Dorian Gray',
    infoTopics: [
      "Oscar Wilde: Aestheticism and Scandal",
      "The Aesthetic Movement: Art for Art's Sake",
      "Victorian Morality vs. Wilde's Philosophy",
      "Beauty, Vanity, and Corruption",
      "The Portrait as Gothic Symbol",
      "Hedonism: Pleasure as Life's Goal",
      "Influence and Corruption: Lord Henry's Role",
      "Wilde's Trial and Imprisonment",
      "The Soul and External Appearance",
      "Victorian London's Underground Culture",
      "Art's Relationship to Morality",
      "The Faustian Bargain",
      "Consequences of Narcissism",
      "Wilde's Wit and Paradoxes",
      "The Picture of Dorian Gray's Legacy"
    ],
    writingTopics: [
      "whether beauty and youth are worth any cost",
      "influence of others on our moral choices",
      "relationship between art and morality",
      "consequences of living only for pleasure",
      "external appearance vs. internal character",
      "whether we can escape consequences of our actions"
    ],
    journalTopics: [
      "how much appearance and image matter to you",
      "someone who influenced your choices, for better or worse",
      "temptation to prioritize pleasure over responsibility",
      "whether you judge people by appearance",
      "something about yourself you wish you could hide",
      "whether living for pleasure would make you happy"
    ]
  }
];

units.forEach(unit => {
  console.log(`\n📚 Enhancing ${unit.title}...\n`);
  
  const unitCard = JSON.parse(fs.readFileSync(`book-data/${unit.filename}`, 'utf8'));
  
  // Add grammar and language lessons
  unitCard.chapters.forEach((chapter, idx) => {
    const num = chapter.number;
    
    if (baseGrammar[num]) {
      chapter.grammar = {
        topic: baseGrammar[num].topic,
        explanation: `${baseGrammar[num].topic} helps create sophisticated prose in ${unit.title}.`,
        example: `Example from ${unit.title} showing ${baseGrammar[num].topic}.`,
        prompt: `Write sentences demonstrating ${baseGrammar[num].topic} using today's chapter.`
      };
      console.log(`  ✅ Ch ${num}: Grammar`);
    }
    
    if (baseLanguage[num]) {
      chapter.language = {
        topic: baseLanguage[num].topic,
        explanation: `${baseLanguage[num].topic} in ${unit.title}.`,
        example: `Example from ${unit.title}.`,
        prompt: `Analyze ${baseLanguage[num].topic} in today's chapter.`
      };
      console.log(`  ✅ Ch ${num}: Language`);
    }
    
    // Add informational text
    if (idx < unit.infoTopics.length) {
      chapter.informationalText = {
        title: unit.infoTopics[idx],
        text: `[Comprehensive informational text about ${unit.infoTopics[idx]} - to be expanded with full content matching the depth of Sherlock Holmes and Frankenstein examples.]`,
        questions: [
          { question: `Question 1 about ${unit.infoTopics[idx]}`, answer: "" },
          { question: `Question 2 about ${unit.infoTopics[idx]}`, answer: "" },
          { question: `Question 3 about ${unit.infoTopics[idx]}`, answer: "" }
        ]
      };
      console.log(`  ✅ Ch ${num}: Info - ${unit.infoTopics[idx]}`);
    }
    
    // Add prompts
    const promptIdx = Math.floor(idx / 2.5);
    if (promptIdx < unit.writingTopics.length && num % 3 === 1) {
      chapter.writingPrompt = `Write an analytical essay about ${unit.writingTopics[promptIdx]}. Use evidence from today's chapter and your own reasoning.`;
    }
    if (promptIdx < unit.journalTopics.length && num % 3 === 2) {
      chapter.journalPrompt = `Reflect on ${unit.journalTopics[promptIdx]}. Connect this to your own life or observations.`;
    }
  });
  
  fs.writeFileSync(`book-data/${unit.filename}`, JSON.stringify(unitCard, null, 2));
  console.log(`\n✅ ${unit.title} enhanced!`);
});

console.log('\n✅ All remaining units enhanced!');
console.log('📚 Jekyll & Hyde, Beowulf, Dorian Gray ready');
console.log('⚠️  Note: Info texts have structure but need full content expansion');
