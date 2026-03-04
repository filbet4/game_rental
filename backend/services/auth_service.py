from flask_jwt_extended import create_access_token
from utils import hash_password, verify_password
from database import query_one, execute_insert

def register_user(email: str, password: str):
    existing = query_one("SELECT id FROM users WHERE email = ?", [email])
    if existing:
        raise ValueError("User already exists")
    
    password_hash = hash_password(password)
    
    user_id = execute_insert(
        "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)",
        [email, password_hash, 'USER']
    )
    
    return {
        'id': user_id,
        'email': email,
        'role': 'USER'
    }

def login_user(email: str, password: str):
    user = query_one(
        "SELECT id, email, password_hash, role FROM users WHERE email = ?",
        [email]
    )
    
    if not user:
        raise ValueError("Invalid email or password")
    
    if not verify_password(password, user['password_hash']):
        raise ValueError("Invalid email or password")
    
    access_token = create_access_token(
        identity=email,
        additional_claims={
            'id': user['id'],
            'role': user['role']
        }
    )
    
    return {
        'token': access_token,
        'user': {
            'id': user['id'],
            'email': user['email'],
            'role': user['role']
        }
    }
