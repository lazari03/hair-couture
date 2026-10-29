// Order confirmation emails — one template per brand (logo, colours, type,
// layout), all fed the same data. Copy comes from messages/<locale>.json
// ("email" namespace) in the language the customer checked out in. Every
// customer-typed value is HTML-escaped before it goes into the markup.
// Logos are PNG (public/assets/logos/email/*.png): Gmail/Outlook don't
// render SVG. Images need absolute URLs, hence SITE_URL.

import { getTranslations } from "next-intl/server";
import type { BrandSlug } from "@/lib/brands";
import { formatMoney } from "@/lib/money";

export interface OrderEmailData {
  number: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  subtotal: number;
  discount: number;
  couponCode: string | null;
  shippingClassName: string;
  shippingFee: number;
  total: number;
  items: { name: string; variant: string; price: number; qty: number }[];
}

const SITE_URL = (process.env.SITE_URL || "https://haircouture.al").replace(/\/$/, "");

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// What makes each brand's email its own. Layout pieces below read these.
interface BrandTheme {
  name: string;
  logo: { src: string; width: number; height: number };
  headerBg: string; // logo sits on this
  pageBg: string;
  accent: string; // order number, headings, total
  text: string;
  muted: string;
  border: string;
  headingFont: string;
  bodyFont: string;
  headingTransform: "uppercase" | "none";
  headingSpacing: string;
}

const themes: Record<BrandSlug, BrandTheme> = {
  // Black couture header, white wordmark, serif uppercase headings.
  balmain: {
    name: "Balmain Hair Couture",
    logo: { src: "/assets/logos/email/balmain.png", width: 127, height: 64 },
    headerBg: "#000000",
    pageBg: "#f5f5f5",
    accent: "#000000",
    text: "#111111",
    muted: "#6b6b6b",
    border: "#e5e5e5",
    headingFont: "Georgia, 'Times New Roman', serif",
    bodyFont: "Helvetica, Arial, sans-serif",
    headingTransform: "uppercase",
    headingSpacing: "0.12em",
  },
  // Clean white header with the blue mark; Éloure blue accents on cream.
  eloure: {
    name: "Éloure",
    logo: { src: "/assets/logos/email/eloure.png", width: 166, height: 44 },
    headerBg: "#ffffff",
    pageBg: "#f7f5f0",
    accent: "#000ea7",
    text: "#14163a",
    muted: "#5d6080",
    border: "#e3e1f0",
    headingFont: "Georgia, 'Times New Roman', serif",
    bodyFont: "Helvetica, Arial, sans-serif",
    headingTransform: "none",
    headingSpacing: "0",
  },
  // Sunset-orange header with the white logo; warm sand page.
  "eau-de-1974": {
    name: "Eau de 1974",
    logo: { src: "/assets/logos/email/eau-de-1974.png", width: 188, height: 40 },
    headerBg: "#f15a25",
    pageBg: "#fbf3ec",
    accent: "#f15a25",
    text: "#2b1a12",
    muted: "#8a6f60",
    border: "#f1dccd",
    headingFont: "Georgia, 'Times New Roman', serif",
    bodyFont: "Helvetica, Arial, sans-serif",
    headingTransform: "none",
    headingSpacing: "0",
  },
};

export function brandDisplayName(brand: BrandSlug): string {
  return themes[brand].name;
}

