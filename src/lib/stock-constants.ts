// Split out of lib/actions/stock.ts on purpose: a "use server" file may only
// export async functions — a plain const or type export there silently
// breaks the whole module's exports (Next's server-action transform).

// 15 minutes: long enough to fill in a real checkout form, short enough not
// to tie up inventory from an abandoned tab — the common range across most
// retail/ticketing checkouts (some go as low as 10 for high-demand items).
export const RESERVATION_MINUTES = 15;

export type ReserveResult = { ok: true; available: number } | { ok: false; error: string };
