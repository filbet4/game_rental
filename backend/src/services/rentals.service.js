import { getDatabase } from '../db/database.js';
import { addDays, getCurrentTimestamp, isOverdue } from '../utils/dates.js';
import * as gamesService from './games.service.js';

export const rentGame = async (userId, gameId) => {
  const db = getDatabase();

  // Check if game exists and has stock
  const game = await gamesService.getGameById(gameId);
  if (!game || game.stock_available <= 0) {
    throw new Error('Game not available for rent');
  }

  // Check if user already has active rental of this game
  const activeRental = await db.get(
    'SELECT id FROM rentals WHERE user_id = ? AND game_id = ? AND status = ?',
    [userId, gameId, 'ACTIVE']
  );

  if (activeRental) {
    throw new Error('You already have an active rental of this game');
  }

  // Decrement stock
  await gamesService.decrementStock(gameId);

  // Create rental
  const now = getCurrentTimestamp();
  const dueDate = addDays(new Date(now), 7).toISOString();

  const result = await db.run(
    'INSERT INTO rentals (user_id, game_id, rented_at, due_at, status) VALUES (?, ?, ?, ?, ?)',
    [userId, gameId, now, dueDate, 'ACTIVE']
  );

  return getRentalById(result.lastID);
};

export const returnRental = async (rentalId, userId, isAdmin = false) => {
  const db = getDatabase();

  const rental = await getRentalById(rentalId);
  if (!rental) {
    throw new Error('Rental not found');
  }

  // Check authorization
  if (!isAdmin && rental.user_id !== userId) {
    throw new Error('Not authorized');
  }

  if (rental.status === 'RETURNED') {
    throw new Error('Already returned');
  }

  // Increment stock
  await gamesService.incrementStock(rental.game_id);

  // Update rental
  const now = getCurrentTimestamp();
  await db.run(
    'UPDATE rentals SET status = ?, returned_at = ? WHERE id = ?',
    ['RETURNED', now, rentalId]
  );

  return getRentalById(rentalId);
};

export const getRentalById = async (id) => {
  const db = getDatabase();
  const rental = await db.get(
    `SELECT r.*, g.title as game_title, u.email as user_email 
     FROM rentals r 
     LEFT JOIN games g ON r.game_id = g.id 
     LEFT JOIN users u ON r.user_id = u.id 
     WHERE r.id = ?`,
    [id]
  );

  if (rental) {
    rental.overdue = isOverdue(rental.due_at, rental.returned_at);
  }

  return rental;
};

export const getUserRentals = async (userId) => {
  const db = getDatabase();
  const rentals = await db.all(
    `SELECT r.*, g.title as game_title, g.platform, g.genre, p.pegi 
     FROM rentals r 
     LEFT JOIN games g ON r.game_id = g.id 
     LEFT JOIN games p ON p.id = g.id
     WHERE r.user_id = ?
     ORDER BY r.rented_at DESC`,
    [userId]
  );

  return rentals.map(r => ({
    ...r,
    overdue: isOverdue(r.due_at, r.returned_at)
  }));
};

export const getAllRentals = async () => {
  const db = getDatabase();
  const rentals = await db.all(
    `SELECT r.*, g.title as game_title, u.email as user_email 
     FROM rentals r 
     LEFT JOIN games g ON r.game_id = g.id 
     LEFT JOIN users u ON r.user_id = u.id 
     ORDER BY r.rented_at DESC`
  );

  return rentals.map(r => ({
    ...r,
    overdue: isOverdue(r.due_at, r.returned_at)
  }));
};
