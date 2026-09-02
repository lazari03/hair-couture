"use server";

import { prisma } from "@/lib/prisma";
import { RESERVATION_MINUTES, type ReserveResult } from "@/lib/stock-constants";

// Called whenever a cart's quantity for one product changes (add/increase/
// decrease/remove) — always passed the *new total* qty for that product
// across the whole cart, not a delta. qty <= 0 releases the hold entirely.
//
// SQLite has no per-row lock (no SELECT ... FOR UPDATE like Postgres) — the
// interactive transaction below is the honest equivalent here: Prisma opens
// a real SQLite transaction, and SQLite serializes writers at the database
// level, so no two calls can interleave their read-then-write and both
// succeed against the same units. Coarser than a row lock, correct at this
// scale.
export async function reserveStock(input: {
  cartId: string;
  productId: string;
  qty: number;
}): Promise<ReserveResult> {
  const { cartId, productId, qty } = input;

  return prisma.$transaction(async (tx) => {
    // Prune this product's expired holds opportunistically — no cron job,
    // just sweep whenever we're already looking at this product.
    await tx.stockReservation.deleteMany({
      where: { productId, expiresAt: { lt: new Date() } },
    });

    const product = await tx.product.findUnique({ where: { id: productId } });
    if (!product) return { ok: false, error: "Product not found" };

    const reservedByOthers = await tx.stockReservation.aggregate({
      where: { productId, cartId: { not: cartId }, expiresAt: { gte: new Date() } },
      _sum: { qty: true },
    });
    const available = product.stock - (reservedByOthers._sum.qty ?? 0);

    if (qty > 0 && qty > available) {
      return {
        ok: false,
        error: available <= 0 ? "Sold out" : `Only ${available} left in stock`,
      };
    }

    const existing = await tx.stockReservation.findFirst({ where: { cartId, productId } });
    if (qty <= 0) {
      if (existing) await tx.stockReservation.delete({ where: { id: existing.id } });
    } else {
      const expiresAt = new Date(Date.now() + RESERVATION_MINUTES * 60 * 1000);
      if (existing) {
        await tx.stockReservation.update({ where: { id: existing.id }, data: { qty, expiresAt } });
      } else {
        await tx.stockReservation.create({ data: { cartId, productId, qty, expiresAt } });
      }
    }

    return { ok: true, available: available - Math.max(0, qty) };
  });
}

// Called after a successful checkout — the reservation's job is done, real
// stock is already decremented for the order, so the hold is released.
export async function releaseCartReservations(cartId: string) {
  await prisma.stockReservation.deleteMany({ where: { cartId } });
}
