# DigitalOcean Deployment Configuration

## Backend Service Configuration

### Source Settings
```yaml
Service Name: backend
Service Type: Web Service
Source Directory: /backend
Build Command: npm install
Run Command: npm start
Environment: Node.js 18.x
HTTP Port: 3000
Instance Size: Basic ($5/month)
Instance Count: 1
```

### Health Check Configuration
```yaml
Health Check Path: /api/health
Health Check Success Codes: 200
Health Check Timeout: 5 seconds
Health Check Period: 30 seconds
Health Check Failure Threshold: 3
```

### Environment Variables for Production
```env
# Database Configuration (Update with your DigitalOcean Database values)
DB_HOST=your-database-host.db.ondigitalocean.com
DB_PORT=25060
DB_USER=doadmin
DB_PASSWORD=your-database-password
DB_NAME=secondbook_db

# Cloudinary Configuration (Your existing values)
CLOUDINARY_CLOUD_NAME=dx4vm96l3
CLOUDINARY_API_KEY=117933636656895
CLOUDINARY_API_SECRET=2facaGJCsI-sbPAluXS5S_Ofg9Q

# JWT Secret (Generated for production)
JWT_SECRET=4ef9e4b00b245a8629a6697df79f43d3b5db39b9f3be6f170819451ff5052c2bc772c435d0d6f1ab57790b6f1c32f315466e956965684c213fe0c731afbf522a

# Application Configuration
NODE_ENV=production
PORT=3000

# Frontend URL (Update after frontend deployment)
FRONTEND_URL=https://your-frontend-app.ondigitalocean.app
```

## Database Setup

### Create DigitalOcean Database
1. Go to DigitalOcean Dashboard → Databases
2. Create Database Cluster:
   - Engine: MySQL 8.0
   - Configuration: Basic
   - Size: 1 GB RAM, 1 vCPU ($15/month)
   - Database Name: `secondbook_db`

### Import Schema
```sql
-- Use your Database/secondbook_db.sql file
-- Import via DigitalOcean console or MySQL client
```

## Health Check Endpoint Details

Your backend includes a health check at `/api/health` that returns:
```json
{
  "status": "OK",
  "timestamp": "2025-07-22T...",
  "environment": "production"
}
```

## Testing Your Deployment

### 1. Health Check Test
```bash
curl https://your-backend-url.ondigitalocean.app/api/health
```

### 2. Database Connection Test
```bash
curl https://your-backend-url.ondigitalocean.app/api/books
```

### 3. Authentication Test
```bash
curl -X POST https://your-backend-url.ondigitalocean.app/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","firstName":"Test","lastName":"User"}'
```

## Cost Estimation
- Database: $15/month
- Backend App: $5/month
- Total: $20/month
- With GitHub Student $200 credit: ~10 months free

## Troubleshooting

### Common Issues:
1. **Build Fails**: Check package.json scripts
2. **Health Check Fails**: Verify /api/health endpoint
3. **Database Connection**: Check environment variables
4. **CORS Issues**: Update FRONTEND_URL after frontend deployment

### Logs Access:
- DigitalOcean Dashboard → Your App → Backend Service → Runtime Logs
- Look for startup messages and error logs
