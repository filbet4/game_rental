# 📂 Game Rental System - Complete File List

**Total Files: 40+**

---

## Root Directory Files

```
game_rental/
├── README_MAIN.md              ← START HERE (Main overview)
├── README.md                   ← Old Node.js version (keep for reference)
├── QUICK_START.md              ← Quick 5-minute setup guide
├── CHECKLIST.md                ← Full deployment checklist
├── STATUS.md                   ← Project status report
├── FILES.md                    ← This file
├── deploy.sh                   ← Deploy script (Linux/Mac)
└── deploy.bat                  ← Deploy script (Windows)
```

---

## Backend Directory (17 Python files)

```
backend/
├── run.py                      ← Entry point (main application)
├── app.py                      ← Flask app factory
├── database.py                 ← SQLite database management
├── utils.py                    ← Utility functions
├── requirements.txt            ← Python dependencies
├── .env                        ← Configuration (create manually)
├── .env.example                ← Example configuration
├── README_PYTHON.md            ← Backend documentation
├── SETUP.md                    ← Setup instructions
├── verify.py                   ← Verification script
├── package.json                ← (Old Node.js - keep for reference)
├── README.md                   ← (Old Node.js - keep for reference)
│
├── services/                   ← Business logic
│   ├── auth_service.py         ← User login/register
│   ├── games_service.py        ← Game CRUD
│   └── rentals_service.py      ← Rental operations
│
├── routes/                     ← API endpoints
│   ├── auth_routes.py          ← /api/auth/* endpoints
│   ├── games_routes.py         ← /api/games/* endpoints
│   └── rentals_routes.py       ← /api/rentals/* endpoints
│
├── db/                         ← Database files
│   ├── schema.sql              ← Table definitions
│   └── seed.sql                ← Test data
│
└── src/                        ← (Old Node.js files - keep for reference)
    ├── app.js
    ├── server.js
    ├── controllers/
    ├── db/
    ├── midware/
    ├── routes/
    ├── services/
    ├── utils/
    └── database.sqlite         ← Auto-created when backend runs
```

---

## Frontend Directory (12 files)

```
frontend/
├── index.html                  ← Home page
├── login.html                  ← Login page
├── register.html               ← Registration page
├── games.html                  ← Browse & rent games
├── myrentals.html              ← View user's rentals
├── admin.html                  ← Admin dashboard
│
├── css/
│   └── style.css               ← All styling
│
└── js/
    ├── api.js                  ← API helper (has both local & Pascal URLs)
    ├── auth.js                 ← Authentication logic
    ├── games.js                ← Games page logic
    ├── rentals.js              ← Rentals page logic
    └── admin.js                ← Admin page logic
```

---

## Documentation Directory (2 files)

```
docs/
├── database.md                 ← Database schema documentation
└── endpoints.md                ← API endpoints reference
```

---

## Critical Files (Must Exist)

### For Backend to Work:

- ✅ `backend/requirements.txt` - Needed to install Python packages
- ✅ `backend/.env` - Configuration file (you must create/edit this)
- ✅ `backend/db/schema.sql` - Table definitions (auto-loaded)
- ✅ `backend/db/seed.sql` - Test data (auto-loaded)
- ✅ `backend/run.py` - Entry point (main Flask app)

### For Frontend to Work:

- ✅ `frontend/js/api.js` - Must have correct API_BASE URL
- ✅ All 6 HTML files in `frontend/` directory
- ✅ `frontend/css/style.css` - Styling

---

## Important Notes

### Files to Edit Before Deployment

1. **`backend/.env`** - Create from `.env.example` or edit manually:
   ```env
   PORT=3000                    # Local: 3000, Pascal: 5207
   JWT_SECRET=your-secret-key   # MUST change for production
   DB_PATH=./database.sqlite
   CORS_ORIGIN=http://localhost:5500   # Local, change for Pascal
   FLASK_ENV=development               # Change to "production" for Pascal
   ```

2. **`frontend/js/api.js`** - Update API URL (search for `API_BASE`):
   ```javascript
   // For local testing:
   const API_BASE = 'http://localhost:3000/api';
   
   // For Pascal server:
   // const API_BASE = 'http://pascal.fis.agh.edu.pl:5207/api';
   ```

### Files to Keep (Don't Delete)

