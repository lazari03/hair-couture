# Deploying to Hetzner

One Docker container running the Next.js app + SQLite (persisted in a
volume), fronted by Caddy for automatic HTTPS. Good fit for a single
small-to-medium traffic site on one VPS — no separate DB server needed.

## 1. DNS

Point an A record (and AAAA if the server has IPv6) for `haircouture.al`
and `www.haircouture.al` at the server's IP. Caddy won't be able to get a
certificate until this resolves.

## 2. Server setup (once)

SSH into the fresh Ubuntu server, then:

```bash
git clone <your-repo-url> hair-couture
cd hair-couture
bash deploy/setup-server.sh
```

This installs Docker + the Compose plugin and opens ports 22/80/443 in
ufw.

## 3. Configure secrets

```bash
cp .env.production.example .env.production
```

Fill in `.env.production`:
- `AUTH_SECRET` — `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH_B64` — see the comments in the file
- Brevo + GA4 keys, if you have them (safe to leave blank — those features
  just no-op until set)

Leave `DATABASE_URL` as-is; it points at the Docker volume that survives
redeploys.

## 4. Deploy

```bash
docker compose up -d --build
```

First boot runs migrations and seeds the database automatically (only on
a genuinely empty volume — see `docker-entrypoint.sh`). Caddy requests a
Let's Encrypt certificate for the domain in `Caddyfile` automatically on
first request.

Check it's up:

```bash
docker compose ps
docker compose logs -f app
curl -I https://haircouture.al
```

## Redeploying after a code change

```bash
git pull
docker compose up -d --build
```

The SQLite data volume is untouched by this — only the app image rebuilds.

## Changing the domain

Edit `Caddyfile` (and re-run `docker compose up -d` — no rebuild needed,
Caddy config reloads on restart).

## Backing up the database

```bash
docker compose exec app sh -c 'cat /data/dev.db' > backup-$(date +%F).db
```
