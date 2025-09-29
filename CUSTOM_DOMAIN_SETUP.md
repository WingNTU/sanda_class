# Custom Domain Setup Guide - www.wingsanda.com

## 🌐 Domain Configuration Steps

### 1. DNS Configuration (At Your Domain Provider)
Configure these DNS records for `wingsanda.com`:

```
Type    Name    Value                           TTL
CNAME   www     wingntu.github.io              3600
A       @       185.199.108.153                3600
A       @       185.199.109.153                3600
A       @       185.199.110.153                3600
A       @       185.199.111.153                3600
```

### 2. GitHub Pages Configuration
1. Go to your repository: https://github.com/WingNTU/sanda_class
2. Navigate to: **Settings** → **Pages**
3. Under **Custom domain**, enter: `www.wingsanda.com`
4. Check **"Enforce HTTPS"** (after DNS propagates)
5. Save settings

### 3. Verification Process
After setting up DNS (may take 24-48 hours):
1. Test domain: `https://www.wingsanda.com`
2. Verify redirect: `https://wingsanda.com` → `https://www.wingsanda.com`
3. Check SSL certificate is active
4. Test all website functionality

## 🔧 Technical Details

### CNAME File
- ✅ Created at: `client/public/CNAME`
- ✅ Contains: `www.wingsanda.com`
- ✅ Deployed automatically with GitHub Actions

### DNS Propagation
- **Timeframe**: 1-48 hours
- **Check status**: Use tools like whatsmydns.net
- **Temporary access**: Use GitHub Pages URL during propagation

### SSL/HTTPS
- **Automatic**: GitHub provides free SSL certificates
- **Activation**: Enable "Enforce HTTPS" after DNS propagates
- **Renewal**: Automatic by GitHub

## 🎯 Final URLs
- **Primary**: https://www.wingsanda.com
- **API Backend**: https://sanda-class.onrender.com
- **Fallback**: https://wingntu.github.io/sanda_class

## 🚨 Troubleshooting

### Common Issues:
1. **DNS not propagated**: Wait 24-48 hours
2. **SSL error**: Enable HTTPS enforcement after DNS works
3. **404 error**: Check CNAME file exists in repository
4. **Booking system**: Verify API URL in production environment

### Domain Provider Specific Instructions:

#### GoDaddy:
1. Go to DNS Management
2. Add CNAME: www → wingntu.github.io
3. Add A records for apex domain (@) → GitHub IPs

#### Cloudflare:
1. DNS settings
2. Add CNAME: www → wingntu.github.io (proxy off initially)
3. Add A records for @ → GitHub IPs
4. Enable proxy after setup

#### Namecheap:
1. Advanced DNS
2. Add CNAME: www → wingntu.github.io
3. Add A records for @ → GitHub IPs

## ✅ Testing Checklist
After DNS propagates:
- [ ] www.wingsanda.com loads the website
- [ ] HTTPS certificate is active
- [ ] Booking form submits successfully
- [ ] Telegram notifications work
- [ ] Mobile responsive design works
- [ ] All navigation links function
- [ ] Photo gallery loads properly

## 🔄 Deployment Workflow
1. Code changes pushed to GitHub
2. GitHub Actions builds and deploys
3. CNAME file ensures custom domain routing
4. Website updates automatically at www.wingsanda.com