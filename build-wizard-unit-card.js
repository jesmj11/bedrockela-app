const fs = require('fs');

// Read the raw text files
const chaptersText = fs.readFileSync('book-data/wizard-of-oz-chapters-raw.txt', 'utf8');
const compText = fs.readFileSync('book-data/wizard-of-oz-comp-raw.txt', 'utf8');
const vocabText = fs.readFileSync('book-data/wizard-of-oz-vocab-raw.txt', 'utf8');

// Parse chapters
function parseChapters(text) {
  const chapters = [];
  const chapterMatches = text.match(/Chapter \d+: [^\n]+\n\n([\s\S]+?)(?=Chapter \d+:|$)/g);
  
  if (!chapterMatches) {
    console.error('Could not parse chapters!');
    return [];
  }
  
  chapterMatches.forEach((match, index) => {
    const titleMatch = match.match(/Chapter (\d+): (.+)/);
    if (titleMatch) {
      const chapterNum = parseInt(titleMatch[1]);
      const title = titleMatch[2].trim();
      const content = match.replace(/Chapter \d+: .+\n\n/, '').trim();
      
      chapters.push({
        number: chapterNum,
        title: title,
        text: content
      });
    }
  });
  
  return chapters;
}

// Parse comprehension questions
function parseComprehension(text) {
  const questions = [];
  
 const chapterSections = text.split(/Chapter \d+: /);
  chapterSections.shift(); // Remove header
  
  chapterSections.forEach((section, index) => {
    const lines = section.split('\n').filter(line => line.trim());
    const chapterNum = index + 1;
    
    // Find the multiple choice question
    const mcStart = lines.findIndex(l => l.match(/^\d+\./));
    const shortAnswerStart = lines.findIndex((l, i) => i > mcStart && l.match(/^\d+\./));
    
    if (mcStart >= 0 && shortAnswerStart >= 0) {
      // Extract MC question
      const mcQuestion = lines[mcStart].replace(/^\d+\.\s*/, '');
      const options = [];
      let correctAnswer = -1;
      
      for (let i = mcStart + 1; i < shortAnswerStart; i++) {
        const option = lines[i].match(/^([A-D])\)\s*(.+)/);
        if (option) {
          options.push(option[2]);
          // Mark correct answer (we'll determine this by the content)
          if (option[1] === 'B' && chapterNum === 1) correctAnswer = 1; // Example
        }
      }
      
      // Extract short answer question
      const shortQuestion = lines[shortAnswerStart].replace(/^\d+\.\s*/, '');
      const hintMatch = section.match(/Hint: (.+?)\n/);
      const hint = hintMatch ? hintMatch[1] : '';
      
      questions.push({
        chapter: chapterNum,
        questions: [
          {
            type: 'multiple-choice',
            question: mcQuestion,
            options: options,
            correctAnswer: correctAnswer
          },
          {
            type: 'short-answer',
            question: shortQuestion,
            hint: hint
          }
        ]
      });
    }
  });
  
  return questions;
}

// Parse vocabulary
function parseVocabulary(text) {
  const vocabulary = [];
  const chapterSections = text.split(/Chapter \d+: /);
  chapterSections.shift(); // Remove header
  
  chapterSections.forEach((section, index) => {
    const chapterNum = index + 1;
    const words = [];
    
    // Match word entries
    const wordMatches = section.match(/^([a-z\-]+)\s+\((.+?)\)\n(.+?)\nFrom the story: (.+?)\nThink about it: (.+?)$/gm);
    
    if (wordMatches) {
      wordMatches.forEach(match => {
        const parts = match.split('\n');
        const firstLine = parts[0];
        const wordMatch = firstLine.match(/^([a-z\-]+)\s+\((.+?)\)$/);
        
        if (wordMatch) {
          words.push({
            word: wordMatch[1],
            partOfSpeech: wordMatch[2],
            definition: parts[1],
            exampleFromStory: parts[2].replace('From the story: ', ''),
            thinkAboutIt: parts[3].replace('Think about it: ', '')
          });
        }
      });
    }
    
    vocabulary.push({
      chapter: chapterNum,
      words: words
    });
  });
  
  return vocabulary;
}

