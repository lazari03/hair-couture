import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getShop } from "@/lib/data/shop";
import { ProductGrid } from "@/components/shop/ProductGrid";

export default async function ShopListing({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { brand: brandSlug } = await params;
  const { category, sort } = await searchParams;
  const shop = getShop(brandSlug);
  if (!shop) notFound();

  const t = await getTranslations();

  const counts = shop.products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  let products = category
    ? shop.products.filter((p) => p.category === category)
    : shop.products;

  if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);

  const listTitle = category ?? shop.menu[0];

  return (
    <main className="px-6 pb-24 sm:px-11">
      <div className="pt-7 pb-2 text-[11px] tracking-[0.12em] text-neutral-500 uppercase">
        {t(`brands.${shop.slug}.name`)} / {listTitle}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-neutral-200 pb-7">
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl">{listTitle}</h1>
        <span className="text-xs whitespace-nowrap text-neutral-500">
          {t("shop.resultCount", { count: products.length })}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-9 sm:gap-10 md:grid-cols-[220px_1fr]">
        <aside className="flex flex-col gap-8">
          <div>
            <h3 className="mb-3.5 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("shop.category")}
            </h3>
            <div className="flex flex-col gap-2.5">
              {Object.entries(counts).map(([name, count]) => (
                <Link
                  key={name}
                  href={`/${shop.slug}/shop?category=${encodeURIComponent(name)}`}
                  className={`flex min-h-8 items-center gap-2.5 text-[13px] ${
                    category === name ? "font-medium text-[var(--brand-accent)]" : "text-neutral-700"
                  }`}
                >
                  {name}
                  <span className="ml-auto text-xs text-neutral-400">{count}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3.5 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("shop.sortBy")}
            </h3>
            <div className="flex flex-col gap-2.5 text-[13px] text-neutral-600">
              <Link href={`/${shop.slug}/shop${category ? `?category=${category}` : ""}`}>
                {t("shop.sortNewest")}
              </Link>
              <Link
                href={`/${shop.slug}/shop?${category ? `category=${category}&` : ""}sort=price-asc`}
              >
                {t("shop.sortPriceAsc")}
              </Link>
              <Link
                href={`/${shop.slug}/shop?${category ? `category=${category}&` : ""}sort=price-desc`}
              >
                {t("shop.sortPriceDesc")}
              </Link>
            </div>
          </div>
        </aside>
        <ProductGrid brand={shop.slug} products={products} />
      </div>
    </main>
  );
}
