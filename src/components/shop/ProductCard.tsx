import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import type { BrandSlug } from "@/lib/brands";
import type { Product } from "@/lib/data/shop";
import { productImage } from "@/lib/data/category-image";

export function ProductCard({ brand, product }: { brand: BrandSlug; product: Product }) {
  const locale = useLocale();
  return (
    <Link href={`/${brand}/product/${product.id}`} className="group flex flex-col gap-3.5">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50">
        <Image
          src={productImage(product)}
          alt={product.name}
          fill
          sizes="(min-width: 900px) 25vw, 50vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-white px-2 py-1 text-[9px] tracking-widest text-neutral-900 uppercase">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] tracking-widest text-neutral-500 uppercase">
          {product.category}
        </span>
        <span className="text-sm font-medium tracking-tight">{product.name}</span>
        <span className="text-[13px] text-neutral-600">{formatMoney(product.price, locale)}</span>
      </div>
    </Link>
  );
}
