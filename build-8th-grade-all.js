// Build 7th Grade Unit 2: Moby Dick
// Complete Bedrock Spine structure with 8-page assessments

const fs = require('fs');
const {
  generateGrammarAssessment,
  generateLanguageAssessment,
  generateWritingPrompt,
  generateInformationalText
} = require('./assessment-generators.js');

// Load data
const books = [
  { file: 'frankenstein-complete-unit-card.json', dayStart: 1, dayEnd: 30, title: 'Frankenstein' },
  { file: 'jekyll-hyde-complete-unit-card.json', dayStart: 31, dayEnd: 60, title: 'Dr. Jekyll and Mr. Hyde' },
  { file: 'dorian-gray-complete-unit-card.json', dayStart: 61, dayEnd: 90, title: 'The Picture of Dorian Gray' },
  { file: 'beowulf-complete-unit-card.json', dayStart: 91, dayEnd: 120, title: 'Beowulf' },
  { file: 'sherlock-complete-unit-card.json', dayStart: 121, dayEnd: 150, title: 'Sherlock Holmes' },
  { file: 'hunchback-notre-dame-unit-card.json', dayStart: 151, dayEnd: 180, title: 'The Hunchback of Notre-Dame' }
];

let currentBook = books[0];
let unitCard = JSON.parse(fs.readFileSync(`book-data/${currentBook.file}`, 'utf8'));
const grammarLanguage = JSON.parse(fs.readFileSync('book-data/7th-grade-grammar-language.json', 'utf8'));

// Day offset for this unit (Days 31-60)
const DAY_OFFSET = 60;

// Colors
const colors = {
  white: '#FFFFFF',
  deepTeal: '#305853',
  goldenAmber: '#B06821',
  brickRed: '#9E2C21',
  darkMahogany: '#511B18',
  slateBlue: '#1B2A50'
};

