# 🚀 Deployment Checklist

**Run through this EVERY TIME before deploying lesson changes.**

## Pre-Deployment (MANDATORY)

### 1. Validate Format
```bash
cd bedrockela-app
node validate-lesson-format.js
```

**Expected:** All checks pass (✅)

**If fails:** Fix errors before proceeding. DO NOT deploy broken lessons.

---

### 2. Test Locally
Open a lesson file directly in your browser:
- Open file in browser (File → Open)
- Click through all pages
- Check console for errors (F12 → Console)
- Verify textboxes are full width
- Verify content displays on all pages

---

### 3. Run Deployment
```bash
firebase deploy --only hosting
```

Wait for: `✔ Deploy complete!`

---

## Post-Deployment (MANDATORY)

### 4. Test in Incognito/Private Mode
Open lesson URL in **incognito/private window**:
- Chrome: Cmd+Shift+N (Mac) or Ctrl+Shift+N (Windows)
- Safari: Cmd+Shift+N
- Firefox: Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)

**Why:** Forces fresh load without cache

---

### 5. Verify Content Loads
- Navigate to: `https://bedrockela-96dbd.web.app/[lesson-file].html`
- Title page should appear immediately
- Click "Next →" through ALL pages
- Check that every page displays content (no blue screens)
- Check browser console for errors (F12)

---

### 6. Test Cache-Busting
After confirming it works in incognito:
- Open in normal browser
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Should load fresh content without issues

---

## If Problems Occur

### Students Report Blue Screens

**Immediate fix:**
Send them to: `https://bedrockela-96dbd.web.app/update-checker.html?auto=true`

This will:
- Clear all caches
- Unregister service workers
- Force fresh download
- Auto-reload

---

### Validation Fails

**Common issues:**

1. **"Missing render: () => format"**
   - Generator script is wrong
   - Don't modify generators without testing

2. **"Found old JSON format"**
   - Critical error
   - Regenerate lessons using correct generator
   - Run validation again

3. **"Missing cache prevention meta tags"**
   - Add to `<head>` section of generator
   - Regenerate all affected lessons

4. **"Textareas missing full-width styling"**
   - Add `width: 100%; box-sizing: border-box;` to textareas
   - Regenerate lessons

---

## Quick Reference

### Validate Single File
```bash
node validate-lesson-format.js 4th-grade-day-004.html
```

### Validate All 4th Grade
```bash
node validate-lesson-format.js 4th-grade-day-*.html
```

### Force Cache Clear (Students)
```
https://bedrockela-96dbd.web.app/update-checker.html?auto=true
```

### Test Specific Lesson
```
https://bedrockela-96dbd.web.app/4th-grade-day-004.html?t=12345
```
(The `?t=12345` bypasses cache - change number each test)

---

## Red Flags (STOP AND FIX)

- ❌ Validation script fails
- ❌ Blue screen in incognito mode
- ❌ Console errors in browser
- ❌ Pages empty after clicking Next
- ❌ Textboxes not full width
- ❌ Content doesn't load on some pages

**If you see ANY of these, DO NOT continue deployment.**

---

## Success Criteria

✅ Validation passes (exit code 0)
✅ All pages load in incognito
✅ No console errors
✅ Content displays on every page
✅ Textboxes are full width
✅ Navigation works (← →)
✅ Hard refresh loads fresh content

**Only deploy when ALL criteria are met.**

---

## Emergency Recovery

If you deployed broken lessons:

1. **Revert to backup:**
   ```bash
   git checkout HEAD~1 [affected-files]
   firebase deploy --only hosting
   ```

2. **Or regenerate:**
   ```bash
   node generate-[script].js
   node validate-lesson-format.js
   firebase deploy --only hosting
   ```

3. **Force student cache clear:**
   - Send update-checker.html link
   - Or have them hard refresh (Cmd+Shift+R)

---

## Final Note

**The format is now FIXED and locked in.** 

As long as you:
1. Don't modify the generator scripts
2. Run validation before deploying
3. Test in incognito after deploying

**You will NEVER have blue screen issues again.**
