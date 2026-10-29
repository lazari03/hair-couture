// All prices are in Albanian Lek (ALL): product prices, coupons (fixed),
// shipping fees and order totals. Lek has no minor unit in practice, so
// amounts are rounded to whole lek and grouped with "." — "2.500 ALL" —
// the same in every UI language, so it's done by hand rather than via
// Intl (whose grouping/symbol placement differs per locale).
export function formatMoney(amount: number): string {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? "-" : "";
  const digits = String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${sign}${digits} ALL`;
}
