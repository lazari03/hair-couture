# Progress

## Done
- [x] Repo initialized
- [x] ARCHITECTURE.md written
- [x] skills/ folder: i18n.md, auth.md, networking.md, branding.md

## Open decisions (flag before assuming)
- [x] Backend/data source: **decided (2026-09-01)** — SQLite + Prisma for
      products, behind the same `lib/data/shop.ts` functions the storefront
      already called. Swap to hosted Postgres later (one-line datasource
      change) if this ever runs on serverless hosting — SQLite is a local
      file, not viable on Vercel-style deploys.
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

## Done (cont. 2)
- [x] Implemented `Shop.dc.html` design (claude.ai/design project
      `8fd5601e-1281-4301-85c9-078470d52c82`) into real routes:
  - `[brand]/page.tsx` — hero (3 variants, one per brand) + featured grid
  - `[brand]/shop/page.tsx` — listing, category filter + sort via searchParams
  - `[brand]/product/[slug]/page.tsx` — detail, gallery, size + add-to-cart
  - `[brand]/cart/page.tsx` — client cart (qty, remove), shared across brands
  - `[brand]/account/page.tsx` — static mock account (needs Auth.js)
  - `[brand]/search/page.tsx` — client-side filter over the brand's products
- [x] `lib/data/shop.ts` — mock shop content (hero/products/account), typed,
      swappable for a real backend without touching the pages above
- [x] `lib/cart/cart-context.tsx` — client cart, localStorage-persisted
- [x] `lib/money.ts` — Intl currency formatting (EUR fixed, locale-aware)
- [x] `messages/en.json` — shop/product/cart/account/search/footer namespaces
- [x] `npm run build` and `npm run lint` both pass; all 9 routes smoke-tested 200

## Done (cont. 3)
- [x] Real images wired in: 12 placeholder stock photos downloaded to
      `public/assets/hero/*.jpg` (3, one per brand) and `public/assets/products/*.jpg`
      (9, one per category) — via `next/image` in Hero, ProductCard, product detail
      gallery, and cart line thumbnails. Source: picsum.photos (Unsplash-sourced,
      free license), seeded for determinism. Swap for licensed brand/product
      photography later — `lib/data/shop.ts`'s `image`/`categoryImage()` are the
      only places that need to change.

## Done (cont. 4)
- [x] Eau de 1974's hero is a real `<video>` now (`public/assets/hero/eau-de-1974.mp4`,
      autoplay/loop/muted/playsInline, poster = the jpg), not the pan-animated still
      image — `HeroContent.video` is optional so only that brand's "video" variant
      uses it. `motion-reduce` users get the static poster image instead of the video.

## Done (cont. 5)
- [x] Landing page's 3-panel divider now shows each brand's real hero imagery
      too (was a flat accent-color block) — Balmain/Eloure use their hero jpg,
      Eau de 1974 plays its hero video, all with a brand-accent tint overlay
      so the panel text stays legible. Same `motion-reduce` fallback as the
      brand hero itself.

## Done (cont. 6)
- [x] Balmain's nav/categories now mirror balmainhair.com's real menu
      (fetched live 2026-09-01): Bestsellers, New, Hair Care, Hair Accessories,
      Styling Tools, Gifts, Outlet — matches, unchanged: entirely data-driven
      via `lib/data/shop.ts`'s `menu`/`products[].category`, nothing hardcoded
      in a component. Bestsellers/New/Gifts/Outlet are curated views with no
      dedicated category (same as the live site) — `[brand]/layout.tsx` now
      only appends `?category=` when the nav item matches an actual product
      category, otherwise links to the unfiltered shop.
  - Reassigned Balmain's mock products from "Extensions" to "Hair Care" /
    "Hair Accessories" / "Styling Tools" to fit the real category set.
  - Added `public/assets/products/hair-accessories.jpg`, removed the now-unused
    `extensions.jpg`.

## Done (cont. 7)
- [x] Eloure's nav/categories now mirror maisoneloure.com's real menu (fetched
      live 2026-09-01): New, Bestsellers, Care Collection, Styling Collection,
      Shop by Hairtype, Treatments & Sets — same pattern as Balmain: New/
      Bestsellers/Shop by Hairtype are curated (no `?category=` filter, link
      to unfiltered shop), Care Collection/Styling Collection/Treatments & Sets
      are the real filterable categories, all still data-driven via
      `lib/data/shop.ts`, nothing hardcoded in a component.
  - Reassigned Eloure's mock products off Rituals/Refills/Shop All onto the
    3 real categories. Added `care-collection.jpg`, `styling-collection.jpg`,
    `treatments-sets.jpg`; removed the now-unused `rituals.jpg`/`refills.jpg`
    (`shop-all.jpg` stays — it's `categoryImage()`'s fallback for any
    unmapped category).

## Done (cont. 8)
- [x] Eau de 1974's nav/categories now mirror eaude1974.com's real menu
      (fetched live 2026-09-01): EAU de Capri/Hamptons/Santorini (curated
      fragrance collections, unfiltered shop link) + Sensorial Hair Care/
      Beauty/Lifestyle (the real filterable categories). Remapped its 8 mock
      products onto the new categories, added a 9th (`f9`, Sensorial Hair
      Care) so that category isn't empty. Added `sensorial-hair-care.jpg`,
      `sensorial-beauty.jpg`, `sensorial-lifestyle.jpg`; removed the unused
      `fragrance.jpg`/`discovery.jpg`/`home.jpg`.
