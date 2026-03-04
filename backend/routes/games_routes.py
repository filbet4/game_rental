from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from services.games_service import (
    get_all_games, get_game_by_id, create_game,
    update_game, delete_game
)

games_bp = Blueprint('games', __name__)

def require_admin():
    claims = get_jwt()
    if claims.get('role') != 'ADMIN':
        return False
    return True

@games_bp.route('', methods=['GET'])
def list_games():
    try:
        filters = {
            'title': request.args.get('title'),
            'platform': request.args.get('platform'),
            'genre': request.args.get('genre'),
            'available': request.args.get('available')
        }
        
        games = get_all_games(filters)
        return jsonify(games), 200
    except Exception as e:
        return {'error': str(e)}, 500

@games_bp.route('/<int:game_id>', methods=['GET'])
def get_game(game_id):
    try:
        game = get_game_by_id(game_id)
        if not game:
            return {'error': 'Game not found'}, 404
        return jsonify(game), 200
    except Exception as e:
        return {'error': str(e)}, 500

@games_bp.route('', methods=['POST'])
@jwt_required()
def add_game():
    try:
        if not require_admin():
            return {'error': 'Admin access required'}, 403
        
        data = request.get_json()
        
        required_fields = ['title', 'platform', 'genre', 'pegi', 'stock_total']
        if not all(field in data for field in required_fields):
            return {'error': 'Missing required fields'}, 400
        
        game = create_game(data)
        return jsonify(game), 201
    except Exception as e:
        return {'error': str(e)}, 500

@games_bp.route('/<int:game_id>', methods=['PUT'])
@jwt_required()
def edit_game(game_id):
    try:
        if not require_admin():
            return {'error': 'Admin access required'}, 403
        
        data = request.get_json()
        game = update_game(game_id, data)
        
        if not game:
            return {'error': 'Game not found'}, 404
        
        return jsonify(game), 200
    except Exception as e:
        return {'error': str(e)}, 500

@games_bp.route('/<int:game_id>', methods=['DELETE'])
@jwt_required()
def remove_game(game_id):
    try:
        if not require_admin():
            return {'error': 'Admin access required'}, 403
        
        delete_game(game_id)
        return '', 204
    except Exception as e:
        return {'error': str(e)}, 500
