import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct } from "@/lib/actions/products";
import { getCategoriesByBrand } from "@/lib/admin/categories";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categoriesByBrand] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    getCategoriesByBrand(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight">Edit product</h1>
      <ProductForm
        action={updateProduct.bind(null, id)}
        defaultValues={product}
        defaultBrand={product.brand}
        categoriesByBrand={categoriesByBrand}
      />
    </div>
  );
}
