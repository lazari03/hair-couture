import { getLocale, getTranslations } from "next-intl/server";
import { mockAccount } from "@/lib/data/shop";
import { formatMoney } from "@/lib/money";

// ponytail: static mock account — real orders/details/addresses need
// Auth.js wired first (skills/auth.md, progress.md next-up). Shape mirrors
// what the session-backed version will return, so only the data source
// changes here later, not this page.
export default async function AccountPage() {
  const t = await getTranslations("account");
  const locale = await getLocale();
  const navItems = [
    t("nav.orders"),
    t("nav.details"),
    t("nav.addresses"),
    t("nav.wishlist"),
    t("nav.signOut"),
  ];

  return (
    <main className="px-6 pb-24 sm:px-11">
      <div className="border-b border-neutral-200 pt-11 pb-7">
        <span className="text-[11px] tracking-[0.2em] text-[var(--brand-accent)] uppercase">
          {t("greeting")}
        </span>
        <h1 className="mt-3 mb-1.5 text-4xl font-light tracking-tight sm:text-5xl">
          {mockAccount.user.name}
        </h1>
        <p className="m-0 text-[13px] text-neutral-500">
          {mockAccount.user.email} &middot; {mockAccount.user.since}
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 pt-9 sm:gap-14 md:grid-cols-[200px_1fr]">
        <nav className="flex flex-col">
          {navItems.map((label, i) => (
            <span
              key={label}
              className={`border-b border-neutral-100 py-2.5 text-[13px] ${
                i === 0 ? "font-medium text-neutral-900" : "text-neutral-500"
              }`}
            >
              {label}
            </span>
          ))}
        </nav>

        <div className="flex flex-col gap-12">
          <section>
            <h2 className="mb-4.5 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("ordersTitle")}
            </h2>
            <div className="border-t border-neutral-200">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_auto] gap-4 border-b border-neutral-200 py-3 text-[10px] tracking-widest text-neutral-400 uppercase">
                <span>{t("orderColumns.order")}</span>
                <span>{t("orderColumns.date")}</span>
                <span>{t("orderColumns.status")}</span>
                <span>{t("orderColumns.total")}</span>
              </div>
              {mockAccount.orders.map((o) => (
                <div
                  key={o.id}
                  className="grid grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-4 border-b border-neutral-200 py-4.5 text-sm"
                >
                  <span className="font-medium">{o.id}</span>
                  <span className="text-neutral-600">{o.date}</span>
                  <span
                    className={o.status === "Refunded" ? "text-neutral-400" : "text-emerald-700"}
                  >
                    {o.status}
                  </span>
                  <span>{formatMoney(o.total, locale)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="bg-[#faf9f7] p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="m-0 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
                  {t("detailsTitle")}
                </h2>
                <button className="border-b border-neutral-300 pb-0.5 text-xs tracking-wide uppercase hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]">
                  {t("edit")}
                </button>
              </div>
              <div className="mt-4.5 flex flex-col gap-3">
                {mockAccount.fields.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 text-sm">
                    <span className="text-neutral-500">{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#faf9f7] p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="m-0 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
                  {t("addressTitle")}
                </h2>
                <button className="border-b border-neutral-300 pb-0.5 text-xs tracking-wide uppercase hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]">
                  {t("edit")}
                </button>
              </div>
              <div className="mt-4.5 flex flex-col gap-1.5 text-sm text-neutral-600">
                {mockAccount.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
