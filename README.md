# WritoShop Test

Standalone Vercel test repository for the redesigned WritoShop frontend.

## Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Lucide icons
- Google Identity Services (optional)

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Vercel
Import the repository into Vercel. The included `vercel.json` uses:
- Build command: `npm run build`
- Output directory: `dist`

This project uses `HashRouter`, so no SPA rewrite rule is required for client-side routes.

## Google sign-in
The login page includes Google Identity Services support.

1. Create a Google OAuth 2.0 Web Client in Google Cloud Console.
2. Add your Vercel deployment domain(s) under **Authorized JavaScript origins**.
3. In Vercel, add an environment variable:
   `VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com`
4. Redeploy.

Without the environment variable the Google option still appears in the UI, but shows setup guidance instead of starting OAuth.

The Google credential callback is currently a front-end integration point. For a production login, verify the credential on your backend/auth provider and create a real application session.
