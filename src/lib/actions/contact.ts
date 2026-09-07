"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";

// Public action — no requireAdmin, matches orders.ts's {ok,error} shape.
// Persisted to Prisma independently of email delivery so nothing is lost
// while BREVO_API_KEY is unset (see prisma/schema.prisma's ContactMessage
// model comment).
// Error values are message keys (messages/<locale>.json "errors" namespace) — see orders.ts.
const contactSchema = z.object({
  brand: z.string().min(1),
  name: z.string().trim().min(1, "nameRequired"),
  email: z.string().trim().email("emailInvalid"),
  message: z.string().trim().min(1, "messageRequired"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  await prisma.contactMessage.create({ data: parsed.data });
  await sendContactNotification(parsed.data);

  return { ok: true };
}
