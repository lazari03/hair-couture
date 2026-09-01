# Progress

## Done
- [x] Repo initialized
- [x] ARCHITECTURE.md written
- [x] skills/ folder: i18n.md, auth.md, networking.md, branding.md

## Open decisions (flag before assuming)
- [x] Backend/data source: **not decided** — build frontend against mock/local
      data behind `lib/data/*` + the typed api-client now, swap in a real
      backend (headless commerce or custom API) later without touching UI code.
- [ ] Payment provider (Stripe assumed default unless told otherwise).
- [ ] Which locales ship at launch (assuming `en` only until told otherwise).
- [ ] Default locale URL behavior — prefix `/en` always, or bare `/` for default?

## Done (cont.)
- [x] Next.js 16 app scaffolded (TS, App Router, Tailwind, ESLint) — builds clean
- [x] next-intl, TanStack Query, Zod, next-auth installed
- [x] `lib/brands.ts` — structural brand data only (slug, colors); copy lives in messages
- [x] `messages/en.json` — landing, nav, brands namespaces
- [x] `[locale]/layout.tsx` — html/body, NextIntlClientProvider + QueryClientProvider
- [x] Landing page: 3-panel selector, `flex-col lg:flex-row`, click → `/[locale]/[brand]`
- [x] `[brand]/layout.tsx` — dynamic segment (not 3 folders), data-brand + CSS vars,
      404s on unknown slug, `generateStaticParams` pre-renders all 3 brands
- [x] `[brand]/page.tsx` — placeholder shop home

## Next up
- [ ] Shared shop components: product card, cart, checkout skeletons
- [ ] `messages/en.json`: product, checkout, account namespaces
- [ ] Auth.js wired with cookie session, sign-in page
- [ ] api-client (`lib/api-client.ts`) + first Zod schema + TanStack Query hook
      (product list) as the pattern to copy — currently blocked on backend decision
- [ ] cart/checkout/product routes under `[brand]/`
- [ ] Visual pass: real brand colors/logos/fonts (placeholders in lib/brands.ts now)

## Log
- 2026-09-01: Planning docs created (ARCHITECTURE.md, skills/). Scaffolded Next.js
  app, wired i18n/routing/theming/providers, built landing 3-panel + brand shell.
  `npm run build` passes. Backend/data source still undecided — shop pages are
  placeholders until that's picked.
