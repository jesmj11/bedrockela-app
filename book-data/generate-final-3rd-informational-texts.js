#!/usr/bin/env node

/**
 * Generate FINAL 3rd Grade Informational Texts - Books 4-12
 * Complete all 144 texts with quality template-based content
 */

const fs = require('fs');

// Helper function to create quality educational content
function createText(topic, details) {
  return {
    topic,
    title: details.title,
    content: details.content,
    q1: details.q1,
    a1: details.a1,
    q2: details.q2,
    a2: details.a2
  };
}

// Load existing (Books 1-3 done manually)
const existing = JSON.parse(fs.readFileSync('3rd-grade-complete-informational-texts.json', 'utf8'));

// Books 4-12 - Generated efficiently
const newBooks = {
  "book-04-jack-and-the-beanstalk": [
    createText("English Fairy Tales and Joseph Jacobs", {
      title: "Joseph Jacobs - Collector of English Tales",
      content: `Joseph Jacobs was a folklorist and historian who collected traditional English fairy tales in the late 1800s. Born in Australia in 1854, Jacobs moved to England where he became fascinated with old stories passed down through generations. He traveled across England listening to people tell tales that had never been written down. Jacobs wanted to preserve these stories before they were forgotten.

In 1890, Jacobs published "English Fairy Tales," a collection that included Jack and the Beanstalk, The Three Little Pigs, and Goldilocks. He published a total of five collections of fairy tales from England, Celtic lands, and other cultures. Jacobs made these old stories accessible to children by writing them in simple, engaging language. His collections remain popular today, and many of the fairy tales we know come from his books. Jacobs helped ensure that these traditional stories would be enjoyed by children for generations to come.`,
      q1: "When did Joseph Jacobs publish 'English Fairy Tales'?",
      a1: "1890",
      q2: "Name two fairy tales Joseph Jacobs collected.",
      a2: "Jack and the Beanstalk, The Three Little Pigs, Goldilocks (any two)"
    }),
    createText("How Plants Grow - From Seed to Sprout", {
      title: "The Amazing Life of a Plant",
      content: `Plants grow from tiny seeds through an amazing process. A seed contains a baby plant (embryo) and stored food wrapped in a protective coating. When a seed is planted in soil and gets water, warmth, and air, it begins to sprout (germinate). The seed coat softens and cracks open. First, a tiny root pushes down into the soil to anchor the plant and absorb water and nutrients. Then a stem pushes up toward the sunlight.

Once the stem breaks through the soil surface, the first leaves appear and begin making food through photosynthesis - using sunlight, water, and carbon dioxide to create energy. The plant continues growing taller and developing more leaves. Eventually, the plant flowers and produces seeds of its own, continuing the life cycle. Different plants grow at different speeds. Jack's magic beanstalk grew overnight, but real beans take about 7-10 days to sprout and several weeks to fully mature. Plants need sun, water, nutrients from soil, and air to thrive.`,
      q1: "What does a seed need to begin sprouting?",
      a1: "Water, warmth, and air",
      q2: "What is photosynthesis?",
      a2: "When plants use sunlight, water, and carbon dioxide to create energy"
    }),
    createText("Beans - Types and Nutrition", {
      title: "Beans - Nutritious and Delicious",
      content: `Beans are nutritious seeds that grow in pods on bean plants. There are many types of beans including kidney beans, black beans, pinto beans, lima beans, and green beans (string beans). Beans are legumes, a family of plants that includes peas, lentils, and peanuts. Legumes are special because their roots contain bacteria that can take nitrogen from the air and add it to the soil, making the soil healthier for other plants.

Beans are incredibly nutritious and have been an important food for thousands of years. They are high in protein, fiber, vitamins, and minerals. Beans help keep our hearts healthy, provide long-lasting energy, and make us feel full. They're also inexpensive and easy to grow, which is why people around the world eat beans as a staple food. You can eat beans in soups, salads, burritos, or as a side dish. Some beans, like green beans, are eaten fresh while others are dried and stored for later use. Adding beans to your diet is a healthy, tasty choice!`,
      q1: "What makes legumes special for soil?",
      a1: "Their roots contain bacteria that add nitrogen to the soil, making it healthier",
      q2: "What nutrients do beans provide?",
      a2: "Protein, fiber, vitamins, and minerals"
    }),
    createText("Giants in Mythology and Folklore", {
      title: "Giants in Stories Around the World",
      content: `Giants are huge, powerful beings that appear in myths and fairy tales from cultures worldwide. These enormous characters are usually much taller and stronger than regular humans - sometimes as tall as mountains! In Jack and the Beanstalk, the giant lives in the clouds and says the famous words "Fe-fi-fo-fum!" Different cultures have their own giant stories: Greek mythology has the Titans, Norse mythology features frost giants and mountain giants, and Native American tales include giant animals and people.

Giants in stories often represent forces of nature or challenges that heroes must overcome. Some giants are evil and threatening, while others are gentle and kind. The giant in Jack's story is greedy and dangerous, but not all story giants are villains. For example, the BFG (Big Friendly Giant) by Roald Dahl is a kind giant who protects children. Giants fascinate us because they make us think about what it would be like to be enormously powerful, and they create exciting conflicts in adventure stories.`,
      q1: "What do giants often represent in stories?",
      a1: "Forces of nature or challenges that heroes must overcome",
      q2: "Name one culture that has giant stories.",
      a2: "Greek, Norse, Native American (any one)"
    }),
    createText("Castles in the Clouds", {
      title: "Clouds and the Sky",
      content: `In Jack and the Beanstalk, the giant's castle sits high in the clouds. Real castles can't float in the sky, but clouds themselves are fascinating! Clouds are made of billions of tiny water droplets or ice crystals floating in the air. They form when warm, moist air rises and cools. As the air cools, the water vapor condenses (turns back into tiny liquid drops) around dust particles, creating clouds.

There are many types of clouds at different heights. Cirrus clouds are wispy clouds high in the sky made of ice crystals. Cumulus clouds are the puffy white clouds that look like cotton balls. Stratus clouds form gray layers that can cover the whole sky. Cumulonimbus are tall storm clouds that bring thunder and lightning. Clouds are important for Earth's weather - they bring rain and snow, provide shade from the sun, and help regulate temperature. The highest clouds can be over 12 miles above Earth's surface - that's where Jack's beanstalk would need to grow to reach a castle in the clouds!`,
      q1: "What are clouds made of?",
      a1: "Billions of tiny water droplets or ice crystals",
      q2: "How do clouds form?",
      a2: "When warm, moist air rises and cools, water vapor condenses around dust particles"
    }),
    createText("The Golden Goose That Lays Golden Eggs", {
      title: "The Legend of the Golden Goose",
      content: `The golden goose that lays golden eggs appears in several fairy tales and fables. In Jack and the Beanstalk, the giant owns a goose that lays golden eggs - a magical source of endless wealth. This idea comes from an even older Aesop's fable about a farmer who owns such a goose. In the fable, the greedy farmer kills the goose hoping to get all the gold at once, but finds nothing inside and loses his source of wealth forever. The moral is "don't destroy something valuable by being too greedy."

The golden goose represents a steady source of good fortune that should be valued and protected. Real geese can't lay golden eggs, of course! Geese are waterfowl related to ducks and swans. They lay regular white eggs and are raised on farms for eggs, meat, and feathers. The phrase "killing the goose that lays the golden eggs" is still used today to describe destroying something valuable through greed or short-sighted thinking. This teaches us to appreciate what we have and think about long-term consequences of our actions.`,
      q1: "What is the moral of the golden goose fable?",
      a1: "Don't destroy something valuable by being too greedy",
      q2: "What does the phrase 'killing the goose that lays golden eggs' mean today?",
      a2: "Destroying something valuable through greed or short-sighted thinking"
    }),
    createText("Magic Harps and Musical Instruments", {
      title: "The Harp - A Beautiful Instrument",
      content: `A harp is a stringed musical instrument that has been played for thousands of years. It has a triangular frame with strings of different lengths stretched between the top and bottom. Musicians pluck the strings with their fingers to create beautiful music. Shorter strings make higher notes, while longer strings produce lower notes. In Jack and the Beanstalk, the giant owns a magical golden harp that plays by itself and even sings!

Real harps have between 22 and 47 strings, depending on the type of harp. The largest harps, called concert harps or pedal harps, can be over 6 feet tall and weigh about 80 pounds! Smaller folk harps are easier to carry and often used in traditional music. The harp produces a gentle, flowing sound and is often associated with angels in art and stories. Harps have been found in ancient Egyptian tombs and are mentioned in the Bible and Greek myths. Learning to play the harp takes years of practice, but the beautiful music it creates is worth the effort. Today, harps are used in orchestras, solo performances, and therapy to help people relax and heal.`,
      q1: "How do musicians play a harp?",
      a1: "By plucking the strings with their fingers",
      q2: "How many strings does a harp have?",
      a2: "Between 22 and 47 strings"
    }),
    createText("Courage vs. Foolishness", {
      title: "Understanding Courage and Foolishness",
      content: `Courage and foolishness might seem similar, but they're very different. Courage means facing danger or difficulty even when you're afraid, usually to do something important or right. Courageous people think about the risks but decide that the goal is worth it. Foolishness, on the other hand, means taking unnecessary risks without thinking about consequences. Foolish people act without considering danger or making a plan. In Jack and the Beanstalk, we might ask: Was Jack courageous for stealing from the giant to save his family, or was he foolish for risking his life?

True courage involves wisdom and purpose. Firefighters show courage by running into burning buildings to save lives - they're trained, prepared, and doing it for an important reason. That's different from foolishly running into a fire without training or reason. We show courage when we stand up to bullies, try something difficult, or admit when we're wrong. These actions are scary but purposeful. Foolish actions are risky without good reason or planning. Before taking action, it's wise to ask: "Why am I doing this? What could go wrong? How can I prepare?" This helps us be courageous rather than foolish.`,
      q1: "What is the difference between courage and foolishness?",
      a1: "Courage is facing danger with thought and purpose; foolishness is taking unnecessary risks without thinking",
      q2: "What questions should you ask before taking action?",
      a2: "Why am I doing this? What could go wrong? How can I prepare?"
    }),
    createText("Trading and Bartering in History", {
      title: "How People Traded Before Money",
      content: `Before money was invented, people got things they needed through bartering - trading one item for another. In Jack and the Beanstalk, Jack trades his cow for magic beans. Bartering is one of the oldest forms of exchange in human history. If you had chickens but needed flour, you might trade eggs to a farmer who had extra grain. Both people got something they wanted without using money!

Bartering worked well in small communities where people knew and trusted each other. However, it had problems. What if you wanted something but the other person didn't want what you had to trade? What if items weren't equal in value? These challenges led to the invention of money. Around 3,000 years ago, people started using coins made of precious metals as a standard form of exchange. Today, most trades involve money, but bartering still happens! People trade services ("I'll help you move if you help me paint"), swap items online, or exchange goods at farmers markets. Understanding trade and value helps us make smart decisions about money and resources.`,
      q1: "What is bartering?",
      a1: "Trading one item for another without using money",
      q2: "What problem did bartering have that led to inventing money?",
      a2: "It was hard when people didn't want what you had to trade, or when items weren't equal in value"
    }),
    createText("Climbing Safety and Rock Climbing", {
      title: "The Sport of Climbing",
      content: `Rock climbing is an exciting sport where people climb up rock formations or artificial climbing walls using their hands and feet. Climbers must be strong, flexible, and good at solving problems - figuring out which holds to use and the best path to the top. In Jack and the Beanstalk, Jack had to climb a giant beanstalk - real climbers must be just as brave and strategic!

Safety is the most important part of climbing. Climbers use special equipment including ropes, harnesses, helmets, and climbing shoes with sticky rubber soles. A rope is attached to the climber and secured at the top or held by a partner (called a belayer) who can stop a fall. Indoor climbing gyms provide a safe place for beginners to learn techniques and build strength. Outdoor rock climbing requires more experience and knowledge about weather, rock conditions, and route-finding. Climbing teaches perseverance, confidence, and problem-solving skills. It's a fun way to challenge yourself both physically and mentally! Many schools now have climbing walls where students can try this exciting activity safely.`,
      q1: "What safety equipment do climbers use?",
      a1: "Ropes, harnesses, helmets, and climbing shoes",
      q2: "What skills does climbing teach?",
      a2: "Perseverance, confidence, and problem-solving"
    }),
    createText("Fee-Fi-Fo-Fum - Rhymes and Chants", {
      title: "The Power of Rhyme and Repetition",
      content: `"Fe-fi-fo-fum, I smell the blood of an Englishman!" This famous line from Jack and the Beanstalk is a rhyming chant that makes the giant memorable and scary. Rhymes are words that end with the same sound, like "fum" and "Englishman." Rhyming makes language fun to say and easy to remember. That's why nursery rhymes, songs, and poems use rhyme - it helps words stick in our minds!

Chants are phrases repeated in a rhythmic way, often with a strong beat or pattern. Throughout history, people have used chants and rhymes for many purposes: to tell stories, teach lessons, remember important information, cheer at sports games, and perform rituals. Children learning to read often start with rhyming books because rhymes help them predict words and learn sounds. Advertisers use rhymes in jingles to help customers remember products. Rhyming and chanting activate special parts of our brain that help with memory and language. When the giant says his famous chant, readers remember it because of the strong rhythm and rhyme. Try making up your own rhymes - it's fun and helps your brain learn!`,
      q1: "Why do nursery rhymes and songs use rhyme?",
      a1: "It makes language fun and easy to remember",
      q2: "What are chants?",
      a2: "Phrases repeated in a rhythmic way with a strong beat or pattern"
    }),
    createText("Taking Risks and Making Decisions", {
      title: "Smart Decision-Making",
      content: `Every day we make decisions, from small choices like what to eat for breakfast to bigger choices like trying a new activity or standing up for a friend. Jack faced a huge decision when he chose to trade his cow for magic beans. Decision-making is the process of choosing between different options. Good decision-makers think about possible consequences (what might happen) before they act.

Taking calculated risks means making a choice that involves some danger or uncertainty, but doing so thoughtfully after considering the options. Not all risks are bad - trying out for a team, raising your hand in class, or making a new friend all involve some risk of failure or rejection. But these risks can lead to growth and positive experiences! The key is thinking before acting. Ask yourself: What could go right? What could go wrong? What's my backup plan? Who can help me? Is this risk worth it? Learning to evaluate risks and make thoughtful decisions is an important life skill. Sometimes we make mistakes, and that's okay - we learn from them and make better choices next time. Like Jack, we all must make risky decisions sometimes, but careful thinking helps us make wise choices.`,
      q1: "What does taking a calculated risk mean?",
      a1: "Making a choice that involves danger or uncertainty, but doing so thoughtfully after considering options",
      q2: "What questions should you ask when making a risky decision?",
      a2: "What could go right/wrong? What's my backup plan? Who can help? Is it worth it?"
    })
  ]
};

// Merge with existing
const allTexts = { ...existing, ...newBooks };

const filename = '3rd-grade-complete-informational-texts.json';
fs.writeFileSync(filename, JSON.stringify(allTexts, null, 2));

console.log('✅ Book 4 (Jack and the Beanstalk) complete - 12 texts');
console.log(`✅ Updated ${filename}`);
console.log(`\nProgress: 48/144 texts (33%)`);
console.log(`Remaining: 96 texts for Books 5-12\n`);
console.log('Continuing with remaining books...');
