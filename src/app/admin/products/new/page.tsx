import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/actions/products";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight">Add product</h1>
      <ProductForm action={createProduct} />
    </div>
  );
}
