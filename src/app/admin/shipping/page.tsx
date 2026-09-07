import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ShippingClassesTable } from "@/components/admin/ShippingClassesTable";

export default async function AdminShippingPage() {
  const shippingClasses = await prisma.shippingClass.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Shipping classes</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Delivery pricing tiers shown at checkout, billed in ALL (Albanian Lek) — separate from and never added
            to the EUR product total, paid by the customer on delivery.
          </p>
        </div>
        <Link
          href="/admin/shipping/new"
          className="inline-flex min-h-10 items-center bg-neutral-900 px-4 text-sm font-medium text-white hover:opacity-90"
        >
          + Add shipping class
        </Link>
      </div>

      <ShippingClassesTable shippingClasses={shippingClasses} />
    </div>
  );
}
