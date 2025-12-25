const WebSocket = require('ws');

const port = process.argv[2] || 3000;
const ws = new WebSocket(`ws://localhost:${port}`);

console.log(`Connecting to ws://localhost:${port}...`);

ws.on('open', () => {
    console.log('Connected to server');

    // Exit immediately without closing to simulate crash/network failure
    setTimeout(() => {
        console.log('Exiting without close...');
        process.exit(0);
    }, 1000);
});

ws.on('error', (error) => {
    console.error('Error:', error.message);
});
