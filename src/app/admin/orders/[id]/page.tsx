import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderStatusSelect } from "../order-status-select";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, MapPin, CreditCard, User, Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: { include: { images: { take: 1 } } } } },
      payment: true,
      shippingAddress: true,
      user: { select: { name: true, email: true, phone: true } },
      coupon: { select: { code: true, discountType: true, discountValue: true } },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-forest-900">
            Order #{order.orderNumber}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column - Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-forest-900 mb-4 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Items ({order.items.length})
              </h2>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-honey-50 to-cream-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          🍯
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-forest-900 truncate">
                        {item.productName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(Number(item.price))} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-forest-900 whitespace-nowrap">
                      {formatPrice(Number(item.price) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-forest-900 mb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(Number(order.subtotal))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (GST)</span>
                  <span>{formatPrice(Number(order.tax))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {Number(order.shippingCharge) === 0
                      ? "FREE"
                      : formatPrice(Number(order.shippingCharge))}
                  </span>
                </div>
                {Number(order.discount) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount
                      {order.coupon && (
                        <span className="ml-1 text-xs">
                          (                      {order.coupon.code} —{" "}
                          {order.coupon.discountType === "PERCENTAGE"
                            ? `${Number(order.coupon.discountValue)}%`
                            : formatPrice(Number(order.coupon.discountValue))}
                          )
                        </span>
                      )}
                    </span>
                    <span>-{formatPrice(Number(order.discount))}</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-forest-900">
                    {formatPrice(Number(order.total))}
                  </span>
                </div>
              </div>

              {order.payment && (
                <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Status</span>
                    <Badge
                      variant={
                        order.payment.status === "COMPLETED"
                          ? "success"
                          : order.payment.status === "FAILED"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {order.payment.status}
                    </Badge>
                  </div>
                  {order.payment.method && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Method</span>
                      <span className="capitalize">{order.payment.method}</span>
                    </div>
                  )}
                  {order.payment.razorpayPaymentId && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Razorpay ID</span>
                      <span className="font-mono text-xs">
                        {order.payment.razorpayPaymentId}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column - Customer & Address */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-forest-900 mb-4 flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer
              </h2>
              <div className="text-sm space-y-2">
                <p className="font-medium">{order.user.name || "—"}</p>
                <p className="text-muted-foreground">{order.user.email}</p>
                {order.user.phone && (
                  <p className="text-muted-foreground">{order.user.phone}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-forest-900 mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </h2>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.addressLine1}
                </p>
                {order.shippingAddress.addressLine2 && (
                  <p className="text-muted-foreground">
                    {order.shippingAddress.addressLine2}
                  </p>
                )}
                <p className="text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state} —{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-muted-foreground mt-2">
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          {order.notes && (
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-forest-900 mb-3">Notes</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {order.notes}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Order Metadata */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-forest-900 mb-3">Details</h2>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono text-xs">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span>
                    {new Date(order.updatedAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
