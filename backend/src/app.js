import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import gamesRoutes from './routes/games.routes.js';
import rentalsRoutes from './routes/rentals.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5500'
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/rentals', rentalsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
