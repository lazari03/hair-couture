import { notFound } from "next/navigation";
import { getShop } from "@/lib/data/shop";
import { SearchClient } from "@/components/shop/SearchClient";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { brand: brandSlug } = await params;
  const { q } = await searchParams;
  const shop = await getShop(brandSlug);
  if (!shop) notFound();

  return <SearchClient brand={shop.slug} products={shop.products} initialQuery={q ?? ""} />;
}
