# Frontend Build Troubleshooting Guide

## Common DigitalOcean Build Issues and Solutions

### Issue 1: "Cannot find module vite/bin/vite.js"

**Error Message:**
```
Error: Cannot find module '/workspace/secondbook-website-main/frontend/node_modules/vite/bin/vite.js'
```

**Root Cause:**
- Vite was in `devDependencies` instead of `dependencies`
- DigitalOcean's build process may not install dev dependencies in production builds
- Path resolution issues between different environments

### Issue 2: "Cannot find package '@vitejs/plugin-react'"

**Error Message:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@vitejs/plugin-react' imported from /workspace/secondbook-website-main/frontend/vite.config.js
```

**Root Cause:**
- `@vitejs/plugin-react` was in `devDependencies` but needed during build
- DigitalOcean production builds don't install devDependencies by default
- Vite config file imports this plugin, so it must be available during build

**Solutions Applied:**

1. **Move Build Dependencies to Dependencies:**
   ```json
   "dependencies": {
     "vite": "^4.3.0",
     "@vitejs/plugin-react": "^3.1.0"
   }
   ```

2. **Use npx for Better Path Resolution:**
   ```json
   "scripts": {
     "build": "npx vite build"
   }
   ```

3. **Alternative Build Scripts:**
   ```json
   "build-direct": "node node_modules/vite/bin/vite.js build",
   "build-node": "node build-script.js"
   ```

### Build Script Approaches (in order of preference):

1. **Primary (npx):** `npx vite build`
   - Most reliable across environments
   - Automatically finds the correct executable

2. **Direct Node:** `node node_modules/vite/bin/vite.js build`
   - Direct path execution
   - Works when npx is not available

3. **Programmatic:** `node build-script.js`
   - Uses Vite's JavaScript API
   - Most control over build process

### Environment Considerations:

- **Windows Development:** Uses `node_modules\.bin\vite.cmd`
- **Linux Deployment:** Uses `node_modules/.bin/vite`
- **Solution:** Use `npx` which handles cross-platform differences automatically

### DigitalOcean Specific Notes:

1. **Dependencies vs DevDependencies:**
   - Move build tools to `dependencies` for production builds
   - DigitalOcean may skip devDependencies in production mode

2. **Build Command:**
   - Use `npm run build` as the build command in DigitalOcean
   - Ensure the build script is reliable and cross-platform

3. **Environment Variables:**
   - Set `VITE_API_URL` in DigitalOcean app settings
   - Don't commit sensitive variables to git

### Testing Build Locally:

```bash
# Test all approaches
npm run build        # Primary approach
npm run build-direct # Direct path approach  
npm run build-node   # Programmatic approach
```

### Current Working Configuration:

```json
{
  "scripts": {
    "build": "npx vite build"
  },
  "dependencies": {
    "vite": "^4.3.0",
    "@vitejs/plugin-react": "^3.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

## Deployment Status:

- ✅ Backend: https://psa-book-b9jmm.ondigitalocean.app
- 🔄 Frontend: Deploying with fixed build configuration
- ✅ Database: Connected and operational

## Next Steps:

1. Monitor DigitalOcean deployment logs
2. Test frontend-backend connectivity
3. Configure environment variables
4. Verify full application functionality
