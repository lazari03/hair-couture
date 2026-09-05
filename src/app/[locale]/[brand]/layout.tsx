import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { brands, getBrand, type BrandSlug } from "@/lib/brands";
import { getShop } from "@/lib/data/shop";
import { CartCountBadge } from "@/components/shop/CartCountBadge";
import { Footer } from "@/components/shop/Footer";

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandSlug } = await params;
  const brand = getBrand(brandSlug);
  const shop = await getShop(brandSlug);
  if (!brand || !shop) notFound();

  const t = await getTranslations();
  // Nav items that match a real product category get the filter link; the
  // rest (Bestsellers, New, Gifts, ...) are curated views with no dedicated
  // category yet, so they just go to the unfiltered shop — same as the live
  // site's mega-menu mixing curated and category links.
  const filterableCategories = new Set(shop.products.flatMap((p) => p.categories));
  filterableCategories.add("Sale");

  function menuHref(item: string): string {
    return filterableCategories.has(item)
      ? `/${brand.slug}/shop?category=${encodeURIComponent(item)}`
      : `/${brand.slug}/shop`;
  }

  return (
    <div
      data-brand={brand.slug}
      style={
        {
          "--brand-accent": brand.colors.accent,
          "--brand-accent-foreground": brand.colors.accentForeground,
        } as React.CSSProperties
      }
      className="flex flex-1 flex-col"
    >
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="text-[13px] whitespace-nowrap text-neutral-500 hover:underline">
            &larr; {t("nav.backToBrands")}
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, no next/image benefit */}
          <img
            src={brand.logo}
            alt={t(`brands.${brand.slug as BrandSlug}.name`)}
            className="h-6 w-auto sm:h-7"
          />
          <nav className="hidden items-center gap-5 text-[13px] lg:flex">
            <Link href={`/${brand.slug}/search`}>{t("nav.search")}</Link>
            <Link href={`/${brand.slug}/account`}>{t("nav.account")}</Link>
            <Link href={`/${brand.slug}/cart`} className="flex items-center gap-1.5">
              {t("nav.cart")}
              <CartCountBadge />
            </Link>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <Link href={`/${brand.slug}/cart`} className="flex items-center gap-1.5 text-[13px]">
              {t("nav.cart")}
              <CartCountBadge />
            </Link>
            <details className="relative">
              <summary className="flex min-h-11 cursor-pointer list-none items-center border border-neutral-300 px-3 text-[11px] tracking-[0.14em] uppercase [&::-webkit-details-marker]:hidden">
                Menu
              </summary>
              <div className="absolute right-0 top-12 w-[min(88vw,340px)] border border-neutral-200 bg-white p-4 shadow-xl">
                <div className="mb-3 flex flex-col gap-2 border-b border-neutral-100 pb-3 text-sm">
                  <Link href={`/${brand.slug}/search`}>{t("nav.search")}</Link>
                  <Link href={`/${brand.slug}/account`}>{t("nav.account")}</Link>
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs tracking-[0.12em] text-neutral-600 uppercase sm:grid-cols-2">
                  {shop.menu.map((item) => (
                    <Link key={item} href={menuHref(item)} className="border-b border-transparent py-1 hover:text-[var(--brand-accent)]">
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>
        <nav className="hidden flex-wrap justify-center gap-6 px-6 pb-3.5 text-xs tracking-[0.14em] text-neutral-600 uppercase lg:flex lg:gap-8">
          {shop.menu.map((item) => (
            <Link
              key={item}
              href={menuHref(item)}
              className="border-b border-transparent pb-1 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer brand={brand} />
    </div>
  );
}
