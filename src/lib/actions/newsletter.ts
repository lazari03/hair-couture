"use server";

import { z } from "zod";
import { getBrand } from "@/lib/brands";
import { subscribeNewsletter } from "@/lib/email";

// Kept separate from contact.ts — different form/entity, one concern per
// file, matching the rest of src/lib/actions/*.
const emailSchema = z.string().trim().email("Enter a valid email");

export type NewsletterResult = { ok: true } | { ok: false; error: string };

export async function subscribeToNewsletter(email: string, brand: string): Promise<NewsletterResult> {
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const resolvedBrand = getBrand(brand);
  if (!resolvedBrand) return { ok: false, error: "Invalid brand" };

  await subscribeNewsletter(parsed.data, resolvedBrand.slug);
  return { ok: true };
}
