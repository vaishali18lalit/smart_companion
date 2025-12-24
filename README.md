# Smart Knowledge Companion

A web app that helps you learn and stay informed while working with real-time content from multiple domains.

## Quick Start

**Option 1: Use the start scripts**
```bash
# Terminal 1: Start backend
./start-backend.sh

# Terminal 2: Start frontend  
./start-frontend.sh
```

**Option 2: Manual start**
```bash
# Terminal 1: Start backend
cd backend && node server-demo.js

# Terminal 2: Start frontend
cd frontend && npm start
```

The app will open at: http://localhost:3000

## Features
- ✅ Multi-domain knowledge feed (AI research, general knowledge, news)
- ✅ Context-aware AI explanations (demo mode)
- ✅ Interactive chat interface
- ✅ Micro-break learning prompts (every 30 minutes)
- ✅ Progress tracking

## Demo Mode
Currently running in demo mode with:
- Sample content instead of live API feeds
- Mock AI responses instead of OpenAI
- In-memory storage instead of MongoDB

## Full Setup (with real APIs)
1. Get API keys:
   - OpenAI: https://platform.openai.com/api-keys
   - NewsAPI: https://newsapi.org/
2. Add keys to `backend/.env`
3. Install MongoDB
4. Use `backend/server.js` instead of `server-demo.js`

## Tech Stack
- Frontend: React
- Backend: Node.js/Express  
- Database: MongoDB (or in-memory for demo)
- AI: OpenAI API (or mock for demo)