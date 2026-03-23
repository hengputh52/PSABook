# Second Book Marketplace - Complete Setup & Deployment Guide

## Project Overview
A full-stack book marketplace application built with:
- **Frontend**: React with Vite
- **Backend**: Node.js/Express with Sequelize ORM
- **Database**: MySQL
- **Cloud Storage**: Cloudinary for image uploads
- **Payment**: Stripe integration

---

## Part 1: Local Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- MySQL Server (local or remote)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### Step 2: Set Up Environment Variables

#### Backend Configuration (`backend/source/.env`)
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=secondbook_db
DB_PORT=3306

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret (generate a new one)
JWT_SECRET=generate_a_random_64_char_string_here

# Application Settings
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key
```

#### Frontend Configuration (`frontend/.env.development`)
```env
VITE_API_URL=http://localhost:3000
VITE_CLOUDINARY_CLOUD=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=profile_image
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
```

### Step 3: Set Up Database

```bash
# Create database
mysql -u root -p << EOF
CREATE DATABASE secondbook_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF

# Import database schema (optional - Sequelize will auto-create tables)
mysql -u root -p secondbook_db < Database/secondbook_db.sql
```

### Step 4: Start Development Servers

#### Option A: Run Both Servers (Separate Terminals)

Terminal 1 - Backend:
```bash
cd backend
npm start
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

#### Option B: Run with Single Command
```bash
# Make sure concurrently is installed first
npm run dev
```

**Expected Output:**
- Backend: Server running on http://localhost:3000
- Frontend: Available at http://localhost:5173

### Step 5: Health Check

```bash
# Test backend health
curl http://localhost:3000/api/health

# Response should be:
# {"status":"OK","timestamp":"2024-...","environment":"development"}
```

---

## Part 2: Local Testing

### Test User Registration & Login

```bash
# Create user account
curl -X POST http://localhost:3000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "full_name": "Test User"
  }'

# Login
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }'
```

### Test Book Operations

```bash
# Get all books
curl http://localhost:3000/api/books

# Create new book (requires authentication token in Authorization header)
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "genre": "Fiction",
    "price": 19.99,
    "description": "A test book",
    "seller_id": 1
  }'
```

### Test Cart Operations

```bash
# Add to cart
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "book_id": 1,
    "quantity": 1
  }'

# Get cart items
curl http://localhost:3000/api/cart/user/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Part 3: Deployment to DigitalOcean

### Prerequisites
- DigitalOcean Account
- A registered domain (or use DO's provided domain)
- DigitalOcean App Platform access

### Step 1: Create DigitalOcean Database

1. **Go to DigitalOcean Dashboard**
   - Click "Databases" in sidebar
   - Click "Create" → "MySQL"

2. **Configure Database**
   - Name: `secondbook-db`
   - Version: MySQL 8 or latest
   - Cluster: Single node (for testing) or HA cluster (production)
   - Region: Choose closest to your users
   - Node size: Start with basic tier

3. **Save Connection Details**
   - Host
   - Port
   - Username
   - Password
   - Database name: `secondbook`

### Step 2: Prepare Application for Deployment

1. **Create `backend/.env.production`**
```env
# Database Configuration (from DigitalOcean)
DB_HOST=your-db-host.db.ondigitalocean.com
DB_USER=doadmin
DB_PASSWORD=your_secure_password
DB_NAME=secondbook
DB_PORT=25060  # DigitalOcean's default MySQL port

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret (CHANGE THIS TO A RANDOM 64-CHARACTER STRING)
JWT_SECRET=generate_secure_random_string_command_below

# Application Settings
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-domain.com

# Stripe Configuration (use production keys)
STRIPE_SECRET_KEY=sk_live_your_production_key
STRIPE_PUBLIC_KEY=pk_live_your_production_key
```

2. **Generate Secure JWT Secret**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Copy the output and use it in .env.production
```

