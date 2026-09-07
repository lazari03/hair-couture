// Shop content — brand meta (menu/hero copy) is still static config below;
// products are now real rows in SQLite via Prisma (skills/networking.md:
// this module is the data-fetching boundary — pages call these functions,
// never Prisma directly, so the source can change again without touching UI).
//
// Split from lib/brands.ts on purpose: brands.ts is structural theme data
// (rarely changes), this is shop content — content a real backend/CMS would
// own and already localize, unlike the static UI chrome in
// messages/<locale>.json (skills/i18n.md).

import { getTranslations } from "next-intl/server";
import type { BrandSlug } from "@/lib/brands";
import { prisma } from "@/lib/prisma";
import { parseProductCategories, primaryCategory } from "@/lib/product-categories";

export interface Product {
  id: string;
  name: string;
  category: string;
  categories: string[];
  price: number; // EUR, minor-unit-free — format with Intl at render time
  badge?: string | null;
  description?: string | null;
  imageUrl?: string | null; // falls back to categoryImage() when unset
  stock: number; // 0 = out of stock, storefront disables add-to-cart
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

// Just the non-text hero assets — the copy (eyebrow/title/body/cta/secondary)
// lives in messages/<locale>.json under "shopMeta.<brand>.hero" so it
// translates; getShop() below stitches the two together.
interface HeroAssets {
  image: string;
  video?: string;
}

export type HeroVariant = "full" | "split" | "video";

interface ShopMeta {
  slug: BrandSlug;
  menu: string[];
  hero: HeroAssets;
  heroVariant: HeroVariant;
}

export interface ShopContent extends Omit<ShopMeta, "hero"> {
  hero: HeroContent;
  products: Product[];
}

const shopMeta: Record<BrandSlug, ShopMeta> = {
  balmain: {
    slug: "balmain",
    // Mirrors balmainhair.com's real nav (fetched 2026-09-01): Bestsellers/New/
    // Outlet are curated cross-category views (no dedicated product category
    // of their own, same as the live site) — Hair Care/Hair Accessories/
    // Styling Tools/Gifts are the actual filterable categories (from the real
    // balmainhair.al WooCommerce export), driven entirely by whatever
    // category values exist on Product rows in the DB.
    menu: ["Bestsellers", "New", "Hair Care", "Hair Accessories", "Styling Tools", "Gifts", "Sale", "Outlet"],
    heroVariant: "full",
    hero: { image: "/assets/hero/balmain.jpg" },
  },
  eloure: {
    slug: "eloure",
    // Mirrors maisoneloure.com's real nav (fetched 2026-09-01): New/
    // Bestsellers/Shop by Hairtype are curated cross-category views on the
    // live site (no dedicated product bucket) — Care Collection/Styling
    // Collection/Treatments & Sets are the actual filterable categories.
    menu: ["New", "Bestsellers", "Care Collection", "Styling Collection", "Shop by Hairtype", "Treatments & Sets", "Sale"],
    heroVariant: "split",
    hero: { image: "/assets/hero/eloure.jpg" },
  },
  "eau-de-1974": {
    slug: "eau-de-1974",
    // Mirrors eaude1974.com's real nav (fetched 2026-09-01): EAU de Capri/
    // Hamptons/Santorini are curated fragrance-collection views (no dedicated
    // product category of their own, same as the live site's "Explore the
    // scents" menu) — Sensorial Hair Care/Beauty/Lifestyle are the real
    // filterable categories ("Explore the products").
    menu: ["EAU de Capri", "EAU de Hamptons", "EAU de Santorini", "Sensorial Hair Care", "Sensorial Beauty", "Sensorial Lifestyle", "Sale"],
    heroVariant: "video",
    hero: { image: "/assets/hero/eau-de-1974.jpg", video: "/assets/hero/eau-de-1974.mp4" },
  },
};

function isBrandSlug(slug: string): slug is BrandSlug {
  return slug in shopMeta;
}

function toShopProduct(product: {
  id: string;
  name: string;
  category: string;
  price: number;
  badge: string | null;
  description: string | null;
  imageUrl: string | null;
  stock: number;
}): Product {
  const categories = parseProductCategories(product.category);
  return {
    ...product,
    category: primaryCategory(product.category),
    categories,
  };
}

export async function getShop(slug: string): Promise<ShopContent | undefined> {
  if (!isBrandSlug(slug)) return undefined;
  const [products, t] = await Promise.all([
    prisma.product.findMany({ where: { brand: slug }, orderBy: { createdAt: "asc" } }),
    getTranslations(`shopMeta.${slug}.hero`),
  ]);
  const meta = shopMeta[slug];
  return {
    ...meta,
    hero: {
      eyebrow: t("eyebrow"),
      title: t("title"),
      body: t("body"),
      cta: t("cta"),
      secondary: t("secondary"),
      ...meta.hero,
    },
    products: products.map(toShopProduct),
  };
}

export async function getProduct(slug: string, productId: string): Promise<Product | null> {
  if (!isBrandSlug(slug)) return null;
  const product = await prisma.product.findFirst({ where: { brand: slug, id: productId } });
  return product ? toShopProduct(product) : null;
}

// categoryImage() moved to ./category-image.ts — it's a pure static mapping
// with no Prisma import, so client components (cart, ProductCard) can import
// it without pulling this module's DB dependency into the browser bundle.

// Generic product detail copy — still shared across every product (size
// options, shipping/returns specs, fallback description for any product
// without its own). Real per-product copy now comes from Product.description.
// Labels/copy come from messages/<locale>.json ("product" namespace) so they
// translate; only the size options and spec ordering are structural here.
export async function getProductDetail() {
  const t = await getTranslations("product");
  return {
    sizes: t.raw("sizes") as string[],
    description: t("placeholderDescription"),
    specs: [
      [t("specs.shipping.label"), t("specs.shipping.value")],
      [t("specs.returns.label"), t("specs.returns.value")],
      [t("specs.origin.label"), t("specs.origin.value")],
    ] as [string, string][],
  };
}
