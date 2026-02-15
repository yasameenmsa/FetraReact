# Fix "Not Secure" Message on GitHub Pages

## Issue: "Not Secure" or "Connection Not Secure"

This happens when:
1. HTTPS is not enabled in GitHub Pages settings
2. DNS records are not configured correctly
3. DNS changes haven't propagated yet

## Step-by-Step Fix

### 1. Enable HTTPS in GitHub Pages

Go to your repository settings:
```
https://github.com/yasameenmsa/FetraReact/settings/pages
```

Find the "Enforce HTTPS" section and:
- ✅ Check "Enforce HTTPS"
- Click Save

### 2. Check DNS Records

Your domain provider (where you bought your domain) needs these DNS records:

#### For Root Domain (example: fitrah-project.com)
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

#### For WWW (example: www.fitrah-project.com)
```
Type: CNAME
Name: www
Value: yasameenmsa.github.io
```

### 3. DNS Propagation Time

DNS changes can take:
- **5 minutes** to **48 hours** to propagate
- Usually completes within 1-2 hours

### 4. Check DNS Status

You can check if DNS has propagated:
```
https://dnschecker.org/
```

Enter your domain to see if it's pointing to GitHub Pages.

---

## Troubleshooting

### Still seeing "Not Secure"?

1. **Wait longer** - SSL certificates can take up to 24 hours
2. **Clear browser cache** - Ctrl+Shift+Delete
3. **Try Incognito/Private mode** - Rules out cache issues
4. **Check DNS status** - Visit GitHub Pages deployment status

### DNS Status Check:
```
https://github.com/yasameenmsa/FetraReact/settings/pages
```

Look for any DNS error messages at the top of the page.

---

## Quick Checklist

- [ ] Custom domain added in GitHub Pages settings
- [ ] DNS records configured at domain provider
- [ ] "Enforce HTTPS" is enabled
- [ ] Waited at least 1 hour for DNS propagation
- [ ] Cleared browser cache
