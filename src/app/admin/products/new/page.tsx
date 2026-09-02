import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/actions/products";
import { getCategoriesByBrand } from "@/lib/admin/categories";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;
  const categoriesByBrand = await getCategoriesByBrand();
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight">Add product</h1>
      <ProductForm action={createProduct} defaultBrand={brand} categoriesByBrand={categoriesByBrand} />
    </div>
  );
}
