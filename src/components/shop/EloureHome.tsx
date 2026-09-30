import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ShopContent } from "@/lib/data/shop";
import { BannerLinkTracker } from "./BannerLinkTracker";
import { ProductCard } from "./ProductCard";

const btn = "inline-flex min-h-12 items-center justify-center px-10 text-xs tracking-[0.18em] uppercase transition-opacity hover:opacity-85";
const underline = "mt-6 inline-block border-b border-current pb-1 text-xs tracking-widest uppercase hover:opacity-70";

// Mirrors maisoneloure.com's homepage (checked 2026-09-30): hero with the
// copy on the right → category cards → "The signature range" 3-up grid →
// full-bleed Elora scent banner → "What defines Éloure" pillars → editorial
// split. Blue ink and Archivo Expanded display type come from the
// .brand-shop[data-brand="eloure"] skin in globals.css. Editorial images are
// Éloure's own, downloaded to public/assets/eloure/.
export async function EloureHome({ shop }: { shop: ShopContent }) {
  const eh = await getTranslations("eloureHome");
  const tCategories = await getTranslations("categories");
  const shopHref = `/${shop.slug}/shop`;

  // `category` is the canonical Product.category value (href/filter key).
  const collections = [
    { category: "Care Collection", image: "/assets/eloure/care.jpg" },
    { category: "Styling Collection", image: "/assets/eloure/styling.jpg" },
    { category: "Treatments & Sets", image: "/assets/eloure/treatments.jpg" },
  ];
  const pillars = [
    { key: "skincare", image: "/assets/eloure/pillar-skincare.jpg" },
    { key: "fragrance", image: "/assets/eloure/pillar-fragrance.png" },
    { key: "salon", image: "/assets/eloure/pillar-salon.jpg" },
  ] as const;

  return (
    <>
      <section className="relative h-[min(82vh,760px)] overflow-hidden bg-[var(--brand-accent)]">
        <Image src={shop.hero.image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent md:bg-black/20" />
        <div className="relative flex h-full flex-col items-center justify-end px-6 pb-14 text-center text-white md:items-end md:justify-center md:pr-16 md:pb-0 lg:pr-28">
          <div className="flex max-w-md flex-col items-center">
            <h1 className="font-display text-2xl leading-tight sm:text-3xl">{shop.hero.title}</h1>
            <p className="mt-4 max-w-[40ch] text-base leading-relaxed">{shop.hero.body}</p>
            <BannerLinkTracker
              href={shopHref}
              bannerId="hero_full"
              label={shop.hero.cta}
              brand={shop.slug}
              className={`${btn} mt-8 bg-white text-[var(--brand-accent)] md:bg-[var(--brand-accent)] md:text-white`}
            >
              {shop.hero.cta}
            </BannerLinkTracker>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto mb-10 max-w-md px-6 text-center">
          <h2 className="text-2xl uppercase sm:text-3xl">{eh("collectionsTitle")}</h2>
          <p className="mt-3 text-sm leading-relaxed">{eh("collectionsBody")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {collections.map((c) => (
            <Link
              key={c.category}
              href={`${shopHref}?category=${encodeURIComponent(c.category)}`}
              className="group relative flex h-[440px] flex-col items-center justify-end overflow-hidden p-5 text-white md:h-[600px]"
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="relative flex w-full flex-col items-center gap-6 text-center">
                <h3 className="font-display text-base sm:text-lg">{tCategories(c.category)}</h3>
                <span className={`${btn} w-full bg-white text-[var(--brand-accent)] md:translate-y-2 md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100`}>
                  {eh("explore")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {shop.products.length > 0 && (
        <section className="px-4 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto mb-10 max-w-md text-center">
            <h2 className="text-2xl uppercase sm:text-3xl">{eh("rangeTitle")}</h2>
            <p className="mt-3 text-sm">{eh("rangeBody")}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
            {shop.products.slice(0, 6).map((p) => (
              <ProductCard key={p.id} brand={shop.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="relative flex min-h-[560px] items-end overflow-hidden text-white md:min-h-[900px] md:items-center">
        <Image src="/assets/eloure/elora.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_42%]" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-md px-6 pb-10 md:px-16 md:pb-0">
          <p className="text-xs tracking-widest uppercase">{eh("scentEyebrow")}</p>
          <h2 className="mt-4 font-display text-xl">{eh("scentTitle")}</h2>
          <p className="mt-4 text-sm leading-relaxed">{eh("scentBody")}</p>
          <Link href={shopHref} className={underline}>
            {eh("scentCta")}
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 md:py-24">
        <h2 className="mb-10 text-center text-2xl uppercase sm:text-3xl md:mb-14">{eh("pillarsTitle")}</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.key}>
              <div className="relative mb-6 aspect-[3/4] overflow-hidden">
                <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <h3 className="text-xl uppercase sm:text-2xl">{eh(`pillars.${p.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed">{eh(`pillars.${p.key}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto md:min-h-[600px]">
          <Image src="/assets/eloure/world.jpg" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 py-12 text-center md:px-16 lg:px-24">
          <div className="mx-auto max-w-[450px]">
            <h2 className="font-display text-xl sm:text-2xl">{eh("worldTitle")}</h2>
            <p className="mt-4 text-sm leading-relaxed">{eh("worldBody")}</p>
            <Link href={shopHref} className={underline}>
              {eh("worldCta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
