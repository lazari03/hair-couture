import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { brands, getBrand, type BrandSlug } from "@/lib/brands";
import { getShop } from "@/lib/data/shop";
import { CartCountBadge } from "@/components/shop/CartCountBadge";
import { BalmainFooter } from "@/components/shop/BalmainFooter";

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
  const filterableCategories = new Set(shop.products.map((p) => p.category));

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
        <div className="flex items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="text-[13px] whitespace-nowrap text-neutral-500 hover:underline">
            &larr; {t("nav.backToBrands")}
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, no next/image benefit */}
          <img
            src={brand.logo}
            alt={t(`brands.${brand.slug as BrandSlug}.name`)}
            className="h-6 w-auto sm:h-7"
          />
          <nav className="flex items-center gap-5 text-[13px]">
            <Link href={`/${brand.slug}/search`}>{t("nav.search")}</Link>
            <Link href={`/${brand.slug}/account`}>{t("nav.account")}</Link>
            <Link href={`/${brand.slug}/cart`} className="flex items-center gap-1.5">
              {t("nav.cart")}
              <CartCountBadge />
            </Link>
          </nav>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 px-6 pb-3.5 text-xs tracking-[0.14em] text-neutral-600 uppercase sm:gap-8">
          {shop.menu.map((item) => (
            <Link
              key={item}
              href={
                filterableCategories.has(item)
                  ? `/${brand.slug}/shop?category=${encodeURIComponent(item)}`
                  : `/${brand.slug}/shop`
              }
              className="border-b border-transparent pb-1 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      {brand.slug === "balmain" ? (
        <BalmainFooter brandSlug={brand.slug} />
      ) : (
        <footer className="flex flex-wrap justify-between gap-6 border-t border-neutral-200 px-6 py-10 text-xs text-neutral-500 sm:px-11">
          <span>{t(`brands.${brand.slug as BrandSlug}.name`)}</span>
          <div className="flex flex-wrap gap-6">
            <a href="#">{t("footer.shipping")}</a>
            <a href="#">{t("footer.returns")}</a>
            <a href="#">{t("footer.contact")}</a>
            <a href="#">{t("footer.privacy")}</a>
          </div>
          <span>{t("footer.localeCurrency")}</span>
        </footer>
      )}
    </div>
  );
}
