// Low-level GA4 wrapper. No analytics vendor existed before this — GA4 was
// chosen so reporting (which brand/page/product gets the most traffic,
// which product sells most) comes free from GA4's own dashboards rather
// than a bespoke admin page. Every call here no-ops safely when
// NEXT_PUBLIC_GA_MEASUREMENT_ID is unset (the default until a real
// Measurement ID is supplied) or when called on the server — nothing here
// should ever throw.

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Public — reaches the client bundle; GA's gtag.js script needs it
// client-side, so unlike BREVO_API_KEY this can't be a server-only var.
export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function gtagReady(): boolean {
  return Boolean(GA_ID) && typeof window !== "undefined" && typeof window.gtag === "function";
}

export function pageview(path: string, params?: Record<string, unknown>) {
  if (!gtagReady()) return;
  window.gtag("event", "page_view", { page_path: path, ...params });
}

export function track(event: string, params?: Record<string, unknown>) {
  if (!gtagReady()) return;
  window.gtag("event", event, params);
}
