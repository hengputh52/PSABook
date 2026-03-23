# PSA Book Marketplace - API Documentation

## Base URL
- **Development**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

---

## Authentication

Most endpoints require a JWT token. Include it in the request header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

The token is also stored in HTTP-only cookies for session management.

---

## User Endpoints

### 1. Sign Up User
**POST** `/api/users/signup`

Create a new user account.

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe",
  "phone_number": "+1234567890",
  "address": "123 Main St, City, State"
}
```

**Response**:
```json
{
  "message": "User created",
  "user": {
    "user_id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes**:
- `201`: User created successfully
- `400`: Missing required fields or user already exists
- `500`: Server error

---

### 2. Login User
**POST** `/api/users/login`

Authenticate user and receive JWT token.

**Request Body**:
```json
{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "user": {
    "user_id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes**:
- `200`: Login successful
- `401`: Invalid credentials
- `500`: Server error

---

### 3. Logout User
**POST** `/api/users/logout`

Clear authentication token.

**Headers**: 
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "message": "Logout successful"
}
```

---

### 4. Get Current User Profile
**GET** `/api/users/me`

Get authenticated user's information.

**Headers**: 
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "user_id": 1,
  "username": "johndoe"
}
```

---

### 5. Get User Profile by ID
**GET** `/api/users/:id`

Get specific user's public profile.

**Headers**: 
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "user_id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "profile_photo": "https://cloudinary.com/...",
  "address": "123 Main St, City, State",
  "phone_number": "+1234567890"
}
```

---

### 6. Update User Profile
**PUT** `/api/users/:id`

Update user information. Can include profile photo upload.

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Request Body**:
```json
{
  "full_name": "John Updated",
  "address": "456 New St, City, State",
  "phone_number": "+9876543210",
  "favorite_genre": "Science Fiction",
  "favorite_book": "The Shining"
}
```

**File Upload**:
- Field name: `profile_photo`
- Accept: `.jpg`, `.jpeg`, `.png`, `.gif`
- Max size: 5MB

**Response**:
```json
{
  "message": "Profile updated",
  "user": {
    "user_id": 1,
    "username": "johndoe",
    "full_name": "John Updated",
    "profile_photo": "https://cloudinary.com/..."
  }
}
```

---

### 7. Delete User Account
**DELETE** `/api/users/:id`

Delete user account permanently.

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "message": "User deleted successfully"
}
```

---

## Book Endpoints

### 1. Get Recent Books
**GET** `/api/books/recent`

Get the most recently added books.

**Query Parameters**:
- `limit`: Number of books to return (default: 10)
- `offset`: Skip this many books (default: 0)

**Response**:
```json
{
  "books": [
    {
      "book_id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "price": 19.99,
      "description": "A classic American novel",
      "image": "https://cloudinary.com/...",
      "seller_id": 1,
      "seller": "johndoe",
      "telephone1": "+1234567890",
      "address": "123 Main St, City, State",
      "created_at": "2024-03-20T10:30:00Z"
    }
  ]
}
```

---

### 2. Get Filtered Books
**GET** `/api/books/filter`

Filter and search books.

**Query Parameters**:
- `genre`: Filter by genre (e.g., "Fiction", "Science Fiction")
- `search`: Search in title, author, or description
- `minPrice`: Minimum price (default: 0)
- `maxPrice`: Maximum price (default: 99999)
- `sortBy`: Sort field (price, created_at, rating)
- `order`: ASC or DESC (default: DESC)
- `limit`: Results per page (default: 10)
- `page`: Page number (default: 1)

**Example**: 
```
GET /api/books/filter?genre=Fiction&search=Gatsby&maxPrice=50&sortBy=price
```

**Response**:
```json
{
  "books": [
    {
      "book_id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "price": 19.99
    }
  ],
  "total": 1,
  "pages": 1
}
```

---

### 3. Get All Genres
**GET** `/api/books/genres`

Get list of all available book genres.

**Response**:
```json
{
  "genres": [
    "Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Thriller",
    "Biography",
    "History",
    "Self-Help",
    "Non-Fiction"
  ]
}
```

---

### 4. Get Book by ID
**GET** `/api/books/:id`

Get detailed information about a specific book.

**Response**:
```json
{
  "book": {
    "book_id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "price": 19.99,
    "description": "A classic American novel exploring wealth and love in 1920s New York",
    "image": "https://cloudinary.com/...",
    "seller_id": 1,
    "seller": "johndoe",
    "telephone1": "+1234567890",
    "address": "123 Main St, City, State",
    "BookImages": [
      {
        "image_id": 1,
        "image_url": "https://cloudinary.com/...",
        "is_primary": true
      }
    ],
    "created_at": "2024-03-20T10:30:00Z"
  }
}
```

---

### 5. Get My Books
**GET** `/api/books/my-books`

Get all books sold by the authenticated user.

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "books": [
    {
      "book_id": 5,
      "title": "My Book",
      "author": "Author Name",
      "genre": "Fiction",
      "price": 29.99
    }
  ]
}
```

---

### 6. Sell Book (Create Book)
**POST** `/api/books`

