# Al Quds Market — Capacitor Mobile Packaging Guide (Android & iOS)

This guide provides complete instructions for packaging the **Al Quds Market (القدس ماركت)** web application into native Android and iOS mobile applications using **Capacitor**.

---

## 1. Architecture Overview

Al Quds Market is built with **Vite, React 18, Tailwind CSS, and TypeScript**. When packaged with Capacitor:
- The Vite production build (`dist/`) is bundled directly inside the native mobile app container.
- All API and real-time database queries continue to communicate seamlessly with Supabase (`https://ejorpzypevglnrawyxfc.supabase.co`).
- Native features (Splash screen, Status bar, haptic feedback, safe area insets) are handled through official Capacitor plugins.
- Arabic RTL and Cairo typography work natively in both Android WebView and iOS WKWebView.

---

## 2. Prerequisites

### For Android Development:
- **Node.js 18+** & **npm**
- **Android Studio** (Hedgehog 2023.1.1 or newer recommended)
- **Android SDK** (API Level 33 or 34) & Command Line Tools
- Java JDK 17 or newer

### For iOS Development (macOS only):
- **macOS** Ventura or Sonoma
- **Xcode 15+** with command line tools (`xcode-select --install`)
- **CocoaPods** (`sudo gem install cocoapods` or `brew install cocoapods`)
- Apple Developer Account (for device testing and App Store distribution)

---

## 3. Step-by-Step Installation

### Step 1: Install Capacitor Dependencies
Run the following inside the `al-quds-market` directory:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
```

Optional official mobile enhancement plugins:
```bash
npm install @capacitor/status-bar @capacitor/splash-screen @capacitor/app @capacitor/keyboard
```

### Step 2: Review Configuration
The project is already pre-configured with [`capacitor.config.ts`](file:///Users/mahmoudreda/Desktop/My%20Projects/Al%20Quds/al-quds-market/capacitor.config.ts):

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alqudsmarket.app',
  appName: 'Al Quds Market',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#15803d',
      showSpinner: false,
    },
  },
};

export default config;
```

### Step 3: Build the Web App
Always build the Vite bundle before syncing:

```bash
npm run build
```

### Step 4: Add Native Platforms

```bash
# Add Android native project (creates /android directory)
npx cap add android

# Add iOS native project (creates /ios directory)
npx cap add ios
```

### Step 5: Sync Assets to Native Projects
Whenever code or web assets change, rebuild and sync:

```bash
npm run build
npx cap sync
```

---

## 4. Running & Testing on Emulators or Devices

### Android:
```bash
# Open project in Android Studio
npx cap open android
```
- In Android Studio, wait for Gradle sync to complete.
- Select your target emulator (e.g. Pixel 7, API 34) or connected Android phone (via USB debugging).
- Click the green **Run (Play)** button.

### iOS:
```bash
# Open project in Xcode
npx cap open ios
```
- In Xcode, select the `App` target.
- Under **Signing & Capabilities**, select your Apple Developer Team.
- Select an iPhone simulator (e.g. iPhone 15) or connected device.
- Press **Cmd + R** to build and run.

---

## 5. Mobile UI & Native Considerations

### RTL & Cairo Arabic Typography
- The web app already sets `<html dir="rtl" lang="ar">`.
- In Android and iOS WebViews, Arabic text shaping and RTL mirroring are supported out of the box.

### Viewport & Safe Area Insets
The viewport meta tag in `index.html` includes:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```
This ensures content avoids the notch, dynamic island, and home gesture bar. Tailwind utility classes respect `safe-top` and `safe-bottom` padding where needed.

### App Icons & Splash Screen Generation
Generate all required asset densities automatically using `@capacitor/assets`:
1. Create a 1024x1024 PNG icon: `resources/icon.png`
2. Create a 2732x2732 PNG splash: `resources/splash.png` (brand green background `#15803d` with white Al Quds Market emblem)
3. Run asset generator:
```bash
npm install -g @capacitor/assets
npx @capacitor/assets generate
```

---

## 6. Production App Store Packaging

### Android (Google Play):
1. In Android Studio: `Build` → `Generate Signed Bundle / APK`.
2. Choose **Android App Bundle (.aab)**.
3. Create or select your upload keystore (`alquds-release.jks`).
4. Upload the generated `.aab` to Google Play Console.

### iOS (Apple App Store):
1. In Xcode: Select target device as **Any iOS Device (arm64)**.
2. Select `Product` → `Archive`.
3. In the Organizer window, click **Distribute App** → **App Store Connect**.
4. Submit for TestFlight review and App Store publication.
