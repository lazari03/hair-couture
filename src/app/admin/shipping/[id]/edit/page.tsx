import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ShippingClassForm } from "@/components/admin/ShippingClassForm";
import { updateShippingClass } from "@/lib/actions/shipping";

export default async function EditShippingClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shippingClass = await prisma.shippingClass.findUnique({ where: { id } });
  if (!shippingClass) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-tight">Edit shipping class</h1>
      <ShippingClassForm action={updateShippingClass.bind(null, id)} defaultValues={shippingClass} />
    </div>
  );
}
