"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/lib/cart/cart-context";
import { trackAddToCart } from "@/lib/analytics/events";
import type { BrandSlug } from "@/lib/brands";
import type { Product } from "@/lib/data/shop";

export function AddToCartForm({
  brand,
  product,
}: {
  brand: BrandSlug;
  product: Product;
}) {
  const t = useTranslations("product");
  const tErrors = useTranslations("errors");
  const { addLine } = useCart();
  const [added, setAdded] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const outOfStock = product.stock <= 0;

  return (
    <>
      <button
        type="button"
        disabled={outOfStock || pending}
        onClick={async () => {
          setPending(true);
          setError(null);
          const result = await addLine({
            brand,
            productId: product.id,
            // Products have no size options — kept on the line shape (and
            // OrderItem) as empty so existing carts/orders still fit.
            variant: "",
            qty: 1,
            name: product.name,
            category: product.category,
            price: product.price,
            imageUrl: product.imageUrl,
          });
          setPending(false);
          if (!result.ok) {
            setError(tErrors(result.error, { count: result.count ?? 0 }));
            return;
          }
          trackAddToCart({ productId: product.id, name: product.name, category: product.category, price: product.price }, brand);
          setAdded(true);
        }}
        className="mt-7 min-h-[52px] bg-[var(--brand-accent)] px-8 font-inherit text-xs tracking-widest text-white uppercase hover:opacity-90 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:hover:opacity-100"
      >
        {outOfStock ? t("outOfStock") : pending ? "…" : added ? t("addedToCart") : t("addToCart")}
      </button>
      {error && <p className="mt-2.5 text-sm text-red-600">{error}</p>}
    </>
  );
}
