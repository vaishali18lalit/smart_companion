# Smart Knowledge Companion - Deployment Guide

## 🚀 Hosting Options

### Option 1: Vercel (Recommended - Free)
**Frontend + Backend in one deployment**

1. **Prepare for deployment:**
```bash
# Create vercel.json in root
{
  "builds": [
    { "src": "backend/server-openrouter.js", "use": "@vercel/node" },
    { "src": "frontend/build", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/backend/server-openrouter.js" },
    { "src": "/(.*)", "dest": "/frontend/build/$1" }
  ]
}
```

2. **Build frontend:**
```bash
cd frontend && npm run build
```

3. **Deploy:**
```bash
npm install -g vercel
vercel --prod
```

### Option 2: Railway (Easy - Free tier)
**Automatic deployment from GitHub**

1. **Push to GitHub**
2. **Connect Railway to your repo**
3. **Add environment variables in Railway dashboard**
4. **Deploy automatically**

### Option 3: Render (Free tier available)
**Separate frontend and backend**

**Backend:**
- Create new Web Service
- Connect GitHub repo
- Build command: `cd backend && npm install`
- Start command: `cd backend && node server-openrouter.js`

**Frontend:**
- Create new Static Site
- Build command: `cd frontend && npm run build`
- Publish directory: `frontend/build`

### Option 4: Heroku (Paid)
**Traditional platform**

```bash
# Install Heroku CLI
# Create Procfile in root:
web: cd backend && node server-openrouter.js

# Deploy:
heroku create your-app-name
git push heroku main
```

## 📋 Pre-deployment Checklist

### 1. Environment Variables
Set these in your hosting platform:
```
OPENAI_API_KEY=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
NEWS_API_KEY=23fbb98a94054c5dac2a9fea1ae3c8aa
PORT=3000
```

### 2. Update API URLs
In `frontend/src/services/api.js`:
```javascript
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-app-name.vercel.app/api'
  : '/api';
```

### 3. Build Scripts
Add to root `package.json`:
```json
{
  "scripts": {
    "build": "cd frontend && npm install && npm run build",
    "start": "cd backend && npm install && node server-openrouter.js",
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
  }
}
```

## 🎯 Recommended: Vercel Deployment

**Why Vercel:**
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy environment variables
- ✅ GitHub integration

**Quick Deploy:**
1. Push code to GitHub
2. Connect Vercel to GitHub
3. Add environment variables
4. Deploy!

Your app will be live at: `https://your-app-name.vercel.app`

## 🔧 Production Optimizations

### 1. Add CORS for production
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : 'http://localhost:3000'
}));
```

### 2. Add rate limiting
```javascript
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

### 3. Enable compression
```javascript
const compression = require('compression');
app.use(compression());
```