import { ProductCard } from "./ProductCard";
import type { BrandSlug } from "@/lib/brands";
import type { Product } from "@/lib/data/shop";

export function ProductGrid({ brand, products }: { brand: BrandSlug; products: Product[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 sm:gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} brand={brand} product={product} />
      ))}
    </div>
  );
}
