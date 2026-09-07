"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const shippingClassSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  fee: z.coerce.number().nonnegative("Fee can't be negative"),
  sortOrder: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(false),
});

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

// Checkout reads active shipping classes only — this is the one function
// shared with the storefront (lib/actions/orders.ts), everything else here
// is admin-only.
export async function getActiveShippingClasses() {
  return prisma.shippingClass.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function createShippingClass(_prevState: unknown, formData: FormData) {
  await requireAdmin();
  const parsed = shippingClassSchema.safeParse({
    ...Object.fromEntries(formData),
    active: formData.get("active") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await prisma.shippingClass.create({ data: parsed.data });
  revalidatePath("/admin/shipping");
  redirect("/admin/shipping");
}

export async function updateShippingClass(id: string, _prevState: unknown, formData: FormData) {
  await requireAdmin();
  const parsed = shippingClassSchema.safeParse({
    ...Object.fromEntries(formData),
    active: formData.get("active") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await prisma.shippingClass.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/shipping");
  redirect("/admin/shipping");
}

export async function deleteShippingClass(id: string) {
  await requireAdmin();
  await prisma.shippingClass.delete({ where: { id } });
  revalidatePath("/admin/shipping");
  redirect("/admin/shipping");
}
