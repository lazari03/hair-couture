import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { brands } from "@/lib/brands";
import { deleteProduct } from "@/lib/actions/products";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand: activeBrand } = await searchParams;
  const products = await prisma.product.findMany({
    where: activeBrand ? { brand: activeBrand } : undefined,
    orderBy: [{ brand: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Products</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex min-h-10 items-center bg-neutral-900 px-4 text-sm font-medium text-white hover:opacity-90"
        >
          + Add product
        </Link>
      </div>

      <div className="mb-5 flex gap-2 text-sm">
        <Link
          href="/admin/products"
          className={`px-3 py-1.5 ${!activeBrand ? "bg-neutral-900 text-white" : "border border-neutral-300"}`}
        >
          All
        </Link>
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={`/admin/products?brand=${b.slug}`}
            className={`px-3 py-1.5 ${activeBrand === b.slug ? "bg-neutral-900 text-white" : "border border-neutral-300"}`}
          >
            {b.slug}
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto border border-neutral-200">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-xs tracking-wide text-neutral-500 uppercase">
              <th className="px-4 py-3 font-medium">Brand</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Badge</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3 text-neutral-500">{p.brand}</td>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">€ {p.price.toLocaleString("en-US")}</td>
                <td className="px-4 py-3 text-neutral-500">{p.badge ?? "—"}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link href={`/admin/products/${p.id}/edit`} className="mr-4 hover:underline">
                    Edit
                  </Link>
                  <form action={deleteProduct.bind(null, p.id)} className="inline">
                    <button
                      type="submit"
                      className="cursor-pointer text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-500">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
