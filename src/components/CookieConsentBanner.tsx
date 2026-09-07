"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { brands } from "@/lib/brands";
import { getConsent, setConsent } from "@/lib/analytics/consent";

// Shown once per browser until the visitor picks Accept/Decline (see
// lib/analytics/consent.ts). Mounted sitewide in providers.tsx, next to
// AnalyticsProvider, which is what actually reacts to the choice.
export function CookieConsentBanner() {
  const t = useTranslations("cookieConsent");
  const params = useParams<{ brand?: string }>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // localStorage read must happen post-mount to avoid SSR/client hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  function respond(state: "granted" | "denied") {
    setConsent(state);
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-[13px] leading-relaxed text-neutral-700">
          {t("body")}{" "}
          <Link href={`/${params.brand ?? brands[0].slug}/cookies`} className="underline hover:text-neutral-900">
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            onClick={() => respond("denied")}
            className="min-h-10 rounded border border-neutral-300 px-4 text-xs tracking-wide uppercase hover:border-neutral-900"
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => respond("granted")}
            className="min-h-10 rounded bg-neutral-900 px-5 text-xs tracking-wide text-white uppercase hover:opacity-90"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
