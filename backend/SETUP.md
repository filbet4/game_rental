"""
Game Rental System - Python Backend
Local development setup
"""
# Python 3.9+ required

# 1. Create virtual environment
python -m venv venv

# 2. Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run application
python run.py

# The backend will be available at:
# http://localhost:3000

# Test endpoints:
# GET  http://localhost:3000/health
# POST http://localhost:3000/api/auth/register
# POST http://localhost:3000/api/auth/login
# etc.
