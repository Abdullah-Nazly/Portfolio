# GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Angular CLI installed globally

## Steps to Deploy

### 1. Install GitHub Pages Dependencies
```bash
npm install --save-dev angular-cli-ghpages
```

### 2. Build for Production
```bash
ng build --configuration production --base-href /[your-repo-name]/
```

Replace `[your-repo-name]` with your actual GitHub repository name.

### 3. Deploy to GitHub Pages
```bash
npx angular-cli-ghpages --dir=dist/Portfolio/browser
```

### 4. Alternative: Manual Deployment

1. Build the project:
   ```bash
   ng build --configuration production --base-href /[your-repo-name]/
   ```

2. Go to your GitHub repository settings
3. Navigate to Pages section
4. Select source: `gh-pages` branch or `main` branch `/docs` folder
5. If using `gh-pages` branch:
   - Push the `dist/Portfolio/browser` folder contents to a `gh-pages` branch
   - Or use: `npx angular-cli-ghpages --dir=dist/Portfolio/browser`

### 5. Update Base Href for Custom Domain (Optional)

If you're using a custom domain, update the base-href:
```bash
ng build --configuration production --base-href /
```

## Important Notes

- Make sure to update all placeholder content before deploying
- Add your CV file to `src/assets/cv.pdf`
- Update all `[Your ...]` placeholders in the code
- Test the site locally before deploying

## Repository Setup

1. Create a new repository on GitHub
2. Initialize git in your project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[your-username]/[your-repo-name].git
   git push -u origin main
   ```

