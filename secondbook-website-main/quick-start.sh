#!/bin/bash

# PSA Book Marketplace - Quick Start Script
# This script automates the setup process for local development

set -e  # Exit on any error

echo "==========================================="
echo "📚 PSA Book Marketplace - Quick Start Setup"
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "\n${YELLOW}1. Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js >= 18.0.0${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"

# Check npm
echo -e "\n${YELLOW}2. Checking npm installation...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm >= 8.0.0${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm ${NPM_VERSION} found${NC}"

# Create environment files if they don't exist
echo -e "\n${YELLOW}3. Setting up environment files...${NC}"

# Backend .env
if [ ! -f backend/source/.env ]; then
    echo -e "${YELLOW}Creating backend/.env...${NC}"
    cp backend/source/.env.example backend/source/.env 2>/dev/null || echo "Example file not found, creating new"
    
    cat > backend/source/.env << 'EOF'
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=secondbook_db
DB_PORT=3306

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dx4vm96l3
CLOUDINARY_API_KEY=placeholder_api_key
CLOUDINARY_API_SECRET=placeholder_api_secret

# JWT Secret
JWT_SECRET=dev_secret_change_in_production_to_secure_random_string
JWT_EXPIRATION=1d

# Application Configuration
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Stripe Configuration (optional)
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_PUBLIC_KEY=pk_test_placeholder
EOF
    echo -e "${GREEN}✅ backend/.env created${NC}"
fi

# Frontend .env.development
if [ ! -f frontend/.env.development ]; then
    echo -e "${YELLOW}Creating frontend/.env.development...${NC}"
    cat > frontend/.env.development << 'EOF'
# Local Development
VITE_API_URL=http://localhost:3000

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD=dx4vm96l3
VITE_CLOUDINARY_UPLOAD_PRESET=profile_image

# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_test_placeholder
EOF
    echo -e "${GREEN}✅ frontend/.env.development created${NC}"
else
    echo -e "${GREEN}✅ frontend/.env.development exists${NC}"
fi

# Install backend dependencies
echo -e "\n${YELLOW}4. Installing backend dependencies...${NC}"
cd backend
npm install
cd ..
echo -e "${GREEN}✅ Backend dependencies installed${NC}"

# Install frontend dependencies
echo -e "\n${YELLOW}5. Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"

# Create database
echo -e "\n${YELLOW}6. Setting up MySQL database...${NC}"
if command -v mysql &> /dev/null; then
    echo "Attempting to create database..."
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS secondbook_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null && \
    echo -e "${GREEN}✅ Database created${NC}" || \
    echo -e "${YELLOW}⚠️  Could not create database via MySQL. Please create manually:${NC}
    mysql -u root -e \"CREATE DATABASE secondbook_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\""
else
    echo -e "${YELLOW}⚠️  MySQL not found in PATH. Please create database manually:${NC}"
    echo "mysql -u root -e \"CREATE DATABASE secondbook_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\""
fi

# Setup complete
echo -e "\n${GREEN}==========================================="
echo "✅ Setup Complete!"
echo "==========================================${NC}"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Edit environment variables if needed:"
echo "   - backend/source/.env"
echo "   - frontend/.env.development"
echo ""
echo "2. Start MySQL service:"
echo "   - macOS: brew services start mysql"
echo "   - Linux: sudo systemctl start mysql"
echo "   - Windows: mysql.exe (or use MySQL Server service)"
echo ""
echo "3. Start Backend (Terminal 1):"
echo "   cd backend && npm start"
echo ""
echo "4. Start Frontend (Terminal 2):"
echo "   cd frontend && npm run dev"
echo ""
echo "5. Open browser:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:3000"
echo ""
echo -e "${YELLOW}Documentation:${NC}"
echo "- Setup Guide: SETUP_AND_DEPLOYMENT_GUIDE.md"
echo "- API Docs: API_DOCUMENTATION.md"
echo "- Testing: TESTING_GUIDE.md"
echo "- Deployment: DIGITALOCEAN_DEPLOYMENT_GUIDE.md"
echo ""
echo -e "${GREEN}Happy coding! 📚${NC}"
