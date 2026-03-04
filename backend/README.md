# Game Rental System - Complete MVP

A fully functional game rental system built with Node.js + Express + SQLite on the backend and vanilla HTML/JS on the frontend.

## Features

✅ **User Authentication** - Register, login with bcrypt + JWT  
✅ **Role-Based Access** - USER and ADMIN roles  
✅ **Game Management** - Browse, filter, create, update, delete games (Admin only)  
✅ **Rental System** - Rent games for 7 days, track returns  
✅ **Inventory Management** - Auto stock management on rent/return  
✅ **Overdue Tracking** - Track overdue rentals  
✅ **SQLite Database** - Auto-initialized with schema and seed data  
✅ **CORS Enabled** - Configurable for frontend development  

## Tech Stack

**Backend:**
- Node.js + Express
- SQLite3
- JWT Authentication
- Bcryptjs for password hashing
- CORS for frontend integration
- Dotenv for configuration

**Frontend:**
- Vanilla HTML/CSS/JavaScript
- LocalStorage for token management
- Responsive grid layout
- Real-time form validation

## Project Structure

```
game_rental/
├── .env                          # Environment variables
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── server.js            # Express server entry
│   │   ├── app.js               # App configuration
│   │   ├── controllers/         # Route handlers
│   │   ├── services/            # Business logic
│   │   ├── routes/              # API routes
│   │   ├── midware/             # Auth & role middleware
│   │   ├── utils/               # Hash & date utilities
│   │   └── db/                  # Database setup
│   │       ├── database.js
│   │       ├── schema.sql
│   │       └── seed.sql
│   └── database.sqlite          # Generated SQLite database
└── frontend/
    ├── index.html               # Home page
    ├── login.html               # Login page
    ├── register.html            # Registration page
    ├── games.html               # Browse & rent games
    ├── myrentals.html           # User rentals
    ├── admin.html               # Admin panel
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js               # API helper
        ├── auth.js              # Auth logic
        ├── games.js             # Games page logic
        ├── rentals.js           # Rentals page logic
        └── admin.js             # Admin panel logic
```

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

The `.env` file at the root is already configured:
```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DB_PATH=./database.sqlite
CORS_ORIGIN=http://localhost:5500
```

**For production:** Change `JWT_SECRET` to a strong random string.

### 3. Start Backend Server

```bash
# From backend directory
npm start
```

The server will:
- Initialize SQLite database
- Run schema.sql (create tables)
- Run seed.sql (insert test data)
- Start listening on `http://localhost:3000`

### 4. Start Frontend

Open `frontend/index.html` in a browser or serve via:

```bash
# Python 3
python -m http.server 5500

# Python 2
python -m SimpleHTTPServer 5500

# Node.js (npx http-server)
npx http-server -p 5500
```

Open `http://localhost:5500` in your browser.

## Database

### Tables

**users**
- id: Primary key
- email: Unique email
- password_hash: Bcrypt hash
- role: USER or ADMIN
- created_at: Timestamp

**games**
- id: Primary key
- title, platform, genre, pegi: Game info
- description: Optional description
- stock_total: Total copies available
- stock_available: Copies currently available
- created_at: Timestamp

**rentals**
- id: Primary key
- user_id, game_id: Foreign keys
- rented_at: When rental started
- due_at: When rental expires (7 days from rented_at)
- returned_at: When game was returned (null if active)
- status: ACTIVE or RETURNED

## Test Credentials

**Admin Account:**
- Email: `admin@game.com`
- Password: `password`

**User Account:**
- Email: `user@game.com`
- Password: `password`

Both accounts use these bcrypt-hashed passwords from seed.sql.

## API Endpoints

### Authentication

```
POST   /api/auth/register         Register new user
POST   /api/auth/login            Login user
```

### Games

```
GET    /api/games                 List games (filterable)
GET    /api/games/:id             Get game details
POST   /api/games                 Create game (Admin)
PUT    /api/games/:id             Update game (Admin)
DELETE /api/games/:id             Delete game (Admin)
```

**Query Filters:**
- `?title=Elden` - Search by title
- `?platform=PS5` - Filter by platform
- `?genre=RPG` - Filter by genre
- `?available=true` - Only in-stock games

