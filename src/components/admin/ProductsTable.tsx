import Image from "next/image";
import Link from "next/link";
import { deleteProduct } from "@/lib/actions/products";
import { productImage } from "@/lib/data/category-image";
import type { ProductModel } from "@/generated/prisma/models";

export function ProductsTable({ products }: { products: ProductModel[] }) {
  return (
    <div className="overflow-x-auto border border-neutral-200 bg-white">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-xs tracking-wide text-neutral-500 uppercase">
            <th className="px-4 py-3 font-medium"></th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Stock</th>
            <th className="px-4 py-3 font-medium">Badge</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-neutral-100 last:border-0">
              <td className="px-4 py-3">
                <div className="relative h-10 w-10 overflow-hidden bg-neutral-50">
                  <Image src={productImage(p)} alt="" fill sizes="40px" className="object-contain p-1" />
                </div>
              </td>
              <td className="px-4 py-3 font-medium">{p.name}</td>
              <td className="px-4 py-3">{p.category}</td>
              <td className="px-4 py-3">€ {p.price.toLocaleString("en-US")}</td>
              <td className="px-4 py-3">
                <span className={p.stock <= 0 ? "font-medium text-red-600" : p.stock <= 10 ? "font-medium text-amber-600" : ""}>
                  {p.stock <= 0 ? "Sold out" : p.stock}
                </span>
              </td>
              <td className="px-4 py-3 text-neutral-500">{p.badge ?? "—"}</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <Link href={`/admin/products/${p.id}/edit`} className="mr-4 hover:underline">
                  Edit
                </Link>
                <form action={deleteProduct.bind(null, p.id)} className="inline">
                  <button type="submit" className="cursor-pointer text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-neutral-500">
                No products yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
