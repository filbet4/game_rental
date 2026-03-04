import * as gamesService from '../services/games.service.js';

export const getAllGames = async (req, res) => {
  try {
    const games = await gamesService.getAllGames(req.query);
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGameById = async (req, res) => {
  try {
    const game = await gamesService.getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createGame = async (req, res) => {
  try {
    const { title, platform, genre, pegi, description, stock_total } = req.body;

    if (!title || !platform || !genre || !pegi || stock_total === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const game = await gamesService.createGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateGame = async (req, res) => {
  try {
    const game = await gamesService.updateGame(req.params.id, req.body);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteGame = async (req, res) => {
  try {
    await gamesService.deleteGame(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
