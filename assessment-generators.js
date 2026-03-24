// Assessment Question Generators for BedrockELA
// Generates grammar, language, and writing assessments from lesson data

const colors = {
  white: '#FFFFFF',
  deepTeal: '#305853',
  goldenAmber: '#B06821',
  brickRed: '#9E2C21',
  darkMahogany: '#511B18',
  slateBlue: '#1B2A50'
};

// ============================================
// GRAMMAR ASSESSMENT GENERATOR
// ============================================

function generateGrammarAssessment(grammarData, assessmentDay, gradeLevel, bookName) {
  // Determine which days to test based on assessment day
  // Day 5 → test Days 1 & 3
  // Day 10 → test Days 6 & 8
  // Day 15 → test Days 11 & 13
  // Day 20 → test Days 16 & 18
  
  const previousOddDays = [assessmentDay - 4, assessmentDay - 2];
  const topics = previousOddDays.map(day => grammarData[day]).filter(Boolean);
  
  if (topics.length === 0) {
    return '<p><em>Grammar assessment data not available.</em></p>';
  }
  
  let html = `
    <div class="lesson-page" data-page="3">
      <div class="page-content">
        <h2 style="color: ${colors.deepTeal}; margin-bottom: 20px;">📝 Grammar Assessment</h2>
        <p style="margin-bottom: 25px;">Answer the following questions about the grammar skills you learned this week:</p>
        <div class="grammar-questions">
  `;
  
  let questionNum = 1;
  
  topics.forEach((topic, topicIndex) => {
    const dayNum = previousOddDays[topicIndex];
    
    html += `
      <div class="grammar-section" style="margin-bottom: 40px; padding: 20px; background: #f9f9f9; border-radius: 8px; border-left: 4px solid ${colors.goldenAmber};">
        <h3 style="color: ${colors.goldenAmber}; margin-bottom: 15px;">Day ${dayNum} Topic: ${topic.topic}</h3>
    `;
    
    // Question 1: Identification
    html += `
      <div class="grammar-question" style="margin-bottom: 25px;">
        <p style="font-weight: 700; margin-bottom: 10px;">${questionNum}. Identify the ${topic.topic.toLowerCase()} in this sentence:</p>
        <p style="font-style: italic; margin-bottom: 10px; padding: 10px; background: white; border-radius: 4px;">"${topic.example}"</p>
        <textarea class="grammar-answer" rows="2" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Your answer..."></textarea>
      </div>
    `;
    questionNum++;
    
    // Question 2: Explanation/Application
    html += `
      <div class="grammar-question" style="margin-bottom: 25px;">
        <p style="font-weight: 700; margin-bottom: 10px;">${questionNum}. ${topic.explanation.split('.')[0]}. Give an example from ${bookName}:</p>
        <textarea class="grammar-answer" rows="3" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Write the sentence and explain..."></textarea>
      </div>
    `;
    questionNum++;
    
    // Question 3: Creation (adjusted for grade level)
    const creationPrompt = topic.prompt.replace(/Write (.*?) sentences/, `Write TWO sentences`);
    html += `
      <div class="grammar-question" style="margin-bottom: 25px;">
        <p style="font-weight: 700; margin-bottom: 10px;">${questionNum}. ${creationPrompt}</p>
        <textarea class="grammar-answer" rows="4" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Write your sentences here..."></textarea>
      </div>
    `;
    questionNum++;
    
    html += `</div>`; // Close grammar-section
  });
  
  html += `
        </div>
      </div>
    </div>
  `;
  
  return html;
}

// ============================================
// LANGUAGE ASSESSMENT GENERATOR
// ============================================

