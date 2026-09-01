# Architecture — Hair Couture Multi-Brand Ecommerce

Three brands, one platform: **Balmain Hair Couture**, **Eloure**, **Eau de 1974**.
Landing = 3-panel brand selector (horizontal split desktop / vertical stack mobile).
Click a panel → enters that brand's shop with its own nav/menu, still on one codebase.

This file is the source of truth. Topic-specific rules live in [skills/](skills/) — read
the relevant one before touching that area. Track work in [progress.md](progress.md).

## Stack

- **Next.js 14+ (App Router)** + React + TypeScript
- **Tailwind CSS** for styling
- **next-intl** for i18n (see skills/i18n.md) — no hardcoded UI strings, ever
- **Auth.js (NextAuth v5)** for authentication (see skills/auth.md)
- **TanStack Query** + a typed `fetch` wrapper for network calls (see skills/networking.md)
- **Zod** for schema validation (forms + API boundaries)

## Route structure (App Router)

```
app/
  [locale]/
    layout.tsx                # html/body, intl + query providers
    page.tsx                  # 3-panel brand landing
    [brand]/                  # dynamic, not 3 hardcoded folders — brand is
      layout.tsx               # data (lib/brands.ts), not routing structure
      page.tsx                 # shop home
      product/[slug]/page.tsx
      cart/page.tsx
      checkout/page.tsx
    account/
    api/                      # route handlers (or externalize to a backend later)
```

One dynamic `[brand]` segment, not three copy-pasted folders: `generateStaticParams`
pre-renders `balmain` / `eloure` / `eau-de-1974` from `lib/brands.ts` at build time,
so it's as static as three folders would be, without the duplication. The brand
layout sets `data-brand` + CSS vars from `lib/brands.ts` for nav/theme; an unknown
slug 404s. Shared shop code (cart, checkout, product card) lives in
`components/shop/*` — don't fork it per brand.

## UI/UX standards

- Mobile-first Tailwind (`sm: md: lg:`), 3 panels = `flex-col lg:flex-row` on the
  landing screen, each panel `h-screen/3 lg:h-screen lg:w-1/3`.
- Every interactive element has a visible focus state and a 44px+ tap target.
- Respect `prefers-reduced-motion` for the panel hover/transition effects.
- Loading and error states are designed, not an afterthought — every data fetch has
  a skeleton and an error UI.
- Images via `next/image`, real `alt` text (localized).

## Auth (summary — full rules in skills/auth.md)

- Auth.js, session in an **httpOnly, secure, sameSite cookie** — never a token in
  localStorage/sessionStorage.
- Server Components/Route Handlers read the session server-side; client only sees
  what it needs via `useSession`.
- Password reset, email verification, and checkout auth all go through the same
  session — no parallel auth path.

## Network calls (summary — full rules in skills/networking.md)

- One typed `apiClient` wrapper (fetch) — no ad hoc `fetch()` scattered in components.
- TanStack Query for all client-side data fetching/caching; Server Components fetch
  directly where possible (no waterfall through the client).
- Every endpoint has a Zod schema for its response; network errors surface a typed
  error, not a thrown string.

## i18n (summary — full rules in skills/i18n.md)

- All copy lives in `messages/<locale>/*.json`, loaded via next-intl.
- No string literals in JSX for anything user-facing (labels, alt text, aria-labels,
  meta, error messages) — component code only references translation keys.
- Locale is in the URL (`/en/...`, `/fr/...`); default locale still gets a prefix or
  a documented exception — decide once, apply everywhere.

## Brand theming

Each brand has its own accent color / logo / font pairing expressed as Tailwind
theme tokens (CSS variables swapped per brand layout), not three duplicated
Tailwind configs. See skills/branding.md.

## What we are NOT building yet

No admin CMS, no multi-currency, no payment provider integration decided — flagged
as open decisions in progress.md, not guessed at in code.
