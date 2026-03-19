# 🚨 LESSON FORMAT RULES - NEVER BREAK THESE!

## ✅ Correct Format (ALWAYS USE THIS)

```javascript
{
    render: () => `
        <div class="lesson-page-card content-page">
            <h2>Page Title</h2>
            <p>Content here...</p>
        </div>
    `
}
```

## ❌ WRONG Format (NEVER USE THIS)

```javascript
{
    "type": "content",
    "content": `<h2>Page Title</h2>`
}
```

## Why This Matters

The lesson-viewer.js **requires** pages to have a `render()` function. The old JSON format causes:
- Blue screens
- "X is not defined" JavaScript errors
- Complete failure to load content

## Required Structure for Every Page

1. **Must have `render: () =>` function**
2. **Must wrap content in `<div class="lesson-page-card">`**
3. **Title page uses:** `<div class="lesson-page-card title-page">`
4. **All other pages use:** `<div class="lesson-page-card content-page">`

## Cache Prevention (ALWAYS INCLUDE)

### In HTML `<head>`:
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### For CSS/JS includes:
```html
<link rel="stylesheet" href="css/lesson-viewer.css?v=${Date.now()}">
<script src="js/lesson-viewer.js?v=${Date.now()}"></script>
```

## Textbox Standards

All textareas MUST have:
```html
<textarea 
    id="unique-id" 
    rows="X" 
    placeholder="Your answer..." 
    style="height: XXXpx; width: 100%; box-sizing: border-box;">
</textarea>
<p class="word-count">
    Word count: <span id="unique-id-count">0</span> / XX-XX
</p>
```

Heights:
- Vocab: 120px (20-30 words)
- Comprehension: 150px (75-100 words)
- Info questions: 120px (40-50 words)
- Writing/Journal: 200px (100-150 words)

## Generator Scripts (DO NOT MODIFY WITHOUT TESTING)

**Correct generators:**
- `/bedrockela-website-/generate-4th-grade-bedrock-spine.js` (Days 1-29)
- `/bedrockela-app/generate-days-31-180.js` (Days 31-180)
- `/bedrockela-app/generate-assessments.js` (Assessment days)

**These are now locked in with the correct format. DO NOT edit unless you:**
1. Test changes on a single lesson first
2. Run the validation script (validate-lesson-format.js)
3. Test in browser incognito mode
4. Deploy and test again

## Testing Workflow (MANDATORY)

Before deploying ANY lesson changes:

1. **Run validation:** `node validate-lesson-format.js`
2. **Test locally:** Open file in browser, check all pages
3. **Deploy to Firebase**
4. **Test in incognito:** Force fresh load (Cmd+Shift+R)
5. **Check console:** Look for JavaScript errors (F12)

## Service Worker Protection

The service worker (`sw.js`) is configured to:
- ✅ NEVER cache lesson HTML files (`*-grade-day-*.html`)
- ✅ Always fetch fresh from server
- ✅ Only cache static assets (CSS, JS, images)

**Do NOT modify the service worker's lesson-skipping logic without understanding the consequences.**

## Emergency Fixes

If students report blue screens:

1. **Check format:** `node validate-lesson-format.js [filename]`
2. **Force cache clear:** Send students to `/update-checker.html`
3. **Verify deployment:** Check Firebase console for successful deploy
4. **Test yourself:** Open in incognito mode

## Red Flags

If you see these in a lesson file, **IT'S BROKEN:**
- ❌ `"type": "content"`
- ❌ `"type": "vocabulary"`
- ❌ `"type": "reading"`
- ❌ Pages without `render: () =>`
- ❌ Content not wrapped in `<div class="lesson-page-card">`
- ❌ Fixed version numbers like `?v=1772665488` instead of `?v=${Date.now()}`

## Bottom Line

**The format is FIXED. Don't change the generators. If you need to modify lessons, use the correct `render: () =>` format and test thoroughly.**
