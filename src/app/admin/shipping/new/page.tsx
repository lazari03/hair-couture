import { ShippingClassForm } from "@/components/admin/ShippingClassForm";
import { createShippingClass } from "@/lib/actions/shipping";

export default function NewShippingClassPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight">Add shipping class</h1>
      <ShippingClassForm action={createShippingClass} />
    </div>
  );
}
