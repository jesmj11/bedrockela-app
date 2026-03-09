#!/usr/bin/env node
/**
 * Generate reading comprehension questions for ALL grades (3rd, 4th, 5th, 6th)
 * These replace the "[Comprehension question about Chapter X]" placeholders
 */

const fs = require('fs');
const https = require('https');

const KEY = fs.readFileSync('generate-all-content-CORRECT.js','utf8').match(/API_KEY = '([^']+)'/)[1];

const bookSchedules = {
  '3rd': [
    { days: [1,20], book: 'The Velveteen Rabbit', author: 'Margery Williams' },
    { days: [21,50], book: "Grimm's Fairy Tales", author: 'Brothers Grimm' },
    { days: [51,80], book: 'Hans Christian Andersen Tales', author: 'Hans Christian Andersen' },
    { days: [81,120], book: 'Heidi', author: 'Johanna Spyri' },
    { days: [121,155], book: 'The Story of Dr. Dolittle', author: 'Hugh Lofting' },
    { days: [156,180], book: 'Robinson Crusoe', author: 'Daniel Defoe' }
  ],
  '4th': [
    { days: [1,30], book: 'The Wonderful Wizard of Oz', author: 'L. Frank Baum' },
    { days: [31,60], book: 'The Adventures of Tom Sawyer', author: 'Mark Twain' },
    { days: [61,90], book: 'Around the World in 80 Days', author: 'Jules Verne' },
    { days: [91,120], book: 'Black Beauty', author: 'Anna Sewell' },
    { days: [121,150], book: 'Sherlock Holmes Stories', author: 'Arthur Conan Doyle' },
    { days: [151,180], book: 'Alice in Wonderland', author: 'Lewis Carroll' }
  ],
  '5th': [
    { days: [1,20], book: 'Robin Hood', author: 'Howard Pyle' },
    { days: [21,40], book: 'King Arthur', author: 'Various' },
    { days: [41,60], book: 'Around the World in 80 Days', author: 'Jules Verne' },
    { days: [61,80], book: 'Frankenstein', author: 'Mary Shelley' },
    { days: [81,100], book: 'Dracula', author: 'Bram Stoker' },
    { days: [101,120], book: 'Greek Mythology', author: 'Various' },
    { days: [121,140], book: 'Roman Mythology', author: 'Various' },
    { days: [141,160], book: 'Norse Mythology', author: 'Various' },
    { days: [161,180], book: 'Year Review', author: 'Various' }
  ],
  '6th': [
    { days: [1,20], book: 'The Adventures of Tom Sawyer', author: 'Mark Twain' },
    { days: [21,40], book: 'Twenty Thousand Leagues Under the Sea', author: 'Jules Verne' },
    { days: [41,60], book: 'The Merry Adventures of Robin Hood', author: 'Howard Pyle' },
    { days: [61,80], book: 'The Swiss Family Robinson', author: 'Johann Wyss' },
    { days: [81,100], book: 'Journey to the Center of the Earth', author: 'Jules Verne' },
    { days: [101,120], book: 'Norse Mythology', author: 'Various' },
    { days: [121,140], book: "A Connecticut Yankee in King Arthur's Court", author: 'Mark Twain' },
    { days: [141,160], book: 'The Princess and the Goblin', author: 'George MacDonald' },
    { days: [161,180], book: 'The Odyssey', author: 'Homer' }
  ]
};

function getBook(grade, day) {
  for (const b of bookSchedules[grade]) if (day >= b.days[0] && day <= b.days[1]) return b;
  return null;
}

