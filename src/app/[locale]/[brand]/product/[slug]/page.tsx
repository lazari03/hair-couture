import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getShop, getProduct, productDetail } from "@/lib/data/shop";
import { productImage } from "@/lib/data/category-image";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { AddToCartForm } from "@/components/shop/AddToCartForm";
import { ProductViewBeacon } from "@/components/shop/ProductViewBeacon";
import { formatMoney } from "@/lib/money";

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
  const locale = await getLocale();
  const related = shop.products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="px-6 pb-24 sm:px-11">
      <ProductViewBeacon brand={shop.slug} productId={product.id} name={product.name} category={product.category} price={product.price} />
      <div className="pt-7 pb-6 text-[11px] tracking-[0.12em] text-neutral-500 uppercase">
        {shop.slug} / {product.category} / {product.name}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50">
          <Image
            src={productImage(product)}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 900px) 50vw, 100vw"
            className="object-contain p-10"
          />
        </div>
        <div className="flex flex-col pt-2">
          <span className="text-[10px] tracking-[0.2em] text-[var(--brand-accent)] uppercase">
            {product.category}
          </span>
          <h1 className="mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <span className="mt-3.5 text-lg">{formatMoney(product.price, locale)}</span>

          <AddToCartForm brand={shop.slug} product={product} sizes={productDetail.sizes} />

          <p className="mt-7 max-w-[52ch] text-sm leading-relaxed text-neutral-600">
            {product.description || productDetail.description}
          </p>
          <div className="mt-8 border-t border-neutral-200">
            {productDetail.specs.map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 border-b border-neutral-200 py-3.5 text-sm"
              >
                <span className="text-neutral-500">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-16 sm:mt-24">
        <h2 className="mb-7 text-xl font-light tracking-tight sm:text-2xl">{t("relatedTitle")}</h2>
        <ProductGrid brand={shop.slug} products={related} />
      </section>
    </main>
  );
}
