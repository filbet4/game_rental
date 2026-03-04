import bcrypt
from datetime import datetime, timedelta

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt(rounds=10)
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hash_str: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hash_str.encode('utf-8'))

def add_days(date: datetime, days: int) -> datetime:
    return date + timedelta(days=days)

def is_overdue(due_date: str, returned_date: str = None) -> bool:
    if returned_date:
        return False
    
    due = datetime.fromisoformat(due_date.replace('Z', '+00:00'))
    return datetime.utcnow() > due

def get_current_timestamp() -> str:
    return datetime.utcnow().isoformat() + 'Z'
