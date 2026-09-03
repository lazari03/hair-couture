#!/bin/bash
# Run once on a fresh Ubuntu Hetzner server (as root, or with sudo):
#   curl -fsSL https://raw.githubusercontent.com/<you>/hair-couture/main/deploy/setup-server.sh | bash
# or copy it up and run it directly. Installs Docker + Compose plugin and
# opens the firewall for SSH/HTTP/HTTPS. Idempotent — safe to re-run.
set -e

# Docker's official install script — same one docs.docker.com links to.
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

# Firewall: only SSH, HTTP, HTTPS. Cheap Hetzner boxes have no firewall by
# default — ufw is the standard low-effort choice on Ubuntu.
if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw --force enable
fi

echo "Docker $(docker --version) installed. Log out/in (or newgrp docker) if you added a non-root user to the docker group."
echo "Next: clone the repo, cp .env.production.example .env.production and fill it in, then: docker compose up -d --build"
