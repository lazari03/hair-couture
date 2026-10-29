"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { GA_ID, pageview } from "@/lib/analytics/gtag";
import { useScrollDepth } from "@/lib/analytics/useScrollDepth";
import { CONSENT_EVENT, getConsent, type ConsentState } from "@/lib/analytics/consent";

// GA4 on every storefront page (landing + all three shops; /admin has its
// own layout without this). Uses Google Consent Mode v2: the tag always
// loads with storage denied, so until the visitor accepts the cookie banner
// GA only receives cookieless pings; accepting switches analytics_storage
// to granted (CookieConsentBanner.tsx → consent.ts). Each page_view and
// every later event carries the shop as GA4's Content group + `brand`
// (lib/analytics/gtag.ts), so each shop can be reported on separately.
// Mounted once in providers.tsx.
function initGtag() {
  if (typeof window === "undefined" || typeof window.gtag === "function") return;
  window.dataLayer = window.dataLayer || [];
  // gtag must push the `arguments` object itself — that's what gtag.js reads.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

function applyConsent(state: ConsentState | null) {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", { analytics_storage: state === "granted" ? "granted" : "denied" });
}

export function AnalyticsProvider() {
  const pathname = usePathname();
  const params = useParams<{ brand?: string }>();

  useScrollDepth();

  // Runs before the page_view effect below (effects run in order), so the
  // queue is ready and consent is set before anything is sent.
  useEffect(() => {
    initGtag();
    applyConsent(getConsent());
    function onConsentChange(e: Event) {
      applyConsent((e as CustomEvent<ConsentState>).detail);
    }
    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
  }, []);

  useEffect(() => {
    pageview(pathname, params.brand);
  }, [pathname, params.brand]);

  if (!GA_ID) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />;
}
