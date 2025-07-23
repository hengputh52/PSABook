#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
npm install

echo "🏗️ Building application..."
npx vite build

echo "✅ Build completed successfully!"
ls -la dist/
