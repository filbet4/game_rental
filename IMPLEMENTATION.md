# 🎮 Game Rental System - Complete Implementation

A fully functional Game Rental System MVP with Node.js/Express backend and vanilla HTML/JS frontend. **Ready to run - no build tools needed.**

---

## ✅ What's Implemented

### Backend Features
- ✅ **Express REST API** with 10 endpoints
- ✅ **SQLite Database** with auto-initialization
- ✅ **JWT Authentication** with 7-day token expiration
- ✅ **Password Hashing** using bcryptjs (10 salt rounds)
- ✅ **Role-Based Access Control** (USER/ADMIN)
- ✅ **CORS Support** with configurable origin
- ✅ **Business Rules**
  - Rentals locked to 7-day period (auto-calculated)
  - Stock auto-decrements on rent, auto-increments on return
  - Cannot rent if stock ≤ 0
  - Cannot rent same game twice simultaneously
  - Overdue tracking without penalties
- ✅ **Middleware**
  - Authentication verification
  - Admin-only route protection
  - Role-based authorization

### Frontend Features
- ✅ **6 HTML Pages** (all responsive, mobile-friendly)
- ✅ **Authentication System**
  - Register/Login with JWT
  - Token + role stored in localStorage
  - Session persistence across pages
- ✅ **Games Browsing**
  - Real-time search by title
  - Filter by platform, genre
  - Filter by availability
  - Rent button with stock indication
- ✅ **Rental Management**
  - Active rentals with return button
  - Rental history
  - Overdue warnings
  - Due date display
- ✅ **Admin Dashboard**
  - Tabbed interface
  - Full CRUD for games
  - View all rentals with overdue status
  - Form validation
- ✅ **Styling**
  - Pure CSS (no frameworks)
  - CSS Grid & Flexbox responsive layout
  - Professional color scheme
  - Hover effects and transitions

### Database
- ✅ **3 Normalized Tables** with relationships
- ✅ **Foreign Key Constraints**
- ✅ **Indexes** on frequently queried columns
- ✅ **Auto-Seeding** with 8 test games
- ✅ **Transaction Safety** via PRAGMA foreign_keys

---

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start Backend
```bash
npm start
```
✅ Listens on `http://localhost:3000`  
✅ Auto-initializes SQLite database  
✅ Seeds 8 test games + 2 test users  

### 3. Serve Frontend (New Terminal)
```bash
# Windows (Python 3)
python -m http.server 5500

# macOS/Linux
python3 -m http.server 5500
```
✅ Open `http://localhost:5500`

### 4. Login
Test with either account:
```
Email: admin@game.com  OR  user@game.com
Password: password
```

---

## 📁 Project Structure

```
game_rental/
├── .env                          Configuration file
├── QUICKSTART.md                Quick setup guide
├── IMPLEMENTATION.md            This file
├── verify.js                    Setup verification script
│
├── backend/
│   ├── package.json             Dependencies
│   ├── README.md                Full documentation
│   ├── database.sqlite          SQLite database (auto-created)
│   │
│   └── src/
│       ├── server.js            ⭐ Entry point - starts server & DB
│       ├── app.js               ⭐ Express app setup
│       │
│       ├── controllers/         Route handlers
│       │   ├── auth.controller.js
│       │   ├── games.controller.js
│       │   └── rentals.controller.js
│       │
│       ├── services/            Business logic layer
│       │   ├── auth.service.js
│       │   ├── games.service.js
│       │   └── rentals.service.js
│       │
│       ├── routes/              Route definitions
│       │   ├── auth.routes.js
│       │   ├── games.routes.js
│       │   └── rentals.routes.js
│       │
│       ├── midware/             Middleware
│       │   ├── auth.js          ← JWT verification
│       │   └── role.js          ← Admin authorization
│       │
│       ├── utils/               Utilities
│       │   ├── hash.js          ← bcrypt password hashing
│       │   └── dates.js         ← Date utilities & overdue logic
│       │
│       └── db/                  Database setup
│           ├── database.js      ← SQLite wrapper with promisification
│           ├── schema.sql       ← Table definitions
│           └── seed.sql         ← Test data (8 games, 2 users)
│
└── frontend/
    ├── index.html               Home page
    ├── login.html               Login page
    ├── register.html            Registration page
    ├── games.html               ⭐ Browse & rent games
    ├── myrentals.html           ⭐ View your rentals
    ├── admin.html               ⭐ Admin panel (games + rentals)
    │
    ├── css/
    │   └── style.css            Responsive styling
    │
    └── js/
        ├── api.js               ⭐ API helper with fetch wrapper
        ├── auth.js              Login/register logic
        ├── games.js             Games page logic
        ├── rentals.js           Rentals page logic
        └── admin.js             Admin dashboard logic
```

