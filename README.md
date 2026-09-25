# 🏋️ FitLog — Workout Library

## Live Demo
https://fitlog-assignment-06.vercel.app/

## Short Description
FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts, search and sort them, lock lifts into today's plan or save them for later, and track your session's total exercises, minutes, and calories — all in one clean, responsive interface.

## Technologies Used
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **DaisyUI v5** (Navbar, Badge, Dropdown, Button components)
- **react-hot-toast** (toast notifications)
- **lucide-react** (icons)
- Deployed on **Vercel**

## 5 Key Features
1. **Workout Library** — Browse all 12 lifts in a responsive 3-column grid (desktop) with category tag pills, equipment info, and a duration/calories/rating stats row on every card.
2. **Search & Sort** — Instantly search workouts by name or muscle group tag, and re-sort the library by Duration, Calories, or Rating from a dropdown.
3. **Workout Details** — A dedicated page per lift with a full spec sheet (equipment, difficulty, sets, reps, duration, calories, rating) and numbered step-by-step instructions.
4. **My Plan Management** — Add lifts to Today's Plan (capped at 5) or Save for Later, with live-updating Exercises/Minutes/Calories summary cards and Mark as Done / Remove actions.
5. **Persistent State & Feedback** — Plan and Saved lists persist across page reloads via localStorage, with toast notifications confirming every add, save, done, and remove action.

## Getting Started
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API
- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`
