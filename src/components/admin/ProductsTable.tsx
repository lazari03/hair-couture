import Image from "next/image";
import Link from "next/link";
import { deleteProduct, setProductInStock } from "@/lib/actions/products";
import { productImage } from "@/lib/data/category-image";
import type { ProductModel } from "@/generated/prisma/models";
import { parseProductCategories } from "@/lib/product-categories";
import { formatMoney } from "@/lib/money";

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
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  {parseProductCategories(p.category).map((category) => (
                    <span key={category} className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                      {category}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">{formatMoney(p.price)}</td>
              <td className="px-4 py-3">
                {/* On/off switch: submits the opposite state. */}
                <form action={setProductInStock.bind(null, p.id, !p.inStock)}>
                  <button
                    type="submit"
                    role="switch"
                    aria-checked={p.inStock}
                    aria-label={p.inStock ? `${p.name}: in stock (click to mark out of stock)` : `${p.name}: out of stock (click to mark in stock)`}
                    className="flex cursor-pointer items-center gap-2 whitespace-nowrap"
                  >
                    <span
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
                        p.inStock ? "bg-emerald-600" : "bg-neutral-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          p.inStock ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </span>
                    <span className={`text-xs ${p.inStock ? "text-emerald-700" : "font-medium text-red-600"}`}>
                      {p.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </button>
                </form>
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
