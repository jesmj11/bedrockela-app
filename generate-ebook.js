#!/usr/bin/env node

/**
 * Generate Printable ELA Ebooks by Grade
 * Creates print-friendly PDFs of all lessons for offline access
 */

const fs = require('fs');
const path = require('path');

// Grade configurations
const grades = {
    '1st': { lessons: 180, title: '1st Grade ELA Complete Curriculum', usePadding: false },
    '2nd': { lessons: 180, title: '2nd Grade ELA Complete Curriculum', usePadding: false },
    '3rd': { lessons: 180, title: '3rd Grade ELA Complete Curriculum', usePadding: false },
    '4th': { lessons: 180, title: '4th Grade ELA Complete Curriculum', usePadding: true },
    '5th': { lessons: 180, title: '5th Grade ELA Complete Curriculum', usePadding: true },
    '6th': { lessons: 168, title: '6th Grade ELA Complete Curriculum', usePadding: true }, // Days 1-168 only
    '8th': { lessons: 180, title: '8th Grade ELA Complete Curriculum', usePadding: true },
};

function extractLessonContent(htmlFile) {
    try {
        const html = fs.readFileSync(htmlFile, 'utf8');
        
        // Extract title
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : 'Lesson';
        
        // Extract config pages (simplified - just get the render functions)
        const pages = [];
        const pageMatches = html.matchAll(/render:\s*\(\)\s*=>\s*`([\s\S]*?)`/g);
        
        for (const match of pageMatches) {
            let content = match[1];
            // Strip HTML tags for print
            content = content.replace(/<script.*?<\/script>/gs, '');
            content = content.replace(/<style.*?<\/style>/gs, '');
            pages.push(content);
        }
        
        return { title, pages };
    } catch (err) {
        console.error(`Error reading ${htmlFile}:`, err.message);
        return null;
    }
}

function generatePrintableHTML(grade, gradeConfig) {
    const lessons = [];
    
    console.log(`\n📚 Processing ${grade} Grade...`);
    
    for (let day = 1; day <= gradeConfig.lessons; day++) {
        const dayStr = gradeConfig.usePadding ? String(day).padStart(3, '0') : String(day);
        const filename = `${grade}-grade-day-${dayStr}.html`;
        
        if (!fs.existsSync(filename)) {
            if (day % 20 === 0) console.log(`  ⚠️  Missing: ${filename}`);
            continue;
        }
        
        const lesson = extractLessonContent(filename);
        if (lesson) {
            lessons.push({
                day,
                ...lesson
            });
            if (day % 20 === 0) console.log(`  ✓ Processed ${day} lessons`);
        }
    }
    
    console.log(`  ✅ Total: ${lessons.length} lessons extracted`);
    
    // Generate printable HTML
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${gradeConfig.title}</title>
    <style>
        @page {
            size: letter;
            margin: 0.75in;
        }
        
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #000;
            max-width: 100%;
        }
        
        .cover-page {
            page-break-after: always;
            text-align: center;
            padding-top: 3in;
        }
        
        .cover-page h1 {
            font-size: 36pt;
            margin-bottom: 20px;
            color: #305853;
        }
        
        .cover-page p {
            font-size: 16pt;
            color: #666;
        }
        
        .toc {
            page-break-after: always;
        }
        
        .toc h2 {
            font-size: 24pt;
            margin-bottom: 30px;
            border-bottom: 2px solid #305853;
            padding-bottom: 10px;
        }
        
        .toc-entry {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dotted #ccc;
        }
        
        .lesson {
            page-break-before: always;
            margin-bottom: 40px;
        }
        
        .lesson-header {
            background: #305853;
            color: white;
            padding: 15px;
            margin-bottom: 20px;
        }
        
        .lesson-header h2 {
            margin: 0;
            font-size: 20pt;
        }
        
        .lesson-page {
            margin-bottom: 30px;
            padding: 20px;
            border-left: 3px solid #B06821;
        }
        
        .lesson-page h2 {
            color: #305853;
            font-size: 16pt;
            margin-top: 0;
        }
        
        .lesson-page h3 {
            color: #666;
            font-size: 14pt;
        }
        
        textarea, input {
            border: 1px solid #ccc;
            width: 100%;
            min-height: 80px;
            margin: 10px 0;
            padding: 10px;
            font-family: inherit;
        }
        
        @media print {
            .no-print {
                display: none;
            }
            
            a {
                text-decoration: none;
                color: #000;
            }
            
            .lesson {
                page-break-inside: avoid;
            }
        }
        
        @media screen {
            body {
                background: #f5f5f5;
                padding: 20px;
            }
            
            .container {
                max-width: 8.5in;
                margin: 0 auto;
                background: white;
                padding: 40px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            
            .print-button {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 30px;
                background: #305853;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }
            
            .print-button:hover {
                background: #1B2A30;
            }
        }
    </style>
</head>
<body>
    <button class="print-button no-print" onclick="window.print()">🖨️ Print Ebook</button>
    
    <div class="container">
        <!-- Cover Page -->
        <div class="cover-page">
            <h1>${gradeConfig.title}</h1>
            <p>180 Days of Complete ELA Instruction</p>
            <p style="margin-top: 40px;">BedrockELA Homeschool Curriculum</p>
            <p style="font-size: 12pt; color: #999; margin-top: 80px;">© ${new Date().getFullYear()} • For educational use only</p>
        </div>
        
        <!-- Table of Contents -->
        <div class="toc">
            <h2>📖 Table of Contents</h2>
            ${lessons.map((lesson, idx) => `
            <div class="toc-entry">
                <span>Day ${lesson.day}: ${lesson.title.replace(/Day \d+ - /g, '')}</span>
                <span>Page ${idx + 3}</span>
            </div>
            `).join('')}
        </div>
        
        <!-- Lessons -->
        ${lessons.map(lesson => `
        <div class="lesson" id="day-${lesson.day}">
            <div class="lesson-header">
                <h2>Day ${lesson.day}: ${lesson.title.replace(/Day \d+ - /g, '').replace(/<.*?>/g, '')}</h2>
            </div>
            
            ${lesson.pages.map((page, idx) => `
            <div class="lesson-page">
                <h3>Page ${idx + 1}</h3>
                ${page}
            </div>
            `).join('')}
        </div>
        `).join('')}
    </div>
    
    <script>
        // Clean up textarea placeholders for print
        document.querySelectorAll('textarea').forEach(ta => {
            ta.placeholder = '';
        });
    </script>
</body>
</html>`;
    
    // Write to file
    const outputFile = `ebooks/${grade}-grade-complete-ebook.html`;
    fs.mkdirSync('ebooks', { recursive: true });
    fs.writeFileSync(outputFile, html);
    
    console.log(`  📄 Generated: ${outputFile}`);
    console.log(`  💾 Size: ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB`);
    
    return outputFile;
}

function main() {
    console.log('📚 BedrockELA Ebook Generator\n');
    console.log('Creating printable ebooks for offline access...\n');
    
    const generated = [];
    
    for (const [grade, config] of Object.entries(grades)) {
        const file = generatePrintableHTML(grade, config);
        generated.push({ grade, file });
    }
    
    console.log('\n✅ All ebooks generated!\n');
    console.log('📁 Files saved to: ebooks/\n');
    console.log('To view:');
    generated.forEach(({ grade, file }) => {
        console.log(`  open ${file}`);
    });
    
    console.log('\nTo print: Open each file and use browser Print (Cmd+P)');
    console.log('Recommended: Print to PDF for digital distribution\n');
}

main();
