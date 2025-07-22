# DigitalOcean App Platform Deployment Guide

## Prerequisites
1. GitHub account with your code pushed
2. DigitalOcean account with GitHub Education credits
3. Your project should be in a GitHub repository

## Deployment Steps

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Create DigitalOcean App
1. Log into DigitalOcean
2. Go to Apps → Create App
3. Choose GitHub as source
4. Select your repository
5. Choose the branch (usually main)

### 3. Configure App Settings

#### Backend Service:
- **Name**: backend
- **Source Directory**: /backend
- **Build Command**: npm install
- **Run Command**: npm start
- **Environment**: Node.js
- **Port**: 3000

#### Frontend Service:
- **Name**: frontend
- **Source Directory**: /frontend
- **Build Command**: npm run build
- **Output Directory**: dist
- **Environment**: Static Site

#### Database:
- **Type**: Managed Database
- **Engine**: MySQL
- **Size**: Basic (1GB RAM, 1 vCPU, 10GB Disk)

### 4. Environment Variables
Add these to your backend service:
- NODE_ENV=production
- DB_HOST=[Your Database Host]
- DB_USER=[Your Database User]
- DB_PASSWORD=[Your Database Password]
- DB_NAME=[Your Database Name]
- JWT_SECRET=[Generate a secure secret]
- CLOUDINARY_CLOUD_NAME=[Your Cloudinary Cloud Name]
- CLOUDINARY_API_KEY=[Your Cloudinary API Key]
- CLOUDINARY_API_SECRET=[Your Cloudinary API Secret]

### 5. Update CORS Origins
Update your backend server.js to include your production domain

### 6. Update Frontend API Base URL
Update your frontend environment variables to point to production backend

## Cost Estimation (with GitHub Education credits)
- App Platform: $5-12/month
- Managed MySQL Database: $15/month
- Total: ~$20-27/month (covered by your $200 credit)
