import sqlite3
import os
from pathlib import Path

DB_PATH = os.getenv('DB_PATH', 'database.sqlite')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA foreign_keys = ON')
    return conn

def execute_sql_file(filename):
    sql_path = Path(__file__).parent / 'db' / filename
    with open(sql_path, 'r', encoding='utf-8') as f:
        sql = f.read()
    
    conn = get_db()
    conn.executescript(sql)
    conn.commit()
    conn.close()

def table_exists(table_name):
    conn = get_db()
    cursor = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
        [table_name]
    )
    exists = cursor.fetchone() is not None
    conn.close()
    return exists

def init_db():
    if table_exists('users') and table_exists('games') and table_exists('rentals'):
        print("Database already initialized")
        return
    
    print("Initializing database...")
    
    try:
        execute_sql_file('schema.sql')
        print("Schema initialized")
    except Exception as e:
        print(f"Error creating schema: {e}")
        raise
    
    try:
        execute_sql_file('seed.sql')
        print("Database seeded")
    except Exception as e:
        print(f"Error seeding database: {e}")
        raise

def query_one(sql, params=[]):
    conn = get_db()
    cursor = conn.execute(sql, params)
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def query_all(sql, params=[]):
    conn = get_db()
    cursor = conn.execute(sql, params)
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def execute_insert(sql, params=[]):
    conn = get_db()
    cursor = conn.execute(sql, params)
    conn.commit()
    last_id = cursor.lastrowid
    conn.close()
    return last_id

def execute_update(sql, params=[]):
    conn = get_db()
    cursor = conn.execute(sql, params)
    conn.commit()
    changes = cursor.rowcount
    conn.close()
    return changes

def execute_delete(sql, params=[]):
    conn = get_db()
    cursor = conn.execute(sql, params)
    conn.commit()
    changes = cursor.rowcount
    conn.close()
    return changes
