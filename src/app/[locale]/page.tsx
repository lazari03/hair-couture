import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { brands } from "@/lib/brands";
import { getShop } from "@/lib/data/shop";
import { BrandPanelLink } from "@/components/BrandPanelLink";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("landing");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function LandingPage() {
  const t = await getTranslations();
  const shops = await Promise.all(brands.map((b) => getShop(b.slug)));

  return (
    <main className="flex flex-1 flex-col lg:flex-row">
      {brands.map((brand, i) => {
        const shop = shops[i];
        return (
          <BrandPanelLink
            key={brand.slug}
            brand={brand.slug}
            href={`/${brand.slug}`}
            style={
              {
                "--brand-accent": brand.colors.accent,
                "--brand-accent-foreground": brand.colors.accentForeground,
              } as React.CSSProperties
            }
            className="group relative flex min-h-[33vh] flex-1 items-center justify-center overflow-hidden bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] transition-[flex-grow] duration-300 ease-out hover:flex-[1.15] motion-reduce:transition-none lg:h-screen lg:min-h-0"
          >
            {shop?.hero.video ? (
              <>
                <video
                  className="absolute inset-0 hidden h-full w-full object-cover motion-safe:block"
                  src={shop.hero.video}
                  poster={shop.hero.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <Image
                  src={shop.hero.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="absolute inset-0 hidden object-cover motion-reduce:block"
                />
              </>
            ) : shop ? (
              <Image
                src={shop.hero.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="absolute inset-0 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-[var(--brand-accent)]/55 transition-colors duration-300 group-hover:bg-[var(--brand-accent)]/40" />

            <div className="relative flex flex-col items-center gap-3 px-6 text-center">
              <h2 className="sr-only">{t(`brands.${brand.slug}.name`)}</h2>
              {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, no next/image benefit */}
              <img
                src={brand.logo}
                alt=""
                className="h-8 w-auto brightness-0 invert sm:h-10"
              />
              <p className="text-sm opacity-80 sm:text-base">
                {t(`brands.${brand.slug}.tagline`)}
              </p>
              <span className="mt-2 rounded-full border border-current px-4 py-2 text-xs uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100">
                {t("landing.enter")}
              </span>
            </div>
          </BrandPanelLink>
        );
      })}
    </main>
  );
}
