import { getTranslations } from "next-intl/server";

const ICONS: Record<string, React.ReactNode> = {
  shipping: (
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  ),
  returns: <path d="M4 9h11a5 5 0 0 1 0 10H9M4 9l4-4M4 9l4 4" />,
  authentic: <path d="m12 3 2.6 2 3.3-.2.9 3.2 2.7 1.9-1.2 3.1 1.2 3.1-2.7 1.9-.9 3.2-3.3-.2L12 23l-2.6-2-3.3.2-.9-3.2-2.7-1.9L3.7 13 2.5 9.9l2.7-1.9.9-3.2 3.3.2Zm-3 10 2 2 4-4" />,
  cod: <path d="M3 7h18v10H3zM7 12h.01M17 12h.01M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
};

const KEYS = ["shipping", "returns", "authentic", "cod"] as const;

// Four-up service promise (free shipping, returns, authenticity, COD).
// Brand-agnostic: picks up --brand-accent from the brand layout.
export async function PromiseStrip() {
  const t = await getTranslations("promise");

  return (
    <section aria-label={t("title")} className="px-4 pt-10 sm:px-6 sm:pt-14 lg:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-[1.75rem] border border-[var(--hairline)] bg-[var(--surface-muted)] lg:grid-cols-4">
        {KEYS.map((key, i) => (
          <div
            key={key}
            className={`flex flex-col gap-4 p-6 sm:p-8 ${i % 2 === 1 ? "border-l border-[var(--hairline)]" : ""} ${
              i >= 2 ? "border-t border-[var(--hairline)] lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--brand-accent)] shadow-[var(--shadow-soft)]">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[key]}
              </svg>
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-display text-xl leading-tight sm:text-2xl">{t(`items.${key}.title`)}</span>
              <span className="text-[13px] leading-relaxed text-neutral-500">{t(`items.${key}.body`)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
