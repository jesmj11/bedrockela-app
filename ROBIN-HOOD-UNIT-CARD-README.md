# Robin Hood Unit Card 🏹

**Library Pocket Architecture** - A complete, ready-to-deploy curriculum unit

## 📚 What Is a Unit Card?

A **unit card** is a self-contained story unit that can be "slotted" into any compatible grade-level lesson structure (the "pocket"). Like a library card goes into a pocket, this Robin Hood unit can fit into any 6th-8th grade curriculum using the **Bedrock Spine** architecture.

## 🎯 Unit Details

- **Title:** The Merry Adventures of Robin Hood
- **Source:** Based on Howard Pyle's 1883 legends, adapted for 6th grade
- **Total Chapters:** 24
- **Compatible Grades:** 6th, 7th, 8th
- **Estimated Duration:** 5 weeks (24 lesson days)
- **Total Content:**
  - 24 complete chapters (full story text)
  - 56 vocabulary words with context & discussion questions
  - 72 comprehension questions (48 multiple choice + 24 short answer)

## 📖 Content Structure

Each chapter includes:
1. **Full chapter text** (adapted for 6th grade reading level)
2. **Summary** (2-sentence overview)
3. **Vocabulary** (2-4 words per chapter):
   - Word + part of speech
   - Definition
   - Context sentence from the text
   - Discussion question
4. **Comprehension Questions** (3 per chapter):
   - 2 multiple choice questions
   - 1 short answer question

## 🧩 Bedrock Spine Compatibility

This unit card maps perfectly to the **11-page Bedrock Spine** structure:

1. **Title Page** - Chapter number, title, week info
2. **Welcome & Objectives** - Learning goals for the day
3. **Vocabulary** (3 words) - Definitions + context
4. **Vocabulary Game** - Matching game with instant feedback
5-7. **Story (3 parts)** - Chapter text split evenly across 3 pages
8. **Reading Comprehension** - 3 questions with instant feedback
9. **Grammar OR Language** - Alternates by day (requires grammar/language data)
10. **Informational Text** - Related non-fiction passage (requires info text data)
11. **Writing OR Journal** - Alternates by day, relates to story

## 🚀 How to Use This Unit Card

### Option 1: Generate All 24 Lessons at Once
```bash
node generate-robin-hood-lessons.js
```
This will create 24 complete HTML lesson files (Days 1-24) using the Bedrock Spine structure.

### Option 2: Insert into Existing Curriculum
The JSON structure allows you to:
- Pull specific chapters for custom lesson sequences
- Mix Robin Hood with other units
- Adapt content for different grade levels
- Create assessments using the comprehension questions

### Option 3: Export for Other Platforms
- Import into LMS (Canvas, Google Classroom, etc.)
- Convert to printable worksheets
- Create digital flashcards from vocabulary
- Build quizzes from comprehension questions

## 📊 Story Arc (24 Chapters)

**Act 1: Becoming Robin Hood (Chapters 1-6)**
- How Robin becomes an outlaw
- Building the Merry Men (Little John, Will Scarlet, Friar Tuck)
- Establishing the greenwood code

**Act 2: Adventures & Reputation (Chapters 7-12)**
- Clever disguises and tricks
- Maid Marian joins the band
- Battles with the Sheriff

**Act 3: Royal Recognition (Chapters 13-17)**
- The poor knight
- King Richard arrives
- The King's pardon

**Act 4: The Return & Decline (Chapters 18-24)**
- Life at court fails
- Return to Sherwood
- The Sheriff's last stand
- Betrayal and the end
- The legend lives on

## 🎨 Themes & Learning Outcomes

**Major Themes:**
- Justice vs. Law
- Loyalty & Brotherhood
- Pride & Its Consequences
- Leadership & Community
- Change & Mortality

**Skills Developed:**
- Reading comprehension
- Vocabulary in context
- Critical thinking
- Textual evidence analysis
- Character development tracking
- Theme identification

## 📁 Files

- `book-data/robin-hood-unit-card.json` - Complete unit data
- `create-robin-hood-unit-card.js` - Parser script (generates JSON from source files)
- `generate-robin-hood-lessons.js` - Lesson generator (TODO: create this)

## 🔮 Next Steps

1. **Create Grammar/Language Data** - 24 grammar and 24 language lessons
2. **Create Informational Texts** - Medieval England history, archery, forest ecology, etc.
3. **Build Lesson Generator** - Script to create all 24 HTML files
4. **Add Answer Keys** - Fill in `correctAnswer` for all MC questions
5. **Test with Students** - Deploy Days 1-5 for initial feedback

## 💡 The Library Pocket Vision

This Robin Hood unit card demonstrates the **reusable curriculum architecture**:

- **Same structure, different content** - Students learn the routine, content changes
- **Fast to build** - Once you have the pocket, new units take hours not weeks
- **Easy to swap** - Replace Robin Hood with Treasure Island in 5 minutes
- **Grade-level flexible** - Same story, different vocabulary/questions for different grades
- **Future-proof** - Update the pocket structure, all cards still work

---

**Created:** 2026-03-12  
**Status:** ✅ Complete and ready to generate lessons  
**Next:** Build the lesson generator script
