const fs = require('fs');
const path = require('path');

// Load adapted data
const adaptedChapters = require('./book-data/tom-sawyer-adapted-chapters.json');
const adaptedVocab = require('./book-data/tom-sawyer-adapted-vocab.json');
const adaptedQuestions = require('./book-data/tom-sawyer-adapted-questions.json');
const grammarLessons = require('./book-data/tom-sawyer-grammar.json');
const languageLessons = require('./book-data/tom-sawyer-language.json');

// Informational text topics for each day
const infoTextTopics = {
  1: {
    title: 'Life Along the Mississippi in 1840s Missouri',
    text: `The Adventures of Tom Sawyer is set in the fictional town of St. Petersburg, Missouri, along the Mississippi River in the 1840s. This was a time of great change in America, as the country expanded westward and steamboats transformed river commerce.

Small towns like St. Petersburg were close-knit communities where everyone knew their neighbors. Children had more freedom to roam and play outdoors than they do today. There were no televisions, computers, or video games—kids created their own entertainment through imaginative play, just as Tom does throughout the story.

The Mississippi River was the lifeblood of these communities, providing transportation, trade, and adventure. Boys like Tom dreamed of becoming steamboat pilots, one of the most prestigious and well-paid jobs of the era. The river also represented freedom and possibility, which is why it plays such an important role in the story.

Mark Twain himself grew up in Hannibal, Missouri, a town very similar to the fictional St. Petersburg. Many of the adventures in Tom Sawyer are based on Twain\'s own childhood experiences, making the novel partly autobiographical.`
  },
  2: {
    title: 'The Art of Whitewashing: A Lost Skill',
    text: `In Tom Sawyer, one of the most famous scenes involves Tom turning the chore of whitewashing a fence into an opportunity. But what exactly is whitewashing, and why was it so common in the 1800s?

Whitewashing was a method of painting fences, walls, and buildings using a mixture of lime, water, and sometimes salt. The resulting paint was bright white and helped protect wood from weather and insects. It was inexpensive and easy to make, which is why it was so common in rural America.

However, whitewashing was labor-intensive and had to be reapplied regularly—usually every year or two. A fence "thirty yards long and nine feet high" (as Aunt Polly describes Tom's task) would take hours of work. The paint had to be applied evenly, and any missed spots would be obvious.

Tom\'s brilliant psychological manipulation of his friends reveals his understanding of human nature: people want what seems exclusive or difficult to obtain. By making whitewashing appear to be a privilege rather than a chore, Tom transforms work into play—a lesson that still resonates today.`
  },
  3: {
    title: 'School Life in the 1840s',
    text: `Education in 1840s America was very different from today. In small towns like St. Petersburg, children attended one-room schoolhouses where all grades learned together. A single teacher managed students ranging from first grade through eighth grade.

School was not mandatory, and many children, especially from farming families, attended only when their labor wasn\'t needed at home. The school year was often shorter, with long breaks during planting and harvest seasons.

Discipline was strict. Teachers commonly used corporal punishment, and students who misbehaved might be spanked with a switch or made to sit in the corner wearing a dunce cap. The curriculum focused on the "three Rs"—reading, writing, and arithmetic. Students practiced penmanship by copying passages and learned math through rote memorization.

Despite these harsh conditions, school was also a social hub where children made friends and sometimes got into mischief—just as Tom Sawyer demonstrates throughout the novel. The schoolhouse was often the center of community events, hosting spelling bees, recitals, and other gatherings.`
  },
  4: {
    title: 'Mark Twain: America\'s Storyteller',
    text: `Samuel Langhorne Clemens, better known by his pen name Mark Twain, is one of America\'s most beloved authors. Born in 1835 in Missouri, Twain grew up in Hannibal, a Mississippi River town that became the inspiration for the fictional St. Petersburg in Tom Sawyer.

As a young man, Twain worked as a steamboat pilot on the Mississippi River—his lifelong dream. His pen name "Mark Twain" comes from a riverboat term meaning the water is two fathoms (12 feet) deep, safe for navigation.

When the Civil War disrupted river traffic, Twain traveled west and began writing. His humorous stories and lectures made him famous. The Adventures of Tom Sawyer, published in 1876, was his first novel and became an instant classic.

Twain\'s writing style was revolutionary for its time. He wrote in the authentic voice of American characters, using regional dialects and humor. He captured the spirit of American childhood and frontier life in ways that no author had done before. His later novel, Adventures of Huckleberry Finn, is often called "the Great American Novel."

Twain continued writing until his death in 1910, leaving behind a legacy of stories that still entertain and inspire readers today.`
  }
};