**⭐ = Critical files**

---

## 🔌 API Endpoints (Complete Reference)

### Authentication (Public)
```
POST /api/auth/register
├─ Body: { email, password }
└─ Returns: { token, user: { id, email, role } }

POST /api/auth/login
├─ Body: { email, password }
└─ Returns: { token, user: { id, email, role } }
```

### Games (Public Read, Protected Write)
```
GET /api/games
├─ Query: ?title=X&platform=Y&genre=Z&available=true
└─ Returns: Game[] (unlimited, all visible)

GET /api/games/:id
└─ Returns: Game object with full details

POST /api/games (Admin Only)
├─ Body: { title, platform, genre, pegi, description, stock_total }
└─ Returns: Created game

PUT /api/games/:id (Admin Only)
├─ Body: { title, platform, genre, pegi, description, stock_total }
└─ Returns: Updated game

DELETE /api/games/:id (Admin Only)
└─ Returns: 204 No Content
```

### Rentals (Protected)
```
POST /api/rentals (User)
├─ Body: { gameId }
├─ Logic: 
│   ├─ Check stock > 0
│   ├─ Decrement game.stock_available
│   ├─ Create rental with due_at = now + 7 days
│   └─ Check no active rental exists for this user+game
└─ Returns: Rental object

POST /api/rentals/:id/return (User or Admin)
├─ Authorization: User can return own, Admin can return any
├─ Logic:
│   ├─ Increment game.stock_available
│   ├─ Set returned_at = now
│   ├─ Set status = 'RETURNED'
│   └─ Calculate overdue flag
└─ Returns: Updated rental

GET /api/rentals/me (User)
├─ Returns: Rental[] for current user
├─ Includes: overdue flag for each rental
└─ Sorted: newest first

GET /api/rentals (Admin Only)
├─ Returns: Rental[] for all users
├─ Includes: user_email, game_title, overdue flag
└─ Sorted: newest first
```

---

## 🗄️ Database Schema

### users
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,      -- bcrypt hash
  role TEXT DEFAULT 'USER',          -- 'USER' or 'ADMIN'
  created_at DATETIME DEFAULT NOW
);
```

### games
```sql
CREATE TABLE games (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  platform TEXT NOT NULL,            -- PS5, PC, Switch, Xbox, etc
  genre TEXT NOT NULL,               -- RPG, Action, Racing, etc
  pegi TEXT NOT NULL,                -- 3, 7, 12, 16, 18
  description TEXT,
  stock_total INTEGER,               -- Total copies owned
  stock_available INTEGER,           -- Currently available for rent
  created_at DATETIME DEFAULT NOW
);
```

### rentals
```sql
CREATE TABLE rentals (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,          -- FK to users
  game_id INTEGER NOT NULL,          -- FK to games
  rented_at DATETIME NOT NULL,       -- When rental started
  due_at DATETIME NOT NULL,          -- When rental expires (7 days later)
  returned_at DATETIME,              -- When returned (NULL = active)
  status TEXT DEFAULT 'ACTIVE',      -- 'ACTIVE' or 'RETURNED'
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (game_id) REFERENCES games(id)
);

