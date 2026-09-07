"use client";

import { useEffect } from "react";
import type { BrandSlug } from "@/lib/brands";
import { trackViewCategory } from "@/lib/analytics/events";

// Fires a view_category GA event on mount/category change. Rendered inside
// the shop listing page (a Server Component) so it can run a client-only
// effect — same pattern as ProductViewBeacon.
export function CategoryViewBeacon({
  brand,
  category,
  resultCount,
}: {
  brand: BrandSlug;
  category?: string;
  resultCount: number;
}) {
  useEffect(() => {
    trackViewCategory(category, brand, resultCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per category/result-count change
  }, [category, resultCount]);

  return null;
}