// Writing prompts for Arabian Nights assessments
const writingPrompts = {
  "day5": {
    type: "analytical",
    title: "Theme Analysis: Power and Narrative",
    prompt: "In the first week of Arabian Nights, we see how Scheherazade uses storytelling as a tool of survival and change. The king holds physical power, but Scheherazade wields narrative power.",
    task: "Write an analytical essay examining how storytelling functions as power in these opening chapters. How does Scheherazade's narrative strategy differ from direct argument or confrontation? What does this suggest about how minds and hearts are changed?",
    requirements: {
      length: "3-4 paragraphs (15-20 sentences minimum)",
      structure: [
        "Paragraph 1: Introduction with thesis statement about narrative power",
        "Paragraph 2: How Scheherazade uses stories strategically (with examples)",
        "Paragraph 3: Why this method works when direct confrontation would fail",
        "Paragraph 4: Conclusion - broader implications about persuasion and change"
      ],
      mustInclude: [
        "At least 4 vocabulary words from this week",
        "At least 3 specific examples from the text with quotes or close paraphrasing",
        "Complex sentence structures including subordination"
      ]
    }
  },
  
  "day10": {
    type: "compare-contrast",
    title: "Character Analysis: Different Kinds of Intelligence",
    prompt: "We've now met several characters who demonstrate intelligence in different ways: Scheherazade's strategic thinking, Morgiana's practical wisdom, Ali Baba's survival instincts, and Sinbad's adaptability.",
    task: "Write a compare-and-contrast essay analyzing how at least two of these characters demonstrate different types of intelligence. What does each character's form of intelligence allow them to accomplish? What are the limitations of each type?",
    requirements: {
      length: "4 paragraphs (18-22 sentences minimum)",
      structure: [
        "Paragraph 1: Introduction naming the characters and types of intelligence you'll discuss",
        "Paragraph 2: First character's intelligence with specific examples",
        "Paragraph 3: Second character's intelligence with specific examples",
        "Paragraph 4: Comparison showing similarities, differences, and what we learn from each"
      ],
      mustInclude: [
        "At least 5 vocabulary words from the unit",
        "Specific textual evidence for each character",
        "Parallel structure when comparing the two characters"
      ]
    }
  },
  
  "day15": {
    type: "argumentative",
    title: "Justice and Retribution in the Tales",
    prompt: "Many Arabian Nights tales deal with questions of justice, revenge, and mercy. Characters face choices about how to respond to betrayal, injustice, or harm.",
    task: "Write an argumentative essay taking a position: Do the tales generally favor retribution (getting revenge) or mercy (forgiveness and restraint)? Support your argument with evidence from multiple stories.",
    requirements: {
      length: "4-5 paragraphs (20-25 sentences minimum)",
      structure: [
        "Paragraph 1: Introduce the issue and state your thesis clearly",
        "Paragraph 2: First piece of evidence from the text supporting your position",
        "Paragraph 3: Second piece of evidence from the text",
        "Paragraph 4: Address the counterargument (what someone who disagrees might say)",
        "Paragraph 5: Conclusion restating your position with final insight"
      ],
      mustInclude: [
        "At least 6 vocabulary words from the unit",
        "Evidence from at least 3 different tales",
        "Acknowledgment and refutation of counterarguments"
      ]
    }
  },
  
  "day20": {
    type: "personal-reflection",
    title: "The Power of Stories in Your Own Life",
    prompt: "Throughout this unit, we've seen how stories teach, persuade, preserve wisdom, and change minds. Scheherazade literally saves her life through storytelling. The tales within tales pass on cultural values and practical wisdom.",
    task: "Write a reflective essay about the role of stories in your own life and in contemporary society. What stories have shaped who you are? How do stories function in our world today (through books, movies, social media, family traditions, etc.)? Are stories still as powerful as they were in Scheherazade's time?",
    requirements: {
      length: "4-5 paragraphs (20-25 sentences minimum)",
      structure: [
        "Paragraph 1: Introduction connecting Arabian Nights themes to modern life",
        "Paragraph 2: A specific story that has influenced you and how",
        "Paragraph 3: How stories function in contemporary society",
        "Paragraph 4: Whether stories still have the power they had in the past (with reasoning)",
        "Paragraph 5: Conclusion with final insight about narrative's enduring importance"
      ],
      mustInclude: [
        "At least 4 vocabulary words from the unit",
        "Personal examples balanced with analysis",
        "Connection back to themes from Arabian Nights",
        "Varied sentence structures for sophisticated writing"
      ]
    }
  }
};

// Informational texts for Arabian Nights
const informationalTexts = {
  "day5": {
    title: "The Historical Arabian Nights: Origins and Cultural Context",
    passage: `The collection we know as "One Thousand and One Nights" or "Arabian Nights" didn't originate in a single place or time—it's a compilation of stories gathered over centuries from across the Islamic world, from India to North Africa.

The frame story of Scheherazade and King Shahryar first appeared in a Persian book called "Hezār Afsān" (A Thousand Tales) sometime before the 10th century. As the collection traveled westward into the Arab world, it absorbed stories from many cultures: Indian fables, Persian romances, Egyptian folklore, and stories from Baghdad during the Islamic Golden Age.

The first European translation, by Antoine Galland in the early 1700s, introduced these tales to Western audiences—but Galland made significant changes, adding some stories (like Aladdin and Ali Baba) that weren't in the original Arabic manuscripts. This raises an interesting question about authenticity: what makes a story "part of" Arabian Nights?

The tales reflect the cosmopolitan culture of the medieval Islamic world, where trade routes connected China, India, Africa, and Europe. Sinbad's voyages mirror real merchant expeditions. The genies and magic carpets represent the mythological imagination of multiple cultures blending together.

What's remarkable is how these stories functioned in their original context—they were oral tales, told in coffeehouses and homes, passed down through generations. Professional storytellers would spin them out over many nights, stopping at crucial moments (just as Scheherazade does) to ensure their audience returned. The structure of the frame story literally mimics the social function of storytelling in that culture: creating suspense, building community, passing time, and transmitting wisdom.`,
    questions: [
      {
        question: "According to the passage, why is it difficult to define what stories are 'authentically' part of Arabian Nights?",
        standard: "RI.7.1",
        answer: "The collection was compiled from multiple cultures over centuries, and different versions include different stories. Even famous tales like Aladdin were added by translators, not present in original manuscripts."
      },
      {
        question: "How did the original function of these stories (oral performance in coffeehouses) influence their structure?",
        standard: "RI.7.3",
        answer: "The cliffhanger structure, stopping at crucial moments, mirrors how professional storytellers ensured their audiences would return. Scheherazade's technique reflects the actual practice of serial storytelling."
      },
      {
        question: "What does the passage suggest about cultural exchange in the medieval Islamic world?",
        standard: "RI.7.6",
        answer: "It was highly cosmopolitan, with trade routes connecting multiple continents, allowing stories, ideas, and mythologies from different cultures to blend together."
      }
    ]
  }
};

