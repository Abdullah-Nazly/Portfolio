# Data Science Portfolio

A modern, animated portfolio website built with Angular, designed specifically for data scientists. Features a professional color scheme, smooth animations, and a responsive design.

## Features

- 🎨 **Professional Design**: Data science-themed color scheme with blues, teals, and purples
- ✨ **Smooth Animations**: Fade-in, slide-up, and hover animations throughout
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 📄 **CV Download**: Easy CV download functionality
- 🚀 **GitHub Pages Ready**: Configured for easy deployment to GitHub Pages
- 🎯 **SEO Optimized**: Meta tags and semantic HTML

## Sections

1. **Hero Section**: Eye-catching introduction with animated background
2. **About Section**: Personal information and statistics
3. **Projects Section**: Showcase your data science projects
4. **Skills Section**: Display your technical skills with progress bars
5. **Contact Section**: Contact form and social media links

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Customization Guide

### 1. Personal Information

Update the following placeholders in `src/app/app.html`:

- `[Your Name]` - Replace with your name
- `[Your Email]` - Replace with your email
- `[Your Location]` - Replace with your location
- `[Your LinkedIn]` - Replace with your LinkedIn URL
- `[Your GitHub]` - Replace with your GitHub URL
- `[Your Instagram]` - Replace with your Instagram URL (optional)

### 2. About Section

Edit the about section in `src/app/app.html`:
- Replace `[Your bio placeholder...]` with your actual bio
- Update the statistics: `[X]`, `[Y]`, `[Z]` with your actual numbers
- Add your photo to the image placeholder

### 3. Projects

Update the projects array in `src/app/app.ts`:
- Replace project titles, descriptions, and tags
- Add your GitHub and demo links
- Add or remove projects as needed

### 4. Skills

Modify the skills array in `src/app/app.ts`:
- Update skill names and proficiency levels (0-100)
- Add or remove skills
- Organize skills into categories

### 5. CV Download

1. Place your CV file in `src/assets/` as `cv.pdf`
2. The download button will automatically work

### 6. Colors

Customize colors in `src/app/app.css` by modifying the CSS variables:
```css
--primary-blue: #4A90E2;
--primary-teal: #50E3C2;
--primary-purple: #667eea;
```

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

See `DEPLOYMENT.md` for detailed GitHub Pages deployment instructions.

## Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── app.ts          # Main component with data
│   │   ├── app.html        # Template
│   │   └── app.css         # Styles
│   ├── assets/             # Static assets (CV, images)
│   ├── index.html          # Main HTML file
│   └── styles.css          # Global styles
├── angular.json            # Angular configuration
└── package.json           # Dependencies
```

## Technologies Used

- Angular 20
- TypeScript
- CSS3 (Animations, Grid, Flexbox)
- Angular Animations

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.

---

**Note**: Remember to replace all placeholder content before deploying your portfolio!
