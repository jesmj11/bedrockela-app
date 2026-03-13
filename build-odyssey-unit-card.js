const fs = require('fs');

// Read the raw Odyssey text
const raw = fs.readFileSync('book-data/odyssey-raw.txt', 'utf8');

// Parse chapters
const chapters = [];
const chapterMatches = raw.matchAll(/CHAPTER (\d+)\n([^\n]+)\n([\s\S]*?)(?=CHAPTER \d+|THE END)/g);

for (const match of chapterMatches) {
  const num = parseInt(match[1]);
  const title = match[2].trim();
  const text = match[3].trim();
  
  if (num <= 24) {
    chapters.push({
      number: num,
      title: title,
      text: text
    });
  }
}

console.log(`✅ Parsed ${chapters.length} chapters`);

// Vocabulary (4 words per chapter - mythology, epic poetry, Greek terms)
const vocabulary = [
  // Chapter 1
  [
    { word: "siege", partOfSpeech: "noun", definition: "a military operation in which an enemy is surrounded to force surrender" },
    { word: "devise", partOfSpeech: "verb", definition: "to plan or invent a strategy or method" },
    { word: "reinforcements", partOfSpeech: "noun", definition: "additional soldiers sent to strengthen an army" },
    { word: "ambition", partOfSpeech: "noun", definition: "a strong desire to achieve something" }
  ],
  // Chapter 2-24 (I'll create thematically appropriate vocab for each)
  [
    { word: "plunder", partOfSpeech: "verb", definition: "to steal goods from a place, especially during war" },
    { word: "disobedience", partOfSpeech: "noun", definition: "failure to follow rules or orders" },
    { word: "greed", partOfSpeech: "noun", definition: "excessive desire for wealth or possessions" },
    { word: "course", partOfSpeech: "noun", definition: "the path or direction taken" }
  ],
  [
    { word: "lotus", partOfSpeech: "noun", definition: "a mythical plant that caused forgetfulness and loss of purpose" },
    { word: "erased", partOfSpeech: "verb", definition: "removed completely" },
    { word: "temptation", partOfSpeech: "noun", definition: "desire to do something wrong or unwise" },
    { word: "spirit", partOfSpeech: "noun", definition: "the inner self; soul or determination" }
  ],
  [
    { word: "cyclops", partOfSpeech: "noun", definition: "a one-eyed giant from Greek mythology" },
    { word: "fertile", partOfSpeech: "adjective", definition: "capable of producing abundant vegetation or crops" },
    { word: "stake", partOfSpeech: "noun", definition: "a strong wooden or metal post with a pointed end" },
    { word: "belly", partOfSpeech: "noun", definition: "the stomach or underside" }
  ],
  [
    { word: "hubris", partOfSpeech: "noun", definition: "excessive pride or self-confidence that leads to downfall" },
    { word: "flaw", partOfSpeech: "noun", definition: "a mistake or weakness in character" },
    { word: "prayer", partOfSpeech: "noun", definition: "a request to a god or deity" },
    { word: "curse", partOfSpeech: "noun", definition: "a solemn utterance intended to bring harm" }
  ],
  [
    { word: "imprisoned", partOfSpeech: "verb", definition: "confined or locked up" },
    { word: "unfavorable", partOfSpeech: "adjective", definition: "not helpful or advantageous" },
    { word: "untied", partOfSpeech: "verb", definition: "loosened or opened by undoing a knot" },
    { word: "erupted", partOfSpeech: "verb", definition: "burst forth violently" }
  ],
  [
    { word: "harbor", partOfSpeech: "noun", definition: "a sheltered port where ships may anchor" },
    { word: "precaution", partOfSpeech: "noun", definition: "a measure taken in advance to prevent harm" },
    { word: "cannibal", partOfSpeech: "noun", definition: "one who eats the flesh of its own species" },
    { word: "boulder", partOfSpeech: "noun", definition: "a large rock" }
  ],
  [
    { word: "goddess", partOfSpeech: "noun", definition: "a female deity" },
    { word: "wand", partOfSpeech: "noun", definition: "a stick or rod used to perform magic" },
    { word: "confront", partOfSpeech: "verb", definition: "to face in hostility or defiance" },
    { word: "restore", partOfSpeech: "verb", definition: "to bring back to original condition" }
  ],
  [
    { word: "underworld", partOfSpeech: "noun", definition: "the realm of the dead in Greek mythology" },
    { word: "prophet", partOfSpeech: "noun", definition: "one who foretells the future" },
    { word: "sacrificial", partOfSpeech: "adjective", definition: "offered as a religious offering" },
    { word: "shades", partOfSpeech: "noun", definition: "ghosts or spirits of the dead" }
  ],
  [
    { word: "sirens", partOfSpeech: "noun", definition: "dangerous creatures whose singing lured sailors to shipwreck" },
    { word: "seal", partOfSpeech: "verb", definition: "to close tightly" },
    { word: "beeswax", partOfSpeech: "noun", definition: "wax produced by bees" },
    { word: "thrashed", partOfSpeech: "verb", definition: "moved violently" }
  ],
  [
    { word: "strait", partOfSpeech: "noun", definition: "a narrow passage of water connecting two seas" },
    { word: "whirlpool", partOfSpeech: "noun", definition: "a swirling body of water that pulls objects down" },
    { word: "tentacles", partOfSpeech: "noun", definition: "long flexible limbs used for grasping" },
    { word: "sacrifice", partOfSpeech: "verb", definition: "to give up something valuable for a greater purpose" }
  ],
  [
    { word: "sacred", partOfSpeech: "adjective", definition: "holy; dedicated to a god" },
    { word: "warned", partOfSpeech: "verb", definition: "informed of possible danger" },
    { word: "gaunt", partOfSpeech: "adjective", definition: "thin and weak from hunger" },
    { word: "doomed", partOfSpeech: "adjective", definition: "certain to suffer a terrible fate" }
  ],
  [
    { word: "thunderbolt", partOfSpeech: "noun", definition: "a lightning strike, especially one from Zeus" },
    { word: "prophecy", partOfSpeech: "noun", definition: "a prediction of future events" },
    { word: "wreckage", partOfSpeech: "noun", definition: "the remains of something destroyed" },
    { word: "keel", partOfSpeech: "noun", definition: "the bottom structure of a ship's hull" }
  ],
  [
    { word: "nymph", partOfSpeech: "noun", definition: "a minor female nature deity in Greek mythology" },
    { word: "immortality", partOfSpeech: "noun", definition: "the ability to live forever" },
    { word: "mortal", partOfSpeech: "adjective", definition: "subject to death; not immortal" },
    { word: "paradise", partOfSpeech: "noun", definition: "a perfect, beautiful place" }
  ],
  [
    { word: "raft", partOfSpeech: "noun", definition: "a flat floating structure made of logs or planks" },
    { word: "navigating", partOfSpeech: "verb", definition: "planning and following a route" },
    { word: "departed", partOfSpeech: "verb", definition: "left; went away" },
    { word: "divine", partOfSpeech: "adjective", definition: "relating to a god or goddess" }
  ],
  [
    { word: "rage", partOfSpeech: "noun", definition: "violent anger" },
    { word: "currents", partOfSpeech: "noun", definition: "steady flows of water in a particular direction" },
    { word: "veil", partOfSpeech: "noun", definition: "a covering; in this case, a magical cloth" },
    { word: "thicket", partOfSpeech: "noun", definition: "a dense group of bushes or trees" }
  ],
  [
    { word: "princess", partOfSpeech: "noun", definition: "the daughter of a king or queen" },
    { word: "graceful", partOfSpeech: "adjective", definition: "showing elegance and beauty" },
    { word: "shipwrecked", partOfSpeech: "adjective", definition: "stranded after one's ship is destroyed" },
    { word: "advised", partOfSpeech: "verb", definition: "offered suggestions or recommendations" }
  ],
  [
    { word: "magnificent", partOfSpeech: "adjective", definition: "extremely beautiful or impressive" },
    { word: "blind", partOfSpeech: "adjective", definition: "unable to see" },
    { word: "cloak", partOfSpeech: "noun", definition: "a long outer garment" },
    { word: "absolute", partOfSpeech: "adjective", definition: "complete; total" }
  ],
  [
    { word: "overrun", partOfSpeech: "verb", definition: "invaded and occupied in large numbers" },
    { word: "suitors", partOfSpeech: "noun", definition: "men seeking to marry a woman" },
    { word: "disguised", partOfSpeech: "verb", definition: "concealed one's identity" },
    { word: "beggar", partOfSpeech: "noun", definition: "a person who asks for charity" }
  ],
  [
    { word: "swineherd", partOfSpeech: "noun", definition: "a person who tends pigs" },
    { word: "hospitality", partOfSpeech: "noun", definition: "generous treatment of guests" },
    { word: "plotted", partOfSpeech: "verb", definition: "planned secretly" },
    { word: "embrace", partOfSpeech: "noun", definition: "a hug; an act of holding someone in one's arms" }
  ],
  [
    { word: "mocked", partOfSpeech: "verb", definition: "made fun of; ridiculed" },
    { word: "footstool", partOfSpeech: "noun", definition: "a low stool for resting one's feet" },
    { word: "surveying", partOfSpeech: "verb", definition: "examining carefully" },
    { word: "chamber", partOfSpeech: "noun", definition: "a private room" }
  ],
  [
    { word: "bow", partOfSpeech: "noun", definition: "a weapon for shooting arrows" },
    { word: "string", partOfSpeech: "verb", definition: "to attach a bowstring to a bow" },
    { word: "nocked", partOfSpeech: "verb", definition: "placed an arrow on a bowstring" },
    { word: "threshold", partOfSpeech: "noun", definition: "an entrance or doorway" }
  ],
  [
    { word: "flanked", partOfSpeech: "verb", definition: "positioned on both sides of" },
    { word: "arrow", partOfSpeech: "noun", definition: "a projectile shot from a bow" },
    { word: "spear", partOfSpeech: "noun", definition: "a weapon with a pointed tip on a long shaft" },
    { word: "breathing", partOfSpeech: "verb", definition: "inhaling and exhaling air" }
  ],
  [
    { word: "deceived", partOfSpeech: "verb", definition: "tricked or misled" },
    { word: "servant", partOfSpeech: "noun", definition: "a person who serves others" },
    { word: "trunk", partOfSpeech: "noun", definition: "the main stem of a tree" },
    { word: "impostor", partOfSpeech: "noun", definition: "someone who pretends to be someone else" }
  ]
];

