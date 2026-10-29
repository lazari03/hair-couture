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

// Public — a GA4 measurement ID is visible in every page anyway. Defaults to
// the haircouture.al property: NEXT_PUBLIC_* vars are inlined at *build*
// time and the Docker build doesn't receive .env.production, so relying on
// the env var alone left the live site without GA.
export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XY5TK493H7";

// GA4 "Content group" per shop — a built-in dimension, so every report can
// be split by shop with no extra setup in GA. Landing = the 3-brand page.
const CONTENT_GROUPS: Record<string, string> = {
  balmain: "Balmain Hair Couture",
  eloure: "Éloure",
  "eau-de-1974": "Eau de 1974",
};
export function contentGroup(brand?: string): string {
  return brand ? (CONTENT_GROUPS[brand] ?? brand) : "Landing";
}

function gtagReady(): boolean {
  return Boolean(GA_ID) && typeof window !== "undefined" && typeof window.gtag === "function";
}

// Called on every route change (App Router navigations don't reload the
// page, so gtag's automatic page_view only covers the first load — which is
// why config uses send_page_view: false). `set` makes the shop tags stick
// to every later event too (add_to_cart, purchase, ...).
export function pageview(path: string, brand?: string) {
  if (!gtagReady()) return;
  const shop = { content_group: contentGroup(brand), brand: brand ?? "landing" };
  window.gtag("set", shop);
  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
    ...shop,
  });
}

export function track(event: string, params?: Record<string, unknown>) {
  if (!gtagReady()) return;
  window.gtag("event", event, params);
}
