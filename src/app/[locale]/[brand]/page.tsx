import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getShop } from "@/lib/data/shop";
import { Hero } from "@/components/shop/Hero";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { BalmainHome } from "@/components/shop/BalmainHome";

export default async function BrandShopHome({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandSlug } = await params;
  const shop = await getShop(brandSlug);
  if (!shop) notFound();

  // Balmain gets its real homepage layout (skills/branding.md: brand
  // identity can differ per brand, this is a layout choice not a hardcoded
  // exception — Eloure/Eau de 1974 can get the same treatment the same way
  // once there's a reference layout for them).
  if (shop.slug === "balmain") return <BalmainHome shop={shop} />;

  const t = await getTranslations();

  return (
    <>
      <Hero brand={shop.slug} variant={shop.heroVariant} content={shop.hero} />
      <section className="px-6 py-14 sm:px-11 sm:py-24">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-[11px] tracking-[0.22em] text-[var(--brand-accent)] uppercase">
              {t("shop.featured")}
            </span>
            <h2 className="mt-2.5 text-2xl font-light tracking-tight sm:text-3xl">
              {t(`brands.${shop.slug}.tagline`)}
            </h2>
          </div>
          <Link
            href={`/${shop.slug}/shop`}
            className="border-b border-neutral-300 pb-1 text-xs tracking-widest whitespace-nowrap uppercase hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
          >
            {t("shop.viewAll")}
          </Link>
        </div>
        <ProductGrid brand={shop.slug} products={shop.products.slice(0, 4)} />
      </section>
    </>
  );
}
