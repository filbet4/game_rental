import * as rentalsService from '../services/rentals.service.js';

export const rentGame = async (req, res) => {
  try {
    const { gameId } = req.body;

    if (!gameId) {
      return res.status(400).json({ error: 'Game ID required' });
    }

    const rental = await rentalsService.rentGame(req.user.id, gameId);
    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const returnRental = async (req, res) => {
  try {
    const rental = await rentalsService.returnRental(
      req.params.id,
      req.user.id,
      req.user.role === 'ADMIN'
    );
    res.json(rental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserRentals = async (req, res) => {
  try {
    const rentals = await rentalsService.getUserRentals(req.user.id);
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRentals = async (req, res) => {
  try {
    const rentals = await rentalsService.getAllRentals();
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