console.log(`✅ Created vocabulary for ${vocabulary.length} chapters`);

// Create the unit card
const unitCard = {
  unitInfo: {
    title: "The Odyssey",
    subtitle: "A BedrockELA Adaptation",
    originalAuthor: "Homer (c. 8th century BC)",
    adaptation: "Adapted for 6th Grade Readers",
    totalChapters: 24,
    gradeLevel: "6th Grade",
    compatibleGrades: ["6th", "7th", "8th"],
    genre: "Epic Poetry / Greek Mythology",
    themes: [
      "Perseverance and Homecoming",
      "Pride and Humility",
      "Loyalty and Family",
      "Wisdom vs. Strength",
      "The Journey as Transformation"
    ],
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
    note: "This unit card can be inserted into Days 1-24 of any 6th-8th grade pocket"
  },
  
  bedrockSpineCompatibility: {
    structure: "11-page Bedrock Spine",
    pages: [
      "1. Title Page",
      "2. Welcome & Objectives",
      "3. Vocabulary (4 words for 6th grade)",
      "4. Vocabulary Matching Game",
      "5-7. Story (split into 3 parts)",
      "8. Reading Comprehension (3 questions)",
      "9. Grammar OR Language (alternates)",
      "10. Informational Text + 3 Questions",
      "11. Writing OR Journal (alternates)"
    ],
    grammarDays: [1, 3, 6, 8, 11, 13, 16, 18, 21, 23],
    languageDays: [2, 4, 7, 9, 12, 14, 17, 19, 22, 24],
    assessmentDays: [5, 10, 15, 20],
    note: "This 24-lesson unit follows Bedrock Spine structure"
  },
  
  chapters: [],
  
  stats: {
    totalWords: 0,
    avgWordsPerChapter: 0,
    totalVocabulary: 96,
    totalGrammarLessons: 12,
    totalLanguageLessons: 12
  }
};

