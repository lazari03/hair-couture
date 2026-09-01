import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { BrandSlug } from "@/lib/brands";

// Mirrors balmainhair.com's real footer (fetched 2026-09-02): black
// background, Shop/Service/Balmain Hair link columns, newsletter signup,
// copyright. The per-column links are mostly editorial (FAQ, Heritage,
// Stockist, legal pages) — we don't have real pages behind them yet, so
// they point at the shop rather than a 404 or a fake page. The newsletter
// form has no backend wired up (progress.md open decision), so it's
// presentational only — a plain button, no fake "subscribed!" state.
export async function BalmainFooter({ brandSlug }: { brandSlug: BrandSlug }) {
  const t = await getTranslations("balmainFooter");
  const shopLinks = Object.values(t.raw("shopLinks")) as string[];
  const serviceLinks = Object.values(t.raw("serviceLinks")) as string[];
  const brandLinks = Object.values(t.raw("brandLinks")) as string[];

  return (
    <footer className="bg-neutral-950 px-6 py-16 text-neutral-300 sm:px-11">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
        <div>
          <h3 className="mb-4 text-xs tracking-widest text-white uppercase">{t("shopTitle")}</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {shopLinks.map((label) => (
              <li key={label}>
                <Link href={`/${brandSlug}/shop`} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs tracking-widest text-white uppercase">{t("serviceTitle")}</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {serviceLinks.map((label) => (
              <li key={label}>
                <a href="#" className="hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs tracking-widest text-white uppercase">{t("brandTitle")}</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {brandLinks.map((label) => (
              <li key={label}>
                <a href="#" className="hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h3 className="mb-4 text-xs tracking-widest text-white uppercase">{t("newsletterTitle")}</h3>
          <p className="mb-4 text-sm text-neutral-400">{t("newsletterBody")}</p>
          <div className="flex border-b border-neutral-600 focus-within:border-white">
            <input
              type="email"
              placeholder={t("newsletterPlaceholder")}
              className="min-h-11 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
            <button
              type="button"
              className="shrink-0 text-xs tracking-widest text-white uppercase hover:opacity-70"
            >
              {t("newsletterCta")}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800 pt-7 text-xs text-neutral-500">
        <span>{t("copyright", { year: new Date().getFullYear() })}</span>
        <span>EN · € EUR</span>
      </div>
    </footer>
  );
}
