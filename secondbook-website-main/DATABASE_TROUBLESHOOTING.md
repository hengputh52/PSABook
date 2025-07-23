# Database Connection Troubleshooting for DigitalOcean

## ❌ Error: ETIMEDOUT / Connection Refused

This error occurs when your backend can't connect to your DigitalOcean database.

### ✅ Step-by-Step Fix:

#### 1. Verify Database Connection Details
Go to **DigitalOcean Dashboard** → **Databases** → Your Database:

```
✓ Host: db-mysql-xxx-do-user-xxxxx-0.b.db.ondigitalocean.com
✓ Port: 25060 (not 3306)
✓ User: doadmin (not root)
✓ Password: [the generated password from DO dashboard]
✓ Database: defaultdb (or your custom name)
```

#### 2. Check Trusted Sources
In your database settings:
- Go to **Settings** → **Trusted Sources**
- Add **"All DigitalOcean Droplets and App Platform"**
- Or add specific IP ranges for App Platform

#### 3. Environment Variables in DigitalOcean
Set these in your App → Backend Service → Settings → Environment Variables:

```env
DB_HOST=your-actual-host.db.ondigitalocean.com
DB_PORT=25060
DB_USER=doadmin
DB_PASSWORD=your-actual-password
DB_NAME=your-database-name
NODE_ENV=production
```

#### 4. SSL Configuration
DigitalOcean databases **require SSL**. Our code now handles this automatically:
- Production: SSL enabled with `rejectUnauthorized: false`
- Development: SSL disabled for local database

#### 5. Connection Pool & Timeouts
Updated configuration includes:
- Extended connection timeouts (60 seconds)
- Connection retry logic
- Proper connection pooling

### 🔍 Debugging Steps:

#### Test Connection Locally:
```bash
# Install MySQL client
npm install -g mysql

# Test connection (replace with your actual details)
mysql -h your-host.db.ondigitalocean.com -P 25060 -u doadmin -p --ssl-mode=REQUIRED
```

#### Check App Logs:
1. DigitalOcean Dashboard → Your App → Backend Service
2. Go to **Runtime Logs**
3. Look for connection test results:
   ```
   ✅ Database connection has been established successfully.
   OR
   ❌ Unable to connect to the database: [error details]
   ```

### 🚨 Common Mistakes:

❌ **Wrong Port**: Using 3306 instead of 25060
❌ **Wrong User**: Using 'root' instead of 'doadmin'
❌ **Missing SSL**: DigitalOcean requires SSL connections
❌ **Trusted Sources**: App Platform IPs not whitelisted
❌ **Wrong Host**: Using localhost instead of DigitalOcean host

### ✅ Correct Configuration:

```javascript
// This is now automatically configured in database.js
const sequelize = new Sequelize(database, user, password, {
  host: 'your-host.db.ondigitalocean.com',
  port: 25060,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
```

### 📞 Still Having Issues?

1. **Check Database Status**: Ensure database cluster is "Online"
2. **Review Connection String**: Copy-paste exactly from DigitalOcean
3. **Test from Different Location**: Try connecting from local machine first
4. **Contact Support**: DigitalOcean support can help with network issues
