"use client";

import { useActionState } from "react";
import type { ShippingClassModel } from "@/generated/prisma/models";

type FormState = { error: string } | undefined;
type Action = (prevState: FormState, formData: FormData) => Promise<FormState>;

export function ShippingClassForm({
  action,
  defaultValues,
}: {
  action: Action;
  defaultValues?: ShippingClassModel;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Name
        <input
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="Tirana, Other Cities in Albania…"
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Fee (ALL)
        <input
          name="fee"
          type="number"
          step="1"
          min="0"
          required
          defaultValue={defaultValues?.fee}
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
        <span className="text-xs text-neutral-500">
          Albanian Lek — a separate currency from product prices (EUR), paid by the customer on delivery. Never
          converted or added into the EUR total.
        </span>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Sort order
        <input
          name="sortOrder"
          type="number"
          step="1"
          defaultValue={defaultValues?.sortOrder ?? 0}
          className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
        />
        <span className="text-xs text-neutral-500">Lower numbers show first at checkout.</span>
      </label>

      <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="active"
          defaultChecked={defaultValues?.active ?? true}
          className="h-4 w-4 accent-neutral-900"
        />
        Active (selectable at checkout)
      </label>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 min-h-11 cursor-pointer bg-neutral-900 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