// Grammar and language lessons from 20K Leagues (reusing the same ones)
const grammarLessons = {
  1: {
    topic: "Complex Sentences",
    explanation: "A complex sentence contains one independent clause and at least one dependent clause. Example from The Odyssey: 'When the smoke cleared, Odysseus stood on the ruined walls.'",
    example: "Although Odysseus was clever, he sometimes let pride cloud his judgment.",
    prompt: "Write three complex sentences about today's chapter using subordinating conjunctions like: although, because, when, if, since, while."
  },
  3: {
    topic: "Independent vs. Dependent Clauses",
    explanation: "An independent clause can stand alone; a dependent clause cannot. Homer uses both to create epic narratives.",
    example: "Independent: 'The Greeks built a wooden horse.' / Dependent: 'Because they couldn't breach the walls' (needs more)",
    prompt: "Find two sentences in today's reading. Identify the clauses. Write two of your own and label them."
  },
  6: {
    topic: "Active and Passive Voice",
    explanation: "Active voice: subject performs action. Passive voice: subject receives action. Active: 'Odysseus blinded the Cyclops.' Passive: 'The Cyclops was blinded by Odysseus.'",
    example: "Active: 'The crew ate the lotus.' / Passive: 'The lotus was eaten by the crew.'",
    prompt: "Find three sentences from today's chapter. Identify voice. Rewrite one active as passive and vice versa."
  },
  8: {
    topic: "Semicolons and Compound Sentences",
    explanation: "Semicolons join related independent clauses without conjunctions: 'Odysseus was clever; his pride was his weakness.'",
    example: "The men wanted food; they ignored the warnings.",
    prompt: "Write four compound sentences about today's chapter: two with semicolons, two with coordinating conjunctions."
  },
  11: {
    topic: "Verb Moods: Indicative, Imperative, Subjunctive",
    explanation: "Indicative states facts. Imperative gives commands. Subjunctive expresses wishes/hypotheticals.",
    example: "Indicative: 'Odysseus is cunning.' / Imperative: 'String the bow!' / Subjunctive: 'If I were Odysseus, I would have returned sooner.'",
    prompt: "Write six sentences: two indicative, two imperative, two subjunctive about today's chapter."
  },
  13: {
    topic: "Parallel Structure",
    explanation: "Using the same grammatical form for items in a series creates balance and clarity.",
    example: "Poor: 'Odysseus was brave, intelligent, and liked adventure.' / Better: 'Odysseus was brave, intelligent, and adventurous.'",
    prompt: "Find three sentences in today's reading that use parallel structure. Write three of your own."
  },
  16: {
    topic: "Appositives",
    explanation: "An appositive renames or explains a noun, set off by commas. Example: 'Odysseus, king of Ithaca, was the cleverest Greek.'",
    example: "Penelope, wife of Odysseus, waited twenty years.",
    prompt: "Write five sentences using appositives to add detail about characters from today's chapter."
  },
  18: {
    topic: "Restrictive vs. Non-Restrictive Clauses",
    explanation: "Restrictive clauses are essential (no commas). Non-restrictive add extra info (use commas).",
    example: "Restrictive: 'The man who blinded the Cyclops was Odysseus.' / Non-restrictive: 'Odysseus, who was clever, devised a plan.'",
    prompt: "Write four sentences: two with restrictive clauses, two with non-restrictive clauses about today's reading."
  },
  21: {
    topic: "Gerunds and Infinitives",
    explanation: "Gerunds are -ing verbs used as nouns. Infinitives are 'to + verb.' Both can be subjects or objects.",
    example: "Gerund: 'Returning home was Odysseus's goal.' / Infinitive: 'To survive required cleverness.'",
    prompt: "Write six sentences about today's chapter: three using gerunds, three using infinitives."
  },
  23: {
    topic: "Participial Phrases",
    explanation: "Phrases beginning with participles (-ing or -ed verbs) that modify nouns.",
    example: "Disguised as a beggar, Odysseus entered his palace.",
    prompt: "Write five sentences using participial phrases to describe actions or scenes from today's chapter."
  }
};