export async function renderOrderConfirmation(
  brand: BrandSlug,
  order: OrderEmailData,
  locale: string,
  contactEmail: string,
): Promise<{ subject: string; html: string }> {
  const t = await getTranslations({ locale, namespace: "email" });
  const theme = themes[brand];
  const e = escapeHtml;

  const heading = (text: string) =>
    `<h2 style="margin:0 0 12px;font-family:${theme.headingFont};font-weight:normal;font-size:17px;color:${theme.accent};text-transform:${theme.headingTransform};letter-spacing:${theme.headingSpacing}">${text}</h2>`;
  const row = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:6px 0;color:${theme.muted}">${label}</td><td style="padding:6px 0;text-align:right;${strong ? `font-weight:bold;font-size:17px;color:${theme.accent}` : ""}">${value}</td></tr>`;

  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(order.createdAt);
  const name = `${order.firstName} ${order.lastName}`;
  const addressLines = [order.address, [order.postalCode, order.city].filter(Boolean).join(" "), order.country]
    .map((l) => l.trim())
    .filter(Boolean)
    .map(e)
    .join("<br>");

  const items = order.items
    .map(
      (i) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid ${theme.border}">${e(i.name)}${i.variant ? ` <span style="color:${theme.muted}">(${e(i.variant)})</span>` : ""}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${theme.border};text-align:center;color:${theme.muted};white-space:nowrap">× ${i.qty}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${theme.border};text-align:right;white-space:nowrap">${formatMoney(i.price * i.qty)}</td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="${e(locale)}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(t("subject", { brand: theme.name }))}</title></head>
<body style="margin:0;padding:0;background:${theme.pageBg}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${theme.pageBg}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;font-family:${theme.bodyFont};font-size:14px;line-height:1.55;color:${theme.text}">
  <tr><td align="center" style="background:${theme.headerBg};padding:28px 24px;border-bottom:1px solid ${theme.border}">
    <img src="${SITE_URL}${theme.logo.src}" width="${theme.logo.width}" height="${theme.logo.height}" alt="${e(theme.name)}" style="display:block;border:0">
  </td></tr>
  <tr><td style="padding:32px 32px 8px">
    <h1 style="margin:0 0 16px;font-family:${theme.headingFont};font-weight:normal;font-size:24px;color:${theme.text};text-transform:${theme.headingTransform};letter-spacing:${theme.headingSpacing}">${e(t("title"))}</h1>
    <p style="margin:0 0 12px">${e(t("greeting", { name: order.firstName }))}</p>
    <p style="margin:0 0 20px">${e(t("intro", { brand: theme.name }))}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${theme.border}">
      <tr>
        <td style="padding:14px 16px"><div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${theme.muted}">${e(t("orderNumber"))}</div><div style="font-size:20px;font-weight:bold;color:${theme.accent}">#${order.number}</div></td>
        <td style="padding:14px 16px;text-align:right"><div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${theme.muted}">${e(t("date"))}</div><div>${e(date)}</div></td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:24px 32px 8px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td valign="top" width="50%" style="padding-right:12px">
        ${heading(e(t("customerTitle")))}
        <div>${e(name)}</div>
        <div><a href="mailto:${e(order.email)}" style="color:${theme.text}">${e(order.email)}</a></div>
        <div>${e(t("phone"))}: ${e(order.phone)}</div>
      </td>
      <td valign="top" width="50%" style="padding-left:12px">
        ${heading(e(t("addressTitle")))}
        <div>${e(name)}</div>
        <div>${addressLines}</div>
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:24px 32px 8px">
    ${heading(e(t("itemsTitle")))}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px">
      ${row(e(t("subtotal")), formatMoney(order.subtotal))}
      ${order.discount > 0 ? row(e(order.couponCode ? t("discountCode", { code: order.couponCode }) : t("discount")), `-${formatMoney(order.discount)}`) : ""}
      ${row(e(order.shippingClassName ? t("shippingClass", { name: order.shippingClassName }) : t("shipping")), order.shippingFee > 0 ? formatMoney(order.shippingFee) : e(t("free")))}
      ${row(e(t("total")), formatMoney(order.total), true)}
    </table>
    <p style="margin:12px 0 0;color:${theme.muted}">${e(t("payment"))}</p>
  </td></tr>
  <tr><td style="padding:28px 32px 32px">
    <p style="margin:0 0 6px">${e(t("thanks"))}</p>
    <p style="margin:0;color:${theme.muted}">${e(t("questions"))} <a href="mailto:${e(contactEmail)}" style="color:${theme.accent}">${e(contactEmail)}</a></p>
  </td></tr>
  <tr><td align="center" style="padding:18px 24px;border-top:1px solid ${theme.border};font-size:12px;color:${theme.muted}">
    © ${order.createdAt.getFullYear()} ${e(theme.name)} · <a href="${SITE_URL}" style="color:${theme.muted}">${e(SITE_URL.replace(/^https?:\/\//, ""))}</a>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject: t("subject", { brand: theme.name }), html };
}