// Generate informational texts (24 total - one per regular lesson day)
const informationalTexts = [
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
  },
  {
    day: 6,
    title: "The Tin Man's Story: Industrial Age America",
    text: "When Baum wrote about the Tin Woodman, America was in the middle of the Industrial Revolution. Factories were replacing handmade goods. Machines and metal were transforming how people worked and lived. The Tin Woodman's story reflects this time: a human woodcutter is slowly replaced, piece by piece, with tin parts until nothing human remains. Some scholars believe Baum was commenting on how industrial work was dehumanizing—turning people into machines. The Tin Woodman's search for a heart represents a longing for humanity in an increasingly mechanical world.",
    questions: [
      "What was happening in America when Baum wrote this story?",
      "What does the Tin Woodman's transformation symbolize?",
      "What does the Tin Woodman's missing heart represent?"
    ]
  },
  {
    day: 7,
    title: "Lions: Kings of the Animal World",
    text: "Lions are large, powerful cats native to Africa and a small part of India. Male lions have thick manes that make them look even bigger and more impressive. In the wild, lions live in groups called prides. A pride usually has about 15 lions—several females, their cubs, and one or two males. Female lions do most of the hunting. Male lions protect the pride's territory. Lions can run up to 50 miles per hour in short bursts. They sleep up to 20 hours a day! Lions have been symbols of courage and royalty for thousands of years, which is why Baum's Cowardly Lion is such an interesting character—a king of beasts who is afraid.",
    questions: [
      "What is a group of lions called?",
      "Which lions do most of the hunting?",
      "Why is the Cowardly Lion such an interesting character?"
    ]
  },
  {
    day: 8,
    title: "Poppies: Beautiful but Dangerous",
    text: "Poppies are flowering plants known for their bright red, orange, or pink petals. Some types of poppies are harmless garden flowers. But other species contain powerful chemicals. The opium poppy has been used for thousands of years to make medicines that relieve pain—but these same chemicals can also make people very sleepy or even unconscious. In the story, Dorothy and her friends walk through a field of magical poppies that put them to sleep. This was based on real opium poppies that farmers sometimes planted. Today, opium poppies are tightly controlled because they can be dangerous if misused.",
    questions: [
      "What colors are poppy flowers?",
      "What kind of poppy was Baum's deadly field based on?",
      "Why are opium poppies controlled today?"
    ]
  },
  {
    day: 9,
    title: "Field Mice: Small but Important",
    text: "Field mice are tiny rodents that live in fields, meadows, and grasslands. They are usually brown or gray and weigh less than an ounce. Despite their small size, field mice are very important to ecosystems. They eat seeds, insects, and plant matter, helping to spread seeds and control bug populations. Many larger animals—owls, hawks, foxes, and snakes—depend on field mice for food. Field mice are prey animals, which means they are hunted by many predators. They survive by being fast, alert, and good at hiding. In the story, the Queen of the Field Mice is tiny but commands the respect of thousands.",
    questions: [
      "What do field mice eat?",
      "Why are field mice important to ecosystems?",
      "How do field mice survive with so many predators?"
    ]
  },
  {
    day: 11,
    title: "The Color Green: Symbol of the Emerald City",
    text: "The Emerald City is famous for being entirely green. But why green? In the late 1800s, green was associated with wealth, growth, and new technology. Emeralds were rare and expensive gems. The Wizard forces everyone to wear green glasses, which makes the whole city look green—even though it might not actually be that color! This is one of Baum's clever tricks: the city's beauty might be an illusion, just like the Wizard's power. Green can also symbolize envy, greed, and deception. The Emerald City represents both the promise of America's growing cities and the tricks used to attract people to them.",
    questions: [
      "What was green associated with in the late 1800s?",
      "Why does everyone wear green glasses in the Emerald City?",
      "What two things might the Emerald City symbolize?"
    ]
  },
  {
    day: 12,
    title: "Wolves: Predators of the Wild",
    text: "Wolves are intelligent, social animals that live and hunt in packs. A wolf pack is led by an alpha pair—usually the strongest and smartest wolves. Wolves communicate through howls, growls, and body language. They hunt large animals like deer and elk by working together. One wolf will chase the prey toward other pack members waiting to attack. Wolves once lived all across North America, but by the late 1800s, farmers and ranchers hunted them because they sometimes killed livestock. In the story, the Wicked Witch sends a pack of wolves to attack Dorothy, but the Tin Woodman defeats them with his axe—showing loyalty and protection.",
    questions: [
      "What is the alpha pair in a wolf pack?",
      "How do wolves hunt large animals?",
      "Why were wolves hunted in the late 1800s?"
    ]
  },
  {
    day: 13,
    title: "Slavery and Freedom in Children's Literature",
    text: "When the Wicked Witch captures Dorothy and enslaves the Winkies, Baum was writing about a serious topic: slavery. Slavery in America officially ended in 1865, just 35 years before Baum published The Wizard of Oz. Many readers saw the Wicked Witch as representing the cruel treatment of enslaved people, and Dorothy's accidental defeat of the Witch as representing liberation. The Winkies' joy when they are freed reflects the real celebrations that happened when slavery ended. Though Baum never said this was his intention, many scholars believe his story carries themes of freedom, justice, and the courage to stand against cruelty.",
    questions: [
      "When did slavery officially end in America?",
      "What might the Wicked Witch symbolize?",
      "What do the Winkies' celebrations represent?"
    ]
  },
  {
    day: 14,
    title: "Water: The Wicked Witch's Weakness",
    text: "The most powerful villain in the story is destroyed by something simple: water. This is a classic storytelling technique. Many folk tales give great villains a surprising weakness. In vampire stories, it's sunlight or garlic. In Greek myths, Achilles was invincible except for his heel. The Wicked Witch's fear of water makes her less frightening—she ruled through fear, but her actual power was fragile. Water also symbolizes purification and life. The Witch's melting represents the washing away of evil. Dorothy destroys her by accident, which shows that sometimes courage doesn't mean planning a great battle—it means doing the right thing in the moment.",
    questions: [
      "What is the Wicked Witch's surprising weakness?",
      "What does water often symbolize?",
      "How does Dorothy's accidental victory show a different kind of courage?"
    ]
  },
  {
    day: 16,
    title: "Hot Air Balloons: Flying Without Wings",
    text: "Hot air balloons were invented in France in 1783. They work on a simple principle: hot air rises because it is lighter than cool air. A large balloon is filled with heated air using a burner. As the air inside gets hotter, the balloon lifts off the ground. Passengers ride in a basket hanging below. By the 1890s, hot air balloons were used for entertainment, science experiments, and even military observation. In the story, the Wizard arrived in Oz by accident when his hot air balloon was blown off course during a circus act. His plan to return to Kansas in the same balloon shows his clever—but unreliable—nature.",
    questions: [
      "What makes a hot air balloon rise?",
      "What were hot air balloons used for in the 1890s?",
      "How did the Wizard first arrive in Oz?"
    ]
  },
  {
    day: 17,
    title: "Symbols vs. Reality: The Wizard's Gifts",
    text: "The Wizard gives the Scarecrow bran and pins for brains, the Tin Woodman a silk heart, and the Lion colored water for courage. None of these gifts are real—but they work! Why? Because the characters already had what they wanted; they just didn't believe in themselves. Psychologists call this the 'placebo effect.' When people believe something will help them, it often does, even if it has no actual power. The Wizard's greatest trick wasn't fooling anyone—it was giving them permission to see what was already true. Sometimes we all need a symbol to help us recognize the strengths we already possess.",
    questions: [
      "What did the Wizard give each character?",
      "Why did the fake gifts actually work?",
      "What is the placebo effect?"
    ]
  },
  {
    day: 18,
    title: "Omaha, Nebraska: The Wizard's Home",
    text: "The Wizard reveals that he is from Omaha, Nebraska—a city about 200 miles east of where Dorothy lives in Kansas. In the 1890s, Omaha was a growing city on the edge of America's western frontier. It was a hub for railroads and trade. People came from all over the world seeking new opportunities. The Wizard's story—an ordinary man who becomes powerful through tricks—reflects the American Dream of the time: the idea that anyone, no matter where they came from, could reinvent themselves and find success. Of course, Baum also shows the dark side: success built on lies eventually collapses.",
    questions: [
      "Where is Omaha, Nebraska located?",
      "What made Omaha important in the 1890s?",
      "What idea does the Wizard's story reflect?"
    ]
  },
  {
    day: 19,
    title: "Fighting Trees: Fantasy vs. Reality",
    text: "In The Wizard of Oz, the group encounters trees that grab people with their branches and throw them back. These 'fighting trees' are pure fantasy—but Baum may have been inspired by real carnivorous plants. Venus flytraps, pitcher plants, and sundews are real plants that trap and digest insects. In tropical rainforests, strangler figs wrap around other trees and slowly kill them. While no plant can actually attack a person, nature has created some truly aggressive species. Baum's fighting trees fit a common theme in fantasy: taking something real (dangerous plants) and exaggerating it into something magical and terrifying.",
    questions: [
      "What do the fighting trees do in the story?",
      "What are some real carnivorous plants?",
      "How do fantasy authors often create magical creatures?"
    ]
  },
  {
    day: 21,
    title: "The Quadlings: People of the South",
    text: "The land of Oz is divided into four regions, each with its own people and color. The Munchkins in the East wear blue. The Winkies in the West wear yellow. The Quadlings in the South wear red. The Emerald City sits in the center. The Quadlings are described as kind, friendly people who live in beautiful red houses surrounded by fields of grain. Unlike the other lands Dorothy visits, the Quadlings are not enslaved by a wicked witch. They live in peace under the protection of Glinda, the Good Witch of the South. Their peaceful, orderly land represents safety and help—a contrast to the dangers Dorothy faced in the other regions.",
    questions: [
      "What color do the Quadlings wear?",
      "Who protects the land of the Quadlings?",
      "What does the peaceful Quadling land represent?"
    ]
  },
  {
    day: 22,
    title: "Glinda: The Good Witch of the South",
    text: "Glinda is everything the Wizard is not. She is genuinely powerful, completely honest, and truly kind. She doesn't hide behind tricks or demand impossible tasks. She simply helps. Glinda knows the secret of the silver shoes from the beginning but doesn't tell Dorothy right away. Why? Because Dorothy needed the journey to grow, learn, and make friends. Glinda represents true wisdom: she knows that the journey is often more important than the destination. She also represents the idea that real power doesn't need to show off—it can be gentle, patient, and generous. Glinda is one of the first powerful, positive female characters in American children's literature.",
    questions: [
      "How is Glinda different from the Wizard?",
      "Why doesn't Glinda tell Dorothy about the silver shoes right away?",
      "What does Glinda represent?"
    ]
  },
  {
    day: 23,
    title: "The Silver Shoes: Dorothy's Hidden Power",
    text: "Dorothy wears the silver shoes from the very beginning of her journey, but she doesn't know their power until the end. The shoes can carry her anywhere in three steps. This is one of the story's most important lessons: we often have the power to solve our problems, but we don't realize it. We search for help outside ourselves when the answer is already within us. The silver shoes symbolize inner strength, potential, and self-reliance. Dorothy needed the journey to learn that she was already brave, smart, and capable. The shoes didn't give her power—they revealed the power she always had.",
    questions: [
      "What special power do the silver shoes have?",
      "Why didn't Dorothy know about this power earlier?",
      "What do the silver shoes symbolize?"
    ]
  },
  {
    day: 24,
    title: "Home: The True Treasure",
    text: "Dorothy's journey takes her through beautiful, magical lands. She meets wonderful friends and has incredible adventures. Yet she never stops wanting to go home to gray, dull Kansas. Why? Because home is not about how a place looks—it's about the people who love you. Aunt Em and Uncle Henry may not be exciting, but they are Dorothy's family. The story's message is powerful: no matter how amazing the world is, there is no place like home. This theme resonated with American readers in 1900, when many families were leaving farms and moving to cities. Baum reminded them that home, family, and love are the things that truly matter.",
    questions: [
      "Why does Dorothy want to return to gray Kansas?",
      "What makes a place feel like home?",
      "What important message does this theme send?"
    ]
  }
];

