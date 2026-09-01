// Currency is fixed to EUR for now (progress.md open decision: multi-currency
// not decided). Locale still drives digit grouping/symbol placement via Intl
// — the same primitive next-intl's useFormatter wraps — so this stays correct
// per-locale without needing a component/hook context to call it from.
export function formatMoney(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(amount);
}
