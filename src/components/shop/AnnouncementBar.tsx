import { getTranslations } from "next-intl/server";

// Slim, always-on brand-accent strip above the header. Free shipping is a
// standing policy, not a promo, so it lives in chrome rather than a banner.
export async function AnnouncementBar() {
  const t = await getTranslations("promise");
  const items = [t("announcement"), t("items.returns.title"), t("items.authentic.title"), t("items.cod.title")];
  // Duplicated once so the marquee can loop seamlessly at -50%.
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)]">
      <div className="flex w-max animate-marquee items-center py-2.5 motion-reduce:w-full motion-reduce:justify-center">
        {loop.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className={`flex items-center gap-6 px-6 text-[10.5px] tracking-[0.24em] uppercase ${
              i > 0 ? "motion-reduce:hidden" : ""
            }`}
          >
            {item}
            <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-50" />
          </span>
        ))}
      </div>
    </div>
  );
}
