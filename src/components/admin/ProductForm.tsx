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

  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleImageFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("brand", brandSlug);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      setImageUrl(data.url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

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
        Price (ALL)
        <input
          name="price"
          type="number"
          step="1"
          min="0"
          required
          defaultValue={defaultValues?.price}
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
      </label>

<label className="flex min-h-11 cursor-pointer items-center gap-3 rounded border border-neutral-300 px-3 text-sm">
        <input
          type="checkbox"
          name="inStock"
          defaultChecked={defaultValues?.inStock ?? true}
          className="h-4 w-4 accent-neutral-900"
        />
        <span>
          In stock
          <span className="block text-xs text-neutral-500">
            Untick to mark it out of stock: it shows an &quot;Out of stock&quot; label in the shop and can&apos;t be
            added to the cart.
          </span>
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

      <div className="flex flex-col gap-1.5 text-sm">
        Image
        <div className="flex items-start gap-4">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden border border-neutral-200 bg-neutral-50">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- admin preview of an arbitrary URL
              <img src={imageUrl} alt="" className="h-full w-full object-contain" />
            ) : (
              <span className="px-2 text-center text-xs text-neutral-400">No image</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              className={`inline-flex min-h-10 cursor-pointer items-center justify-center border border-neutral-900 px-4 text-sm hover:bg-neutral-900 hover:text-white ${
                uploading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {uploading ? "Uploading…" : "Upload from computer"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                className="sr-only"
                onChange={(e) => {
                  handleImageFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="cursor-pointer self-start text-xs text-neutral-500 underline hover:text-neutral-900"
              >
                Remove image
              </button>
            )}
            <span className="text-xs text-neutral-500">JPG, PNG, WebP, AVIF or GIF, up to 10 MB.</span>
            {uploadError && <span className="text-xs text-red-600">{uploadError}</span>}
          </div>
        </div>
        <input
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="/assets/products/… or a full https:// URL"
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
        <span className="text-xs text-neutral-500">
          Upload a file or paste a URL. Falls back to a shared placeholder photo for the category if left blank.
          Click Save to apply.
        </span>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending || uploading}
        style={{ backgroundColor: accent }}
        className="mt-2 min-h-11 cursor-pointer text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
