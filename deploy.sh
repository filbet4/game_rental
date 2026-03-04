#!/bin/bash
# Game Rental System - Deploy to Pascal Server
# Usage: bash deploy.sh

echo "🎮 Game Rental System - Pascal Deployment Script"
echo "================================================="

# Configuration
PASCAL_USER=$1
PASCAL_HOST="pascal.fis.agh.edu.pl"
REMOTE_PORT=5207
LOCAL_REPO="/c/game_rental"  # Adjust if needed

if [ -z "$PASCAL_USER" ]; then
    echo "Usage: bash deploy.sh YOUR_USERNAME"
    echo ""
    echo "This script will:"
    echo "  1. Copy project to pascal.fis.agh.edu.pl"
    echo "  2. Setup Python environment"
    echo "  3. Configure backend for port 5207"
    echo ""
    exit 1
fi

echo ""
echo "📤 Uploading project to $PASCAL_HOST..."
scp -r "$LOCAL_REPO/backend" "$PASCAL_USER@$PASCAL_HOST:/home/$PASCAL_USER/game_rental_backend"
scp -r "$LOCAL_REPO/frontend" "$PASCAL_USER@$PASCAL_HOST:/home/$PASCAL_USER/game_rental_frontend"

echo ""
echo "🔧 Setting up on server..."
ssh "$PASCAL_USER@$PASCAL_HOST" << 'EOF'

cd game_rental_backend

echo "Creating virtual environment..."
python3 -m venv venv
source venv/bin/activate

echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Setting up configuration..."
cat > .env << ENVEOF
PORT=5207
JWT_SECRET=$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')
DB_PATH=./database.sqlite
CORS_ORIGIN=http://pascal.fis.agh.edu.pl:5207
FLASK_ENV=production
ENVEOF

echo "✅ Setup complete!"
echo ""
echo "To start the backend:"
echo "  cd ~/game_rental_backend"
echo "  source venv/bin/activate"
echo "  python run.py"
echo ""
echo "Or use screen for persistent background:"
echo "  screen -S game_rental"
echo "  python run.py"
echo "  (Ctrl+A then D to detach)"

EOF

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. SSH to pascal: ssh $PASCAL_USER@$PASCAL_HOST"
echo "2. Start backend: cd ~/game_rental_backend && source venv/bin/activate && python run.py"
echo "3. Update frontend api.js to use: http://pascal.fis.agh.edu.pl:5207/api"
echo "4. Serve frontend on http://pascal.fis.agh.edu.pl (or your domain)"
