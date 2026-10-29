// Brand content pages (/[brand]/pages/[page]) — mirrors the brand's own
// /pages/* on its official site. Layout lives here as a short list of blocks;
// all copy lives in messages/<locale>.json under brandPages.<brand>.<page>.<key>.
// Éloure and Balmain have pages; Eau de 1974 404s.

import type { BrandSlug } from "@/lib/brands";

export type PageBlock =
  | { type: "split"; key: string; image: string; tone?: "accent"; compactTitle?: boolean } // image + title/subtitle/lead/body/note
  | { type: "statement"; key: string } // one large centered sentence
  | { type: "pillars"; key: string; images: string[] } // title (+ optional lead) + one illustrated item per image
  | { type: "stack"; key: string } // title + centered title/body items
  | { type: "text"; key: string } // centered title + body
  | { type: "imagePair"; images: [string, string] }
  | { type: "products"; key: string; category: string; limit: number } // title + products from a category
  | { type: "products"; key: string; names: string[] } // title + these products, in this order
  | { type: "collection"; key: string; image: string; category: string }; // banner (title/body) + every product in a category

const eloure: Record<string, PageBlock[]> = {
  "about-us": [{ type: "split", key: "story", image: "/assets/eloure/about-muse.jpg" }],
  "product-philosophy": [
    { type: "split", key: "intro", image: "/assets/eloure/philosophy-poppy.jpg" },
    {
      type: "pillars",
      key: "defines",
      images: ["/assets/eloure/pillar-skincare.jpg", "/assets/eloure/pillar-fragrance.png", "/assets/eloure/pillar-salon.jpg"],
    },
  ],
  "the-world-of-eloure": [
    { type: "split", key: "intro", image: "/assets/eloure/world-hero.jpg", tone: "accent" },
    { type: "stack", key: "pillars" },
    { type: "text", key: "authority" },
    { type: "imagePair", images: ["/assets/eloure/world-pro.jpg", "/assets/eloure/world-model.jpg"] },
    { type: "products", key: "top", category: "Bestsellers", limit: 4 },
  ],
  ingredients: [
    { type: "statement", key: "vegan" },
    { type: "split", key: "sustainability", image: "/assets/eloure/philosophy-poppy.jpg", compactTitle: true },
  ],
};

// balmainhair.com/pages/heritage (fetched 2026-10-29).
const balmain: Record<string, PageBlock[]> = {
  // balmainhair.com/collections/locks-of-legacy — the hero's "Discover the
  // legacy" button opens it. Products are whatever carries the category
  // (set per product in the admin), in the brand's curated order.
  "locks-of-legacy": [
    { type: "collection", key: "collection", image: "/assets/hero/balmain.jpg", category: "Locks of Legacy" },
  ],
  heritage: [
    { type: "split", key: "intro", image: "/assets/balmain/heritage-intro.png" },
    {
      type: "pillars",
      key: "craftsmanship",
      images: [
        "/assets/balmain/heritage-heritage.png",
        "/assets/balmain/heritage-excellence.jpg",
        "/assets/balmain/heritage-innovation.jpg",
        "/assets/balmain/heritage-products.jpg",
      ],
    },
    {
      type: "products",
      key: "top",
      names: ["Texturizing Volume Spray", "Moisturizing Conditioner", "Argan Moisturizing Elixir", "All Purpose SPA Brush"],
    },
    { type: "text", key: "experience" },
  ],
};

const brandPages: Partial<Record<BrandSlug, Record<string, PageBlock[]>>> = { eloure, balmain };

export function getBrandPage(brand: string, page: string): PageBlock[] | undefined {
  return brandPages[brand as BrandSlug]?.[page];
}

export function brandPageSlugs(brand: string): string[] {
  return Object.keys(brandPages[brand as BrandSlug] ?? {});
}
