"use client";

import { useActionState } from "react";
import { brands } from "@/lib/brands";
import type { Product } from "@/lib/data/shop";

type FormState = { error: string } | undefined;
type Action = (prevState: FormState, formData: FormData) => Promise<FormState>;

export function ProductForm({
  action,
  defaultValues,
  defaultBrand,
}: {
  action: Action;
  defaultValues?: Product;
  defaultBrand?: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Brand
        <select
          name="brand"
          required
          defaultValue={defaultBrand ?? brands[0].slug}
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
        <input
          name="category"
          required
          defaultValue={defaultValues?.category}
          placeholder="e.g. Hair Care — type a new one to create it"
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
        <span className="text-xs text-neutral-500">
          Free text — any value you type becomes a filterable category on the storefront.
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
        Badge (optional)
        <input
          name="badge"
          defaultValue={defaultValues?.badge ?? ""}
          placeholder="New, Limited, Refill…"
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
      </label>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 min-h-11 cursor-pointer bg-neutral-900 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
