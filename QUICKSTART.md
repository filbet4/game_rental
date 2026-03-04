# Game Rental System - Quick Start

## ⚡ 5-Minute Setup

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start Backend Server
```bash
npm start
```
✅ Server running on `http://localhost:3000`  
✅ Database auto-initialized with test data  

### Step 3: Serve Frontend
In a new terminal:
```bash
# Windows - Python 3
python -m http.server 5500

# macOS/Linux
python3 -m http.server 5500

# Or use Node.js
npx http-server -p 5500
```

### Step 4: Open in Browser
```
http://localhost:5500
```

## 🔐 Test Credentials

| Role  | Email            | Password |
|-------|------------------|----------|
| Admin | admin@game.com   | password |
| User  | user@game.com    | password |

## 📋 What's Included

✅ **Backend (Node.js + Express + SQLite)**
- Complete REST API with 8 endpoints
- JWT authentication with bcrypt
- Role-based access control (USER/ADMIN)
- Auto database initialization
- CORS enabled

✅ **Frontend (Vanilla HTML/CSS/JS)**
- 6 responsive pages
- Token-based authentication
- Game browsing with filters
- Rental management
- Admin dashboard
- No build tools needed

✅ **Database (SQLite)**
- 3 tables with proper relationships
- Auto-seeded with test games
- Foreign key constraints
- Stock management built-in

## 🎮 Features

- **Register/Login** - Create accounts and authenticate
- **Browse Games** - Filter by title, platform, genre
- **Rent Games** - 7-day rental period with auto stock management
- **Track Rentals** - View active rentals and history
- **Overdue Tracking** - See which rentals are overdue
- **Admin Panel** - Manage games and view all rentals
- **Stock Management** - Auto increment/decrement on rent/return

## 📁 Project Structure

```
game_rental/
├── .env                    # Configuration
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── server.js      # Entry point
│   │   ├── app.js         # Express app
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   ├── midware/       # Middleware
│   │   ├── utils/         # Utilities
│   │   └── db/            # Database files
│   └── database.sqlite    # Generated DB
└── frontend/
    ├── *.html             # 6 pages
    ├── css/style.css
    └── js/
        ├── api.js         # API helper
        ├── auth.js        # Auth logic
        ├── games.js       # Games page
        ├── rentals.js     # Rentals page
        └── admin.js       # Admin page
```

## 🔗 API Endpoints

```
POST   /api/auth/register      Register
POST   /api/auth/login         Login
GET    /api/games              List games
POST   /api/games              Create (Admin)
PUT    /api/games/:id          Update (Admin)
DELETE /api/games/:id          Delete (Admin)
POST   /api/rentals            Rent game
POST   /api/rentals/:id/return Return game
GET    /api/rentals/me         My rentals
GET    /api/rentals            All rentals (Admin)
```

## ⚙️ Configuration

Edit `.env` to change:
- `PORT` - Backend port (default: 3000)
- `JWT_SECRET` - JWT signing key (⚠️ change in production!)
- `DB_PATH` - SQLite database location
- `CORS_ORIGIN` - Frontend URL (default: http://localhost:5500)

## 🐛 Troubleshooting

**Backend won't start?**
- Check Node.js is installed: `node --version`
- Run `npm install` in backend directory
- Check port 3000 is not in use

**Database not initializing?**
- Delete `backend/database.sqlite` and restart
- Check `backend/src/db/schema.sql` and `seed.sql` exist
- Check backend console for errors

**CORS errors?**
- Update `CORS_ORIGIN` in `.env` to match frontend URL
- Make sure frontend is served from the correct port

**Can't authenticate?**
- Clear browser localStorage
- Verify test credentials above
- Check backend console for errors

## 📖 For More Details

See [backend/README.md](backend/README.md) for:
- Complete API documentation
- Database schema details
- Security considerations
- Advanced configuration

## 🚀 Next Steps

1. ✅ Run the system (5 min setup above)
2. Test authentication with provided credentials
3. Browse and rent games
4. Check admin panel
5. Explore the code structure
6. Customize as needed

**Enjoy your Game Rental System!** 🎮
