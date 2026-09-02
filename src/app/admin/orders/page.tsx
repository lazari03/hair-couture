import { prisma } from "@/lib/prisma";
import { getBrand } from "@/lib/brands";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { OrderFilters } from "@/components/admin/OrderFilters";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; status?: string }>;
}) {
  const { brand: activeBrandSlug, status: activeStatus } = await searchParams;

  const orders = await prisma.order.findMany({
    where: {
      ...(activeBrandSlug ? { brand: activeBrandSlug } : {}),
      ...(activeStatus ? { status: activeStatus } : {}),
    },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight">Orders</h1>

      <OrderFilters count={orders.length} />

      <div className="flex flex-col gap-4">
        {orders.map((o) => {
          const brand = getBrand(o.brand);
          return (
            <div
              key={o.id}
              style={{ borderLeftColor: brand?.colors.accent ?? "#d4d4d4" }}
              className="border border-neutral-200 border-l-4 bg-white p-5"
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3 border-b border-neutral-100 pb-3">
                <div>
                  <div className="text-sm font-medium">
                    {o.firstName} {o.lastName} ·{" "}
                    <span style={{ color: brand?.colors.accent }} className="font-medium">
                      {o.brand}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {o.email} · {o.phone}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {o.address}, {o.city} {o.postalCode}, {o.country}
                  </div>
                </div>
                <div className="text-right text-xs text-neutral-500">
                  <div className="mb-1.5">{o.createdAt.toLocaleString("en-GB")}</div>
                  <OrderStatusSelect orderId={o.id} status={o.status} />
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                {o.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} <span className="text-neutral-500">({item.variant}) × {item.qty}</span>
                    </span>
                    <span>€ {(item.price * item.qty).toLocaleString("en-US")}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap justify-end gap-6 border-t border-neutral-100 pt-3 text-sm">
                <span className="text-neutral-500">Subtotal: € {o.subtotal.toLocaleString("en-US")}</span>
                {o.couponCode && (
                  <span className="text-emerald-700">
                    {o.couponCode}: -€ {o.discount.toLocaleString("en-US")}
                  </span>
                )}
                <span className="font-medium">Total: € {o.total.toLocaleString("en-US")}</span>
              </div>
            </div>
          );
        })}
        {orders.length === 0 && (
          <div className="border border-neutral-200 bg-white px-4 py-10 text-center text-neutral-500">
            No orders yet.
          </div>
        )}
      </div>
    </div>
  );
}
