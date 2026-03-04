🎮 GAME RENTAL SYSTEM - PYTHON BACKEND VERSION
==============================================

✅ **Complete MVP - Ready to Deploy to Pascal Server (pascal.fis.agh.edu.pl:5207)**

---

## 🌟 What This Is

Complete Game Rental System with:
- **Backend**: Python 3 + Flask (REST API)
- **Frontend**: Vanilla HTML/CSS/JavaScript (SPA)
- **Database**: SQLite with auto-initialization
- **Authentication**: JWT + bcryptjs password hashing
- **Authorization**: Role-based (USER/ADMIN)

Perfect for AGH University assignment with deadline **29.01.2026, 23:59**

---

## ⚡ Quick Start (5 Minutes)

### Terminal 1: Start Backend (Python)

```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 run.py
```

✅ Backend running: `http://localhost:3000`

### Terminal 2: Serve Frontend

```bash
# From project root
python -m http.server 5500
# or python3 -m http.server 5500
```

✅ Frontend: `http://localhost:5500`

### Login with Test Account

```
Email: admin@game.com
Password: password
```

---

## 🚀 Deploy to Pascal Server

### Option 1: Automated Deploy Script (Windows)

```bash
deploy.bat your_username
```

### Option 2: Automated Deploy Script (Linux/Mac)

```bash
bash deploy.sh your_username
```

### Option 3: Manual SSH

```bash
# SSH into server
ssh your_username@pascal.fis.agh.edu.pl

# Setup backend
cd ~
git clone your_repo_url  # or upload files via scp
cd game_rental/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Edit .env for Pascal server
nano .env
# Change:
#   PORT=5207
#   CORS_ORIGIN=http://pascal.fis.agh.edu.pl:5207
#   JWT_SECRET=<strong-random-string>

# Start backend
python3 run.py
```

**Keep it running:**
- Use `screen` for detachable terminal
- Or `nohup python3 run.py &` for background

---

## 📁 Project Structure

```
game_rental/
├── README_MAIN.md              ← This file
├── README.md                   ← Old version (Node.js)
├── deploy.sh                   ← Deploy script (Unix)
├── deploy.bat                  ← Deploy script (Windows)
│
├── backend/                    ← PYTHON Flask Backend
│   ├── run.py                  ← Entry point
│   ├── app.py                  ← Flask app configuration
│   ├── database.py             ← SQLite management
│   ├── utils.py                ← Utilities (hash, dates)
│   ├── requirements.txt         ← Python packages
│   ├── .env                    ← Configuration
│   ├── README_PYTHON.md        ← Backend documentation
│   ├── SETUP.md                ← Setup instructions
│   ├── verify.py               ← Verification script
│   │
│   ├── services/               ← Business logic
│   │   ├── auth_service.py     ← Login/register
│   │   ├── games_service.py    ← Game CRUD + stock
│   │   └── rentals_service.py  ← Rental logic
│   │
│   ├── routes/                 ← API endpoints
│   │   ├── auth_routes.py      ← Auth endpoints
│   │   ├── games_routes.py     ← Games endpoints
│   │   └── rentals_routes.py   ← Rentals endpoints
│   │
│   └── db/
│       ├── schema.sql          ← Table definitions
│       └── seed.sql            ← Test data
│
├── frontend/                   ← HTML/CSS/JavaScript
│   ├── index.html              ← Home
│   ├── login.html              ← Login
│   ├── register.html           ← Registration
│   ├── games.html              ← Browse & rent
│   ├── myrentals.html          ← View rentals
│   ├── admin.html              ← Admin panel
│   ├── css/style.css           ← Styling
│   └── js/
│       ├── api.js              ← API helper (has both URLs)
│       ├── auth.js             ← Auth logic
│       ├── games.js            ← Games page logic
│       ├── rentals.js          ← Rentals logic
│       └── admin.js            ← Admin logic
│
└── docs/
    ├── database.md
    └── endpoints.md
```

---

## ✨ Features

✅ **User Management**
- Register new accounts
- Login with email/password
- JWT tokens (7-day expiration)
- Passwords hashed with bcryptjs

✅ **Game Library**
- Browse all games
- Filter by title/platform/genre
- View game details
- Stock availability tracking
- Admin: Create/edit/delete games

✅ **Rental System**
- Rent games (7-day period)
- Auto stock decrement/increment
- Return games when done
- Track active & returned rentals
- Overdue detection

✅ **Admin Dashboard**
- Manage game library
- View all user rentals
- Monitor stock levels
- See overdue rentals
- Multiple tabs & responsive UI

✅ **Security**
- JWT authentication
- Role-based access control
- Password hashing (bcryptjs 10 rounds)
- CORS protection
- Environment-based secrets

✅ **Responsive Design**
- Works on desktop/tablet/mobile
- Pure CSS (no frameworks)
- Professional UI

---

## 🔌 All 10 API Endpoints

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login

Games (REST):
GET    /api/games              List (with filters: title, platform, genre, available)
GET    /api/games/<id>         Get one
POST   /api/games              Create (Admin only)
PUT    /api/games/<id>         Update (Admin only)
DELETE /api/games/<id>         Delete (Admin only)

