import { notFound } from "next/navigation";
import type { BrandSlug } from "@/lib/brands";
import { getShop, type ShopContent } from "@/lib/data/shop";
import { BalmainHome } from "@/components/shop/BalmainHome";
import { EloureHome } from "@/components/shop/EloureHome";
import { EauHome } from "@/components/shop/EauHome";

// Each brand gets its real homepage layout, mirroring its own webshop
// (skills/branding.md: brand identity can differ per brand — a layout choice,
// not a hardcoded exception). Typed per BrandSlug so a new brand fails to
// compile until it has a homepage.
const homes: Record<BrandSlug, (props: { shop: ShopContent }) => Promise<React.ReactNode>> = {
  balmain: BalmainHome,
  eloure: EloureHome,
  "eau-de-1974": EauHome,
};

export default async function BrandShopHome({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandSlug } = await params;
  const shop = await getShop(brandSlug);
  if (!shop) notFound();

  const Home = homes[shop.slug];
  return <Home shop={shop} />;
}
