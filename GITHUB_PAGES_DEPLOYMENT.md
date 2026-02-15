# GitHub Pages Deployment Guide

## Step 1: Push to GitHub

```bash
# Initialize git if not already done
git add .
git commit -m "Ready for GitHub Pages deployment"

# Add your GitHub repository
git remote add origin https://github.com/yasmin-msa/FetraReact.git

# Push to main branch
git push -u origin main
```

## Step 2: Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

This will:
1. Build your project
2. Create a `gh-pages` branch
3. Push to GitHub
4. Deploy to GitHub Pages

## Step 3: Enable GitHub Pages (First Time Only)

1. Go to: https://github.com/yasmin-msa/FetraReact/settings/pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Click Save

## Your Site Will Be Live At:

🌐 **https://yasmin-msa.github.io/FetraReact**

---

## Automatic Deployment (Future Updates)

After initial setup, every time you run `npm run deploy`, your site updates automatically!

### Workflow:
```bash
# Make changes
git add .
git commit -m "Update content"
git push

# Deploy to GitHub Pages
npm run deploy
```

---

## Configuration Files

- `vite.config.ts` - Base path set to `/FetraReact/`
- `package.json` - Homepage set to GitHub Pages URL
- `dist/` - Built static files (auto-generated)

---

## Custom Domain (Optional)

If you have a custom domain like `fitrah-project.com`:

1. Go to repository Settings > Pages > Custom domain
2. Add your domain
3. Update DNS records (CNAME)

---

## Troubleshooting

### Blank page after deployment?
- Check that `base: '/FetraReact/'` matches your repo name
- Clear browser cache

### Images not loading?
- Ensure images are in `public/` folder (not `src/`)

### 404 errors?
- Check GitHub Pages source branch is set to `gh-pages`
