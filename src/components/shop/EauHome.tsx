import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBrand, type BrandSlug } from "@/lib/brands";
import type { ShopContent } from "@/lib/data/shop";
import { BannerLinkTracker } from "./BannerLinkTracker";
import { ProductCard } from "./ProductCard";

const pill = "inline-flex min-h-10 items-center justify-center rounded-full px-5 font-[family-name:var(--font-averia)] text-lg text-white transition-opacity hover:opacity-85";

// Mirrors eaude1974.com's homepage (checked 2026-09-30): video hero cut by an
// organic white curve holding "Awaken all your senses" → brand statement with
// the inline logo → product grid → one block per scent (photo banner with a
// portrait inset, then product photo + story + notes), each in the scent's
// own colour. Editorial photos are Eau de 1974's own, downloaded to
// public/assets/eau-de-1974/. "Explore the scent" searches the catalogue for
// the scent name, so it follows whatever products exist.
export async function EauHome({ shop }: { shop: ShopContent }) {
  const t = await getTranslations("eauHome");
  const tCategories = await getTranslations("categories");
  const tBrands = await getTranslations("brands");
  const logo = getBrand(shop.slug)?.logo;

  // `category` is the canonical menu value: translated for display, and the
  // search term (scent products carry it in their names, same as the menu).
  const scents = [
    { key: "capri", category: "EAU de Capri", color: "#f15a25", sideFocus: "object-[72%_20%]" },
    { key: "hamptons", category: "EAU de Hamptons", color: "#007367", sideFocus: "object-center" },
    { key: "santorini", category: "EAU de Santorini", color: "#00a9ce", sideFocus: "object-center" },
  ] as const;

  const awaken = (
    <>
      <h2 className="text-4xl leading-none sm:text-5xl lg:text-6xl">{t("awakenTitle")}</h2>
      <p className="mt-4 max-w-[36ch] text-base leading-relaxed sm:text-lg">{t("awakenBody")}</p>
      <BannerLinkTracker
        href={`/${shop.slug}/shop`}
        bannerId="hero_video"
        label={shop.hero.cta}
        brand={shop.slug}
        className={`${pill} mt-6 bg-[var(--brand-accent)]`}
      >
        {shop.hero.cta}
      </BannerLinkTracker>
    </>
  );

  return (
    <>
      <section className="relative h-[min(92vh,860px)] overflow-hidden bg-[var(--brand-accent)] md:h-[min(120vh,1100px)]">
        {shop.hero.video && (
          <video className="absolute inset-0 h-full w-full object-cover" src={shop.hero.video} autoPlay loop muted playsInline />
        )}
        <div className="absolute inset-0 bg-black/15" />
        <h1 className="absolute inset-x-6 top-[30%] text-center font-[family-name:var(--font-manrope)] text-5xl font-light tracking-tight text-white md:top-[22%] md:text-6xl">
          {shop.hero.title}
        </h1>
        {/* The organic white curve: a panel whose top-left corner is a full
            quarter-ellipse, so the copy inside always sits on white. Desktop
            only; mobile stacks the copy below. */}
        <div className="absolute right-0 bottom-0 hidden h-[62%] w-[66%] items-end justify-end rounded-tl-[100%_100%] bg-white pr-10 pb-[6%] md:flex lg:pr-16">
          <div className="flex max-w-sm flex-col items-end text-right">{awaken}</div>
        </div>
      </section>
      <section className="flex flex-col items-start px-6 py-12 md:hidden">{awaken}</section>

      <section className="px-6 py-16 text-center md:py-28">
        <h2 className="mx-auto max-w-4xl text-3xl leading-tight sm:text-5xl">
          {t("statementStart")}{" "}
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element -- static local SVG, no next/image benefit
            <img src={logo} alt={tBrands(`${shop.slug as BrandSlug}.name`)} className="inline-block h-[0.8em] w-auto align-baseline" />
          )}{" "}
          {t("statementEnd")}
        </h2>
      </section>

      {shop.products.length > 0 && (
        <section className="px-4 pb-16 sm:px-8 md:pb-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl">{t("shopTitle")}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {shop.products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} brand={shop.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {scents.map((s) => {
        const name = tCategories(s.category);
        const href = `/${shop.slug}/search?q=${encodeURIComponent(s.category)}`;
        return (
          <div key={s.key}>
            <section className="relative flex min-h-[520px] items-center overflow-hidden md:h-[796px]">
              <Image src={`/assets/eau-de-1974/${s.key}-bg.jpg`} alt="" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-black/25" />
              <div className="relative grid w-full grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-16">
                <div className="flex flex-col items-center text-center text-white">
                  <p className="font-[family-name:var(--font-averia)] text-2xl">{name}</p>
                  <h2 className="mt-3 max-w-[14ch] font-[family-name:var(--font-manrope)] text-4xl leading-tight font-light tracking-tight text-white md:text-6xl">
                    {t(`scents.${s.key}.tagline`)}
                  </h2>
                  <Link href={href} className={`${pill} mt-8`} style={{ backgroundColor: s.color }}>
                    {t("explore")}
                  </Link>
                </div>
                <div className="relative hidden aspect-[450/540] w-full max-w-[450px] overflow-hidden rounded-tl-[5rem] md:block">
                  <Image src={`/assets/eau-de-1974/${s.key}-side.jpg`} alt="" fill sizes="450px" className={`object-cover ${s.sideFocus}`} />
                </div>
              </div>
            </section>
            <section className="grid grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-24 md:px-16 md:py-24">
              <div className="relative aspect-[551/666] overflow-hidden rounded-2xl">
                <Image src={`/assets/eau-de-1974/${s.key}-product.jpg`} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="max-w-md">
                <h2 className="text-4xl sm:text-6xl" style={{ color: s.color }}>
                  {name}
                </h2>
                <p className="mt-6 text-base leading-relaxed sm:text-lg">{t(`scents.${s.key}.body`)}</p>
                <ul className="mt-6 flex flex-col gap-3 text-base sm:text-lg">
                  {(t.raw(`scents.${s.key}.notes`) as string[]).map((note) => (
                    <li key={note} className="flex items-center gap-3">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                      {note}
                    </li>
                  ))}
                </ul>
                <Link href={href} className={`${pill} mt-8`} style={{ backgroundColor: s.color }}>
                  {t("explore")}
                </Link>
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
}
