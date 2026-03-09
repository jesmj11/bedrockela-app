# BedrockELA App - Setup Guide

## ✅ What We've Built (Phase 1: PWA Foundation)

Your BedrockELA app is now set up as a **Progressive Web App (PWA)**! Here's what's ready:

### Files Created

1. **`manifest.json`** - App configuration (name, icons, colors)
2. **`sw-app.js`** - Service worker for offline lessons
3. **`offline.html`** - Friendly offline page
4. **`package.json`** - Dependencies and scripts
5. **`README-APP.md`** - Project documentation
6. **`icons/`** - Directory for app icons (needs assets)
7. **`screenshots/`** - Directory for app store screenshots (needs assets)

### How It Works

**Offline Support:**
- Lessons are cached when first opened
- Students can continue learning without internet
- Automatic sync when connection returns

**Installable:**
- "Add to Home Screen" on iOS/Android
- Appears like a native app
- No browser UI chrome

**Smart Caching:**
- Core files cached immediately
- Lessons cached as accessed
- TTS audio (ElevenLabs) always uses network (too large to cache)
- Firebase data synced intelligently

---

## 📋 What You Need Next

### 1. App Icon (Required)

**We need ONE master icon: 1024×1024 PNG**

**Requirements:**
- Size: 1024×1024 pixels
- Format: PNG with transparency
- Content: Should work at small sizes (readable icon)
- No text (text doesn't scale well)
- Safe area: Keep important content in center 80%

**Suggested Design:**
- BedrockELA logo
- OR: Book icon in brand colors (#305853 green, #B06821 brown)
- OR: Billy the Instructor character
- Simple, bold shapes (recognizable when tiny)

**I can generate all other sizes from this one master icon!**

From 1024×1024, we'll create:
- 72×72, 96×96, 128×128, 144×144, 152×152 (various devices)
- 192×192, 384×384, 512×512 (Android)
- 1024×1024 (iOS App Store)

### 2. Screenshots (For App Stores - Can Wait)

**iOS Required:**
- iPhone 6.7" (1290 x 2796 pixels) - iPhone 14 Pro Max size
- iPad 12.9" (2048 x 2732 pixels) - iPad Pro size

**Android Required:**
- Phone (1080 x 1920 pixels minimum)
- Tablet (1200 x 1920 pixels recommended)

**What to show:**
- Login screen
- Dashboard
- Lesson in progress (with Billy)
- Completion celebration
- Progress tracking

**We can take these screenshots later when we're testing the app!**

---

## 🚀 Testing the PWA (Right Now!)

### Step 1: Install Dependencies

```bash
cd /Users/mushu/.openclaw/workspace/bedrockela-app
npm install
```

### Step 2: Run Local Server

```bash
npm run serve
```

This starts the app at `http://localhost:8080`

### Step 3: Test on Phone/Tablet

**Option A: Same WiFi Network**
1. Find your Mac's IP address: `ifconfig | grep inet`
2. On your phone/tablet, visit `http://YOUR_IP:8080`
3. Tap "Add to Home Screen" in Safari (iOS) or Chrome (Android)

**Option B: Deploy to Firebase (Separate Target)**
We can set up a test environment: `bedrockela-app.web.app`

### Step 4: Test Offline Mode

1. Open a lesson
2. Turn on Airplane Mode
3. Try navigating - lesson should still work!
4. Turn WiFi back on - progress syncs to Firebase

---

## 📱 Phase 2: Capacitor (Native Apps)

**When you're ready for App Store/Play Store**, we'll run:

```bash
# Install Capacitor
npm install

# Add iOS platform (requires Mac)
npm run cap:add:ios

# Add Android platform
npm run cap:add:android

# Sync web → native
npm run cap:sync

# Open in Xcode (iOS)
npm run cap:open:ios

# Open in Android Studio (Android)
npm run cap:open:android
```

This wraps your PWA in a native container and adds:
- Real app icon on device
- Splash screen
- Status bar control
- App Store distribution

---

## 🎯 Next Steps (In Order)

### Immediate (Can Do Today):
1. **Create/provide app icon** (1024×1024 PNG)
   - I can help generate one if you describe what you want
   - OR you can provide an existing logo/design
2. **Test PWA locally** (`npm run serve`)
3. **Test on tablet** (Add to Home Screen)

### This Week:
4. **Take screenshots** on tablet (for app stores later)
5. **Write privacy policy** (required for app stores)
   - Can use generator at iubenda.com
   - Or I can draft a basic one

### When Ready to Launch:
6. **Create developer accounts**
   - Apple: $99/year at developer.apple.com
   - Google: $25 one-time at play.google.com/console
7. **Set up Capacitor** (Phase 2)
8. **Build and test** on simulators/devices
9. **Submit to app stores**

---

## 🔧 How to Generate Icons (When You Have the Master)

Once you provide the 1024×1024 PNG, I'll run:

```bash
# Install icon generator
npm install -g @capacitor/assets

# Generate all sizes
npx @capacitor/assets generate --iconSource icons/icon-1024x1024.png
```

This creates:
- All PWA icon sizes
- iOS App Store icons
- Android adaptive icons
- Splash screens (if you provide splash design)

---

## 📝 Current Status

**✅ Complete:**
- PWA foundation (manifest, service worker, offline support)
- Smart caching strategy
- Offline learning support
- Project structure
- Development scripts

**⏳ Waiting On:**
- App icon (1024×1024 PNG)
- Privacy policy text
- Developer account setup (when ready to submit)

**🔜 Next Phase:**
- Capacitor setup (when ready for app stores)
- Native builds (iOS + Android)
- App Store submission

---

## 💡 Quick Decisions to Make

1. **App Icon:** Do you have existing BedrockELA branding, or should I help design something?
2. **Privacy Policy:** Do you need help writing this, or do you have one?
3. **Testing:** Want to test PWA locally first, or deploy to a Firebase test site?
4. **Timeline:** When do you want to be in the app stores? (Helps prioritize next steps)

---

**Ready to proceed?** Let me know:
- Do you have an icon ready, or should I help create one?
- Want to test the PWA locally right now?
