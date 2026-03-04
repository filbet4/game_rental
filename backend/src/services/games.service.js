import { getDatabase } from '../db/database.js';

export const getAllGames = async (filters = {}) => {
  let db = getDatabase();
  let query = 'SELECT * FROM games WHERE 1=1';
  const params = [];

  if (filters.title) {
    query += ' AND title LIKE ?';
    params.push(`%${filters.title}%`);
  }

  if (filters.platform) {
    query += ' AND platform = ?';
    params.push(filters.platform);
  }

  if (filters.genre) {
    query += ' AND genre = ?';
    params.push(filters.genre);
  }

  if (filters.available === 'true') {
    query += ' AND stock_available > 0';
  }

  query += ' ORDER BY title ASC';

  return db.all(query, params);
};

export const getGameById = async (id) => {
  const db = getDatabase();
  return db.get('SELECT * FROM games WHERE id = ?', [id]);
};

export const createGame = async (gameData) => {
  const db = getDatabase();
  const { title, platform, genre, pegi, description, stock_total } = gameData;

  const result = await db.run(
    'INSERT INTO games (title, platform, genre, pegi, description, stock_total, stock_available) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, platform, genre, pegi, description, stock_total, stock_total]
  );

  return getGameById(result.lastID);
};

export const updateGame = async (id, gameData) => {
  const db = getDatabase();
  const { title, platform, genre, pegi, description, stock_total } = gameData;

  await db.run(
    'UPDATE games SET title = ?, platform = ?, genre = ?, pegi = ?, description = ?, stock_total = ? WHERE id = ?',
    [title, platform, genre, pegi, description, stock_total, id]
  );

  return getGameById(id);
};

export const deleteGame = async (id) => {
  const db = getDatabase();
  await db.run('DELETE FROM games WHERE id = ?', [id]);
};

export const decrementStock = async (gameId, amount = 1) => {
  const db = getDatabase();
  const game = await getGameById(gameId);
  
  if (!game || game.stock_available < amount) {
    throw new Error('Insufficient stock');
  }

  await db.run(
    'UPDATE games SET stock_available = stock_available - ? WHERE id = ?',
    [amount, gameId]
  );

  return getGameById(gameId);
};

export const incrementStock = async (gameId, amount = 1) => {
  const db = getDatabase();
  
  await db.run(
    'UPDATE games SET stock_available = MIN(stock_available + ?, stock_total) WHERE id = ?',
    [amount, gameId]
  );

  return getGameById(gameId);
};
