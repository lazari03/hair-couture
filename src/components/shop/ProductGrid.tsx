import { ProductCard } from "./ProductCard";
import type { BrandSlug } from "@/lib/brands";
import type { Product } from "@/lib/data/shop";

// flex-wrap + justify-center (not CSS grid) so a ragged last row — 4 featured
// items at 3 columns wide, say — centers itself instead of trailing off to
// one side. Fixed (non-growing) card widths per breakpoint keep full rows
// looking identical to before; only an incomplete row's whitespace changes.
export function ProductGrid({ brand, products }: { brand: BrandSlug; products: Product[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
      {products.map((product) => (
        <div key={product.id} className="w-[45%] shrink-0 grow-0 sm:w-[30%] lg:w-[22%] xl:w-[18%]">
          <ProductCard brand={brand} product={product} />
        </div>
      ))}
    </div>
  );
}
