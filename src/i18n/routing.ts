import { defineRouting } from "next-intl/routing";

// ponytail: single locale for now (progress.md open decision) — add to this
// array + drop a messages/<locale> folder when a locale ships. No code change.
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
});
