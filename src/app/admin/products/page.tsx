import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { brands, getBrand } from "@/lib/brands";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand: activeBrandSlug } = await searchParams;
  const activeBrand = activeBrandSlug ? getBrand(activeBrandSlug) : undefined;

  const products = await prisma.product.findMany({
    where: activeBrandSlug ? { brand: activeBrandSlug } : undefined,
    orderBy: [{ brand: "asc" }, { createdAt: "asc" }],
  });

  const accent = activeBrand?.colors.accent ?? "#171717";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Products</h1>
        <Link
          href={activeBrandSlug ? `/admin/products/new?brand=${activeBrandSlug}` : "/admin/products/new"}
          style={{ backgroundColor: accent }}
          className="inline-flex min-h-10 items-center px-4 text-sm font-medium text-white hover:opacity-90"
        >
          + Add product
        </Link>
      </div>

      <div className="mb-6 flex gap-2 text-sm">
        <Link
          href="/admin/products"
          className={`rounded px-3 py-1.5 ${!activeBrand ? "bg-neutral-900 text-white" : "border border-neutral-300 text-neutral-600 hover:border-neutral-900"}`}
        >
          All brands
        </Link>
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={`/admin/products?brand=${b.slug}`}
            style={activeBrand?.slug === b.slug ? { backgroundColor: b.colors.accent, color: b.colors.accentForeground } : undefined}
            className={`rounded px-3 py-1.5 ${
              activeBrand?.slug === b.slug ? "" : "border border-neutral-300 text-neutral-600 hover:border-neutral-900"
            }`}
          >
            {b.slug}
          </Link>
        ))}
      </div>

      {/* One brand selected: a single themed table. No brand selected: one
          section per brand, each with its own colored header bar — "each
          web has its own color, separate them" instead of one flat mixed
          table with a brand-name column. */}
      {activeBrand ? (
        <ProductsTable products={products} />
      ) : (
        <div className="flex flex-col gap-8">
          {brands.map((b) => {
            const brandProducts = products.filter((p) => p.brand === b.slug);
            return (
              <div key={b.slug}>
                <div
                  style={{ backgroundColor: b.colors.accent, color: b.colors.accentForeground }}
                  className="flex items-center justify-between px-4 py-2.5 text-sm font-medium"
                >
                  <span>{b.slug}</span>
                  <span className="opacity-80">{brandProducts.length} products</span>
                </div>
                <ProductsTable products={brandProducts} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
