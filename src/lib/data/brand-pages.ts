// Brand content pages (/[brand]/pages/[page]) — mirrors the brand's own
// /pages/* on its official site. Layout lives here as a short list of blocks;
// all copy lives in messages/<locale>.json under brandPages.<brand>.<page>.<key>.
// Only Éloure has pages today; other brands 404.

import type { BrandSlug } from "@/lib/brands";

export type PageBlock =
  | { type: "split"; key: string; image: string; tone?: "accent"; compactTitle?: boolean } // image + title/subtitle/lead/body/note
  | { type: "statement"; key: string } // one large centered sentence
  | { type: "pillars"; key: string; images: string[] } // title + 3 illustrated items
  | { type: "stack"; key: string } // title + centered title/body items
  | { type: "text"; key: string } // centered title + body
  | { type: "imagePair"; images: [string, string] }
  | { type: "products"; key: string; category: string; limit: number }; // title + products from a category

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

const brandPages: Partial<Record<BrandSlug, Record<string, PageBlock[]>>> = { eloure };

export function getBrandPage(brand: string, page: string): PageBlock[] | undefined {
  return brandPages[brand as BrandSlug]?.[page];
}

export function brandPageSlugs(brand: string): string[] {
  return Object.keys(brandPages[brand as BrandSlug] ?? {});
}
