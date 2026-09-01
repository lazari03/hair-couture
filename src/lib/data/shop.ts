// Shop content — brand meta (menu/hero copy) is still static config below;
// products are now real rows in SQLite via Prisma (skills/networking.md:
// this module is the data-fetching boundary — pages call these functions,
// never Prisma directly, so the source can change again without touching UI).
//
// Split from lib/brands.ts on purpose: brands.ts is structural theme data
// (rarely changes), this is shop content — content a real backend/CMS would
// own and already localize, unlike the static UI chrome in
// messages/<locale>.json (skills/i18n.md).

import type { BrandSlug } from "@/lib/brands";
import { prisma } from "@/lib/prisma";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // EUR, minor-unit-free — format with Intl at render time
  badge?: string | null;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  secondary: string;
  image: string; // /public path — poster frame for the video variant, the shown image otherwise
  video?: string; // /public path to an .mp4 — only the "video" heroVariant renders it
}

export type HeroVariant = "full" | "split" | "video";

interface ShopMeta {
  slug: BrandSlug;
  menu: string[];
  hero: HeroContent;
  heroVariant: HeroVariant;
}

export interface ShopContent extends ShopMeta {
  products: Product[];
}

const shopMeta: Record<BrandSlug, ShopMeta> = {
  balmain: {
    slug: "balmain",
    // Mirrors balmainhair.com's real nav (fetched 2026-09-01): Bestsellers/New/
    // Gifts/Outlet are curated cross-category views (no dedicated product
    // category of their own, same as the live site) — Hair Care/Hair
    // Accessories/Styling Tools are the actual filterable categories, driven
    // entirely by whatever category values exist on Product rows in the DB.
    menu: ["Bestsellers", "New", "Hair Care", "Hair Accessories", "Styling Tools", "Gifts", "Outlet"],
    heroVariant: "full",
    hero: {
      eyebrow: "Autumn / Winter 26",
      title: "Couture for hair",
      body: "Hand-tied extensions and finishing tools developed with the atelier.",
      cta: "Shop the collection",
      secondary: "View lookbook",
      image: "/assets/hero/balmain.jpg",
    },
  },
  eloure: {
    slug: "eloure",
    // Mirrors maisoneloure.com's real nav (fetched 2026-09-01): New/
    // Bestsellers/Shop by Hairtype are curated cross-category views on the
    // live site (no dedicated product bucket) — Care Collection/Styling
    // Collection/Treatments & Sets are the actual filterable categories.
    menu: ["New", "Bestsellers", "Care Collection", "Styling Collection", "Shop by Hairtype", "Treatments & Sets"],
    heroVariant: "split",
    hero: {
      eyebrow: "The daily ritual",
      title: "Care that keeps up",
      body: "Refillable formulas for hair you wash, wear and live in every day.",
      cta: "Shop everyday care",
      secondary: "Find your ritual",
      image: "/assets/hero/eloure.jpg",
    },
  },
  "eau-de-1974": {
    slug: "eau-de-1974",
    // Mirrors eaude1974.com's real nav (fetched 2026-09-01): EAU de Capri/
    // Hamptons/Santorini are curated fragrance-collection views (no dedicated
    // product category of their own, same as the live site's "Explore the
    // scents" menu) — Sensorial Hair Care/Beauty/Lifestyle are the real
    // filterable categories ("Explore the products").
    menu: ["EAU de Capri", "EAU de Hamptons", "EAU de Santorini", "Sensorial Hair Care", "Sensorial Beauty", "Sensorial Lifestyle"],
    heroVariant: "video",
    hero: {
      eyebrow: "Since 1974",
      title: "A year, bottled",
      body: "Six compositions drawn from the house archive, blended in small batches.",
      cta: "Shop fragrance",
      secondary: "Read the archive",
      image: "/assets/hero/eau-de-1974.jpg",
      video: "/assets/hero/eau-de-1974.mp4",
    },
  },
};

function isBrandSlug(slug: string): slug is BrandSlug {
  return slug in shopMeta;
}

export async function getShop(slug: string): Promise<ShopContent | undefined> {
  if (!isBrandSlug(slug)) return undefined;
  const products = await prisma.product.findMany({
    where: { brand: slug },
    orderBy: { createdAt: "asc" },
  });
  return { ...shopMeta[slug], products };
}

export async function getProduct(slug: string, productId: string): Promise<Product | null> {
  if (!isBrandSlug(slug)) return null;
  return prisma.product.findFirst({ where: { brand: slug, id: productId } });
}

// categoryImage() moved to ./category-image.ts — it's a pure static mapping
// with no Prisma import, so client components (cart, ProductCard) can import
// it without pulling this module's DB dependency into the browser bundle.

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
