import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getShop, getProduct, getProductDetail } from "@/lib/data/shop";
import { productImage } from "@/lib/data/category-image";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { AddToCartForm } from "@/components/shop/AddToCartForm";
import { ProductViewBeacon } from "@/components/shop/ProductViewBeacon";
import { formatMoney } from "@/lib/money";
import { Link } from "@/i18n/navigation";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ brand: string; slug: string }>;
}) {
  const { brand: brandSlug, slug } = await params;
  const shop = await getShop(brandSlug);
  const product = shop && (await getProduct(brandSlug, slug));
  if (!shop || !product) notFound();

  const t = await getTranslations("product");
  const tAll = await getTranslations();
  const tCategories = await getTranslations("categories");
  const categoryLabel = tCategories.has(product.category) ? tCategories(product.category) : product.category;
  const locale = await getLocale();
  const productDetail = await getProductDetail();
  const related = shop.products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="px-6 pb-24 sm:px-11">
      <ProductViewBeacon brand={shop.slug} productId={product.id} name={product.name} category={product.category} price={product.price} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-8 pb-7 text-[11px] tracking-[0.16em] text-neutral-400 uppercase">
        <Link href={`/${shop.slug}`} className="transition-colors hover:text-neutral-900">
          {tAll(`brands.${shop.slug}.name`)}
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/${shop.slug}/shop?category=${encodeURIComponent(product.category)}`}
          className={
            product.category === "Sale"
              ? "font-medium text-[var(--brand-sale)]"
              : "transition-colors hover:text-neutral-900"
          }
        >
          {categoryLabel}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-700">{product.name}</span>
      </nav>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[var(--surface-muted)] md:sticky md:top-32 md:self-start">
          <Image
            src={productImage(product)}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 900px) 50vw, 100vw"
            className="object-contain p-10 mix-blend-multiply sm:p-14"
          />
        </div>
        <div className="flex flex-col pt-2">
          <span className="flex items-center gap-3 text-[10px] tracking-[0.28em] text-[var(--brand-accent)] uppercase before:h-px before:w-8 before:bg-current">
            {categoryLabel}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] font-light tracking-tight sm:text-5xl">
            {product.name}
          </h1>
          <span className="mt-4 text-xl tracking-wide tabular-nums">{formatMoney(product.price, locale)}</span>

          <AddToCartForm brand={shop.slug} product={product} sizes={productDetail.sizes} />

          <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-neutral-600">
            {product.description || productDetail.description}
          </p>
          <div className="mt-9 overflow-hidden rounded-2xl border border-[var(--hairline)]">
            {productDetail.specs.map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 border-b border-[var(--hairline)] px-5 py-4 text-sm last:border-b-0"
              >
                <span className="text-neutral-500">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-16 sm:mt-24">
        <h2 className="mb-9 font-display text-3xl font-light tracking-tight sm:text-4xl">{t("relatedTitle")}</h2>
        <ProductGrid brand={shop.slug} products={related} />
      </section>
    </main>
  );
}