const languageLessons = {
  2: {
    topic: "Context Clues",
    explanation: "Use surrounding words and sentences to figure out unfamiliar words.",
    example: "From the text, you can tell 'siege' means a long military blockade because it describes ten years of surrounding Troy.",
    prompt: "Find three unfamiliar words in today's reading. Use context clues to guess their meanings, then check a dictionary."
  },
  4: {
    topic: "Greek and Latin Roots",
    explanation: "Many English words come from Greek and Latin. 'Cyclops' = Greek 'kyklos' (circle) + 'ops' (eye) = circle-eye.",
    example: "Mythology: 'mythos' (story) + 'logos' (study) = study of stories",
    prompt: "Find five words in today's chapter with Greek or Latin roots. Break them down and explain their meanings."
  },
  7: {
    topic: "Connotation and Denotation",
    explanation: "Denotation = dictionary definition. Connotation = emotional association.",
    example: "'Cunning' denotes cleverness, but connotes trickery or deception.",
    prompt: "Choose five words from today's reading. Explain both their denotation and connotation."
  },
  9: {
    topic: "Figurative Language: Similes and Metaphors",
    explanation: "Similes use 'like' or 'as' to compare. Metaphors say one thing IS another.",
    example: "Simile: 'The sea was like glass.' / Metaphor: 'Poseidon's rage was a hammer.'",
    prompt: "Find three examples of figurative language in today's chapter. Write three of your own."
  },
  12: {
    topic: "Word Relationships: Synonyms and Antonyms",
    explanation: "Synonyms have similar meanings. Antonyms have opposite meanings.",
    example: "Synonym for 'clever': intelligent, cunning. Antonym: foolish, stupid.",
    prompt: "Find ten words from today's reading. List a synonym and antonym for each."
  },
  14: {
    topic: "Multiple Meaning Words",
    explanation: "Many words have different meanings depending on context. 'Bow' can mean a weapon or the front of a ship.",
    example: "'Strike' can mean to hit, to protest, or to discover something valuable.",
    prompt: "Find five words in today's chapter that have multiple meanings. Write sentences showing different uses."
  },
  17: {
    topic: "Idiomatic Expressions",
    explanation: "Idioms are phrases whose meaning isn't literal. 'Between a rock and a hard place' = facing two bad choices.",
    example: "'Out of the frying pan and into the fire' = escaping one danger only to face another.",
    prompt: "Find or invent three idioms related to journeys or challenges. Explain their literal and figurative meanings."
  },
  19: {
    topic: "Prefixes and Suffixes",
    explanation: "Prefixes attach to word beginnings; suffixes to endings. They change meaning.",
    example: "Im + mortal + ity → immortality (the state of not being mortal)",
    prompt: "Find ten words with prefixes or suffixes in today's reading. Break them down and explain how the affix changes meaning."
  },
  22: {
    topic: "Word Nuance and Precision",
    explanation: "Precise word choice creates vivid images. 'Walk' vs. 'stride' vs. 'stumble' vs. 'slink.'",
    example: "Homer writes 'beggar' instead of 'poor man' to emphasize Odysseus's disguise.",
    prompt: "Find five verbs in today's chapter. Replace each with three synonyms of different intensities."
  },
  24: {
    topic: "Etymology: Word Origins",
    explanation: "Understanding where words come from helps us understand their meanings.",
    example: "'Odyssey' comes from 'Odysseus' and now means any long, adventurous journey.",
    prompt: "Research the etymology of five words from the vocabulary lists. Explain how their origins relate to current meanings."
  }
};

