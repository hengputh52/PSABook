# PSA Book Marketplace - Integration Testing Guide

## Overview
This guide covers complete testing of the full-stack application to ensure all components work together seamlessly.

---

## Part 1: Pre-Testing Setup

### 1. Verify Environment

```bash
# Check MySQL
mysql --version

# Check Node.js
node --version    # Should be >= 18.0.0
npm --version     # Should be >= 8.0.0

# Check npm packages
npm list -g | grep -E "node|npm"
```

### 2. Verify .env Files

**Backend** (`backend/source/.env`):
```bash
ls -la backend/source/.env
# Check all required variables are set
grep "DB_HOST\|DB_USER\|JWT_SECRET\|CLOUDINARY" backend/source/.env
```

**Frontend** (`frontend/.env.development`):
```bash
ls -la frontend/.env.development
# Check API URL is set
grep "VITE_API_URL" frontend/.env.development
```

### 3. Create Test Database

```bash
# Create database
mysql -u root << EOF
CREATE DATABASE IF NOT EXISTS secondbook_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON secondbook_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
EOF

# Verify database created
mysql -u root -e "SHOW DATABASES;" | grep secondbook_db
```

---

## Part 2: Local Integration Testing

### Step 1: Start Services

**Terminal 1** - Start Backend:
```bash
cd backend
npm start
```

**Expected Output**:
```
🚀 PSA BOOK MARKETPLACE SERVER STARTED
====================================================
📅 Server started at: 2024-03-20T...
🌐 Server running on: http://localhost:3000
🔗 Database: Connected and synced
```

**Terminal 2** - Start Frontend:
```bash
cd frontend
npm run dev
```

**Expected Output**:
```
  VITE v4.3.0  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 2: Health Check

```bash
# Test API health
curl -s http://localhost:3000/api/health | json_pp
```

**Expected Response**:
```json
{
  "status": "OK",
  "timestamp": "2024-03-20T10:30:00.000Z",
  "environment": "development"
}
```

---

## Part 3: API Testing

### Test 1: User Registration

```bash
#!/bin/bash

# Test Data
USERNAME="testuser"
EMAIL="test@example.com"
PASSWORD="SecurePass123!"
FULL_NAME="Test User"

# Register
echo "Testing User Registration..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/users/signup \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$USERNAME\",
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"full_name\": \"$FULL_NAME\",
    \"phone_number\": \"+1234567890\"
  }")

echo "Response: $RESPONSE"

# Extract token
TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
USER_ID=$(echo $RESPONSE | grep -o '"user_id":[0-9]*' | cut -d':' -f2)

echo "✅ Token: $TOKEN"
echo "✅ User ID: $USER_ID"

# Save for later tests
echo "export TEST_TOKEN=$TOKEN" > .env.test
echo "export TEST_USER_ID=$USER_ID" >> .env.test
echo "export TEST_EMAIL=$EMAIL" >> .env.test
echo "export TEST_PASSWORD=$PASSWORD" >> .env.test
```

**Expected Status**: `201 Created`

---

### Test 2: User Login

```bash
#!/bin/bash

# Load test credentials
source .env.test

# Login
echo "Testing User Login..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"testuser\",
    \"password\": \"$TEST_PASSWORD\"
  }")

echo "Response: $RESPONSE"

# Verify token
NEW_TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "✅ Login Token: $NEW_TOKEN"

if [ "$NEW_TOKEN" != "$TEST_TOKEN" ]; then
  echo "⚠️ Warning: Tokens don't match"
fi
```

**Expected Status**: `200 OK`

---

### Test 3: Get Current User

```bash
#!/bin/bash

source .env.test

echo "Testing Get Current User..."
curl -s -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer $TEST_TOKEN" | json_pp
```

**Expected Status**: `200 OK`
**Expected Response**:
```json
{
  "user_id": 1,
  "username": "testuser"
}
```

---

### Test 4: Create a Book Listing

```bash
#!/bin/bash

source .env.test

echo "Testing Create Book..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TEST_TOKEN" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "price": 19.99,
    "description": "A classic American novel exploring wealth and love in 1920s New York",
    "address": "123 Main St, New York, NY"
  }')