function generateLanguageAssessment(languageData, assessmentDay, gradeLevel, bookName) {
  // Determine which days to test based on assessment day
  // Day 5 → test Days 2 & 4
  // Day 10 → test Days 7 & 9
  // Day 15 → test Days 12 & 14
  // Day 20 → test Days 17 & 19
  
  const previousEvenDays = [assessmentDay - 3, assessmentDay - 1];
  const topics = previousEvenDays.map(day => languageData[day]).filter(Boolean);
  
  if (topics.length === 0) {
    return '<p><em>Language assessment data not available.</em></p>';
  }
  
  let html = `
    <div class="lesson-page" data-page="4">
      <div class="page-content">
        <h2 style="color: ${colors.goldenAmber}; margin-bottom: 20px;">📚 Language Skills Assessment</h2>
        <p style="margin-bottom: 25px;">Apply the vocabulary strategies you learned this week:</p>
        <div class="language-questions">
  `;
  
  let questionNum = 1;
  
  topics.forEach((topic, topicIndex) => {
    const dayNum = previousEvenDays[topicIndex];
    
    html += `
      <div class="language-section" style="margin-bottom: 40px; padding: 20px; background: #f9f9f9; border-radius: 8px; border-left: 4px solid ${colors.brickRed};">
        <h3 style="color: ${colors.brickRed}; margin-bottom: 15px;">Day ${dayNum} Topic: ${topic.topic}</h3>
    `;
    
    // Question 1: Find/Identify
    html += `
      <div class="language-question" style="margin-bottom: 25px;">
        <p style="font-weight: 700; margin-bottom: 10px;">${questionNum}. Find an example of ${topic.topic.toLowerCase()} in this week's reading from ${bookName}:</p>
        <p style="font-size: 0.9em; color: #666; margin-bottom: 10px;"><em>Hint: ${topic.explanation.split('.')[0]}.</em></p>
        <textarea class="language-answer" rows="3" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Write the example and explain how you identified it..."></textarea>
      </div>
    `;
    questionNum++;
    
    // Question 2: Application/Creation
    const applicationPrompt = topic.prompt.replace(/Find (.+?) in today's/, 'Create TWO examples of $1 related to this week\'s');
    html += `
      <div class="language-question" style="margin-bottom: 25px;">
        <p style="font-weight: 700; margin-bottom: 10px;">${questionNum}. ${applicationPrompt}</p>
        <p style="font-size: 0.9em; color: #666; margin-bottom: 10px;"><em>Example: ${topic.example}</em></p>
        <textarea class="language-answer" rows="4" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Write your examples..."></textarea>
      </div>
    `;
    questionNum++;
    
    html += `</div>`; // Close language-section
  });
  
  html += `
        </div>
      </div>
    </div>
  `;
  
  return html;
}

// ============================================
// WRITING PROMPT LIBRARY
// ============================================

const writingPrompts = {
  "tom-sawyer-day5": {
    type: "personal-narrative",
    title: "Creativity and Problem-Solving",
    prompt: "Tom Sawyer uses cleverness and creativity to solve problems throughout the story. The fence-whitewashing scene is a perfect example of Tom's ability to think differently and turn a bad situation into a good one.",
    task: "Write a personal narrative about a time YOU used creativity, cleverness, or 'thinking outside the box' to solve a problem or get out of a difficult situation.",
    requirements: {
      length: "2-3 paragraphs (12-15 sentences minimum)",
      structure: [
        "Paragraph 1 (Introduction): Set the scene and introduce the problem you faced",
        "Paragraph 2 (Body): Explain your creative solution and what happened as a result",
        "Paragraph 3 (Conclusion): Reflect on what you learned from the experience"
      ],
      mustInclude: [
        "At least 3 vocabulary words from this week (underline them)",
        "At least 2 complex sentences (mark with *)",
        "At least 1 example of a prefix we studied (circle it)"
      ]
    }
  },
  
  "tom-sawyer-day10": {
    type: "opinion",
    title: "Courage and Moral Dilemmas",
    prompt: "Tom witnesses a terrible crime in the graveyard and faces a moral dilemma: should he tell the truth and risk danger, or keep quiet and let an innocent man suffer?",
    task: "Write an opinion essay: Do you think Tom made the right choice by testifying at Muff Potter's trial? Why or why not?",
    requirements: {
      length: "3-4 paragraphs (15-18 sentences minimum)",
      structure: [
        "Paragraph 1: State your opinion clearly",
        "Paragraph 2: Give 2-3 reasons supporting your opinion with evidence from the text",
        "Paragraph 3: Address the opposing viewpoint",
        "Paragraph 4: Conclusion - restate your opinion"
      ],
      mustInclude: [
        "At least 4 vocabulary words from this unit",
        "At least 3 complex sentences",
        "Specific quotes or examples from the story"
      ]
    }
  },
  
  "tom-sawyer-day15": {
    type: "compare-contrast",
    title: "Character Analysis",
    prompt: "Tom Sawyer and Huckleberry Finn are both adventurous boys, but they have very different lives and personalities.",
    task: "Write a compare-and-contrast essay analyzing the similarities and differences between Tom and Huck. Consider their backgrounds, personalities, relationships with society, and values.",
    requirements: {
      length: "3-4 paragraphs (15-20 sentences minimum)",
      structure: [
        "Paragraph 1: Introduction - introduce both characters",
        "Paragraph 2: Similarities between Tom and Huck",
        "Paragraph 3: Differences between Tom and Huck",
        "Paragraph 4: Conclusion - which character do you relate to more and why?"
      ],
      mustInclude: [
        "At least 5 vocabulary words from this unit",
        "Varied sentence structures (simple, compound, complex)",
        "Specific examples from the text"
      ]
    }
  },
  
  "tom-sawyer-day20": {
    type: "analytical-essay",
    title: "Theme Analysis: Freedom vs. Civilization",
    prompt: "One of the major themes in Tom Sawyer is the conflict between freedom and civilization. Tom loves adventure and freedom, but society tries to 'civilize' him through school, church, and rules.",
    task: "Write an analytical essay: How does Mark Twain explore the theme of freedom versus civilization in Tom Sawyer? What message is he sending about childhood, society, and human nature?",
    requirements: {
      length: "4-5 paragraphs (20-25 sentences minimum)",
      structure: [
        "Paragraph 1: Introduction with thesis statement",
        "Paragraph 2: How Tom represents freedom",
        "Paragraph 3: How society represents civilization/rules",
        "Paragraph 4: The conflict between the two and what it reveals",
        "Paragraph 5: Conclusion - Twain's message"
      ],
      mustInclude: [
        "At least 6 vocabulary words from the entire unit",
        "Multiple quotes from the text with analysis",
        "Advanced sentence variety (including semicolons, colons, appositives)"
      ]
    }
  }
};

