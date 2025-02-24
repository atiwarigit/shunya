# Shunya - ADHD Mental Well-being Journal App Prototype
*A minimalist journaling tool crafted to help ADHD minds track moods, states, and thoughts with ease.*

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Project Overview
Shunya is a web app prototype tailored for ADHD users, offering a simple, distraction-free journaling experience with mood/state tracking and early NLP integration.

## Key Features (Phase 1 MVP)
- **Journaling:** Clean text area, voice input, photo attachments, character count.
- **Mood & State Tracking:** Mood icons (Good, Okay, Not Great), state chips (Focus, Energy, Clarity, Overwhelm).
- **Entry Management:** Save, view, edit, delete entries with timestamps.
- **Local Storage:** IndexedDB (browser-only, no remote data).
- **ADHD-Friendly UI:** Minimal design, clear layout, low friction.
- **NLP (Planned):** Sentiment analysis via Google Cloud API.

## Technology Stack
- **Frontend:** React
- **Backend:** Vercel Functions (Node.js)
- **Storage:** IndexedDB (`idb-keyval`)
- **Hosting:** Vercel
- **NLP (Future):** Google Cloud Natural Language API

## Setup Instructions
1. Install [Node.js](https://nodejs.org/).
2. Clone: `git clone [your-github-repository-url] && cd [your-project-directory]`
3. Install: `npm install`
4. Run: `npm start` (opens at `http://localhost:3000`)

## Status
In **Phase 1 MVP development**, focusing on UI and core features. Next: NLP, visualizations, and user testing.

## Privacy
Data stays local—see [PRIVACY.md](PRIVACY.md) for more.

## License
Unlicensed for now; an MIT License may come later!

---
**This README will evolve with the project.**
---
(To Use This Template: Copy, edit `[brackets]`, add `LICENSE`/`PRIVACY.md`, and push to GitHub.)
