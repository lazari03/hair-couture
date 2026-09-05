"use client";

import { useActionState, useState } from "react";
import { brands, getBrand } from "@/lib/brands";
import type { ProductModel } from "@/generated/prisma/models";
import { parseProductCategories } from "@/lib/product-categories";

type FormState = { error: string } | undefined;
type Action = (prevState: FormState, formData: FormData) => Promise<FormState>;

export function ProductForm({
  action,
  defaultValues,
  defaultBrand,
  categoriesByBrand,
}: {
  action: Action;
  defaultValues?: ProductModel;
  defaultBrand?: string;
  /** Existing categories per brand — select-only, see lib/admin/categories.ts. */
  categoriesByBrand: Record<string, string[]>;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);
  const [brandSlug, setBrandSlug] = useState(defaultBrand ?? brands[0].slug);
  const accent = getBrand(brandSlug)?.colors.accent ?? "#171717";
  const categoryOptions = categoriesByBrand[brandSlug] ?? [];
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const existing = parseProductCategories(defaultValues?.category ?? "").filter((c) => categoryOptions.includes(c));
    return existing.length > 0 ? existing : (categoryOptions[0] ? [categoryOptions[0]] : []);
  });

  function handleBrandChange(next: string) {
    setBrandSlug(next);
    const options = categoriesByBrand[next] ?? [];
    setSelectedCategories((prev) => {
      const nextSelected = prev.filter((c) => options.includes(c));
      return nextSelected.length > 0 ? nextSelected : (options[0] ? [options[0]] : []);
    });
  }

  function toggleCategory(category: string, checked: boolean) {
    setSelectedCategories((prev) => {
      if (checked) return Array.from(new Set([...prev, category]));
      const next = prev.filter((c) => c !== category);
      return next;
    });
  }

  return (
    <form action={formAction} className="flex w-full max-w-2xl flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Brand
        <select
          name="brand"
          required
          value={brandSlug}
          onChange={(e) => handleBrandChange(e.target.value)}
          className="min-h-11 border border-neutral-300 px-3 text-sm"
        >
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.slug}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Name
        <input
          name="name"
          required
          defaultValue={defaultValues?.name}
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Categories
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {categoryOptions.map((c) => {
            const checked = selectedCategories.includes(c);
            return (
              <label
                key={c}
                className={`flex min-h-11 cursor-pointer items-center gap-2 rounded border px-3 text-sm ${
                  checked ? "border-neutral-900 bg-neutral-50" : "border-neutral-300"
                }`}
              >
                <input
                  type="checkbox"
                  name="categories"
                  value={c}
                  checked={checked}
                  onChange={(e) => toggleCategory(c, e.target.checked)}
                  className="h-4 w-4 accent-neutral-900"
                />
                <span>{c}</span>
              </label>
            );
          })}
          {categoryOptions.length === 0 && (
            <div className="min-h-11 rounded border border-neutral-200 px-3 py-2 text-sm text-neutral-500">
              No categories for this brand yet
            </div>
          )}
        </div>
        <span className="text-xs text-neutral-500">
          Select one or more categories. &quot;Sale&quot; is available for every brand.
        </span>
        <span className="text-xs text-red-600" aria-live="polite">
          {selectedCategories.length === 0 ? "Pick at least one category" : ""}
        </span>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Price (EUR)
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          required
          defaultValue={defaultValues?.price}
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Stock
        <input
          name="stock"
          type="number"
          step="1"
          min="0"
          required
          defaultValue={defaultValues?.stock ?? 0}
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
        <span className="text-xs text-neutral-500">
          Units in stock. Decrements automatically as real orders come in; hits 0 → shows as sold out on the
          storefront.
        </span>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Badge (optional)
        <input
          name="badge"
          defaultValue={defaultValues?.badge ?? ""}
          placeholder="New, Limited, Refill…"
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Description (optional)
        <textarea
          name="description"
          rows={4}
          defaultValue={defaultValues?.description ?? ""}
          placeholder="Shown on the product page — falls back to a generic placeholder if left blank"
          className="border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Image URL (optional)
        <input
          name="imageUrl"
          defaultValue={defaultValues?.imageUrl ?? ""}
          placeholder="/assets/products/… or a full https:// URL"
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
        <span className="text-xs text-neutral-500">
          Falls back to a shared placeholder photo for the category if left blank.
        </span>
      </label>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        style={{ backgroundColor: accent }}
        className="mt-2 min-h-11 cursor-pointer text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
