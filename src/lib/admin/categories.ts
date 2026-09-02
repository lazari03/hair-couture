import { prisma } from "@/lib/prisma";
import { brands, type BrandSlug } from "@/lib/brands";

// Categories the admin can pick from, per brand — existing DB values only.
// The product form used to accept free text here, which made it too easy to
// create "Hair Care" and "Hair care" as two different categories by
// accident. Every brand always has at least one category once it has any
// products (seeded), so this never needs an "empty" fallback in practice.
export async function getCategoriesByBrand(): Promise<Record<BrandSlug, string[]>> {
  const rows = await prisma.product.findMany({
    select: { brand: true, category: true },
    distinct: ["brand", "category"],
  });

  const map = Object.fromEntries(brands.map((b) => [b.slug, [] as string[]])) as Record<
    BrandSlug,
    string[]
  >;
  for (const row of rows) {
    if (row.brand in map) map[row.brand as BrandSlug].push(row.category);
  }
  for (const slug of Object.keys(map) as BrandSlug[]) map[slug].sort();
  return map;
}
