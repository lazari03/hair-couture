"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus, type OrderStatus } from "@/lib/actions/orders";

const labels: Record<OrderStatus, string> = {
  pending: "Pending",
  in_progress: "In progress",
  fulfilled: "Fulfilled",
};

const dotColors: Record<OrderStatus, string> = {
  pending: "#a3a3a3",
  in_progress: "#f59e0b",
  fulfilled: "#10b981",
};

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const [current, setCurrent] = useState(status as OrderStatus);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        value={current}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value as OrderStatus;
          const previous = current;
          setCurrent(next);
          setError(null);
          startTransition(async () => {
            try {
              const result = await updateOrderStatus(orderId, next);
              if (!result.ok) {
                setCurrent(previous);
                setError(result.error);
              }
            } catch {
              // Most likely cause in dev: the server action's reference went
              // stale after a hot-reload recompile since this page loaded —
              // a hard refresh picks up the new one. Revert instead of
              // leaving the dropdown showing a status that didn't save.
              setCurrent(previous);
              setError("Failed to save — refresh the page and try again");
            }
          });
        }}
        style={{ color: dotColors[current] }}
        className="cursor-pointer rounded border border-neutral-200 bg-white px-2 py-1 text-xs font-medium uppercase outline-none disabled:opacity-50"
      >
        {(Object.keys(labels) as OrderStatus[]).map((s) => (
          <option key={s} value={s} className="text-neutral-900">
            {labels[s]}
          </option>
        ))}
      </select>
      {error && <p className="max-w-[160px] text-right text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
