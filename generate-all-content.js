#!/usr/bin/env node

/**
 * MASSIVE CONTENT GENERATOR
 * Generates ALL customized content for 432 lessons:
 * - 3rd grade: Charlotte's Web (144 lessons)
 * - 5th grade: Robin Hood (144 lessons)  
 * - 6th grade: Tom Sawyer (144 lessons)
 * 
 * For each lesson:
 * - Informational Text (article + 3 questions)
 * - Opinion Writing Prompt
 * - Grammar Workshop
 * - Language Skills Activity
 */

const fs = require('fs');
const https = require('https');

const ANTHROPIC_API_KEY = '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';

// Book data - what we're reading per grade
const bookInfo = {
  '3rd': {
    title: "Charlotte's Web",
    author: 'E.B. White',
    setting: '1950s American farm',
    themes: ['friendship', 'sacrifice', 'life and death', 'farm life', 'writing and language']
  },
  '5th': {
    title: 'The Merry Adventures of Robin Hood',
    author: 'Howard Pyle',
    setting: 'Medieval England, Sherwood Forest',
    themes: ['justice', 'outlaws', 'archery', 'adventure', 'fighting tyranny']
  },
  '6th': {
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    setting: '1840s Missouri, Mississippi River',
    themes: ['childhood adventure', 'freedom', 'friendship', 'small town life', 'mischief']
  }
};

console.log('🤖 MASSIVE CONTENT GENERATOR\n');
console.log('Generating content for 432 lessons across 3 grades...\n');
console.log('This will take 2-4 hours. Grab some coffee! ☕\n');

// Generate content for one lesson using Claude API
async function generateLessonContent(grade, day, chapterNum, chapterTitle) {
  const book = bookInfo[grade];
  
  const prompt = `You are creating educational content for ${grade} grade students reading "${book.title}" by ${book.author}.

This is Day ${day}, Chapter ${chapterNum}: ${chapterTitle}

Generate the following content (return as JSON):

1. INFORMATIONAL TEXT: Write a 200-word non-fiction article related to this chapter's theme or setting. Make it age-appropriate for ${grade} grade. Split it into 2 parts (100 words each).

2. INFORMATIONAL QUESTIONS: Write 3 comprehension questions about your informational text.

3. OPINION WRITING PROMPT: Write a thought-provoking opinion prompt about this chapter that requires students to take a position and defend it.

4. GRAMMAR EXAMPLE: Provide a grammar teaching point with an example FROM this chapter.

5. LANGUAGE SKILLS: Create a figurative language activity (simile/metaphor/personification) using this chapter.

Return ONLY valid JSON in this exact format:
{
  "informational": {
    "title": "Article Title",
    "part1": "First 100 words...",
    "part2": "Second 100 words...",
    "questions": [
      "Question 1?",
      "Question 2?",
      "Question 3?"
    ]
  },
  "opinion": {
    "prompt": "Opinion prompt here..."
  },
  "grammar": {
    "skill": "Grammar skill name",
    "explanation": "Brief explanation",
    "example": "Example from the text"
  },
  "language": {
    "skill": "Similes/Metaphors/etc",
    "activity": "Activity instructions"
  }
}`;

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
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
          const content = response.content[0].text;
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const result = JSON.parse(jsonMatch[0]);
            resolve(result);
          } else {
            reject(new Error('No JSON found in response'));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Main execution
async function generateAll() {
  const output = {
    '3rd': {},
    '5th': {},
    '6th': {}
  };
  
  let totalGenerated = 0;
  const startTime = Date.now();
  
  for (const grade of ['3rd', '5th', '6th']) {
    console.log(`\n📚 Starting ${grade} grade (${bookInfo[grade].title})...`);
    
    for (let day = 1; day <= 180; day++) {
      // Skip assessment days
      if (day % 5 === 0) continue;
      
      const chapterNum = Math.ceil((day - Math.floor(day / 5)) / 4); // Rough chapter number
      
      try {
        console.log(`  Generating Day ${day}...`);
        
        const content = await generateLessonContent(
          grade,
          day,
          chapterNum,
          `Chapter ${chapterNum}`
        );
        
        output[grade][day] = content;
        totalGenerated++;
        
        // Save progress every 10 lessons
        if (totalGenerated % 10 === 0) {
          fs.writeFileSync('generated-content.json', JSON.stringify(output, null, 2));
          const elapsed = Math.round((Date.now() - startTime) / 1000 / 60);
          console.log(`    ✓ Progress: ${totalGenerated}/432 (${elapsed} min elapsed)`);
        }
        
        // Rate limiting - wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`    ❌ Error on Day ${day}:`, error.message);
        // Continue with next day
      }
    }
    
    console.log(`  ✅ ${grade} grade complete!`);
  }
  
  // Final save
  fs.writeFileSync('generated-content.json', JSON.stringify(output, null, 2));
  
  const totalTime = Math.round((Date.now() - startTime) / 1000 / 60);
  console.log(`\n🎉 COMPLETE! Generated ${totalGenerated} lessons in ${totalTime} minutes!`);
  console.log(`\nContent saved to generated-content.json`);
  console.log(`Run the injection script next to update all HTML files.\n`);
}

// Start generation
generateAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
