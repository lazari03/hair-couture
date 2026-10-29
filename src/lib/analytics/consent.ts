// Cookie consent for GA4 (Google Consent Mode v2). The tag always loads
// with analytics storage denied (cookieless pings only); this module stores
// the visitor's choice from CookieConsentBanner.tsx and broadcasts it, and
// AnalyticsProvider turns it into gtag('consent', 'update', ...).
const STORAGE_KEY = "hc_cookie_consent";
export const CONSENT_EVENT = "hc-cookie-consent-change";

// A choice (either way) expires after a day — re-ask rather than remember
// forever, so it isn't a one-time decision baked into the browser permanently.
const TTL_MS = 24 * 60 * 60 * 1000;

export type ConsentState = "granted" | "denied";

interface StoredConsent {
  state: ConsentState;
  at: number; // epoch ms
}

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const stored = JSON.parse(raw) as StoredConsent;
    if (Date.now() - stored.at > TTL_MS) return null; // expired — ask again
    return stored.state === "granted" || stored.state === "denied" ? stored.state : null;
  } catch {
    return null; // pre-TTL format or corrupted value — treat as unanswered
  }
}

export function setConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, at: Date.now() } satisfies StoredConsent));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}