-- Indexes for performance
CREATE INDEX idx_rentals_user_id ON rentals(user_id);
CREATE INDEX idx_rentals_game_id ON rentals(game_id);
CREATE INDEX idx_rentals_status ON rentals(status);
```

**Sample Data (Seeded):**
```
Users:
- admin@game.com (ADMIN) / password
- user@game.com (USER) / password

Games (8 total):
- Elden Ring (PS5, Action RPG, PEGI 16, stock 5)
- The Legend of Zelda (Switch, Adventure, PEGI 7, stock 8)
- Baldurs Gate 3 (PC, RPG, PEGI 16, stock 3)
- Final Fantasy XVI (PS5, Action RPG, PEGI 16, stock 6)
- Starfield (Xbox Series X, Action RPG, PEGI 18, stock 4)
- Mario Kart 8 (Switch, Racing, PEGI 3, stock 10)
- Cyberpunk 2077 (PC, Action RPG, PEGI 18, stock 5)
- Hogwarts Legacy (Multi, Action RPG, PEGI 12, stock 7)
```

---

## 🔐 Authentication Flow

### Registration
```
User enters email/password
         ↓
POST /api/auth/register
         ↓
Backend: Hash password with bcryptjs (10 rounds)
         ↓
Insert into users table
         ↓
Return: token (JWT) + user object
         ↓
Frontend: Save token + role to localStorage
         ↓
Redirect to games.html
```

### Login
```
User enters email/password
         ↓
POST /api/auth/login
         ↓
Backend: Find user, verify password with bcryptjs
         ↓
Generate JWT token (expires in 7 days)
         ↓
Return: token + user object
         ↓
Frontend: Save to localStorage
         ↓
Redirect to games.html
```

### Subsequent Requests
```
Frontend: Read token from localStorage
         ↓
Include in header: Authorization: Bearer <token>
         ↓
Backend: Verify JWT signature
         ↓
Decode payload: { id, email, role }
         ↓
Attach to req.user
         ↓
Allow/deny based on role
```

---

## 🎮 User Workflows

### A Regular User's Journey

1. **Register**
   - Go to register.html
   - Enter email and password
   - Token + role saved to localStorage
   - Redirected to games.html

2. **Browse Games**
   - See all 8 test games
   - Search by title: "Elden Ring"
   - Filter by platform: "PS5"
   - See only available games (stock > 0)

3. **Rent a Game**
   - Click "Rent" button on Elden Ring
   - Stock auto-decrements: 5 → 4
   - Rental created with due_at = 7 days from now
   - Redirect to myrentals.html

4. **View My Rentals**
   - See "Active Rentals" section
   - Game title, rent date, due date, return button
   - See "Rental History" below
   - Return the game → moves to history

### An Admin's Journey

1. **Login as Admin**
   - admin@game.com / password
   - Navigate to admin.html
   - See "Admin" link in navbar

2. **Manage Games**
   - Click "Games Management" tab
   - Click "Add New Game"
   - Fill form, click Save
   - Can Edit or Delete existing games
   - Stock totals track inventory

3. **View All Rentals**
   - Click "Rentals Overview" tab
   - See all user rentals system-wide
   - Rentals show ⚠️ OVERDUE if due date passed
   - Cannot expire rentals (just tracks status)
   - Can manually return on behalf of users

---

## 🛠️ Configuration

### .env File
```env
PORT=3000                              # Backend port
JWT_SECRET=your-secret-key-here        # ⚠️ Change this in production!
DB_PATH=./database.sqlite              # SQLite database location
CORS_ORIGIN=http://localhost:5500      # Frontend URL for CORS
```

**⚠️ Security:** In production, set `JWT_SECRET` to a long, random, cryptographically secure string.

---

## 📋 Complete Feature Checklist

### ✅ Implemented Requirements

**Backend (Node.js + Express + SQLite)**
- [x] dotenv configuration with PORT, JWT_SECRET, DB_PATH, CORS_ORIGIN
- [x] CORS enabled for CORS_ORIGIN
- [x] SQLite auto-init: schema.sql then seed.sql
- [x] Auth: register/login with bcrypt + JWT
- [x] Roles: USER and ADMIN stored in users table
- [x] Business rules:
  - [x] Stock decrements on rent if > 0
  - [x] Stock increments on return
  - [x] due_at = rented_at + 7 days
- [x] All required tables with proper schema
- [x] All required endpoints (10 total)
- [x] Middleware for auth & roles

**Frontend (Vanilla HTML/JS)**
- [x] 6 pages: index, login, register, games, myrentals, admin
- [x] api.js with API_BASE and fetch wrapper
- [x] Login/register store token + role in localStorage
- [x] games.html: list + filters + rent button
- [x] myrentals.html: active + history + return button
- [x] admin.html: CRUD games + view rentals + overdue indicator
- [x] Responsive styling with CSS

**Database**
- [x] users(id, email, password_hash, role, created_at)
- [x] games(id, title, platform, genre, pegi, description, stock_total, stock_available, created_at)
- [x] rentals(id, user_id, game_id, rented_at, due_at, returned_at, status)

---

## 🧪 Testing the System

### 1. Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@test.com","password":"test123"}'
```

