import { getTranslations } from "next-intl/server";

export default async function BrandShopHome() {
  const t = await getTranslations();

  return (
    <div className="flex flex-1 items-center justify-center p-10">
      {/* ponytail: placeholder shop home — real product grid needs a data
          source (progress.md open decision) before this is built out. */}
      <p className="text-neutral-500">{t("nav.shop")}</p>
    </div>
  );
}
