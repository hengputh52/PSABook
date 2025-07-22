# DigitalOcean Deployment Helper Script for Windows PowerShell
# Run this script before deploying to DigitalOcean

Write-Host "🚀 Preparing for DigitalOcean deployment..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Please run this script from the root of your project" -ForegroundColor Red
    exit 1
}

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing git repository..." -ForegroundColor Yellow
    git init
    
    # Create .gitignore if it doesn't exist
    if (-not (Test-Path ".gitignore")) {
        @"
*.env
node_modules/
/frontend/dist
/backend/.env
.DS_Store
Thumbs.db
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8
    }
}

# Add all files and commit
Write-Host "📝 Adding files to git..." -ForegroundColor Yellow
git add .
$commitMessage = "Prepare for DigitalOcean deployment - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMessage

Write-Host "✅ Project is ready for deployment!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Push your code to GitHub: git push origin main"
Write-Host "2. Go to DigitalOcean Apps dashboard"
Write-Host "3. Create new app from GitHub repository"
Write-Host "4. Follow the configuration in DEPLOYMENT_GUIDE.md"
Write-Host ""
Write-Host "🔗 Useful links:" -ForegroundColor Cyan
Write-Host "- DigitalOcean Apps: https://cloud.digitalocean.com/apps"
Write-Host "- GitHub Education: https://education.github.com/"
