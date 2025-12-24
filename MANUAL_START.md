## Manual Start Instructions

**Step 1: Start Backend**
```bash
cd /Users/vaishalilalit/Desktop/amazonq/smart-knowledge-companion/backend
PORT=9999 node server-working.js
```

**Step 2: Update Frontend Proxy**
Edit `frontend/package.json` and change:
```json
"proxy": "http://localhost:9999"
```

**Step 3: Start Frontend**
```bash
cd /Users/vaishalilalit/Desktop/amazonq/smart-knowledge-companion/frontend
npm start
```

**Step 4: Open Browser**
http://localhost:3000

The backend will run on port 9999, frontend on port 3000.