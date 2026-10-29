"use client";

// Client-only cart state (skills/networking.md: this is local UI state, not
// fetched data — no TanStack Query needed). Persists to localStorage so a
// refresh doesn't lose the cart; swap for a server-backed cart behind the
// same hook shape once checkout needs one.
//
// Stock: adding a product (or another unit of it) first checks it's still
// in stock (lib/actions/stock.ts) — an out-of-stock product is rejected
// with { ok: false, error }.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BrandSlug } from "@/lib/brands";
import { checkInStock } from "@/lib/actions/stock";

// crypto.randomUUID() only exists in a "secure context" (HTTPS, or
// localhost) — plain HTTP on an IP/domain throws. These ids are just
// local cart/line keys, not security-sensitive, so a non-spec fallback is
// fine.
function randomId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export interface CartLine {
  id: string; // line id, stable across qty changes
  brand: BrandSlug;
  productId: string;
  variant: string;
  qty: number;
  // ponytail: product name/category/price are snapshotted here at add-time
  // instead of looked up from the DB on render — products now live behind
  // Prisma (async), and the cart is a "use client" component that renders
  // synchronously. Real checkout should re-validate price server-side before
  // charging; this snapshot is fine for display and for surviving a product
  // being renamed/repriced/deleted after it was added to a cart.
  name: string;
  category: string;
  price: number;
  imageUrl?: string | null;
}

export interface AppliedCoupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
}

// error is a message key (messages/<locale>.json "errors" namespace) — see lib/actions/orders.ts.
export type CartOpResult = { ok: true } | { ok: false; error: string; count?: number };

interface CartContextValue {
  cartId: string;
  lines: CartLine[];
  totalQty: number;
  coupon: AppliedCoupon | null;
  addLine: (line: Omit<CartLine, "id">) => Promise<CartOpResult>;
  incLine: (id: string) => Promise<CartOpResult>;
  decLine: (id: string) => void;
  removeLine: (id: string) => void;
  setCoupon: (coupon: AppliedCoupon | null) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
// v2: prices switched from EUR to ALL — carts saved before that hold EUR
// price snapshots, so they're dropped instead of shown at 1/100th.
const STORAGE_KEY = "hc-cart-v2";
const COUPON_STORAGE_KEY = "hc-cart-coupon-v2";
const LEGACY_STORAGE_KEYS = ["hc-cart", "hc-cart-coupon"];
const CART_ID_KEY = "hc-cart-id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [coupon, setCouponState] = useState<AppliedCoupon | null>(null);
  const [cartId, setCartId] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // ponytail: localStorage is per-viewer convenience state, not the source
  // of truth for an order — fine for a pre-checkout cart, wrap in try/catch
  // since a private window or blocked storage can throw. Deliberately reads
  // and sets state after mount (not a lazy useState initializer) so SSR
  // output and first client paint match — hydrating straight from
  // localStorage would mismatch whenever the stored cart is non-empty.
  useEffect(() => {
    try {
      for (const key of LEGACY_STORAGE_KEYS) localStorage.removeItem(key);
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
      const rawCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (rawCoupon) setCouponState(JSON.parse(rawCoupon));

      let id = localStorage.getItem(CART_ID_KEY);
      if (!id) {
        id = randomId();
        localStorage.setItem(CART_ID_KEY, id);
      }
      setCartId(id);
    } catch {
      // storage unavailable — start with an empty cart and a throwaway id
      // (in-memory only, so no hold survives a reload, but nothing crashes)
      setCartId(randomId());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
      if (coupon) localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      else localStorage.removeItem(COUPON_STORAGE_KEY);
    } catch {
      // storage unavailable — cart just won't persist across reloads
    }
  }, [lines, coupon, hydrated]);

  const value = useMemo<CartContextValue>(
    () => ({
      cartId,
      lines,
      totalQty: lines.reduce((sum, l) => sum + l.qty, 0),
      coupon,

      addLine: async (line) => {
        const result = await checkInStock(line.productId);
        if (!result.ok) return { ok: false, error: result.error };
        setLines((prev) => [
          ...prev,
          { ...line, id: `${line.productId}-${line.variant}-${Date.now()}` },
        ]);
        return { ok: true };
      },

      incLine: async (id) => {
        const line = lines.find((l) => l.id === id);
        if (!line) return { ok: false, error: "itemNotFound" };
        const result = await checkInStock(line.productId);
        if (!result.ok) return { ok: false, error: result.error };
        setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)));
        return { ok: true };
      },

      decLine: (id) => {
        setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty - 1) } : l)));
      },

      removeLine: (id) => {
        setLines((prev) => prev.filter((l) => l.id !== id));
      },

      setCoupon: setCouponState,

      clearCart: () => {
        setLines([]);
        setCouponState(null);
      },
    }),
    [lines, coupon, cartId],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
