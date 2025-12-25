# Footballer Tic-Tac-Toe

A network programming project - A real-time multiplayer Tic-Tac-Toe game where players place footballers on a 3x3 grid based on the teams they played for.

## Overview

This is a full-stack web application that combines:
- **Backend**: Node.js server with Express and WebSocket support
- **Frontend**: React + Next.js client
- **Real-time Communication**: WebSocket for game events
- **Game Logic**: Server-side validation and state management

## Technology Stack

- **Backend**:
  - Node.js
  - Express.js (HTTP server)
  - WebSocket (ws library) for real-time communication
  - Next.js (custom server integration)

- **Frontend**:
  - React
  - Next.js (Pages Router)
  - TypeScript
  - CSS

## Project Structure

```
project-root/
├── package.json          # Dependencies and scripts
├── server.js             # Express + WebSocket + Next.js custom server
├── data/
│   └── players.json      # Football players data (40 players)
├── pages/
│   ├── _app.tsx          # Next.js app wrapper
│   └── index.tsx         # Main game page
├── styles/
│   └── globals.css       # Global styles
└── README.md             # This file
```

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Ensure players data exists**:
   The `data/players.json` file should contain an array of player objects with the following structure:
   ```json
   [
     {
       "name": "Lionel Messi",
       "teams": ["Barcelona", "PSG", "Inter Miami"]
     },
     ...
   ]
   ```

## Running the Application

1. **Start the server**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

2. **Open in browser**:
   Navigate to `http://localhost:3000`

3. **Play the game**:
   - **IMPORTANT**: To play with 2 players, you need to open **two separate browser windows or tabs** to `http://localhost:3000`
   - The **first** browser window/tab that connects becomes **Player 1**
   - The **second** browser window/tab becomes **Player 2**
   - Additional connections become **Spectators** (they can watch but not play)
   
   **Example:**
   1. Open `http://localhost:3000` in Chrome → This becomes Player 1
   2. Open `http://localhost:3000` in another Chrome window/tab (or Firefox) → This becomes Player 2
   3. Both players can now see the same game board and take turns

## How to Play

### Game Rules

1. **Board Setup**:
   - The board is a 3x3 grid
   - Rows represent one set of teams (e.g., Barcelona, Real Madrid, Manchester United)
   - Columns represent another set of teams (e.g., PSG, Juventus, Inter Miami)
   - Each cell represents the intersection of a row team and a column team

2. **Making a Move**:
   - Click on an empty cell
   - Select a footballer who has played for **BOTH** the row team and column team
   - Each footballer can only be used once per game
   - Players take turns (Player 1, then Player 2, etc.)

3. **Winning**:
   - Get 3 cells in a row (horizontally, vertically, or diagonally)
   - All 3 cells must belong to the same player
   - If all 9 cells are filled with no winner, it's a draw

### Example Move

- Click on cell at row "Barcelona" and column "PSG"
- Select "Lionel Messi" (who played for both Barcelona and PSG)
- The cell is now occupied by Player 1 with Lionel Messi

## Network Programming Aspects

### WebSocket Protocol

The game uses WebSocket for real-time bidirectional communication:

**Client → Server Messages**:
```json
{
  "type": "makeMove",
  "payload": {
    "row": 0,
    "col": 2,
    "playerName": "Lionel Messi"
  }
}
```

**Server → Client Messages**:
- `init`: Initial game state when client connects
- `moveAccepted`: Move was valid and applied
- `moveRejected`: Move was invalid (with reason)
- `turnChanged`: Current turn switched
- `gameOver`: Game ended (winner or draw)
- `gameReset`: Game was reset for a new round

### HTTP Endpoints

- `GET /health`: Health check endpoint
  - Returns: `{ "status": "ok" }`

- `GET /players`: Get list of all footballers
  - Returns: Array of player objects from `data/players.json`

### Server-Side Game Logic

The server maintains all game state in memory:
- **Board state**: 3x3 grid with player assignments
- **Current turn**: Tracks whose turn it is
- **Used footballers**: Set of footballers already placed on the board
- **Player connections**: Maps WebSocket connections to player roles

**Move Validation**:
1. Check if it's the correct player's turn
2. Check if the cell is empty
3. Check if the footballer exists in the players data
4. Check if the footballer's teams include BOTH row and column teams
5. Check if the footballer hasn't been used yet

**Winner Detection**:
- Checks all rows, columns, and diagonals for 3 consecutive cells by the same player
- Declares draw if board is full with no winner

## Code Architecture

### Server (`server.js`)

- **Express Setup**: HTTP server with custom routes
- **WebSocket Server**: Attached to the same HTTP server
- **Next.js Integration**: Custom server that delegates non-API routes to Next.js
- **Game State Management**: In-memory state with helper functions for validation and winner checking
- **Connection Management**: Tracks WebSocket connections and assigns player roles

### Client (`pages/index.tsx`)

- **React Hooks**: Uses `useState` and `useEffect` for state management
- **WebSocket Client**: Establishes connection and handles incoming messages
- **UI Components**: 
  - Game board with 3x3 grid
  - Player selection modal
  - Game status display
  - Error messages
- **Move Handling**: Validates moves client-side (for UX) and sends to server

## Development Notes

- The server runs on port 3000 by default (configurable via `PORT` environment variable)
- Game state is stored in memory (no database)
- The game supports one active room with 2 players
- Additional connections become spectators
- The game automatically resets 5 seconds after a game ends

## Troubleshooting

**WebSocket not connecting**:
- Ensure the server is running
- Check browser console for connection errors
- Verify the WebSocket URL matches the server URL

**Players not loading**:
- Check that `data/players.json` exists and is valid JSON
- Check server console for file read errors

**Moves not working**:
- Ensure it's your turn
- Verify the footballer has played for both teams
- Check that the footballer hasn't been used already

## License

ISC

