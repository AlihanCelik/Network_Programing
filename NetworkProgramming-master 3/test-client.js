const WebSocket = require('ws');

const port = process.argv[2] || 3000;
const ws = new WebSocket(`ws://localhost:${port}`);

console.log(`Connecting to ws://localhost:${port}...`);

ws.on('open', () => {
    console.log('Connected to server');

    // Keep connection open for 10 seconds
    setTimeout(() => {
        console.log('Closing connection normally');
        ws.close();
    }, 10000);
});

ws.on('message', (data) => {
    console.log('Received:', data.toString());
});

ws.on('close', (code, reason) => {
    console.log(`Disconnected: ${code} ${reason}`);
});

ws.on('error', (error) => {
    console.error('Error:', error.message);
});
