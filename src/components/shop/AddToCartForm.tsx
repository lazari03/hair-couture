"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/lib/cart/cart-context";
import type { BrandSlug } from "@/lib/brands";

export function AddToCartForm({
  brand,
  productId,
  sizes,
}: {
  brand: BrandSlug;
  productId: string;
  sizes: string[];
}) {
  const t = useTranslations("product");
  const { addLine } = useCart();
  const [sizeIndex, setSizeIndex] = useState(0);
  const [added, setAdded] = useState(false);

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
        onClick={() => {
          addLine({ brand, productId, variant: sizes[sizeIndex], qty: 1 });
          setAdded(true);
        }}
        className="mt-7 min-h-[52px] bg-[var(--brand-accent)] px-8 font-inherit text-xs tracking-widest text-white uppercase hover:opacity-90"
      >
        {added ? t("addedToCart") : t("addToCart")}
      </button>
    </>
  );
}
