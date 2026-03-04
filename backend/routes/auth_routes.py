from flask import Blueprint, request, jsonify
from services.auth_service import register_user, login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return {'error': 'Email and password required'}, 400
        
        user = register_user(data['email'], data['password'])
        return user, 201
    except ValueError as e:
        return {'error': str(e)}, 400
    except Exception as e:
        return {'error': str(e)}, 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return {'error': 'Email and password required'}, 400
        
        result = login_user(data['email'], data['password'])
        return result, 200
    except ValueError as e:
        return {'error': str(e)}, 401
    except Exception as e:
        return {'error': str(e)}, 500
