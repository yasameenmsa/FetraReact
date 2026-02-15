# Render Deployment Guide for Fitrah Project

## Ready to Deploy! 🚀

All images are verified and the project is configured for Render deployment.

---

## Method 1: Deploy via Render Dashboard (Recommended)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Configure for Render deployment"
git push
```

### Step 2: Connect to Render

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository: `yasameenmsa/FetraReact`

### Step 3: Configure

| Setting | Value |
|---------|-------|
| **Name** | fitrah-project |
| **Branch** | main |
| **Build Command** | npm run build |
| **Publish Directory** | dist |
| **Auto-Deploy** | ✅ Enable |

### Step 4: Deploy

Click **"Create Static Site"** and wait for deployment.

---

## Method 2: Deploy via Render Blueprint (Automatic)

The `render.yaml` file in your repo contains all the configuration.

1. Push your code to GitHub
2. Go to [dashboard.render.com](https://dashboard.render.com)
3. Click **"New +"** → **"Blueprint"**
4. Connect your repository
5. Render will automatically detect and apply the configuration

---

## Your Render URLs

After deployment:

- **Main URL**: `https://fitrah-project.onrender.com`
- **Preview URLs**: For every pull request

---

## Custom Domain (Optional)

### Add Your Domain in Render:

1. Go to your service in Render dashboard
2. Click **"Settings"** → **"Custom Domains"**
3. Add your domain (e.g., `fitrah-project.com`)
4. Render will provide DNS records to add to your domain provider

### DNS Records for Render:

```
Type: CNAME
Name: @
Value: [your-service-url].onrender.com
```

```
Type: CNAME
Name: www
Value: [your-service-url].onrender.com
```

---

## Features

✅ All images verified and working
✅ Auto-deploys on git push
✅ Pull request previews
✅ HTTPS/SSL included
✅ Custom domain support
✅ CDN included

---

## Troubleshooting

### Build Failed?
- Check that `npm run build` works locally
- Verify `package.json` has the build script

### Images Not Loading?
- Images must be in `public/` folder (not `src/`)
- All images are verified in the dist folder

### Site Not Updating?
- Render auto-deploys on push
- Check deployment logs in Render dashboard

---

## Environment Variables (Not Needed for Static Site)

This is a static site - no environment variables needed!

---

## Quick Commands

```bash
# Test build locally
npm run build

# Preview locally
npm run preview

# Deploy (via git push)
git push
```

