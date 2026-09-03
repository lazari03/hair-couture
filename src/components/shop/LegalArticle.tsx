import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { LegalDoc } from "@/lib/data/legal";
import type { BrandSlug } from "@/lib/brands";

// Shared layout for the 3 legal pages (privacy/terms/cookies) — avoids
// duplicating the title/date/back-link chrome 3x.
export async function LegalArticle({ brand, doc }: { brand: BrandSlug; doc: LegalDoc }) {
  const t = await getTranslations("legal");

  return (
    <main className="mx-auto max-w-2xl px-6 pt-14 pb-24 sm:px-11">
      <Link href={`/${brand}`} className="text-[13px] text-neutral-500 hover:underline">
        &larr; {t("backToShop")}
      </Link>
      <h1 className="mt-6 text-3xl font-light tracking-tight sm:text-4xl">{doc.title}</h1>
      <p className="mt-2 text-xs text-neutral-500">{t("lastUpdated", { date: doc.updated })}</p>
      <div className="mt-10 flex flex-col gap-8">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-2 text-sm font-medium tracking-wide">{section.heading}</h2>
            <p className="text-sm leading-relaxed text-neutral-600">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
