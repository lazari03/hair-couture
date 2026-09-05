import { prisma } from "@/lib/prisma";
import { brands, type BrandSlug } from "@/lib/brands";
import { parseProductCategories } from "@/lib/product-categories";

// Categories the admin can pick from, per brand — existing DB values only.
// The product form used to accept free text here, which made it too easy to
// create "Hair Care" and "Hair care" as two different categories by
// accident. Every brand always has at least one category once it has any
// products (seeded), so this never needs an "empty" fallback in practice.
export async function getCategoriesByBrand(): Promise<Record<BrandSlug, string[]>> {
  const rows = await prisma.product.findMany({
    select: { brand: true, category: true },
  });

  const map = Object.fromEntries(brands.map((b) => [b.slug, new Set<string>()])) as Record<
    BrandSlug,
    Set<string>
  >;
  for (const row of rows) {
    if (!(row.brand in map)) continue;
    for (const category of parseProductCategories(row.category)) {
      map[row.brand as BrandSlug].add(category);
    }
  }

  for (const slug of Object.keys(map) as BrandSlug[]) {
    map[slug].add("Sale");
  }

  return Object.fromEntries(
    (Object.keys(map) as BrandSlug[]).map((slug) => [slug, Array.from(map[slug]).sort()]),
  ) as Record<BrandSlug, string[]>;
}
