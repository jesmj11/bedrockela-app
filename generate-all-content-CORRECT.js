#!/usr/bin/env node

/**
 * MASSIVE CONTENT GENERATOR - CORRECT BOOK SCHEDULES
 * Generates content matched to what students are actually reading each day
 */

const fs = require('fs');
const https = require('https');

const ANTHROPIC_API_KEY = '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';

// COMPLETE BOOK SCHEDULES (what students actually read each day)
const bookSchedules = {
  '3rd': [
    { days: [1, 20], book: 'The Velveteen Rabbit', author: 'Margery Williams', theme: 'toys, love, becoming real' },
    { days: [21, 50], book: "Grimm's Fairy Tales", author: 'Brothers Grimm', theme: 'classic fairy tales, magic, morals' },
    { days: [51, 80], book: 'Hans Christian Andersen Tales', author: 'Hans Christian Andersen', theme: 'transformation, sacrifice, kindness' },
    { days: [81, 120], book: 'Heidi', author: 'Johanna Spyri', theme: 'Swiss Alps, nature, family, healing' },
    { days: [121, 155], book: 'The Story of Dr. Dolittle', author: 'Hugh Lofting', theme: 'animals, communication, adventure' },
    { days: [156, 180], book: 'Robinson Crusoe', author: 'Daniel Defoe', theme: 'survival, island life, resourcefulness' }
  ],
  '4th': [
    { days: [1, 30], book: 'The Wonderful Wizard of Oz', author: 'L. Frank Baum', theme: 'Kansas prairies, tornadoes, journey home' },
    { days: [31, 60], book: 'The Adventures of Tom Sawyer', author: 'Mark Twain', theme: '1840s Missouri, Mississippi River, childhood mischief' },
    { days: [61, 90], book: 'Around the World in 80 Days', author: 'Jules Verne', theme: 'world travel, trains, steamships, adventure' },
    { days: [91, 120], book: 'Black Beauty', author: 'Anna Sewell', theme: 'horses, 19th century England, kindness to animals' },
    { days: [121, 150], book: 'Sherlock Holmes Stories', author: 'Arthur Conan Doyle', theme: 'Victorian London, mystery, deduction' },
    { days: [151, 180], book: 'Alice in Wonderland', author: 'Lewis Carroll', theme: 'logic, wordplay, Victorian nonsense' }
  ],
  '5th': [
    { days: [1, 20], book: 'Robin Hood', author: 'Howard Pyle', theme: 'medieval England, outlaws, archery, Sherwood Forest' },
    { days: [21, 40], book: 'King Arthur', author: 'Various', theme: 'Camelot, knights, chivalry, medieval warfare' },
    { days: [41, 60], book: 'Around the World in 80 Days', author: 'Jules Verne', theme: 'world geography, transportation, 1870s technology' },
    { days: [61, 80], book: 'Frankenstein', author: 'Mary Shelley', theme: 'science, creation, responsibility, gothic horror' },
    { days: [81, 100], book: 'Dracula', author: 'Bram Stoker', theme: 'vampires, Victorian England, Transylvania' },
    { days: [101, 120], book: 'Greek Mythology', author: 'Various', theme: 'ancient Greece, gods, heroes, myths' },
    { days: [121, 140], book: 'Roman Mythology', author: 'Various', theme: 'ancient Rome, gods, founding of Rome' },
    { days: [141, 160], book: 'Norse Mythology', author: 'Various', theme: 'Vikings, Norse gods, Ragnarok' },
    { days: [161, 180], book: 'Year Review', author: 'Various', theme: 'review all books' }
  ],
  '6th': [
    { days: [1, 20], book: 'The Adventures of Tom Sawyer', author: 'Mark Twain', theme: '1840s Missouri, Mississippi River, whitewashing, caves' },
    { days: [21, 40], book: 'Twenty Thousand Leagues Under the Sea', author: 'Jules Verne', theme: 'submarines, ocean exploration, sea creatures' },
    { days: [41, 60], book: 'The Merry Adventures of Robin Hood', author: 'Howard Pyle', theme: 'medieval England, archery, outlaws' },
    { days: [61, 80], book: 'The Swiss Family Robinson', author: 'Johann Wyss', theme: 'shipwreck, island survival, tropical nature' },
    { days: [81, 100], book: 'Journey to the Center of the Earth', author: 'Jules Verne', theme: 'geology, caves, underground exploration' },
    { days: [101, 120], book: 'Norse Mythology', author: 'Various', theme: 'Vikings, Norse gods, Norse culture' },
    { days: [121, 140], book: 'A Connecticut Yankee in King Arthur\'s Court', author: 'Mark Twain', theme: 'time travel, medieval vs modern, satire' },
    { days: [141, 160], book: 'Five Children and It / The Princess and the Goblin', author: 'E. Nesbit / George MacDonald', theme: 'magic, wishes, adventure' },
    { days: [161, 180], book: 'The Odyssey', author: 'Homer', theme: 'ancient Greece, epic journey, Greek heroes' }
  ]
};