function generateWritingPrompt(promptKey, gradeLevel) {
  const prompt = writingPrompts[promptKey];
  if (!prompt) {
    return '<p><em>Writing prompt not available.</em></p>';
  }
  
  let html = `
    <div class="lesson-page" data-page="6">
      <div class="page-content">
        <h2 style="color: ${colors.deepTeal}; margin-bottom: 20px;">✍️ Writing Assessment</h2>
        
        <div class="writing-prompt" style="padding: 20px; background: #f9f9f9; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: ${colors.goldenAmber}; margin-bottom: 15px;">${prompt.title}</h3>
          <p style="margin-bottom: 15px;">${prompt.prompt}</p>
          <p style="font-weight: 700; font-size: 1.1em; color: ${colors.brickRed};">${prompt.task}</p>
        </div>
        
        <div class="writing-requirements" style="margin-bottom: 25px;">
          <h4 style="color: ${colors.deepTeal}; margin-bottom: 10px;">Requirements:</h4>
          
          <p style="margin-bottom: 10px;"><strong>Length:</strong> ${prompt.requirements.length}</p>
          
          <p style="margin-bottom: 5px;"><strong>Structure:</strong></p>
          <ul style="margin-left: 20px; margin-bottom: 15px;">
            ${prompt.requirements.structure.map(item => `<li style="margin-bottom: 5px;">${item}</li>`).join('')}
          </ul>
          
          <p style="margin-bottom: 5px;"><strong>Must Include:</strong></p>
          <ul style="margin-left: 20px; margin-bottom: 15px;">
            ${prompt.requirements.mustInclude.map(item => `<li style="margin-bottom: 5px;">${item}</li>`).join('')}
          </ul>
        </div>
        
        <div class="writing-space">
          <label style="font-weight: 700; display: block; margin-bottom: 10px;">Your Essay:</label>
          <textarea class="writing-response" rows="20" style="width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 1em; line-height: 1.6;" placeholder="Begin writing here..."></textarea>
          <p style="margin-top: 10px; color: #666; font-size: 0.9em;">Word count: <span id="wordCount">0</span> / 200 minimum</p>
        </div>
        
        <div class="rubric-checklist" style="margin-top: 25px; padding: 20px; background: #f0f8ff; border-radius: 8px;">
          <h4 style="color: ${colors.deepTeal}; margin-bottom: 15px;">✓ Self-Check Rubric (Check before submitting)</h4>
          <div style="display: grid; grid-template-columns: 1fr auto; gap: 10px;">
            <label><input type="checkbox"> Clear introduction with problem/topic stated</label><span>10 pts</span>
            <label><input type="checkbox"> Detailed body paragraphs with examples</label><span>20 pts</span>
            <label><input type="checkbox"> Thoughtful conclusion</label><span>10 pts</span>
            <label><input type="checkbox"> Required vocabulary words included</label><span>10 pts</span>
            <label><input type="checkbox"> Required sentence types included</label><span>10 pts</span>
            <label><input type="checkbox"> Proper grammar, spelling, punctuation</label><span>15 pts</span>
            <label><input type="checkbox"> Meets length requirement</label><span>10 pts</span>
            <label><input type="checkbox"> Clear and engaging writing</label><span>15 pts</span>
          </div>
          <p style="margin-top: 15px; font-weight: 700; text-align: right;">Total: ___ / 100 points</p>
        </div>
        
        <button onclick="window.saveWriting()" style="margin-top: 20px; padding: 15px 30px; background: ${colors.deepTeal}; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer;">Save & Continue →</button>
      </div>
    </div>
  `;
  
  return html;
}

// ============================================
// INFORMATIONAL TEXT LIBRARY
// ============================================

