#!/usr/bin/env node

/**
 * Game Rental System - Setup Verification
 * Run this after setup to verify everything is working
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:3000/api';
const checks = [];

function log(type, message) {
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️ ',
    warn: '⚠️ '
  };
  console.log(`${icons[type]} ${message}`);
}

async function checkBackendRunning() {
  try {
    const response = await fetch(`${API_URL.replace('/api', '')}/health`);
    if (response.ok) {
      log('success', 'Backend is running on http://localhost:3000');
      checks.push({ name: 'Backend Running', status: true });
      return true;
    }
  } catch (error) {
    log('error', 'Backend is not running. Start it with: cd backend && npm start');
    checks.push({ name: 'Backend Running', status: false });
    return false;
  }
}

async function checkDatabase() {
  try {
    const dbPath = path.join(process.cwd(), 'backend', 'database.sqlite');
    if (fs.existsSync(dbPath)) {
      log('success', 'Database file exists');
      checks.push({ name: 'Database File', status: true });
      return true;
    } else {
      log('warn', 'Database file not found. It will be created on first backend start.');
      checks.push({ name: 'Database File', status: false });
      return false;
    }
  } catch (error) {
    log('error', `Database check failed: ${error.message}`);
    checks.push({ name: 'Database File', status: false });
    return false;
  }
}

async function checkAuth() {
  try {
    // Try login
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@game.com',
        password: 'password'
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        log('success', 'Authentication working (test login successful)');
        checks.push({ name: 'Authentication', status: true });
        return data.token;
      }
    }

    log('error', 'Authentication check failed. Make sure database is seeded.');
    checks.push({ name: 'Authentication', status: false });
    return null;
  } catch (error) {
    log('error', `Auth check failed: ${error.message}`);
    checks.push({ name: 'Authentication', status: false });
    return null;
  }
}

async function checkGamesAPI(token) {
  try {
    const response = await fetch(`${API_URL}/games`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const games = await response.json();
      log('success', `Games API working (${games.length} games in database)`);
      checks.push({ name: 'Games API', status: true });
      return true;
    }
  } catch (error) {
    log('error', `Games API check failed: ${error.message}`);
    checks.push({ name: 'Games API', status: false });
    return false;
  }
}

async function checkEnvironment() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      if (content.includes('PORT=') && content.includes('JWT_SECRET=')) {
        log('success', '.env file is configured');
        checks.push({ name: '.env Configuration', status: true });
        return true;
      }
    }
    log('warn', '.env file missing or incomplete');
    checks.push({ name: '.env Configuration', status: false });
    return false;
  } catch (error) {
    log('error', `.env check failed: ${error.message}`);
    checks.push({ name: '.env Configuration', status: false });
    return false;
  }
}

async function runVerification() {
  console.clear();
  console.log('🎮 Game Rental System - Setup Verification\n');
  console.log('═'.repeat(50));
  console.log('');

  // Check files
  console.log('📁 Checking files...');
  await checkEnvironment();
  await checkDatabase();
  console.log('');

  // Check backend
  console.log('🔌 Checking backend...');
  const backendRunning = await checkBackendRunning();

  if (!backendRunning) {
    console.log('');
    console.log('❌ Backend must be running to continue checks.');
    console.log('   Start it with: cd backend && npm start');
    console.log('');
    printSummary();
    return;
  }

  console.log('');

  // Check API
  console.log('🔐 Checking API...');
  const token = await checkAuth();

  if (!token) {
    console.log('');
    console.log('⚠️  Could not authenticate. Make sure:');
    console.log('   1. Backend has initialized the database');
    console.log('   2. seed.sql has been executed');
    console.log('   3. Test credentials exist (admin@game.com / password)');
    console.log('');
    printSummary();
    return;
  }

  console.log('');
  console.log('📊 Checking data...');
  await checkGamesAPI(token);

  console.log('');
  printSummary();

  // Success message
  console.log('');
  console.log('═'.repeat(50));
  const allPassed = checks.every(c => c.status);
  if (allPassed) {
    console.log('');
    console.log('✅ All checks passed!');
    console.log('');
    console.log('🚀 Next steps:');
    console.log('   1. Serve frontend: python -m http.server 5500');
    console.log('   2. Open browser: http://localhost:5500');
    console.log('   3. Login with: admin@game.com / password');
    console.log('');
  }
}

function printSummary() {
  console.log('═'.repeat(50));
  console.log('');
  console.log('📋 Summary:');
  checks.forEach(check => {
    const status = check.status ? '✅' : '❌';
    console.log(`  ${status} ${check.name}`);
  });
  console.log('');
}

// Run verification
runVerification().catch(error => {
  log('error', `Verification failed: ${error.message}`);
  process.exit(1);
});
