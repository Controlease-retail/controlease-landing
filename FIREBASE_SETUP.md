# Firebase Deployment Setup for Landing Page

This landing page is configured to deploy to Firebase Hosting as a **separate website** from the main Controlease app.

## Prerequisites

1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

## Create a New Firebase Project

Since this is a separate website, you need to create a new Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Name it something like:
   - `controlease-landing` (for production)
   - `controlease-landing-preview` (for preview/staging)
4. Enable Firebase Hosting when prompted

## Configure Firebase Project

1. Update `.firebaserc` with your project ID:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

Or use the Firebase CLI:
```bash
firebase use --add
# Select your project from the list
```

## Build and Deploy

1. Build the project:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
npm run deploy
```

Or use Firebase CLI directly:
```bash
firebase deploy --only hosting
```

## Deployment Scripts

- `npm run deploy` - Build and deploy to default project
- `npm run deploy:preview` - Build and deploy to preview project (if configured)

## Important Notes

- The build output goes to `dist/` folder (configured in `vite.config.ts`)
- All routes are rewritten to `index.html` for React Router (SPA routing)
- Static assets are cached for 1 year
- This is completely separate from the main `controlease-retail` Firebase project

## Custom Domain (Optional)

To add a custom domain:

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

Example domains:
- `landing.controlease.com`
- `www.controlease.com`
- `controlease.net`

