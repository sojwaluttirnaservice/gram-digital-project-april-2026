#!/bin/bash
# Exit immediately if a command exits with a non-zero status
set -e

echo "➡️ Pulling latest code..."
git pull

echo "➡️ Installing dependencies..."
npm install

echo "➡️ Running database migrations..."
npm run dbMigrate

echo "➡️ Reading PM2 process name from ecosystem.config.js..."
APP_NAME=$(node -p "require('./ecosystem.config.js').apps[0].name")

echo "➡️ Restarting PM2 process: $APP_NAME"
pm2 restart "$APP_NAME"

echo "➡️ Saving PM2 process list..."
pm2 save

echo "✅ Deployment complete!"
