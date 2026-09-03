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

const LAST_UPDATED = "3 September 2026";

function buildPrivacy(brandName: string, contactEmail: string): LegalDoc {
  return {
    title: "Privacy Policy",
    updated: LAST_UPDATED,
    sections: [
      {
        heading: "Who we are",
        body: `${brandName} is operated under haircouture.al. This policy explains what personal data we collect when you shop with us, why, and what rights you have over it. It is written to align with Albanian Law No. 9887, dated 10 March 2008, "On the Protection of Personal Data" (as amended) — exact citations should be confirmed with Albanian legal counsel before commercial launch.`,
      },
      {
        heading: "What we collect",
        body: "When you place an order, we collect your name, email address, phone number, and shipping address. When you use the contact form, we collect your name, email, and message. When you browse the site, we collect anonymized analytics data (pages visited, approximate location, device type) via Google Analytics.",
      },
      {
        heading: "Marketing and newsletters",
        body: `We may use the email address you provide at checkout or when subscribing to our newsletter to send you order confirmations, and — where you have opted in — marketing communications, product updates, and newsletters from ${brandName}. You can unsubscribe at any time using the link in any marketing email, or by contacting us at ${contactEmail}.`,
      },
      {
        heading: "Who we share it with",
        body: "We share order and contact data with Brevo (Sendinblue), our email delivery provider, solely to send transactional and, where opted in, marketing emails. We share anonymized browsing data with Google Analytics for site analytics. We do not sell your personal data to third parties.",
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
        body: "All prices are shown in EUR and include applicable taxes unless stated otherwise. We reserve the right to refuse or cancel an order, including where a product is listed at an incorrect price or is out of stock after purchase.",
      },
      {
        heading: "Shipping and returns",
        body: "Shipping is free on orders over €75. Returns are accepted within 30 days of delivery for unused items in original packaging, in line with Albanian consumer protection law (Law No. 9902, dated 17 April 2008, \"On Consumer Protection\", as amended). To start a return, contact us using the details on our Contact page.",
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
        body: `This page explains what cookies and similar technologies ${brandName} uses on haircouture.al.`,
      },
      {
        heading: "Your shopping cart",
        body: "Your cart contents and applied coupon are stored in your browser's local storage, not in a cookie. This data never leaves your device unless you place an order, and does not require cookie consent.",
      },
      {
        heading: "Analytics cookies",
        body: "When enabled, Google Analytics (GA4) sets cookies such as _ga, _ga_<container-id>, and _gid to measure site traffic and behavior — which pages are visited, which of our brands is browsed most, and how visitors move through the shop. _ga and _ga_* typically last around 2 years; _gid lasts about 24 hours. Analytics only load once a Measurement ID is configured on the site — if none is configured, no analytics cookies are set.",
      },
      {
        heading: "Managing cookies",
        body: "You can block or delete cookies through your browser settings at any time. A dedicated cookie-consent banner for EU/Albanian visitors is planned but not yet implemented — until then, disabling cookies in your browser is the way to opt out.",
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
