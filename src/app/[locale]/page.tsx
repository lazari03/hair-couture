import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { brands } from "@/lib/brands";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("landing");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function LandingPage() {
  const t = await getTranslations();

  return (
    <main className="flex flex-1 flex-col lg:flex-row">
      {brands.map((brand) => (
        <Link
          key={brand.slug}
          href={`/${brand.slug}`}
          data-brand={brand.slug}
          style={
            {
              "--brand-accent": brand.colors.accent,
              "--brand-accent-foreground": brand.colors.accentForeground,
            } as React.CSSProperties
          }
          className="group relative flex min-h-[33vh] flex-1 items-center justify-center overflow-hidden bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] transition-[flex-grow] duration-300 ease-out hover:flex-[1.15] motion-reduce:transition-none lg:h-screen lg:min-h-0"
        >
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t(`brands.${brand.slug}.name`)}
            </h2>
            <p className="text-sm opacity-80 sm:text-base">
              {t(`brands.${brand.slug}.tagline`)}
            </p>
            <span className="mt-2 rounded-full border border-current px-4 py-2 text-xs uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100">
              {t("landing.enter")}
            </span>
          </div>
        </Link>
      ))}
    </main>
  );
}
