import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getBrand } from "@/lib/brands";
import { getFooter } from "@/lib/data/footer";
import { ContactForm } from "@/components/shop/ContactForm";

export default async function ContactPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: brandSlug } = await params;
  const brand = getBrand(brandSlug);
  const footer = getFooter(brandSlug);
  if (!brand || !footer) notFound();

  const t = await getTranslations("contact");

  return (
    <main className="mx-auto max-w-2xl px-6 pt-14 pb-24 sm:px-11">
      <h1 className="text-3xl font-light tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{t("intro")}</p>
      <p className="mt-4 text-sm">
        {t("emailLabel")}:{" "}
        <a href={`mailto:${footer.contactEmail}`} className="underline hover:text-[var(--brand-accent)]">
          {footer.contactEmail}
        </a>
      </p>
      <ContactForm brand={brand.slug} />
    </main>
  );
}
