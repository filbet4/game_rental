import 'dotenv/config';
import app from './app.js';
import { initDatabase } from './db/database.js';

const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './database.sqlite';

const startServer = async () => {
  try {
    console.log('Initializing database...');
    await initDatabase(DB_PATH);
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Available endpoints:');
      console.log('  POST /api/auth/register');
      console.log('  POST /api/auth/login');
      console.log('  GET /api/games');
      console.log('  GET /api/games/:id');
      console.log('  POST/PUT/DELETE /api/games (Admin)');
      console.log('  POST /api/rentals');
      console.log('  POST /api/rentals/:id/return');
      console.log('  GET /api/rentals/me');
      console.log('  GET /api/rentals (Admin)');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
