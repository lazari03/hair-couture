"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { getProduct } from "@/lib/data/shop";
import { formatMoney } from "@/lib/money";

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { lines, incLine, decLine, removeLine } = useCart();

  const rows = lines
    .map((line) => ({ line, product: getProduct(line.brand, line.productId) }))
    .filter((r): r is { line: typeof lines[number]; product: NonNullable<typeof r.product> } =>
      Boolean(r.product),
    );

  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.line.qty, 0);
  const totalQty = rows.reduce((sum, r) => sum + r.line.qty, 0);

  return (
    <main className="px-6 pb-24 sm:px-11">
      <h1 className="m-0 pt-11 pb-2 text-4xl font-light tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mb-7 text-[13px] text-neutral-500">{t("itemCount", { count: totalQty })}</p>

      <div className="grid grid-cols-1 items-start gap-8 sm:gap-14 md:grid-cols-[1fr_360px]">
        <div className="border-t border-neutral-200">
          {rows.map(({ line, product }) => (
            <div
              key={line.id}
              className="grid grid-cols-[96px_1fr_auto] items-start gap-5 border-b border-neutral-200 py-6"
            >
              <div className="flex aspect-[3/4] items-center justify-center bg-neutral-100 p-1.5 text-center text-[9px] tracking-wide text-neutral-400 uppercase">
                {product.name}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] tracking-widest text-neutral-500 uppercase">
                  {product.category}
                </span>
                <span className="text-[15px] font-medium tracking-tight">{product.name}</span>
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
                {formatMoney(product.price * line.qty, locale)}
              </span>
            </div>
          ))}

          {rows.length === 0 && (
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
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">{t("subtotal")}</span>
            <span>{formatMoney(subtotal, locale)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">{t("shipping")}</span>
            <span>{t("shippingFree")}</span>
          </div>
          <div className="mt-1.5 flex justify-between border-t border-neutral-200 pt-3.5 text-lg">
            <span>{t("total")}</span>
            <span>{formatMoney(subtotal, locale)}</span>
          </div>
          <button className="mt-3.5 min-h-[52px] cursor-pointer border-none bg-[var(--brand-accent)] font-inherit text-xs tracking-widest text-white uppercase hover:opacity-90">
            {t("checkout")}
          </button>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500">{t("note")}</p>
        </aside>
      </div>
    </main>
  );
}