echo "Response: $RESPONSE"

# Extract book ID
BOOK_ID=$(echo $RESPONSE | grep -o '"book_id":[0-9]*' | cut -d':' -f2)
echo "✅ Book ID: $BOOK_ID"
echo "export TEST_BOOK_ID=$BOOK_ID" >> .env.test
```

**Expected Status**: `201 Created`

---

### Test 5: Get All Books

```bash
#!/bin/bash

echo "Testing Get Recent Books..."
curl -s -X GET "http://localhost:3000/api/books/recent?limit=10" | json_pp
```

**Expected Status**: `200 OK`
**Expected Response**: Array of book objects

---

### Test 6: Get Book by ID

```bash
#!/bin/bash

source .env.test

echo "Testing Get Book by ID..."
curl -s -X GET "http://localhost:3000/api/books/$TEST_BOOK_ID" | json_pp
```

**Expected Status**: `200 OK`

---

### Test 7: Get Book Genres

```bash
#!/bin/bash

echo "Testing Get Genres..."
curl -s -X GET http://localhost:3000/api/books/genres | json_pp
```

**Expected Status**: `200 OK`
**Expected Response**:
```json
{
  "genres": [
    "Fiction",
    "Science Fiction",
    "Fantasy",
    // ... more genres
  ]
}
```

---

### Test 8: Filter Books

```bash
#!/bin/bash

echo "Testing Filter Books..."
curl -s -X GET "http://localhost:3000/api/books/filter?genre=Fiction&maxPrice=30" | json_pp
```

**Expected Status**: `200 OK`

---

### Test 9: Cart Operations

```bash
#!/bin/bash

source .env.test

# Add to cart
echo "Testing Add to Cart..."
curl -s -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TEST_TOKEN" \
  -d "{
    \"book_id\": $TEST_BOOK_ID,
    \"quantity\": 1
  }" | json_pp

# Get cart items
echo "Testing Get Cart Items..."
curl -s -X GET "http://localhost:3000/api/cart/user/$TEST_USER_ID" | json_pp
```

**Expected Status**: `200 OK`

---

### Test 10: Update User Profile

```bash
#!/bin/bash

source .env.test

echo "Testing Update User Profile..."
curl -s -X PUT "http://localhost:3000/api/users/$TEST_USER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TEST_TOKEN" \
  -d '{
    "full_name": "Updated Test User",
    "address": "456 Updated St, City, State",
    "phone_number": "+9876543210",
    "favorite_genre": "Science Fiction",
    "favorite_book": "Dune"
  }' | json_pp
```

**Expected Status**: `200 OK`

---

## Part 4: Frontend Testing

### Test 1: Browse Books
1. Open http://localhost:5173 in browser
2. Verify books are loading
3. Check book cards display correctly

### Test 2: User Registration
1. Click "Sign Up"
2. Fill in registration form
3. Submit
4. Verify success message appears

### Test 3: User Login
1. Click "Login"
2. Enter credentials
3. Submit
4. Verify redirected to home page
5. Verify username appears in navbar

### Test 4: Create Book Listing
1. Login as user
2. Click "Sell Book"
3. Fill in book details
4. Submit
5. Verify book appears in listings

### Test 5: Search & Filter
1. Use search bar to find books
2. Filter by genre
3. Filter by price range
4. Verify results update

### Test 6: Shopping Cart
1. Add book to cart
2. View cart
3. Verify book details display
4. Proceed to checkout
5. Verify payment form appears

### Test 7: User Profile
1. Click on user profile
2. Verify information displays
3. Click edit
4. Update profile information
5. Save changes
6. Verify updates persist

---

## Part 5: Database Testing

### Check Database Tables

```bash
mysql -u root -p secondbook_db << EOF
SHOW TABLES;
DESCRIBE users;
DESCRIBE books;
DESCRIBE cart;
DESCRIBE book_images;
DESCRIBE transactions;
EOF
```

### Verify Data

```bash
# Check users created
mysql -u root -p secondbook_db -e "SELECT user_id, username, email FROM users;"