### 2. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@game.com","password":"password"}'
```

### 3. Test Games List (with token)
```bash
curl http://localhost:3000/api/games \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Test Create Game (Admin only)
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"title":"Test Game","platform":"PS5","genre":"RPG","pegi":"16","description":"Test","stock_total":5}'
```

### 5. Browser Testing
- Open games.html
- Filter by platform "PS5"
- Rent "Elden Ring"
- Go to myrentals.html
- Return the game
- Go to admin.html
- Edit/delete games

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check Node.js
node --version

# Reinstall dependencies
npm install

# Check port 3000 is free
# On Windows: netstat -ano | findstr :3000
# On Mac/Linux: lsof -i :3000
```

### Database doesn't initialize?
```bash
# Delete existing database and restart
rm backend/database.sqlite
npm start

# Check logs for initialization messages
# Should see:
# ✓ "Initializing database..."
# ✓ "Schema initialized"
# ✓ "Database seeded"
```

### Can't authenticate?
```bash
# Verify test users were created
# In backend, manually check:
sqlite3 database.sqlite "SELECT * FROM users;"

# Should show:
# 1|admin@game.com|$2a$10$...|ADMIN|...
# 2|user@game.com|$2a$10$...|USER|...
```

### CORS errors in browser?
```javascript
// Check .env CORS_ORIGIN matches frontend URL
// If serving on different port, update .env:
CORS_ORIGIN=http://localhost:YOUR_PORT
```

### Stock management issues?
```bash
# Check rentals table
sqlite3 database.sqlite "SELECT * FROM rentals;"

# Check games.stock_available decremented
sqlite3 database.sqlite "SELECT title, stock_available FROM games;"
```

---

## 📚 File-by-File Explanation

### backend/src/server.js
- Loads .env with `dotenv/config`
- Initializes database (schema + seed)
- Starts Express on configured PORT
- Logs available endpoints

### backend/src/app.js
- Creates Express app
- Middleware: json parser, CORS
- Route registration: auth, games, rentals
- Health check endpoint

### backend/src/db/database.js
- Creates SQLite connection
- Promisifies sqlite3 callbacks
- Loads and executes schema.sql
- Loads and executes seed.sql
- Enables foreign keys with PRAGMA

### backend/src/utils/hash.js
- `hashPassword(password)` - bcryptjs hashing
- `comparePasswords(password, hash)` - verification

### backend/src/utils/dates.js
- `addDays(date, days)` - calculates rental due date
- `isOverdue(dueDate, returnedDate)` - checks if overdue
- `getCurrentTimestamp()` - ISO timestamp

