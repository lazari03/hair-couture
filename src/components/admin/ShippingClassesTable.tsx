import Link from "next/link";
import { deleteShippingClass } from "@/lib/actions/shipping";
import type { ShippingClassModel } from "@/generated/prisma/models";

export function ShippingClassesTable({ shippingClasses }: { shippingClasses: ShippingClassModel[] }) {
  return (
    <div className="overflow-x-auto border border-neutral-200 bg-white">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-xs tracking-wide text-neutral-500 uppercase">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Fee</th>
            <th className="px-4 py-3 font-medium">Sort order</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {shippingClasses.map((s) => (
            <tr key={s.id} className="border-b border-neutral-100 last:border-0">
              <td className="px-4 py-3 font-medium">{s.name}</td>
              <td className="px-4 py-3">{s.fee.toLocaleString("en-US")} ALL</td>
              <td className="px-4 py-3">{s.sortOrder}</td>
              <td className="px-4 py-3">
                {s.active ? (
                  <span className="text-emerald-700">Active</span>
                ) : (
                  <span className="text-neutral-400">Inactive</span>
                )}
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <Link href={`/admin/shipping/${s.id}/edit`} className="mr-4 hover:underline">
                  Edit
                </Link>
                <form action={deleteShippingClass.bind(null, s.id)} className="inline">
                  <button type="submit" className="cursor-pointer text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {shippingClasses.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-neutral-500">
                No shipping classes yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
