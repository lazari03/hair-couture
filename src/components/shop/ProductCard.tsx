import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import type { BrandSlug } from "@/lib/brands";
import type { Product } from "@/lib/data/shop";
import { productImage } from "@/lib/data/category-image";

// Brand-agnostic; the product-card__* classes are hooks for per-brand skins in
// globals.css (Éloure moves name/price above a square tile and shows the
// full-width button, like maisoneloure.com). The button is a label inside the
// card link, not a quick-add: add-to-cart lives on the product page.
export function ProductCard({ brand, product }: { brand: BrandSlug; product: Product }) {
  const locale = useLocale();
  const t = useTranslations("product");
  const outOfStock = product.stock <= 0;

  return (
    <Link href={`/${brand}/product/${product.id}`} className="product-card group flex flex-col gap-3.5">
      <div className="product-card__media relative aspect-[3/4] overflow-hidden bg-neutral-50">
        <Image
          src={productImage(product)}
          alt={product.name}
          fill
          sizes="(min-width: 900px) 25vw, 50vw"
          className={`object-contain p-4 transition-transform duration-300 group-hover:scale-105 ${outOfStock ? "opacity-50 grayscale" : ""}`}
        />
        {product.badge && !outOfStock && (
          <span className="absolute top-2.5 left-2.5 bg-white px-2 py-1 text-[9px] tracking-widest text-neutral-900 uppercase">
            {product.badge}
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-2.5 left-2.5 bg-neutral-900 px-2 py-1 text-[9px] tracking-widest text-white uppercase">
            {t("outOfStock")}
          </span>
        )}
      </div>
      <div className="product-card__info flex flex-col gap-1">
        <span
          className={`product-card__category text-[10px] tracking-widest uppercase ${
            product.category === "Sale" ? "font-medium text-[var(--brand-sale)]" : "text-neutral-500"
          }`}
        >
          {product.category}
        </span>
        <span className="product-card__name text-sm font-medium tracking-tight">{product.name}</span>
        <span className="product-card__price text-[13px] text-neutral-600">{formatMoney(product.price, locale)}</span>
      </div>
      <span className="product-card__cta hidden min-h-11 items-center justify-center bg-[var(--brand-accent)] px-2 text-[11px] tracking-[0.14em] text-[var(--brand-accent-foreground)] uppercase transition-opacity group-hover:opacity-85">
        {t("viewProduct")}
      </span>
    </Link>
  );
}
