# Frazzo Media Agent - Functional Build

This build adds Firestore-backed Leads, Finance entries, Admin invites and simple AI proxies.

## Steps before deploy
1. Copy `.env.local.template` to `.env.local` and fill in your Firebase keys.
2. Add server-side keys to Vercel Settings → Environment Variables:
   - OPENAI_API_KEY
   - REPLICATE_API_TOKEN
3. Deploy on Vercel (import repo). The `api/` folder contains serverless endpoints for AI.

## Notes
- Do not commit `.env.local` or server API keys.
- Firestore rules should be tightened for production; this scaffold uses simple reads/writes for prototyping.