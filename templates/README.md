# BedrockELA Lesson Templates

## Official Lesson UI (lesson-template.html)

**Last Updated:** March 24, 2026

This is the **official, approved UI** for all BedrockELA lesson pages across all grades (3rd-8th).

### Design Principles

1. **Simple & Clean** - No complexity, nothing to break
2. **One File** - All CSS and JS inline, no external dependencies
3. **Bedrock Spine Structure** - 11 pages, consistent across all lessons
4. **Clear Navigation** - Top bar + bottom controls

### Structure

**Top Navigation:**
- ← Home button (→ student-dashboard.html)
- Lesson title in center
- Page progress on right ("Page X of 11")

**11-Page Bedrock Spine:**
1. **Title Page** - Lesson number, chapter title, book name, grade
2. **Welcome & Objectives** - Introduction and learning goals
3. **Vocabulary** - 3 words with definitions
4. **Vocabulary Practice** - Interactive matching/fill-in
5. **Story Part 1** - First third of chapter text
6. **Story Part 2** - Second third of chapter text
7. **Story Part 3** - Final third of chapter text
8. **Comprehension** - 2-3 questions about the reading
9. **Grammar/Language** - Alternates by day (odd=grammar, even=language)
10. **Informational Text** - Background/context passage
11. **Writing/Journal** - Reflection or writing prompt

**Bottom Navigation:**
- ← Previous button
- Visual progress bar (fills as student advances)
- Next → button

### Usage in Generators

All lesson generators should:

1. Read `templates/lesson-template.html`
2. Replace placeholder content:
   - `Lesson 1` → actual lesson number
   - `Chapter Title` → actual chapter title
   - `Book Name` → actual book name
   - `7th Grade` → actual grade level
   - Content sections → actual chapter text, vocab, questions
3. Write to `curriculum/gradeX/Xth-grade-lesson-XXX.html`

### Key Features

- **Responsive** - Works on mobile, tablet, desktop
- **Accessible** - Semantic HTML, keyboard navigation
- **No Dependencies** - Zero external files, libraries, or scripts
- **Foolproof** - 30 lines of JavaScript, impossible to break

### Color Palette

- **Deep Teal:** `#305853` (primary, navigation)
- **Golden Amber:** `#B06821` (headings, accents)
- **White:** `#FFFFFF` (background)
- **Light Gray:** `#f5f5f5` (page background)
- **Medium Gray:** `#666` (secondary text)

### Do NOT:

- ❌ Add external CSS files
- ❌ Add external JS libraries
- ❌ Complicate the navigation
- ❌ Change the 11-page structure
- ❌ Add features that can break

### Maintenance

If changes are needed:
1. Update `templates/lesson-template.html`
2. Update this README
3. Regenerate affected lessons
4. Test thoroughly before deploying

**Keep it simple. Keep it working.**
