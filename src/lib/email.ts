// Shared Brevo (Sendinblue) integration — order confirmations, contact-form
// notifications, and newsletter signups all go through this one module.
// BREVO_API_KEY starts empty (the user supplies a real key later, same
// pattern as ADMIN_PASSWORD_HASH_B64) — every function below guards on it
// and never throws past its own try/catch, so a missing key or a delivery
// failure can never break checkout, the contact form, or newsletter signup.
// Plain fetch against Brevo's REST API — no SDK dependency, matching the
// rest of this repo (no HTTP client beyond native fetch anywhere).

import type { BrandSlug } from "@/lib/brands";
import { getFooter } from "@/lib/data/footer";

const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

interface SendEmailOptions {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
}

async function sendTransactionalEmail(opts: SendEmailOptions): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.log("[email] BREVO_API_KEY unset, skipping send:", opts.subject);
    return;
  }
  try {
    const res = await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        sender: {
          email: process.env.BREVO_SENDER_EMAIL || "no-reply@haircouture.al",
          name: process.env.BREVO_SENDER_NAME || "Hair Couture",
        },
        ...opts,
      }),
    });
    if (!res.ok) {
      console.error("[email] Brevo send failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[email] Brevo send threw:", err);
  }
}

interface OrderForEmail {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  total: number;
  items: { name: string; variant: string; price: number; qty: number }[];
}

// Order confirmation — brand-themed by name/accent color from lib/brands.ts
// and messages, sent to whatever the guest typed at checkout (there is no
// logged-in customer identity to derive it from — checkout is guest-only).
export async function sendOrderConfirmation(order: OrderForEmail, brandSlug: string): Promise<void> {
  const footer = getFooter(brandSlug);
  const brandName = brandNameFor(brandSlug as BrandSlug);
  const itemsHtml = order.items
    .map((i) => `<tr><td>${i.name} (${i.variant}) × ${i.qty}</td><td style="text-align:right">€${(i.price * i.qty).toFixed(2)}</td></tr>`)
    .join("");

  await sendTransactionalEmail({
    to: [{ email: order.email, name: `${order.firstName} ${order.lastName}` }],
    subject: `Your ${brandName} order ${order.id} is confirmed`,
    htmlContent: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
        <h1 style="font-weight:300">${brandName}</h1>
        <p>Hi ${order.firstName}, thank you for your order <strong>${order.id}</strong>.</p>
        <table style="width:100%;border-collapse:collapse">${itemsHtml}</table>
        <p style="text-align:right;font-weight:bold">Total: €${order.total.toFixed(2)}</p>
        <p style="color:#666;font-size:13px">Questions? Contact us at ${footer?.contactEmail ?? "info@haircouture.al"}.</p>
      </div>
    `,
  });
}

export async function sendContactNotification(data: { brand: string; name: string; email: string; message: string }): Promise<void> {
  const footer = getFooter(data.brand);
  const to = footer?.contactEmail ?? "info@haircouture.al";
  await sendTransactionalEmail({
    to: [{ email: to }],
    subject: `New contact message — ${brandNameFor(data.brand as BrandSlug)}`,
    htmlContent: `
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Brand:</strong> ${data.brand}</p>
      <p>${data.message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}

export async function subscribeNewsletter(email: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_NEWSLETTER_LIST_ID;
  if (!apiKey || !listId) {
    console.log("[email] Brevo not configured, skipping newsletter add:", email);
    return;
  }
  try {
    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({ email, listIds: [Number(listId)], updateEnabled: true }),
    });
    if (!res.ok) {
      console.error("[email] Brevo newsletter add failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[email] Brevo newsletter add threw:", err);
  }
}

function brandNameFor(slug: BrandSlug): string {
  const names: Record<BrandSlug, string> = {
    balmain: "Balmain Hair Couture",
    eloure: "Eloure",
    "eau-de-1974": "Eau de 1974",
  };
  return names[slug] ?? slug;
}
