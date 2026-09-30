import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getShop } from "@/lib/data/shop";
import { getBrandPage } from "@/lib/data/brand-pages";
import { ProductCard } from "@/components/shop/ProductCard";

interface Item {
  title: string;
  body: string;
}

// Renders a brand content page from its block list (lib/data/brand-pages.ts).
// Colours and type come from the brand skin in globals.css.
export default async function BrandContentPage({ params }: { params: Promise<{ brand: string; page: string }> }) {
  const { brand, page } = await params;
  const blocks = getBrandPage(brand, page);
  const shop = await getShop(brand);
  if (!blocks || !shop) notFound();

  const t = await getTranslations(`brandPages.${brand}.${page}`);
  const list = (key: string) => (t.has(key) ? (t.raw(key) as string[]) : []);

  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        // Only the first block carries the page <h1>; later block titles are <h2>.
        const Title = i === 0 ? "h1" : "h2";
        switch (block.type) {
          case "split": {
            const accent = block.tone === "accent";
            return (
              <section key={i} className={`grid grid-cols-1 md:grid-cols-2 ${accent ? "bg-[var(--brand-accent)] text-white" : ""}`}>
                <div className={`relative aspect-[4/5] md:aspect-auto md:min-h-[640px] ${accent ? "" : "md:m-6"}`}>
                  <Image src={block.image} alt="" fill priority={i === 0} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className={`flex flex-col justify-center px-6 py-12 md:px-16 lg:px-20 ${accent ? "items-center text-center" : ""}`}>
                  <Title className={`font-display max-w-xl leading-tight ${block.compactTitle ? "text-lg sm:text-2xl" : "text-2xl sm:text-4xl"}`}>
                    {t(`${block.key}.title`)}
                  </Title>
                  {t.has(`${block.key}.subtitle`) && <h2 className="font-display mt-4 text-lg sm:text-2xl">{t(`${block.key}.subtitle`)}</h2>}
                  {t.has(`${block.key}.lead`) && <p className="mt-6 max-w-xl text-sm leading-relaxed uppercase">{t(`${block.key}.lead`)}</p>}
                  <div className="mt-5 flex max-w-xl flex-col gap-4 text-sm leading-relaxed">
                    {list(`${block.key}.body`).map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {t.has(`${block.key}.note`) && <p className="mt-5 max-w-xl text-sm leading-relaxed uppercase">{t(`${block.key}.note`)}</p>}
                </div>
              </section>
            );
          }
          case "statement":
            return (
              <section key={i} className="px-6 py-20 text-center md:py-32">
                <Title className="mx-auto max-w-3xl text-3xl leading-tight uppercase sm:text-5xl">{t(`${block.key}.text`)}</Title>
              </section>
            );
          case "pillars": {
            const items = t.raw(`${block.key}.items`) as Item[];
            return (
              <section key={i} className="px-4 py-16 sm:px-6 md:py-24">
                <h2 className="mb-10 text-center text-2xl uppercase sm:text-4xl">{t(`${block.key}.title`)}</h2>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-5">
                  {items.map((item, j) => (
                    <div key={item.title}>
                      <div className="relative mb-5 aspect-[3/4] overflow-hidden">
                        <Image src={block.images[j]} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                      </div>
                      <h3 className="text-xl uppercase sm:text-2xl">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          case "stack": {
            const items = t.raw(`${block.key}.items`) as Item[];
            return (
              <section key={i} className="px-6 py-16 text-center md:py-24">
                <h2 className="font-display mb-12 text-2xl sm:text-4xl">{t(`${block.key}.title`)}</h2>
                <div className="mx-auto flex max-w-xl flex-col gap-14">
                  {items.map((item) => (
                    <div key={item.title}>
                      <h3 className="text-base uppercase">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          case "text":
            return (
              <section key={i} className="px-6 pb-16 text-center md:pb-24">
                <h2 className="font-display mx-auto max-w-xl text-2xl sm:text-4xl">{t(`${block.key}.title`)}</h2>
                <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-4 text-sm leading-relaxed">
                  {list(`${block.key}.body`).map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            );
          case "imagePair":
            return (
              <section key={i} className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6">
                {block.images.map((src) => (
                  <div key={src} className="relative aspect-[3/4]">
                    <Image src={src} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                ))}
              </section>
            );
          case "products": {
            const products = shop.products.filter((p) => p.categories.includes(block.category)).slice(0, block.limit);
            if (products.length === 0) return null;
            return (
              <section key={i} className="px-4 py-16 sm:px-6 md:py-24">
                <h2 className="font-display mb-8 text-2xl sm:text-4xl">{t(`${block.key}.title`)}</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                  {products.map((p) => (
                    <ProductCard key={p.id} brand={shop.slug} product={p} />
                  ))}
                </div>
              </section>
            );
          }
        }
      })}
    </div>
  );
}
