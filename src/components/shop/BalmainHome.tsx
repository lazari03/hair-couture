import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ShopContent } from "@/lib/data/shop";
import { Hero } from "./Hero";
import { ProductGrid } from "./ProductGrid";

// Mirrors balmainhair.com's homepage structure (fetched 2026-09-01, updated
// 2026-09-02): hero → "Popular right now" carousel → "New in" → "Explore the
// collections" (the 3 real shop categories, each a real filtered link — this
// replaced the old separate "Shop by category" section) → editorial brand
// story block.
export async function BalmainHome({ shop }: { shop: ShopContent }) {
  const t = await getTranslations();
  const bh = await getTranslations("balmainHome");

  // balmainhair.com reuses one generic banner across every /collections/*
  // page (verified 2026-09-02) — not usable as distinct category art. Used
  // each category's real flagship product photo from their own catalog
  // instead, downloaded to public/assets/products/balmain/collection-*.jpg.
  const collections = [
    { key: "hairCare", category: "Hair Care", image: "/assets/products/balmain/collection-hair-care.jpg" },
    { key: "hairAccessories", category: "Hair Accessories", image: "/assets/products/balmain/collection-hair-accessories.jpg" },
    { key: "stylingTools", category: "Styling Tools", image: "/assets/products/balmain/collection-styling-tools.jpg" },
  ] as const;

  return (
    <>
      <Hero brand={shop.slug} variant={shop.heroVariant} content={shop.hero} />

      <section className="px-6 py-14 sm:px-11 sm:py-24">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">{bh("popularTitle")}</h2>
          <Link
            href={`/${shop.slug}/shop`}
            className="border-b border-neutral-300 pb-1 text-xs tracking-widest whitespace-nowrap uppercase hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
          >
            {t("shop.viewAll")}
          </Link>
        </div>
        <ProductGrid brand={shop.slug} products={shop.products.slice(0, 4)} />
      </section>

      {shop.products.length > 4 && (
        <section className="px-6 py-14 sm:px-11 sm:py-24">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">{bh("trendingTitle")}</h2>
            <Link
              href={`/${shop.slug}/shop`}
              className="border-b border-neutral-300 pb-1 text-xs tracking-widest whitespace-nowrap uppercase hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
            >
              {t("shop.viewAll")}
            </Link>
          </div>
          <ProductGrid brand={shop.slug} products={shop.products.slice(4, 8)} />
        </section>
      )}

      <section className="px-6 py-14 sm:px-11 sm:py-24">
        <h2 className="mb-9 text-center text-2xl font-light tracking-tight sm:text-3xl">
          {bh("collectionsTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {collections.map((c) => (
            <Link
              key={c.key}
              href={`/${shop.slug}/shop?category=${encodeURIComponent(c.category)}`}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-neutral-900 text-white"
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover opacity-70 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="relative flex flex-col gap-1.5 p-6">
                <h3 className="text-lg font-light tracking-tight">{c.category}</h3>
                <p className="text-sm opacity-85">{bh(`collections.${c.key}.body`)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 items-stretch md:grid-cols-2">
        <div className="relative min-h-[360px]">
          <Image
            src={shop.hero.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-[#faf9f7] px-6 py-14 sm:px-11 sm:py-20">
          <span className="text-[11px] tracking-[0.22em] text-[var(--brand-accent)] uppercase">
            {bh("editorialEyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">{bh("editorialTitle")}</h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-neutral-600">
            {bh("editorialBody")}
          </p>
          <Link
            href={`/${shop.slug}/shop`}
            className="mt-6 inline-flex w-fit min-h-11 items-center border-b border-neutral-900 px-1 text-xs tracking-widest uppercase hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
          >
            {bh("editorialCta")}
          </Link>
        </div>
      </section>
    </>
  );
}