function getBookForDay(grade, day) {
  const schedule = bookSchedules[grade];
  for (const book of schedule) {
    if (day >= book.days[0] && day <= book.days[1]) {
      return book;
    }
  }
  return null;
}

async function generateLessonContent(grade, day) {
  const book = getBookForDay(grade, day);
  if (!book) {
    console.log(`    ⚠️  No book found for ${grade} grade day ${day}`);
    return null;
  }
  
  const chapterNum = Math.ceil((day - book.days[0] + 1) / 4);
  const minWords = { '3rd': 15, '4th': 20, '5th': 25, '6th': 30 }[grade];
  
  const prompt = `You are creating educational content for ${grade} grade students reading "${book.book}" by ${book.author}.

Theme: ${book.theme}
This is Day ${day}, approximately Chapter ${chapterNum}.

Generate content as VALID JSON ONLY (no markdown, no extra text):

{
  "informational": {
    "title": "Short article title related to ${book.theme}",
    "part1": "First 100 words of article about ${book.theme}",
    "part2": "Second 100 words continuing the article",
    "questions": [
      "Question 1 about the article",
      "Question 2 about the article", 
      "Question 3 about the article"
    ]
  },
  "opinion": "Opinion prompt about this chapter (1 sentence)",
  "grammar": {
    "skill": "Grammar skill name",
    "explanation": "Brief explanation",
    "example": "Example related to the book"
  },
  "language": "Activity about similes/metaphors/personification from the story (1 sentence)"
}

CRITICAL: Return ONLY the JSON object. No markdown formatting. No extra text.`;

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }]
    });

    const options = {
      hostname: 'api.anthropic.com',
      port: 443,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.error) {
            reject(new Error(response.error.message));
            return;
          }
          
          let content = response.content[0].text.trim();
          // Remove markdown code fences if present
          content = content.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
          
          const result = JSON.parse(content);
          result._book = book.book; // Store for reference
          resolve(result);
        } catch (err) {
          reject(new Error(`Parse error: ${err.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function generateAll() {
  const output = { '3rd': {}, '5th': {}, '6th': {} };
  let totalGenerated = 0;
  const startTime = Date.now();
  
  for (const grade of ['3rd', '5th', '6th']) {
    console.log(`\n📚 Starting ${grade} grade...`);
    
    for (let day = 1; day <= 180; day++) {
      if (day % 5 === 0) continue; // Skip assessments
      
      try {
        const book = getBookForDay(grade, day);
        console.log(`  Day ${day}: ${book.book}...`);
        
        const content = await generateLessonContent(grade, day);
        if (content) {
          output[grade][day] = content;
          totalGenerated++;
          
          if (totalGenerated % 10 === 0) {
            fs.writeFileSync('generated-content.json', JSON.stringify(output, null, 2));
            const elapsed = Math.round((Date.now() - startTime) / 1000 / 60);
            console.log(`    ✓ ${totalGenerated}/432 (${elapsed} min)`);
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 1200)); // 1.2s between calls
        
      } catch (error) {
        console.error(`    ❌ Day ${day}: ${error.message}`);
      }
    }
  }
  
  fs.writeFileSync('generated-content.json', JSON.stringify(output, null, 2));
  const totalTime = Math.round((Date.now() - startTime) / 1000 / 60);
  console.log(`\n🎉 Generated ${totalGenerated}/432 lessons in ${totalTime} min!\n`);
}

generateAll().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
