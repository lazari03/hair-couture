import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import type { BrandSlug } from "@/lib/brands";
import type { Product } from "@/lib/data/shop";
import { productImage } from "@/lib/data/category-image";

export function ProductCard({ brand, product }: { brand: BrandSlug; product: Product }) {
  const locale = useLocale();
  const t = useTranslations("product");
  const tCategories = useTranslations("categories");
  const outOfStock = product.stock <= 0;
  const categoryLabel = tCategories.has(product.category) ? tCategories(product.category) : product.category;

  return (
    <Link href={`/${brand}/product/${product.id}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[var(--surface-muted)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-lift)]">
        <Image
          src={productImage(product)}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          className={`object-contain p-3 mix-blend-multiply sm:p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${
            outOfStock ? "opacity-50 grayscale" : ""
          }`}
        />
        {product.badge && !outOfStock && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] tracking-[0.2em] text-neutral-900 uppercase shadow-sm backdrop-blur">
            {product.badge}
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-3 left-3 rounded-full bg-neutral-900 px-2.5 py-1 text-[9px] tracking-[0.2em] text-white uppercase">
            {t("outOfStock")}
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center rounded-full bg-white/95 py-2.5 text-[10px] tracking-[0.2em] text-neutral-900 uppercase opacity-0 shadow-[var(--shadow-soft)] backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 md:flex">
          {t("viewProduct")}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-0.5">
        <span
          className={`text-[10px] tracking-[0.2em] uppercase ${
            product.category === "Sale" ? "font-medium text-[var(--brand-sale)]" : "text-neutral-400"
          }`}
        >
          {categoryLabel}
        </span>
        <span className="font-display text-[1.15rem] leading-snug text-neutral-900 transition-colors group-hover:text-[var(--brand-accent)]">
          {product.name}
        </span>
        <span className="text-[13px] tracking-wide text-neutral-600 tabular-nums">{formatMoney(product.price, locale)}</span>
      </div>
    </Link>
  );
}
