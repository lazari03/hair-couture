import { getLocale, getTranslations } from "next-intl/server";
import { getOrdersByEmail } from "@/lib/actions/orders";
import { formatMoney } from "@/lib/money";

// No customer login (skills/auth.md: single-admin auth only) — orders are
// guest checkout, keyed by email. This is a lookup, not an account: type the
// email you checked out with, see your real orders for this brand. Replace
// with a session-backed version once customer auth exists.
const STATUS_KEY: Record<string, string> = {
  pending: "pending",
  in_progress: "inProgress",
  fulfilled: "fulfilled",
};

export default async function AccountPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { brand } = await params;
  const { email } = await searchParams;
  const t = await getTranslations("account");
  const locale = await getLocale();
  const orders = email ? await getOrdersByEmail(email, brand) : [];

  return (
    <main className="px-6 pb-24 sm:px-11">
      <div className="border-b border-neutral-200 pt-11 pb-7">
        <span className="text-[11px] tracking-[0.2em] text-[var(--brand-accent)] uppercase">
          {t("greeting")}
        </span>
        <h1 className="mt-3 mb-1.5 text-4xl font-light tracking-tight sm:text-5xl">
          {t("ordersTitle")}
        </h1>
        <p className="m-0 text-[13px] text-neutral-500">{t("lookupHint")}</p>
      </div>

      <form method="get" className="mt-8 flex max-w-md gap-2">
        <input
          type="email"
          name="email"
          required
          defaultValue={email}
          placeholder={t("emailPlaceholder")}
          className="min-h-11 flex-1 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
        <button
          type="submit"
          className="min-h-11 shrink-0 border border-neutral-900 px-5 text-xs tracking-widest uppercase hover:bg-neutral-900 hover:text-white"
        >
          {t("lookup")}
        </button>
      </form>

      {email && (
        <section className="mt-10">
          {orders.length === 0 ? (
            <p className="text-sm text-neutral-500">{t("noOrders")}</p>
          ) : (
            <div className="border-t border-neutral-200">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_auto] gap-4 border-b border-neutral-200 py-3 text-[10px] tracking-widest text-neutral-400 uppercase">
                <span>{t("orderColumns.order")}</span>
                <span>{t("orderColumns.date")}</span>
                <span>{t("orderColumns.status")}</span>
                <span>{t("orderColumns.total")}</span>
              </div>
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="grid grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-4 border-b border-neutral-200 py-4.5 text-sm"
                >
                  <span className="font-medium">{o.id}</span>
                  <span className="text-neutral-600">
                    {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(o.createdAt)}
                  </span>
                  <span className={o.status === "fulfilled" ? "text-emerald-700" : "text-neutral-500"}>
                    {t(`orderStatus.${STATUS_KEY[o.status] ?? "pending"}`)}
                  </span>
                  <span>{formatMoney(o.total, locale)}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
