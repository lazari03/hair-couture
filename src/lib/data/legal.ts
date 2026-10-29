// Per-brand legal document bodies (Privacy Policy, Terms of Service,
// Cookies). Split from footer.ts because it's long-form content, not link
// data — generated once from shared builder functions so the Albanian-law
// boilerplate is written a single time and only the brand name/entity/
// contact email are interpolated per brand, rather than 3x duplicated.
//
// IMPORTANT: this is template legal content, not legal advice. Citations
// (law numbers/titles) are given in good faith but have NOT been verified
// by an Albanian lawyer — have counsel review before relying on this
// commercially, especially before real customer data is collected.
//
// UI chrome (headings like "Back to shop", "Last updated") lives in
// messages/<locale>.json under "legal" per skills/i18n.md — only the
// document body text below is per-brand, non-localized content (same
// treatment product.description already gets).

import type { BrandSlug } from "@/lib/brands";
import { CONTACT_EMAIL } from "./footer";

export type LegalDocType = "privacy" | "terms" | "cookies";

export interface LegalDoc {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

const LAST_UPDATED = "30 October 2026";

function buildPrivacy(brandName: string, contactEmail: string): LegalDoc {
  return {
    title: "Privacy Policy",
    updated: LAST_UPDATED,
    sections: [
      {
        heading: "Who we are",
        body: `${brandName} is operated under haircouture.al, a shop for customers in Albania only. This policy explains what personal data we collect when you shop with us, why, and what rights you have over it. It is written to align with Albanian Law No. 9887, dated 10 March 2008, "On the Protection of Personal Data" (as amended) — exact citations should be confirmed with Albanian legal counsel before commercial launch.`,
      },
      {
        heading: "What we collect",
        body: "When you place an order, we collect your name, email address, phone number, and shipping address. When you use the contact form, we collect your name, email, and message. When you browse the site, we measure how it is used with Google Analytics: pages visited, products viewed, items added to the cart, checkouts and purchases, searches, scroll depth, approximate location (city level) and device type. If you accept analytics cookies, this measurement uses cookies so that repeat visits can be recognised. If you decline or do not respond, we still measure visits, but without cookies or any identifier stored on your device, so your visits cannot be linked to each other or to you.",
      },
      {
        heading: "Marketing and newsletters",
        body: `We may use the email address you provide at checkout or when subscribing to our newsletter to send you order confirmations, and — where you have opted in — marketing communications, product updates, and newsletters from ${brandName}. You can unsubscribe at any time using the link in any marketing email, or by contacting us at ${contactEmail}.`,
      },
      {
        heading: "Who we share it with",
        body: "We share order and contact data with Brevo (Sendinblue), our email delivery provider, solely to send transactional and, where opted in, marketing emails. We share browsing data with Google Analytics (Google Ireland Ltd / Google LLC) for site analytics, with IP addresses not stored by Google Analytics. We do not sell your personal data to third parties.",
      },
      {
        heading: "How long we keep it",
        body: "Order records are kept for as long as needed for accounting, warranty, and legal purposes. Contact form submissions are kept until resolved and for a reasonable period after. You may request earlier deletion where not otherwise required by law.",
      },
      {
        heading: "Your rights",
        body: `Under Albanian data protection law, you have the right to access, rectify, or request erasure of your personal data, and to object to or restrict certain processing (including marketing). To exercise these rights, contact us at ${contactEmail}.`,
      },
    ],
  };
}

function buildTerms(brandName: string): LegalDoc {
  return {
    title: "Terms of Service",
    updated: LAST_UPDATED,
    sections: [
      {
        heading: "Acceptance",
        body: `By placing an order with ${brandName} through haircouture.al, you agree to these Terms of Service and to our Privacy Policy.`,
      },
      {
        heading: "Orders and payment",
        body: "All prices are shown in Albanian Lek (ALL) and include applicable taxes unless stated otherwise. We reserve the right to refuse or cancel an order, including where a product is listed at an incorrect price or is out of stock after purchase.",
      },
      {
        heading: "Albania only",
        body: "This shop is intended only for customers in Albania. Orders are accepted for delivery to addresses in the Republic of Albania only; we do not ship abroad. Prices are in Albanian Lek (ALL) and payment is made in cash on delivery.",
      },
      {
        heading: "Governing law",
        body: `These Terms are governed by the laws of the Republic of Albania. Any dispute arising from your use of the site or an order shall be subject to the exclusive jurisdiction of the competent Albanian courts, without prejudice to any mandatory consumer-protection rights you may have.`,
      },
      {
        heading: "A note on this document",
        body: "This is a template Terms of Service and has not been reviewed by a lawyer. Have Albanian legal counsel confirm all citations and clauses before relying on it commercially.",
      },
    ],
  };
}

function buildCookies(brandName: string): LegalDoc {
  return {
    title: "Cookies Policy",
    updated: LAST_UPDATED,
    sections: [
      {
        heading: "What this page covers",
        body: `This page explains what cookies and similar technologies ${brandName} uses on haircouture.al, a shop for customers in Albania.`,
      },
      {
        heading: "Your shopping cart",
        body: "Your cart contents and applied coupon are stored in your browser's local storage, not in a cookie. This data never leaves your device unless you place an order, and does not require cookie consent.",
      },
      {
        heading: "Analytics cookies",
        body: "If you accept, Google Analytics (GA4) sets cookies such as _ga and _ga_<container-id> to measure site traffic and behaviour — which pages are visited, which of our brands is browsed most, how visitors move through the shop, and whether a visitor has been here before. _ga and _ga_* last up to 2 years.",
      },
      {
        heading: "Measurement without cookies",
        body: "If you decline, or do not respond to the banner, no analytics cookies are set and nothing is stored on your device for analytics. We still measure how the site is used — page views, product views, cart and checkout steps, purchases, searches and scrolling — through Google's Consent Mode, which sends these events without cookies or a visitor identifier. Your visits cannot be linked to each other or to you; Google uses the combined data to estimate overall site usage.",
      },
      {
        heading: "Managing cookies",
        body: "A cookie banner is shown on your first visit and again a day after you answer. Accept enables analytics cookies; Decline keeps them off and limits measurement to the cookie-free mode described above. You can change your mind at any time by clearing this site's data in your browser settings, which brings the banner back on your next visit.",
      },
    ],
  };
}

const legalMeta: Record<BrandSlug, Record<LegalDocType, LegalDoc>> = {
  balmain: {
    privacy: buildPrivacy("Balmain Hair Couture", CONTACT_EMAIL),
    terms: buildTerms("Balmain Hair Couture"),
    cookies: buildCookies("Balmain Hair Couture"),
  },
  eloure: {
    privacy: buildPrivacy("Eloure", CONTACT_EMAIL),
    terms: buildTerms("Eloure"),
    cookies: buildCookies("Eloure"),
  },
  "eau-de-1974": {
    privacy: buildPrivacy("Eau de 1974", CONTACT_EMAIL),
    terms: buildTerms("Eau de 1974"),
    cookies: buildCookies("Eau de 1974"),
  },
};

export function getLegalDoc(slug: string, type: string): LegalDoc | undefined {
  return legalMeta[slug as BrandSlug]?.[type as LegalDocType];
}
