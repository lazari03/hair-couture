"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { brands } from "@/lib/brands";

const brandSlugs = brands.map((b) => b.slug) as [string, ...string[]];

const productSchema = z.object({
  brand: z.enum(brandSlugs),
  name: z.string().trim().min(1, "Name is required"),
  category: z.string().trim().min(1, "Category is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  badge: z.string().trim().optional(),
  description: z.string().trim().optional(),
  imageUrl: z.string().trim().optional(),
});

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

// Storefront pages read products server-side on every request (no client
// cache to invalidate) — revalidatePath just clears Next's route cache so
// the change shows up immediately instead of on the next natural refetch.
function revalidateStorefront(brand: string) {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/[brand]", "page");
  revalidatePath("/[locale]/[brand]/shop", "page");
  revalidatePath("/[locale]/[brand]/search", "page");
  revalidatePath(`/en/${brand}`);
}

export async function createProduct(_prevState: unknown, formData: FormData) {
  await requireAdmin();
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { badge, description, imageUrl, ...rest } = parsed.data;
  await prisma.product.create({
    data: { ...rest, badge: badge || null, description: description || null, imageUrl: imageUrl || null },
  });
  revalidateStorefront(parsed.data.brand);
  redirect("/admin/products");
}

export async function updateProduct(id: string, _prevState: unknown, formData: FormData) {
  await requireAdmin();
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { badge, description, imageUrl, ...rest } = parsed.data;
  await prisma.product.update({
    where: { id },
    data: { ...rest, badge: badge || null, description: description || null, imageUrl: imageUrl || null },
  });
  revalidateStorefront(parsed.data.brand);
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const product = await prisma.product.delete({ where: { id } });
  revalidateStorefront(product.brand);
  redirect("/admin/products");
}
