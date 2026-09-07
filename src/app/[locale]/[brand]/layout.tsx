import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { brands, getBrand, type BrandSlug } from "@/lib/brands";
import { getShop } from "@/lib/data/shop";
import { CartCountBadge } from "@/components/shop/CartCountBadge";
import { BrandMobileMenu } from "@/components/shop/BrandMobileMenu";
import { Footer } from "@/components/shop/Footer";

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M3 5h2l2.1 9.1a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L20 8H7.1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="10" cy="19" r="1.25" fill="currentColor" />
      <circle cx="17" cy="19" r="1.25" fill="currentColor" />
    </svg>
  );
}

function IconActionLink({
  href,
  label,
  children,
  badge,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative inline-flex h-10 w-10 items-center justify-center text-neutral-700 transition-colors hover:text-[var(--brand-accent)]"
    >
      {children}
      {badge ? <span className="absolute -right-1 -top-1">{badge}</span> : null}
    </Link>
  );
}

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
  const activeBrand = brand;
  const activeShop = shop;

  const t = await getTranslations();
  // Nav items that match a real product category get the filter link; the
  // rest (Bestsellers, New, Gifts, ...) are curated views with no dedicated
  // category yet, so they just go to the unfiltered shop — same as the live
  // site's mega-menu mixing curated and category links.
  const filterableCategories = new Set(activeShop.products.flatMap((p) => p.categories));
  filterableCategories.add("Sale");

  function menuHref(item: string): string {
    return filterableCategories.has(item)
      ? `/${activeBrand.slug}/shop?category=${encodeURIComponent(item)}`
      : `/${activeBrand.slug}/shop`;
  }

  const mobileMenuLinks = activeShop.menu.map((item) => ({ label: item, href: menuHref(item) }));

  return (
    <div
      data-brand={activeBrand.slug}
      style={
        {
          "--brand-accent": activeBrand.colors.accent,
          "--brand-accent-foreground": activeBrand.colors.accentForeground,
        } as React.CSSProperties
      }
      className="flex flex-1 flex-col"
    >
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="relative flex items-center justify-between px-4 py-4 sm:px-6 lg:hidden">
          <Link href="/" className="text-[13px] whitespace-nowrap text-neutral-500 hover:underline">
            &larr; {t("nav.backToBrands")}
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, no next/image benefit */}
          <img
            src={activeBrand.logo}
            alt={t(`brands.${activeBrand.slug as BrandSlug}.name`)}
            className="absolute left-1/2 h-6 w-auto -translate-x-1/2 sm:h-7"
          />
          <div className="flex items-center gap-1.5">
            <IconActionLink href={`/${activeBrand.slug}/cart`} label={t("nav.cart")} badge={<CartCountBadge />}>
              <CartIcon />
            </IconActionLink>
            <BrandMobileMenu
              cartHref={`/${activeBrand.slug}/cart`}
              cartLabel={t("nav.cart")}
              searchHref={`/${activeBrand.slug}/search`}
              searchLabel={t("nav.search")}
              menuLinks={mobileMenuLinks}
            />
          </div>
        </div>
        <div className="hidden items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:flex lg:gap-4">
          <Link href="/" className="text-[13px] whitespace-nowrap text-neutral-500 hover:underline">
            &larr; {t("nav.backToBrands")}
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, no next/image benefit */}
          <img
            src={activeBrand.logo}
            alt={t(`brands.${activeBrand.slug as BrandSlug}.name`)}
            className="h-7 w-auto"
          />
          <nav className="flex items-center gap-5 text-[13px]">
            <IconActionLink href={`/${activeBrand.slug}/search`} label={t("nav.search")}>
              <SearchIcon />
            </IconActionLink>
            <IconActionLink href={`/${activeBrand.slug}/cart`} label={t("nav.cart")} badge={<CartCountBadge />}>
              <CartIcon />
            </IconActionLink>
          </nav>
        </div>
        <nav className="hidden flex-wrap justify-center gap-6 px-6 pb-3.5 text-xs tracking-[0.14em] text-neutral-600 uppercase lg:flex lg:gap-8">
          {activeShop.menu.map((item) => (
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
      <Footer brand={activeBrand} />
    </div>
  );
}
