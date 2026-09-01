// Single source of truth for the 3 brands (skills/branding.md).
// Landing panels and each brand layout both read from this — adding/renaming
// a brand is a data change here, not a code change in N places.

export type BrandSlug = "balmain" | "eloure" | "eau-de-1974";

export interface Brand {
  slug: BrandSlug;
  /** CSS var values applied via data-brand on the brand layout root. */
  colors: { accent: string; accentForeground: string };
  /** /public path to the brand's own SVG wordmark (public/assets/logos/*.svg). */
  logo: string;
}

// name/tagline are NOT here — they're user-facing copy and live in
// messages/<locale>.json under brands.<slug> (skills/i18n.md). Look them up
// with useTranslations("brands") / getTranslations("brands").
// Accent colors are each brand's real one, pulled from its live site's own
// CSS (fetched 2026-09-01): eloure's --color-btn-primary-bg (#000ea7, matches
// its logo mark too) and eau-de-1974's dominant brand hex (#f15a25).
export const brands: Brand[] = [
  { slug: "balmain", colors: { accent: "#111111", accentForeground: "#ffffff" }, logo: "/assets/logos/balmain.svg" },
  { slug: "eloure", colors: { accent: "#000ea7", accentForeground: "#ffffff" }, logo: "/assets/logos/eloure.svg" },
  { slug: "eau-de-1974", colors: { accent: "#f15a25", accentForeground: "#ffffff" }, logo: "/assets/logos/eau-de-1974.svg" },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