# Check books created
mysql -u root -p secondbook_db -e "SELECT book_id, title, price, seller_id FROM books;"

# Check cart items
mysql -u root -p secondbook_db -e "SELECT * FROM cart;"
```

### Check Foreign Keys

```bash
mysql -u root -p secondbook_db << EOF
SELECT CONSTRAINT_NAME, TABLE_NAME, REFERENCED_TABLE_NAME 
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_NAME IN ('books', 'cart', 'book_images', 'transactions')
AND REFERENCED_TABLE_NAME IS NOT NULL;
EOF
```

---

## Part 6: Error Scenarios Testing

### Test 1: Authentication Errors

```bash
# Missing authorization header
curl -s -X GET http://localhost:3000/api/users/me

# Invalid token
curl -s -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer invalid_token"

# Expired token
curl -s -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer eyJhbGc..."
```

### Test 2: Validation Errors

```bash
# Missing required fields
curl -s -X POST http://localhost:3000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser"
  }'

# Duplicate email
curl -s -X POST http://localhost:3000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "test@example.com",
    "password": "pass"
  }'
```

### Test 3: Not Found Errors

```bash
# Non-existent user
curl -s -X GET http://localhost:3000/api/users/99999

# Non-existent book
curl -s -X GET http://localhost:3000/api/books/99999
```

---

## Part 7: Performance Testing

### Load Testing with Apache Bench

```bash
# Install Apache Bench (if not installed)
brew install httpd  # macOS
apt-get install apache2-utils  # Linux

# Test API endpoint with 100 requests, 10 concurrent
ab -n 100 -c 10 http://localhost:3000/api/books/recent

# Test with POST request
ab -n 100 -c 10 -T 'application/json' \
  -d '{"test": "data"}' \
  http://localhost:3000/api/health
```

### Monitor Backend Logs

Watch the backend terminal to see:
- Request processing times
- Database queries
- Any errors or warnings

---

## Part 8: Test Checklist

- [ ] Backend health endpoint responds
- [ ] Database connections work
- [ ] User can register successfully
- [ ] User can login successfully
- [ ] JWT tokens are generated
- [ ] User profile can be viewed
- [ ] User profile can be updated
- [ ] User can logout
- [ ] User cannot access protected routes without token
- [ ] Books can be created (for sellers)
- [ ] Books can be retrieved
- [ ] Books can be filtered by genre
- [ ] Books can be searched
- [ ] Cart operations work
- [ ] Items can be added to cart
- [ ] Cart items can be viewed
- [ ] Cart items can be removed
- [ ] Transactions can be created
- [ ] Frontend loads successfully
- [ ] Frontend can communicate with backend
- [ ] Forms validate correctly
- [ ] Error messages display properly
- [ ] Database has correct data
- [ ] No SQL injection vulnerabilities
- [ ] CORS is properly configured
- [ ] Rate limiting works (if implemented)

---

## Part 9: Troubleshooting

### Backend Won't Start

**Error**: `Unable to connect to the database`
```bash
# Solution: Check MySQL is running
mysql -u root -e "SELECT 1"

# Check credentials
grep DB_ backend/source/.env

# Verify database exists
mysql -u root -e "SHOW DATABASES" | grep secondbook
```

### Frontend Can't Reach Backend

**Error**: `Failed to fetch from http://localhost:3000`
```bash
# Solution: Check backend is running
netstat -an | grep 3000

# Check CORC configuration
curl -s -X OPTIONS http://localhost:3000/api/books/recent -v | grep -i "access-control"
```

### Database Sync Errors

**Error**: `Column already exists`
```bash
# Solution: Delete and recreate database
mysql -u root -e "DROP DATABASE secondbook_db; CREATE DATABASE secondbook_db;"

# Restart backend to resync
```

### Port Already in Use

**Error**: `listen EADDRINUSE :::3000`
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

---

## Continuous Testing

Once local testing passes, set up automated testing:

```bash
# Create test script
chmod +x test-suite.sh

# Run all tests
./test-suite.sh
```

---

**Last Updated**: March 2024
