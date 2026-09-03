"use client";

import { Link } from "@/i18n/navigation";
import { trackBrandSelect } from "@/lib/analytics/events";
import type { BrandSlug } from "@/lib/brands";

// Thin client wrapper around the landing page's brand panels so a
// brand_select GA event fires on click while src/app/[locale]/page.tsx
// stays a Server Component.
export function BrandPanelLink({
  brand,
  href,
  className,
  style,
  children,
}: {
  brand: BrandSlug;
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-brand={brand}
      style={style}
      className={className}
      onClick={() => trackBrandSelect(brand)}
    >
      {children}
    </Link>
  );
}
