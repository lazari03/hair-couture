"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { productImage } from "@/lib/data/category-image";
import { formatMoney } from "@/lib/money";
import { createOrder } from "@/lib/actions/orders";
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
    setOrderId(result.orderId);
    clearCart();
  }

  if (orderId) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-light tracking-tight">{t("successTitle")}</h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {t("successBody", { orderId, email: form.email })}
        </p>
        <Link
          href={`/${brand}`}
          className="mt-8 inline-flex min-h-11 items-center border border-neutral-900 px-7 text-xs tracking-widest uppercase hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white"
        >
          {t("backToShop")}
        </Link>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-light">{tCart("emptyTitle")}</h1>
        <p className="mt-3 mb-6 text-sm text-neutral-500">{tCart("emptyBody")}</p>
        <Link
          href={`/${brand}`}
          className="inline-flex min-h-11 items-center border border-neutral-900 px-6 text-xs tracking-widest uppercase hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white"
        >
          {tCart("continueShopping")}
        </Link>
      </main>
    );
  }

  return (
    <main className="px-6 pb-24 sm:px-11">
      <h1 className="m-0 pt-11 pb-9 text-4xl font-light tracking-tight sm:text-5xl">{t("title")}</h1>

      <div className="grid grid-cols-1 items-start gap-10 sm:gap-14 md:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-7">
          <div>
            <h2 className="mb-4 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("contactTitle")}
            </h2>
            <div className="flex flex-col gap-3">
              <input
                required
                type="email"
                placeholder={t("email")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
              />
              <input
                required
                type="tel"
                placeholder={t("phone")}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("shippingTitle")}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder={t("firstName")}
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
              />
              <input
                required
                placeholder={t("lastName")}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
              />
              <input
                required
                placeholder={t("address")}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="col-span-2 min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
              />
              <input
                required
                placeholder={t("city")}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
              />
              <input
                required
                placeholder={t("postalCode")}
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
              />
              <input
                required
                placeholder={t("country")}
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="col-span-2 min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 min-h-[52px] cursor-pointer bg-[var(--brand-accent)] font-inherit text-xs tracking-widest text-white uppercase hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? t("placingOrder") : t("placeOrder")}
          </button>
        </form>

        <aside className="flex flex-col gap-3.5 bg-[#faf9f7] p-7">
          <h2 className="m-0 mb-1.5 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
            {t("summaryTitle")}
          </h2>
          {lines.map((line) => (
            <div key={line.id} className="flex items-center gap-3 text-sm">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-white">
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
              <span>{tCart("discount")} ({coupon.code})</span>
              <span>-{formatMoney(discount, locale)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-neutral-200 pt-3.5 text-lg">
            <span>{tCart("total")}</span>
            <span>{formatMoney(total, locale)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
