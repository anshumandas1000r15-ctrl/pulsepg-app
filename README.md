# PulsePG — NEET-PG & INI-CET Chapterwise PYQ Practice & Timed Test App

A mobile-first, lightweight, offline-capable Progressive Web App (PWA) designed for Indian MBBS final-year students and interns preparing for **NEET-PG** and **INI-CET**.

---

## 1. Project Structure

```text
neet-pg-pyq-app/
├── public/
│   ├── manifest.json                   # PWA install manifest
│   ├── sw.js                           # Service Worker (offline question & shell caching)
│   └── sample_questions_template.csv   # Downloadable bulk upload CSV template (20 dummy PYQs)
├── supabase/
│   └── schema.sql                      # Complete Postgres schema (11 tables) + RLS policies + triggers
├── src/
│   ├── data/
│   │   └── seedData.js                 # All 19 NEET-PG subjects, chapters & 20 [SAMPLE DUMMY] questions
│   ├── lib/
│   │   ├── supabase.js                 # Supabase Auth + DB client + offline localStorage sync
│   │   └── razorpay.js                 # Free-tier quota enforcement & Razorpay checkout hook
│   ├── App.jsx                         # Complete mobile-first application (Auth, Practice, Tests, Analytics, Smart Revision, Admin)
│   ├── main.jsx                        # React root entry point
│   └── index.css                       # Tailwind CSS directives
├── .env.example                        # Required environment variables template
├── index.html                          # Mobile-first viewport & Service Worker registration
├── package.json                        # Dependencies (React, Tailwind, Supabase, Recharts, Lucide)
├── tailwind.config.js                  # Dark/light mode & typography config
├── vercel.json                         # Vercel SPA routing & service worker headers
└── vite.config.js                      # Vite build config optimized for budget Android devices
```

---

## 2. Setting Up Supabase (Database & Auth)

1. Create a new project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard, paste the contents of `supabase/schema.sql`, and click **Run**.
   - This creates all 11 tables (`profiles`, `subjects`, `chapters`, `questions`, `attempts`, `tests`, `test_questions`, `test_results`, `bookmarks`, `notes`, `daily_goals`), performance indexes, the `on_auth_user_created` trigger, and strict **Row Level Security (RLS)** policies.
3. Enable **Email/Password** and **Google OAuth** in **Authentication → Providers**.
4. To grant yourself Admin access, run the following in the Supabase SQL Editor after signing up:
   ```sql
   UPDATE public.profiles SET is_admin = TRUE, is_premium = TRUE WHERE email = 'your-email@example.com';
   ```

---

## 3. Running Locally

1. Clone or unzip the project and install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   *(Note: If `.env` variables are omitted, the app automatically runs in interactive Local/Demo mode with all 19 NEET-PG subjects and 20 sample dummy questions pre-loaded in browser storage.)*

---

## 4. Deploying to Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework Preset will auto-detect **Vite**.
4. Add the environment variables from `.env.example` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_FREE_DAILY_QUESTION_LIMIT`, `VITE_RAZORPAY_KEY_ID`).
5. Click **Deploy**. `vercel.json` automatically configures SPA routing and PWA service worker headers.

---

## 5. Suggested Next Features (Product Roadmap)

1. **Image Zoom & Pinch-to-Pan Lightbox**: High-resolution histopathological slides, ECGs, and CT/MRI scans with pinch-to-zoom and toggleable anatomical labels.
2. **All-India Mock Rank Predictor**: Percentile calculation and live leaderboard for scheduled Sunday Grand Tests across all test-takers.
3. **High-Yield One-Liner Flashcards (Anki-style)**: Extract one-line pearls from question explanations into a rapid-fire swipe deck for internship ward breaks.
4. **Peer Discussion & Doubt Thread per Question**: Verified faculty/topper-moderated comment threads under each question with upvote sorting.
5. **WhatsApp / Push Daily Streak Reminders**: Web Push notifications at 9 PM IST if the student's daily question goal ring is still incomplete.
