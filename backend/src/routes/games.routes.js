import express from 'express';
import * as gamesController from '../controllers/games.controller.js';
import { authMiddleware } from '../midware/auth.js';
import { adminOnly } from '../midware/role.js';

const router = express.Router();

router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);

router.post('/', authMiddleware, adminOnly, gamesController.createGame);
router.put('/:id', authMiddleware, adminOnly, gamesController.updateGame);
router.delete('/:id', authMiddleware, adminOnly, gamesController.deleteGame);

export default router;
