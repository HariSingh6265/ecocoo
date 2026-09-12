# A Digital Friendship Scrapbook & Journal 📖✨

> Dedicated to **Monaco Gaha** from **Hari Singh**.
> A handcrafted, digital scroll narrative celebrating years of memories, laughter, banter, and unwavering friendship.

---

## 🌟 Highlights & Features

- **Continuous Scroll Narrative:** From Class 10 board exam prep on Telegram to late-night terrace calls, annual birthday edits, and heartfelt reflections.
- **Your Version / My Version:** Interactive comparison of the iconic "89% Board Exam Incident".
- **The "Aap" Problem Banter:** Interactive debate button that humorously insists on *"Aap hi rahenge. 😂"*.
- **The "No Video Call" Joke:** Playful camera log visualizer celebrating 5+ years with zero video calls.
- **Scrapbook Aesthetic:** Realistic washi tapes, perforated postage stamps, polaroid photo frames with inspect modal, and notebook lined styling.
- **Ambient Soundscape:** Subtle, low-volume warm harmonic chimes built with the Web Audio API (off by default, zero external audio dependencies needed).
- **Classified Memory Easter Egg:** Sealed confidential envelope with private apology note that keeps sensitive memories $100\%$ private.
- **Mobile-First & Performant:** Fast loading, responsive, and supports `prefers-reduced-motion`.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css          # Scrapbook styling, paper textures, washi tape effects
│   ├── layout.tsx           # Google Fonts (Playfair Display, Plus Jakarta Sans, Caveat, Mono)
│   └── page.tsx             # Main entry point
├── components/
│   └── scrapbook/           # Modular story sections and UI elements
│       ├── AapProblemSection.tsx
│       ├── AllDaySharingSection.tsx
│       ├── BirthdayEditsVaultSection.tsx
│       ├── ClassifiedMemorySection.tsx
│       ├── CustomizerHelperModal.tsx
│       ├── CyberPoliceSection.tsx
│       ├── FamilyNoteSection.tsx
│       ├── FinalMessageSection.tsx
│       ├── FirstMisunderstandingSection.tsx
│       ├── HeroSection.tsx
│       ├── KeptTalkingSection.tsx
│       ├── LongCallsSection.tsx
│       ├── MutualSupportSection.tsx
│       ├── Navbar.tsx
│       ├── NoVideoCallSection.tsx
│       ├── PersonalitySection.tsx
│       ├── PolaroidFrame.tsx
│       ├── PostageStamp.tsx
│       ├── PuneIncidentSection.tsx
│       ├── ResultsComparisonSection.tsx
│       ├── ScrapbookAudioPlayer.tsx
│       ├── ScrapbookContainer.tsx
│       ├── TelegramOriginSection.tsx
│       ├── TerraceSection.tsx
│       ├── TheGapSection.tsx
│       ├── UnbrokenFriendshipSection.tsx
│       └── WashiTape.tsx
├── data/
│   └── storyData.ts         # Central configuration for all text, dates, memories & placeholders
├── types/
│   └── story.ts             # TypeScript definitions
└── utils/
    └── audio.ts             # Web Audio API ambient chime generator
```

---

## 🛠️ How to Customize / Replace Media

All content and media placeholders are managed centrally in [`src/data/storyData.ts`](./src/data/storyData.ts):

1. **Add Real Photos / Edits:**
   - Place your files in `public/photos/` (e.g. `public/photos/edit_2023.jpg`).
   - In `src/data/storyData.ts`, update `src: '/photos/edit_2023.jpg'` on the corresponding item in `MEDIA_VAULT_ITEMS`.

2. **Run Locally:**
   ```bash
   npm install
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Deploy to Vercel:**
   Push to GitHub and connect to Vercel (or run `npx vercel`). Zero backend or database required.
