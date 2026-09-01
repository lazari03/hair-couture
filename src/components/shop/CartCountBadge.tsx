"use client";

import { useCart } from "@/lib/cart/cart-context";

export function CartCountBadge() {
  const { totalQty } = useCart();
  return (
    <span className="inline-flex min-w-[18px] items-center justify-center rounded-full bg-[var(--brand-accent)] px-1.5 py-0.5 text-[10px] text-white">
      {totalQty}
    </span>
  );
}
