# DigitalOcean Backend Deployment - Step by Step

## Step 1: Prepare Your Database Connection Details

Since you already have your database hosted on DigitalOcean, collect these details:

1. Go to **DigitalOcean Dashboard** → **Databases**
2. Click on your database cluster
3. Go to **"Connection Details"** tab
4. Copy these values:
   ```
   Host: your-db-xxxxx.db.ondigitalocean.com
   Port: 25060 (usually)
   User: doadmin
   Password: [your generated password]
   Database: [your database name]
   ```

## Step 2: Import Your Database Schema

1. Download a MySQL client or use DigitalOcean's console
2. Connect using the details from Step 1
3. Import your schema from `Database/secondbook_db.sql`
4. Verify tables are created:
   ```sql
   USE your_database_name;
   SHOW TABLES;
   ```

## Step 3: Deploy Backend to DigitalOcean

### Create New App:
1. Go to **DigitalOcean Dashboard** → **Apps**
2. Click **"Create App"**
3. **Source**: GitHub
4. **Repository**: Select your repository
5. **Branch**: main

### Configure Backend Service:
```yaml
Service Name: backend
Service Type: Web Service
Source Directory: /backend
Build Command: npm install
Run Command: npm start
Environment: Node.js 18.x
HTTP Port: 3000
Instance Size: Basic ($5/month)
```

### Configure Health Check:
```yaml
Health Check Path: /api/health
Success Codes: 200
Timeout: 5 seconds
Period: 30 seconds
Failure Threshold: 3
```

## Step 4: Set Environment Variables

**Critical**: Add these environment variables in DigitalOcean (NOT in your code):

1. Go to your app → Backend service → **Settings**
2. Scroll to **"Environment Variables"**
3. Click **"Edit"** and add each variable:

```env
# Database (Use YOUR actual DigitalOcean database details)
DB_HOST=your-actual-db-host.db.ondigitalocean.com
DB_PORT=25060
DB_USER=doadmin
DB_PASSWORD=your-actual-db-password
DB_NAME=your-actual-db-name

# Alternative naming (if your code uses DB_Name instead of DB_NAME)
# DB_Name=your-actual-db-name

# Cloudinary (Your existing values)
CLOUDINARY_CLOUD_NAME=dx4vm96l3
CLOUDINARY_API_KEY=117933636656895
CLOUDINARY_API_SECRET=2facaGJCsI-sbPAluXS5S_Ofg9Q

# Security
JWT_SECRET=generate-new-secure-jwt-secret-for-production
NODE_ENV=production
PORT=3000

# CORS (Update after frontend deployment)
FRONTEND_URL=https://your-frontend-app.ondigitalocean.app
```

### ⚠️ Critical Database Setup Steps:

#### Get Your Database Connection Details:
1. **DigitalOcean Dashboard** → **Databases**
2. Click your database cluster
3. Go to **"Connection Details"** tab
4. **IMPORTANT**: Use these EXACT values:
   ```
   Host: db-mysql-xxx-do-user-xxxxx-0.b.db.ondigitalocean.com
   Port: 25060
   User: doadmin
   Password: [copy the generated password exactly]
   Database: defaultdb (or your custom name)
   ```

#### Database Security Settings:
1. In your database dashboard, go to **"Settings"**
2. Under **"Trusted Sources"**, add:
   - **All DigitalOcean Droplets** (recommended)
   - Or specific App Platform IP ranges
3. Ensure **SSL** is enabled (it's required)

## Step 5: Deploy and Test

1. Click **"Create Resources"**
2. Wait for deployment (5-10 minutes)
3. Check **"Activity"** tab for build logs
4. Test your endpoints:

### Health Check:
```bash
curl https://your-backend-url.ondigitalocean.app/api/health
```

### Database Connection Test:
```bash
curl https://your-backend-url.ondigitalocean.app/api/books
```

## Step 6: Troubleshooting Common Issues

### If Build Fails:
- Check that `sequelize` is in `dependencies` (not `devDependencies`)
- Verify all required packages are listed
- Check build logs in Activity tab

### If Health Check Fails:
- Verify `/api/health` endpoint exists
- Check that server starts on correct port (3000)
- Review runtime logs

### If Database Connection Fails:
- Double-check environment variables match your database
- Ensure database allows connections from DigitalOcean
- Verify database schema is imported

### If CORS Issues:
- Update `FRONTEND_URL` environment variable
- Check CORS configuration in server.js

## Expected Deployment Output

When successful, you should see:
```
✅ Build completed
✅ Health checks passing
✅ Service running on https://your-app-backend.ondigitalocean.app
```

Your backend will be accessible at:
- Health: `https://your-backend-url/api/health`
- Books: `https://your-backend-url/api/books`
- Users: `https://your-backend-url/api/users`