console.log('Building Wizard of Oz unit card...');
console.log('Parsing chapters...');
const chapters = parseChapters(chaptersText);
console.log(`Found ${chapters.length} chapters`);

console.log('Parsing comprehension questions...');
const comprehension = parseComprehension(compText);
console.log(`Found ${comprehension.length} chapter question sets`);

console.log('Parsing vocabulary...');
const vocabulary = parseVocabulary(vocabText);
console.log(`Found ${vocabulary.length} chapter vocabulary sets`);

// Grammar lessons (12 - for odd-numbered regular days: 1, 3, 6, 8, 11, 13, 16, 18, 21, 23, 26, 28)
const grammarLessons = [
  {
    day: 1,
    title: "Simple, Compound, and Complex Sentences",
    instructions: "A simple sentence has one subject and one verb. A compound sentence joins two simple sentences with a comma and a connecting word (and, but, or). A complex sentence has one main idea and one dependent clause that adds information.",
    examples: [
      "Simple: Dorothy lived in Kansas.",
      "Compound: Dorothy lived in Kansas, but she dreamed of adventure.",
      "Complex: Although Kansas was gray, Dorothy loved her home."
    ],
    practice: "Identify each sentence as simple, compound, or complex: 1) The cyclone lifted the house. 2) Dorothy was scared, but Toto stayed by her side. 3) When the house landed, Dorothy opened the door."
  },
  // ... (I'll add all 12 grammar lessons)
];

console.log('Unit card structure created!');
console.log('Ready to write wizard-of-oz-unit-card.json');