### backend/src/midware/auth.js
- Extracts JWT from Authorization header
- Verifies signature against JWT_SECRET
- Attaches user data to req.user
- Returns 401 if invalid

### backend/src/midware/role.js
- Checks req.user.role === 'ADMIN'
- Returns 403 if not admin
- Allows request to continue if admin

### backend/src/services/auth.service.js
- `registerUser(email, password)` - creates user with hashed password
- `loginUser(email, password)` - verifies and returns JWT token

### backend/src/services/games.service.js
- `getAllGames(filters)` - list with title/platform/genre/availability filters
- `getGameById(id)` - single game details
- `createGame(data)` - new game with stock_total = stock_available
- `updateGame(id, data)` - edit game
- `deleteGame(id)` - remove game
- `decrementStock(gameId)` - rent (validates stock > 0)
- `incrementStock(gameId)` - return (caps at stock_total)

### backend/src/services/rentals.service.js
- `rentGame(userId, gameId)` - creates rental, decrements stock, validates rules
- `returnRental(rentalId, userId, isAdmin)` - processes return, increments stock
- `getUserRentals(userId)` - user's rentals with overdue flag
- `getAllRentals()` - admin view of all rentals

### backend/src/controllers/*.js
- Thin wrapper around services
- Handles HTTP request/response
- Input validation
- Error handling with appropriate status codes

### backend/src/routes/*.js
- Define endpoints
- Apply middleware (auth, admin)
- Call controllers

### frontend/js/api.js
- `apiCall(endpoint, options)` - fetch wrapper with auth header
- Helper functions for all endpoints
- Throws on non-2xx status
- Auto-includes JWT from localStorage

### frontend/js/auth.js
- Handles login.html and register.html
- Stores token + role + email in localStorage
- Redirect on success

### frontend/js/games.js
- Renders game cards grid
- Filter UI and logic
- Rent button with stock validation
- Click handler for rent

### frontend/js/rentals.js
- Fetches user's rentals
- Separates ACTIVE and RETURNED
- Renders cards with overdue indicator
- Return button and handler

### frontend/js/admin.js
- Tabbed interface for games and rentals
- Games management: create, edit, delete with form
- Rentals overview with overdue marking
- Admin-only authorization check

---

## 🎨 Frontend Pages Breakdown

### index.html
- **Purpose:** Home/landing page
- **Auth:** Optional (guest features)
- **Features:**
  - Hero section
  - Feature cards
  - Navigation
  - Login/Register links for guests
  - Links to Games/Admin for logged-in users

### login.html
- **Purpose:** User login
- **Auth:** No (public)
- **Features:**
  - Email/password form
  - Error display
  - Redirect to register.html
  - Token stored on success

### register.html
- **Purpose:** New user registration
- **Auth:** No (public)
- **Features:**
  - Email/password form
  - Same validation as login
  - Creates USER role account
  - Redirect to login.html

### games.html
- **Purpose:** Browse and rent games
- **Auth:** Required (redirects to login)
- **Features:**
  - Game grid (responsive)
  - Search by title
  - Filter by platform, genre
  - "Available only" checkbox
  - Stock display
  - Rent button (disabled if out of stock)
  - Real-time updates

### myrentals.html
- **Purpose:** User's rental management
- **Auth:** Required
- **Features:**
  - Active rentals section
  - Rental history section
  - Return button for each active
  - Overdue indicator with color
  - Due date countdown
  - Platform/genre info

### admin.html
- **Purpose:** Admin dashboard
- **Auth:** Required + ADMIN role only
- **Features:**
  - Tabbed interface (Games | Rentals)
  - Games Management:
    - Add new game form
    - Edit existing games
    - Delete games
    - Form validation
  - Rentals Overview:
    - All user rentals
    - User email
    - Overdue status
    - Date range display

---