// Helper: Map any day to the cyclic grammar/language topic
function getTopicDay(day) {
  // Topics cycle every 30 days (1-30, 31-60, 61-90, etc.)
  const cyclicDay = ((day - 1) % 30) + 1;
  return cyclicDay;
}

// Generate regular lesson (Days 1-4, 6-9, 11-14, 16-19, 21-24, 26-29)
function buildRegularLesson(day) {
  const actualDay = day + DAY_OFFSET; // The real day number (31-60 for Anne)
  
  // Calculate chapter index accounting for assessment days (every 5th day)
  const assessmentsBefore = Math.floor((day - 1) / 5);
  const chapterIndex = day - assessmentsBefore - 1;
  const chapter = unitCard.chapters[chapterIndex];
  if (!chapter) return null;
  
  // Get cyclic topic day
  const topicDay = getTopicDay(actualDay);
  const grammarTopic = grammarLanguage.grammar[topicDay.toString()];
  const languageTopic = grammarLanguage.language[topicDay.toString()];
  const isGrammarDay = !!grammarTopic;
  const isLanguageDay = !!languageTopic;
  
  const pages = [];
  
  // PAGE 1: TITLE
  pages.push(`
    <div class="lesson-page" data-page="1">
      <div class="page-content title-page">
        <div class="lesson-icon">📖</div>
        <h1 class="lesson-title">Day ${actualDay}</h1>
        <h2 class="lesson-subtitle">${chapter.title}</h2>
        <p class="lesson-meta">Moby Dick</p>
        <p class="lesson-focus"><strong>Theme:</strong> ${unitCard.theme}</p>
      </div>
    </div>
  `);
  
  // PAGE 2: WELCOME & OBJECTIVES
  pages.push(`
    <div class="lesson-page" data-page="2">
      <div class="page-content">
        <h2 style="color: ${colors.deepTeal}; margin-bottom: 20px;">Welcome to Day ${actualDay}!</h2>
        <div class="welcome-content">
          <p style="margin-bottom: 15px;">Today we're reading <strong>${chapter.title}</strong> from <em>Tales from the Arabian Nights</em>.</p>
          
          <h3 style="color: ${colors.goldenAmber}; margin-top: 25px; margin-bottom: 15px;">📚 Today's Objectives:</h3>
          <ul style="line-height: 1.8; margin-left: 20px;">
            <li>Understand key events and character development in this chapter</li>
            <li>Learn ${chapter.vocabulary.length} new vocabulary words in context</li>
            <li>${isGrammarDay ? `Master ${grammarTopic.topic}` : `Apply ${languageTopic.topic}`}</li>
            <li>Practice close reading and analytical thinking</li>
          </ul>
        </div>
      </div>
    </div>
  `);
  
  // PAGE 3: VOCABULARY
  pages.push(`
    <div class="lesson-page" data-page="3">
      <div class="page-content">
        <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">📖 Words of the Day</h2>
        <p style="margin-bottom: 20px;">These words appear in today's chapter. As you read, notice how they're used in context!</p>
        <div class="vocab-list">
          ${chapter.vocabulary.map((v, i) => `
            <div class="vocab-word" style="margin-bottom: 25px; padding: 20px; background: #f9f9f9; border-radius: 8px; border-left: 4px solid ${colors.goldenAmber};">
              <h3 style="color: ${colors.deepTeal}; margin-bottom: 10px;">${i + 1}. ${v.word}</h3>
              <p style="font-style: italic; color: #555; line-height: 1.6;">${v.definition}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `);
  
  // PAGE 4: VOCABULARY GAME
  pages.push(`
    <div class="lesson-page" data-page="4">
      <div class="page-content">
        <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">🎯 Vocabulary Matching</h2>
        <p style="margin-bottom: 20px;">Match each word to its definition:</p>
        <div class="vocab-matching-game">
          ${chapter.vocabulary.map((v, i) => `
            <div class="matching-item" style="display: flex; align-items: center; margin-bottom: 15px; padding: 15px; background: #fff; border: 2px solid #e0e0e0; border-radius: 8px;">
              <div style="flex: 1; font-weight: 700; color: ${colors.deepTeal};">${i + 1}. ${v.word}</div>
              <div style="flex: 2; font-style: italic; color: #666;">${v.definition}</div>
              <input type="checkbox" style="margin-left: 15px; transform: scale(1.5);">
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `);
  
  // PAGES 5-7: STORY (split into 3 parts)
  const storyParts = splitTextIntoParts(chapter.text, 3);
  [5, 6, 7].forEach((pageNum, idx) => {
    pages.push(`
      <div class="lesson-page" data-page="${pageNum}">
        <div class="page-content">
          <h2 style="color: ${colors.deepTeal}; margin-bottom: 20px;">📜 ${chapter.title} ${idx === 0 ? '' : `(Part ${idx + 1})`}</h2>
          <div class="story-text" style="line-height: 1.8; font-size: 1.05em;">
            ${storyParts[idx].split('\n\n').map(p => `<p style="margin-bottom: 15px; text-indent: 2em;">${p.trim()}</p>`).join('')}
          </div>
        </div>
      </div>
    `);
  });
  
  // PAGE 8: COMPREHENSION
  pages.push(`
    <div class="lesson-page" data-page="8">
      <div class="page-content">
        <h2 style="color: ${colors.brickRed}; margin-bottom: 20px;">🤔 Reading Comprehension</h2>
        <p style="margin-bottom: 20px;">Answer these questions about today's chapter:</p>
        <div class="comprehension-questions">
          ${chapter.comprehension.map((q, i) => `
            <div class="comp-question" style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
              <p style="font-weight: 700; margin-bottom: 15px;">${i + 1}. ${q.question}</p>
              ${q.options ? `
                <div class="options" style="margin-left: 20px;">
                  ${q.options.map((opt, idx) => `
                    <label style="display: block; margin-bottom: 10px; cursor: pointer;">
                      <input type="radio" name="q${i}" value="${String.fromCharCode(65 + idx)}" style="margin-right: 10px;">
                      <span>${String.fromCharCode(65 + idx)}) ${opt}</span>
                    </label>
                  `).join('')}
                </div>
              ` : `
                <textarea class="comp-answer" rows="4" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Write your answer with evidence from the text..."></textarea>
              `}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `);
  
  // PAGE 9: GRAMMAR OR LANGUAGE
  const skillTopic = isGrammarDay ? grammarTopic : languageTopic;
  const skillType = isGrammarDay ? 'Grammar' : 'Language';
  const skillColor = isGrammarDay ? colors.deepTeal : colors.goldenAmber;
  
  pages.push(`
    <div class="lesson-page" data-page="9">
      <div class="page-content">
        <h2 style="color: ${skillColor}; margin-bottom: 20px;">📝 ${skillType} Skill: ${skillTopic.topic}</h2>
        
        <div class="skill-explanation" style="padding: 20px; background: #f0f8ff; border-radius: 8px; margin-bottom: 25px;">
          <p style="line-height: 1.8; margin-bottom: 15px;">${skillTopic.explanation}</p>
          <p style="font-weight: 700; margin-top: 15px;">Example:</p>
          <p style="font-style: italic; color: #555; line-height: 1.6;">${skillTopic.example}</p>
        </div>
        
        <div class="skill-practice">
          <h3 style="color: ${skillColor}; margin-bottom: 15px;">✍️ Your Turn:</h3>
          <p style="margin-bottom: 15px;">${skillTopic.prompt}</p>
          <textarea class="skill-response" rows="10" style="width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; line-height: 1.6;" placeholder="Write your response here..."></textarea>
        </div>
      </div>
    </div>
  `);
  
  // PAGE 10: INFORMATIONAL TEXT (placeholder for now)
  pages.push(`
    <div class="lesson-page" data-page="10">
      <div class="page-content">
        <h2 style="color: ${colors.brickRed}; margin-bottom: 20px;">📰 Cultural Context</h2>
        <div class="info-text" style="padding: 20px; background: #f9f9f9; border-radius: 8px; line-height: 1.8;">
          <p style="margin-bottom: 15px;">Arabian Nights reflects the rich cultural exchange of the medieval Islamic world, where stories from India, Persia, Arabia, and beyond blended together through trade routes and oral tradition.</p>
          <p style="margin-bottom: 15px;">The frame story structure—stories within stories—mirrors how professional storytellers in coffeehouses would spin tales over many nights, stopping at cliffhangers to ensure audiences returned.</p>
        </div>
      </div>
    </div>
  `);
  
  // PAGE 11: JOURNAL/WRITING
  const writingPrompt = isGrammarDay ? 
    `Reflect on a choice a character made in today's chapter. If you were in their position, would you have made the same choice? Why or why not? Consider the character's motivations, the consequences they faced, and what this reveals about human nature.` :
    `How does today's chapter connect to the overall theme of "${unitCard.theme}"? What does this chapter reveal about identity, authenticity, or the difference between who someone appears to be and who they truly are?`;
  
  pages.push(`
    <div class="lesson-page" data-page="11">
      <div class="page-content">
        <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">✏️ ${isGrammarDay ? 'Journal Entry' : 'Reflection'}</h2>
        <p style="margin-bottom: 20px; line-height: 1.6;"><strong>Prompt:</strong> ${writingPrompt}</p>
        <textarea class="journal-entry" rows="12" style="width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 1em; line-height: 1.6;" placeholder="Write your ${isGrammarDay ? 'journal entry' : 'reflection'} here..."></textarea>
        <button onclick="window.saveJournal(${day})" style="margin-top: 20px; padding: 15px 30px; background: ${colors.deepTeal}; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer;">Save Entry →</button>
      </div>
    </div>
  `);
  
  return buildFullHTML(actualDay, pages, false);
}

// Build assessment lesson (Days 5, 10, 15, 20, 25, 30)
function buildAssessmentLesson(day) {
  const actualDay = day + DAY_OFFSET;
  const weekNumber = day / 5;
  const assessmentName = writingPrompts[`day${day}`]?.title || `Week ${weekNumber} Assessment`;
  const writingPrompt = writingPrompts[`day${day}`];
  const infoText = informationalTexts[`day${day}`];
  
  const pages = [];
  
  // PAGE 1: TITLE
  pages.push(`
    <div class="lesson-page" data-page="1">
      <div class="page-content title-page">
        <div class="lesson-icon">📝</div>
        <h1 class="lesson-title">Day ${actualDay}</h1>
        <h2 class="lesson-subtitle">Assessment</h2>
        <p class="lesson-meta">Week ${weekNumber + 6} - Moby Dick</p>
        <p class="lesson-focus"><strong>Testing Days ${actualDay-4} through ${actualDay-1}</strong></p>
      </div>
    </div>
  `);
  
  // PAGE 2: VOCABULARY (12 words from previous 4 days)
  const vocabDays = [day-4, day-3, day-2, day-1];
  const vocabWords = [];
  vocabDays.forEach(d => {
    const chapter = unitCard.chapters[d - 1];
    if (chapter) {
      vocabWords.push(...chapter.vocabulary);
    }
  });
  
  pages.push(`
    <div class="lesson-page" data-page="2">
      <div class="page-content">
        <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">📖 Vocabulary Assessment</h2>
        <p style="margin-bottom: 20px;">Match each word to its definition:</p>
        <div class="vocab-matching">
          ${vocabWords.map((v, i) => `
            <div class="vocab-match-item" style="display: flex; margin-bottom: 12px; padding: 12px; background: #f9f9f9; border-radius: 6px;">
              <div style="flex: 0 0 30px; font-weight: 700; color: ${colors.deepTeal};">${i + 1}.</div>
              <div style="flex: 1; font-weight: 600;">${v.word}</div>
              <div style="flex: 2; color: #666; font-style: italic;">${v.definition}</div>
              <input type="checkbox" style="margin-left: 10px; transform: scale(1.3);">
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `);
  
  // PAGE 3: GRAMMAR ASSESSMENT
  pages.push(generateGrammarAssessment(grammarLanguage.grammar, actualDay, 7, 'Moby Dick'));
  
  // PAGE 4: LANGUAGE ASSESSMENT
  pages.push(generateLanguageAssessment(grammarLanguage.language, actualDay, 7, 'Moby Dick'));
  
  // PAGE 5: READING COMPREHENSION
  const compChapter = unitCard.chapters[day - 2]; // Use day-2 chapter
  pages.push(`
    <div class="lesson-page" data-page="5">
      <div class="page-content">
        <h2 style="color: ${colors.brickRed}; margin-bottom: 20px;">📚 Reading Comprehension</h2>
        <div class="comp-passage" style="padding: 20px; background: #f9f9f9; border-radius: 8px; line-height: 1.8; margin-bottom: 25px;">
          <h3 style="color: ${colors.deepTeal}; margin-bottom: 15px;">Passage from "${compChapter?.title}"</h3>
          ${compChapter ? compChapter.text.split('\n\n').slice(0, 3).map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('') : '<p>No passage available.</p>'}
        </div>
        <div class="comp-questions">
          ${compChapter ? compChapter.comprehension.slice(0, 6).map((q, i) => `
            <div class="comp-question" style="margin-bottom: 25px;">
              <p style="font-weight: 700; margin-bottom: 10px;">${i + 1}. ${q.question}</p>
              ${q.options ? `
                <div class="options" style="margin-left: 20px;">
                  ${q.options.map((opt, idx) => `
                    <label style="display: block; margin-bottom: 8px;">
                      <input type="radio" name="comp${i}" value="${String.fromCharCode(65 + idx)}" style="margin-right: 10px;">
                      ${String.fromCharCode(65 + idx)}) ${opt}
                    </label>
                  `).join('')}
                </div>
              ` : `
                <textarea rows="3" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;"></textarea>
              `}
            </div>
          `).join('') : '<p>No questions available.</p>'}
        </div>
      </div>
    </div>
  `);
  
  // PAGE 6: WRITING PROMPT
  if (writingPrompt) {
    pages.push(`
      <div class="lesson-page" data-page="6">
        <div class="page-content">
          <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">✍️ Writing: ${writingPrompt.title}</h2>
          <div class="writing-prompt" style="padding: 20px; background: #f0f8ff; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin-bottom: 15px; line-height: 1.7;"><strong>Context:</strong> ${writingPrompt.prompt}</p>
            <p style="margin-bottom: 15px; line-height: 1.7;"><strong>Task:</strong> ${writingPrompt.task}</p>
            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 6px;">
              <h3 style="color: ${colors.deepTeal}; margin-bottom: 10px;">Requirements:</h3>
              <ul style="margin-left: 20px; line-height: 1.8;">
                <li><strong>Length:</strong> ${writingPrompt.requirements.length}</li>
                ${writingPrompt.requirements.structure ? `
                  <li><strong>Structure:</strong>
                    <ul style="margin-left: 20px; margin-top: 5px;">
                      ${writingPrompt.requirements.structure.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                  </li>
                ` : ''}
                ${writingPrompt.requirements.mustInclude ? `
                  <li><strong>Must Include:</strong>
                    <ul style="margin-left: 20px; margin-top: 5px;">
                      ${writingPrompt.requirements.mustInclude.map(m => `<li>${m}</li>`).join('')}
                    </ul>
                  </li>
                ` : ''}
              </ul>
            </div>
          </div>
          <textarea class="writing-response" rows="20" style="width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 1em; line-height: 1.8;" placeholder="Write your essay here..."></textarea>
        </div>
      </div>
    `);
  }
  
  // PAGE 7: INFORMATIONAL TEXT
  if (infoText) {
    pages.push(`
      <div class="lesson-page" data-page="7">
        <div class="page-content">
          <h2 style="color: ${colors.brickRed}; margin-bottom: 20px;">📰 ${infoText.title}</h2>
          <div class="info-passage" style="padding: 20px; background: #f9f9f9; border-radius: 8px; line-height: 1.8; margin-bottom: 25px;">
            ${infoText.passage.split('\n\n').map(p => `<p style="margin-bottom: 15px;">${p.trim()}</p>`).join('')}
          </div>
          <div class="info-questions">
            ${infoText.questions.map((q, i) => `
              <div class="info-question" style="margin-bottom: 25px;">
                <p style="font-weight: 700; margin-bottom: 10px;">${i + 1}. ${q.question}</p>
                <textarea rows="3" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Your answer..."></textarea>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `);
  }
  
  // PAGE 8: COMPLETION
  pages.push(`
    <div class="lesson-page" data-page="8">
      <div class="page-content title-page">
        <div class="lesson-icon">🎉</div>
        <h1 style="color: ${colors.deepTeal}; font-size: 2.5rem; margin-bottom: 15px;">Week ${weekNumber + 6} Complete!</h1>
        <p style="font-size: 1.2rem; color: #666; margin-bottom: 25px;">You've finished your assessment for Moby Dick.</p>
        <button onclick="submitAssessment(${actualDay})" style="padding: 15px 40px; background: ${colors.goldenAmber}; color: white; border: none; border-radius: 10px; font-size: 20px; font-weight: 700; cursor: pointer;">Submit Assessment →</button>
      </div>
    </div>
  `);
  
  return buildFullHTML(actualDay, pages, true);
}

// Helper: Split text into equal parts
function splitTextIntoParts(text, parts) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  const paragraphsPerPart = Math.ceil(paragraphs.length / parts);
  
  const result = [];
  for (let i = 0; i < parts; i++) {
    const start = i * paragraphsPerPart;
    const end = start + paragraphsPerPart;
    result.push(paragraphs.slice(start, end).join('\n\n'));
  }
  return result;
}

// Build full HTML
function buildFullHTML(day, pages, isAssessment) {
  const totalPages = pages.length;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>7th Grade Day ${day} - BedrockELA</title>
  <link rel="stylesheet" href="css/lesson-viewer.css">
  <style>
    body { 
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
      background: ${colors.white}; 
      margin: 0; 
      padding: 0; 
    }
    .lesson-container { max-width: 900px; margin: 0 auto; padding: 20px; }
    .lesson-page { display: none; min-height: 500px; }
    .lesson-page.active { display: block; animation: fadeIn 0.3s; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .page-content { padding: 30px; }
    .title-page { text-align: center; padding: 60px 30px; }
    .lesson-icon { font-size: 5rem; margin-bottom: 20px; }
    .lesson-title { color: ${colors.deepTeal}; font-size: 2.5rem; margin-bottom: 10px; font-weight: 800; }
    .lesson-subtitle { color: ${colors.goldenAmber}; font-size: 1.8rem; margin-bottom: 15px; font-weight: 700; }
    .lesson-meta { color: #666; font-size: 1.2rem; margin-bottom: 10px; }
    .lesson-focus { color: #444; font-size: 1.1rem; font-style: italic; }
    
    .nav-controls { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-top: 30px; 
      padding: 20px; 
      background: #f9f9f9; 
      border-radius: 10px; 
      position: sticky;
      bottom: 20px;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    }
    .nav-btn { 
      padding: 12px 24px; 
      background: ${colors.deepTeal}; 
      color: white; 
      border: none; 
      border-radius: 8px; 
      font-size: 16px; 
      font-weight: 600; 
      cursor: pointer; 
      transition: all 0.2s;
    }
    .nav-btn:hover { background: ${colors.goldenAmber}; transform: translateY(-2px); }
    .nav-btn:disabled { background: #ccc; cursor: not-allowed; transform: none; }
    .progress-bar { 
      flex: 1; 
      margin: 0 20px; 
      height: 10px; 
      background: #e0e0e0; 
      border-radius: 10px; 
      overflow: hidden; 
    }
    .progress-fill { 
      height: 100%; 
      background: linear-gradient(90deg, ${colors.deepTeal}, ${colors.goldenAmber}); 
      transition: width 0.3s ease;
      border-radius: 10px;
    }
    .page-indicator { 
      font-size: 0.9em; 
      color: #666; 
      font-weight: 600; 
    }
  </style>
</head>
<body>
  <div class="lesson-container">
    <div id="lessonContent">
      ${pages.join('\n')}
    </div>
    
    <div class="nav-controls">
      <button class="nav-btn" id="prevBtn" onclick="previousPage()">← Previous</button>
      <span class="page-indicator" id="pageIndicator">Page 1 of ${totalPages}</span>
      <div class="progress-bar">
        <div class="progress-fill" id="progressBar"></div>
      </div>
      <button class="nav-btn" id="nextBtn" onclick="nextPage()">Next →</button>
    </div>
  </div>

  <script>
    let currentPage = 1;
    const totalPages = ${totalPages};
    
    function showPage(pageNum) {
      document.querySelectorAll('.lesson-page').forEach(p => p.classList.remove('active'));
      const page = document.querySelector(\`.lesson-page[data-page="\${pageNum}"]\`);
      if (page) page.classList.add('active');
      
      document.getElementById('prevBtn').disabled = (pageNum === 1);
      document.getElementById('nextBtn').disabled = (pageNum === totalPages);
      
      const progress = (pageNum / totalPages) * 100;
      document.getElementById('progressBar').style.width = progress + '%';
      document.getElementById('pageIndicator').textContent = \`Page \${pageNum} of \${totalPages}\`;
      
      currentPage = pageNum;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function nextPage() { if (currentPage < totalPages) showPage(currentPage + 1); }
    function previousPage() { if (currentPage > 1) showPage(currentPage - 1); }
    
    window.saveJournal = function(day) {
      alert('Journal entry saved! ✅');
      // In production, save to Firebase
    };
    
    showPage(1);
  </script>
</body>
</html>`;
}

// Generate lessons
const lessonsToGenerate = process.argv[2] ? parseInt(process.argv[2]) : 30;
console.log(`\n🏗️  Building 7th Grade Moby Dick - Days ${DAY_OFFSET + 1}-${DAY_OFFSET + lessonsToGenerate}\n`);

for (let day = 1; day <= lessonsToGenerate; day++) {
  let html;
  
  // Create directory if needed
  if (!fs.existsSync('curriculum/grade7')) {
    fs.mkdirSync('curriculum/grade7', { recursive: true });
  }
  
  const actualDay = day + DAY_OFFSET;
  
  if (day % 5 === 0) {
    // Assessment day
    html = buildAssessmentLesson(day);
    if (html) {
      const filename = `curriculum/grade7/7th-grade-lesson-${actualDay.toString().padStart(3, '0')}.html`;
      fs.writeFileSync(filename, html);
      console.log(`✅ Day ${actualDay}: Week ${(day/5) + 6} Assessment`);
    }
  } else {
    // Regular lesson day
    html = buildRegularLesson(day);
    if (html) {
      const filename = `curriculum/grade7/7th-grade-lesson-${actualDay.toString().padStart(3, '0')}.html`;
      fs.writeFileSync(filename, html);
      const assessmentsBefore = Math.floor((day - 1) / 5);
      const chapterIndex = day - assessmentsBefore - 1;
      console.log(`✅ Day ${actualDay}: ${unitCard.chapters[chapterIndex].title}`);
    }
  }
}

console.log(`\n🎉 Generated ${lessonsToGenerate} lessons for 7th Grade Moby Dick!`);
console.log(`📂 Location: curriculum/grade7/`);
console.log(`📅 Days: ${DAY_OFFSET + 1}-${DAY_OFFSET + lessonsToGenerate}\n`);