function callAPI(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 512,
      temperature: 0.8,
      messages: [{ role: 'user', content: prompt }]
    });
    const req = https.request({
      hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': KEY, 'anthropic-version': '2023-06-01' }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          const p = JSON.parse(body);
          if (p.error) return reject(new Error(p.error.message));
          resolve(p.content[0].text);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function cleanAndParse(text) {
  text = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '');
  let depth = 0, start = -1, end = -1;
  // Find array
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '[') { if (depth === 0) start = i; depth++; }
    if (text[i] === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (start >= 0 && end >= 0) {
    let json = text.substring(start, end + 1).replace(/,\s*([}\]])/g, '$1');
    try { return JSON.parse(json); } catch(e) {}
    try { return Function('return ' + json)(); } catch(e) {}
  }
  // Try object with questions array
  depth = 0; start = -1; end = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') { if (depth === 0) start = i; depth++; }
    if (text[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (start >= 0 && end >= 0) {
    let json = text.substring(start, end + 1).replace(/,\s*([}\]])/g, '$1');
    try { const obj = JSON.parse(json); return obj.questions || Object.values(obj)[0]; } catch(e) {}
    try { const obj = Function('return ' + json)(); return obj.questions || Object.values(obj)[0]; } catch(e) {}
  }
  throw new Error('Could not parse');
}

async function generateQuestions(grade, day) {
  const book = getBook(grade, day);
  if (!book) return null;
  const ch = Math.ceil((day - book.days[0] + 1) / 4);
  const gradeNum = parseInt(grade);
  
  const prompt = `Generate 3 reading comprehension questions for ${grade} grade students reading "${book.book}" by ${book.author}, approximately Chapter ${ch} (Day ${day}).

Questions should:
- Be specific to events/characters/themes in that part of the book
- Require thoughtful answers (not yes/no)
- Be age-appropriate for ${grade} graders
- Progress: Q1 recall, Q2 inference, Q3 analysis/opinion

Return ONLY a JSON array of 3 strings, no explanation:
["question 1", "question 2", "question 3"]`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const resp = await callAPI(prompt);
      const questions = cleanAndParse(resp);
      if (Array.isArray(questions) && questions.length >= 3) return questions.slice(0, 3);
      throw new Error('Not 3 questions');
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise(r => setTimeout(r, 1500));
    }
  }
}

async function main() {
  const outputFile = 'generated-comprehension.json';
  let output;
  try {
    output = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    console.log('📂 Loaded existing comprehension data');
  } catch(e) {
    output = {};
  }

  const missing = [];
  for (const grade of ['3rd', '4th', '5th', '6th']) {
    if (!output[grade]) output[grade] = {};
    for (let day = 1; day <= 180; day++) {
      if (day % 5 === 0) continue;
      if (!output[grade][day]) missing.push({ grade, day });
    }
  }

  console.log(`🔍 ${missing.length} lessons need comprehension questions\n`);
  if (!missing.length) { console.log('✅ All done!'); return; }

  let done = 0, errors = 0;
  const t0 = Date.now();

  for (const { grade, day } of missing) {
    const book = getBook(grade, day);
    try {
      const questions = await generateQuestions(grade, day);
      if (questions) {
        output[grade][day] = questions;
        done++;
        process.stdout.write(`  ✅ ${grade} Day ${day} (${book?.book?.substring(0,25)}) [${done}/${missing.length}]\n`);
        
        if (done % 10 === 0) {
          fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
          const total = Object.values(output).reduce((s, g) => s + Object.keys(g).length, 0);
          const mins = Math.round((Date.now() - t0) / 60000);
          console.log(`    💾 Saved: ${total}/576 total (${mins} min)\n`);
        }
      }
      await new Promise(r => setTimeout(r, 600));
    } catch (e) {
      errors++;
      console.log(`  ❌ ${grade} Day ${day}: ${e.message.substring(0, 60)}`);
      if (e.message.includes('rate') || e.message.includes('429')) {
        console.log('  ⏳ Rate limited, waiting 30s...');
        await new Promise(r => setTimeout(r, 30000));
      }
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  const total = Object.values(output).reduce((s, g) => s + Object.keys(g).length, 0);
  const mins = Math.round((Date.now() - t0) / 60000);
  console.log(`\n🎉 Done! Generated ${done}, errors ${errors}. Total: ${total}/576 in ${mins} min`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