- [x] Fetched each brand's real logo SVG from its live site and saved to
      `public/assets/logos/{balmain,eloure,eau-de-1974}.svg` (source: each
      site's own header `<img>`/CDN — official marks, not stock art). Added
      `Brand.logo` to `lib/brands.ts` and wired it into the brand-page header
      (replaces the plain text name) and the landing page's 3-panel divider
      (replaces the h2, kept as `sr-only` text for a11y/SEO; forced white via
      `brightness-0 invert` so every brand's logo reads on the tinted photo
      regardless of its own source color).
  - Note: these are the brands' actual trademarks, pulled from their public
    sites — fine for an authorized build of these exact brands, worth
    double-checking rights/licensing before this goes anywhere public.

## Done (cont. 9)
- [x] Eloure and Eau de 1974 accent colors now match their real sites' brand
      colors (pulled from each site's own CSS, fetched 2026-09-01): Eloure
      `#000ea7` (its `--color-btn-primary-bg`, matches its logo mark too),
      Eau de 1974 `#f15a25` (its dominant brand hex). One-line change each in
      `lib/brands.ts` — every hover/link/badge/button already reads
      `var(--brand-accent)`, nothing hardcoded elsewhere, so the new colors
      propagated everywhere automatically (verified live on both brand pages).

## Done (cont. 10) — Admin panel
- [x] **Prisma + SQLite** wired in: `prisma/schema.prisma` (`Product` model —
      category is free text, not an enum, so typing a new one in the admin
      form makes it filterable immediately, no schema change), `src/lib/prisma.ts`
      (singleton client, `@prisma/adapter-better-sqlite3` driver adapter —
      Prisma 7 requires an explicit adapter), `prisma/seed.ts` (migrated the
      25 old mock products into real rows). `npm run db:migrate` / `db:seed` /
      `db:studio` scripts added.
- [x] `lib/data/shop.ts` products now come from Prisma (`getShop`/`getProduct`
      are async) — brand menu/hero copy stays static config, same file, same
      function names. All 7 call sites updated to `await`.
- [x] Split `categoryImage()` into `lib/data/category-image.ts` (no Prisma
      import) — the cart page and ProductCard are client components; importing
      anything from `shop.ts` there was pulling `better-sqlite3` into the
      browser bundle and breaking the build.
- [x] Cart line items now snapshot `name`/`category`/`price` at add-time
      (`cart-context.tsx`) instead of looking the product up — the cart is
      "use client" and can't call the async DB-backed `getProduct` on render.
- [x] **Auth.js**: single admin via `Credentials` provider checked against
      `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH_B64` env vars (bcrypt), JWT session
      in an httpOnly cookie, no user table (`src/lib/auth.ts`). `/admin/*`
      gated in `src/proxy.ts` (redirects to `/admin/login` server-side, not
      client-side) — the i18n middleware still handles every other route.
  - **Gotcha worth remembering**: bcrypt hashes are full of `$`-sequences,
    and Next.js's env loader (`dotenv-expand`) tries to interpolate `$VAR`
    references in `.env` values — even single-quoted — silently corrupting
    the hash. Fixed by base64-encoding it (`ADMIN_PASSWORD_HASH_B64`,
    decoded in `auth.ts`). Cost real debugging time; don't put a raw bcrypt
    hash in `.env` again.
- [x] `/admin/products` — list, brand filter tabs, edit/delete
- [x] `/admin/products/new`, `/admin/products/[id]/edit` — `ProductForm`
      (client, `useActionState`) + Server Actions in `lib/actions/products.ts`
      (Zod-validated, `requireAdmin()` session check, `revalidatePath` on the
      affected storefront routes so edits show up immediately)
- [x] Removed Prisma's auto-scaffolded `.claude/skills/` etc. (unrequested,
      unrelated to our own `skills/`) and disabled Next 16's `agentRules`
      auto-generated `AGENTS.md`/`CLAUDE.md` (we already have ARCHITECTURE.md)
- [x] Verified end-to-end: unauthenticated `/admin/*` → 307 to login; correct
      login → session cookie → protected page renders; storefront pages read
      real DB products (`/en/balmain/product/<cuid>` works). Create/update/
      delete verified directly against Prisma (identical logic to the Server
      Actions minus the auth/validation wrapper, which is separately
      verified) — the actual browser `<form>` submission is worth one manual
      click-through, Next's Server Action wire protocol isn't practical to
      fake over raw HTTP for automated testing.
- [x] `npm run build` and `npm run lint` both pass clean.

**Admin login** (change the password before this goes anywhere near
production): `admin@hair-couture.local` / see `.env`'s `ADMIN_EMAIL` — the
seeded password is in this session's chat history only, not committed
anywhere; rotate it via the `node -e "..."` one-liner in `.env`'s comments.

## Next up
- [ ] api-client (`lib/api-client.ts`) + Zod schemas once a real backend is picked
      (`lib/data/shop.ts` is the seam to swap)
- [ ] Checkout flow (cart "Proceed to checkout" is a no-op button today)
- [ ] Visual pass: real brand colors/logos/fonts (placeholders in lib/brands.ts now)
- [ ] Product imagery (design uses labeled placeholder blocks throughout)

## Log
- 2026-09-01: Planning docs created (ARCHITECTURE.md, skills/). Scaffolded Next.js
  app, wired i18n/routing/theming/providers, built landing 3-panel + brand shell.
  Imported and implemented the `Shop.dc.html` Claude Design project — full shop
  (home/listing/detail/cart/account/search) for all 3 brands, on mock data.
  `npm run build`/`lint` pass, routes smoke-tested. Backend/data source and
  checkout/payment still undecided.