// Copy Day 4 pattern for remaining days
for (let day = 6; day <= 29; day++) {
  if (day === 5 || day === 10 || day === 15 || day === 20 || day === 25 || day === 30) continue;
  
  infoTextTopics[day] = {
    title: `Missouri in the 1840s - Part ${Math.floor(day/4)}`,
    text: `The Adventures of Tom Sawyer provides a window into American life during a pivotal period in the nation's history. Through Tom's adventures, readers learn about the values, challenges, and dreams of people living in small-town America during the mid-19th century.

Mark Twain drew heavily from his own childhood experiences in Hannibal, Missouri, making the novel a valuable historical document as well as entertaining fiction. The customs, language, and social structures depicted in the novel reflect authentic details of the time period.

Understanding this historical context helps readers appreciate both the timeless themes of childhood and adventure, as well as the specific cultural moment Twain captured in his writing.

Life along the Mississippi River shaped the culture of towns like St. Petersburg. The river provided commerce, transportation, and a sense of connection to the wider world. Steamboats were technological marvels of the age, and becoming a pilot was among the most prestigious careers available.`
  };
}

console.log('📚 Generating 6th Grade Bedrock Spine lessons (ADAPTED Tom Sawyer)...\n');

// Generate 24 lessons (skipping assessment days 5, 10, 15, 20, 25, 30)
for (let day = 1; day <= 29; day++) {
  // Skip assessment days
  if (day === 5 || day === 10 || day === 15 || day === 20 || day === 25 || day === 30) {
    console.log(`  ⏭️  Day ${day}: Assessment (skipped)`);
    continue;
  }
  
  generateBedrockSpineLesson(day);
}

console.log('\n✅ Generated 24 complete 6th grade Bedrock Spine lessons with ADAPTED content!');
console.log('📊 Structure: 11 pages per lesson');
console.log('📖 Tom Sawyer: 24 adapted chapters (reading level adjusted)');
console.log('🎯 Ready to deploy!\n');

function generateBedrockSpineLesson(day) {
  const week = Math.ceil(day / 5);
  const dayInWeek = ((day - 1) % 5) + 1;
  
  // Map days to chapters (24 chapters for 24 lessons)
  const chapterNum = day - Math.floor((day-1) / 5);
  
  const chapter = adaptedChapters[chapterNum];
  if (!chapter) {
    console.log(`  ❌ Day ${day}: Chapter ${chapterNum} not found`);
    return;
  }
  
  const vocabWords = adaptedVocab[chapterNum] || [];
  const questions = adaptedQuestions[chapterNum] || {};
  const isOddDay = dayInWeek % 2 === 1;
  const infoText = infoTextTopics[day] || infoTextTopics[1];
  
  // Get grammar or language lesson
  let skillContent = '';
  if (isOddDay && grammarLessons[day]) {
    const grammar = grammarLessons[day];
    skillContent = generateGrammarPage(grammar);
  } else if (!isOddDay && languageLessons[day]) {
    const language = languageLessons[day];
    skillContent = generateLanguagePage(language);
  }
  
  // Split chapter into 3 parts
  const storyParts = splitStoryInto3Parts(chapter.text);
  
  // Generate vocab game
  const vocabGame = generateVocabMatchingGame(vocabWords, day);
  
  // Writing or Journal
  const writingJournalPage = isOddDay ? generateWritingPage(day, chapter.title) : generateJournalPage(day, chapter.title);
  
  const html = generateLessonHTML(day, week, chapterNum, chapter, vocabWords, vocabGame, storyParts, skillContent, infoText, writingJournalPage, isOddDay, questions);
  
  const outputPath = path.join(__dirname, `6th-grade-day-${day}.html`);
  fs.writeFileSync(outputPath, html);
  
  console.log(`  ✅ Day ${day}: Chapter ${chapterNum} - ${chapter.title} (${isOddDay ? 'Grammar' : 'Language'} + ${isOddDay ? 'Writing' : 'Journal'})`);
}

