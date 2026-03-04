import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app import create_app
from database import init_db

load_dotenv()

app = create_app()

with app.app_context():
    init_db()
    print("Database initialized")

if __name__ == '__main__':
    PORT = int(os.getenv('PORT', 3000))
    DEBUG = os.getenv('FLASK_ENV') == 'development'
    
    print(f"Running on http://localhost:{PORT}")
    
    app.run(host='0.0.0.0', port=PORT, debug=DEBUG)