const informationalTexts = {
  "tom-sawyer-day5": {
    title: "Mark Twain and Life on the Mississippi",
    passage: `Samuel Langhorne Clemens, who wrote under the pen name Mark Twain, was born in 1835 in Missouri. He grew up in Hannibal, a small town on the banks of the Mississippi River—the same setting he would later use for The Adventures of Tom Sawyer.

In the 1840s, the Mississippi River was the highway of America. Steamboats carried passengers and cargo up and down the river, connecting small towns to big cities like St. Louis and New Orleans. For boys like young Sam Clemens, the arrival of a steamboat was the most exciting event of the day. The whole town would rush to the riverbank to watch the magnificent boats with their spinning paddle wheels and smoking chimneys.

Life in a Mississippi River town in the 1840s was very different from life today. There were no cars, computers, or electric lights. Children didn't have soccer practice or piano lessons. Instead, boys like Tom Sawyer spent their time swimming in the river, fishing, exploring caves, and playing in the woods. School was often boring and strict, with harsh punishments for misbehavior. No wonder Tom preferred adventure to sitting in a classroom!

Twain drew on his own childhood memories when he created Tom Sawyer. Like Tom, young Sam Clemens loved mischief and adventure. He explored caves, went swimming, and often got into trouble. The character of Huckleberry Finn was based on a real boy Sam knew—a poor, homeless child whom all the "respectable" mothers forbade their children to befriend.

By writing about his own experiences with humor and honesty, Twain created one of the most beloved books in American literature. Tom Sawyer gives modern readers a window into a vanished world—a time when the Mississippi River was the center of life, and boys like Tom roamed free in a world of endless adventure.`,
    questions: [
      {
        question: "According to the passage, what role did the Mississippi River play in 1840s American life?",
        standard: "RI.6.2",
        answer: "The Mississippi was 'the highway of America.' Steamboats transported passengers and cargo, connecting small towns to big cities. The river was the center of commerce and daily life."
      },
      {
        question: "How does understanding this historical context help you better understand Tom Sawyer's adventures and behavior?",
        standard: "RI.6.3",
        answer: "Explains why Tom has freedom to roam, why the river is important, what childhood was like without modern activities, and why school felt restrictive."
      },
      {
        question: "Find TWO facts from the passage that explain why the steamboat arrival was such a big event.",
        standard: "RI.6.1",
        answer: "1) The whole town rushed to watch. 2) Steamboats were magnificent with paddle wheels and smoking chimneys / connected towns to cities."
      },
      {
        question: "The passage says Mark Twain 'drew on his own childhood memories' when writing Tom Sawyer. What does this tell you about why the book feels so realistic?",
        standard: "RI.6.8",
        answer: "Twain wrote from real experiences, not imagination. He knew 1840s childhood firsthand, making details authentic and believable."
      }
    ]
  }
  
  // More informational texts can be added here for other assessment days
};

function generateInformationalText(textKey, gradeLevel) {
  const infoText = informationalTexts[textKey];
  if (!infoText) {
    return '<p><em>Informational text not available.</em></p>';
  }
  
  let html = `
    <div class="lesson-page" data-page="7">
      <div class="page-content">
        <h2 style="color: ${colors.brickRed}; margin-bottom: 20px;">📰 Informational Reading</h2>
        <p style="margin-bottom: 20px;">Read the passage below carefully, then answer the questions that follow:</p>
        
        <div class="info-text-passage" style="padding: 25px; background: #f9f9f9; border-radius: 8px; border-left: 4px solid ${colors.goldenAmber}; margin-bottom: 30px;">
          <h3 style="color: ${colors.deepTeal}; margin-bottom: 20px;">${infoText.title}</h3>
          <div style="line-height: 1.8; font-size: 1.05em;">
            ${infoText.passage.split('\n\n').map(para => `<p style="margin-bottom: 15px; text-indent: 2em;">${para}</p>`).join('')}
          </div>
        </div>
        
        <div class="info-text-questions">
          <h3 style="color: ${colors.brickRed}; margin-bottom: 20px;">Comprehension Questions:</h3>
          ${infoText.questions.map((q, i) => `
            <div class="info-question" style="margin-bottom: 30px; padding: 20px; background: #fff; border-radius: 8px; border: 2px solid #e0e0e0;">
              <p style="font-weight: 700; margin-bottom: 10px;">${i + 1}. ${q.question}</p>
              <p style="font-size: 0.85em; color: #666; margin-bottom: 10px;"><em>Standard: ${q.standard}</em></p>
              <textarea class="info-answer" rows="4" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-family: inherit;" placeholder="Write your answer with evidence from the text..."></textarea>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  return html;
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  generateGrammarAssessment,
  generateLanguageAssessment,
  generateWritingPrompt,
  generateInformationalText,
  writingPrompts,
  informationalTexts
};
