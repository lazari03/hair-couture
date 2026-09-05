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
  | "postalCode"
  | "country";

function Field({
  label,
  children,
  fullWidth = false,
}: {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <label className={fullWidth ? "col-span-2 flex flex-col gap-1.5" : "flex flex-col gap-1.5"}>
      <span className="text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
        {label} <span className="text-[var(--brand-accent)]">*</span>
      </span>
      {children}
    </label>
  );
}

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
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
    country: "",
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
      setError(result.error);
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
        <div className="w-full rounded-[2rem] border border-neutral-200 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:px-10">
          <h1 className="text-3xl font-light tracking-tight">{t("successTitle")}</h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {t("successBody", { orderId, email: form.email })}
          </p>
          <Link
            href={`/${brand}`}
            className="mt-8 inline-flex min-h-11 items-center justify-center border border-neutral-900 px-7 text-xs tracking-widest uppercase transition-colors hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white"
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
        <div className="w-full rounded-[2rem] border border-neutral-200 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:px-10">
          <h1 className="text-2xl font-light">{tCart("emptyTitle")}</h1>
          <p className="mt-3 mb-6 text-sm text-neutral-500">{tCart("emptyBody")}</p>
          <Link
            href={`/${brand}`}
            className="inline-flex min-h-11 items-center justify-center border border-neutral-900 px-6 text-xs tracking-widest uppercase transition-colors hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white"
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
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">{t("title")}</h1>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-7"
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
                      className="min-h-11 border border-neutral-300 bg-white px-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
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
                      className="min-h-11 border border-neutral-300 bg-white px-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
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
                      className="min-h-11 border border-neutral-300 bg-white px-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                    />
                  </Field>
                  <Field label={t("lastName")}>
                    <input
                      required
                      autoComplete="family-name"
                      placeholder={t("lastName")}
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="min-h-11 border border-neutral-300 bg-white px-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                    />
                  </Field>
                  <Field label={t("address")} fullWidth>
                    <input
                      required
                      autoComplete="street-address"
                      placeholder={t("address")}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="min-h-11 border border-neutral-300 bg-white px-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                    />
                  </Field>
                  <Field label={t("city")}>
                    <input
                      required
                      autoComplete="address-level2"
                      placeholder={t("city")}
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="min-h-11 border border-neutral-300 bg-white px-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                    />
                  </Field>
                  <Field label={t("postalCode")}>
                    <input
                      required
                      autoComplete="postal-code"
                      placeholder={t("postalCode")}
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      className="min-h-11 border border-neutral-300 bg-white px-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                    />
                  </Field>
                  <Field label={t("country")} fullWidth>
                    <input
                      required
                      autoComplete="country-name"
                      placeholder={t("country")}
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="min-h-11 border border-neutral-300 bg-white px-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                    />
                  </Field>
                </div>
              </section>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-[52px] cursor-pointer items-center justify-center bg-[var(--brand-accent)] px-5 text-xs tracking-widest text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? t("placingOrder") : t("placeOrder")}
              </button>
            </div>
          </form>

          <aside className="sticky top-6 flex flex-col gap-4 rounded-[2rem] border border-neutral-200 bg-[#faf9f7] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-7">
            <h2 className="text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("summaryTitle")}
            </h2>
          {lines.map((line) => (
              <div key={line.id} className="flex items-center gap-3 text-sm">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white">
                <Image src={productImage(line)} alt={line.name} fill sizes="56px" className="object-contain p-1" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="font-medium">{line.name}</span>
                <span className="text-xs text-neutral-500">
                  {line.variant} × {line.qty}
                </span>
              </div>
              <span>{formatMoney(line.price * line.qty, locale)}</span>
            </div>
          ))}
            <div className="mt-2 flex justify-between border-t border-neutral-200 pt-3.5 text-sm">
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
            <div className="flex justify-between border-t border-neutral-200 pt-3.5 text-lg">
              <span>{tCart("total")}</span>
              <span>{formatMoney(total, locale)}</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
