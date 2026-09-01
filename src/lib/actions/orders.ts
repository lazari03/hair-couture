"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CouponResult =
  | { ok: true; code: string; type: "percent" | "fixed"; value: number }
  | { ok: false; error: string };

export async function validateCoupon(code: string): Promise<CouponResult> {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return { ok: false, error: "Enter a coupon code" };

  const coupon = await prisma.coupon.findUnique({ where: { code: trimmed } });
  if (!coupon || !coupon.active) return { ok: false, error: "Invalid or expired coupon" };

  return { ok: true, code: coupon.code, type: coupon.type as "percent" | "fixed", value: coupon.value };
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
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(1, "Phone number is required"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  postalCode: z.string().trim().min(1, "Postal code is required"),
  country: z.string().trim().min(1, "Country is required"),
  couponCode: z.string().optional(),
  lines: z.array(orderLineSchema).min(1, "Your cart is empty"),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type OrderResult = { ok: true; orderId: string } | { ok: false; error: string };

export async function createOrder(input: OrderInput): Promise<OrderResult> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const data = parsed.data;

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
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      couponCode,
      subtotal,
      discount,
      total: Math.max(0, subtotal - discount),
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

  revalidatePath("/admin/orders");
  return { ok: true, orderId: order.id };
}
