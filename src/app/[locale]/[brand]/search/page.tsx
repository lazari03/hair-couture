import { notFound } from "next/navigation";
import { getShop } from "@/lib/data/shop";
import { SearchClient } from "@/components/shop/SearchClient";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandSlug } = await params;
  const shop = getShop(brandSlug);
  if (!shop) notFound();

  return <SearchClient brand={shop.slug} products={shop.products} />;
}
