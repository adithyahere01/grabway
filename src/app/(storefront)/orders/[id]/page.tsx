"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Package, Clock, Truck, CheckCircle, XCircle, ArrowLeft, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  shippingCharge: number;
  discount: number;
  total: number;
  createdAt: string;
  items: {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    product: { images: { url: string }[] };
  }[];
  payment: {
    status: string;
    method: string | null;
    razorpayPaymentId: string | null;
  } | null;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    postalCode: string;
  };
}

const statusConfig: Record<string, { icon: typeof Package; label: string; color: string }> = {
  PENDING: { icon: Clock, label: "Pending", color: "warning" },
  PROCESSING: { icon: Package, label: "Processing", color: "warning" },
  SHIPPED: { icon: Truck, label: "Shipped", color: "default" },
  DELIVERED: { icon: CheckCircle, label: "Delivered", color: "success" },
  CANCELLED: { icon: XCircle, label: "Cancelled", color: "destructive" },
};

export default function OrderDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Order not found");
        return r.json();
      })
      .then(setOrder)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-8 bg-muted rounded w-48 animate-pulse" />
          <div className="h-40 bg-muted rounded-xl animate-pulse" />
          <div className="h-60 bg-muted rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn&apos;t find this order.</p>
        <Link href="/orders">
          <Button>View All Orders</Button>
        </Link>
      </div>
    );
  }

  const status = statusConfig[order.status] || statusConfig.PENDING;
  const StatusIcon = status.icon;

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        {isSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-800">Payment Successful!</p>
                <p className="text-sm text-green-700 mt-0.5">
                  Your order has been placed and is being processed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Header */}
        <div className="border rounded-xl p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-forest-900">
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
            <div className="flex items-center gap-2">
              <StatusIcon className="h-5 w-5 text-honey-600" />
              <Badge variant={status.color as "warning" | "success" | "destructive" | "default"}>
                {status.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="border rounded-xl p-6 bg-white mt-4">
          <h2 className="font-semibold text-forest-900 mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-honey-50 to-cream-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.product.images[0] ? (
                    <img
                      src={item.product.images[0].url}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🍯</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-forest-900 truncate">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-forest-900">
                  {formatPrice(Number(item.price) * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown & Address */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Price Summary */}
          <div className="border rounded-xl p-6 bg-white">
            <h2 className="font-semibold text-forest-900 mb-4">Payment Summary</h2>
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
                  <span>Discount</span>
                  <span>-{formatPrice(Number(order.discount))}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-forest-900">{formatPrice(Number(order.total))}</span>
              </div>
            </div>
            {order.payment && (
              <div className="mt-4 pt-4 border-t text-sm">
                <p className="text-muted-foreground">
                  Payment: <span className="text-foreground font-medium">{order.payment.status}</span>
                  {order.payment.method && ` via ${order.payment.method}`}
                </p>
              </div>
            )}
          </div>

          {/* Shipping Address */}
          <div className="border rounded-xl p-6 bg-white">
            <h2 className="font-semibold text-forest-900 mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h2>
            <div className="text-sm space-y-1">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p className="text-muted-foreground">{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && (
                <p className="text-muted-foreground">{order.shippingAddress.addressLine2}</p>
              )}
              <p className="text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p className="text-muted-foreground mt-2">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link href="/orders">
            <Button variant="outline">View All Orders</Button>
          </Link>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
