"use client";

import { useRouter } from "@/i18n/navigation";

interface ShopFiltersProps {
  brandSlug: string;
  counts: Record<string, number>;
  category?: string;
  sort?: string;
  labels: {
    category: string;
    allCategories: string;
    sortBy: string;
    sortNewest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
  };
}

// Two selects in one row instead of the full stacked link lists — the
// desktop sidebar lists stay as-is (md:hidden here), this is mobile-only.
export function ShopFilters({ brandSlug, counts, category, sort, labels }: ShopFiltersProps) {
  const router = useRouter();

  function navigate(nextCategory: string, nextSort: string) {
    const params = new URLSearchParams();
    if (nextCategory) params.set("category", nextCategory);
    if (nextSort) params.set("sort", nextSort);
    const query = params.toString();
    router.push(`/${brandSlug}/shop${query ? `?${query}` : ""}`);
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 md:hidden">
      <select
        aria-label={labels.category}
        value={category ?? ""}
        onChange={(e) => navigate(e.target.value, sort ?? "")}
        className="min-h-10 rounded border border-neutral-300 bg-white px-2.5 text-[13px] text-neutral-700 outline-none focus:border-neutral-900"
      >
        <option value="">{labels.allCategories}</option>
        {Object.entries(counts).map(([name, count]) => (
          <option key={name} value={name}>
            {name} ({count})
          </option>
        ))}
      </select>

      <select
        aria-label={labels.sortBy}
        value={sort ?? ""}
        onChange={(e) => navigate(category ?? "", e.target.value)}
        className="min-h-10 rounded border border-neutral-300 bg-white px-2.5 text-[13px] text-neutral-700 outline-none focus:border-neutral-900"
      >
        <option value="">{labels.sortNewest}</option>
        <option value="price-asc">{labels.sortPriceAsc}</option>
        <option value="price-desc">{labels.sortPriceDesc}</option>
      </select>
    </div>
  );
}
