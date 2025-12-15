# Project Images

Place your project images in this folder.

## File Naming Convention

Name your images according to your project IDs:
- `project1.jpg` - For project with id: 1
- `project2.jpg` - For project with id: 2
- `project3.jpg` - For project with id: 3
- etc.

## Supported Formats
- `.jpg` or `.jpeg` (recommended)
- `.png`
- `.webp`

## Recommended Settings
- **Aspect Ratio**: 16:9 or 4:3 (landscape)
- **Size**: 800x450 pixels or larger
- **File size**: Under 300KB per image for faster loading
- **Format**: JPG for photos, PNG for screenshots with text

## Example Structure

```
src/assets/projects/
  ├── project1.jpg    ← Image for "Mawanella Motors"
  ├── project2.jpg    ← Image for Project 2
  ├── project3.jpg    ← Image for Project 3
  ├── project4.jpg    ← Image for Project 4
  ├── project5.jpg    ← Image for Project 5
  └── project6.jpg    ← Image for Project 6
```

## How It Works

1. Each project in `app.ts` has an `image` property (e.g., `image: 'project1.jpg'`)
2. The image is loaded from `/assets/projects/project1.jpg`
3. If the image doesn't exist, a gradient placeholder will show instead

## Tips

- Use high-quality screenshots or mockups of your projects
- Keep file sizes small for faster page loading
- Use consistent aspect ratios for a uniform look
- Optimize images using tools like TinyPNG or Squoosh

