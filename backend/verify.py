#!/usr/bin/env python3
"""
Verification script for Game Rental System setup
Tests if backend is working correctly
"""
import subprocess
import time
import requests
import sys
import json
from pathlib import Path

def check_files():
    """Check if required files exist"""
    print("📁 Checking files...")
    files = [
        'run.py',
        'app.py',
        'database.py',
        'utils.py',
        '.env',
        'requirements.txt',
        'db/schema.sql',
        'db/seed.sql',
        'services/auth_service.py',
        'services/games_service.py',
        'services/rentals_service.py',
        'routes/auth_routes.py',
        'routes/games_routes.py',
        'routes/rentals_routes.py'
    ]
    
    missing = []
    for f in files:
        if not Path(f).exists():
            missing.append(f)
    
    if missing:
        print(f"  ❌ Missing files: {', '.join(missing)}")
        return False
    
    print("  ✅ All files present")
    return True

def check_dependencies():
    """Check if dependencies are installed"""
    print("📦 Checking dependencies...")
    try:
        import flask
        import flask_cors
        import flask_jwt_extended
        import dotenv
        import bcrypt
        print("  ✅ All dependencies installed")
        return True
    except ImportError as e:
        print(f"  ❌ Missing dependency: {e}")
        print("     Run: pip install -r requirements.txt")
        return False

def check_database():
    """Check if database exists"""
    print("💾 Checking database...")
    db_path = Path('database.sqlite')
    if db_path.exists():
        print("  ✅ Database file exists")
        return True
    else:
        print("  ℹ️  Database will be created on first run")
        return True

def check_backend(url='http://localhost:3000'):
    """Check if backend is running"""
    print("🔌 Checking backend...")
    try:
        response = requests.get(f'{url}/health', timeout=2)
        if response.status_code == 200:
            print("  ✅ Backend is running")
            return True
    except:
        print(f"  ❌ Backend not running at {url}")
        print("     Start it with: python run.py")
        return False

def check_auth(url='http://localhost:3000'):
    """Test authentication"""
    print("🔐 Testing authentication...")
    try:
        # Try login with test credentials
        response = requests.post(
            f'{url}/api/auth/login',
            json={
                'email': 'admin@game.com',
                'password': 'password'
            },
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            if 'token' in data:
                print("  ✅ Authentication working")
                return True
        
        print("  ❌ Authentication failed")
        return False
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def check_api(url='http://localhost:3000'):
    """Test API endpoints"""
    print("📡 Testing API...")
    try:
        # Test games endpoint
        response = requests.get(f'{url}/api/games', timeout=5)
        if response.status_code == 200:
            games = response.json()
            print(f"  ✅ Games API working ({len(games)} games)")
            return True
        
        print("  ❌ Games API failed")
        return False
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def main():
    """Run all checks"""
    print("\n" + "="*50)
    print("Game Rental System - Verification Script")
    print("="*50 + "\n")
    
    results = {
        'Files': check_files(),
        'Dependencies': check_dependencies(),
        'Database': check_database(),
    }
    
    print("\n" + "-"*50)
    print("Make sure backend is running for next checks...")
    print("-"*50 + "\n")
    
    results['Backend Running'] = check_backend()
    
    if results['Backend Running']:
        results['Authentication'] = check_auth()
        results['API'] = check_api()
    
    print("\n" + "="*50)
    print("Summary:")
    print("="*50)
    
    for check, result in results.items():
        status = "✅" if result else "❌"
        print(f"{status} {check}")
    
    all_passed = all(results.values())
    
    if all_passed:
        print("\n✅ Everything looks good! System is ready to use.")
    else:
        print("\n❌ Some checks failed. See above for details.")
    
    return 0 if all_passed else 1

if __name__ == '__main__':
    sys.exit(main())
