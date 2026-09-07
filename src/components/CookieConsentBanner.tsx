"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { brands } from "@/lib/brands";
import { getConsent, setConsent } from "@/lib/analytics/consent";

// Shown once per browser until the visitor picks Accept/Decline, and again
// 24h after that choice (see lib/analytics/consent.ts's TTL). Mounted
// sitewide in providers.tsx, next to AnalyticsProvider, which is what
// actually reacts to the choice. A small floating card, not a full-width
// bar — it shouldn't feel like it's blocking the page.
export function CookieConsentBanner() {
  const t = useTranslations("cookieConsent");
  const params = useParams<{ brand?: string }>();
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // localStorage read must happen post-mount to avoid SSR/client hydration mismatch
    if (getConsent() !== null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    // Mount off-screen first, then transition in on the next frame — a
    // banner that's just suddenly *there* on load reads as more jarring
    // than one that visibly arrives.
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  function respond(state: "granted" | "denied") {
    setConsent(state);
    setEntered(false);
    setTimeout(() => setVisible(false), 200);
  }

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-sm rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out sm:bottom-6 sm:left-6 ${
        entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">
          🍪
        </span>
        <div>
          <p className="text-[13px] leading-relaxed text-neutral-700">
            {t("body")}{" "}
            <Link href={`/${params.brand ?? brands[0].slug}/cookies`} className="underline hover:text-neutral-900">
              {t("learnMore")}
            </Link>
          </p>
          <div className="mt-3.5 flex gap-2.5">
            <button
              type="button"
              onClick={() => respond("granted")}
              className="min-h-9 rounded-full bg-neutral-900 px-4 text-xs tracking-wide text-white uppercase hover:opacity-90"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={() => respond("denied")}
              className="min-h-9 rounded-full border border-neutral-300 px-4 text-xs tracking-wide uppercase hover:border-neutral-900"
            >
              {t("decline")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
