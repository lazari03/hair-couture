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

## Done (cont. 11) — Real product data from the 3 live sites
- [x] Fetched real products from each brand's own site (2026-09-01) and
      replaced all mock catalog data:
  - **Balmain**: 15 products via balmainhair.com's public Shopify
    `/products.json` — real names, prices, HTML descriptions (stripped to
    plain text), images. Categorized using the site's own "Shop all Hair
    Care"/"Shop all Hair Accessories"/"Shop all Styling Tools" tags.
  - **Eloure**: 11 products via maisoneloure.com's `/products.json`, same
    approach, categorized via its `collection-care`/`collection-styling`/
    `set`/`routines` tags.
  - **Eau de 1974**: 15 products scraped from its 48-URL products sitemap
    (no storefront API — it's WordPress, not Shopify/WooCommerce) via each
    page's Open Graph meta (title/description/image). **No real prices** —
    eaude1974.com doesn't publish D2C pricing (nav has "Resellers", it's a
    distributor model) — prices are estimated per category (€38 hair care /
    €145 fragrance / €55 lifestyle) and this is flagged here and in
    `prisma/seed.ts`'s comments, not silently presented as scraped fact.
      Correct via `/admin/products` once real pricing is known.
- [x] Downloaded all 41 real product photos to
      `public/assets/products/<brand>/<slug>.{jpg,png,webp}` (from each
      site's own CDN — Shopify's or eaude1974.com's WP uploads).
- [x] `Product` schema gained `description` and `imageUrl` (both optional —
      migration `20260901212258_add_description_and_image`). `prisma/seed.ts`
      now seeds from `prisma/seed-data.json` (the scraped dataset) instead of
      the old hand-written mock array — `npm run db:seed` is reproducible.
- [x] `lib/data/category-image.ts` gained `productImage()` — real photo when
      `imageUrl` is set, the old per-category placeholder otherwise (so a
      product added by hand in `/admin` without a photo still renders
      something). Wired into `ProductCard`, product detail (single real image,
      dropped the old fake 4-shot gallery now that products are real and
      distinct), cart line thumbnails (cart snapshot gained `imageUrl` too),
      and the admin products table.
  - Product images render `object-contain` on a light background now, not
    `object-cover` — these are real catalog product shots (centered item,
    white/transparent background), cropping them like lifestyle photography
    looked wrong.
  - Product detail page shows `product.description` when present, falling
    back to the old generic placeholder only for a product without one.
- [x] Admin form (`ProductForm`) gained **Description** (textarea) and
      **Image URL** fields — both optional, same fallback behavior.
- [x] `npm run build`/`lint` pass clean; verified live that all 3 brand shop
      pages render their real scraped products with real images.

## Done (cont. 12) — Official Eloure catalog
- [x] Replaced the earlier scraped Eloure catalog (11 products, heuristic
      categorization) with the brand's own official WooCommerce export CSV
      (42 products — real SKUs/EANs, real RRPs, real ml sizes) supplied
      2026-09-02, cross-checked against the printed price sheet.
- [x] Images: matched each CSV product to maisoneloure.com's live Shopify
      catalog by name (handling "Colour"/"Color" spelling and travel-size
      naming) and downloaded 39/42 real photos. The 3 unmatched (Experience
      Set, The Radiant Care Collection, The Volume & Glow Collection) aren't
      on the live storefront yet — they fall back to the category
      placeholder photo, same graceful behavior as any admin-added product
      without an image.
- [x] Categorized against the existing taxonomy: Shampoo/Conditioner/Mask/
      Hair Perfume → Care Collection, Styling-type items → Styling Collection,
      Treatment/Sets & Kits → Treatments & Sets, Accessories (Signature
      Brush) → Styling Collection. The 3 CSV rows marked "Is featured" got a
      "Featured" badge.
- [x] `prisma/seed-data.json` updated (Balmain/Eau de 1974 untouched, Eloure
      fully replaced) — `npm run db:seed` reproduces this exactly. Cleaned up
      the 9 now-orphaned images from the old Eloure scrape.
- [x] `npm run build`/`lint` pass clean; verified live — Eloure shop and a
      product detail page both render the new catalog with real images.

## Done (cont. 13)
- [x] `ProductGrid` switched from CSS grid (`auto-fill`) to flex-wrap +
      `justify-center` with fixed (non-growing) card widths per breakpoint —
      a ragged last row (e.g. 4 featured items at 3 columns wide) now centers
      itself instead of trailing off to one side. One shared component used
      by every brand's home "Featured" section, the shop listing, search
      results, and product-detail "related" — fixing it once fixed it
      everywhere, all 3 brands.

## Done (cont. 14) — Balmain's real homepage layout
- [x] Fetched balmainhair.com's actual homepage structure (2026-09-02) and
      built it as `src/components/shop/BalmainHome.tsx`, wired in for
      `[locale]/[brand]/page.tsx` only when `shop.slug === "balmain"`
      (Eloure/Eau de 1974 keep the simple hero+featured layout — same
      pattern could give them their own reference layout later the same way).
  Section order matches the live site: Hero → "Popular right now" (4
  products) → 3-tile category grid (Hair Care/Hair Accessories/Styling
  Tools, linking to the real filtered shop) → "New in" (next 4 products) →
  3 collection highlight blocks (Heritage 1974 / Illuminating Colour Masks /
  Homme — editorial-only, we have no dedicated collection pages for these
  yet so they link to the general shop rather than a fake filtered view) →
  editorial "The world of Balmain Hair" brand-story block.
  - All copy lives in `messages/en.json`'s new `balmainHome` namespace
    (skills/i18n.md) — nothing hardcoded in the component.
  - Reuses real Balmain product/category data throughout (product grids,
    category tile photos) — only the 3 collection blocks and the editorial
    block are decorative/placeholder since we don't have Balmain's real
    campaign photography or collection pages behind them.
- [x] `npm run build`/`lint` pass clean; verified live — Balmain's homepage
      renders all 6 sections (confirmed structurally, not just via message
      strings — next-intl ships the *entire* messages payload to every
      locale page for client hydration, so a raw text search across HTML
      isn't a reliable way to check what's actually rendered; used section
      count / category-link patterns instead). Eloure/Eau de 1974 unaffected,
      still 2 sections.

## Done (cont. 15)
- [x] Removed BalmainHome's "Shop by category" 3-tile grid section — "Explore
      the collections" (already existed further down the page) now covers
      that ground alone. `BalmainHome.tsx` is down to 5 sections: Hero →
      Popular right now → New in → Explore the collections → editorial.
- [x] Balmain gets a real black footer (`BalmainFooter.tsx`), matching
      balmainhair.com's actual footer (fetched 2026-09-02): `bg-neutral-950`,
      3 link columns (Shop / Service / Balmain Hair) + newsletter signup +
      copyright, wired in conditionally in `[brand]/layout.tsx` same as
      BalmainHome — Eloure/Eau de 1974 keep the existing light footer.
      Column links are mostly editorial (FAQ/Heritage/Stockist/legal pages)
      with no real destination page yet, so they point at the shop rather
      than a 404. Newsletter form is presentational only — no backend wired
      up, no fake "subscribed" state.
- [x] `npm run build`/`lint` pass clean; verified live — Balmain now renders
      5 sections (was 6) and a `bg-neutral-950` footer; Eloure's footer
      confirmed still light/unaffected.

## Done (cont. 16)
- [x] "Explore the collections" now IS the real category browser (the old
      "Shop by category" section's job, folded in rather than kept separate):
      3 tiles for the actual filterable categories (Hair Care/Hair
      Accessories/Styling Tools), each using the same `categoryImage()` photo
      the shop listing sidebar uses, each linking to the real
      `/balmain/shop?category=...` filtered view. Titles are the real
      category strings now (data-driven, not a translation key — same
      pattern as the shop listing page), only the one-line tagline per
      category is still copy (`messages/en.json`'s `balmainHome.collections`).
- [x] `npm run build`/`lint` pass clean; verified live — all 3 tiles render
      the correct category image, title, and working filter link.

## Done (cont. 17)
- [x] "Explore the collections" tiles now use real Balmain photography
      instead of the generic category placeholder: checked
      balmainhair.com's `/collections/hair-care`, `/collections/hair-
      accessories`, `/collections/styling-tools` pages first (2026-09-02) —
      they all reuse one identical generic banner image, not distinct
      category art — so used each category's real flagship product photo
      from their own Shopify catalog instead (Sculpting Wax for Hair Care,
      Gold Plated Hair Slide for Hair Accessories, Ceramic Round Brush for
      Styling Tools). Downloaded to
      `public/assets/products/balmain/collection-{hair-care,hair-
      accessories,styling-tools}.jpg`.
- [x] `npm run build`/`lint` pass clean; verified live — all 3 tiles now
      serve the new real images.

## Done (cont. 18) — Coupons, checkout form, orders → admin
- [x] **Coupons**: `Coupon` model (code/type/value/active), seeded with
      `WELCOME10` (10%) and `SAVE20` (20%). Cart page gained an apply-coupon
      input (`validateCoupon` Server Action, called directly from the client
      component) — applied coupon persists in `CartProvider` alongside cart
      lines (same localStorage pattern), shows as a discount line in both the
      cart and checkout summaries.
- [x] **Checkout page** (`[brand]/checkout`): real order form — first/last
      name, email, phone, address/city/postal code/country — plus an order
      summary sidebar (line items, subtotal, discount, total). Cart's
      "Proceed to checkout" now actually links here (was inert before).
      Redirects to an empty-cart state if there's nothing to check out.
- [x] **Orders → admin**: `Order`/`OrderItem` models, `createOrder` Server
      Action (Zod-validated, re-validates the coupon server-side rather than
      trusting the client's discount math) creates the order + snapshotted
      line items, clears the cart, shows a "Thank you" confirmation with the
      order id. `/admin/orders` lists every order (brand-filterable, same
      tab pattern as `/admin/products`) with customer info, items, and the
      coupon/discount applied — linked from the admin nav.
- [x] Verified: coupon lookup + discount math + order creation + item
      snapshot all correct end-to-end directly against Prisma (same query
      shapes the Server Actions use); cart page renders the coupon UI;
      checkout page correctly shows its empty-cart state via HTTP; `/admin/
      orders` correctly redirects unauthenticated requests to login.
      (Full browser form-submission not exercised over raw HTTP — same
      Server Action wire-protocol limitation as the products admin form;
      worth one manual click-through.)
- [x] `npm run build`/`lint` pass clean (0 errors, 0 warnings).

## Done (cont. 19) — Login brute-force protection
- [x] Admin login had no throttling — anyone could hammer the password
      guess loop indefinitely. Added `src/lib/rate-limit.ts` (in-memory
      sliding window, 5 failed attempts / 15 min per email) wired into
      `auth.ts`'s `authorize()`: checked before verifying the password, so a
      6th attempt is rejected even with the *correct* password until the
      window expires. Login page distinguishes "too many attempts, try
      again in 15 minutes" from the generic invalid-credentials message.
  - ponytail ceiling: in-memory, so it resets on redeploy/restart and
    doesn't share state across multiple server instances — fine for a
    single-instance admin panel, move to a DB table or Redis if that changes.
  - What was already solid (worth restating, since "not a headless CMS" read
    as a broader worry): bcrypt-hashed password (never plaintext), httpOnly
    JWT session cookie (unreachable from JS/XSS), `/admin/*` gated
    server-side in middleware (not a client-side redirect), identical error
    for wrong-email vs wrong-password (no account enumeration).
- [x] Verified live: attempts 1–5 return the normal error, attempt 6+
      returns the rate-limited error — confirmed with both a wrong password
      *and* the correct one (correctly still blocked mid-lockout).
      `npm run build`/`lint` pass clean.

## Done (cont. 20) — Real admin dashboard, per-brand theming
- [x] Rebuilt the admin from a bare header+table into an actual dashboard
      shell: sidebar nav (`AdminNav.tsx`, active-link highlighted) with
      Dashboard/Products/Orders, matching the storefront's sidebar-admin
      conventions rather than looking like an afterthought.
- [x] New `/admin` dashboard (was just a redirect to /admin/products): one
      card per brand — its own accent color as a top bar, logo, product/
      order/revenue counts (`Prisma.groupBy`), quick links into that brand's
      filtered products/orders.
- [x] **Per-brand color separation, both admin list pages**: brand filter
      tabs now render in that brand's real accent color when active
      (`#111111` Balmain / `#000ea7` Eloure / `#f15a25` Eau de 1974 — the
      same colors as the storefront, from `lib/brands.ts`). With no brand
      filter, Products now renders 3 separate sections (was one flat table
      with a brand-name column) — each with a colored header bar and its own
      "Add product" link pre-set to that brand. Orders got a colored
      left-border per order card by its brand. Product form's Save button
      and the "Add product" button both pick up the selected/target brand's
      color live.
- [x] Fixed a real bug hit along the way: `/admin/*` is a separate top-level
      route segment from `[locale]` with no shared `src/app/layout.tsx`, so
      it never had `<html>`/`<body>` at all — invisible until Next started
      warning. `admin/layout.tsx` is now its own root layout (mirrors what
      `[locale]/layout.tsx` does for the storefront), covering both the
      authenticated shell and the bare `/admin/login` page.
- [x] `npm run build`/`lint` pass clean; verified live — dashboard renders 3
      brand cards, products page groups into 3 colored sections, filtered
      products/orders both pick up the correct real brand accent color.

## Done (cont. 21) — Admin polish round 2
- [x] **Sidebar height bug fixed**: it was a flex child sized by
      `align-items: stretch` against its tallest sibling, so a long
      product/order list stretched it way past the viewport. Now
      `sticky top-0 h-screen` on desktop (tracks the viewport, scrolls
      independently) — replaced by a collapsible drawer on mobile instead of
      stretching.
- [x] **Sidebar icons + hamburger toggle**: rebuilt as `AdminSidebar.tsx`
      (client component) — 3 hand-rolled inline SVG icons (not worth a
      dependency for 3 icons), hamburger button on mobile that shows/hides
      the nav + sign-out, always-open vertical sidebar on desktop.
      `AdminNav.tsx` removed, folded into the new component.
- [x] **Category is now select-only, scoped per brand** — the exact ask:
      typing a category was creating accidental near-duplicates (typos,
      "Hair Care" vs "hair care"). New `lib/admin/categories.ts` fetches
      each brand's existing distinct categories; `ProductForm`'s Category
      field is a `<select>` whose options swap live when you change Brand —
      Balmain shows only Balmain's categories, Eloure only Eloure's, etc.
      No "type a new one" escape hatch anymore, matching what was asked.
- [x] **Dashboard summary**: added a totals row above the per-brand cards —
      Total sales / Total orders / Total products across all 3 brands
      combined, not just per-brand.
- [x] **Orders page filled**: seeded 6 demo orders (2 per brand, fictional
      customers across different countries, real line items from each
      brand's actual seeded products, one with a coupon applied) so the page
      has real content to look at instead of "No orders yet." Already had
      per-brand left-border coloring from the prior round.
- [x] **Layout centered, not left-hugging**: admin main content wrapped in
      `mx-auto max-w-6xl` — cards/tables/forms sit centered with even
      margins on wide screens instead of pinned to the left edge with a
      large empty gutter on the right.
- [x] Fixed a real bug hit while testing: `admin/orders/page.tsx` was
      importing `Link` from `@/i18n/navigation` (next-intl's wrapper) —
      admin routes sit outside the `[locale]` tree with no intl provider, so
      every visit crashed with "No intl context found." Swapped to plain
      `next/link` (grepped the rest of `/admin` — was the only offender).
- [x] `npm run build`/`lint` pass clean; verified live end-to-end — orders
      page loads without the intl error, dashboard shows the totals row,
      Balmain's new-product form only offers Balmain's categories (Eloure's
      "Care Collection" correctly absent).

## Done (cont. 22) — Order status + stock, all real DB writes
- [x] **Order status**: `Order.status` now moves between `pending` →
      `in_progress` → `fulfilled` via a real dropdown on each order card
      (`OrderStatusSelect.tsx`, client component, calls the
      `updateOrderStatus` Server Action directly on change — no form submit
      needed). Writes straight to the DB (`prisma.order.update`) and
      revalidates `/admin/orders`; color-coded dot per state.
- [x] **Stock**: added `Product.stock` (migration
      `20260902004226_add_product_stock`). Editable in the admin product
      form; admin products table shows it (red "Sold out" / amber "≤10 left"
      / plain otherwise). Storefront: `AddToCartForm` disables and relabels
      "Sold out" at 0 stock, `ProductCard` grays out the image and swaps the
      badge for a "Sold out" one.
  - **`createOrder` now decrements real stock** for every line item on a
    successful order (clamped at 0, read-then-write rather than a raw
    decrement so it can't go negative) — genuinely persisted, not a display
    trick. Noted ceiling: no row locking, so two simultaneous checkouts on
    the last unit of something could both succeed; fine at this scale, a
    real high-traffic store would want a transaction/constraint here.
  - Seed: no real inventory numbers exist to scrape (brand sites don't
    publish stock), so seeded products got a placeholder count (30, or 6 for
    "Limited"-badged ones) — correct via `/admin/products` once real
    numbers exist, flagged in `prisma/seed.ts`.
- [x] Verified directly against the database (not just that the forms
      render): order status write/read round-trips correctly, stock
      decrements correctly, and the zero-clamp holds. `npm run build`/`lint`
      pass clean.

## Done (cont. 23) — Stock holds, status-update fix, split order filters
- [x] **15-minute stock reservation on add-to-cart** (`StockReservation`
      model, migration `20260902005032_add_stock_reservations`,
      `lib/actions/stock.ts`'s `reserveStock`/`releaseCartReservations`).
      Every add/increase in the cart calls `reserveStock` first — it fails
      loudly ("Only N left" / "Sold out") if another cart already holds the
      remaining units, so two shoppers can no longer both "successfully" add
      the last unit. Decrease/remove/checkout release the hold. 15 minutes
      chosen as the reasonable default — long enough to fill in checkout,
      short enough not to tie up stock from an abandoned tab (the common
      range across retail/ticketing checkouts).
  - SQLite has no per-row lock like Postgres's `SELECT ... FOR UPDATE` — used
    a Prisma interactive transaction instead (`prisma.$transaction(async tx
    => ...)`), which SQLite serializes at the database level. Coarser than a
    row lock but genuinely correct; documented as such rather than
    overclaiming "row locking" in the literal sense.
  - Verified directly against the DB with two competing "carts": cartA
    reserves 3/5, cartB correctly rejected for 3 ("only 2 left"), succeeds
    for 2, cartA correctly blocked from bumping past what's left — release
    and stock restore both confirmed clean.
  - Real bug hit and fixed along the way: a `"use server"` file can only
    export async functions — `stock.ts` was also exporting a plain const and
    a type, which silently broke *all* of its exports at build time. Split
    the constant/type into `lib/stock-constants.ts`.
- [x] **Fixed the order-status NetworkError**: `OrderStatusSelect` now wraps
      the action call in try/catch, reverts the dropdown to its previous
      value on any failure (including a rejected status from the server, not
      just a thrown error), and shows an inline message instead of failing
      silently. Most likely original cause: a stale Server Action reference
      from before a dev-server hot-reload — now recoverable without a full
      page reload being the only fix.
- [x] **Order filters split into two independent controls**, not merged into
      one tab row: a status row (New/pending, In progress, Done) and the
      existing brand row, combinable via separate query params
      (`?status=&brand=`) so e.g. "Balmain + Fulfilled" works.
- [x] `npm run build`/`lint` pass clean; verified both filter rows render and
      combine correctly over live HTTP.

## Done (cont. 24) — Minimal order filters
- [x] Replaced the two rows of colored pill buttons (7+ boxes fighting for
      attention) with `OrderFilters.tsx`: two plain native `<select>`
      dropdowns (Status, Brand) plus a live "N orders" count, all on one
      line. Native selects already collapse/stack cleanly on mobile with
      zero extra responsive work, and dropped the heavy per-brand color
      fills from the filter control itself — the order cards' colored left
      border already carries that signal, repeating it in the filter chooser
      was just noise. Client-side `router.push` on change, same `?status=&
      brand=` query params as before so both still combine and are
      link-shareable.
- [x] `npm run build`/`lint` pass clean; verified live — 2 selects present,
      old pill markup gone, live order count renders, brand-colored borders
      and the per-order status dropdown both still intact.

## Done (cont. 25) — Real animated loaders
- [x] Added `loading.tsx` at 3 levels — Next.js shows these automatically via
      its built-in Suspense boundary per route segment, no manual wiring:
      `[locale]/[brand]/loading.tsx` (brand-colored — inherits
      `var(--brand-accent)` from the layout it sits inside, so it's already
      on-brand for whichever brand you're on), `[locale]/loading.tsx` (the
      landing page, neutral), `admin/loading.tsx` (neutral, smaller).
      3-dot staggered bounce (Tailwind's real `animate-bounce` keyframe with
      offset delays) — an actual animation, not a static placeholder graphic.

## Done (cont. 26) — Real Eau de 1974 catalog, KESH pricing
- [x] Replaced the earlier estimated-price Eau de 1974 catalog with the
      brand's real internal price list (photo supplied 2026-09-02 — Albanian
      distributor sheet, columns Item code / Product / KESH (cash-retail,
      Albanian Lek) / SHUMICE (wholesale)) cross-referenced against a full
      re-scrape of eaude1974.com's live catalog:
  - Re-fetched all 48 products via the site's sitemap (already exhaustive —
    not paginated, so "other pages" were already covered by the earlier
    sitemap approach too).
  - Fuzzy-matched each of the 41 price-list rows to its live product by
    name-token overlap, then **manually reviewed and corrected every match**
    rather than trusting the algorithm blind — caught and fixed several
    wrong auto-matches (e.g. "Define & Shield Spray" → the live site actually
    calls it "Define & Smooth Spray"; a "Renew Mask" title had a Unicode
    narrow no-break space silently breaking exact-string lookup).
  - **Price = KESH ÷ 100**, converting Albanian Lek to EUR at the standard
    ~100:1 approximation (matches the site's own EUR-priced siblings well —
    e.g. €55 for a 50ml hair perfume, in line with Balmain/Eloure's real
    fragrance pricing) — replaces last round's category-estimated placeholder
    prices with real ones. Flagged here as an approximation, not a live FX
    rate, in case exact conversion ever matters.
  - 34/41 products got real photos downloaded from the live site; 7 (Room
    Spray ×3, Scented Candle, Fiber & Style, Lift & Texture Spray, Lift &
    Thicken Lotion) are genuinely not on the live site right now — verified
    by direct search, not just a failed fuzzy match — so they fall back to
    the category placeholder image, same graceful behavior as any
    admin-added product without a photo.
  - Categorized using the price list's own section headers (it already
    groups into Hair Perfume/Hyaluronic Care, Beauty, its own literal
    "Sensorial Hair Care" section, Giftsets, Home Care) mapped onto the
    existing 3-category taxonomy.
- [x] `npm run build`/`lint` pass clean; verified live — shop listing and a
      product detail page both show the real KESH-derived prices and real
      images.

## Next up
- [ ] Admin CRUD for coupons (currently seed-only + `npm run db:studio` to
      hand-edit) — same pattern as `/admin/products` would cover it.
- [ ] Same real-homepage/footer treatment for Eloure (maisoneloure.com) and
      Eau de 1974 (eaude1974.com) if wanted — `BalmainHome.tsx`/
      `BalmainFooter.tsx` are the templates to follow, same per-brand-
      conditional pattern in `[brand]/page.tsx` and `[brand]/layout.tsx`.
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
