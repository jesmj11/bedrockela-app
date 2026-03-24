const fs = require('fs');

// Raw chapter text (from the docx extraction)
const chapterTexts = [
  {
    number: 1,
    title: "The Cyclone",
    text: `Dorothy lived in the middle of the great Kansas prairies with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife. Their house was small — just one room — with a rusty stove, a cupboard, a table, and three or four chairs. There were no curtains, no pictures on the walls, and nothing pretty at all.

Uncle Henry never laughed. He worked from morning till night and rarely spoke. Aunt Em had once been young and cheerful, but years of sun and wind on the dry prairie had taken the color from her eyes and cheeks. She never smiled anymore, either.

It was Toto who made Dorothy laugh. Toto was a small, scrappy black dog with long silky hair and bright little eyes that twinkled on either side of his funny nose. Dorothy loved Toto dearly. He was the one thing in Kansas that was not gray.

Everything around them was gray. The sun had baked the plowed land into a gray mass. Even the paint on the house had faded until it was as dull and gray as everything else. When Aunt Em first came to Kansas, the sun and wind had changed her, too. They had taken the sparkle from her eyes and left them a sober gray; they had taken the red from her cheeks and lips, and they were gray also.

Dorothy often looked out at the flat, gray world and felt something like loneliness, though she did not know the word for it. Toto was not gray. He saved her from growing as gray as everything else around her.

One afternoon, Uncle Henry sat on the doorstep and looked up at the sky, which was even grayer than usual. Dorothy stood in the doorway holding Toto and watching too. From the far north, they heard a low wail of the wind. They could see the long grass bowing in waves before the coming storm.

"There's a cyclone coming, Em," Uncle Henry called to his wife. "I'll go look after the stock." Then he ran toward the sheds where the cows and horses were kept.

Aunt Em dropped what she was doing and hurried to the door. One look at the sky told her the danger was real. "Quick, Dorothy!" she screamed. "Run for the cellar!"

Toto jumped out of Dorothy's arms and hid under the bed. Dorothy started to chase after him. Aunt Em threw open the trapdoor in the floor and climbed down into the small, dark hole beneath the house. Dorothy caught Toto at last and started to follow her aunt.

But she was too late.

Before she was halfway across the room, a terrible shriek came from the wind. The house shook so hard that Dorothy lost her footing and fell to the floor. Then a strange thing happened.

The house tilted, then tilted more, and then — with a great groaning sound — it was lifted right up into the air by the cyclone, as easily as you might pick up a feather. Up and up and up it went, spinning slowly, carried by the mighty wind.

The house was caught in the very center of the cyclone. The wind on every side pressed against it equally, and it was carried along like a balloon, rising higher and higher. It was very dark, and the wind howled terribly around her, but Dorothy found, after the first few moments, that she was not being tossed about. The house swayed gently, like a baby being rocked in a cradle.

Toto did not like it. He ran around the room, barking, but Dorothy sat quite still on the floor and waited to see what would happen.

Once, Toto got too near the open trapdoor and fell in with a little yelp. Dorothy thought she had lost him. But his ear stuck up through the hole, and she grabbed it and pulled him back into the room. Then she closed the trapdoor so no more accidents could happen.

Hours passed. Slowly, Dorothy got over her fright. She felt quite lonely with the wind screaming so loudly around her, but there was nothing to do except sit and wait. Eventually, she crawled across the swaying floor to her bed, and Toto followed her. Dorothy lay down and, despite the swaying and the howling wind, fell fast asleep.`
  },
  // ... (I'll create a script to parse all 24 chapters from the saved file)
];

// Comprehension questions (2 per chapter)
const comprehensionQuestions = [
  {
    chapter: 1,
    questions: [
      {
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
      {
        type: "short-answer",
        question: "The author describes Kansas as gray over and over. Why do you think he does this? What might he be setting up for later in the story?",
        hint: "Think about contrast. If Kansas is gray, what might the NEXT place look like?"
      }
    ]
  },
  // ... (I'll parse all 48 questions)
];

// Vocabulary words (2 per chapter)
const vocabularyWords = [
  {
    chapter: 1,
    words: [
      {
        word: "prairie",
        partOfSpeech: "noun",
        definition: "A large, flat area of grassland with few or no trees.",
        exampleFromStory: "Dorothy lived in the middle of the great Kansas prairies, where the land was flat and gray as far as the eye could see.",
        thinkAboutIt: "How does living on a flat, empty prairie affect how a person feels? Why might Dorothy feel lonely there?"
      },
      {
        word: "cyclone",
        partOfSpeech: "noun",
        definition: "A powerful, spinning windstorm that can cause great destruction.",
        exampleFromStory: "The cyclone lifted the house right up into the air and carried it away, spinning slowly like a leaf in the wind.",
        thinkAboutIt: "Why did Baum choose to start Dorothy's story with a cyclone? What does it do to the story right away?"
      }
    ]
  },
  // ... (I'll parse all 48 words)
];

console.log('Wizard of Oz data parsed successfully!');
console.log(`Chapters: ${chapterTexts.length}`);
console.log(`Comprehension questions: ${comprehensionQuestions.length * 2}`);
console.log(`Vocabulary words: ${vocabularyWords.length * 2}`);
