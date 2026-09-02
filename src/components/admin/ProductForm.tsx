"use client";

import { useActionState, useState } from "react";
import { brands, getBrand } from "@/lib/brands";
import type { Product } from "@/lib/data/shop";

type FormState = { error: string } | undefined;
type Action = (prevState: FormState, formData: FormData) => Promise<FormState>;

export function ProductForm({
  action,
  defaultValues,
  defaultBrand,
  categoriesByBrand,
}: {
  action: Action;
  defaultValues?: Product;
  defaultBrand?: string;
  /** Existing categories per brand — select-only, see lib/admin/categories.ts. */
  categoriesByBrand: Record<string, string[]>;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);
  const [brandSlug, setBrandSlug] = useState(defaultBrand ?? brands[0].slug);
  const accent = getBrand(brandSlug)?.colors.accent ?? "#171717";
  const categoryOptions = categoriesByBrand[brandSlug] ?? [];
  const [category, setCategory] = useState(
    defaultValues?.category && categoryOptions.includes(defaultValues.category)
      ? defaultValues.category
      : (categoryOptions[0] ?? ""),
  );

  function handleBrandChange(next: string) {
    setBrandSlug(next);
    const options = categoriesByBrand[next] ?? [];
    if (!options.includes(category)) setCategory(options[0] ?? "");
  }

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
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
        Category
        <select
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={categoryOptions.length === 0}
          className="min-h-11 border border-neutral-300 px-3 text-sm disabled:opacity-50"
        >
          {categoryOptions.length === 0 && <option value="">No categories for this brand yet</option>}
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="text-xs text-neutral-500">
          Only {getBrand(brandSlug)?.slug}&apos;s existing categories — picked from the list, not typed, so a typo
          never creates an accidental duplicate.
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
