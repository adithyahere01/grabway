"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const STATUS_OPTIONS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  PROCESSING: "bg-blue-100 text-blue-800 border-blue-200",
  SHIPPED: "bg-indigo-100 text-indigo-800 border-indigo-200",
  DELIVERED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (newStatus === currentStatus) return;

    if (!confirm(`Change order status to ${newStatus}?`)) {
      e.target.value = currentStatus;
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to update status");
        e.target.value = currentStatus;
      }
    } catch {
      alert("Something went wrong");
      e.target.value = currentStatus;
    } finally {
      setUpdating(false);
    }
  };

  if (currentStatus === "DELIVERED" || currentStatus === "CANCELLED") {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[currentStatus]}`}>
        {currentStatus}
      </span>
    );
  }

  return (
    <div className="relative inline-flex items-center gap-1">
      <select
        defaultValue={currentStatus}
        onChange={handleChange}
        disabled={updating}
        className={`text-xs font-medium rounded-full px-2 py-1 border appearance-none cursor-pointer pr-6 ${STATUS_COLORS[currentStatus]}`}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {updating && <Loader2 className="h-3 w-3 animate-spin absolute right-1" />}
    </div>
  );
}
