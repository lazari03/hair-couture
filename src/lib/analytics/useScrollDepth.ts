"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import { trackScrollDepth } from "./events";

const THRESHOLDS = [25, 50, 75, 100];

// Fires a GA4 "scroll" event once per threshold per page. Resets the fired
// set on every path change (via the pathname dependency) so navigating
// within the SPA re-arms depth tracking for the new page.
export function useScrollDepth() {
  const pathname = usePathname();
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current = new Set();
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const pct = scrollable <= 0 ? 100 : Math.round((doc.scrollTop / scrollable) * 100);
        for (const threshold of THRESHOLDS) {
          if (pct >= threshold && !fired.current.has(threshold)) {
            fired.current.add(threshold);
            trackScrollDepth(threshold);
          }
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
}
