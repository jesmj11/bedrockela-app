#!/usr/bin/env node

/**
 * Fix 8th Grade Assessment Days with underscore naming
 */

const fs = require('fs');

const files = [
    '8th-grade-day-080.html',
    '8th-grade-day-085.html',
    '8th-grade-day-090.html',
    '8th-grade-day-095.html',
    '8th-grade-day-100.html',
    '8th-grade-day-105.html',
    '8th-grade-day-110.html',
    '8th-grade-day-115.html',
    '8th-grade-day-120.html',
];

let fixed = 0;

files.forEach(filename => {
    if (!fs.existsSync(filename)) {
        console.log(`⚠️  ${filename} not found`);
        return;
    }
    
    let content = fs.readFileSync(filename, 'utf8');
    
    // Check if already has wrapper
    if (content.includes('function safeInitLesson')) {
        console.log(`✓ ${filename} already has wrapper`);
        return;
    }
    
    // Find config name (8th_grade_day_080Config pattern)
    const configMatch = content.match(/const\s+(\d+th_grade_day_\d+Config)\s*=/);
    if (!configMatch) {
        console.log(`⚠️  ${filename} - couldn't find config`);
        return;
    }
    
    const configName = configMatch[1];
    
    // Create backup
    fs.writeFileSync(`${filename}.backup`, content);
    
    // Replace the init call
    const oldPattern = new RegExp(
        `if\\s*\\(\\s*typeof\\s+initLessonViewer\\s*===\\s*['"]function['"]\\s*\\)\\s*{\\s*initLessonViewer\\(\\s*${configName}\\s*\\);\\s*}`,
        'g'
    );
    
    const wrapper = `
function safeInitLesson() {
    if (typeof initLessonViewer === 'function') {
        initLessonViewer(${configName});
    } else {
        console.error('initLessonViewer function not found!');
        setTimeout(safeInitLesson, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInitLesson);
} else {
    safeInitLesson();
}`;
    
    content = content.replace(oldPattern, wrapper);
    
    fs.writeFileSync(filename, content);
    console.log(`✅ Fixed ${filename}`);
    fixed++;
});

console.log(`\n📊 Fixed: ${fixed} files`);
