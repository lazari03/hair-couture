import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // We already maintain ARCHITECTURE.md + skills/ for agent context —
  // don't let Next.js also generate/overwrite its own AGENTS.md/CLAUDE.md.
  agentRules: false,
  images: {
    // AVIF first (smallest at the same visual quality), WebP for older
    // browsers. Product photos use quality 85 (ProductImage) — sharper than
    // the default 75 — so both must be allowed here.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    // Optimized variants are cached on the server; source files only change
    // on deploy (fresh container) or get a new name (admin uploads).
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default withNextIntl(nextConfig);