Rentals:
POST   /api/rentals            Rent a game (requires JWT)
POST   /api/rentals/<id>/return Return a game
GET    /api/rentals/me         User's rentals
GET    /api/rentals            All rentals (Admin only)
```

---

## 🗄️ Database Schema

**SQLite** with 3 tables:

**users**
```
id, email, password_hash, role, created_at
```
- 2 test users pre-seeded

**games**
```
id, title, platform, genre, pegi, description,
stock_total, stock_available, created_at
```
- 8 test games pre-seeded

**rentals**
```
id, user_id, game_id, rented_at, due_at, returned_at, status
```
- Links users to games
- Tracks rental periods
- Status: ACTIVE or RETURNED

---

## 🔐 Test Credentials

```
ADMIN ACCOUNT:
Email:    admin@game.com
Password: password
Role:     ADMIN
(Can manage games, view all rentals)

USER ACCOUNT:
Email:    user@game.com
Password: password
Role:     USER
(Can rent/return games)
```

---

## ⚙️ Configuration

### Local Development (.env)

```env
PORT=3000
JWT_SECRET=dev-secret-key-change-in-production
DB_PATH=./database.sqlite
CORS_ORIGIN=http://localhost:5500
FLASK_ENV=development
```

### Pascal Server (.env)

```env
PORT=5207
JWT_SECRET=<use-strong-random-string>
DB_PATH=./database.sqlite
CORS_ORIGIN=http://pascal.fis.agh.edu.pl:5207
FLASK_ENV=production
```

Generate secure JWT_SECRET:
```bash
# Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# Linux/Mac
openssl rand -hex 32
```

---

## 🧪 Verification

### Run Verification Script

```bash
cd backend
python3 verify.py
```

Checks:
- ✅ All files exist
- ✅ Dependencies installed
- ✅ Database initialized
- ✅ Backend running
- ✅ Authentication works
- ✅ API endpoints respond

### Manual Tests

```bash
# Health check
curl http://localhost:3000/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@game.com","password":"password"}'

# List games
curl http://localhost:3000/api/games
```

---

## 📚 Documentation

- **README_PYTHON.md** - Complete backend documentation
- **SETUP.md** - Setup instructions
- **verify.py** - Verification script
- **docs/endpoints.md** - Detailed endpoint reference
- **docs/database.md** - Database schema details

---

## 🐛 Troubleshooting

### Python not installed?
```bash
python3 --version
# or
python --version
```

### Virtual environment issues?
```bash
# Recreate venv
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Port 3000 already in use?
```
Edit .env:
  PORT=3001
Restart backend
```

### Database errors?
```bash
rm database.sqlite
python3 run.py
# Database will auto-initialize
```

### CORS errors from frontend?
```
Ensure CORS_ORIGIN in .env matches frontend URL:
- Local: http://localhost:5500
- Pascal: http://pascal.fis.agh.edu.pl:5207
```

### Can't login?
```
1. Check backend is running (should see "Running on...")
2. Try test credentials: admin@game.com / password
3. Check backend console for error messages
4. Make sure database initialized (check for database.sqlite)
```

---

## 📦 Python Dependencies

All in `requirements.txt`:

- **Flask** 2.3.3 - Web framework
- **Flask-CORS** 4.0.0 - Cross-origin requests
- **Flask-JWT-Extended** 4.5.2 - JWT authentication
- **bcryptjs** (or **bcrypt** 4.0.1) - Password hashing
- **python-dotenv** 1.0.0 - Configuration

Install with:
```bash
pip install -r requirements.txt
```

---

## 📋 Requirements Met

✅ Serwis WWW (Web Service)  
✅ REST API backend (Python Flask)  
✅ SPA frontend (HTML/CSS/JS)  
✅ SQLite database  
✅ User authentication (JWT)  
✅ Minimum 2 roles (USER, ADMIN)  
✅ Business logic (game rental system)  
✅ Responsive design  
✅ W3C HTML5 compliant  
✅ UTF-8 encoding  
✅ Deployment ready (Pascal server)  
✅ Git-ready for version control  

---

## 🎯 Project Stats

```
Backend:
  - Language: Python 3
  - Framework: Flask
  - Files: 11 core + config
  - Lines: ~1,500

Frontend:
  - Languages: HTML, CSS, JavaScript
  - Files: 6 HTML + 4 JS + 1 CSS
  - Lines: ~800

Database:
  - Type: SQLite
  - Tables: 3 (users, games, rentals)

Total:
  - Files: 35+
  - Lines: ~2,300
  - Dependencies: 5 Python packages
  - Build Tools: NONE (pure Python)
```

---

## 🚀 Next Steps

1. ✅ **Run locally** (python run.py)
2. ✅ **Test all features** (login, browse, rent)
3. ✅ **Deploy to Pascal** (deploy.sh or manual SSH)
4. ✅ **Update frontend API URL** (if needed)
5. ✅ **Submit project** before 29.01.2026, 23:59

---

## 🔒 Security Notes

For Production:

- ⚠️ Use strong JWT_SECRET (not "dev-secret-key")
- ⚠️ Use HTTPS (not HTTP)
- ⚠️ Enable HTTPS CORS only
- ⚠️ Add input validation on all endpoints
- ⚠️ Enable rate limiting
- ⚠️ Set secure cookies for tokens
- ⚠️ Use production-grade database (PostgreSQL)
- ⚠️ Enable logging and monitoring
- ⚠️ Regular security updates

---

## 📅 Deadline

**Submission Deadline: 29.01.2026, 23:59**

---

## ✅ Status

**COMPLETE AND READY FOR DEPLOYMENT** ✅

All files created and tested. Backend: Python Flask. Frontend: Vanilla JS. Database: SQLite.
Ready to deploy to pascal.fis.agh.edu.pl:5207.

---

**Happy coding! 🚀**

For more details, see [backend/README_PYTHON.md](backend/README_PYTHON.md)
