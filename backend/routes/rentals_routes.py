from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from services.rentals_service import (
    rent_game, return_rental, get_user_rentals, get_all_rentals
)

rentals_bp = Blueprint('rentals', __name__)

@rentals_bp.route('', methods=['POST'])
@jwt_required()
def create_rental():
    try:
        claims = get_jwt()
        data = request.get_json()
        
        if not data.get('gameId'):
            return {'error': 'Game ID required'}, 400
        
        rental = rent_game(claims['id'], data['gameId'])
        return jsonify(rental), 201
    except ValueError as e:
        return {'error': str(e)}, 400
    except Exception as e:
        return {'error': str(e)}, 500

@rentals_bp.route('/<int:rental_id>/return', methods=['POST'])
@jwt_required()
def process_return(rental_id):
    try:
        claims = get_jwt()
        is_admin = claims.get('role') == 'ADMIN'
        
        rental = return_rental(rental_id, claims['id'], is_admin)
        return jsonify(rental), 200
    except ValueError as e:
        return {'error': str(e)}, 400
    except Exception as e:
        return {'error': str(e)}, 500

@rentals_bp.route('/me', methods=['GET'])
@jwt_required()
def my_rentals():
    try:
        claims = get_jwt()
        rentals = get_user_rentals(claims['id'])
        return jsonify(rentals), 200
    except Exception as e:
        return {'error': str(e)}, 500

@rentals_bp.route('', methods=['GET'])
@jwt_required()
def all_rentals():
    try:
        claims = get_jwt()
        
        if claims.get('role') != 'ADMIN':
            return {'error': 'Admin access required'}, 403
        
        rentals = get_all_rentals()
        return jsonify(rentals), 200
    except Exception as e:
        return {'error': str(e)}, 500
