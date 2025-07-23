#!/bin/bash
set -e

echo "🔧 Node.js version:"
node --version
echo "📦 NPM version:"
npm --version

echo "🔧 Installing dependencies..."
npm install --prefer-offline --no-audit --progress=false

echo "📦 Verifying vite installation..."
if [ -f "./node_modules/.bin/vite" ]; then 
    echo "✅ Vite found at ./node_modules/.bin/vite"
else
    echo "❌ Vite not found, installing explicitly..."
    npm install vite@latest --save-dev
fi

echo "🏗️ Building application with full path..."
./node_modules/.bin/vite build

echo "✅ Build completed successfully!"
echo "📁 Checking dist folder:"
ls -la dist/ || echo "No dist folder yet"
