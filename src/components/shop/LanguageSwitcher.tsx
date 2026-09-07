"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_FLAG: Record<string, string> = { en: "🇬🇧", sq: "🇦🇱", it: "🇮🇹" };
const LOCALE_NAME: Record<string, string> = { en: "English", sq: "Shqip", it: "Italiano" };

// A flag-only, icon-button-sized language switcher. The flag is a plain
// <span> we fully control; the <select> itself is transparent and stretched
// over it just to catch clicks/keyboard and open the native picker — a
// visibly-styled <select> renders inconsistently across browsers (Safari in
// particular keeps its own padding/emoji metrics even with appearance-none),
// so this sidesteps that instead of chasing per-browser CSS.
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center">
      <span aria-hidden="true" className="pointer-events-none select-none text-lg leading-none">
        {LOCALE_FLAG[locale] ?? locale.toUpperCase()}
      </span>
      <select
        aria-label={`Language: ${LOCALE_NAME[locale] ?? locale}`}
        value={locale}
        onChange={(e) => router.replace(pathname, { locale: e.target.value })}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l} aria-label={LOCALE_NAME[l] ?? l}>
            {LOCALE_FLAG[l] ?? l.toUpperCase()} {LOCALE_NAME[l] ?? l}
          </option>
        ))}
      </select>
    </div>
  );
}
