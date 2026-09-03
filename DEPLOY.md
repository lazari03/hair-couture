# Deploying to Hetzner

One Docker container running the Next.js app + SQLite (persisted in a
volume), fronted by Caddy for automatic HTTPS. Good fit for a single
small-to-medium traffic site on one VPS — no separate DB server needed.

## 1. DNS

Point an A record (and AAAA if the server has IPv6) for `haircouture.al`
and `www.haircouture.al` at the server's IP. Caddy won't be able to get a
certificate until this resolves — but you don't need to wait for DNS to
deploy and look at the site: `docker compose up` also publishes the app
directly on port 3000, so `http://<server-ip>:3000` works immediately
(Caddy just keeps retrying the certificate in the background until DNS
resolves). Once the domain is live behind Caddy, close the port with
`ufw delete allow 3000/tcp`.

## 2. Server setup (once)

SSH into the fresh Ubuntu server, then:

```bash
git clone <your-repo-url> hair-couture
cd hair-couture
make setup
```

This installs Docker + the Compose plugin and opens ports 22/80/443/3000
in ufw.

## 3. Configure secrets

```bash
make env
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
make deploy
```

First boot runs migrations and seeds the database automatically (only on
a genuinely empty volume — see `docker-entrypoint.sh`). Caddy requests a
Let's Encrypt certificate for the domain in `Caddyfile` automatically on
first request.

Check it's up:

```bash
make ps
make logs
curl -I https://haircouture.al
```

## Redeploying after a code change

```bash
make deploy
```

(`git pull` + `docker compose up -d --build`, in one step — every code
change, not just the first deploy, goes through this same command.) The
SQLite data volume is untouched by this — only the app image rebuilds.

## Changing the domain

Edit `Caddyfile` (and `make up` — no rebuild needed, Caddy config reloads
on restart).

## Backing up the database

```bash
make backup
```

## All Makefile targets

| Command | What it does |
| --- | --- |
| `make setup` | Install Docker + open the firewall (fresh server, once) |
| `make env` | Create `.env.production` from the template |
| `make deploy` | `git pull` + rebuild + restart — the everyday command |
| `make up` / `make down` / `make restart` | Start / stop / restart without rebuilding |
| `make logs` | Tail the app's logs |
| `make ps` | Container status |
| `make shell` | Shell into the running app container |
| `make backup` | Dump the SQLite DB to a local `backup-<date>.db` file |
