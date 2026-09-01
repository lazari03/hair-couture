// Split out of shop.ts on purpose: this is a pure static mapping (no DB),
// safe to import from client components (e.g. the cart page). shop.ts pulls
// in Prisma/better-sqlite3, which breaks the client bundle if a "use client"
// file imports anything from that module graph.

// One placeholder stock photo per category (public/assets/products/*.jpg) —
// swap for real per-product photography once it exists; every product in a
// category shares one image until then, same as the design's placeholder blocks.
const categoryImageSlugs: Record<string, string> = {
  "Hair Care": "hair-care",
  "Hair Accessories": "hair-accessories",
  "Styling Tools": "styling-tools",
  "Care Collection": "care-collection",
  "Styling Collection": "styling-collection",
  "Treatments & Sets": "treatments-sets",
  "Sensorial Hair Care": "sensorial-hair-care",
  "Sensorial Beauty": "sensorial-beauty",
  "Sensorial Lifestyle": "sensorial-lifestyle",
};

export function categoryImage(category: string): string {
  const slug = categoryImageSlugs[category] ?? "shop-all";
  return `/assets/products/${slug}.jpg`;
}

// Real per-product photo when we have one (most seeded products do — fetched
// from the brand's own site), the shared category placeholder otherwise
// (e.g. a product added by hand in /admin without an image yet).
export function productImage(product: { category: string; imageUrl?: string | null }): string {
  return product.imageUrl ?? categoryImage(product.category);
}
