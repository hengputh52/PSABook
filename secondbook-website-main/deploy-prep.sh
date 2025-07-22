#!/bin/bash

# DigitalOcean Deployment Helper Script
# Run this script before deploying to DigitalOcean

echo "🚀 Preparing for DigitalOcean deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the root of your project"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "*.env" >> .gitignore
    echo "node_modules/" >> .gitignore
    echo "/frontend/dist" >> .gitignore
    echo "/backend/.env" >> .gitignore
fi

# Add all files and commit
echo "📝 Adding files to git..."
git add .
git commit -m "Prepare for DigitalOcean deployment - $(date)"

echo "✅ Project is ready for deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub: git push origin main"
echo "2. Go to DigitalOcean Apps dashboard"
echo "3. Create new app from GitHub repository"
echo "4. Follow the configuration in DEPLOYMENT_GUIDE.md"
echo ""
echo "🔗 Useful links:"
echo "- DigitalOcean Apps: https://cloud.digitalocean.com/apps"
echo "- GitHub Education: https://education.github.com/"