function splitStoryInto3Parts(text) {
  // Split by double newlines first
  let paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  // If no double newlines, try single newlines
  if (paragraphs.length < 3) {
    paragraphs = text.split(/\n+/).filter(p => p.trim().length > 20);
  }
  
  const totalParas = paragraphs.length;
  const parasPerPart = Math.ceil(totalParas / 3);
  
  const parts = [];
  for (let i = 0; i < 3; i++) {
    const start = i * parasPerPart;
    const end = Math.min(start + parasPerPart, totalParas);
    const partParas = paragraphs.slice(start, end);
    const html = partParas.map(p => `<p style="margin-bottom: 15px; line-height: 1.8;">${escapeHtml(p.trim())}</p>`).join('\n');
    parts.push(html);
  }
  
  return parts;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/_([^_]+)_/g, '<em>$1</em>'); // Handle italics
}

function generateVocabMatchingGame(vocabWords, day) {
  if (!vocabWords || vocabWords.length === 0) {
    return '// No vocab game for this day';
  }
  
  const words = vocabWords.map(v => v.word);
  const definitions = vocabWords.map(v => v.definition);
  
  return `
                // Page 4: Vocabulary Matching Game
                {
                    render: () => {
                        const vocabWords = ${JSON.stringify(words)};
                        const definitions = ${JSON.stringify(definitions)};
                        
                        return \`
                            <div class="lesson-page-card content-page">
                                <h2>🎮 Vocabulary Matching Game</h2>
                                <p style="margin-bottom: 20px;">Match each vocabulary word with its correct definition.</p>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 800px; margin: 0 auto;">
                                    <div>
                                        <h3 style="color: #305853; margin-bottom: 15px;">Words</h3>
                                        \${vocabWords.map((word, i) => \`
                                            <div style="padding: 15px; margin-bottom: 10px; background: #f0f7f4; border-radius: 8px; border: 2px solid #305853;">
                                                <strong>\${i + 1}.</strong> \${word}
                                            </div>
                                        \`).join('')}
                                    </div>
                                    
                                    <div>
                                        <h3 style="color: #8B4513; margin-bottom: 15px;">Definitions</h3>
                                        \${definitions.map((def, i) => \`
                                            <div style="padding: 15px; margin-bottom: 10px; background: #fef3e2; border-radius: 8px; border: 2px solid #8B4513;">
                                                <strong>\${['A', 'B', 'C'][i]}.</strong> \${def}
                                            </div>
                                        \`).join('')}
                                    </div>
                                </div>
                                
                                <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #305853;">
                                    <p style="margin-bottom: 10px;"><strong>Your Answers:</strong></p>
                                    <p>1 = <input type="text" style="width: 60px; padding: 8px; border: 2px solid #ccc; border-radius: 4px;" placeholder="A, B, or C" maxlength="1" /></p>
                                    <p>2 = <input type="text" style="width: 60px; padding: 8px; border: 2px solid #ccc; border-radius: 4px;" placeholder="A, B, or C" maxlength="1" /></p>
                                    <p>3 = <input type="text" style="width: 60px; padding: 8px; border: 2px solid #ccc; border-radius: 4px;" placeholder="A, B, or C" maxlength="1" /></p>
                                </div>
                            </div>
                        \`;
                    }
                },`;
}

function generateGrammarPage(grammar) {
  return `
                // Page 9: Grammar Workshop
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📝 Grammar Workshop</h2>
                            <h3 style="color: #8B4513; margin-top: 20px;">${grammar.topic}</h3>
                            
                            <div style="padding: 20px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 12px; margin: 25px 0;">
                                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 15px;">
                                    <strong>What is it?</strong><br>
                                    ${escapeHtml(grammar.explanation)}
                                </p>
                                <p style="font-size: 16px; line-height: 1.8; margin: 0;">
                                    <strong>Example:</strong><br>
                                    <em>"${escapeHtml(grammar.example)}"</em>
                                </p>
                            </div>
                            
                            <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                <p style="font-weight: 600; margin-bottom: 12px; font-size: 18px;">✍️ Your Turn:</p>
                                <p style="margin-bottom: 15px; line-height: 1.6;">${escapeHtml(grammar.prompt)}</p>
                                <textarea 
                                  id="grammar-practice"
                                  style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-size: 16px; line-height: 1.8; font-family: inherit;"
                                  placeholder="Write your practice sentences here..."
                                ></textarea>
                            </div>
                        </div>
                    \`
                },`;
}

