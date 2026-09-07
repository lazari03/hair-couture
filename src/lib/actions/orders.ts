"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendOrderConfirmation, sendOrderNotificationToAdmin } from "@/lib/email";
import { getBrand } from "@/lib/brands";

export type CouponResult =
  | { ok: true; code: string; type: "percent" | "fixed"; value: number }
  | { ok: false; error: string };

// Error values are message keys (messages/<locale>.json "errors" namespace),
// not display text — callers translate with t("errors.<code>") before showing them.
export async function validateCoupon(code: string): Promise<CouponResult> {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return { ok: false, error: "couponRequired" };

  const coupon = await prisma.coupon.findUnique({ where: { code: trimmed } });
  if (!coupon || !coupon.active) return { ok: false, error: "couponInvalid" };

  return { ok: true, code: coupon.code, type: coupon.type as "percent" | "fixed", value: coupon.value };
}

// Guest order lookup for the storefront "Account" page (no customer login —
// see skills/auth.md: single-admin auth only). Scoped to email + brand so
// one guest can't see another's orders and Balmain orders don't leak into
// Eloure's lookup; email isn't a secret, so this is a lookup, not auth — fine
// for "see my own order status", not for anything sensitive.
export async function getOrdersByEmail(email: string, brand: string) {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return [];
  return prisma.order.findMany({
    where: { email: trimmed, brand },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
}

const orderLineSchema = z.object({
  productId: z.string(),
  name: z.string(),
  variant: z.string(),
  price: z.number(),
  qty: z.number().int().positive(),
});

const orderSchema = z.object({
  brand: z.string().min(1),
  firstName: z.string().trim().min(1, "firstNameRequired"),
  lastName: z.string().trim().min(1, "lastNameRequired"),
  email: z.string().trim().email("emailInvalid"),
  phone: z.string().trim().min(1, "phoneRequired"),
  address: z.string().trim().min(1, "addressRequired"),
  city: z.string().trim().min(1, "cityRequired"),
  postalCode: z.string().trim().optional(),
  country: z.string().trim().optional(),
  couponCode: z.string().optional(),
  shippingClassId: z.string().trim().min(1, "shippingMethodRequired"),
  lines: z.array(orderLineSchema).min(1, "cartEmpty"),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type OrderResult = { ok: true; orderId: string } | { ok: false; error: string };

export async function createOrder(input: OrderInput): Promise<OrderResult> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const data = parsed.data;
  const resolvedBrand = getBrand(data.brand);
  if (!resolvedBrand) return { ok: false, error: "brandInvalid" };

  const shippingClass = await prisma.shippingClass.findUnique({ where: { id: data.shippingClassId } });
  if (!shippingClass || !shippingClass.active) return { ok: false, error: "shippingMethodInvalid" };

  const subtotal = data.lines.reduce((sum, l) => sum + l.price * l.qty, 0);

  let discount = 0;
  let couponCode: string | null = null;
  if (data.couponCode) {
    const result = await validateCoupon(data.couponCode);
    if (result.ok) {
      discount = result.type === "percent" ? subtotal * (result.value / 100) : Math.min(result.value, subtotal);
      couponCode = result.code;
    }
    // an invalid coupon code that slipped through (e.g. expired between
    // apply and submit) just gets ignored here rather than blocking the
    // order — the cart page is where a bad code gets rejected up front.
  }

  const order = await prisma.order.create({
    data: {
      brand: data.brand,
      firstName: data.firstName,
      lastName: data.lastName,
      // Lowercased so the account page's order lookup (case-insensitive by
      // construction, not by a SQLite-unsupported query flag) can match it.
      email: data.email.toLowerCase(),
      phone: data.phone,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode || "",
      country: data.country || "",
      couponCode,
      subtotal,
      discount,
      total: Math.max(0, subtotal - discount),
      // ALL, a separate currency from `total` (EUR) — recorded, never summed.
      shippingClassId: shippingClass.id,
      shippingClassName: shippingClass.name,
      shippingFee: shippingClass.fee,
      items: {
        create: data.lines.map((l) => ({
          productId: l.productId,
          name: l.name,
          variant: l.variant,
          price: l.price,
          qty: l.qty,
        })),
      },
    },
  });

  // Decrement stock for each ordered product, clamped at 0. Reads then
  // writes rather than a single atomic decrement so it never goes negative.
  // ponytail ceiling: no row locking, so two checkouts racing on the last
  // unit of something can both succeed — fine at this scale; a real
  // high-traffic store would want a DB-level constraint/transaction here.
  for (const line of data.lines) {
    const product = await prisma.product.findUnique({ where: { id: line.productId } });
    if (!product) continue;
    await prisma.product.update({
      where: { id: line.productId },
      data: { stock: Math.max(0, product.stock - line.qty) },
    });
  }

  // Order confirmation email — brand-customized, sent to whatever the guest
  // typed at checkout. Never throws (see lib/email.ts's own guards), so a
  // Brevo outage or an unset BREVO_API_KEY can never fail the checkout.
  await Promise.all([
    sendOrderConfirmation(
      {
        id: order.id,
        email: order.email,
        firstName: order.firstName,
        lastName: order.lastName,
        total: order.total,
        shippingClassName: order.shippingClassName,
        shippingFee: order.shippingFee,
        items: data.lines,
      },
      resolvedBrand.slug,
    ),
    sendOrderNotificationToAdmin(
      {
        id: order.id,
        email: order.email,
        firstName: order.firstName,
        lastName: order.lastName,
        total: order.total,
        shippingClassName: order.shippingClassName,
        shippingFee: order.shippingFee,
        items: data.lines,
      },
      resolvedBrand.slug,
    ),
  ]);

  revalidatePath("/admin/orders");
  revalidatePath("/admin/products");
  revalidatePath("/[locale]/[brand]/product/[slug]", "page");
  revalidatePath("/[locale]/[brand]/shop", "page");
  return { ok: true, orderId: order.id };
}

const ORDER_STATUSES = ["pending", "in_progress", "fulfilled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export async function updateOrderStatus(orderId: string, status: string) {
  if (!ORDER_STATUSES.includes(status as OrderStatus)) {
    return { ok: false as const, error: "Invalid status" };
  }
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/orders");
  return { ok: true as const };
}