- All backend Python files (essential for running backend)
- All frontend HTML/CSS/JS files (essential for running frontend)
- `db/schema.sql` and `db/seed.sql` (auto-creates database)
- `.env` - Your configuration (don't version control this)

### Files You Can Delete (Optional)

- `backend/src/` - Old Node.js files (only if you're 100% sure you won't need them)
- `backend/package.json` - Old Node.js (only if you're 100% sure you won't need it)
- `backend/README.md` - Old Node.js docs (keep `README_PYTHON.md` instead)
- `README.md` (root) - Old Node.js docs (use `README_MAIN.md` instead)

---

## File Count Summary

| Directory | Files | Notes |
|-----------|-------|-------|
| Root | 8 | README, guides, deploy scripts |
| backend/ | 11 | Python source files |
| backend/services/ | 3 | Business logic services |
| backend/routes/ | 3 | API route handlers |
| backend/db/ | 2 | SQL files for database |
| frontend/ | 6 | HTML pages |
| frontend/css/ | 1 | Stylesheet |
| frontend/js/ | 5 | JavaScript modules |
| docs/ | 2 | Documentation |
| **TOTAL** | **41** | **All ready** |

---

## File Creation Order (If Starting from Scratch)

1. Create directory structure
2. Copy `db/schema.sql` and `db/seed.sql`
3. Create all Python files in `backend/`
4. Create `.env` from `.env.example`
5. Create all frontend files in `frontend/`
6. Create deploy scripts and documentation
7. Test locally before deployment

---

## Size Overview

```
backend/
  ├── Python source: ~1,500 lines
  ├── Configuration: 50 lines
  ├── Database: 50 lines
  └── Documentation: 3,000+ lines

frontend/
  ├── HTML: ~500 lines
  ├── CSS: ~300 lines
  └── JavaScript: ~500 lines

Documentation:
  ├── Guides: ~2,000 lines
  ├── Checklists: ~500 lines
  └── References: ~500 lines

Total: ~9,000 lines of code & docs
```

---

## Git .gitignore (Recommended)

```
# Python
venv/
__pycache__/
*.pyc
*.pyo
.env
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp

# Database (will be auto-created)
database.sqlite
database.sqlite-journal

# Node (old files)
node_modules/
package-lock.json

# OS temp files
.tmp/
.temp/
```

---

## Verification Checklist

Run this to verify all files are present:

```bash
# Check backend files
ls backend/run.py                      # ✓ Entry point
ls backend/app.py                      # ✓ Flask app
ls backend/database.py                 # ✓ DB layer
ls backend/utils.py                    # ✓ Utilities
ls backend/requirements.txt             # ✓ Dependencies
ls backend/db/schema.sql               # ✓ Schema
ls backend/db/seed.sql                 # ✓ Seed data
ls backend/services/auth_service.py    # ✓ Auth logic
ls backend/services/games_service.py   # ✓ Games logic
ls backend/services/rentals_service.py # ✓ Rentals logic
ls backend/routes/auth_routes.py       # ✓ Auth routes
ls backend/routes/games_routes.py      # ✓ Games routes
ls backend/routes/rentals_routes.py    # ✓ Rentals routes

# Check frontend files
ls frontend/index.html                 # ✓ Home
ls frontend/login.html                 # ✓ Login
ls frontend/register.html              # ✓ Register
ls frontend/games.html                 # ✓ Games
ls frontend/myrentals.html             # ✓ Rentals
ls frontend/admin.html                 # ✓ Admin
ls frontend/css/style.css              # ✓ CSS
ls frontend/js/api.js                  # ✓ API helper
ls frontend/js/auth.js                 # ✓ Auth logic
ls frontend/js/games.js                # ✓ Games logic
ls frontend/js/rentals.js              # ✓ Rentals logic
ls frontend/js/admin.js                # ✓ Admin logic

# Check docs
ls README_MAIN.md                      # ✓ Main README
ls QUICK_START.md                      # ✓ Quick start
ls CHECKLIST.md                        # ✓ Checklist
ls STATUS.md                           # ✓ Status
```

Or use the verification script:
```bash
cd backend
python verify.py
```

---

## Reading Order (Recommended)

1. **README_MAIN.md** - Overview
2. **QUICK_START.md** - Get it running in 5 minutes
3. **STATUS.md** - Project status
4. **backend/README_PYTHON.md** - Backend details
5. **CHECKLIST.md** - For deployment
6. **FILES.md** - This file (for reference)

---

## For Questions

**Setup issues?** → See QUICK_START.md  
**How to deploy?** → See CHECKLIST.md  
**Backend details?** → See backend/README_PYTHON.md  
**API reference?** → See docs/endpoints.md  
**Database info?** → See docs/database.md  

---

**Everything is ready. You have all the files you need. Start with README_MAIN.md!**

Last Updated: Today  
Deadline: 29.01.2026, 23:59