function generateLanguagePage(language) {
  return `
                // Page 9: Language Skills
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🗣️ Language Skills</h2>
                            <h3 style="color: #8B4513; margin-top: 20px;">${language.topic}</h3>
                            
                            <div style="padding: 20px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 12px; margin: 25px 0;">
                                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 15px;">
                                    <strong>Learn:</strong><br>
                                    ${escapeHtml(language.explanation)}
                                </p>
                                <p style="font-size: 16px; line-height: 1.8; margin: 0;">
                                    <strong>Example:</strong><br>
                                    <em>"${escapeHtml(language.example)}"</em>
                                </p>
                            </div>
                            
                            <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                <p style="font-weight: 600; margin-bottom: 12px; font-size: 18px;">✍️ Your Turn:</p>
                                <p style="margin-bottom: 15px; line-height: 1.6;">${escapeHtml(language.prompt)}</p>
                                <textarea 
                                  id="language-practice"
                                  style="width: 100%; min-height: 200px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-size: 16px; line-height: 1.8; font-family: inherit;"
                                  placeholder="Write your practice here..."
                                ></textarea>
                            </div>
                        </div>
                    \`
                },`;
}

function generateWritingPage(day, chapterTitle) {
  const writingPrompts = [
    'Write a paragraph describing a time when you had to do a chore you didn\'t want to do. How did you handle it? What did you learn?',
    'Imagine you are Tom Sawyer. Write a diary entry about the events in today\'s chapter from Tom\'s perspective.',
    'Write a descriptive paragraph about your neighborhood or town, using sensory details like Mark Twain does.',
    'Write a persuasive paragraph explaining whether you think Tom\'s behavior in this chapter was clever or wrong.',
    'Create a different ending for today\'s chapter. What else could have happened?',
    'Write a character analysis of one person from today\'s chapter. What are their personality traits? What motivates them?',
  ];
  
  const prompt = writingPrompts[(day - 1) % writingPrompts.length];
  
  return `
                // Page 11: Writing Practice
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>✏️ Writing Practice</h2>
                            <div style="padding: 20px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 12px; margin: 20px 0;">
                                <p style="font-size: 16px; line-height: 1.8;">
                                    <strong>Prompt:</strong><br>
                                    ${escapeHtml(prompt)}
                                </p>
                            </div>
                            
                            <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                <textarea 
                                  id="writing"
                                  style="width: 100%; min-height: 300px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-size: 16px; line-height: 1.8; font-family: inherit;"
                                  placeholder="Write your response here. Aim for at least 8-10 sentences."
                                ></textarea>
                                <p style="margin-top: 10px; color: #666; font-size: 14px;">
                                    💡 <strong>Tips:</strong> Start with a topic sentence, include specific details, and end with a conclusion.
                                </p>
                            </div>
                        </div>
                    \`
                }`;
}

function generateJournalPage(day, chapterTitle) {
  const journalPrompts = [
    'What was the most interesting or surprising thing that happened in today\'s chapter? Why?',
    'Which character do you relate to most in this chapter? Explain why.',
    'If you could give Tom advice about his situation in this chapter, what would you tell him?',
    'What questions do you have about the story so far? What do you predict will happen next?',
    'How would today\'s chapter be different if it took place in modern times?',
    'What emotion did you feel most while reading today\'s chapter? Describe why the story made you feel that way.',
  ];
  
  const prompt = journalPrompts[(day - 1) % journalPrompts.length];
  
  return `
                // Page 11: Journal Response
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📔 Journal Response</h2>
                            <div style="padding: 20px; background: linear-gradient(135deg, rgba(48,88,83,0.1), rgba(176,104,33,0.1)); border-radius: 12px; margin: 20px 0;">
                                <p style="font-size: 16px; line-height: 1.8;">
                                    <strong>Reflect on today's reading:</strong><br>
                                    ${escapeHtml(prompt)}
                                </p>
                            </div>
                            
                            <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                <textarea 
                                  id="journal"
                                  style="width: 100%; min-height: 300px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-size: 16px; line-height: 1.8; font-family: inherit;"
                                  placeholder="Write your thoughts here. There are no wrong answers in a journal!"
                                ></textarea>
                                <p style="margin-top: 10px; color: #666; font-size: 14px;">
                                    💭 This is your space to explore your ideas and reactions to the story.
                                </p>
                            </div>
                        </div>
                    \`
                }`;
}

