# Single Node image, no standalone-output tracing — this app is a small
# single-tenant deploy on one VPS, not a fleet, so the simpler full
# node_modules image is the right tradeoff (fewer moving parts to get
# wrong) over Next's minimal standalone bundle.
FROM node:20-slim AS base
# openssl: needed by Prisma's query engine. python3/make/g++: needed to
# build better-sqlite3's native addon on install.
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl python3 make g++ \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
# prisma/schema.prisma is needed here too: `npm ci` runs our postinstall
# (`prisma generate`), and better-sqlite3's own native build needs install
# scripts enabled — so we can't just --ignore-scripts around it.
COPY prisma ./prisma
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
# prisma.config.ts is where DATABASE_URL actually gets wired to the
# datasource for CLI commands (`prisma migrate deploy` at container
# startup) — this schema has no `url = env(...)` in its datasource block
# since the app connects via the better-sqlite3 driver adapter instead.
# Missing this file is why migrate deploy failed with "datasource.url
# property is required" even though DATABASE_URL was set correctly.
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
