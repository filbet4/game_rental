import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db = null;

// Promisify sqlite3 methods
const promisifyDb = (database) => {
  const dbWrapper = {
    run: (sql, params = []) => {
      return new Promise((resolve, reject) => {
        database.run(sql, params, function(err) {
          if (err) reject(err);
          else resolve({ lastID: this.lastID, changes: this.changes });
        });
      });
    },
    get: (sql, params = []) => {
      return new Promise((resolve, reject) => {
        database.get(sql, params, (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
    },
    all: (sql, params = []) => {
      return new Promise((resolve, reject) => {
        database.all(sql, params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        });
      });
    },
    exec: (sql) => {
      return new Promise((resolve, reject) => {
        database.exec(sql, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    },
    close: () => {
      return new Promise((resolve, reject) => {
        database.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
  };
  return dbWrapper;
};

export const initDatabase = async (dbPath) => {
  const sqlite = sqlite3.verbose();
  const database = new sqlite.Database(dbPath);
  db = promisifyDb(database);

  await db.exec('PRAGMA foreign_keys = ON');

  // Check if tables exist
  const tables = await db.all(
    "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('users', 'games', 'rentals')"
  );

  if (tables.length === 0) {
    console.log('Initializing database...');
    
    // Run schema
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.exec(schema);
    console.log('Schema initialized');

    // Run seed
    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await db.exec(seed);
    console.log('Database seeded');
  } else {
    console.log('Database already initialized');
  }

  return db;
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

export const closeDatabase = async () => {
  if (db) {
    await db.close();
    db = null;
  }
};
