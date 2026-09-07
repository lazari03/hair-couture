// Cookie consent gate for GA4 — nothing analytics-related loads or fires
// until the visitor explicitly grants consent via CookieConsentBanner.tsx.
// AnalyticsProvider only renders the gtag.js <Script> tags when consent is
// "granted", so window.gtag never exists otherwise — every call in
// gtag.ts's pageview()/track() already no-ops when window.gtag is missing,
// which makes this the single choke point without touching every call site.
const STORAGE_KEY = "hc_cookie_consent";
export const CONSENT_EVENT = "hc-cookie-consent-change";

export type ConsentState = "granted" | "denied";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "granted" || raw === "denied" ? raw : null;
}

export function setConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, state);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}
