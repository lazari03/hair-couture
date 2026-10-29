// Safe to import from client components (no DB) — the cart page uses it.

// A product's own photo, or null when it has none (e.g. added in /admin
// without an image yet). No stock/category placeholder photos: callers show
// the grey loading skeleton instead (components/shop/ProductImage.tsx).
export function productImage(product: { imageUrl?: string | null }): string | null {
  return product.imageUrl || null;
}
