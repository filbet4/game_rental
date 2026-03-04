# 🎮 Game Rental System - Deployment Checklist

**Deadline: 29.01.2026, 23:59**

---

## ✅ Pre-Deployment Checklist (Local Testing)

### Backend Setup
- [ ] Python 3.8+ installed (`python --version` or `python3 --version`)
- [ ] Virtual environment created (`python -m venv venv` or `python3 -m venv venv`)
- [ ] Virtual environment activated
  - Windows: `venv\Scripts\activate`
  - Mac/Linux: `source venv/bin/activate`
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created with correct values:
  - PORT=3000
  - JWT_SECRET=dev-secret-key
  - CORS_ORIGIN=http://localhost:5500
- [ ] Database schema files exist:
  - `backend/db/schema.sql` ✅
  - `backend/db/seed.sql` ✅

### Frontend Setup
- [ ] All HTML files present (6 files):
  - index.html
  - login.html
  - register.html
  - games.html
  - myrentals.html
  - admin.html
- [ ] CSS file: `css/style.css`
- [ ] JavaScript files (5 files):
  - js/api.js
  - js/auth.js
  - js/games.js
  - js/rentals.js
  - js/admin.js
- [ ] API_BASE in `js/api.js` is correct for local:
  - `const API_BASE = 'http://localhost:3000/api';`

### Local Testing
- [ ] Start backend: `python run.py` (or `python3 run.py`)
  - Should see: "Running on http://127.0.0.1:3000"
- [ ] Start frontend: `python -m http.server 5500` (new terminal)
  - Should see: "Serving HTTP on port 5500"
- [ ] Open browser: `http://localhost:5500`
- [ ] Test login with test account:
  - Email: `admin@game.com`
  - Password: `password`
- [ ] Test features:
  - [ ] Can browse games
  - [ ] Can search/filter games
  - [ ] Can rent a game
  - [ ] Can view my rentals
  - [ ] Admin: Can access admin panel
  - [ ] Admin: Can create game
  - [ ] Admin: Can edit game
  - [ ] Admin: Can delete game
  - [ ] Admin: Can see all rentals
  - [ ] Can logout

### Verification Script
- [ ] Run verification: `cd backend && python verify.py`
- [ ] All checks pass:
  - ✅ Files exist
  - ✅ Dependencies installed
  - ✅ Database initialized
  - ✅ Backend running
  - ✅ Authentication works
  - ✅ API endpoints respond

---

## ✅ Pre-Deployment Checklist (Pascal Server Preparation)

### Code Preparation
- [ ] All code committed to Git (if using Git)
  - `git add .`
  - `git commit -m "Final version for submission"`
- [ ] All sensitive data removed from code:
  - No hardcoded JWT_SECRET
  - No database credentials
- [ ] `.env` file is in `.gitignore` (if using Git)
- [ ] Project structure is clean:
  - No node_modules folder
  - No venv folder in repo
  - No .sqlite database file in repo

### Pascal Server Access
- [ ] Can SSH to pascal.fis.agh.edu.pl:
  - `ssh your_username@pascal.fis.agh.edu.pl`
- [ ] Know your username
- [ ] Know your password or have SSH key set up
- [ ] Can transfer files (scp or Git)

### Deployment Script Preparation (if using automated deploy)
- [ ] Have username ready
- [ ] If on Windows: Check for Git Bash or WSL (for deploy.bat)
- [ ] If on Mac/Linux: deploy.sh ready to use

---

## ✅ Deployment Checklist (Pascal Server)

### Method 1: Using Deploy Script (Easiest)

**Windows:**
```bash
deploy.bat your_username
# Follow prompts
```

**Mac/Linux:**
```bash
bash deploy.sh your_username
# Follow prompts
```

- [ ] Script completes successfully
- [ ] Script output shows successful file transfer
- [ ] Script shows setup on server completed

### Method 2: Manual SSH Deployment

**Step 1: SSH and navigate**
```bash
ssh your_username@pascal.fis.agh.edu.pl
cd ~
```
- [ ] Connected to Pascal server

**Step 2: Upload project files**
```bash
# Option A: Using Git (if repository is public/accessible)
git clone https://your_repo_url.git game_rental

# Option B: Using scp from your computer (new terminal)
scp -r C:\game_rental\backend your_username@pascal.fis.agh.edu.pl:~/game_rental/backend
scp -r C:\game_rental\frontend your_username@pascal.fis.agh.edu.pl:~/game_rental/frontend
```
- [ ] Backend directory uploaded
- [ ] Frontend directory uploaded

**Step 3: Setup Python environment on server**
```bash
cd ~/game_rental/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
- [ ] Virtual environment created
- [ ] Dependencies installed successfully

**Step 4: Configure for Pascal server**
```bash
nano .env
# Edit these lines:
PORT=5207
CORS_ORIGIN=http://pascal.fis.agh.edu.pl:5207
JWT_SECRET=<strong-random-string-here>
FLASK_ENV=production

# Save: Ctrl+O, Enter, Ctrl+X
```
- [ ] .env file created with correct values
- [ ] JWT_SECRET is strong and unique

**Step 5: Test backend on Pascal**
```bash
python3 run.py
```
- [ ] Should see: "Running on http://0.0.0.0:5207"
- [ ] Or: "WARNING in app.runserver..."
- [ ] Backend is accessible at: `http://pascal.fis.agh.edu.pl:5207`