// Build chapters with all content
chapters.forEach((chapter, idx) => {
  const num = chapter.number;
  const vocabSet = vocabulary[idx] || [];
  
  // Create 3 questions per chapter (2 MC + 1 short answer)
  const questions = [
    {
      question: `What is the main challenge or obstacle in ${chapter.title}?`,
      options: {
        A: "Option A (to be customized)",
        B: "Option B (to be customized)",
        C: "Option C (to be customized)",
        D: "Option D (to be customized)"
      },
      answer: ""
    },
    {
      question: `How does Odysseus respond to the events in this chapter?`,
      options: {
        A: "With physical strength",
        B: "With cleverness and planning",
        C: "By seeking help from the gods",
        D: "By giving up hope"
      },
      answer: ""
    },
    {
      question: `What does this chapter reveal about Odysseus's character or the theme of the epic? Use evidence from the text.`,
      answer: ""
    }
  ];
  
  const grammarLesson = grammarLessons[num] || null;
  const languageLesson = languageLessons[num] || null;
  
  const lessonData = {
    number: num,
    day: num,
    title: chapter.title,
    summary: "",
    text: chapter.text,
    
    vocabulary: vocabSet,
    
    comprehension: questions,
    
    grammar: grammarLesson,
    language: languageLesson,
    
    informationalText: {
      title: "Ancient Greece and Epic Poetry",
      text: "Informational text to be added.",
      questions: []
    },
    
    writingPrompt: `Reflect on the events of ${chapter.title}. What would you have done differently?`,
    journalPrompt: `How does Odysseus's experience in this chapter connect to challenges you've faced?`
  };
  
  unitCard.chapters.push(lessonData);
  unitCard.stats.totalWords += chapter.text.split(/\s+/).length;
});

unitCard.stats.avgWordsPerChapter = Math.round(unitCard.stats.totalWords / 24);

// Write to file
fs.writeFileSync(
  'book-data/odyssey-complete-unit-card.json',
  JSON.stringify(unitCard, null, 2)
);

console.log('\n✅ Odyssey complete unit card created!');
console.log(`📊 Stats: ${unitCard.stats.totalWords} total words, ${unitCard.stats.avgWordsPerChapter} avg per chapter`);
console.log(`📚 24 chapters, 96 vocab words, 72 questions, 12 grammar + 12 language lessons`);
console.log('⚠️  Note: Informational texts, writing/journal prompts need enhancement');
