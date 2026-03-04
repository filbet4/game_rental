from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

def create_app():
    app = Flask(__name__)
    
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'your-secret-key-change-in-production')
    app.config['JWT_ALGORITHM'] = 'HS256'
    app.config['JSON_SORT_KEYS'] = False
    
    CORS(app, resources={
        r"/api/*": {
            "origins": os.getenv('CORS_ORIGIN', 'http://localhost:5500'),
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    JWTManager(app)
    
    from routes.auth_routes import auth_bp
    from routes.games_routes import games_bp
    from routes.rentals_routes import rentals_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(games_bp, url_prefix='/api/games')
    app.register_blueprint(rentals_bp, url_prefix='/api/rentals')
    
    @app.route('/health')
    def health():
        return {'status': 'ok'}, 200
    
    @app.errorhandler(404)
    def not_found(e):
        return {'error': 'Not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(e):
        return {'error': 'Internal server error'}, 500
    
    return app
