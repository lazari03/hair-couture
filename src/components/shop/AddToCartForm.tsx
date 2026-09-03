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
  sizes,
}: {
  brand: BrandSlug;
  product: Product;
  sizes: string[];
}) {
  const t = useTranslations("product");
  const { addLine } = useCart();
  const [sizeIndex, setSizeIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const outOfStock = product.stock <= 0;

  return (
    <>
      <div className="mt-8">
        <span className="text-xs tracking-widest text-neutral-500 uppercase">{t("size")}</span>
        <div className="mt-3 flex gap-2.5">
          {sizes.map((size, i) => (
            <button
              key={size}
              type="button"
              onClick={() => setSizeIndex(i)}
              className={`min-h-11 border px-5 font-inherit text-xs tracking-wide ${
                i === sizeIndex
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-900"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        disabled={outOfStock || pending}
        onClick={async () => {
          setPending(true);
          setError(null);
          const result = await addLine({
            brand,
            productId: product.id,
            variant: sizes[sizeIndex],
            qty: 1,
            name: product.name,
            category: product.category,
            price: product.price,
            imageUrl: product.imageUrl,
          });
          setPending(false);
          if (!result.ok) {
            setError(result.error);
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
