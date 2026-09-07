"use client";

import { Link } from "@/i18n/navigation";
import type { BrandSlug } from "@/lib/brands";
import { trackMenuLinkClick } from "@/lib/analytics/events";

// Wraps a single header nav (desktop strip or mobile drawer) link so its
// click fires menu_link_click — the layout/menu around this stays a Server
// Component, only the click itself needs a client boundary.
export function MenuLinkTracker({
  href,
  label,
  displayLabel,
  brand,
  source,
  className,
}: {
  href: string;
  label: string; // canonical category value — sent to analytics
  displayLabel?: string; // translated text to render; defaults to label
  brand: BrandSlug;
  source: "desktop" | "mobile";
  className?: string;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackMenuLinkClick(label, brand, source)}>
      {displayLabel ?? label}
    </Link>
  );
}
