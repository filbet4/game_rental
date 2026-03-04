import { getDatabase } from '../db/database.js';
import { hashPassword, comparePasswords } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (email, password) => {
  const db = getDatabase();

  // Check if user exists
  const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const result = await db.run(
    'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
    [email, passwordHash, 'USER']
  );

  return {
    id: result.lastID,
    email,
    role: 'USER'
  };
};

export const loginUser = async (email, password) => {
  const db = getDatabase();

  // Find user
  const user = await db.get('SELECT id, email, password_hash, role FROM users WHERE email = ?', [email]);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isValid = await comparePasswords(password, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
};
