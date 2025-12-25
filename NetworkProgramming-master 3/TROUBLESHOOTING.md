# Troubleshooting WebSocket Connection Issues

## If you see "WebSocket disconnected. Trying to reconnect..."

### Step 1: Check if the server is running

1. Make sure you've started the server:
   ```bash
   npm run dev
   ```

2. You should see output like:
   ```
   > Ready on http://localhost:3000
   > WebSocket server ready on ws://localhost:3000
   ```

3. If you see errors, check:
   - Are all dependencies installed? Run `npm install`
   - Is port 3000 already in use? Try changing the port in `server.js` or kill the process using port 3000

### Step 2: Check browser console

1. Open your browser's Developer Tools (F12 or Cmd+Option+I)
2. Go to the Console tab
3. Look for WebSocket connection messages:
   - "Attempting to connect to WebSocket: ws://localhost:3000"
   - "WebSocket connected successfully" (good!)
   - Any error messages (bad - share these)

### Step 3: Check server console

1. Look at the terminal where you ran `npm run dev`
2. When you open the page, you should see:
   - "WebSocket upgrade request received: /"
   - "WebSocket connection established"
   - "New WebSocket connection: player1 (Total connections: 1)"

### Step 4: Verify the connection

1. Open `http://localhost:3000` in your browser
2. Check the game info bar - it should show "Connection: ✅ Connected"
3. If it shows "❌ Disconnected", check:
   - Is the server actually running?
   - Are there any errors in the browser console?
   - Are there any errors in the server console?

### Step 5: Common issues and solutions

**Issue: Port 3000 is already in use**
- Solution: Kill the process using port 3000 or change the port in `server.js`

**Issue: "Cannot find module" errors**
- Solution: Run `npm install` to install all dependencies

**Issue: Server starts but WebSocket doesn't connect**
- Solution: Make sure you're accessing `http://localhost:3000` (not `http://127.0.0.1:3000` or another URL)

**Issue: Connection works but disconnects immediately**
- Solution: Check if there are any errors in the server console when the connection is made

### Step 6: Test the WebSocket manually

You can test if the WebSocket server is working by opening the browser console and running:

```javascript
const ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => console.log('Connected!');
ws.onerror = (e) => console.error('Error:', e);
ws.onclose = (e) => console.log('Closed:', e.code, e.reason);
```

If this works, the WebSocket server is functioning correctly.

