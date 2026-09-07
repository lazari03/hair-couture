"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { BrandSlug } from "@/lib/brands";
import { trackBannerClick } from "@/lib/analytics/events";

// Wraps a hero/banner CTA link so its click fires banner_click.
export function BannerLinkTracker({
  href,
  bannerId,
  label,
  brand,
  className,
  children,
}: {
  href: string;
  bannerId: string;
  label: string;
  brand: BrandSlug;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackBannerClick(bannerId, brand, label)}>
      {children}
    </Link>
  );
}
