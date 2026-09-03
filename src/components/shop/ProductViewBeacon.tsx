"use client";

import { useEffect } from "react";
import { trackViewItem } from "@/lib/analytics/events";
import type { BrandSlug } from "@/lib/brands";

// Fires a view_item GA event on mount. Rendered inside the product detail
// page (a Server Component) so it can run a client-only effect.
export function ProductViewBeacon({
  brand,
  productId,
  name,
  category,
  price,
}: {
  brand: BrandSlug;
  productId: string;
  name: string;
  category: string;
  price: number;
}) {
  useEffect(() => {
    trackViewItem({ productId, name, category, price }, brand);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per product mount
  }, [productId]);

  return null;
}
