import { notFound } from "next/navigation";
import { getBrand } from "@/lib/brands";
import { getLegalDoc } from "@/lib/data/legal";
import { LegalArticle } from "@/components/shop/LegalArticle";

export default async function TermsPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: brandSlug } = await params;
  const brand = getBrand(brandSlug);
  const doc = getLegalDoc(brandSlug, "terms");
  if (!brand || !doc) notFound();

  return <LegalArticle brand={brand.slug} doc={doc} />;
}
