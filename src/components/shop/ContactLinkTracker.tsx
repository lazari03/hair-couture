"use client";

import { Link } from "@/i18n/navigation";
import { trackContactClick } from "@/lib/analytics/events";
import type { BrandSlug } from "@/lib/brands";

// Thin client wrapper so the footer's Contact link can fire a GA event on
// click while the rest of Footer.tsx stays a Server Component.
export function ContactLinkTracker({ brand, href, label }: { brand: BrandSlug; href: string; label: string }) {
  return (
    <Link href={href} className="hover:text-white" onClick={() => trackContactClick(brand)}>
      {label}
    </Link>
  );
}
