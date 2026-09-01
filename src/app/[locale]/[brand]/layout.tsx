import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { brands, getBrand, type BrandSlug } from "@/lib/brands";

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
  if (!brand) notFound();

  const t = await getTranslations();

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
      <header className="flex items-center justify-between border-b px-6 py-4">
        <Link href="/" className="text-sm text-neutral-500 hover:underline">
          &larr; {t("nav.backToBrands")}
        </Link>
        <span className="font-semibold tracking-tight">
          {t(`brands.${brand.slug as BrandSlug}.name`)}
        </span>
        <nav className="flex items-center gap-4 text-sm">
          <Link href={`/${brand.slug}/cart`}>{t("nav.cart")}</Link>
          <Link href="/account">{t("nav.account")}</Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
