from database import query_all, query_one, execute_insert, execute_update, execute_delete

def get_all_games(filters=None):
    query = "SELECT * FROM games WHERE 1=1"
    params = []
    
    if filters:
        if filters.get('title'):
            query += " AND title LIKE ?"
            params.append(f"%{filters['title']}%")
        
        if filters.get('platform'):
            query += " AND platform = ?"
            params.append(filters['platform'])
        
        if filters.get('genre'):
            query += " AND genre = ?"
            params.append(filters['genre'])
        
        if filters.get('available') == 'true':
            query += " AND stock_available > 0"
    
    query += " ORDER BY title ASC"
    return query_all(query, params)

def get_game_by_id(game_id):
    return query_one("SELECT * FROM games WHERE id = ?", [game_id])

def create_game(game_data):
    game_id = execute_insert(
        """INSERT INTO games 
           (title, platform, genre, pegi, description, stock_total, stock_available)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        [
            game_data['title'],
            game_data['platform'],
            game_data['genre'],
            game_data['pegi'],
            game_data.get('description', ''),
            game_data['stock_total'],
            game_data['stock_total']
        ]
    )
    
    return get_game_by_id(game_id)

def update_game(game_id, game_data):
    execute_update(
        """UPDATE games 
           SET title=?, platform=?, genre=?, pegi=?, description=?, stock_total=?
           WHERE id=?""",
        [
            game_data['title'],
            game_data['platform'],
            game_data['genre'],
            game_data['pegi'],
            game_data.get('description', ''),
            game_data['stock_total'],
            game_id
        ]
    )
    
    return get_game_by_id(game_id)

def delete_game(game_id):
    execute_delete("DELETE FROM games WHERE id=?", [game_id])

def decrement_stock(game_id, amount=1):
    game = get_game_by_id(game_id)
    
    if not game or game['stock_available'] < amount:
        raise ValueError("Insufficient stock")
    
    execute_update(
        "UPDATE games SET stock_available = stock_available - ? WHERE id = ?",
        [amount, game_id]
    )
    
    return get_game_by_id(game_id)

def increment_stock(game_id, amount=1):
    execute_update(
        """UPDATE games 
           SET stock_available = MIN(stock_available + ?, stock_total) 
           WHERE id = ?""",
        [amount, game_id]
    )
    
    return get_game_by_id(game_id)
