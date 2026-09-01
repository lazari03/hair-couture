import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // We already maintain ARCHITECTURE.md + skills/ for agent context —
  // don't let Next.js also generate/overwrite its own AGENTS.md/CLAUDE.md.
  agentRules: false,
};

export default withNextIntl(nextConfig);