3. **Create `frontend/.env.production`**
```env
VITE_API_URL=https://your-api-domain.com
VITE_CLOUDINARY_CLOUD=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=profile_image
VITE_STRIPE_PUBLIC_KEY=pk_live_your_production_key
```

### Step 3: Create DigitalOcean App Platform Configuration

Create `app.yaml` in root directory:
```yaml
name: secondbook-marketplace
services:
  - name: backend
    source:
      type: github
      repo: YOUR_GITHUB_REPO
      branch: main
      deploy_on_push: true
    build_command: npm install --prefix backend
    run_command: npm start --prefix backend
    http_port: 3000
    environment_slug: node-js
    env:
      - key: NODE_ENV
        value: production
      - key: DB_HOST
        value: ${DB_HOST}
      - key: DB_USER
        value: ${DB_USER}
      - key: DB_PASSWORD
        value: ${DB_PASSWORD}
      - key: DB_NAME
        value: secondbook
      - key: CLOUDINARY_CLOUD_NAME
        value: ${CLOUDINARY_CLOUD_NAME}
      - key: CLOUDINARY_API_KEY
        value: ${CLOUDINARY_API_KEY}
      - key: CLOUDINARY_API_SECRET
        value: ${CLOUDINARY_API_SECRET}
      - key: JWT_SECRET
        value: ${JWT_SECRET}
      - key: STRIPE_SECRET_KEY
        value: ${STRIPE_SECRET_KEY}
      - key: FRONTEND_URL
        value: ${FRONTEND_URL}
  
  - name: frontend
    source:
      type: github
      repo: YOUR_GITHUB_REPO
      branch: main
      deploy_on_push: true
    build_command: cd frontend && npm install && npm run build
    source_dir: frontend
    http_port: 3000
    environment_slug: node-js
    env:
      - key: VITE_API_URL
        value: ${BACKEND_URL}
      - key: VITE_CLOUDINARY_CLOUD
        value: ${CLOUDINARY_CLOUD_NAME}
      - key: VITE_STRIPE_PUBLIC_KEY
        value: ${STRIPE_PUBLIC_KEY}

databases:
  - name: secondbook-db
    engine: MYSQL
    version: "8"
    production: true

static_sites:
  - source_dir: frontend/dist
    routes:
      - path: /
```

### Step 4: Deploy via DigitalOcean

**Option A: Via Dashboard**
1. Go to DigitalOcean App Platform
2. Click "Create App"
3. Select GitHub repository
4. Upload or create `app.yaml`
5. Review and deploy

**Option B: Via CLI**
```bash
# Install doctl CLI
brew install doctl  # or apt-get install doctl on Linux

# Authenticate
doctl auth init

# Create app from app.yaml
doctl apps create --spec app.yaml
```

### Step 5: Initialize Database on DigitalOcean

```bash
# Connect to DigitalOcean database
mysql -h your-db-host.db.ondigitalocean.com \
      -P 25060 \
      -u doadmin \
      -p secondbook < Database/secondbook_db.sql
```

### Step 6: Set Up Custom Domain

