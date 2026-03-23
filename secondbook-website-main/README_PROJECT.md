# 📚 PSA Book Marketplace

A full-stack book marketplace platform where users can buy and sell used books. Built with modern web technologies featuring a React frontend, Node.js/Express backend, and MySQL database with Cloudinary integration.

## 🌟 Features

### User Management
- ✅ User registration and authentication
- ✅ JWT-based session management
- ✅ User profiles with photo upload
- ✅ User preferences (favorite genres, books)
- ✅ Seller information pages

### Book Management
- ✅ List books for sale
- ✅ Upload multiple images per book
- ✅ Filter books by genre, price, and more
- ✅ Search functionality
- ✅ Browse recently added books
- ✅ Detailed book pages

### Shopping Features
- ✅ Shopping cart
- ✅ Stripe payment integration
- ✅ Order history
- ✅ Transaction tracking

### Image Management
- ✅ Cloudinary integration for image storage
- ✅ Automatic image optimization
- ✅ Multiple image uploads per book

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- MySQL Server
- Cloudinary account (free tier available)
- Stripe account (optional, for payments)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/psa-book.git
cd PSABook/secondbook-website-main

# Install dependencies
npm install --prefix backend
npm install --prefix frontend

# Configure environment variables
cp backend/source/.env.example backend/source/.env
cp frontend/.env.development frontend/.env.development

# Edit .env files with your credentials
# See SETUP_AND_DEPLOYMENT_GUIDE.md for details
```

### Run Locally

```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
cd frontend
npm run dev
```

Visit:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 📁 Project Structure

```
secondbook-website-main/
├── backend/                          # Express.js server
│   ├── source/
│   │   ├── server.js                 # Main server file
│   │   ├── config/
│   │   │   └── database.js           # Database configuration
│   │   ├── controllers/              # Request handlers
│   │   ├── models/                   # Data models
│   │   ├── routes/                   # API routes
│   │   ├── middleware/               # Custom middleware
│   │   └── utils/                    # Utility functions
│   ├── .env.example                  # Environment template
│   └── package.json
│
├── frontend/                         # React/Vite application
│   ├── src/
│   │   ├── main.jsx                  # Entry point
│   │   ├── App.jsx                   # Root component
│   │   ├── components/               # React components
│   │   ├── pages/                    # Page components
│   │   ├── service/                  # API service calls
│   │   ├── styles/                   # CSS files
│   │   └── utils/                    # Utility functions
│   ├── .env.development              # Dev environment
│   ├── .env.production               # Production environment
│   ├── vite.config.js                # Vite configuration
│   └── package.json
│
├── Database/
│   └── secondbook_db.sql             # Database schema
│
├── docs/
│   └── PROJECT-DOCUMENTATION.md      # Technical documentation
│
├── SETUP_AND_DEPLOYMENT_GUIDE.md     # Comprehensive setup guide
├── API_DOCUMENTATION.md              # API endpoint reference
├── TESTING_GUIDE.md                  # Testing instructions
├── DIGITALOCEAN_DEPLOYMENT_GUIDE.md  # Deployment steps
├── docker-compose.yml                # Docker setup
└── package.json                      # Root package.json
```

---

## 🔐 Environment Variables

### Backend Configuration

Required variables in `backend/source/.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=secondbook_db
DB_PORT=3306

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

JWT_SECRET=your_secret_key_here

NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration

Set in `frontend/.env.development`:

```
VITE_API_URL=http://localhost:3000
VITE_CLOUDINARY_CLOUD=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=profile_image
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

See [SETUP_AND_DEPLOYMENT_GUIDE.md](SETUP_AND_DEPLOYMENT_GUIDE.md) for complete configuration.

---

## 📚 API Endpoints

### Authentication
- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete account

### Books
- `GET /api/books/recent` - Get recent books
- `GET /api/books/filter` - Filter books
- `GET /api/books/genres` - Get all genres
- `GET /api/books/:id` - Get book details
- `POST /api/books` - Create book listing
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Cart
- `POST /api/cart/add` - Add to cart
- `GET /api/cart/user/:user_id` - Get cart items
- `DELETE /api/cart/:cart_item_id` - Remove item
- `DELETE /api/cart/clear/:user_id` - Clear cart

### Transactions
- `POST /api/transaction/add` - Create transaction

### Seller
- `GET /api/seller/:id` - Get seller info

Full API documentation: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🧪 Testing

Run local integration tests:

```bash
# Backend must be running on port 3000
npm run dev:backend

# In another terminal, run tests
npm test  # (if test scripts configured)
```

For comprehensive testing guide: [TESTING_GUIDE.md](TESTING_GUIDE.md)

---

## 🐳 Docker Setup

Run entire application with Docker Compose:

```bash
# Build and start services
docker-compose up -d

