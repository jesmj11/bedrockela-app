#!/usr/bin/env node

/**
 * Fix Minified Assessment Days - Add safeInitLesson Wrapper
 * Handles minified HTML files with different formatting
 */

const fs = require('fs');

// Assessment days that failed (from previous run)
const filesToFix = [
    '4th-grade-day-035.html',
    '4th-grade-day-040.html',
    '4th-grade-day-045.html',
    '4th-grade-day-050.html',
    '4th-grade-day-055.html',
    '4th-grade-day-060.html',
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
let skipped = 0;

filesToFix.forEach(filename => {
    if (!fs.existsSync(filename)) {
        console.log(`⚠️  ${filename} not found`);
        skipped++;
        return;
    }
    
    let content = fs.readFileSync(filename, 'utf8');
    
    // Check if already has wrapper
    if (content.includes('function safeInitLesson')) {
        console.log(`✓ ${filename} already has wrapper`);
        skipped++;
        return;
    }
    
    // Find config name (minified version)
    const configMatch = content.match(/const\s+(lesson\d+Config)\s*=/);
    if (!configMatch) {
        console.log(`⚠️  ${filename} - couldn't find config`);
        skipped++;
        return;
    }
    
    const configName = configMatch[1];
    
    // Create backup
    fs.writeFileSync(`${filename}.backup`, content);
    
    // Replace the direct initLessonViewer call with wrapper
    // Pattern: if(typeof initLessonViewer==='function')initLessonViewer(lessonXConfig);
    const oldPattern = new RegExp(
        `if\\s*\\(\\s*typeof\\s+initLessonViewer\\s*===?\\s*['"]function['"]\\s*\\)\\s*initLessonViewer\\s*\\(\\s*${configName}\\s*\\)\\s*;?`,
        'g'
    );
    
    const wrapper = `function safeInitLesson(){if(typeof initLessonViewer==='function'){initLessonViewer(${configName});}else{setTimeout(safeInitLesson,100);}}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',safeInitLesson);}else{safeInitLesson();}`;
    
    content = content.replace(oldPattern, wrapper);
    
    // Write fixed version
    fs.writeFileSync(filename, content);
    console.log(`✅ Fixed ${filename}`);
    fixed++;
});

console.log(`\n📊 Fixed: ${fixed} files, Skipped: ${skipped} files`);
