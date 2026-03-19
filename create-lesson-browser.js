#!/usr/bin/env node

/**
 * Create Lesson Browser Pages (like Math Ebook interface)
 * Simple HTML page listing all lessons with clickable links
 */

const fs = require('fs');

const grades = [
    { id: '1st', name: '1st Grade', lessons: 180, units: ['Phonics', 'Short Vowels', 'Digraphs', 'Blends'] },
    { id: '2nd', name: '2nd Grade', lessons: 180, units: ['Reading', 'Grammar', 'Writing'] },
    { id: '3rd', name: '3rd Grade', lessons: 180, units: ['Classic Tales', 'Comprehension', 'Composition'] },
    { id: '4th', name: '4th Grade', lessons: 180, units: ['Wizard of Oz', 'Alice in Wonderland', 'Treasure Island'] },
    { id: '5th', name: '5th Grade', lessons: 180, units: ['Robin Hood', 'Arabian Nights', 'King Arthur'] },
    { id: '6th', name: '6th Grade', lessons: 168, units: ['Tom Sawyer', '20,000 Leagues', 'Swiss Family Robinson'] },
    { id: '8th', name: '8th Grade', lessons: 180, units: ['Frankenstein', 'Sherlock Holmes', 'Jekyll & Hyde'] },
];

function createLessonBrowser(grade) {
    const usePadding = ['4th', '5th', '6th', '8th'].includes(grade.id);
    
    // Organize lessons by week (5 days per week)
    const weeks = [];
    for (let i = 0; i < grade.lessons; i += 5) {
        const weekNum = Math.floor(i / 5) + 1;
        const weekLessons = [];
        
        for (let j = 0; j < 5 && (i + j) < grade.lessons; j++) {
            const day = i + j + 1;
            const dayStr = usePadding ? String(day).padStart(3, '0') : String(day);
            const filename = `${grade.id}-grade-day-${dayStr}.html`;
            
            weekLessons.push({
                day,
                filename,
                title: day % 5 === 0 ? `Day ${day}: Assessment` : `Day ${day}: Lesson`
            });
        }
        
        weeks.push({
            number: weekNum,
            lessons: weekLessons
        });
    }
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${grade.name} ELA Ebook & Lesson Browser</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif;
            background: linear-gradient(135deg, #305853 0%, #1B2A30 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #305853 0%, #1B2A30 100%);
            color: white;
            padding: 30px;
            border-radius: 20px 20px 0 0;
            text-align: center;
            border: 4px solid #B06821;
        }
        
        .header h1 {
            font-size: 2.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            margin-bottom: 10px;
        }
        
        .back-button {
            position: absolute;
            top: 20px;
            left: 20px;
            background: #B06821;
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.2rem;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            border: 3px solid white;
        }
        
        .back-button:hover {
            background: #9E2C21;
            transform: scale(1.05);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 0 0 20px 20px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border: 4px solid #B06821;
            border-top: none;
        }
        
        .tabs {
            background: #E0F2F1;
            padding: 15px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
            border: 3px solid #305853;
        }
        
        .tab-button {
            background: white;
            color: #305853;
            border: none;
            padding: 12px 24px;
            margin: 5px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            border: 2px solid #305853;
        }
        
        .tab-button.active {
            background: #B06821;
            color: white;
        }
        
        .tab-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .lessons-section {
            background: linear-gradient(to bottom, #E6F3FF 0%, #FFF 100%);
            padding: 30px;
            border-radius: 15px;
            border: 3px solid #B8D4F1;
        }
        
        .lessons-section h2 {
            color: #305853;
            font-size: 2rem;
            text-align: center;
            margin-bottom: 30px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        
        .week-section {
            margin-bottom: 30px;
        }
        
        .week-header {
            background: #305853;
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 15px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .lesson-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .lesson-card {
            background: linear-gradient(135deg, #B06821 0%, #9E2C21 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            border: 3px solid #9E2C21;
            text-decoration: none;
            display: block;
        }
        
        .lesson-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        }
        
        .lesson-number {
            background: white;
            color: #B06821;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            font-size: 1.5rem;
            font-weight: bold;
            border: 3px solid #9E2C21;
        }
        
        .lesson-title {
            font-size: 1.1rem;
            font-weight: bold;
        }
        
        .lesson-card.assessment {
            background: linear-gradient(135deg, #305853 0%, #1B2A30 100%);
            border-color: #305853;
        }
        
        .lesson-card.assessment .lesson-number {
            background: white;
            color: #305853;
            border-color: #305853;
        }
        
        .print-button {
            background: #B06821;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            margin: 20px auto;
            display: block;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            border: 3px solid #9E2C21;
        }
        
        .print-button:hover {
            background: #9E2C21;
            transform: scale(1.05);
        }
        
        @media print {
            body {
                background: white;
            }
            .back-button, .tabs, .print-button {
                display: none;
            }
        }
    </style>
</head>
<body>
    <a href="parent-ebooks.html" class="back-button">← Back</a>
    
    <div class="header">
        <h1>📚 ${grade.name} ELA Ebook & Answer Key</h1>
        <p style="font-size: 1.2rem; margin-top: 10px;">${grade.lessons} Complete Lessons</p>
    </div>
    
    <div class="container">
        <div class="tabs">
            <button class="tab-button active">Lessons</button>
        </div>
        
        <button class="print-button" onclick="window.print()">🖨️ Print This Page</button>
        
        <div class="lessons-section">
            <h2>📖 Lessons</h2>
            
            ${weeks.map(week => `
            <div class="week-section">
                <div class="week-header">Week ${week.number}</div>
                <div class="lesson-grid">
                    ${week.lessons.map(lesson => `
                    <a href="../${lesson.filename}" class="lesson-card${lesson.day % 5 === 0 ? ' assessment' : ''}" target="_blank">
                        <div class="lesson-number">
                            ${lesson.day}
                        </div>
                        <div class="lesson-title">
                            ${lesson.day % 5 === 0 ? '📝 Assessment' : '📚 Lesson'}
                        </div>
                        <div style="font-size: 0.85rem; margin-top: 8px; opacity: 0.9;">Click to open • Cmd+P to print</div>
                    </a>
                    `).join('')}
                </div>
            </div>
            `).join('')}
        </div>
        
        <button class="print-button" onclick="window.print()">🖨️ Print This Page</button>
    </div>
    
    <script>
        // Track which lessons have been completed
        const completedLessons = JSON.parse(localStorage.getItem('bedrockela_${grade.id}_completed') || '[]');
        
        // Mark completed lessons
        completedLessons.forEach(day => {
            const card = document.querySelector(\`[href*="day-\${day}.html"]\`);
            if (card) {
                card.style.opacity = '0.7';
                const checkmark = document.createElement('div');
                checkmark.style.cssText = 'position: absolute; top: 5px; right: 5px; font-size: 1.5rem;';
                checkmark.textContent = '✅';
                card.style.position = 'relative';
                card.appendChild(checkmark);
            }
        });
    </script>
</body>
</html>`;
    
    return html;
}

function main() {
    console.log('📚 Creating Lesson Browser Pages...\n');
    
    fs.mkdirSync('ebooks', { recursive: true });
    
    grades.forEach(grade => {
        const html = createLessonBrowser(grade);
        const filename = `ebooks/${grade.id}-grade-lesson-browser.html`;
        
        fs.writeFileSync(filename, html);
        console.log(`✅ Created: ${filename}`);
    });
    
    console.log('\n✅ All lesson browsers created!');
    console.log('📁 Files saved to: ebooks/');
    console.log('\nTo view: open ebooks/4th-grade-lesson-browser.html');
}

main();
