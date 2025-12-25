const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'game.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the SQLite database.');
    initDb();
  }
});

function initDb() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 100
  )`, (err) => {
    if (err) {
      console.error('Error creating table', err);
    } else {
      console.log('Users table initialized.');
    }
  });
}

function createUser(username, password) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, password, coins) VALUES (?, ?, 100)`,
      [username, password],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, username });
        }
      }
    );
  });
}

function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, username, wins, losses, coins FROM users WHERE username = ? AND password = ?`,
      [username, password],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function getUser(username) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, username, wins, losses, coins FROM users WHERE username = ?`,
      [username],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}


function updateStats(username, result) {
  // result: 'win' or 'loss'
  return new Promise((resolve, reject) => {
    let sql = '';
    if (result === 'win') {
      sql = `UPDATE users SET wins = wins + 1 WHERE username = ?`;
    } else if (result === 'loss') {
      sql = `UPDATE users SET losses = losses + 1 WHERE username = ?`;
    } else {
      return resolve(); // No update needed for draw/other
    }

    db.run(sql, [username], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function updateCoins(username, amount) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE users SET coins = coins + ? WHERE username = ?`,
      [amount, username],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

function getLeaderboard() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT username, wins, coins FROM users ORDER BY wins DESC LIMIT 10`,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  updateStats,
  updateCoins,
  getLeaderboard
};
