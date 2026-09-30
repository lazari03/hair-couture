import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBrand, type BrandSlug } from "@/lib/brands";

interface FaqSection {
  title: string;
  items: { q: string; a: string }[];
}

// Per-brand product FAQ, adapted from each brand's own FAQ page. Only the
// product/brand questions: the brands' order, shipping and returns answers
// describe their own webshops, not this store — those live in /terms.
// Copy is in messages/<locale>.json under faq.brands.<slug>.
export default async function FaqPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: brandSlug } = await params;
  const brand = getBrand(brandSlug);
  if (!brand) notFound();
  const slug = brand.slug as BrandSlug;

  const t = await getTranslations("faq");
  const tBrands = await getTranslations("brands");
  const tLegal = await getTranslations("legal");
  const sections = t.raw(`brands.${slug}`) as FaqSection[];

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pt-14 pb-24 sm:px-11">
      <Link href={`/${slug}`} className="text-[13px] text-neutral-500 hover:underline">
        &larr; {tLegal("backToShop")}
      </Link>
      <h1 className="mt-6 text-3xl font-light tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{t("intro", { brand: tBrands(`${slug}.name`) })}</p>

      <div className="mt-12 flex flex-col gap-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-4 text-xs tracking-[0.2em] text-neutral-500 uppercase">{section.title}</h2>
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {section.items.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden className="text-xl leading-none font-light text-[var(--brand-accent)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-neutral-600">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-sm text-neutral-600">
        {t("orderNote")}{" "}
        <Link href={`/${slug}/terms`} className="underline hover:text-[var(--brand-accent)]">
          {t("orderLink")}
        </Link>
        .
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 bg-neutral-50 px-6 py-6">
        <span className="text-[15px] font-medium">{t("stillTitle")}</span>
        <Link
          href={`/${slug}/contact`}
          className="inline-flex min-h-11 items-center bg-[var(--brand-accent)] px-6 text-xs tracking-widest text-[var(--brand-accent-foreground)] uppercase hover:opacity-90"
        >
          {t("stillCta")}
        </Link>
      </div>
    </main>
  );
}
