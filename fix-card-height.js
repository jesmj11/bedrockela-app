const fs = require('fs');

let css = fs.readFileSync('css/lesson-viewer.css', 'utf8');

// Find the .lesson-page-content section and make it use all available space
css = css.replace(
  /\.lesson-page-content \{[^}]+\}/,
  `.lesson-page-content {
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 10px 20px;
  overflow: hidden;
  min-height: 0;
}`
);

// Make the card fill the full height
css = css.replace(
  /\.lesson-page-card \{[\s\S]*?overflow-x: hidden;\n\}/,
  `.lesson-page-card {
  background: #FFFFFF;
  border-radius: 25px;
  padding: 30px;
  width: calc(100% - 40px);
  height: 100%;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15), 0 4px 15px rgba(0,0,0,0.1);
  border: 2px solid rgba(48,88,83,0.25);
  animation: pageSlideIn 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
}`
);

fs.writeFileSync('css/lesson-viewer.css', css);
console.log('✅ Fixed card to fill full height');
