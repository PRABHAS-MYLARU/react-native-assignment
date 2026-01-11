# Savvy Agents – React Native  Take‑Home Assignment

## Overview

This assignment is designed to evaluate your fundamentals in **React Native**, your ability to learn independently, and how you structure, commit, and explain your code.

You will build a small **mobile app** that simulates a dental office inbox where calls/conversations are listed, viewed, and summarized.

This is **not a trick assignment**. We care more about **clarity, progress, and good habits** than perfection.

---

## What You’ll Build

A simple React Native app with **3 screens**:

### 1. Inbox Screen

* Displays a list of conversations (use fake data from a local JSON file).
* Each item should show:

  * Patient name
  * Reason for call
  * Timestamp
  * Status (New / In Progress / Done)
* Tapping a conversation opens the detail screen.

### 2. Conversation Detail Screen

* Shows full details of the conversation:

  * Patient name
  * Phone number
  * Reason for call
  * Created date/time
* Shows a transcript/messages list (fake messages from JSON).
* Button: **“Create Summary”** → navigates to Summary screen.

### 3. Summary Screen

* Form to create a call summary:

  * Summary notes (multiline text input)
  * Outcome (Scheduled / Left Voicemail / Needs Follow‑up / Not Interested)
  * Next action date (simple text or date picker)
* Save button:

  * Saves the summary locally
  * Marks the conversation as **Done**
  * Navigates back to Inbox

---

## Data & Persistence

* Start with a local `data.json` file containing ~10 conversations.
* On app load:

  * Load conversations from JSON
  * Overlay any saved updates from local storage
* Use **AsyncStorage** (or equivalent) to persist:

  * Summary data
  * Updated conversation status
* Data must persist after app reload.

---

## Tech Stack

You may choose either:

**Option A (Recommended)**

* Expo
* React Native
* React Navigation
* AsyncStorage

**Option B**

* React Native CLI
* React Navigation
* AsyncStorage

Notes:

* Functional components + hooks only
* TypeScript is optional but encouraged
* No backend required

---

## Git & Workflow (Very Important)

You must **push code incrementally** to GitHub.

Minimum expected commits (example):

1. `chore: initialize react native app`
2. `feat: add inbox screen with conversation list`
3. `feat: add navigation and conversation detail screen`
4. `feat: add summary screen and form`
5. `feat: persist data using asyncstorage`
6. `ui: improve styling and status badge`
7. `fix: handle loading and empty states`
8. `docs: add readme and setup instructions`

Additional requirements:

* Push code regularly (at least 2–3 times per week)
* Use clear, meaningful commit messages
* Create at least **one pull request** into `main` (even if it’s your own repo)

---

## UI Expectations

* Clean and readable UI
* Consistent spacing and typography
* Status should be visually distinguishable (badge or label)
* No need for fancy animations

---

## Stretch Goals (Optional – pick 1 or 2)

* Search conversations by patient name
* Filter by status (All / New / Done)
* Sort by newest
* Basic form validation
* Ability to edit a saved summary

---

## Deliverables

1. **GitHub repository link** (with visible commit history)
2. **README** containing:

   * Setup instructions
   * Brief explanation of app structure
   * What you would improve if you had more time
3. **Short demo video (2–4 minutes)** showing:

   * App navigation
   * Creating and saving a summary
   * Persistence after reload

---

## Time & Expectations

* Expected effort: **6–10 hours for MVP**
* With polish/stretch goals: **10–20 hours**
* Work at your own pace. Once you feel the assignment is complete and polished, share the GitHub repository URL.

We care most about:

* Learning ability
* Code clarity
* Git discipline
* Communication

Good luck — treat this like a real task 🚀
