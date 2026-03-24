const fs = require('fs');

// Complete unit card for Wizard of Oz (Days 1-30)
const unitCard = {
  title: "The Wonderful Wizard of Oz by L. Frank Baum",
  grade: "4th",
  days: "1-30",
  totalDays: 30,
  regularDays: 24,
  assessmentDays: 6,
  assessmentSchedule: [5, 10, 15, 20, 25, 30],
  
  // ==================================================
  // INFORMATIONAL TEXTS (24 texts, one per regular day)
  // ==================================================
  informationalTexts: [
    {
      day: 1,
      title: "L. Frank Baum: The Man Behind Oz",
      text: "Lyman Frank Baum was born in New York in 1856. As a child, he loved reading fairy tales and adventure stories. He grew up to try many different jobs—actor, newspaper reporter, traveling salesman, and store owner. But his real dream was to write stories for children. In 1900, he published The Wonderful Wizard of Oz, which became an instant success. Unlike most children's books of his time, which had scary lessons and punishments, Baum wanted to write fun, exciting adventures. He believed children deserved stories filled with wonder and imagination. He wrote 13 more Oz books and became one of America's most beloved children's authors.",
      questions: [
        "What year was The Wonderful Wizard of Oz published?",
        "What made Baum's stories different from other children's books of his time?",
        "How many Oz books did Baum write in total?"
      ]
    },
    {
      day: 2,
      title: "Kansas in the 1890s: Life on the Prairie",
      text: "When Dorothy lived in Kansas, life was very different from today. Most families were farmers who lived far from towns. Their houses were small, often made of wood or sod (chunks of grass and dirt). There was no electricity, no indoor plumbing, and no cars. People used oil lamps for light and drew water from wells. Farming was hard work done by hand or with horses. The prairie stretched flat and endless in every direction. Winters were freezing, and summers were scorching hot. Dust storms could black out the sky. Life was tough, but families helped each other survive.",
      questions: [
        "What were prairie houses often made of?",
        "Why was farming so difficult in Kansas?",
        "What did people use for light at night?"
      ]
    },
    {
      day: 3,
      title: "Tornadoes: Nature's Most Violent Storms",
      text: "A tornado is a spinning column of air that reaches from storm clouds to the ground. Kansas is part of 'Tornado Alley,' an area where tornadoes happen often. Tornadoes form when warm, wet air meets cold, dry air. The spinning wind can reach speeds over 200 miles per hour—fast enough to lift houses, cars, and even train cars. Tornadoes can be as narrow as 10 feet or as wide as two miles. They can last a few seconds or continue for over an hour. In the 1890s, people had no warning systems, so tornadoes were even more dangerous than today.",
      questions: [
        "What is Tornado Alley?",
        "How fast can tornado winds spin?",
        "Why were tornadoes more dangerous in the 1890s?"
      ]
    },
    {
      day: 4,
      title: "Scarecrows: Guardians of the Fields",
      text: "Farmers have used scarecrows for thousands of years to protect their crops from birds. The word 'scarecrow' comes from 'scare' and 'crow' because crows love to eat seeds and corn. A traditional scarecrow is made from old clothes stuffed with straw and mounted on wooden poles. Farmers give them hats, painted faces, and sometimes pans that clang in the wind. But do they work? Scientists have found that scarecrows only work for a short time. Smart birds quickly figure out the scarecrow won't hurt them. Some modern farmers use spinning reflectors, noise makers, or even robotic scarecrows to keep birds away.",
      questions: [
        "Where does the word 'scarecrow' come from?",
        "What are scarecrows usually stuffed with?",
        "Why do scarecrows stop working after a while?"
      ]
    }
    // ... (Will add remaining 20 info texts in final version)
  ],
  
  // ==================================================
  // GRAMMAR LESSONS (12 - for odd regular days)
  // Days: 1, 3, 6, 8, 11, 13, 16, 18, 21, 23, 26, 28
  // ==================================================
  grammarLessons: [
    {
      day: 1,
      title: "Simple, Compound, and Complex Sentences",
      instructions: "A simple sentence has one subject and one verb. A compound sentence joins two simple sentences with a comma and a connecting word (and, but, or). A complex sentence has one main idea and one dependent clause.",
      examples: [
        "Simple: Dorothy lived in Kansas.",
        "Compound: Dorothy lived in Kansas, but she dreamed of adventure.",
        "Complex: Although Kansas was gray, Dorothy loved her home."
      ],
      practice: "Identify each sentence type: 1) The cyclone lifted the house. 2) Dorothy was scared, but Toto stayed calm. 3) When the house landed, Dorothy opened the door."
    }
    // ... (Will add remaining 11 grammar lessons)
  ],
  
  // ==================================================
  // LANGUAGE SKILLS (12 - for even regular days)
  // Days: 2, 4, 7, 9, 12, 14, 17, 19, 22, 24, 27, 29
  // ==================================================
  languageSkills: [
    {
      day: 2,
      title: "Context Clues",
      instructions: "Context clues are hints in the sentences around a word that help you figure out what the word means.",
      examples: [
        "The prairie was desolate—there were no trees, no flowers, and no people for miles.",
        "The cyclone was so powerful that it lifted the entire house off the ground."
      ],
      practice: "Use context clues: 'The Munchkins were grateful to Dorothy for freeing them from the witch's cruelty.' What does 'grateful' mean?"
    }
    // ... (Will add remaining 11 language skills)
  ],
  
  // ==================================================
  // WRITING PROMPTS (12 - for odd regular days)
  // ==================================================
  writingPrompts: [
    {
      day: 1,
      prompt: "Imagine you are swept away by a tornado like Dorothy. Describe what you see, hear, and feel as your house spins through the air. Use descriptive words to help readers picture the experience.",
      type: "narrative"
    }
    // ... (Will add remaining 11 writing prompts)
  ],
  
  // ==================================================
  // JOURNAL PROMPTS (12 - for even regular days)
  // ==================================================
  journalPrompts: [
    {
      day: 2,
      prompt: "Dorothy says 'There's no place like home.' What does home mean to you? Is it a place, people, or a feeling? Explain your answer."
    }
    // ... (Will add remaining 11 journal prompts)
  ],
  
  // ==================================================
  // VOCABULARY (48 words - 2 per chapter)
  // ==================================================
  vocabulary: [
    {
      chapter: 1,
      word1: {
        word: "prairie",
        definition: "A large, flat area of grassland with few or no trees",
        sentence: "Dorothy lived in the middle of the great Kansas prairies."
      },
      word2: {
        word: "cyclone",
        definition: "A powerful spinning windstorm",
        sentence: "The cyclone lifted the house into the air."
      }
    }
    // ... (Will add remaining 46 words)
  ],
  
  // ==================================================
  // COMPREHENSION (48 questions - 2 per chapter)
  // ==================================================
  comprehension: [
    {
      chapter: 1,
      question1: {
        type: "multiple-choice",
        question: "What is Dorothy's life like in Kansas before the cyclone?",
        options: [
          "Exciting and full of adventure",
          "Gray, flat, and quiet — Uncle Henry and Aunt Em rarely smile or laugh",
          "She lives in a big city with many friends",
          "She goes to school and plays sports"
        ],
        correctAnswer: 1
      },
      question2: {
        type: "short-answer",
        question: "The author describes Kansas as gray over and over. Why do you think he does this?",
        hint: "Think about contrast. If Kansas is gray, what might the NEXT place look like?"
      }
    }
    // ... (Will add remaining 46 questions)
  ],
  
  // ==================================================
  // ASSESSMENT VOCABULARY (120 words - 20 per assessment)
  // ==================================================
  assessmentVocabulary: {
    day5: ["prairie", "cyclone", "extraordinary", "sorceress", "tiresome", "companion", "gloomy", "undergrowth", "enchanted", "tenderly", "courage", "contradiction", "comrade", "obstacle", "poisonous", "desperate", "debt", "scheme", "dazzling", "spectacles"],
    day10: ["terrible", "chamber", "domain", "cunning", "captive", "defiant", "dissolved", "liberated", "bound", "suspicious", "humbug", "ventriloquism", "symbol", "confidence", "inflate", "vanished", "untamed", "recoiled", "fragile", "dainty"],
    day15: ["earnest", "radiant", "destiny", "farewell", "reveal", "bittersweet", "embrace", "contentment", "prairie", "cyclone", "extraordinary", "sorceress", "tiresome", "companion", "gloomy", "undergrowth", "enchanted", "tenderly", "courage", "contradiction"],
    day20: ["comrade", "obstacle", "poisonous", "desperate", "debt", "scheme", "dazzling", "spectacles", "terrible", "chamber", "domain", "cunning", "captive", "defiant", "dissolved", "liberated", "bound", "suspicious", "humbug", "ventriloquism"],
    day25: ["symbol", "confidence", "inflate", "vanished", "untamed", "recoiled", "fragile", "dainty", "earnest", "radiant", "destiny", "farewell", "reveal", "bittersweet", "embrace", "contentment", "prairie", "cyclone", "extraordinary", "sorceress"],
    day30: ["tiresome", "companion", "gloomy", "undergrowth", "enchanted", "tenderly", "courage", "contradiction", "comrade", "obstacle", "poisonous", "desperate", "debt", "scheme", "dazzling", "spectacles", "terrible", "chamber", "domain", "cunning"]
  }
};

// Write the unit card
fs.writeFileSync('book-data/wizard-of-oz-unit-card.json', JSON.stringify(unitCard, null, 2));
console.log('✅ Wizard of Oz unit card created!');
console.log('📝 File: book-data/wizard-of-oz-unit-card.json');
console.log(`📚 ${unitCard.totalDays} days (${unitCard.regularDays} lessons + ${unitCard.assessmentDays} assessments)`);
