import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBrand } from "@/lib/brands";
import { getShop } from "@/lib/data/shop";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { CategoryLinkTracker } from "@/components/shop/CategoryLinkTracker";
import { CategoryViewBeacon } from "@/components/shop/CategoryViewBeacon";

export default async function ShopListing({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { brand: brandSlug } = await params;
  const { category, sort } = await searchParams;
  const shop = await getShop(brandSlug);
  const brand = getBrand(brandSlug);
  if (!shop || !brand) notFound();

  const t = await getTranslations();

  const counts = shop.products.reduce<Record<string, number>>((acc, p) => {
    for (const cat of p.categories) {
      acc[cat] = (acc[cat] ?? 0) + 1;
    }
    return acc;
  }, {});

  let products = category
    ? shop.products.filter((p) => p.categories.includes(category))
    : shop.products;

  if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);

  const listTitle = category ?? shop.menu[0];

  return (
    <main className="px-6 pb-24 sm:px-11">
      <CategoryViewBeacon brand={shop.slug} category={category} resultCount={products.length} />
      <div className="pt-7 pb-2 text-[11px] tracking-[0.12em] text-neutral-500 uppercase">
        {t(`brands.${shop.slug}.name`)} / {listTitle}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-neutral-200 pb-7">
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl">{listTitle}</h1>
        <span className="text-xs whitespace-nowrap text-neutral-500">
          {t("shop.resultCount", { count: products.length })}
        </span>
      </div>

      <ShopFilters
        brandSlug={shop.slug}
        counts={counts}
        category={category}
        sort={sort}
        saleColor={brand.colors.sale}
        labels={{
          category: t("shop.category"),
          allCategories: t("shop.allCategories"),
          sortBy: t("shop.sortBy"),
          sortNewest: t("shop.sortNewest"),
          sortPriceAsc: t("shop.sortPriceAsc"),
          sortPriceDesc: t("shop.sortPriceDesc"),
        }}
      />

      <div className="grid grid-cols-1 gap-6 pt-6 sm:gap-10 md:pt-9 md:grid-cols-[220px_1fr]">
        <aside className="hidden flex-col gap-8 md:flex">
          <div>
            <h3 className="mb-3.5 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("shop.category")}
            </h3>
            <div className="flex flex-col gap-2.5">
              {Object.entries(counts).map(([name, count]) => (
                <CategoryLinkTracker
                  key={name}
                  href={`/${shop.slug}/shop?category=${encodeURIComponent(name)}`}
                  category={name}
                  brand={shop.slug}
                  source="shop_sidebar"
                  className={`flex min-h-8 items-center gap-2.5 text-[13px] ${
                    name === "Sale"
                      ? "font-medium text-[var(--brand-sale)]"
                      : category === name
                        ? "font-medium text-[var(--brand-accent)]"
                        : "text-neutral-700"
                  }`}
                >
                  {name}
                  <span className="ml-auto text-xs text-neutral-400">{count}</span>
                </CategoryLinkTracker>
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
        {products.length > 0 ? (
          <ProductGrid brand={shop.slug} products={products} />
        ) : (
          <div className="flex flex-col items-center gap-10 py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <p className="text-lg font-medium tracking-tight">{t("shop.emptyTitle")}</p>
              <p className="max-w-sm text-sm text-neutral-500">{t("shop.emptyBody")}</p>
              <Link
                href={`/${shop.slug}/shop`}
                className="mt-2 border border-neutral-900 px-5 py-2.5 text-xs tracking-widest text-neutral-900 uppercase hover:bg-neutral-900 hover:text-white"
              >
                {t("shop.emptyCta")}
              </Link>
            </div>
            {shop.products.length > 0 && (
              <div className="w-full">
                <h3 className="mb-5 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
                  {t("shop.suggestionsTitle")}
                </h3>
                <ProductGrid brand={shop.slug} products={shop.products.slice(0, 4)} />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
