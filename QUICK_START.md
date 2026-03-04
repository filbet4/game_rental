# 🚀 Quick Start Guide - 5 Minutes to Running

## The Fastest Way to Get It Working

### Step 1: Open TWO terminals

### Terminal 1: Start Backend
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python run.py
```

Wait for: `Running on http://127.0.0.1:3000`

### Terminal 2: Start Frontend
```bash
python -m http.server 5500
```

### Step 3: Open Browser
```
http://localhost:5500
```

### Step 4: Login
```
Email: admin@game.com
Password: password
```

✅ **Done!** You should now see the game library.

---

## What to Do Next

1. **Browse games** - Click "Games" to see all games
2. **Rent a game** - Click "Rent" on any game
3. **View rentals** - Click "My Rentals" to see your rentals
4. **Admin panel** - Click "Admin" (as admin user) to manage games

---

## To Deploy to Pascal Server

### Easiest: Use Deploy Script

**Windows:**
```bash
deploy.bat your_username
```

**Mac/Linux:**
```bash
bash deploy.sh your_username
```

Follow the script prompts.

### Manual (If Script Doesn't Work)

```bash
# SSH in
ssh your_username@pascal.fis.agh.edu.pl

# Setup
cd ~
git clone YOUR_REPO  # or upload files
cd game_rental/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Edit .env
nano .env
# Change:
#   PORT=5207
#   CORS_ORIGIN=http://pascal.fis.agh.edu.pl:5207
#   JWT_SECRET=<random-string>

# Run
python3 run.py
```

---

## Common Issues

### "python: command not found"
Use `python3` instead of `python`

### "Port 3000 already in use"
Edit `.env`: change `PORT=3000` to `PORT=3001`

### "Can't login"
- Make sure backend is running (Terminal 1)
- Try: `admin@game.com` / `password`

### "CORS error"
- Make sure CORS_ORIGIN in `.env` is correct
- Local: `http://localhost:5500`

### "Database not found"
Delete `database.sqlite` and restart backend - it auto-creates

---

## File Locations

**Backend Config**: `backend/.env`
**Frontend API URL**: `frontend/js/api.js`
**Database**: `backend/database.sqlite` (auto-created)
**Logs**: Console output from `python run.py`

---

## Stop Services

**Backend**: Ctrl+C in Terminal 1
**Frontend**: Ctrl+C in Terminal 2

---

## Deadline: 29.01.2026, 23:59

✅ Everything is ready to deploy!

See CHECKLIST.md for full deployment steps.
