// Shown by Next.js while a brand page's server data loads (the Suspense
// boundary Next puts around {children} in layout.tsx). Grey pulsing
// skeleton of a product grid — same look as an image that's still loading
// (components/shop/ProductImage.tsx) — instead of a spinner.
export default function BrandLoading() {
  return (
    <div aria-busy="true" className="px-4 py-10 sm:px-6 lg:px-11">
      <div className="mb-8 h-9 w-56 bg-neutral-200/70 motion-safe:animate-pulse" />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-[3/4] bg-neutral-200/70 motion-safe:animate-pulse" />
            <div className="h-3 w-1/3 bg-neutral-200/70 motion-safe:animate-pulse" />
            <div className="h-4 w-3/4 bg-neutral-200/70 motion-safe:animate-pulse" />
            <div className="h-3 w-1/4 bg-neutral-200/70 motion-safe:animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
