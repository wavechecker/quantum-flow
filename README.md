# Quantum Flow — Minimal Site (Astro v5)

One-page, fast, and KYC-friendly. Deploy on Netlify.

## Commands
```bash
npm i
npm run dev     # http://localhost:4321
npm run build   # outputs to /dist
npm run preview
```

## Deploy (Netlify)
1. Push to GitHub (e.g., wavechecker/quantumflow-site).
2. In Netlify, "Add new site" → "Import an existing project" → pick the repo.
3. Build command: `npm run build` · Publish directory: `dist` (auto from netlify.toml).
4. Optionally set custom domain (e.g., quantumflow.ae).

## Edits
- Update copy in `src/pages/index.astro`.
- Update company facts in the JSON-LD object at the top of that file.
- Replace `/public/logo.svg` and `/public/favicon.svg` if you want a custom mark.

## Contact Form (Netlify)
- The form on `/` posts to Netlify using `data-netlify`.
- After first deploy, make one test submission to let Netlify detect the form.
- Success page: `/thanks.html`.
