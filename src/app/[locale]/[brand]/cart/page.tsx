"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { productImage } from "@/lib/data/category-image";
import { formatMoney } from "@/lib/money";
import { validateCoupon } from "@/lib/actions/orders";
import { trackCheckoutButtonClick } from "@/lib/analytics/events";
import type { BrandSlug } from "@/lib/brands";

export default function CartPage() {
  const t = useTranslations("cart");
  const tErrors = useTranslations("errors");
  const locale = useLocale();
  const { brand } = useParams<{ brand: string }>();
  const { lines, incLine, decLine, removeLine, coupon, setCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [lineErrors, setLineErrors] = useState<Record<string, string>>({});

  async function handleInc(id: string) {
    setLineErrors((prev) => ({ ...prev, [id]: "" }));
    const result = await incLine(id);
    if (!result.ok) {
      setLineErrors((prev) => ({ ...prev, [id]: tErrors(result.error, { count: result.count ?? 0 }) }));
    }
  }

  // Product name/category/price are already on the line (snapshotted at
  // add-time, see cart-context.tsx) — no DB lookup needed here.
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const totalQty = lines.reduce((sum, l) => sum + l.qty, 0);
  const discount = coupon
    ? coupon.type === "percent"
      ? subtotal * (coupon.value / 100)
      : Math.min(coupon.value, subtotal)
    : 0;
  const total = Math.max(0, subtotal - discount);

  async function applyCoupon() {
    setApplying(true);
    setCouponError(null);
    const result = await validateCoupon(couponInput);
    setApplying(false);
    if (!result.ok) {
      setCouponError(tErrors(result.error));
      return;
    }
    setCoupon({ code: result.code, type: result.type, value: result.value });
    setCouponInput("");
  }

  return (
    <main className="px-4 pb-24 sm:px-6 lg:px-11">
      <div className="mx-auto max-w-6xl">
      <h1 className="m-0 pt-12 pb-2 font-display text-5xl font-light tracking-tight sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mb-8 text-[13px] tracking-wide text-neutral-500">{t("itemCount", { count: totalQty })}</p>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_380px] lg:gap-14">
        <div className="border-t border-[var(--hairline)]">
          {lines.map((line) => (
            <div
              key={line.id}
              className="grid grid-cols-[96px_1fr_auto] items-start gap-5 border-b border-[var(--hairline)] py-6 sm:grid-cols-[112px_1fr_auto]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
                <Image
                  src={productImage(line)}
                  alt={line.name}
                  fill
                  sizes="96px"
                  className="object-contain p-2 mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                  {line.category}
                </span>
                <span className="font-display text-xl leading-snug">{line.name}</span>
                <span className="text-[13px] text-neutral-500">{line.variant}</span>
                <div className="mt-2.5 flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-neutral-900/15">
                    <button
                      onClick={() => decLine(line.id)}
                      className="h-9 w-9 cursor-pointer rounded-full border-none bg-none font-inherit text-[15px] transition-colors hover:bg-neutral-100"
                      aria-label={t("decreaseQty")}
                    >
                      &minus;
                    </button>
                    <span className="min-w-7 text-center text-[13px] tabular-nums">{line.qty}</span>
                    <button
                      onClick={() => handleInc(line.id)}
                      className="h-9 w-9 cursor-pointer rounded-full border-none bg-none font-inherit text-[15px] transition-colors hover:bg-neutral-100"
                      aria-label={t("increaseQty")}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeLine(line.id)}
                    className="cursor-pointer border-none bg-none py-2 font-inherit text-[11px] tracking-[0.16em] text-neutral-500 uppercase underline-offset-4 hover:text-[var(--brand-accent)] hover:underline"
                  >
                    {t("remove")}
                  </button>
                </div>
                {lineErrors[line.id] && (
                  <p className="text-xs text-red-600">{lineErrors[line.id]}</p>
                )}
              </div>
              <span className="text-[15px] whitespace-nowrap tabular-nums">
                {formatMoney(line.price * line.qty, locale)}
              </span>
            </div>
          ))}

          {lines.length === 0 && (
            <div className="py-16 text-center">
              <h2 className="m-0 font-display text-3xl font-light">{t("emptyTitle")}</h2>
              <p className="mt-3 mb-6 text-sm text-neutral-500">{t("emptyBody")}</p>
              <Link
                href={`/${brand}/shop`}
                className="btn-pill border border-neutral-900 hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-[var(--brand-accent-foreground)]"
              >
                {t("continueShopping")}
              </Link>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-4 rounded-[1.75rem] border border-[var(--hairline)] bg-[var(--surface-muted)] p-6 sm:p-8 md:sticky md:top-32">
          <h2 className="m-0 mb-1.5 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
            {t("summaryTitle")}
          </h2>

          {coupon ? (
            <div className="flex items-center justify-between rounded-full border border-neutral-900/10 bg-white px-4 py-2.5 text-sm">
              <span>
                {t("couponApplied", { code: coupon.code })}
              </span>
              <button
                type="button"
                onClick={() => setCoupon(null)}
                className="cursor-pointer text-xs text-neutral-500 uppercase hover:text-[var(--brand-accent)]"
              >
                {t("remove")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder={t("couponPlaceholder")}
                  className="field-input flex-1 rounded-full"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={applying || !couponInput.trim()}
                  className="btn-pill shrink-0 cursor-pointer border border-neutral-900 px-5 hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("couponApply")}
                </button>
              </div>
              {couponError && <p className="text-xs text-red-600">{couponError}</p>}
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">{t("subtotal")}</span>
            <span>{formatMoney(subtotal, locale)}</span>
          </div>
          {coupon && (
            <div className="flex justify-between text-sm text-emerald-700">
              <span>{t("discount")}</span>
              <span>-{formatMoney(discount, locale)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">{t("shipping")}</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium tracking-wide text-emerald-700">
              {t("shippingFree")}
            </span>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between border-t border-[var(--hairline)] pt-4">
            <span className="text-sm tracking-wide">{t("total")}</span>
            <span className="font-display text-3xl tabular-nums">{formatMoney(total, locale)}</span>
          </div>
          <Link
            href={`/${brand}/checkout`}
            onClick={() => trackCheckoutButtonClick(brand as BrandSlug)}
            className={`btn-pill mt-2 min-h-14 w-full bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] ${
              lines.length === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            {t("checkout")}
          </Link>
          <p className="mt-1 text-center text-xs leading-relaxed text-neutral-500">{t("note")}</p>
        </aside>
      </div>
      </div>
    </main>
  );
}
