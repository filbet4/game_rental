from database import query_one, query_all, execute_insert, execute_update
from utils import add_days, get_current_timestamp, is_overdue
from datetime import datetime
from services.games_service import decrement_stock, increment_stock

def rent_game(user_id, game_id):
    from services.games_service import get_game_by_id
    game = get_game_by_id(game_id)
    
    if not game or game['stock_available'] <= 0:
        raise ValueError("Game not available for rent")
    
    active = query_one(
        "SELECT id FROM rentals WHERE user_id = ? AND game_id = ? AND status = ?",
        [user_id, game_id, 'ACTIVE']
    )
    
    if active:
        raise ValueError("You already have an active rental of this game")
    
    decrement_stock(game_id)
    
    now = get_current_timestamp()
    due = add_days(datetime.fromisoformat(now.replace('Z', '+00:00')), 7)
    due_str = due.isoformat() + 'Z'
    
    rental_id = execute_insert(
        """INSERT INTO rentals 
           (user_id, game_id, rented_at, due_at, status)
           VALUES (?, ?, ?, ?, ?)""",
        [user_id, game_id, now, due_str, 'ACTIVE']
    )
    
    return get_rental_by_id(rental_id)

def return_rental(rental_id, user_id, is_admin=False):
    rental = get_rental_by_id(rental_id)
    
    if not rental:
        raise ValueError("Rental not found")
    
    if not is_admin and rental['user_id'] != user_id:
        raise ValueError("Not authorized")
    
    if rental['status'] == 'RETURNED':
        raise ValueError("Already returned")
    
    increment_stock(rental['game_id'])
    
    now = get_current_timestamp()
    execute_update(
        "UPDATE rentals SET status = ?, returned_at = ? WHERE id = ?",
        ['RETURNED', now, rental_id]
    )
    
    return get_rental_by_id(rental_id)

def get_rental_by_id(rental_id):
    rental = query_one(
        """SELECT r.*, g.title as game_title, u.email as user_email
           FROM rentals r
           LEFT JOIN games g ON r.game_id = g.id
           LEFT JOIN users u ON r.user_id = u.id
           WHERE r.id = ?""",
        [rental_id]
    )
    
    if rental:
        rental['overdue'] = is_overdue(rental['due_at'], rental['returned_at'])
    
    return rental

def get_user_rentals(user_id):
    rentals = query_all(
        """SELECT r.*, g.title as game_title, g.platform, g.genre, g.pegi
           FROM rentals r
           LEFT JOIN games g ON r.game_id = g.id
           WHERE r.user_id = ?
           ORDER BY r.rented_at DESC""",
        [user_id]
    )
    
    for r in rentals:
        r['overdue'] = is_overdue(r['due_at'], r['returned_at'])
    
    return rentals

def get_all_rentals():
    rentals = query_all(
        """SELECT r.*, g.title as game_title, u.email as user_email
           FROM rentals r
           LEFT JOIN games g ON r.game_id = g.id
           LEFT JOIN users u ON r.user_id = u.id
           ORDER BY r.rented_at DESC"""
    )
    
    for r in rentals:
        r['overdue'] = is_overdue(r['due_at'], r['returned_at'])
    
    return rentals
