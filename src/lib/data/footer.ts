// Per-brand footer content — link hrefs, the newsletter form copy, and the
// contact email. Split from lib/brands.ts on purpose, same reasoning as
// shop.ts: brands.ts is structural theme data (rarely changes), this is
// content a real CMS would own. Kept as a typed TS module (not a loose
// .json file) so it stays statically typed and tree-shakeable, matching
// this repo's one existing precedent for per-brand data blobs (shopMeta in
// ./shop.ts) — the shape below is still plain JSON-compatible data, just
// colocated with everything else under src/lib/data/ instead of living
// outside the app's type system.
//
// UI chrome (column titles, "Back to shop", etc.) stays in
// messages/<locale>.json under the "footer" namespace per skills/i18n.md —
// only real hrefs/labels/copy that's genuinely per-brand content lives here.

import type { BrandSlug } from "@/lib/brands";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  slug: BrandSlug;
  contactEmail: string;
  shopLinks: FooterLink[];
  serviceLinks: FooterLink[];
  newsletter: {
    title: string;
    body: string;
    placeholder: string;
    cta: string;
  };
}

// Shared across all 3 brands today — a single owner inbox. Placeholder:
// confirm/replace with the real address before launch.
export const CONTACT_EMAIL = "info@haircouture.al";

function shopLinksFor(slug: BrandSlug, categories: string[]): FooterLink[] {
  return [
    ...categories.map((category) => ({
      label: category,
      href: `/${slug}/shop?category=${encodeURIComponent(category)}`,
    })),
    { label: "Shop all", href: `/${slug}/shop` },
  ];
}

function serviceLinksFor(slug: BrandSlug): FooterLink[] {
  return [
    { label: "Contact", href: `/${slug}/contact` },
    { label: "Shipping & Returns", href: `/${slug}/terms#shipping` },
    { label: "Privacy Policy", href: `/${slug}/privacy` },
    { label: "Terms of Service", href: `/${slug}/terms` },
    { label: "Cookies", href: `/${slug}/cookies` },
  ];
}

const footerMeta: Record<BrandSlug, FooterContent> = {
  balmain: {
    slug: "balmain",
    contactEmail: CONTACT_EMAIL,
    shopLinks: shopLinksFor("balmain", ["Hair Care", "Hair Accessories", "Styling Tools"]),
    serviceLinks: serviceLinksFor("balmain"),
    newsletter: {
      title: "Join the list",
      body: "Sign up for early access to new collections and exclusive offers.",
      placeholder: "Email address",
      cta: "Subscribe",
    },
  },
  eloure: {
    slug: "eloure",
    contactEmail: CONTACT_EMAIL,
    shopLinks: shopLinksFor("eloure", ["Care Collection", "Styling Collection", "Treatments & Sets"]),
    serviceLinks: serviceLinksFor("eloure"),
    newsletter: {
      title: "Stay in the loop",
      body: "New arrivals, refill reminders, and offers — straight to your inbox.",
      placeholder: "Email address",
      cta: "Subscribe",
    },
  },
  "eau-de-1974": {
    slug: "eau-de-1974",
    contactEmail: CONTACT_EMAIL,
    shopLinks: shopLinksFor("eau-de-1974", ["Sensorial Hair Care", "Sensorial Beauty", "Sensorial Lifestyle"]),
    serviceLinks: serviceLinksFor("eau-de-1974"),
    newsletter: {
      title: "From the archive",
      body: "New compositions and stories from the house, a few times a year.",
      placeholder: "Email address",
      cta: "Subscribe",
    },
  },
};

export function getFooter(slug: string): FooterContent | undefined {
  return footerMeta[slug as BrandSlug];
}