## 🔄 Data Flow Examples

### User Renting a Game Flow
```
1. User on games.html clicks "Rent" for Elden Ring (game_id=1)
   ↓
2. Frontend calls: rentGame(1)
   ↓
3. Frontend does: POST /api/rentals with {gameId: 1} + JWT token
   ↓
4. Backend authMiddleware verifies JWT, sets req.user
   ↓
5. Backend rentalsController.rentGame validates:
   - Game exists and has stock > 0
   - User doesn't have active rental of same game
   ↓
6. Backend rentalsService.rentGame:
   - Calls gamesService.decrementStock(1)
     → Updates games.stock_available from 5 to 4
   - Creates rental with:
     - user_id = req.user.id
     - game_id = 1
     - rented_at = now
     - due_at = now + 7 days
     - status = 'ACTIVE'
   ↓
7. Backend returns rental object with rental.id
   ↓
8. Frontend receives response, shows success message
   ↓
9. User clicks "My Rentals"
   ↓
10. GET /api/rentals/me returns user's rentals
    ↓
11. Frontend renders card:
    - Title: Elden Ring
    - Rented: 2026-01-14
    - Due: 2026-01-21
    - Button: Return
```

### Admin Viewing Overdue Rentals Flow
```
1. Admin logs in and goes to admin.html
   ↓
2. Clicks "Rentals Overview" tab
   ↓
3. Frontend calls: getAllRentals()
   ↓
4. GET /api/rentals with Authorization header
   ↓
5. Backend authMiddleware verifies token
   ↓
6. Backend adminOnly middleware checks role === 'ADMIN'
   ↓
7. Backend rentalsController.getAllRentals calls rentalsService.getAllRentals()
   ↓
8. Service queries rentals + joins games and users:
   ```sql
   SELECT r.*, g.title, u.email 
   FROM rentals r 
   LEFT JOIN games g ON r.game_id = g.id 
   LEFT JOIN users u ON r.user_id = u.id
   ```
   ↓
9. For each rental, calculate:
   ```javascript
   rental.overdue = isOverdue(rental.due_at, rental.returned_at)
   // true if current date > due_at AND returned_at is null
   ```
   ↓
10. Returns array of rentals with overdue flag
    ↓
11. Frontend renders each as card with:
    - Class: "overdue" if rental.overdue
    - Display: ⚠️ OVERDUE if overdue
    - Red border/background
```

---

## 🚀 Deployment Considerations

**For Production:**

1. **Security**
   - Change JWT_SECRET to strong random value
   - Use HTTPS for all requests
   - Add input validation (joi, express-validator)
   - Add rate limiting (express-ratelimit)
   - Add helmet for security headers

2. **Database**
   - Consider PostgreSQL/MySQL instead of SQLite
   - Enable WAL mode for concurrency
   - Regular backups
   - Connection pooling

3. **Frontend**
   - Build with webpack/vite
   - Minify CSS/JS
   - Add error logging
   - HTTPS only

4. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Uptime monitoring
   - Log aggregation

---

## ✨ Extensions You Could Add

- Email notifications for due dates
- Late fees system
- Game ratings/reviews
- Wishlist functionality
- Payment integration
- Social features (borrowing from friends)
- Mobile app with React Native
- Analytics dashboard
- Email verification on signup
- Password reset functionality

---

## 📄 License

MIT - Free to use for learning and development

---

## 🎯 Summary

**This is a complete, working Game Rental System that:**
- ✅ Requires NO build tools
- ✅ Requires NO external databases
- ✅ Can be deployed in 5 minutes
- ✅ Implements all requested features
- ✅ Follows MVC architecture
- ✅ Uses industry-standard security practices
- ✅ Is easily extensible

**To run:**
1. `cd backend && npm install`
2. `npm start`
3. In another terminal: `python -m http.server 5500`
4. Open `http://localhost:5500`

**Enjoy your Game Rental System!** 🎮