function generateLessonHTML(day, week, chapterNum, chapter, vocabWords, vocabGame, storyParts, skillContent, infoText, writingJournalPage, isOddDay, questions) {
  // Build vocabulary display
  const vocabDisplay = vocabWords.map((v, i) => `
                                <div style="margin-bottom: 30px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                    <div style="margin-bottom: 12px;">
                                        <span style="font-size: 28px; font-weight: 800; color: #305853;">${v.word}</span>
                                    </div>
                                    <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                                        Look up this word in a dictionary, then write the definition in your own words:
                                    </p>
                                    <textarea 
                                      id="vocab-${i + 1}"
                                      style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px; font-family: inherit; font-size: 16px;"
                                      oninput="updateWordCount('vocab-${i + 1}', 'vocab-count-${i + 1}', 10)"
                                      onpaste="return false"
                                      placeholder="Type the definition here (minimum 10 words, no pasting)..."
                                    ></textarea>
                                    <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                                      <span id="vocab-count-${i + 1}" style="font-size: 13px; color: #666;">0 / 10 words</span>
                                      <span id="vocab-count-${i + 1}-status" style="font-size: 13px; font-weight: 600;"></span>
                                    </div>
                                </div>
  `).join('');
  
  // Build comprehension questions
  const mcQuestions = questions.multipleChoice || [];
  const shortAnswer = questions.shortAnswer || '';
  
  const compQuestions = mcQuestions.map((q, i) => `
                            <div style="margin-bottom: 30px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                <p style="font-weight: 600; margin-bottom: 12px;">${q.number}. ${escapeHtml(q.text)}</p>
                                <div style="margin-left: 20px;">
                                    ${Object.entries(q.options).map(([letter, text]) => `
                                        <label style="display: block; margin-bottom: 8px; cursor: pointer;">
                                            <input type="radio" name="comp-${q.number}" value="${letter}" style="margin-right: 8px;">
                                            <strong>${letter}.</strong> ${escapeHtml(text)}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
  `).join('');
  
  const shortAnswerHtml = shortAnswer ? `
                            <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513;">
                                <p style="font-weight: 600; margin-bottom: 12px;">3. ${escapeHtml(shortAnswer)}</p>
                                <textarea 
                                  id="comp-3"
                                  style="width: 100%; min-height: 120px; padding: 15px; border: 2px solid #305853; border-radius: 8px; font-size: 16px; line-height: 1.6;"
                                  placeholder="Write your answer here. Be specific and use evidence from the text."
                                ></textarea>
                            </div>
  ` : '';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson ${day} - 6th Grade BedrockELA</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="lesson-viewer">
    <div id="lesson-container" class="lesson-container"></div>

    <script src="js/billy-tts.js"></script>
    <script src="js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=1772665488"></script>
    <script src="js/lesson-autosave.js?v=1772665488"></script>
    <script src="js/save-button-injector.js?v=1772665488"></script>
    <script src="js/answer-validation.js?v=1772665488"></script>
    <script src="js/grade-normalizer.js?v=1772665488"></script>
    <script src="js/offline-sync.js?v=1772665488"></script>
    <script src="js/text-to-speech.js?v=1772665488"></script>
    
    <script>
        const lesson${day}Config = {
            lessonId: '6th-grade-day-${day}',
            gradeLevel: '6th-grade',
            title: 'Lesson ${day} - 6th Grade',
            pages: [
                // Page 1: Title
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Lesson ${day}</h1>
                            <div class="subtitle">6th Grade ELA</div>
                            <p style="color: #8B4513; font-size: 20px; margin-top: 20px;">
                                The Adventures of Tom Sawyer
                            </p>
                            <p style="color: #666; font-size: 16px; margin-top: 10px;">
                                Chapter ${chapterNum} • Week ${week}
                            </p>
                        </div>
                    \`
                },
                
                // Page 2: Welcome & Objectives
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>Welcome to Lesson ${day}!</h2>
                            <p>Today you will:</p>
                            <ul style="margin: 20px 0; line-height: 2;">
                                <li>Read Chapter ${chapterNum}: <em>${escapeHtml(chapter.title)}</em></li>
                                <li>Learn 3 new vocabulary words</li>
                                <li>Read informational text: "${infoText.title}"</li>
                                <li>Practice ${isOddDay ? 'grammar' : 'language'} skills</li>
                                <li>Complete ${isOddDay ? 'writing' : 'journal'} activity</li>
                            </ul>
                            <p><strong>Time needed:</strong> About 45-60 minutes</p>
                        </div>
                    \`
                },
                
                // Page 3: Vocabulary (3 words)
                {
                    render: () => {
                        const updateWordCount = (textareaId, countId, minWords) => {
                            const textarea = document.getElementById(textareaId);
                            const countEl = document.getElementById(countId);
                            const statusEl = document.getElementById(countId + '-status');
                            if (!textarea || !countEl) return;
                            
                            const text = textarea.value.trim();
                            const words = text.length > 0 ? text.split(/\\s+/).length : 0;
                            countEl.textContent = words + ' / ' + minWords + ' words';
                            
                            if (words >= minWords) {
                                statusEl.textContent = '✅ Complete';
                                statusEl.style.color = '#22c55e';
                            } else if (words > 0) {
                                statusEl.textContent = (minWords - words) + ' more needed';
                                statusEl.style.color = '#f59e0b';
                            } else {
                                statusEl.textContent = '';
                            }
                        };
                        
                        window.updateWordCount = updateWordCount;
                        
                        return \`
                            <div class="lesson-page-card content-page">
                                <h2>📖 Vocabulary Words</h2>
                                <p style="margin-bottom: 25px; color: #666;">
                                    Look up each word in a dictionary. Write the definition in your own words (minimum 10 words each).
                                </p>
                                
                                ${vocabDisplay}
                                
                                <div style="padding: 15px; background: rgba(176,104,33,0.1); border-radius: 10px;">
                                    <p style="margin: 0;"><strong>Watch for these words</strong> in today's reading!</p>
                                </div>
                            </div>
                        \`;
                    }
                },
                
                ${vocabGame}
                
                // Pages 5-7: Story in 3 parts
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📚 Reading: ${escapeHtml(chapter.title)}</h2>
                            <h3 style="color: #8B4513;">Part 1 of 3</h3>
                            <div style="line-height: 1.8; color: #333; font-size: 16px; margin-top: 20px;">
                                ${storyParts[0]}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📚 Reading: ${escapeHtml(chapter.title)}</h2>
                            <h3 style="color: #8B4513;">Part 2 of 3</h3>
                            <div style="line-height: 1.8; color: #333; font-size: 16px; margin-top: 20px;">
                                ${storyParts[1]}
                            </div>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📚 Reading: ${escapeHtml(chapter.title)}</h2>
                            <h3 style="color: #8B4513;">Part 3 of 3</h3>
                            <div style="line-height: 1.8; color: #333; font-size: 16px; margin-top: 20px;">
                                ${storyParts[2]}
                            </div>
                        </div>
                    \`
                },
                
                // Page 8: Comprehension (2 MC + 1 short answer)
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>💭 Reading Comprehension</h2>
                            <p style="margin-bottom: 25px;">Answer these questions about today's chapter.</p>
                            
                            ${compQuestions}
                            ${shortAnswerHtml}
                        </div>
                    \`
                },
                
                ${skillContent}
                
                // Page 10: Informational Text
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>📰 Informational Text</h2>
                            <h3 style="color: #8B4513; margin-top: 20px;">${infoText.title}</h3>
                            <div style="line-height: 1.8; color: #333; font-size: 16px; margin: 25px 0;">
                                ${infoText.text.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${escapeHtml(p)}</p>`).join('')}
                            </div>
                            
                            <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513; margin-top: 30px;">
                                <p style="font-weight: 600; margin-bottom: 12px;">Question 1: What is the main idea of this text?</p>
                                <textarea 
                                  style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px;"
                                ></textarea>
                            </div>
                            
                            <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513; margin-top: 20px;">
                                <p style="font-weight: 600; margin-bottom: 12px;">Question 2: What is one interesting fact you learned?</p>
                                <textarea 
                                  style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px;"
                                ></textarea>
                            </div>
                            
                            <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #8B4513; margin-top: 20px;">
                                <p style="font-weight: 600; margin-bottom: 12px;">Question 3: How does this information connect to Tom Sawyer's story?</p>
                                <textarea 
                                  style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #305853; border-radius: 8px;"
                                ></textarea>
                            </div>
                        </div>
                    \`
                },
                
                ${writingJournalPage}
            ]
        };

        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;
}
