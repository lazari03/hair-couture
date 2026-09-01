"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProductGrid } from "./ProductGrid";
import type { BrandSlug } from "@/lib/brands";
import type { Product } from "@/lib/data/shop";

const RECENT_PLACEHOLDER = ["Extensions 55cm", "Refill", "Discovery set"];

export function SearchClient({ brand, products }: { brand: BrandSlug; products: Product[] }) {
  const t = useTranslations("search");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(q))
    : [];

  return (
    <main className="px-6 pb-24 sm:px-11">
      <div className="pt-14">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("placeholder")}
          className="w-full border-0 border-b border-neutral-900 bg-none py-0 pb-4.5 font-inherit text-2xl font-light tracking-tight text-neutral-900 outline-none sm:text-4xl"
        />
      </div>

      {!q && (
        <div className="grid grid-cols-1 gap-12 pt-11">
          <div>
            <h2 className="mb-4 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("recentTitle")}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {RECENT_PLACEHOLDER.map((r) => (
                <button
                  key={r}
                  onClick={() => setQuery(r)}
                  className="min-h-[38px] border border-neutral-300 bg-none px-4 font-inherit text-[13px] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
              {t("suggestedTitle")}
            </h2>
            <ProductGrid brand={brand} products={products.slice(0, 4)} />
          </div>
        </div>
      )}

      {q && (
        <div className="pt-9">
          <h2 className="mb-5.5 text-[11px] tracking-[0.18em] text-neutral-500 uppercase">
            {t("resultsTitle", { count: results.length })}
          </h2>
          <ProductGrid brand={brand} products={results} />
          {results.length === 0 && (
            <div className="py-14">
              <h3 className="m-0 text-xl font-light">{t("emptyTitle")}</h3>
              <p className="mt-2.5 text-sm text-neutral-500">{t("emptyBody")}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
