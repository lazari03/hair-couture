# Multi-brand theming rules

Brands: **Balmain Hair Couture**, **Eloure**, **Eau de 1974**.

- One Tailwind config. Brand identity (accent color, font pairing, logo) is a set
  of CSS variables swapped by a `data-brand="balmain|eloure|eau-de-1974"` attribute
  on the brand layout's root element — not three separate Tailwind configs/themes.
- Tailwind reads the variables via `theme.extend.colors.brand: 'var(--brand-accent)'`
  etc. Component code uses `bg-brand`, never a brand's literal hex.
- Shared components (product card, cart drawer, checkout form) stay brand-agnostic
  and pick up the active brand's variables automatically. Don't fork a component
  per brand unless the layout is genuinely different, not just the color.
- Brand metadata (name, tagline, logo path, nav links) lives in one
  `lib/brands.ts` config object keyed by brand slug — the landing page's 3 panels
  and each brand layout both read from it, so adding/renaming a brand is a data
  change, not a code change in N places.
