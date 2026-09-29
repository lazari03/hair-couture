"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { productImage } from "@/lib/data/category-image";
import { formatMoney } from "@/lib/money";
import { createOrder } from "@/lib/actions/orders";
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics/events";
import type { BrandSlug } from "@/lib/brands";
import Image from "next/image";

type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "address"
  | "city"
  | "postalCode";

function Field({
  label,
  children,
  fullWidth = false,
  required = true,
}: {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  required?: boolean;
}) {
  return (
    <label className={fullWidth ? "col-span-2 flex flex-col gap-1.5" : "flex flex-col gap-1.5"}>
      <span className="text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
        {label} {required && <span className="text-[var(--brand-accent)]">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
  const tErrors = useTranslations("errors");
  const locale = useLocale();
  const { brand } = useParams<{ brand: string }>();
  const { lines, coupon, clearCart } = useCart();

  const [form, setForm] = useState<Record<FieldName, string>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const beganCheckoutTracked = useRef(false);

  useEffect(() => {
    if (lines.length > 0 && !beganCheckoutTracked.current) {
      beganCheckoutTracked.current = true;
      trackBeginCheckout(
        lines.map((l) => ({ productId: l.productId, name: l.name, category: l.category, price: l.price, qty: l.qty })),
        brand as BrandSlug,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per mount with a non-empty cart, not on every line change
  }, []);

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const discount = coupon
    ? coupon.type === "percent"
      ? subtotal * (coupon.value / 100)
      : Math.min(coupon.value, subtotal)
    : 0;
  const total = Math.max(0, subtotal - discount);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await createOrder({
      brand,
      ...form,
      couponCode: coupon?.code,
      lines: lines.map((l) => ({
        productId: l.productId,
        name: l.name,
        variant: l.variant,
        price: l.price,
        qty: l.qty,
      })),
    });

    setSubmitting(false);
    if (!result.ok) {
      setError(tErrors(result.error));
      return;
    }
    trackPurchase(
      result.orderId,
      lines.map((l) => ({ productId: l.productId, name: l.name, category: l.category, price: l.price, qty: l.qty })),
      total,
      brand as BrandSlug,
    );
    setOrderId(result.orderId);
    clearCart();
  }

  if (orderId) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <div className="w-full rounded-[1.75rem] border border-[var(--hairline)] bg-white px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10">
          <h1 className="font-display text-4xl font-light tracking-tight">{t("successTitle")}</h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {t("successBody", { orderId, email: form.email })}
          </p>
          <Link
            href={`/${brand}`}
            className="btn-pill mt-8 border border-neutral-900 hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-[var(--brand-accent-foreground)]"
          >
            {t("backToShop")}
          </Link>
        </div>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <div className="w-full rounded-[1.75rem] border border-[var(--hairline)] bg-white px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10">
          <h1 className="font-display text-3xl font-light">{tCart("emptyTitle")}</h1>
          <p className="mt-3 mb-6 text-sm text-neutral-500">{tCart("emptyBody")}</p>
          <Link
            href={`/${brand}`}
            className="btn-pill border border-neutral-900 hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-[var(--brand-accent-foreground)]"
          >
            {tCart("continueShopping")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 pb-16 pt-6 sm:px-6 lg:px-10 xl:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8">
          <span className="text-[11px] tracking-[0.22em] text-[var(--brand-accent)] uppercase">
            {t("summaryTitle")}
          </span>
          <h1 className="font-display text-5xl font-light tracking-tight sm:text-6xl">{t("title")}</h1>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-[var(--hairline)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-7"
          >
            <div className="grid grid-cols-1 gap-6 sm:gap-7">
              <section className="grid gap-4">
                <h2 className="text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
                  {t("contactTitle")}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label={t("email")}>
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder={t("email")}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="field-input"
                    />
                  </Field>
                  <Field label={t("phone")}>
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      placeholder={t("phone")}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="field-input"
                    />
                  </Field>
                </div>
              </section>

              <section className="grid gap-4">
                <h2 className="text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
                  {t("shippingTitle")}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label={t("firstName")}>
                    <input
                      required
                      autoComplete="given-name"
                      placeholder={t("firstName")}
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="field-input"
                    />
                  </Field>
                  <Field label={t("lastName")}>
                    <input
                      required
                      autoComplete="family-name"
                      placeholder={t("lastName")}
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="field-input"
                    />
                  </Field>
                  <Field label={t("address")} fullWidth>
                    <input
                      required
                      autoComplete="street-address"
                      placeholder={t("address")}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="field-input"
                    />
                  </Field>
                  <Field label={t("city")}>
                    <input
                      required
                      autoComplete="address-level2"
                      placeholder={t("city")}
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="field-input"
                    />
                  </Field>
                  <Field label={t("postalCode")} required={false}>
                    <input
                      autoComplete="postal-code"
                      placeholder={t("postalCode")}
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      className="field-input"
                    />
                  </Field>
                </div>
              </section>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="btn-pill min-h-14 w-full cursor-pointer bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] disabled:cursor-wait disabled:opacity-50"
              >
                {submitting ? t("placingOrder") : t("placeOrder")}
              </button>
            </div>
          </form>

          <aside className="flex flex-col gap-4 self-start rounded-[1.75rem] border border-[var(--hairline)] bg-[var(--surface-muted)] p-5 sm:p-7 lg:sticky lg:top-32">
            <h2 className="text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("summaryTitle")}
            </h2>
          {lines.map((line) => (
              <div key={line.id} className="flex items-center gap-3 text-sm">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                <Image src={productImage(line)} alt={line.name} fill sizes="56px" className="object-contain p-1" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="font-display text-base leading-snug">{line.name}</span>
                <span className="text-xs text-neutral-500">
                  {line.variant} × {line.qty}
                </span>
              </div>
              <span>{formatMoney(line.price * line.qty, locale)}</span>
            </div>
          ))}
            <div className="mt-2 flex justify-between border-t border-[var(--hairline)] pt-4 text-sm">
              <span className="text-neutral-600">{tCart("subtotal")}</span>
              <span>{formatMoney(subtotal, locale)}</span>
            </div>
            {coupon && (
              <div className="flex justify-between text-sm text-emerald-700">
                <span>
                  {tCart("discount")} ({coupon.code})
                </span>
                <span>-{formatMoney(discount, locale)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">{t("shippingFee")}</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium tracking-wide text-emerald-700">
                {tCart("shippingFree")}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-t border-[var(--hairline)] pt-4">
              <span className="text-sm tracking-wide">{tCart("total")}</span>
              <span className="font-display text-3xl tabular-nums">{formatMoney(total, locale)}</span>
            </div>
            <p className="text-center text-[11px] tracking-[0.16em] text-neutral-500 uppercase">{t("secureNote")}</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
