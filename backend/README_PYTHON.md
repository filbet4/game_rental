# Game Rental System - Python Backend

Complete REST API backend for Game Rental System written in **Python 3** using **Flask**.

## Quick Start (Local Development)

### 1. Create Virtual Environment
```bash
python -m venv venv
```

### 2. Activate Virtual Environment
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Backend
```bash
python run.py
```

✅ Server running on `http://localhost:3000`  
✅ Database auto-initializes  

## Configuration

Edit `.env` to change:
```env
PORT=3000                    # Backend port
JWT_SECRET=your-secret-key   # ⚠️ Change in production!
DB_PATH=./database.sqlite    # Database location
CORS_ORIGIN=http://localhost:5500  # Frontend URL
FLASK_ENV=development        # or 'production'
```

## Project Structure

```
backend/
├── run.py                   ← Entry point
├── app.py                   ← Flask app factory
├── database.py              ← SQLite management
├── utils.py                 ← Hash, dates utilities
├── requirements.txt         ← Python dependencies
├── .env                     ← Configuration
│
├── services/                ← Business logic
│   ├── auth_service.py
│   ├── games_service.py
│   └── rentals_service.py
│
├── routes/                  ← API endpoints
│   ├── auth_routes.py
│   ├── games_routes.py
│   └── rentals_routes.py
│
└── db/
    ├── schema.sql          ← Table definitions
    └── seed.sql            ← Test data
```

## API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Games
```
GET    /api/games (filters: ?title=X&platform=Y&genre=Z&available=true)
GET    /api/games/<id>
POST   /api/games (Admin)
PUT    /api/games/<id> (Admin)
DELETE /api/games/<id> (Admin)
```

### Rentals
```
POST   /api/rentals (User)
POST   /api/rentals/<id>/return (User/Admin)
GET    /api/rentals/me (User)
GET    /api/rentals (Admin)
```

## Test Credentials

```
Email: admin@game.com
Password: password
Role: ADMIN

Email: user@game.com
Password: password
Role: USER
```

## Database

SQLite database with 3 tables:
- **users** - User accounts with roles
- **games** - Game inventory with stock tracking
- **rentals** - Rental transactions

Auto-seeded with 8 test games and 2 test users.

## Deployment on Pascal Server

### 1. Connect via SSH
```bash
ssh your_username@pascal.fis.agh.edu.pl
```

### 2. Clone/Upload Project
```bash
# Upload to your directory
scp -r game_rental/ your_username@pascal.fis.agh.edu.pl:/home/your_username/

# Or clone if on server
git clone your_repo_url
cd game_rental/backend
```

### 3. Setup Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Configure for Server
Edit `.env`:
```env
PORT=5207                              # Your assigned port
JWT_SECRET=strong-random-secret-here   # Generate strong secret!
CORS_ORIGIN=http://pascal.fis.agh.edu.pl:5207  # Frontend URL
FLASK_ENV=production
```

### 5. Run Backend

**Option A: Direct (for testing)**
```bash
python run.py
```

**Option B: Using Screen (for persistent background)**
```bash
screen -S game_rental
python run.py
# Ctrl+A then D to detach
```

**Option C: Using nohup (simple background)**
```bash
nohup python run.py > backend.log 2>&1 &
```

**Option D: Using Gunicorn (production)**
```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:5207 --workers 4 'app:create_app()'
```

### 6. Update Frontend API URL
In `frontend/js/api.js`, uncomment:
```javascript
const API_BASE = 'http://pascal.fis.agh.edu.pl:5207/api';
```

## Troubleshooting

### Virtual environment errors
```bash
# Deactivate current env
deactivate

# Remove and recreate
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Port already in use
```bash
# Change PORT in .env to different number
# Update CORS_ORIGIN accordingly
```

### Database issues
```bash
# Delete and reinitialize
rm database.sqlite
python run.py  # Will recreate
```

### JWT errors
```bash
# Generate new JWT secret
python -c "import secrets; print(secrets.token_urlsafe(32))"
# Update JWT_SECRET in .env
```

### CORS errors from frontend
```bash
# Make sure CORS_ORIGIN in .env matches frontend URL exactly
# Include protocol and port
# Example: http://pascal.fis.agh.edu.pl:5207
```

## Verification

Run verification script:
```bash
python verify.py
```

Or test manually:
```bash
# Health check
curl http://localhost:3000/health

# List games
curl http://localhost:3000/api/games

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@game.com","password":"password"}'
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Server port |
| JWT_SECRET | (required) | JWT signing key |
| DB_PATH | ./database.sqlite | Database file location |
| CORS_ORIGIN | http://localhost:5500 | Allowed frontend origin |
| FLASK_ENV | development | development or production |

## Dependencies

- **Flask** - Web framework
- **Flask-CORS** - Cross-origin support
- **Flask-JWT-Extended** - JWT authentication
- **bcrypt** - Password hashing
- **python-dotenv** - Environment configuration

## Features

✅ User registration and authentication  
✅ JWT-based authorization  
✅ Role-based access control (USER/ADMIN)  
✅ Game inventory management  
✅ Rental tracking with 7-day periods  
✅ Stock management (auto increment/decrement)  
✅ Overdue detection  
✅ SQLite database with foreign keys  
✅ CORS support  
✅ Environment-based configuration  

## Security Notes

⚠️ **Before deploying to production:**
1. Change JWT_SECRET to strong random value
2. Set FLASK_ENV=production
3. Use HTTPS only
4. Store .env securely
5. Consider using Gunicorn/uWSGI + Nginx
6. Enable database encryption
7. Add rate limiting
8. Add input validation
9. Set up error logging

## License

MIT - Free for educational use

## Support

See main README.md for complete project documentation.
