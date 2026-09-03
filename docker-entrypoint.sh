#!/bin/sh
# Runs migrations (and seeds once, on a genuinely empty volume) before
# starting the server — so `docker compose up` alone takes a fresh Hetzner
# volume to a fully working, seeded site.
set -e

DB_PATH="${DATABASE_URL#file:}"
FRESH=0
if [ ! -f "$DB_PATH" ]; then
  FRESH=1
fi

npx prisma migrate deploy

if [ "$FRESH" = "1" ]; then
  echo "Fresh database at $DB_PATH — seeding..."
  npm run db:seed
fi

exec npm run start
