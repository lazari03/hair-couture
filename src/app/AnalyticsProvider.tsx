"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { GA_ID, pageview } from "@/lib/analytics/gtag";
import { useScrollDepth } from "@/lib/analytics/useScrollDepth";

// Bootstraps GA4 (only when a real Measurement ID is configured) and fires
// a page_view — tagged with the active brand slug when inside a /[brand]
// route — on every client-side navigation, since Next's App Router
// navigations don't reload the GA script's own automatic page_view.
// Also mounts the sitewide scroll-depth tracker. Mounted once in
// providers.tsx, sibling to CartProvider.
export function AnalyticsProvider() {
  const pathname = usePathname();
  const params = useParams<{ brand?: string }>();

  useScrollDepth();

  useEffect(() => {
    pageview(pathname, params.brand ? { brand: params.brand } : undefined);
  }, [pathname, params.brand]);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
