# Deployment Guide

This guide covers multiple deployment options for your Angular portfolio.

## Option 1: GitHub Pages (Recommended for Free Hosting)

### Prerequisites
- GitHub account
- Repository created on GitHub

### Steps

#### Method A: Using angular-cli-ghpages (Easiest)

1. **Install the deployment tool:**
   ```bash
   npm install --save-dev angular-cli-ghpages
   ```

2. **Update the base-href in package.json:**
   - Replace `/Portfolio/` with `/[your-repo-name]/` in the `build:gh-pages` script
   - Or if deploying to root domain: use `/`

3. **Build and deploy:**
   ```bash
   npm run deploy:gh-pages
   ```
   
   This will:
   - Build your app for production
   - Create/update the `gh-pages` branch
   - Push to GitHub

4. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Select source: `gh-pages` branch
   - Your site will be available at: `https://[username].github.io/[repo-name]/`

#### Method B: Manual Deployment

1. **Build for production:**
   ```bash
   npm run build:gh-pages
   ```
   (Update the base-href in the command to match your repo name)

2. **Push to gh-pages branch manually:**
   ```bash
   cd dist/Portfolio/browser
   git init
   git add .
   git commit -m "Deploy to GitHub Pages"
   git branch -M gh-pages
   git remote add origin https://github.com/[username]/[repo-name].git
   git push -u origin gh-pages
   ```

### Important Notes for GitHub Pages:
- **Base Href**: Must match your repository name (e.g., if repo is `portfolio`, use `/portfolio/`)
- **Custom Domain**: If using a custom domain, set base-href to `/`
- **404 Handling**: GitHub Pages doesn't support Angular routing by default. You may need a `404.html` that redirects to `index.html`

---

## Option 2: Netlify (Free, Easy, Recommended)

### Steps:
1. **Build your app:**
   ```bash
   npm run build:prod
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Drag and drop the `dist/Portfolio/browser` folder
   - Or connect your GitHub repo for automatic deployments

3. **Configure (if using routing):**
   - Add a `_redirects` file in `src` folder with: `/* /index.html 200`
   - Or configure redirects in Netlify dashboard

**Advantages:**
- Free tier available
- Automatic deployments from GitHub
- Custom domains
- Better Angular routing support
- HTTPS by default

---

## Option 3: Vercel (Free, Great for Angular)

### Steps:
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   npm run build:prod
   vercel
   ```

   Or connect your GitHub repo on [vercel.com](https://vercel.com)

**Advantages:**
- Free tier
- Automatic deployments
- Great Angular support
- Custom domains
- Edge network

---

## Option 4: Firebase Hosting (Free)

### Steps:
1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure:**
   - Public directory: `dist/Portfolio/browser`
   - Single-page app: Yes
   - Build command: `npm run build:prod`

4. **Deploy:**
   ```bash
   firebase deploy
   ```

---

## Option 5: Cloudflare Pages (Free)

### Steps:
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Configure:
   - Build command: `npm run build:prod`
   - Build output directory: `dist/Portfolio/browser`
4. Deploy automatically on every push

---

## Quick Comparison

| Platform | Free Tier | Auto Deploy | Custom Domain | Angular Routing |
|----------|-----------|-------------|---------------|----------------|
| GitHub Pages | ✅ | ❌ | ✅ | ⚠️ (needs 404.html) |
| Netlify | ✅ | ✅ | ✅ | ✅ |
| Vercel | ✅ | ✅ | ✅ | ✅ |
| Firebase | ✅ | ✅ | ✅ | ✅ |
| Cloudflare | ✅ | ✅ | ✅ | ✅ |

---

## Troubleshooting

### GitHub Pages Issues:
- **404 errors on refresh**: Add a `404.html` file that copies `index.html`
- **Assets not loading**: Check base-href matches repo name
- **Blank page**: Check browser console for errors

### Creating 404.html for GitHub Pages:
Create `public/404.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    sessionStorage.redirect = location.href;
    location.replace('/Portfolio/');
  </script>
</head>
<body></body>
</html>
```

---

## Recommended: Netlify or Vercel
For the easiest deployment with best Angular support, I recommend **Netlify** or **Vercel**. They handle routing automatically and offer free tiers with great features.
