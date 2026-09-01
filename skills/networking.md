# Network call rules

- One typed `lib/api-client.ts` wrapper around `fetch` (base URL, headers, error
  normalization). Components/hooks never call raw `fetch()` directly.
- Every response is validated against a **Zod** schema at the boundary — if the
  API shape changes, you get a typed error at the call site, not a runtime crash
  three components downstream.
- Client-side data fetching/caching: **TanStack Query**. One `queryKey` convention
  per resource (`['product', slug]`, `['cart']`, ...). No manual `useEffect` +
  `useState` fetch loops.
- Server Components fetch data directly (DB/API call in the component or a
  `lib/data/*` function) — don't route a Server Component's data through a
  client-side API call it could make itself.
- Errors: the api-client throws/returns a typed `ApiError` (status, message,
  code); UI maps that to a localized message (see skills/i18n.md) — never render
  a raw error string from the network.
- Mutations (add to cart, checkout, login) go through TanStack `useMutation` with
  explicit loading/error/success UI states — no silent failures.
