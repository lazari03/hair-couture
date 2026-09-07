"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABEL: Record<string, string> = { en: "EN", sq: "SQ", it: "IT" };

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value })}
      className="cursor-pointer border-none bg-transparent text-xs text-neutral-500 outline-none hover:text-white"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l} className="text-neutral-900">
          {LOCALE_LABEL[l] ?? l}
        </option>
      ))}
    </select>
  );
}
