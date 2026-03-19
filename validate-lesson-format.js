#!/usr/bin/env node

/**
 * Lesson Format Validator
 * 
 * Run this BEFORE deploying to catch format errors early.
 * 
 * Usage:
 *   node validate-lesson-format.js                    # Check all lessons
 *   node validate-lesson-format.js 4th-grade-day-004.html  # Check specific file
 */

const fs = require('fs');
const path = require('path');

let totalFiles = 0;
let passedFiles = 0;
let failedFiles = 0;
const errors = [];

function validateLesson(filePath) {
  const fileName = path.basename(filePath);
  totalFiles++;
  
  console.log(`\n🔍 Checking ${fileName}...`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check 1: Has render function format
    if (!content.includes('render: () => `')) {
      issues.push('❌ Missing "render: () => `" format');
    }
    
    // Check 2: NO old JSON format
    if (content.match(/{\s*"type":\s*"(content|vocabulary|reading|comprehension|grammar|info|writing)"/)) {
      issues.push('❌ CRITICAL: Found old JSON format ("type": "...")');
    }
    
    // Check 3: Has lesson-page-card divs
    if (!content.includes('lesson-page-card')) {
      issues.push('❌ Missing "lesson-page-card" wrapper divs');
    }
    
    // Check 4: Has cache prevention meta tags
    if (!content.includes('Cache-Control')) {
      issues.push('⚠️  Missing cache prevention meta tags');
    }
    
    // Check 5: Has timestamp cache busting
    if (content.includes('?v=1772665488') || content.includes('?v=1710')) {
      issues.push('⚠️  Uses fixed version instead of ${Date.now()}');
    }
    
    // Check 6: Has initLessonViewer call
    if (!content.includes('initLessonViewer(')) {
      issues.push('❌ Missing initLessonViewer() call');
    }
    
    // Check 7: Has lessonConfig
    const configMatch = content.match(/const\s+lesson\d+Config\s*=/);
    if (!configMatch) {
      issues.push('❌ Missing lesson config definition');
    }
    
    // Check 8: Has pages array
    if (!content.includes('pages: [')) {
      issues.push('❌ Missing pages array');
    }
    
    // Check 9: Textboxes have full width styling
    const textareas = content.match(/<textarea[^>]*>/g) || [];
    const missingFullWidth = textareas.filter(ta => 
      !ta.includes('width: 100%') || !ta.includes('box-sizing: border-box')
    );
    if (missingFullWidth.length > 0) {
      issues.push(`⚠️  ${missingFullWidth.length} textareas missing full-width styling`);
    }
    
    // Report results
    if (issues.length === 0) {
      console.log(`   ✅ PASS - All checks passed`);
      passedFiles++;
      return true;
    } else {
      console.log(`   ❌ FAIL - ${issues.length} issue(s) found:`);
      issues.forEach(issue => console.log(`      ${issue}`));
      failedFiles++;
      errors.push({ file: fileName, issues });
      return false;
    }
    
  } catch (error) {
    console.log(`   ❌ ERROR - Could not read file: ${error.message}`);
    failedFiles++;
    errors.push({ file: fileName, issues: [`Error: ${error.message}`] });
    return false;
  }
}

function main() {
  console.log('🔍 Lesson Format Validator\n');
  console.log('=' .repeat(60));
  
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Validate specific files
    args.forEach(file => {
      if (fs.existsSync(file)) {
        validateLesson(file);
      } else {
        console.log(`\n❌ File not found: ${file}`);
        failedFiles++;
      }
    });
  } else {
    // Validate all lesson files
    const lessonPattern = /^(1st|2nd|3rd|4th|5th|6th|7th|8th)-grade-(day|week)-\d+\.html$/;
    const files = fs.readdirSync('.')
      .filter(f => lessonPattern.test(f))
      .sort();
    
    if (files.length === 0) {
      console.log('\n⚠️  No lesson files found in current directory');
      console.log('   Run this script from the bedrockela-app directory\n');
      process.exit(1);
    }
    
    console.log(`Found ${files.length} lesson files to validate\n`);
    
    files.forEach(file => validateLesson(file));
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 VALIDATION SUMMARY\n');
  console.log(`   Total files checked: ${totalFiles}`);
  console.log(`   ✅ Passed: ${passedFiles}`);
  console.log(`   ❌ Failed: ${failedFiles}`);
  
  if (failedFiles > 0) {
    console.log('\n🚨 FAILED FILES:\n');
    errors.forEach(({ file, issues }) => {
      console.log(`   ${file}:`);
      issues.forEach(issue => console.log(`      ${issue}`));
    });
    console.log('\n⚠️  DO NOT DEPLOY - Fix errors first!\n');
    process.exit(1);
  } else {
    console.log('\n✅ All lessons passed validation!\n');
    console.log('   Safe to deploy to Firebase.\n');
    process.exit(0);
  }
}

main();
