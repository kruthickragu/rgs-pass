# RGShireworld Visitor Pass Generator

A professional, high-tech visitor pass management system built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern black & white theme
- 📱 Fully mobile responsive
- 📸 Camera capture or file upload for photos
- 🎫 Professional ID card design
- 💾 Download pass as PNG image
- ⚡ Fast and lightweight

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- html2canvas

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. Push to main branch - the site will auto-deploy

### Method 2: Manual Deployment

```bash
# Update package.json homepage with your GitHub username
# Then run:
npm run deploy
```

## Configuration

Update the following in `package.json`:
- Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username
- Replace `rgs-pass-app` with your repository name if different

Update `vite.config.js` base path to match your repository name.

## License

© 2026 RGShireworld Technologies. All rights reserved.
