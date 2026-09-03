// Covers the landing page (outside any brand's color context) — plain
// neutral-900 dots, same animation as the brand-scoped loader.
export default function LandingLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex gap-2.5">
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-900 [animation-delay:-0.3s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-900 [animation-delay:-0.15s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-900" />
      </div>
    </div>
  );
}
