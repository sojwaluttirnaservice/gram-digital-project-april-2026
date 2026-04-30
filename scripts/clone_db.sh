#!/bin/bash

set -e
set -o pipefail

set -a
source "$(dirname "$0")/../bin/.env"
set +a

SOURCE_DB=$1
TARGET_DB=$2

echo "🚀 Starting DB clone..."
echo "📦 Source: $SOURCE_DB"
echo "📦 Target: $TARGET_DB"

echo "🛠 Creating database..."
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" \
-e "CREATE DATABASE IF NOT EXISTS \`$TARGET_DB\`;"

echo "📤 Starting transfer (this may take time)..."

mysqldump -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" \
--single-transaction \
--routines \
--triggers \
--events \
--verbose \
"$SOURCE_DB" | mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$TARGET_DB"

echo "✅ Clone completed successfully!"