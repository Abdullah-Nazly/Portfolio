# Deployment Guide

Simple deployment to GitHub Pages.

## Prerequisites
- GitHub account
- Repository created on GitHub

## Deploy to GitHub Pages

Just run one command:

```bash
npm run deploy:gh-pages
```

That's it! This will:
- Build your app for production
- Deploy to the `gh-pages` branch
- Push to GitHub

## When You Make Changes

**After making any changes to your code:**

1. **Save your source code to GitHub (optional but recommended):**
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin main
   ```
   This saves your source code to your main branch so you have a backup.

2. **Deploy your changes to GitHub Pages:**
   ```bash
   npm run deploy:gh-pages
   ```

**Note:** The deployment script only pushes the **built/compiled files** to the `gh-pages` branch. It does NOT push your source code. If you want to save your source code changes, you need to commit and push separately (step 1 above).

Your changes will be live on GitHub Pages in a few minutes after deployment.

## First Time Setup

1. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Select source: `gh-pages` branch
   - Save

2. **Your site will be available at:**
   `https://[username].github.io/[repo-name]/`

   For example: `https://abdullah-nazly.github.io/Portfolio/`

## Important Notes

- **Base Href**: The base-href is set to `/Portfolio/` in `package.json`. If your repo name is different, update it in the `build:gh-pages` script.
- **Custom Domain**: If using a custom domain, change base-href to `/` in `package.json`.

## Troubleshooting

- **404 errors on refresh**: Already handled with `404.html` in the `public` folder
- **Assets not loading**: Make sure base-href matches your repo name
- **Blank page**: Check browser console (F12) for errors

---

**Summary:** Whenever you make changes, just run `npm run deploy:gh-pages` to deploy your updates. It's that simple!
