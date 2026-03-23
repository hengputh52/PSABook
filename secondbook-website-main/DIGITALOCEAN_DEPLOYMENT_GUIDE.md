# PSA Book Marketplace - DigitalOcean Deployment Guide

## Complete Step-by-Step Deployment Instructions

---

## Part 1: Prerequisites

### 1. Accounts & Access

- [ ] DigitalOcean account with billing configured
- [ ] GitHub account with project pushed
- [ ] Cloudinary account (for image uploads)
- [ ] Stripe account (for payments)
- [ ] Domain name registered (optional, DO provides free subdomain)

### 2. Prepare Your Repository

```bash
# Ensure code is committed
git add .
git commit -m "Prepare for DigitalOcean deployment"
git push origin main

# Repository should have these files at root:
# - app.yaml (DigitalOcean configuration)
# - docker-compose.yml (optional, for reference)
# - .do/app.yaml (alternative location)
```

### 3. Generate Secure Keys

```bash
# Generate JWT Secret (copy the output)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Save for use in DigitalOcean environment variables
```

---

## Part 2: Create MySQL Database on DigitalOcean

### Step 1: Create Database Cluster

1. **Login to DigitalOcean Dashboard**
   - Go to https://cloud.digitalocean.com

2. **Create Database**
   - Left sidebar → "Databases"
   - Click "Create" button
   - Choose "MySQL"

3. **Configure Database**

   **Basic Settings:**
   - Database cluster name: `secondbook-db`
   - MySQL Version: 8 (latest)
   - Instance size: $15/month "Starter" (2GB RAM, 1 CPU)
   - Number of nodes: 1 (for testing), 3 (for production)
   - Region: Choose closest to your users

   **Advanced Settings:**
   - Enable automatic backups: YES
   - SQL mode: Default
   - Enable HA redundancy: No (for starter)
   - Network: Default

   Click **Create Database Cluster**

### Step 2: Configure Database Access

1. **Get Connection Details**
   - After creation, copy these from cluster details:
     - **Host**: `db-xxx.db.ondigitalocean.com`
     - **Port**: `25060` (non-standard DO port)
     - **Username**: `doadmin`
     - **Password**: (shown once, save securely)
     - **Database**: `defaultdb` (rename to `secondbook`)

2. **Add Connection Limit (if needed)**
   - Database → Settings → Pooling Connection
   - Min connections: 2
   - Max connections: 10

3. **Configure Firewall Rules**
   - Database → Settings → Firewall
   - Add rule: Allow connections from App Platform

### Step 3: Initialize Database Schema

```bash
# From your local machine, connect and create database
mysql -h db-xxxxx.db.ondigitalocean.com \
      -P 25060 \
      -u doadmin \
      -p

# Inside MySQL prompt:
CREATE DATABASE secondbook;
USE secondbook;

# Import schema (optional - backend will auto-create tables)
EXIT;

# Or from command line:
mysql -h db-xxxxx.db.ondigitalocean.com \
      -P 25060 \
      -u doadmin \
      -p secondbook < Database/secondbook_db.sql
```

---

## Part 3: Deploy Using DigitalOcean App Platform

### Step 1: Create App from GitHub

1. **Access App Platform**
   - Dashboard → "Apps" → "Create App"

2. **Connect GitHub Repository**
   - Click "GitHub"
   - Select your account
   - Search for `psa-book` repository
   - Click "Select"
   - Branch: `main`
   - Click "Next"

3. **Configure Services**

   The system will auto-detect your project structure. Configure as follows:

   **Backend Service:**
   - **Name**: `backend`
   - **Type**: Web Service
   - **Source**: GitHub repository
   - **Build Command**: `npm install --prefix backend && npm run build:backend`
   - **Run Command**: `npm start --prefix backend`
   - **HTTP Port**: `3000`
   - **HTTP Route**: `/api`
   - **Instance count**: 1
   - **Instance size**: $12/month (basic)

   **Frontend Service:**
   - **Name**: `frontend` 
   - **Type**: Static Site or Web Service
   - **Source**: GitHub repository
   - **Build Command**: `npm install --prefix frontend && npm run build:frontend`
   - **Output Directory**: `frontend/dist`
   - **HTTP Route**: `/`
   - **Instance count**: 1 (for static site)

### Step 2: Configure Environment Variables

For each service, add environment variables:

**Backend Variables:**
```
DB_HOST=db-xxxxx.db.ondigitalocean.com
DB_PORT=25060
DB_USER=doadmin
DB_PASSWORD=your_secure_password_from_database_creation
DB_NAME=secondbook
NODE_ENV=production
PORT=3000
JWT_SECRET=your_generated_64_char_secret_key
FRONTEND_URL=https://your-app-name.ondigitalocean.app
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=sk_live_your_stripe_key
```

**Frontend Variables:**
```
VITE_API_URL=https://your-app-name.ondigitalocean.app/api
VITE_CLOUDINARY_CLOUD=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=profile_image
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_key
```

### Step 3: Configure Database Connection

1. **Add Database to App**
   - On App Platform setup page
   - Click "Resources" tab
   - Click "Add Resource"
   - Select "Database"
   - Choose your MySQL database created earlier
   - Click "Attach"