# Access services
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
# Database: localhost:3306

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🚀 Deployment

### Local via Docker Compose

```bash
docker-compose up
```

### DigitalOcean

Complete deployment guide: [DIGITALOCEAN_DEPLOYMENT_GUIDE.md](DIGITALOCEAN_DEPLOYMENT_GUIDE.md)

Quick summary:
1. Create DigitalOcean account
2. Create MySQL database cluster
3. Create App Platform from GitHub
4. Configure environment variables
5. Deploy and monitor

Estimated cost: ~$30/month

### Other Platforms

- **Heroku**: Requires Procfile and buildpacks configuration
- **AWS**: EC2 instances with RDS for database
- **Render**: Similar to DigitalOcean, works with Git repos
- **Railway**: Modern deployment platform

---

## 🔧 Development

### Code Style

- Backend: JavaScript (CommonJS/ES modules)
- Frontend: React with modern JavaScript
- Database: MySQL with Sequelize ORM

### Key Dependencies

**Backend:**
- Express.js - Web framework
- Sequelize - ORM
- bcrypt - Password hashing
- jsonwebtoken - Authentication
- cloudinary - Image hosting
- stripe - Payment processing

**Frontend:**
- React - UI library
- Vite - Build tool
- Axios - HTTP client
- React Router - Navigation
- Stripe.js - Payment UI

### Build Scripts

```bash
# Backend
npm start              # Start server
npm run dev           # Start with nodemon (if configured)

# Frontend
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    profile_photo VARCHAR(255),
    address TEXT,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Books Table
```sql
CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    price DECIMAL(10,2),
    description TEXT,
    image VARCHAR(255),
    seller_id INT FOREIGN KEY REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Full schema: [Database/secondbook_db.sql](Database/secondbook_db.sql)

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ HTTP-only secure cookies
- ✅ CORS protection
- ✅ Input validation
- ✅ SQL injection prevention (via Sequelize)
- ✅ Environment variable protection
- ✅ HTTPS in production

## 🎯 Performance Optimizations

- Database connection pooling
- Lazy loading of images
- Code splitting on frontend
- Cloudinary image optimization
- Redis caching (optional)
- Database indexing

---

## 📝 Documentation

- [SETUP_AND_DEPLOYMENT_GUIDE.md](SETUP_AND_DEPLOYMENT_GUIDE.md) - Complete setup and configuration
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API endpoints and examples
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Local and production testing
- [DIGITALOCEAN_DEPLOYMENT_GUIDE.md](DIGITALOCEAN_DEPLOYMENT_GUIDE.md) - Step-by-step DigitalOcean deployment
- [docs/PROJECT-DOCUMENTATION.md](docs/PROJECT-DOCUMENTATION.md) - Technical details

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check MySQL is running
mysql -u root -e "SELECT 1"

# Check environment variables
cat backend/source/.env

# Clear node_modules and reinstall
rm -rf backend/node_modules
npm install --prefix backend
```

**Frontend can't connect to backend:**
```bash
# Verify VITE_API_URL is correct
grep VITE_API_URL frontend/.env.development

# Test backend is running
curl http://localhost:3000/api/health
```

**Database errors:**
```bash
# Verify database exists
mysql -u root -p -e "SHOW DATABASES;" | grep secondbook

# Check tables created
mysql -u root -p secondbook -e "SHOW TABLES;"
```

For more issues: See [TESTING_GUIDE.md](TESTING_GUIDE.md#part-9-troubleshooting)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AddFeature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature/AddFeature`
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Support

For issues or questions:
1. Check [TESTING_GUIDE.md](TESTING_GUIDE.md#part-9-troubleshooting)
2. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. Check existing GitHub issues
4. Create new GitHub issue with details

---

## 🎉 Getting Started Checklist

- [ ] Clone repository
- [ ] Install Node.js >= 18
- [ ] Install MySQL
- [ ] Create `.env` files
- [ ] Run `npm install` in backend and frontend
- [ ] Start MySQL service
- [ ] Run `npm start` in backend
- [ ] Run `npm run dev` in frontend
- [ ] Open http://localhost:5173
- [ ] Test signup and login
- [ ] Read [SETUP_AND_DEPLOYMENT_GUIDE.md](SETUP_AND_DEPLOYMENT_GUIDE.md)

---

**Last Updated**: March 2024
**Current Version**: 1.0.0
**Status**: Production Ready ✅

---

## 📊 Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React + Vite | User interface |
| Backend | Node.js + Express | API server |
| Database | MySQL 8 | Data storage |
| ORM | Sequelize | Database abstraction |
| Auth | JWT | User authentication |
| Storage | Cloudinary | Image hosting |
| Payment | Stripe | Payment processing |
| Deployment | DigitalOcean | Cloud hosting |

---

Made with ❤️ for book lovers everywhere 📚
