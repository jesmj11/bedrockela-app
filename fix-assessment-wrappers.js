#!/usr/bin/env node

/**
 * Fix Assessment Days - Add safeInitLesson Wrapper
 * Adds the safety wrapper to all assessment days that are missing it
 */

const fs = require('fs');
const path = require('path');

// Assessment days for each grade
const grades = {
    '4th-grade': [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180],
    '5th-grade': [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180],
    '6th-grade': [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180],
    '8th-grade': [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180],
};

const safeInitWrapper = `
        // Wait for DOM and all scripts to load before initializing
        function safeInitLesson() {
            if (typeof initLessonViewer === 'function') {
                initLessonViewer(lessonCONFIG_NAMEConfig);
            } else {
                console.error('initLessonViewer function not found!');
                // Retry after a short delay
                setTimeout(safeInitLesson, 100);
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', safeInitLesson);
        } else {
            // DOM already loaded
            safeInitLesson();
        }`;

let totalFixed = 0;
let totalSkipped = 0;
let totalErrors = 0;

function padDay(day) {
    return String(day).padStart(3, '0');
}

function fixAssessmentDay(grade, day) {
    const paddedDay = padDay(day);
    const filename = `${grade}-day-${paddedDay}.html`;
    
    if (!fs.existsSync(filename)) {
        console.log(`⚠️  ${filename} not found (skipping)`);
        totalSkipped++;
        return;
    }
    
    let content = fs.readFileSync(filename, 'utf8');
    
    // Check if it already has safeInitLesson
    if (content.includes('function safeInitLesson')) {
        console.log(`✓ ${filename} already has wrapper`);
        totalSkipped++;
        return;
    }
    
    // Find the config variable name (e.g., lesson5Config, lesson10Config)
    const configMatch = content.match(/const\s+(lesson\d+Config)\s*=/);
    if (!configMatch) {
        console.log(`⚠️  ${filename} - couldn't find config variable`);
        totalErrors++;
        return;
    }
    
    const configName = configMatch[1].replace('Config', '');
    
    // Check if it has the old direct call pattern
    const oldPattern = /if\s*\(typeof\s+initLessonViewer\s*===\s*['"]function['"]\)\s*{\s*initLessonViewer\([^)]+\);\s*}/;
    
    if (!oldPattern.test(content)) {
        console.log(`⚠️  ${filename} - unexpected script format`);
        totalErrors++;
        return;
    }
    
    // Create backup
    fs.writeFileSync(`${filename}.backup`, content);
    
    // Replace the old pattern with the new wrapper
    const wrapper = safeInitWrapper.replace(/lessonCONFIG_NAMEConfig/g, configMatch[1]);
    
    content = content.replace(
        oldPattern,
        wrapper.trim()
    );
    
    // Write the fixed file
    fs.writeFileSync(filename, content);
    
    console.log(`✅ Fixed ${filename}`);
    totalFixed++;
}

function main() {
    console.log('🔧 Fixing Assessment Days - Adding safeInitLesson Wrapper\n');
    
    for (const [grade, days] of Object.entries(grades)) {
        console.log(`\n📚 Processing ${grade}...`);
        for (const day of days) {
            fixAssessmentDay(grade, day);
        }
    }
    
    console.log('\n================================');
    console.log('📊 Summary:');
    console.log(`  Fixed: ${totalFixed} files`);
    console.log(`  Skipped: ${totalSkipped} files`);
    console.log(`  Errors: ${totalErrors} files`);
    console.log('================================\n');
    
    if (totalFixed > 0) {
        console.log('✅ Done! Assessment days are now safe from blue screens.');
        console.log('\nNext steps:');
        console.log('1. Test a few files locally (open in browser)');
        console.log('2. Run: firebase deploy --only hosting');
        console.log('3. Test in production');
    }
}

main();