2. **Or use connection string in environment**
   ```
   DATABASE_URL=mysql://doadmin:password@host:25060/secondbook
   ```

### Step 4: Review and Deploy

1. **Review Configuration**
   - Check all services configured correctly
   - Verify environment variables set
   - Check build and run commands

2. **Deploy**
   - Click "Create Resources"
   - Wait for deployment (5-10 minutes)
   - Monitor build logs

3. **Get App URL**
   - After deployment: `https://secondbook-xxx.ondigitalocean.app`

---

## Part 4: Configure Custom Domain (Optional)

### Step 1: Point Domain to DigitalOcean

**If using DigitalOcean's Domain Service:**

1. Dashboard → "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `psa-book.com`)
4. Use DigitalOcean nameservers:
   ```
   ns1.digitalocean.com
   ns2.digitalocean.com
   ns3.digitalocean.com
   ```

**If using external registrar:**

1. Update nameservers at registrar to DigitalOcean's
2. Or create A record pointing to app IP

### Step 2: Link Domain to App

1. App Platform → Your app
2. Click "Settings" → "Domains"
3. Add custom domain
4. Enter full domain: `psa-book.com`
5. Add www subdomain: `www.psa-book.com` (optional)
6. Verify DNS settings
7. SSL certificate auto-provisioned (Let's Encrypt)

### Step 3: Update Frontend Environment

```
VITE_API_URL=https://psa-book.com/api
```

---

## Part 5: Post-Deployment Verification

### 1. Health Check

```bash
# Test API health
curl -s https://your-app-name.ondigitalocean.app/api/health | json_pp

# Should respond with:
# {
#   "status": "OK",
#   "timestamp": "2024-03-20T...",
#   "environment": "production"
# }
```

### 2. Test User Registration

```bash
curl -X POST https://your-app-name.ondigitalocean.app/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123!",
    "full_name": "Test User"
  }' | json_pp
```

### 3. Check Logs

```bash
# Via Dashboard: Click app → "Logs"

# Via CLI:
doctl apps logs get app-uuid --source-type build_and_deploy
doctl apps logs get app-uuid --source-type service_alert
doctl apps logs get app-uuid
```

### 4. Test Frontend

1. Open browser: `https://your-app-name.ondigitalocean.app`
2. Verify page loads
3. Test signup
4. Test login
5. Test book operations

---

## Part 6: Database Management

### Connect to Production Database

```bash
# Install MySQL client (if needed)
brew install mysql-client  # macOS
apt-get install mysql-client  # Linux

# Connect to database
mysql -h db-xxxxx.db.ondigitalocean.com \
      -P 25060 \
      -u doadmin \
      -p secondbook
```

### Backup Database

```bash
# Create backup
mysqldump -h db-xxxxx.db.ondigitalocean.com \
          -P 25060 \
          -u doadmin \
          -p secondbook > backup-$(date +%Y%m%d).sql

# DigitalOcean also provides automated backups in Database settings
```

### Restore from Backup

```bash
# Restore backup
mysql -h db-xxxxx.db.ondigitalocean.com \
      -P 25060 \
      -u doadmin \
      -p secondbook < backup-20240320.sql
```

---

## Part 7: Monitoring & Maintenance

### 1. Enable Monitoring

**DigitalOcean Built-in:**
1. App Platform → Your app → "Insights"
2. View CPU, memory, bandwidth usage
3. Set up alerts (optional)

**Application Monitoring:**
1. Integrate services like:
   - New Relic (free tier available)
   - DataDog
   - CloudWatch
   - Sentry (error tracking)

### 2. Set Up Alerts

```bash
# Via DigitalOcean CLI
doctl monitoring create-alert \
  --type "requests_4xx" \
  --value 10 \
  --window 5m
```

### 3. Performance Optimization

**Database:**
```bash
# Optimize tables
mysql -u doadmin -p secondbook << EOF
OPTIMIZE TABLE users;
OPTIMIZE TABLE books;
OPTIMIZE TABLE cart;
OPTIMIZE TABLE transactions;
EOF
```

**Backend:**
1. Enable caching headers (Redis optional)
2. Implement rate limiting
3. Use CDN for static assets
4. Compress responses (gzip)

**Frontend:**
1. Lazy load images
2. Code splitting
3. Minify CSS/JS
4. Use CDN for assets

### 4. Regular Maintenance

**Daily:**
- Monitor logs for errors
- Check database connections
- Verify backups completed

**Weekly:**
- Review performance metrics
- Check for security updates
- Monitor error rates

**Monthly:**
- Update dependencies (dev)
- Security audit
- Capacity planning
- Review spending

---

## Part 8: Scaling

### Horizontal Scaling (Add Instances)

```bash
# Increase instance count
doctl apps update app-uuid \
  --spec app.yaml

# Edit spec to increase replicas
# services:
#   - back end:
#       run_command: npm start
#       workers: 2  # Increase this
```

### Vertical Scaling (Larger Instances)

1. App Platform → Settings → Resources
2. Upgrade instance size (restart required)
3. Choose appropriate size based on metrics

### Database Scaling

1. Database → Settings → Compute Resources
2. Increase CPU/RAM as needed
3. Or add read replicas for read-heavy workloads

---

## Part 9: SSL/TLS Certificate

**Automatic (Recommended):**
- DigitalOcean auto-provisions Let's Encrypt
- Free, automatic renewal
- Works with custom domains

**Manual Certificate:**
1. Obtain from Let's Encrypt
2. Upload to DigitalOcean
3. Configure in app settings

**Verify Certificate:**
```bash
# Check SSL
curl -vI https://your-app-name.ondigitalocean.app

# Should show: SSL certificate verify ok
```

---

## Part 10: Troubleshooting Deployment

### Issue: Build Fails

**Symptom**: Deployment stuck or fails during build
```bash
# Check build logs
doctl apps logs get app-uuid --source-type build_and_deploy

# Common issues:
# - Missing dependencies
# - Environment variables not set
# - Wrong node version
# - Port conflicts
```

**Solution**:
1. Verify `npm install` succeeds locally
2. Check package.json syntax
3. Ensure Node version >= 18

### Issue: App Won't Start

**Symptom**: App crashes immediately after build
```bash
# Check runtime logs
doctl apps logs get app-uuid

# Look for:
# - Database connection errors
# - PORT not available
# - Missing environment variables
```

**Solution**:
1. Verify database credentials
2. Check PORT=3000 in env
3. Ensure all required env vars set

### Issue: Database Connection Timeout

**Symptom**: "Connection timeout" or "EHOSTUNREACH"
```bash
# Test connection locally first
mysql -h db-xxxxx.db.ondigitalocean.com \
      -P 25060 \
      -u doadmin \
      -p
```

**Solution**:
1. Check firewall allows App Platform
2. Verify correct host/port
3. Confirm DB_PASSWORD is correct
4. Check network settings

### Issue: Frontend Can't Reach Backend

**Symptom**: CORS errors or "Failed to fetch"
```bash
# Check CORS headers
curl -s -X OPTIONS https://your-app.ondigitalocean.app/api/health -v

# Check frontend env
# VITE_API_URL should match backend domain
```

**Solution**:
1. Verify VITE_API_URL is set correctly
2. Check FRONTEND_URL on backend
3. Ensure CORS middleware enabled
4. Test with basic fetch request

---

## Part 11: Update & Rollback

### Deploy Updates

```bash
# Push code changes
git add .
git commit -m "Feature: Add new feature"
git push origin main

# DigitalOcean automatically detects and deploys
# Monitor deployment progress in dashboard
```

### Rollback to Previous Version

```bash
# Via Dashboard:
# App → Activity → Find previous deployment
# Click "Rollback"

# Via CLI:
doctl apps list  # Get app uuid
doctl apps get app-uuid
```

---

## Part 12: Cost Optimization

### Estimate Monthly Cost

| Service | Tier | Cost/Month |
|---------|------|-----------|
| App Platform - Backend | Basic | $12/mo |
| App Platform - Frontend | Static | $2.50 +/mo |
| Database - MySQL | Starter | $15/mo |
| **Total** | | **~$30/mo** |

### Reduce Costs

1. Use static site hosting for frontend
2. Auto-scale down during off-hours
3. Consolidate services
4. Use spot instances (if available)

---

## Part 13: CI/CD Improvements

Create `.do/app.yaml` for automated deployments:

```yaml
name: secondbook-marketplace
services:
  - name: backend
    source:
      type: github
      repo: username/psa-book
      branch: main
      deploy_on_push: true
    build_command: npm install --prefix backend
    run_command: npm start --prefix backend
    http_port: 3000
    environment_slug: node-js
    env:
      # Variables below

  - name: frontend
    source:
      type: github
      repo: username/psa-book
      branch: main
      deploy_on_push: true
    source_dir: frontend
    build_command: npm install && npm run build
    github_branch: main
    output_dir: dist
    environment_slug: node-js
```

---

## Part 14: Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET (64 characters)
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Enable database encryption
- [ ] Set up automated backups
- [ ] Use environment variables (never hardcode secrets)
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Use prepared statements (prevent SQL injection)
- [ ] Enable CORS properly
- [ ] Use secure cookies (HttpOnly, Secure, SameSite)
- [ ] Monitor for vulnerabilities
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## Part 15: Contact & Support

**DigitalOcean Support**:
- Dashboard chat: Bottom-right corner
- Email: support@digitalocean.com
- Docs: https://docs.digitalocean.com

**Documentation**:
- App Platform: https://docs.digitalocean.com/products/app-platform/
- MySQL Database: https://docs.digitalocean.com/products/databases/mysql/
- Tutorials: https://www.digitalocean.com/community/tutorials

---

**Deployment Completed!** 🎉

Your application is now live on DigitalOcean and accessible at:
- **App URL**: https://secondbook-xxx.ondigitalocean.app
- **Custom Domain**: (if configured) https://psa-book.com

Next steps:
1. Test all functionality
2. Monitor logs and metrics
3. Set up backups
4. Configure alerts
5. Announce launch!

---

**Last Updated**: March 2024