**Step 6: Keep backend running**
- [ ] Option A: Use `screen`:
  ```bash
  screen -S game_rental
  python3 run.py
  # Detach: Ctrl+A, then D
  ```
  - [ ] Detached from screen session
  - [ ] Backend still running in background

- [ ] Option B: Use `nohup`:
  ```bash
  nohup python3 run.py > server.log 2>&1 &
  ```
  - [ ] Process running in background
  - [ ] Logs in server.log

---

## ✅ Post-Deployment Checklist

### Frontend Update
- [ ] Update frontend API URL to Pascal server
  - Edit `frontend/js/api.js`
  - Change: `const API_BASE = 'http://pascal.fis.agh.edu.pl:5207/api';`
  - Comment out local URL

### Functional Testing on Pascal
- [ ] Backend health check:
  ```bash
  curl http://pascal.fis.agh.edu.pl:5207/health
  ```
  - [ ] Returns: `{"status":"ok"}`

- [ ] API test (from your computer):
  ```bash
  curl http://pascal.fis.agh.edu.pl:5207/api/games
  ```
  - [ ] Returns list of games

- [ ] Full functional test via browser:
  - [ ] Open frontend (hosted locally or on server)
  - [ ] Login: admin@game.com / password
  - [ ] Browse games
  - [ ] Rent a game
  - [ ] View rentals
  - [ ] Admin: Manage games
  - [ ] Logout

### SSL/HTTPS (if required)
- [ ] Check if Pascal requires HTTPS
  - [ ] If yes: Update CORS_ORIGIN to https://...
  - [ ] If yes: Update frontend API URLs to https://...

### Monitoring
- [ ] Backend logs show requests being processed
- [ ] No errors in console
- [ ] Database file exists: `backend/database.sqlite`
- [ ] All test data loaded (8 games, 2 users)

---

## ✅ Final Submission Checklist

### Code Quality
- [ ] All code formatted and readable
- [ ] No console errors or warnings (in browser dev tools)
- [ ] No backend errors in logs
- [ ] No hardcoded passwords or secrets
- [ ] All comments in Polish or English

### Documentation
- [ ] README_MAIN.md completed and clear
- [ ] README_PYTHON.md (backend docs) complete
- [ ] deployment instructions clear
- [ ] .env template includes all required variables

### Git/Version Control
- [ ] Code committed to Git (if required)
  ```bash
  git add .
  git commit -m "Final submission - Game Rental System"
  git push
  ```
- [ ] Repository is clean (no node_modules, venv, .env)
- [ ] All important files tracked

### W3C Compliance (University Requirement)
- [ ] HTML validates on W3C validator:
  - Visit: https://validator.w3.org/
  - Upload each HTML file
  - [ ] index.html: Valid
  - [ ] login.html: Valid
  - [ ] register.html: Valid
  - [ ] games.html: Valid
  - [ ] myrentals.html: Valid
  - [ ] admin.html: Valid

- [ ] UTF-8 encoding on all HTML files:
  - Check: `<meta charset="utf-8">`

### Browser Testing (University Requirement)
- [ ] Test on Firefox:
  - [ ] Login works
  - [ ] Games display
  - [ ] Can rent games
  - [ ] No console errors

- [ ] Test on Chrome:
  - [ ] Login works
  - [ ] Games display
  - [ ] Can rent games
  - [ ] No console errors

- [ ] Test on Edge:
  - [ ] Login works
  - [ ] Games display
  - [ ] Can rent games
  - [ ] No console errors

### Final Check
- [ ] Backend running on pascal.fis.agh.edu.pl:5207
- [ ] Frontend accessible and working
- [ ] All features functional
- [ ] All endpoints responding
- [ ] Database initialized with test data
- [ ] JWT authentication working
- [ ] Role-based access control working
- [ ] No errors or warnings

---

## 📋 Submission Details

**Platform**: pascal.fis.agh.edu.pl:5207  
**Deadline**: 29.01.2026, 23:59  
**Backend**: Python 3 + Flask  
**Frontend**: HTML + CSS + JavaScript  
**Database**: SQLite  

**What to submit**:
- [ ] Complete project code (Git repository or ZIP)
- [ ] Deployment instructions
- [ ] README with setup guide
- [ ] Link to running application on Pascal server

---

## 📞 Quick Reference

### Start Backend (Local)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python run.py
```

### Start Frontend (Local)
```bash
python -m http.server 5500
```

### Deploy to Pascal
```bash
# Automated (Windows)
deploy.bat your_username

# Automated (Mac/Linux)
bash deploy.sh your_username

# Manual SSH
ssh your_username@pascal.fis.agh.edu.pl
cd ~/game_rental/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
nano .env  # Set PORT=5207, CORS_ORIGIN, JWT_SECRET
python3 run.py
```

### Test Login
```
Email: admin@game.com
Password: password
```

### Verify Setup
```bash
cd backend
python verify.py
```

---

## ✨ Status

**Overall Status: READY FOR DEPLOYMENT** ✅

- Backend: Complete ✅
- Frontend: Complete ✅
- Database: Complete ✅
- Documentation: Complete ✅
- Deployment Scripts: Complete ✅
- Test Data: Complete ✅

**Next Action**: Deploy to Pascal server (see Deployment Checklist above)

---

**Good luck with your submission! 🚀**

---

*Last updated: Today*
*Deadline: 29.01.2026, 23:59*
