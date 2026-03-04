📚 GAME RENTAL SYSTEM - DOCUMENTATION INDEX
==============================================

Welcome! Here's where to find everything you need.

---

## 🚀 START HERE

👉 **[START_HERE.md](START_HERE.md)** - Read this first! (2 minutes)

This is your entry point. It explains what you have and gives you 3 options.

---

## ⚡ Quick Setup (5 Minutes)

👉 **[QUICK_START.md](QUICK_START.md)** - Get running in 5 minutes

Copy-paste commands and you'll have the system running locally.

---

## ✅ Complete Status

👉 **[COMPLETE.md](COMPLETE.md)** - Everything that's included

What was created, what features work, statistics, etc.

---

## 📋 Deployment Checklist

👉 **[CHECKLIST.md](CHECKLIST.md)** - Step-by-step deployment guide

Use this to deploy to pascal.fis.agh.edu.pl:5207

---

## 📖 Full Overview

👉 **[README_MAIN.md](README_MAIN.md)** - Detailed project overview

Architecture, features, configuration, troubleshooting.

---

## 📂 File Inventory

👉 **[FILES.md](FILES.md)** - Complete file list and structure

What files exist, which ones to edit, which ones to keep.

---

## 📊 Project Status

👉 **[STATUS.md](STATUS.md)** - What's done, what's included

Components, implementation details, statistics.

---

## 📚 Backend Documentation

👉 **[backend/README_PYTHON.md](backend/README_PYTHON.md)** - Python/Flask backend guide

API endpoints, configuration, deployment notes, troubleshooting.

---

## 🔧 Backend Setup

👉 **[backend/SETUP.md](backend/SETUP.md)** - Backend setup instructions

Step-by-step guide for configuring the Python backend.

---

## 🧪 API Reference

👉 **[docs/endpoints.md](docs/endpoints.md)** - All 11 API endpoints documented

Request/response examples for each endpoint.

---

## 🗄️ Database Schema

👉 **[docs/database.md](docs/database.md)** - Database structure and relationships

Table definitions, indexes, foreign keys.

---

## 📑 Quick Navigation

| I want to... | Read this... |
|---|---|
| Get started quickly | [START_HERE.md](START_HERE.md) |
| Test locally (5 min) | [QUICK_START.md](QUICK_START.md) |
| Deploy to Pascal | [CHECKLIST.md](CHECKLIST.md) |
| Understand the project | [COMPLETE.md](COMPLETE.md) |
| Learn about features | [README_MAIN.md](README_MAIN.md) |
| Check what's included | [STATUS.md](STATUS.md) |
| Find a specific file | [FILES.md](FILES.md) |
| Understand the backend | [backend/README_PYTHON.md](backend/README_PYTHON.md) |
| Learn the API | [docs/endpoints.md](docs/endpoints.md) |
| View database schema | [docs/database.md](docs/database.md) |

---

## ⏱️ Time Breakdown

- **2 min**: Read START_HERE.md
- **5 min**: Follow QUICK_START.md to test locally
- **5 min**: Run verification script
- **15 min**: Deploy to Pascal with CHECKLIST.md
- **10 min**: Test on Pascal server

**Total: ~40 minutes to complete everything**

---

## 🎯 Recommended Reading Order

1. **START_HERE.md** ← You are here
2. **QUICK_START.md** ← Quick local test
3. **CHECKLIST.md** ← For deployment
4. **COMPLETE.md** ← If you want details
5. **README_MAIN.md** ← Full overview
6. **STATUS.md** ← Project inventory
7. **backend/README_PYTHON.md** ← If you modify backend
8. **docs/** ← Reference materials

---

## 🔑 Key Files to Know

### To Edit Before Deployment

- `backend/.env` - Configuration (PORT, JWT_SECRET, CORS_ORIGIN)
- `frontend/js/api.js` - API URL (switch from localhost to Pascal)

### To Keep Safe

- `backend/db/schema.sql` - Database schema (auto-loaded)
- `backend/db/seed.sql` - Test data (auto-loaded)
- All Python files in `backend/`
- All HTML/CSS/JS files in `frontend/`

### Nice to Have (Reference)

- Old Node.js files in `backend/src/` (for reference if needed)
- Old Node.js `backend/package.json` (for reference)

---

## 💻 System Commands

### Setup
```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate      # Windows
pip install -r requirements.txt
```

### Run Locally
```bash
python run.py              # Backend (Terminal 1)
python -m http.server 5500 # Frontend (Terminal 2)
```

### Deploy
```bash
bash deploy.sh your_username    # Mac/Linux
deploy.bat your_username        # Windows
```

### Verify
```bash
python verify.py
```

---

## 🆘 Need Help?

**Issue**: Can't start Python
- Solution: Use `python3` instead of `python`

**Issue**: Port 3000 already in use
- Solution: Edit `backend/.env` → change PORT=3001

**Issue**: CORS error
- Solution: Check CORS_ORIGIN in `.env` matches frontend URL

**Issue**: Can't login
- Solution: Make sure backend is running, try admin@game.com / password

**Issue**: Database error
- Solution: Delete `database.sqlite`, restart backend

See [QUICK_START.md](QUICK_START.md) for more troubleshooting.

---

## ✨ What You Have

✅ Complete Python Flask backend with 11 API endpoints
✅ Complete HTML/CSS/JavaScript frontend
✅ SQLite database with schema + test data
✅ JWT authentication + bcryptjs password hashing
✅ Role-based access control (USER/ADMIN)
✅ Game rental system with stock management
✅ Responsive design for all devices
✅ Deployment scripts for Pascal server
✅ Comprehensive documentation
✅ Verification script to test setup
✅ Test accounts pre-loaded
✅ Test games pre-loaded

**Status: READY FOR DEPLOYMENT** ✅

---

## 📅 Timeline

- **Today** - Test locally (quick!)
- **Within 24 hours** - Deploy to Pascal
- **Before 29.01.2026, 23:59** - Submit

You have plenty of time! ✅

---

## 🚀 Next Step

👉 **Read [START_HERE.md](START_HERE.md)** (takes 2 minutes)

Then choose:
- Quick test: [QUICK_START.md](QUICK_START.md)
- Deploy: [CHECKLIST.md](CHECKLIST.md)
- Learn more: [COMPLETE.md](COMPLETE.md)

---

**Everything is ready. You're good to go! 🎉**

Last Updated: Today
Deadline: 29.01.2026, 23:59
