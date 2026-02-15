# Deployment Guide for Fitrah Project

## Static Deployment Options

### 1. Netlify (Easiest)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### 2. Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 3. Surge.sh
```bash
# Install Surge
npm install -g surge

# Deploy
surge dist
```

### 4. GitHub Pages
```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### 5. Manual Upload
Simply upload the contents of `dist/` folder to your web host.

## Notes
- All files are static (HTML, CSS, JS, images)
- No server-side processing required
- Works on any hosting service
