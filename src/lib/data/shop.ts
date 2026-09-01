// Mock shop content — swap for a real backend/CMS behind these same functions
// (skills/networking.md: Server Components fetch data directly; this module
// is that data-fetching boundary). Nothing that reads from here should need
// to change when a real source lands, only the function bodies below.
//
// Split from lib/brands.ts on purpose: brands.ts is structural theme data
// (rarely changes), this is shop content (products, hero copy, account/cart/
// search copy) — content a real backend/CMS would own and already localize,
// unlike the static UI chrome in messages/<locale>.json (skills/i18n.md).

import type { BrandSlug } from "@/lib/brands";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // EUR, minor-unit-free — format with Intl at render time
  badge?: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  secondary: string;
  media: string; // placeholder label until real imagery is wired
}

export type HeroVariant = "full" | "split" | "video";

export interface ShopContent {
  slug: BrandSlug;
  menu: string[];
  hero: HeroContent;
  heroVariant: HeroVariant;
  products: Product[];
}

const shops: Record<BrandSlug, ShopContent> = {
  balmain: {
    slug: "balmain",
    menu: ["Extensions", "Hair Care", "Styling Tools", "Lookbook"],
    heroVariant: "full",
    hero: {
      eyebrow: "Autumn / Winter 26",
      title: "Couture for hair",
      body: "Hand-tied extensions and finishing tools developed with the atelier.",
      cta: "Shop the collection",
      secondary: "View lookbook",
      media: "Campaign image — 2400×1600",
    },
    products: [
      { id: "b1", name: "Double Hair Set 40cm", category: "Extensions", price: 295, badge: "New" },
      { id: "b2", name: "Elegance Clip-In Weft", category: "Extensions", price: 340 },
      { id: "b3", name: "Backstage Volume Spray", category: "Hair Care", price: 38 },
      { id: "b4", name: "Silk Perfume Shampoo", category: "Hair Care", price: 42 },
      { id: "b5", name: "Golden Styling Brush", category: "Styling Tools", price: 89, badge: "Limited" },
      { id: "b6", name: "Couture Curling Wand", category: "Styling Tools", price: 210 },
      { id: "b7", name: "Fill-In Extensions 55cm", category: "Extensions", price: 420 },
      { id: "b8", name: "Leave-In Conditioning Mist", category: "Hair Care", price: 34 },
    ],
  },
  eloure: {
    slug: "eloure",
    menu: ["Shop All", "Rituals", "Refills", "About"],
    heroVariant: "split",
    hero: {
      eyebrow: "The daily ritual",
      title: "Care that keeps up",
      body: "Refillable formulas for hair you wash, wear and live in every day.",
      cta: "Shop everyday care",
      secondary: "Find your ritual",
      media: "Still life — 2400×1600",
    },
    products: [
      { id: "e1", name: "Everyday Cream Shampoo", category: "Rituals", price: 24 },
      { id: "e2", name: "Slip Conditioner 300ml", category: "Rituals", price: 26 },
      { id: "e3", name: "Refill Pouch — Shampoo", category: "Refills", price: 16, badge: "Refill" },
      { id: "e4", name: "Scalp Serum Nº2", category: "Rituals", price: 32, badge: "New" },
      { id: "e5", name: "Soft Hold Cream", category: "Shop All", price: 21 },
      { id: "e6", name: "Weekly Repair Mask", category: "Rituals", price: 29 },
      { id: "e7", name: "Refill Pouch — Conditioner", category: "Refills", price: 18, badge: "Refill" },
      { id: "e8", name: "Wide Tooth Comb", category: "Shop All", price: 14 },
    ],
  },
  "eau-de-1974": {
    slug: "eau-de-1974",
    menu: ["Fragrance", "Discovery", "Home", "The Archive"],
    heroVariant: "video",
    hero: {
      eyebrow: "Since 1974",
      title: "A year, bottled",
      body: "Six compositions drawn from the house archive, blended in small batches.",
      cta: "Shop fragrance",
      secondary: "Read the archive",
      media: "Campaign film — 16:9 loop",
    },
    products: [
      { id: "f1", name: "Nº1974 Eau de Parfum 50ml", category: "Fragrance", price: 145 },
      { id: "f2", name: "Vetiver Blanc 50ml", category: "Fragrance", price: 145, badge: "New" },
      { id: "f3", name: "Discovery Set — Six Vials", category: "Discovery", price: 45 },
      { id: "f4", name: "Ambre Papier 100ml", category: "Fragrance", price: 195 },
      { id: "f5", name: "Archive Candle 220g", category: "Home", price: 68 },
      { id: "f6", name: "Room Spray — Fig Leaf", category: "Home", price: 54 },
      { id: "f7", name: "Néroli 74 100ml", category: "Fragrance", price: 195, badge: "Limited" },
      { id: "f8", name: "Travel Refill 10ml", category: "Discovery", price: 38 },
    ],
  },
};

export function getShop(slug: string): ShopContent | undefined {
  return shops[slug as BrandSlug];
}

export function getProduct(slug: string, productId: string): Product | undefined {
  return getShop(slug)?.products.find((p) => p.id === productId);
}

// Generic product detail copy (gallery/specs) — same shape for every brand
// until per-product detail content exists behind a real data source.
export const productDetail = {
  gallery: ["Product — front", "Detail", "In use", "Packaging"],
  sizes: ["Small", "Medium", "Large"],
  description:
    "Placeholder description copy — swap for real per-product copy once a data source is wired.",
  specs: [
    ["Shipping", "Free over € 75"],
    ["Returns", "30 days"],
    ["Origin", "Made in Europe"],
  ] as [string, string][],
};

// Account is not brand-scoped data in a real system (skills/auth.md: one
// session across all 3 brands) — this mock stands in until Auth.js + real
// orders are wired.
export const mockAccount = {
  user: { name: "Alexandra Meier", email: "a.meier@example.com", since: "Member since 2024" },
  orders: [
    { id: "#HC-10482", date: "12 Aug 2026", status: "Delivered", total: 337 },
    { id: "#HC-10391", date: "28 Jun 2026", status: "Delivered", total: 145 },
    { id: "#HC-10233", date: "03 Apr 2026", status: "Refunded", total: 42 },
  ],
  fields: [
    ["Name", "Alexandra Meier"],
    ["Email", "a.meier@example.com"],
    ["Phone", "+41 79 000 00 00"],
  ] as [string, string][],
  address: ["Alexandra Meier", "Bahnhofstrasse 21", "8001 Zürich", "Switzerland"],
};
