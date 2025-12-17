# GreenNest – Indoor Plant Care & Store

A single-page React app with Firebase Auth and protected routes.

## Features
- Responsive layout with persistent Navbar and Footer
- Fetches `plants.json` to show top-rated plants
- Protected `Plant Details` and `My Profile` routes
- Firebase Authentication: Email/Password, Google Sign-In, Forgot Password
- Profile update using `updateProfile()`
- Password toggle and validation

### Responsive Navbar
- On screens ≤ 768px, the desktop nav hides and a hamburger appears.
- Tapping the hamburger opens a mobile menu with: Home, My Profile, and Login/Register or Logout depending on auth state.
- The menu closes automatically after navigation or logout.

## Setup
1. Create a new Firebase project and enable Authentication providers:
   - Email/Password
   - Google
2. Copy your Firebase config to environment variables:

Create `.env` in project root:
```
VITE_FIREBASE_API_KEY=... 
VITE_FIREBASE_AUTH_DOMAIN=... 
VITE_FIREBASE_PROJECT_ID=... 
VITE_FIREBASE_APP_ID=...
```

## Run Locally
Requires Node.js 18+.

```
npm create vite@latest greennest -- --template react
cd greennest
npm install firebase react-router-dom
# Replace src and public with files from this workspace (or copy them in)
npm run dev
```

If you are already in this folder with files generated, run:
```
npm install
npm run dev
```

## Notes
- `plants.json` is served from `public/plants.json`
- After login redirect, protected routes send you back to your desired page
- Forgot password sends Gmail redirect via Firebase email
