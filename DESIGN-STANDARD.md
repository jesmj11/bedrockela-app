# 🔒 BedrockELA Official Design Standard

**Status:** LOCKED IN  
**Approved:** 2026-03-25  
**Applies To:** ALL grades (4-8), ALL future lessons

---

## 📐 The Clean Template

This design is **set in stone**. All BedrockELA lessons MUST use this exact structure.

### Visual Reference

![Approved Design](approved-lesson-layout.png)

**Top Navigation:**
```
┌────────────────────────────────────────────────────────┐
│ ← Home  │  Lesson 1: CHAPTER TITLE  │  Page 1 of 11   │
└────────────────────────────────────────────────────────┘
```

**Bottom Navigation:**
```
┌────────────────────────────────────────────────────────┐
│ ← Previous │ ████████░░░░░░░░░░░░ │ Next →           │
└────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Specifications

### Top Navigation Bar
- **Background:** Deep Teal (`#305853`)
- **Position:** Sticky (top: 0)
- **Height:** Auto (padding: 15px 20px)
- **Layout:** Three-column flex
  - **Left:** Home button
  - **Center:** Lesson title
  - **Right:** Page progress

**Home Button:**
- Text: "← Home"
- Link: `../student-dashboard.html`
- Style: Translucent white background, rounded corners
- Hover: Slightly brighter background

**Page Progress:**
- Format: "Page X of Y"
- Updates dynamically via JavaScript
- Font size: 0.9rem
- Opacity: 0.9

### Bottom Navigation Bar
- **Position:** Sticky (bottom: 0)
- **Border:** 2px solid #eee (top only)
- **Layout:** Three-item flex
  - Previous button (left)
  - Progress bar (center, flex: 1)
  - Next button (right)

**Navigation Buttons:**
- Padding: 12px 24px
- Background: Deep Teal (`#305853`)
- Border radius: 6px
- Disabled state: Gray background (#ccc)
- Hover: Slightly darker teal (`#3d6b65`)

**Progress Bar:**
- Height: 8px
- Background: Light gray (#eee)
- Fill: Gradient (Deep Teal → Golden Amber)
- Border radius: 10px
- Smooth transition (0.3s)

### Page Content
- **Max width:** 800px
- **Centered:** Auto margins
- **Background:** White
- **Padding:** 40px 30px 80px
- **Min height:** calc(100vh - 120px)

### Color Palette
```css
Deep Teal:     #305853  /* Primary navigation */
Golden Amber:  #B06821  /* Headings, accents */
White:         #FFFFFF  /* Content background */
Light Gray:    #F5F5F5  /* Page background */
Dark Gray:     #333333  /* Body text */
```

### Typography
- **Body:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **H1:** 2rem, color: Deep Teal
- **H2:** 1.5rem, color: Golden Amber
- **H3:** 1.25rem, color: Deep Teal
- **Line height:** 1.6 (body), 1.8 (paragraphs)

---

## 📄 11-Page Structure

Every regular lesson (non-assessment) MUST have exactly 11 pages:

1. **Title Page** - Emoji, lesson number, chapter title, book info
2. **Welcome & Objectives** - Learning goals for the day
3. **Vocabulary** - Word definitions with example sentences
4. **Vocabulary Practice** - Interactive word practice
5. **Story Part 1** - First third of chapter text
6. **Story Part 2** - Second third of chapter text
7. **Story Part 3** - Final third of chapter text
8. **Comprehension** - Reading questions (2-3)
9. **Grammar/Language** - Alternating odd/even days
10. **Informational Text** - Historical/contextual content
11. **Writing/Journal** - Alternating odd/even days

**Assessment days (every 5th):** Different structure (8 pages TBD)

---

## 🔧 Implementation

### Template File
**Primary:** `lesson-template-clean.js`

### Build Scripts
- `build-4th-grade-clean.js` ✅
- `build-5th-grade-clean.js` ✅
- `build-6th-grade-clean.js` ✅
- `build-7th-grade-clean.js` ✅
- `build-8th-grade-clean.js` ✅

### JavaScript Requirements
- Page navigation (prev/next)
- Keyboard support (arrow keys)
- Progress bar updates
- Smooth scrolling to top on page change
- Button disable states

---

## ✅ Current Status

| Grade | Lessons Built | Status |
|-------|--------------|--------|
| 4th   | 185/180*     | ✅ Complete + extras |
| 5th   | 24/180       | 🟡 Robin Hood only (Days 1-30) |
| 6th   | 120/180      | 🟡 Need Days 151-180 |
| 7th   | 72/180       | 🟡 Need Days 91-180 |
| 8th   | 120/180      | 🟡 Need Days 151-180 |

**All existing lessons use the approved clean design.**

---

## 🚫 What NOT to Change

**NEVER modify:**
- Top nav structure (Home | Title | Progress)
- Bottom nav structure (Prev | Bar | Next)
- Color scheme (Deep Teal + Golden Amber)
- 11-page lesson structure
- Page navigation behavior
- Sticky positioning
- Max-width container (800px)

**These are LOCKED.**

---

## ✏️ What CAN Change

**Allowed modifications:**
- Individual lesson content (text, vocab, questions)
- Book selections for incomplete units
- Assessment page structure (still TBD)
- Emoji choices per book/chapter
- Informational text content

---

## 📋 Quality Checklist

Before deploying ANY lesson, verify:

- [ ] Home button links to `../student-dashboard.html`
- [ ] Page counter shows "Page X of Y"
- [ ] Progress bar fills correctly
- [ ] Previous button disabled on page 1
- [ ] Next button disabled on last page
- [ ] Arrow keys navigate pages
- [ ] Smooth scroll to top on page change
- [ ] All 11 pages present and ordered correctly
- [ ] Colors match specification
- [ ] Max-width container is 800px
- [ ] Typography matches specification

---

## 🔐 Approval

**This design is approved and locked.** Any deviations require explicit approval.

**Template reference:** `curriculum/grade6/6th-grade-lesson-001.html`  
**Git commit:** a1beed31 (2026-03-25)

---

**Last updated:** 2026-03-25  
**Version:** 1.0 (FINAL)
