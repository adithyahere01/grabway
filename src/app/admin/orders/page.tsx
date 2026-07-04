import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderStatusSelect } from "./order-status-select";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      items: { select: { id: true } },
      payment: { select: { status: true, method: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-forest-900 mb-6">Orders</h1>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium">Order #</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-center py-3 px-4 font-medium">Items</th>
                  <th className="text-center py-3 px-4 font-medium">Status</th>
                  <th className="text-center py-3 px-4 font-medium">Payment</th>
                  <th className="text-right py-3 px-4 font-medium">Total</th>
                  <th className="text-right py-3 px-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">
                      <Link href={`/admin/orders/${order.id}`} className="text-honey-700 hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium">{order.user.name || "—"}</p>
                      <p className="text-xs text-muted-foreground">{order.user.email}</p>
                    </td>
                    <td className="py-3 px-4 text-center">{order.items.length}</td>
                    <td className="py-3 px-4 text-center">
                      <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={order.payment?.status === "COMPLETED" ? "success" : "secondary"}>
                        {order.payment?.status || "PENDING"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
