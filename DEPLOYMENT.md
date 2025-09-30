# Sanda Class - Vercel Full-Stack Deployment

## 🌐 Live Website
- **Vercel**: https://your-app.vercel.app
- **Custom Domain**: (Configure after deployment)

## 🚀 Deployment Status
- ✅ **Full-stack Vercel deployment** (Frontend + Backend)
- ✅ MongoDB: Connected to Atlas
- ✅ Telegram Bot: Active notifications
- ✅ Serverless API functions

## 📱 Features Live
- ✅ Responsive design with Poppins font
- ✅ Smooth scrolling navigation  
- ✅ Interactive photo gallery with videos
- ✅ Booking system with form validation
- ✅ Real-time Telegram notifications
- ✅ MongoDB data storage

## 🔧 Vercel Environment Variables
Set these in your Vercel Dashboard → Project Settings → Environment Variables:

```bash
MONGODB_URI=mongodb+srv://wingbeh1999:***@cluster0.nr4c5kd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DATABASE_NAME=sanda_class
TELE_BOT_TOKEN=8277494810:***
TELEGRAM_CHAT_ID=170921255
NODE_ENV=production
```

## 🚀 Deploy to Vercel

### Prerequisites
1. **Vercel CLI** (install if needed):
   ```bash
   npm i -g vercel
   ```

2. **Navigate to root directory**:
   ```bash
   cd c:\Users\wingb\OneDrive\Desktop\sanda_class
   ```

### Deployment Steps

1. **Install Dependencies**:
   ```bash
   npm run install:all
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables listed above
   - **Important**: Set for "Production" environment

4. **Redeploy** (after setting environment variables):
   ```bash
   vercel --prod
   ```

### 📍 API Endpoints (after deployment)
- **Health Check**: `https://your-app.vercel.app/api/health`
- **Bookings**: `https://your-app.vercel.app/api/bookings`
- **Test Telegram**: `https://your-app.vercel.app/api/test-telegram`

## 📁 Project Structure (Optimized for Vercel)

```
sanda_class/
├── api/                    # Serverless functions
│   ├── bookings.js        # Handle booking submissions/retrieval
│   ├── health.js          # Health check endpoint
│   └── test-telegram.js   # Test Telegram notifications
├── client/                # React frontend
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   ├── dist/             # Build output (auto-generated)
│   └── package.json      # Client dependencies
├── vercel.json            # Vercel configuration
├── package.json           # Root dependencies & scripts
└── DEPLOYMENT.md          # This file
```

## 🐛 Troubleshooting

### 1. **Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules client/node_modules
npm run install:all
vercel --prod
```

### 2. **Environment Variables Not Working**
- Verify all variables are set in Vercel Dashboard
- Use exact variable names (case-sensitive)
- Redeploy after adding new variables

### 3. **MongoDB Connection Issues**
- Check `MONGODB_URI` format and credentials
- Verify MongoDB Atlas network access (0.0.0.0/0)
- Ensure database user permissions

### 4. **API Function Timeout**
- Functions have 30s max duration (configured in vercel.json)
- Check MongoDB connection speed
- Verify Telegram API response time

## ✅ Success Indicators

After successful deployment, you should see:
- ✅ Frontend loads at your Vercel URL
- ✅ `/api/health` returns status OK
- ✅ Booking form works and submits data
- ✅ Telegram notifications are sent
- ✅ Data is stored in MongoDB Atlas

## 🔄 Future Deployments

For updates, simply run:
```bash
vercel --prod
```

Vercel will automatically:
- Build your React frontend
- Deploy serverless API functions  
- Update your live site with zero downtime

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