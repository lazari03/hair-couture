// Automatically shown by Next.js while this segment's Server Components are
// fetching (Suspense boundary Next inserts around {children} in layout.tsx)
// — no manual wiring needed, it fires on every brand page navigation that
// takes a moment. Sits inside [brand]/layout.tsx's DOM, so var(--brand-accent)
// is already in scope: the loader adopts whichever brand you're on for free.
export default function BrandLoading() {
  return (
    <div className="flex flex-1 items-center justify-center py-32">
      <div className="flex gap-2.5">
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--brand-accent)] [animation-delay:-0.3s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--brand-accent)] [animation-delay:-0.15s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--brand-accent)]" />
      </div>
    </div>
  );
}
