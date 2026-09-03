// Typed per-event GA4 helpers, one per tracked interaction. Shapes GA4's
// recommended ecommerce param names (currency/value/items) so the events
// feed GA4's built-in ecommerce reports (e.g. "most sold product") without
// a bespoke sales-ranking feature.

import { track } from "./gtag";
import type { BrandSlug } from "@/lib/brands";

export interface TrackableItem {
  productId: string;
  name: string;
  category?: string;
  price: number;
  qty?: number;
}

function toGaItems(items: TrackableItem[]) {
  return items.map((i) => ({
    item_id: i.productId,
    item_name: i.name,
    item_category: i.category,
    price: i.price,
    quantity: i.qty ?? 1,
  }));
}

export function trackBrandSelect(brand: BrandSlug) {
  track("brand_select", { brand });
}

export function trackViewItem(item: TrackableItem, brand: BrandSlug) {
  track("view_item", { currency: "EUR", value: item.price, brand, items: toGaItems([item]) });
}

export function trackAddToCart(item: TrackableItem, brand: BrandSlug) {
  track("add_to_cart", {
    currency: "EUR",
    value: item.price * (item.qty ?? 1),
    brand,
    items: toGaItems([item]),
  });
}

export function trackCheckoutButtonClick(brand: BrandSlug) {
  track("checkout_button_click", { brand });
}

export function trackBeginCheckout(items: TrackableItem[], brand: BrandSlug) {
  const value = items.reduce((sum, i) => sum + i.price * (i.qty ?? 1), 0);
  track("begin_checkout", { currency: "EUR", value, brand, items: toGaItems(items) });
}

export function trackPurchase(orderId: string, items: TrackableItem[], value: number, brand: BrandSlug) {
  track("purchase", { transaction_id: orderId, currency: "EUR", value, brand, items: toGaItems(items) });
}

export function trackSearch(term: string, brand: BrandSlug) {
  track("search", { search_term: term, brand });
}

export function trackNewsletterSignup(brand: BrandSlug) {
  track("newsletter_signup", { brand });
}

export function trackContactClick(brand: BrandSlug) {
  track("contact_click", { brand });
}

export function trackScrollDepth(percent: number, brand?: BrandSlug) {
  track("scroll", { percent_scrolled: percent, brand });
}