1. **Point Domain to DigitalOcean**
   - Update DNS A records (or use DigitalOcean's nameservers)
   - A record: your-domain.com → DigitalOcean App IP

2. **Configure SSL in App Platform**
   - DigitalOcean automatically provisions Let's Encrypt certificate

### Step 7: Monitor Deployment

```bash
# View app logs
doctl apps logs get app-id --tail=100

# View app details
doctl apps get app-id
```

---

## Part 4: Environment Variables Reference

### Backend (.env)

| Variable | Purpose | Example |
|----------|---------|---------|
| DB_HOST | Database hostname | localhost or DO database host |
| DB_USER | Database user | root or doadmin |
| DB_PASSWORD | Database password | secure_password |
| DB_NAME | Database name | secondbook_db |
| DB_PORT | Database port | 3306 or 25060 (DO) |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud ID | your_cloud_name |
| CLOUDINARY_API_KEY | Cloudinary API key | generated_from_cloudinary |
| CLOUDINARY_API_SECRET | Cloudinary secret | generated_from_cloudinary |
| JWT_SECRET | JWT signing key | 64-char random string |
| NODE_ENV | Environment | development or production |
| PORT | Server port | 3000 |
| FRONTEND_URL | Frontend app URL | http://localhost:5173 |
| STRIPE_SECRET_KEY | Stripe secret | sk_test_... or sk_live_... |

### Frontend (.env)

| Variable | Purpose | Example |
|----------|---------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |
| VITE_CLOUDINARY_CLOUD | Cloudinary cloud ID | your_cloud_name |
| VITE_CLOUDINARY_UPLOAD_PRESET | Cloudinary preset | profile_image |
| VITE_STRIPE_PUBLIC_KEY | Stripe public key | pk_test_... |

---

## Part 5: Troubleshooting

### Backend Won't Start

**Problem**: Connection timeout
```
❌ Unable to connect to the database
```

**Solutions**:
1. Check MySQL is running: `mysql -u root -p -e "SELECT 1"`
2. Verify .env variables match your setup
3. Ensure database exists: `mysql -u root -p -e "SHOW DATABASES"`
4. Check port 3306 is accessible (may need firewall rules)

### Frontend Build Fails

**Problem**: Module not found errors
```
Module not found: require.resolve('sass')
```

**Solutions**:
```bash
cd frontend
npm install --legacy-peer-deps
npm run build
```

### CORS Errors

**Problem**: Frontend cannot reach backend
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**: Update `FRONTEND_URL` in backend .env to match actual frontend URL

### Database Sync Issues

**Problem**: Tables not created
```
❌ Failed to sync database
```

**Solutions**:
1. Check database user permissions
2. Ensure DB_HOST, DB_USER, DB_PASSWORD are correct
3. Create database manually: `mysql -u root -p -e "CREATE DATABASE secondbook_db"`

---

## Part 6: Production Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Generate a new JWT_SECRET using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- [ ] Use production Stripe keys (not test keys)
- [ ] Set NODE_ENV=production
- [ ] Configure database backups
- [ ] Set up monitoring and error tracking
- [ ] Enable HTTPS (automatic on DigitalOcean)
- [ ] Configure email service for notifications
- [ ] Set up rate limiting
- [ ] Test payment flow with test Stripe card
- [ ] Verify all API endpoints work
- [ ] Test user registration and login
- [ ] Check image uploads to Cloudinary
- [ ] Review security headers

---

## Part 7: Useful Commands

```bash
# View backend logs
npm run dev:backend

# View frontend logs  
npm run dev:frontend

# Build for production
npm run build

# Test API endpoint
curl -X GET http://localhost:3000/api/health

# Database operations
mysql -u root -p < Database/secondbook_db.sql  # Import data
mysqldump -u root -p secondbook_db > backup.sql  # Export data

# Generate new dependencies tree
npm list --all

# Check for security vulnerabilities
npm audit

# Update packages
npm update
```

---

## Support & Additional Resources

- **Express.js Docs**: https://expressjs.com/
- **Sequelize ORM**: https://sequelize.org/
- **React/Vite**: https://vitejs.dev/
- **DigitalOcean Docs**: https://docs.digitalocean.com/
- **Stripe Integration**: https://stripe.com/docs/stripe-js/react
- **Cloudinary**: https://cloudinary.com/documentation

---

## Quick Start Commands

```bash
# After initial setup, start local development with:
npm run dev:backend  # Terminal 1
npm run dev:frontend # Terminal 2

# Or both at once (requires concurrently):
npm run dev

# Deploy to DigitalOcean:
# 1. Commit code to GitHub
# 2. Connect repo to DigitalOcean App Platform
# 3. Deploy via dashboard or doctl CLI
```

---

**Last Updated**: March 2024
**Maintainer**: PSA Book Development Team
