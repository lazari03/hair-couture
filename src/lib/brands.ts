// Single source of truth for the 3 brands (skills/branding.md).
// Landing panels and each brand layout both read from this — adding/renaming
// a brand is a data change here, not a code change in N places.

export type BrandSlug = "balmain" | "eloure" | "eau-de-1974";

export interface Brand {
  slug: BrandSlug;
  /** CSS var values applied via data-brand on the brand layout root. */
  colors: { accent: string; accentForeground: string };
}

// name/tagline are NOT here — they're user-facing copy and live in
// messages/<locale>.json under brands.<slug> (skills/i18n.md). Look them up
// with useTranslations("brands") / getTranslations("brands").
export const brands: Brand[] = [
  { slug: "balmain", colors: { accent: "#111111", accentForeground: "#ffffff" } },
  { slug: "eloure", colors: { accent: "#8a6d5c", accentForeground: "#ffffff" } },
  { slug: "eau-de-1974", colors: { accent: "#2b2b3d", accentForeground: "#ffffff" } },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
