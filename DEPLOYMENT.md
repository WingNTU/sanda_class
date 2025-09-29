# Sanda Class - Deployment Instructions

## 🌐 Live Website
- **Frontend**: https://www.wingsanda.com (Custom Domain)
- **GitHub Pages**: https://wingNTU.github.io/sanda_class (Fallback)
- **Backend**: https://sanda-class.onrender.com

## 🚀 Deployment Status
- ✅ Frontend: Deployed to GitHub Pages
- ✅ Backend: Deployed to Railway/Render
- ✅ MongoDB: Connected to Atlas
- ✅ Telegram Bot: Active

## 📱 Features Live
- ✅ Responsive design with Poppins font
- ✅ Smooth scrolling navigation  
- ✅ Interactive photo gallery with videos
- ✅ Booking system with form validation
- ✅ Real-time Telegram notifications
- ✅ MongoDB data storage

## 🔧 Environment Variables (Production)
### Frontend (.env.production)
```
VITE_API_URL=https://sanda-class-api.railway.app
```

### Backend (Platform Environment Variables)
```
MONGODB_URI=mongodb+srv://wingbeh1999:***@cluster0.nr4c5kd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3005
DATABASE_NAME=sanda_class
NODE_ENV=production
TELE_BOT_TOKEN=8277494810:***
TELEGRAM_CHAT_ID=170921255
```

## 🚀 Quick Deploy Commands

### Push to GitHub
```bash
git add .
git commit -m "Deploy Sanda Class website"
git push origin main
```

### Deploy Frontend (GitHub Pages)
1. Go to repository Settings → Pages
2. Select "GitHub Actions" as source
3. Automatic deployment on push to main

### Deploy Backend (Railway)
1. Connect GitHub repository
2. Add environment variables
3. Automatic deployment on push

## 📊 Performance
- ⚡ Fast loading with Vite optimization
- 📱 Mobile-optimized responsive design
- 🔒 Secure API with CORS protection
- 📈 Real-time booking notifications

## 🆘 Troubleshooting
- Check environment variables are set correctly
- Verify MongoDB connection string
- Ensure Telegram bot token is valid
- Check CORS settings for cross-origin requests