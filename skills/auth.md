# Auth rules

- Library: **Auth.js (NextAuth v5)**. Don't hand-roll JWT/session logic.
- Session storage: httpOnly + secure + sameSite=lax cookie, managed by Auth.js.
  Never put a token/session in localStorage/sessionStorage — it's XSS-readable.
- Server Components and Route Handlers get the session via `auth()` server-side.
  Client Components use `useSession()` only for UI branching (show/hide), never
  as the source of truth for an authorization decision — that check happens
  server-side (Route Handler / Server Action), always.
- CSRF: Auth.js handles it for its own routes; any custom mutating Route Handler
  must still validate the session server-side, not trust a client-sent user id.
- Password auth (if/when added): hash with `bcrypt`/`argon2`, never store plain
  text, never log credentials or tokens.
- One auth flow for the whole platform — account, checkout, and all 3 brand shops
  share the same session. No per-brand login.
- Guest checkout is allowed without a session; merging a guest cart into an
  account on login is a deliberate, tested step — not silently dropped.
