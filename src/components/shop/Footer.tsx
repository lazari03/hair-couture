import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Brand } from "@/lib/brands";
import { getFooter } from "@/lib/data/footer";
import { NewsletterForm } from "./NewsletterForm";
import { ContactLinkTracker } from "./ContactLinkTracker";

// One reusable footer for all 3 brands (skills/branding.md: don't fork
// components per brand). Structure/columns are identical across brands;
// only content (links, newsletter copy) and the CSS vars set on the
// [brand]/layout.tsx root (--brand-accent etc.) differ. Replaces the old
// Balmain-only BalmainFooter.tsx and the separate inline fallback footer
// that the other two brands used to get.
export async function Footer({ brand }: { brand: Brand }) {
  const t = await getTranslations("footer");
  const tBrands = await getTranslations("brands");
  const content = getFooter(brand.slug);
  if (!content) return null;

  return (
    <footer className="bg-neutral-950 px-6 py-16 text-neutral-300 sm:px-11">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
        <div>
          <h3 className="mb-4 text-xs tracking-widest text-white uppercase">{t("shopTitle")}</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {content.shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs tracking-widest text-white uppercase">{t("serviceTitle")}</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {content.serviceLinks.map((link) =>
              link.label === "Contact" ? (
                <li key={link.href}>
                  <ContactLinkTracker brand={brand.slug} href={link.href} label={link.label} />
                </li>
              ) : (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs tracking-widest text-white uppercase">{tBrands(`${brand.slug}.name`)}</h3>
          <p className="text-sm text-neutral-400">{tBrands(`${brand.slug}.tagline`)}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h3 className="mb-4 text-xs tracking-widest text-white uppercase">{content.newsletter.title}</h3>
          <p className="mb-4 text-sm text-neutral-400">{content.newsletter.body}</p>
          <NewsletterForm brand={brand.slug} placeholder={content.newsletter.placeholder} cta={content.newsletter.cta} />
        </div>
      </div>
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800 pt-7 text-xs text-neutral-500">
        <span>{t("copyright", { year: new Date().getFullYear() })}</span>
        <span>{t("localeCurrency")}</span>
      </div>
    </footer>
  );
}