List a new book for sale.

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "price": 19.99,
  "description": "A classic American novel",
  "telephone1": "+1234567890",
  "telephone2": "+9876543210",
  "address": "123 Main St, City, State"
}
```

**Response**:
```json
{
  "message": "Book created successfully",
  "book": {
    "book_id": 1,
    "title": "The Great Gatsby",
    "seller_id": 1,
    "price": 19.99
  }
}
```

**Status Codes**:
- `201`: Book created
- `400`: Invalid data
- `401`: Unauthorized
- `500`: Server error

---

### 7. Upload Book Images
**POST** `/api/books/upload-images`

Upload multiple images for a book.

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data**:
- `book_id`: Book ID (required)
- `images`: Multiple image files (up to 5)
- `primary_image_id`: Which image ID is primary (optional)

**File Specifications**:
- Formats: `.jpg`, `.jpeg`, `.png`, `.gif`
- Max size per file: 5MB
- Max files: 5

**Response**:
```json
{
  "message": "Images uploaded successfully",
  "images": [
    {
      "image_id": 1,
      "image_url": "https://cloudinary.com/...",
      "is_primary": true
    }
  ]
}
```

---

### 8. Update Book
**PUT** `/api/books/:id`

Update book information.

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "The Great Gatsby - Updated",
  "price": 24.99,
  "description": "Updated description",
  "genre": "Classic Fiction"
}
```

**Response**:
```json
{
  "message": "Book updated successfully",
  "book": {
    "book_id": 1,
    "title": "The Great Gatsby - Updated",
    "price": 24.99
  }
}
```

---

### 9. Delete Book
**DELETE** `/api/books/:id`

Remove a book from sale.

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "message": "Book deleted successfully"
}
```

---

## Cart Endpoints

### 1. Add to Cart
**POST** `/api/cart/add`

Add a book to user's shopping cart.

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body**:
```json
{
  "book_id": 1,
  "quantity": 1
}
```

**Response**:
```json
{
  "message": "Item added to cart",
  "cart_item": {
    "cart_id": 1,
    "user_id": 1,
    "book_id": 1,
    "quantity": 1,
    "created_at": "2024-03-20T10:30:00Z"
  }
}
```

---

### 2. Get Cart Items
**GET** `/api/cart/user/:user_id`

Get all items in a user's cart.

**Response**:
```json
{
  "cart_items": [
    {
      "cart_id": 1,
      "user_id": 1,
      "book_id": 1,
      "quantity": 1,
      "Book": {
        "book_id": 1,
        "title": "The Great Gatsby",
        "price": 19.99,
        "image": "https://cloudinary.com/..."
      }
    }
  ],
  "total_items": 1,
  "total_price": 19.99
}
```

---

### 3. Remove from Cart
**DELETE** `/api/cart/:cart_item_id`

Remove a specific item from cart.

**Response**:
```json
{
  "message": "Item removed from cart"
}
```

---

### 4. Clear Cart
**DELETE** `/api/cart/clear/:user_id`

Remove all items from user's cart.

**Response**:
```json
{
  "message": "Cart cleared"
}
```

---

## Transaction Endpoints

### 1. Create Transaction (Purchase)
**POST** `/api/transaction/add`

Complete a purchase transaction.

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body**:
```json
{
  "book_id": 1,
  "quantity": 1,
  "total_price": 19.99,
  "payment_method": "stripe",
  "stripe_token": "tok_visa"
}
```

**Response**:
```json
{
  "message": "Transaction created successfully",
  "transaction": {
    "transaction_id": 1,
    "buyer_id": 1,
    "seller_id": 5,
    "book_id": 1,
    "quantity": 1,
    "total_price": 19.99,
    "status": "completed",
    "created_at": "2024-03-20T10:30:00Z"
  }
}
```

---

## Seller Endpoints

### 1. Get Seller Information
**GET** `/api/seller/:id`

Get public seller profile information.

**Response**:
```json
{
  "seller": {
    "user_id": 1,
    "username": "johndoe",
    "full_name": "John Doe",
    "profile_photo": "https://cloudinary.com/...",
    "address": "123 Main St, City, State",
    "phone_number": "+1234567890",
    "books_count": 15,
    "average_rating": 4.5
  }
}
```

---

## System Endpoints

### 1. Health Check
**GET** `/api/health`

Check if the server is running and responsive.

**Response**:
```json
{
  "status": "OK",
  "timestamp": "2024-03-20T10:30:00Z",
  "environment": "development"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong",
  "status_code": 400
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (invalid input) |
| 401 | Unauthorized (need authentication) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePass123!",
    "full_name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "SecurePass123!"
  }'
```

### Get Recent Books
```bash
curl -X GET "http://localhost:3000/api/books/recent?limit=5"
```

### Create a Book Listing
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "price": 19.99,
    "description": "A classic novel",
    "address": "123 Main St"
  }'
```

### Add to Cart
```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "book_id": 1,
    "quantity": 1
  }'
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, add rate limiting middleware:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

**Last Updated**: March 2024

For additional support or to report issues, contact: support@psabookmarketplace.com
