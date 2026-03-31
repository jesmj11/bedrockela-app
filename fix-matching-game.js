#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const matchingGameJS = `
    // Vocabulary Matching Game
    let selectedWord = null;
    let selectedDef = null;
    let score = 0;
    let matchedPairs = new Set();
    
    function selectWord(element) {
      const word = element.getAttribute('data-word');
      if (matchedPairs.has(word)) return;
      
      document.querySelectorAll('.match-word').forEach(w => {
        w.style.transform = 'scale(1)';
        w.style.boxShadow = 'none';
      });
      
      element.style.transform = 'scale(1.05)';
      element.style.boxShadow = '0 4px 12px rgba(48,88,83,0.4)';
      selectedWord = word;
      
      if (selectedDef) checkMatch();
    }
    
    function selectDef(element) {
      const word = element.getAttribute('data-word');
      if (matchedPairs.has(word)) return;
      
      document.querySelectorAll('.match-def').forEach(d => {
        d.style.transform = 'scale(1)';
        d.style.boxShadow = 'none';
      });
      
      element.style.transform = 'scale(1.05)';
      element.style.boxShadow = '0 4px 12px rgba(139,69,19,0.4)';
      selectedDef = word;
      
      if (selectedWord) checkMatch();
    }
    
    function checkMatch() {
      const feedback = document.getElementById('gameFeedback');
      
      if (selectedWord === selectedDef) {
        score++;
        matchedPairs.add(selectedWord);
        document.getElementById('gameScore').textContent = score;
        
        const wordEl = document.querySelector(\`.match-word[data-word="\${selectedWord}"]\`);
        const defEl = document.querySelector(\`.match-def[data-word="\${selectedDef}"]\`);
        
        wordEl.style.background = '#4CAF50';
        wordEl.style.opacity = '0.6';
        wordEl.style.pointerEvents = 'none';
        defEl.style.background = '#4CAF50';
        defEl.style.color = 'white';
        defEl.style.opacity = '0.6';
        defEl.style.pointerEvents = 'none';
        
        feedback.style.display = 'block';
        feedback.style.background = '#d4edda';
        feedback.style.color = '#155724';
        feedback.textContent = '✓ Correct! Great match!';
        
        if (score === 2) {
          setTimeout(() => {
            feedback.textContent = '🎉 Perfect! You matched all the words!';
          }, 1000);
        }
      } else {
        feedback.style.display = 'block';
        feedback.style.background = '#f8d7da';
        feedback.style.color = '#721c24';
        feedback.textContent = '✗ Not quite. Try again!';
        
        setTimeout(() => {
          document.querySelectorAll('.match-word, .match-def').forEach(el => {
            if (!matchedPairs.has(el.getAttribute('data-word'))) {
              el.style.transform = 'scale(1)';
              el.style.boxShadow = 'none';
            }
          });
          feedback.style.display = 'none';
        }, 1500);
      }
      
      selectedWord = null;
      selectedDef = null;
    }
`;

const files = fs.readdirSync('.').filter(f => f.match(/^4th-grade-lesson-\d+\.html$/));

let fixed = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if matching game JS already exists
  if (content.includes('function selectWord(element)')) {
    console.log(`Skip: ${file} (already has game JS)`);
    return;
  }
  
  // Insert the matching game JS before showPage(1);
  content = content.replace(
    /(\s+)showPage\(1\);(\s+)<\/script>/,
    `$1${matchingGameJS}\n$1showPage(1);$2</script>`
  );
  
  fs.writeFileSync(file, content);
  fixed++;
  console.log(`Fixed: ${file}`);
});

console.log(`\n✅ Fixed ${fixed} lessons`);
