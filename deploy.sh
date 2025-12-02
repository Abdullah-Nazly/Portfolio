#!/bin/bash

# Clean GitHub Pages Deployment Script
# This script builds and deploys your Angular app to the gh-pages branch

set -e  # Exit on error

echo "🚀 Starting deployment to GitHub Pages..."

# Step 1: Build the application
echo "📦 Building application..."
npm run build:gh-pages

# Step 2: Verify build output
BUILD_DIR="dist/Portfolio/browser/browser"
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Error: Build directory not found at $BUILD_DIR"
    exit 1
fi

# Step 3: Create a clean deployment directory
echo "🧹 Preparing deployment..."
DEPLOY_DIR=".deploy"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# Step 4: Copy build files
echo "📋 Copying build files..."
cp -r "$BUILD_DIR"/* "$DEPLOY_DIR/"

# Step 5: Initialize git in deploy directory
cd "$DEPLOY_DIR"
git init
git add .
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
git branch -M gh-pages

# Step 6: Add remote and push
echo "📤 Pushing to GitHub..."
git remote add origin https://github.com/Abdullah-Nazly/Portfolio.git 2>/dev/null || git remote set-url origin https://github.com/Abdullah-Nazly/Portfolio.git
git push -u origin gh-pages --force

# Step 7: Cleanup
cd ..
rm -rf "$DEPLOY_DIR"

echo "✅ Deployment successful!"
echo "🌐 Your site should be available at: https://abdullah-nazly.github.io/Portfolio/"

