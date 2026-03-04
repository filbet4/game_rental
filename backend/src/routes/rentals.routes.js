import express from 'express';
import * as rentalsController from '../controllers/rentals.controller.js';
import { authMiddleware } from '../midware/auth.js';
import { adminOnly } from '../midware/role.js';

const router = express.Router();

router.post('/', authMiddleware, rentalsController.rentGame);
router.post('/:id/return', authMiddleware, rentalsController.returnRental);
router.get('/me', authMiddleware, rentalsController.getUserRentals);
router.get('/', authMiddleware, adminOnly, rentalsController.getAllRentals);

export default router;
