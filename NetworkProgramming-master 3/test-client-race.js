const WebSocket = require('ws');

const port = process.argv[2] || 3000;
const ws = new WebSocket(`ws://localhost:${port}`);

console.log(`Connecting to ws://localhost:${port}...`);

// Close immediately to simulate StrictMode cleanup during connection
setTimeout(() => {
    console.log('Closing immediately while connecting...');
    ws.close(1000, 'Component unmounting');
}, 10);

ws.on('open', () => {
    console.log('Connected to server (unexpected)');
});

ws.on('close', (code, reason) => {
    console.log(`Disconnected: ${code} ${reason}`);
});

ws.on('error', (error) => {
    console.error('Error:', error.message);
});