### Rentals

```
POST   /api/rentals               Rent a game (User)
POST   /api/rentals/:id/return    Return a game (User/Admin)
GET    /api/rentals/me            Get user's rentals (User)
GET    /api/rentals               Get all rentals (Admin)
```

## Features Explained

### Authentication
- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens expire in 7 days
- Token stored in localStorage on client
- Sent via `Authorization: Bearer <token>` header

### Stock Management
- Decrement stock when game is rented
- Increment stock when game is returned
- Cannot rent if stock_available ≤ 0
- Cannot rent same game twice simultaneously

### Due Dates
- Rental period: Always 7 days from rent date
- Due date auto-calculated on creation
- Overdue status marked in rentals list
- No late fees - system just tracks it

### Roles
- **USER**: Can browse games, rent, view own rentals, return own games
- **ADMIN**: Full access - manage games, view all rentals, override returns

## Frontend Pages

### index.html
- Home page with features overview
- Login/Register buttons for guests
- Navigation to Games and Admin panels for logged-in users

### login.html & register.html
- Simple authentication forms
- Stores token + role in localStorage
- Redirects to games.html on success

### games.html
- Browse all games with card layout
- Real-time filters: title, platform, genre, availability
- Rent button (disabled for out-of-stock)
- Requires authentication

### myrentals.html
- Shows active rentals at top
- Return button for each active rental
- Rental history below
- Overdue indicator with warning styling
- Requires authentication

### admin.html
- Tabbed interface for Games & Rentals
- **Games Tab**: Create, edit, delete games
- **Rentals Tab**: View all user rentals with overdue tracking
- Restricted to ADMIN role

## Running the Full Stack

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
# From workspace root
python -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

## Troubleshooting

### Database not initializing?
- Check `./database.sqlite` exists in backend directory
- Verify schema.sql and seed.sql are in `backend/src/db/`
- Check backend console for initialization messages

### CORS errors?
- Ensure `CORS_ORIGIN` in .env matches your frontend URL
- Default: `http://localhost:5500` (adjust if serving elsewhere)

### Can't rent games?
- Ensure you're logged in (check localStorage for token)
- Check game has stock_available > 0
- Check you don't already have active rental of that game

### Seeded test data not showing?
- Database only seeds if tables don't exist
- Delete `database.sqlite` and restart backend to reseed
- Check backend logs for seed confirmation

## API Response Examples

**Register/Login Success:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@game.com",
    "role": "USER"
  }
}
```

**Get Games:**
```json
[
  {
    "id": 1,
    "title": "Elden Ring",
    "platform": "PS5",
    "genre": "Action RPG",
    "pegi": "16",
    "description": "...",
    "stock_total": 5,
    "stock_available": 4,
    "created_at": "2026-01-14T00:00:00.000Z"
  }
]
```

**Rental Object:**
```json
{
  "id": 1,
  "user_id": 1,
  "game_id": 1,
  "game_title": "Elden Ring",
  "user_email": "user@game.com",
  "rented_at": "2026-01-14T10:00:00.000Z",
  "due_at": "2026-01-21T10:00:00.000Z",
  "returned_at": null,
  "status": "ACTIVE",
  "overdue": false
}
```

## Security Notes

⚠️ **Production Checklist:**
- [ ] Change JWT_SECRET in .env to a cryptographically secure random string
- [ ] Use HTTPS for API endpoints
- [ ] Set CORS_ORIGIN to your production domain
- [ ] Use environment-specific .env files
- [ ] Add rate limiting to auth endpoints
- [ ] Implement request validation (joi, zod)
- [ ] Add database backups
- [ ] Use proper error logging
- [ ] Never expose JWT_SECRET in code

## License

MIT - Use freely for learning and development.

## Notes

- This is a learning MVP. Not production-ready without security enhancements.
- All timestamps in UTC ISO format.
- Frontend uses fetch API (IE11+ required).
- No external CSS frameworks - vanilla CSS with CSS Grid/Flexbox.
- No build tools needed - frontend runs directly in browser.
