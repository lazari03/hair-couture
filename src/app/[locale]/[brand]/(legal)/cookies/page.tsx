import { notFound } from "next/navigation";
import { getBrand } from "@/lib/brands";
import { getLegalDoc } from "@/lib/data/legal";
import { LegalArticle } from "@/components/shop/LegalArticle";

export default async function CookiesPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: brandSlug } = await params;
  const brand = getBrand(brandSlug);
  const doc = getLegalDoc(brandSlug, "cookies");
  if (!brand || !doc) notFound();

  return <LegalArticle brand={brand.slug} doc={doc} />;
}
