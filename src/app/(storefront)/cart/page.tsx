"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatPrice, getShippingCharge } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const subtotal = getTotal();
  const shipping = getShippingCharge(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven&apos;t added any products yet.
        </p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-forest-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 p-4 border rounded-xl bg-white"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-honey-50 to-cream-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image && item.image !== "/placeholder.png" ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">🍯</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-forest-900 truncate">{item.name}</h3>
                <p className="text-lg font-bold text-forest-900 mt-1">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      className="px-2 py-1 hover:bg-muted transition-colors"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                    <button
                      className="px-2 py-1 hover:bg-muted transition-colors"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-forest-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-xl p-6 bg-white sticky top-32">
            <h2 className="text-lg font-bold text-forest-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-forest-600">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-honey-700 bg-honey-50 p-2 rounded">
                  Add {formatPrice(500 - subtotal)} more for free shipping
                </p>
              )}
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-base">Total</span>
                <span className="font-bold text-base text-forest-900">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="block mt-6">
              <Button className="w-full" size="lg">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/products" className="block mt-3">
              <Button variant="ghost" className="w-full" size="sm">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
