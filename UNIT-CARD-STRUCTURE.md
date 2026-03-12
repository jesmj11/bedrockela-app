# Unit Card Structure 📦

**File:** `book-data/robin-hood-complete-unit-card.json` (145 KB)

## What Is a Unit Card?

A **unit card** is a self-contained curriculum package that contains EVERYTHING needed to generate lessons for a story unit. It's like a "card" that can be inserted into any compatible grade-level "pocket" (lesson structure).

## Complete Robin Hood Unit Card

### Unit Metadata
- Title, author, grade level
- Total chapters, estimated weeks
- Themes, genre, compatibility info
- Lesson mapping (days, assessments)

### 24 Complete Chapters

Each chapter contains:

#### 1. Story Content ✅
- **Title** - Chapter title
- **Summary** - 2-sentence overview
- **Text** - Full chapter text (adapted for 6th grade)

#### 2. Vocabulary ✅
- **3 words per chapter** (6th grade = 3, adjusted by grade level)
- Each word includes:
  - Word + part of speech
  - Definition
  - Context sentence from the story
  - Discussion question

#### 3. Reading Comprehension ✅
- **3 questions per chapter**
  - 2 multiple choice (A/B/C/D options)
  - 1 short answer (with sample response)

#### 4. Grammar OR Language ✅
- **Alternates odd/even days**
- Odd days (1, 3, 6, 8, 11, 13, 16, 18, 21, 23): **Grammar**
- Even days (2, 4, 7, 9, 12, 14, 17, 19, 22, 24): **Language**
- Assessment days (5, 10, 15, 20): **Neither**
- Each lesson includes:
  - Topic
  - Instruction/explanation
  - Examples
  - Practice exercises

#### 5. Informational Text ✅
- **24 passages** (one per chapter, 200-250 words)
- Topics related to chapter themes:
  - Medieval history
  - Cultural context
  - Historical figures
  - Weapons, warfare, daily life
  - Social structures
- Historically accurate, age-appropriate

#### 6. Writing OR Journal Prompt ✅
- **Alternates Mon/Wed vs. Tue/Thu**
- Mon/Wed (odd days 1, 3, 6, 8, 11, 13, 16, 18, 21, 23): **Writing**
  - Personal narrative
  - Persuasive/argumentative
  - Reflective essays
  - Character analysis
- Tue/Thu (even days 2, 4, 7, 9, 12, 14, 17, 19, 22, 24): **Journal**
  - Ethical dilemmas
  - Discussion questions
  - Opinion & reflection
  - Theme exploration

## Day Pattern

| Day Type | Grammar/Language | Writing/Journal | Example |
|----------|------------------|-----------------|---------|
| Mon/Wed (Odd) | Grammar | Writing | Day 1, 3, 6, 8... |
| Tue/Thu (Even) | Language | Journal | Day 2, 4, 7, 9... |
| Friday (Assessment) | Neither | Neither | Day 5, 10, 15, 20 |

## Usage

### Generate Single Lesson
```javascript
const unitCard = require('./book-data/robin-hood-complete-unit-card.json');
const chapter = unitCard.chapters[0]; // Day 1

// Everything you need is in the chapter object:
// - chapter.text (story)
// - chapter.vocabulary (3 words)
// - chapter.comprehension (3 questions)
// - chapter.grammar (if odd day)
// - chapter.language (if even day)
// - chapter.informationalText
// - chapter.writingPrompt (if Mon/Wed)
// - chapter.journalPrompt (if Tue/Thu)
```

### Generate All 24 Lessons
```javascript
const unitCard = require('./book-data/robin-hood-complete-unit-card.json');

unitCard.chapters.forEach(chapter => {
  const lesson = generateLesson(chapter);
  saveLesson(`robin-hood-day-${chapter.day}.html`, lesson);
});
```

## Self-Contained = Portable

This unit card contains **everything** needed to generate lessons. No external files, no separate grammar/language databases, no dependency on other JSON files. 

**Benefits:**
- ✅ Easy to share (one file)
- ✅ Easy to version (git tracks changes to one file)
- ✅ Easy to adapt (copy, modify, generate new lessons)
- ✅ Easy to swap (replace Robin Hood card with Treasure Island card)

## Statistics

```json
{
  "totalChapters": 24,
  "totalVocabulary": 51,
  "totalComprehension": 72,
  "grammarLessons": 10,
  "languageLessons": 10,
  "informationalTexts": 24,
  "writingPrompts": 10,
  "journalPrompts": 10
}
```

**Total instructional pieces:** 175+ in one JSON file!

## Library Pocket Architecture

```
┌─────────────────────────────────────┐
│  UNIT CARD (Robin Hood)             │
│  - Complete story text              │
│  - All vocabulary                   │
│  - All comprehension                │
│  - All grammar/language             │
│  - All info texts                   │
│  - All writing/journal              │
└─────────────────────────────────────┘
                 ↓
         (insert into)
                 ↓
┌─────────────────────────────────────┐
│  POCKET (Bedrock Spine 11-page)     │
│  - Lesson template                  │
│  - Page navigation                  │
│  - Interactive components           │
│  - Progress tracking                │
└─────────────────────────────────────┘
                 ↓
         (generates)
                 ↓
┌─────────────────────────────────────┐
│  24 Complete HTML Lessons           │
└─────────────────────────────────────┘
```

## Next: Lesson Generator

Build script that:
1. Reads `robin-hood-complete-unit-card.json`
2. Loops through 24 chapters
3. For each chapter, applies Bedrock Spine template
4. Outputs `robin-hood-day-1.html` through `robin-hood-day-24.html`

Then repeat for any other story unit!

---

**Created:** 2026-03-12  
**File size:** 145 KB (1,876 lines)  
**Self-contained:** ✅ Yes  
**Ready for generation:** ✅ Yes
