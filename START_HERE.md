# 🎮 START HERE - Game Rental System Setup

Welcome! This is your complete Game Rental System ready for the AGH university assignment.

**Deadline: 29.01.2026, 23:59** ⏰

---

## 📋 What You Have

✅ Complete Python/Flask backend with 11 API endpoints  
✅ Complete HTML/CSS/JavaScript frontend  
✅ SQLite database with schema and test data  
✅ JWT authentication with bcryptjs  
✅ Role-based access control (USER/ADMIN)  
✅ Complete game rental system  
✅ Deployment scripts (for Pascal server)  
✅ Comprehensive documentation  

---

## 🚀 Get Started (Choose One)

### Option 1: Test Locally (5 minutes) ⭐ RECOMMENDED

**Step 1:** Open Terminal and go to backend directory
```bash
cd backend
```

**Step 2:** Create Python environment
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

**Step 3:** Install dependencies
```bash
pip install -r requirements.txt
```

**Step 4:** Start backend
```bash
python run.py
```

You should see:
```
Running on http://127.0.0.1:3000
```

**Step 5:** Open new terminal, start frontend
```bash
python -m http.server 5500
```

**Step 6:** Open browser
```
http://localhost:5500
```

**Step 7:** Login with test account
```
Email: admin@game.com
Password: password
```

✅ **Success!** The system is running.

---

### Option 2: Deploy to Pascal Server

See [CHECKLIST.md](CHECKLIST.md) for complete deployment instructions.

Quick version:
```bash
# Use automated deploy script
deploy.bat your_username      # Windows
bash deploy.sh your_username  # Mac/Linux

# Or SSH manually
ssh your_username@pascal.fis.agh.edu.pl
# Follow instructions in CHECKLIST.md
```

---

## 📚 Documentation (Read in Order)

1. **[QUICK_START.md](QUICK_START.md)** - 5-minute setup (START HERE for quick test)
2. **[STATUS.md](STATUS.md)** - What's included, what's done
3. **[CHECKLIST.md](CHECKLIST.md)** - Step-by-step deployment guide
4. **[README_MAIN.md](README_MAIN.md)** - Detailed overview
5. **[backend/README_PYTHON.md](backend/README_PYTHON.md)** - Backend documentation
6. **[FILES.md](FILES.md)** - Complete file list

---

## 🔐 Test Accounts

**Admin Account** (full access):
```
Email: admin@game.com
Password: password
Role: ADMIN
```

**Regular User Account**:
```
Email: user@game.com
Password: password
Role: USER
```

---

## ✨ What You Can Do

✅ Browse games library  
✅ Search/filter games by title, platform, genre  
✅ Rent games (7-day rental period)  
✅ View your active rentals  
✅ Return games when done  
✅ See rental history  

**Admin Only:**  
✅ Create new games  
✅ Edit existing games  
✅ Delete games  
✅ View all user rentals  
✅ See overdue rentals  

---

## 🛠️ Common Issues

### "python: command not found"
Use `python3` instead:
```bash
python3 -m venv venv
python3 run.py
```

### "Port 3000 already in use"
Edit `backend/.env`:
```
PORT=3001
```

### "Can't login"
Make sure backend is running (you should see "Running on..." message)

### "Database error"
Delete `backend/database.sqlite` and restart backend - it will auto-create

### "CORS error in browser"
Make sure CORS_ORIGIN in `backend/.env` matches frontend URL (should be `http://localhost:5500`)

---

## 📂 Project Structure

```
game_rental/
├── backend/              ← Python Flask backend
│   ├── run.py           (start here)
│   ├── requirements.txt  (pip install this)
│   ├── .env             (configuration)
│   └── db/
│       ├── schema.sql   (tables)
│       └── seed.sql     (test data)
│
├── frontend/            ← HTML/CSS/JavaScript
│   ├── *.html           (6 pages)
│   ├── css/style.css    (styling)
│   └── js/              (5 JavaScript files)
│
└── docs/                ← Documentation
    ├── QUICK_START.md
    ├── CHECKLIST.md
    ├── README_MAIN.md
    └── STATUS.md
```

---

## 💻 System Requirements

### For Local Testing:
- Python 3.8+ (check with `python --version`)
- That's it! No Node.js, no npm required

### For Pascal Server:
- SSH access to pascal.fis.agh.edu.pl
- Python 3 installed on server (usually available)

---

## ⏱️ Timeline

- **Now** → Test locally (5 minutes)
- **Today/Tomorrow** → Deploy to Pascal server (15 minutes)
- **Before 29.01.2026, 23:59** → Submit your project

You have plenty of time! ✅

---

## 🎯 Next Step

👉 **[Read QUICK_START.md for 5-minute setup →](QUICK_START.md)**

Or if you want detailed info:

👉 **[Read README_MAIN.md for full overview →](README_MAIN.md)**

Or if you're ready to deploy:

👉 **[Read CHECKLIST.md for deployment →](CHECKLIST.md)**

---

## 📞 Quick Reference

| Command | What it does |
|---------|------------|
| `python -m venv venv` | Create Python environment |
| `source venv/bin/activate` | Activate (Mac/Linux) |
| `venv\Scripts\activate` | Activate (Windows) |
| `pip install -r requirements.txt` | Install dependencies |
| `python run.py` | Start backend |
| `python -m http.server 5500` | Start frontend |
| `python verify.py` | Verify setup |

---

## 🎮 Features Summary

- ✅ User authentication (JWT)
- ✅ Game library management
- ✅ Rental system (7-day periods)
- ✅ Stock tracking
- ✅ Overdue detection
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ SQLite database
- ✅ REST API (11 endpoints)

---

## ✅ Everything Ready

All files are created and tested.  
All documentation is complete.  
All code is production-ready.  

**You're ready to go!** 🚀

---

**Start with:** [QUICK_START.md](QUICK_START.md) (5 minutes)  
**Then read:** [CHECKLIST.md](CHECKLIST.md) (for deployment)  
**Questions?** See [STATUS.md](STATUS.md)  

---

Good luck with your project! 🎉

**Deadline: 29.01.2026, 23:59** ⏰
