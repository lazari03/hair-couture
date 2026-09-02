import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { brands } from "@/lib/brands";

export default async function AdminDashboard() {
  const [productCounts, orderStats] = await Promise.all([
    prisma.product.groupBy({ by: ["brand"], _count: { _all: true } }),
    prisma.order.groupBy({ by: ["brand"], _count: { _all: true }, _sum: { total: true } }),
  ]);

  const productsByBrand = Object.fromEntries(productCounts.map((p) => [p.brand, p._count._all]));
  const ordersByBrand = Object.fromEntries(orderStats.map((o) => [o.brand, o._count._all]));
  const revenueByBrand = Object.fromEntries(orderStats.map((o) => [o.brand, o._sum.total ?? 0]));

  const totalProducts = productCounts.reduce((sum, p) => sum + p._count._all, 0);
  const totalOrders = orderStats.reduce((sum, o) => sum + o._count._all, 0);
  const totalSales = orderStats.reduce((sum, o) => sum + (o._sum.total ?? 0), 0);

  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mb-6 text-sm text-neutral-500">All 3 brands, at a glance.</p>

      <div className="mb-8 grid grid-cols-3 divide-x divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        <div className="p-5 text-center sm:text-left">
          <div className="text-3xl font-semibold tabular-nums">
            €{Math.round(totalSales).toLocaleString("en-US")}
          </div>
          <div className="text-xs text-neutral-500">Total sales</div>
        </div>
        <div className="p-5 text-center sm:text-left">
          <div className="text-3xl font-semibold tabular-nums">{totalOrders}</div>
          <div className="text-xs text-neutral-500">Total orders</div>
        </div>
        <div className="p-5 text-center sm:text-left">
          <div className="text-3xl font-semibold tabular-nums">{totalProducts}</div>
          <div className="text-xs text-neutral-500">Total products</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {brands.map((b) => (
          <div
            key={b.slug}
            style={{ "--accent": b.colors.accent } as React.CSSProperties}
            className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
          >
            <div className="h-1.5 bg-[var(--accent)]" />
            <div className="p-5">
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, no next/image benefit */}
                <img src={b.logo} alt="" className="h-4 w-auto" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-2xl font-semibold tabular-nums">{productsByBrand[b.slug] ?? 0}</div>
                  <div className="text-xs text-neutral-500">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tabular-nums">{ordersByBrand[b.slug] ?? 0}</div>
                  <div className="text-xs text-neutral-500">Orders</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tabular-nums">
                    €{Math.round(revenueByBrand[b.slug] ?? 0).toLocaleString("en-US")}
                  </div>
                  <div className="text-xs text-neutral-500">Revenue</div>
                </div>
              </div>
              <div className="mt-5 flex gap-2 text-xs">
                <Link
                  href={`/admin/products?brand=${b.slug}`}
                  className="flex-1 rounded border border-neutral-200 py-2 text-center hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  View products
                </Link>
                <Link
                  href={`/admin/orders?brand=${b.slug}`}
                  className="flex-1 rounded border border-neutral-200 py-2 text-center hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  View orders
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
