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

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { brand } = useParams<{ brand: string }>();
  const { lines, incLine, decLine, removeLine, coupon, setCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

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
      setCouponError(result.error);
      return;
    }
    setCoupon({ code: result.code, type: result.type, value: result.value });
    setCouponInput("");
  }

  return (
    <main className="px-6 pb-24 sm:px-11">
      <h1 className="m-0 pt-11 pb-2 text-4xl font-light tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mb-7 text-[13px] text-neutral-500">{t("itemCount", { count: totalQty })}</p>

      <div className="grid grid-cols-1 items-start gap-8 sm:gap-14 md:grid-cols-[1fr_360px]">
        <div className="border-t border-neutral-200">
          {lines.map((line) => (
            <div
              key={line.id}
              className="grid grid-cols-[96px_1fr_auto] items-start gap-5 border-b border-neutral-200 py-6"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50">
                <Image
                  src={productImage(line)}
                  alt={line.name}
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] tracking-widest text-neutral-500 uppercase">
                  {line.category}
                </span>
                <span className="text-[15px] font-medium tracking-tight">{line.name}</span>
                <span className="text-[13px] text-neutral-500">{line.variant}</span>
                <div className="mt-2.5 flex items-center gap-4">
                  <div className="flex items-center border border-neutral-300">
                    <button
                      onClick={() => decLine(line.id)}
                      className="h-9 w-9 border-none bg-none font-inherit text-[15px]"
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span className="min-w-7 text-center text-[13px]">{line.qty}</span>
                    <button
                      onClick={() => incLine(line.id)}
                      className="h-9 w-9 border-none bg-none font-inherit text-[15px]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeLine(line.id)}
                    className="border-none bg-none py-2 font-inherit text-xs tracking-wide text-neutral-500 uppercase hover:text-[var(--brand-accent)]"
                  >
                    {t("remove")}
                  </button>
                </div>
              </div>
              <span className="text-[15px] whitespace-nowrap">
                {formatMoney(line.price * line.qty, locale)}
              </span>
            </div>
          ))}

          {lines.length === 0 && (
            <div className="py-16 text-center">
              <h2 className="m-0 text-xl font-light">{t("emptyTitle")}</h2>
              <p className="mt-3 mb-6 text-sm text-neutral-500">{t("emptyBody")}</p>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center border border-neutral-900 px-6 text-xs tracking-widest uppercase hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white"
              >
                {t("continueShopping")}
              </Link>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-3.5 bg-[#faf9f7] p-7">
          <h2 className="m-0 mb-1.5 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
            {t("subtotal")}
          </h2>

          {coupon ? (
            <div className="flex items-center justify-between border border-neutral-300 bg-white px-3 py-2 text-sm">
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
                  className="min-h-11 flex-1 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={applying || !couponInput.trim()}
                  className="min-h-11 shrink-0 border border-neutral-900 px-4 text-xs tracking-widest uppercase hover:bg-neutral-900 hover:text-white disabled:opacity-40"
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
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">{t("shipping")}</span>
            <span>{t("shippingFree")}</span>
          </div>
          <div className="mt-1.5 flex justify-between border-t border-neutral-200 pt-3.5 text-lg">
            <span>{t("total")}</span>
            <span>{formatMoney(total, locale)}</span>
          </div>
          <Link
            href={`/${brand}/checkout`}
            className={`mt-3.5 flex min-h-[52px] items-center justify-center bg-[var(--brand-accent)] font-inherit text-xs tracking-widest text-white uppercase hover:opacity-90 ${
              lines.length === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            {t("checkout")}
          </Link>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500">{t("note")}</p>
        </aside>
      </div>
    </main>
  );
}
