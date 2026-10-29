"use server";

import { prisma } from "@/lib/prisma";

// Stock is an on/off switch per product (Product.inStock, set in the
// admin) — no unit counts or holds. Checked whenever something is added to
// a cart; createOrder checks again at checkout.
// Error values are message keys (messages/<locale>.json "errors" namespace).
export async function checkInStock(productId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const product = await prisma.product.findUnique({ where: { id: productId }, select: { inStock: true } });
  if (!product) return { ok: false, error: "productNotFound" };
  if (!product.inStock) return { ok: false, error: "soldOut" };
  return { ok: true };
}
