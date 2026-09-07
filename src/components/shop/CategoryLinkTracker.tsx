"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { BrandSlug } from "@/lib/brands";
import { trackCategoryClick } from "@/lib/analytics/events";

// Wraps a category filter link (shop sidebar, footer, homepage collection
// tiles) so its click fires category_click — kept generic over `children`
// since each caller renders very different markup around the label.
export function CategoryLinkTracker({
  href,
  category,
  brand,
  source,
  className,
  children,
}: {
  href: string;
  category: string;
  brand: BrandSlug;
  source: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackCategoryClick(category, brand, source)}>
      {children}
    </Link>
  );
}
