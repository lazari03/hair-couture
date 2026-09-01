"use client";

// Client-only cart state (skills/networking.md: this is local UI state, not
// fetched data — no TanStack Query needed). Persists to localStorage so a
// refresh doesn't lose the cart; swap for a server-backed cart behind the
// same hook shape once checkout needs one.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BrandSlug } from "@/lib/brands";

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

interface CartContextValue {
  lines: CartLine[];
  totalQty: number;
  coupon: AppliedCoupon | null;
  addLine: (line: Omit<CartLine, "id">) => void;
  incLine: (id: string) => void;
  decLine: (id: string) => void;
  removeLine: (id: string) => void;
  setCoupon: (coupon: AppliedCoupon | null) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hc-cart";
const COUPON_STORAGE_KEY = "hc-cart-coupon";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [coupon, setCouponState] = useState<AppliedCoupon | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // ponytail: localStorage is per-viewer convenience state, not the source
  // of truth for an order — fine for a pre-checkout cart, wrap in try/catch
  // since a private window or blocked storage can throw. Deliberately reads
  // and sets state after mount (not a lazy useState initializer) so SSR
  // output and first client paint match — hydrating straight from
  // localStorage would mismatch whenever the stored cart is non-empty.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
      const rawCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (rawCoupon) setCouponState(JSON.parse(rawCoupon));
    } catch {
      // storage unavailable — start with an empty cart
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
      lines,
      totalQty: lines.reduce((sum, l) => sum + l.qty, 0),
      coupon,
      addLine: (line) =>
        setLines((prev) => [
          ...prev,
          { ...line, id: `${line.productId}-${line.variant}-${Date.now()}` },
        ]),
      incLine: (id) =>
        setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))),
      decLine: (id) =>
        setLines((prev) =>
          prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty - 1) } : l)),
        ),
      removeLine: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      setCoupon: setCouponState,
      clearCart: () => {
        setLines([]);
        setCouponState(null);
      },
    }),
    [lines, coupon],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
