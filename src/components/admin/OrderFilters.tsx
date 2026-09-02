"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { brands } from "@/lib/brands";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "pending", label: "New" },
  { value: "in_progress", label: "In progress" },
  { value: "fulfilled", label: "Done" },
];

// Two native selects instead of two rows of colored pill buttons — fewer
// elements on screen, no wall of color, and selects already stack cleanly
// on mobile with zero extra responsive work.
export function OrderFilters({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: "status" | "brand", value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/admin/orders${next.toString() ? `?${next}` : ""}`);
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <select
        value={searchParams.get("status") ?? ""}
        onChange={(e) => update("status", e.target.value)}
        className="min-h-9 rounded border border-neutral-300 bg-white px-2.5 text-sm text-neutral-700 outline-none focus:border-neutral-900"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("brand") ?? ""}
        onChange={(e) => update("brand", e.target.value)}
        className="min-h-9 rounded border border-neutral-300 bg-white px-2.5 text-sm text-neutral-700 outline-none focus:border-neutral-900"
      >
        <option value="">All brands</option>
        {brands.map((b) => (
          <option key={b.slug} value={b.slug}>
            {b.slug}
          </option>
        ))}
      </select>

      <span className="text-sm text-neutral-400">
        {count} {count === 1 ? "order" : "orders"}
      </span>
    </div>
  );
}
