## How to Start Smart Knowledge Companion

**Step 1: Open Terminal 1 and run:**
```bash
cd /Users/vaishalilalit/Desktop/amazonq/smart-knowledge-companion/backend
node server-demo.js
```

**Step 2: Open Terminal 2 and run:**
```bash
cd /Users/vaishalilalit/Desktop/amazonq/smart-knowledge-companion/frontend
npm start
```

**Step 3: Open browser to:**
http://localhost:3000

## If you get port errors:
The backend will try port 9000 (as set in .env file).
If that fails, manually set a different port:
```bash
PORT=9001 node server-demo.js
```

Then update frontend/package.json proxy to match the port you used.