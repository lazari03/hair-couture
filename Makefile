.PHONY: deploy setup build up down restart logs ps status backup shell env

# One command for "pull latest + rebuild + restart" — the everyday deploy.
deploy:
	git pull
	docker compose up -d --build

# Run once on a fresh server: installs Docker, opens the firewall.
setup:
	bash deploy/setup-server.sh

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f app

ps:
	docker compose ps

status: ps

backup:
	docker compose exec app sh -c 'cat /data/dev.db' > backup-$$(date +%F).db
	@echo "Wrote backup-$$(date +%F).db"

shell:
	docker compose exec app sh

env:
	cp -n .env.production.example .env.production
	@echo "Edit .env.production, then run: make deploy"
