"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, LogIn, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

interface WishlistItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice: number | null;
    stock: number;
    images: { url: string; altText: string | null }[];
  };
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((r) => {
        if (r.status === 401) {
          setUnauthorized(true);
          return [];
        }
        return r.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (productId: string) => {
    await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    setItems(items.filter((i) => i.productId !== productId));
  };

  const handleMoveToCart = (item: WishlistItem) => {
    addToCart({
      id: item.product.id,
      productId: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      image: item.product.images[0]?.url || "/placeholder.png",
      stock: item.product.stock,
    });
    handleRemove(item.productId);
  };

  if (loading) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-muted rounded-xl" />
              <div className="mt-3 h-4 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-forest-900 mb-6">My Wishlist</h1>
        <div className="text-center py-16">
          <LogIn className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Sign in to view your wishlist</h2>
          <p className="text-muted-foreground mb-6">
            Log in to save products you love and access them from any device
          </p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-forest-900 mb-6">
        My Wishlist {items.length > 0 && `(${items.length})`}
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Save products you love for later</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border overflow-hidden"
            >
              <Link href={`/products/${item.product.slug}`}>
                <div className="aspect-square bg-gradient-to-br from-honey-50 to-cream-100 flex items-center justify-center overflow-hidden">
                  {item.product.images[0] ? (
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl">🍯</span>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <h3 className="font-medium text-sm line-clamp-2">{item.product.name}</h3>
                <p className="font-bold mt-1">{formatPrice(Number(item.product.price))}</p>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleMoveToCart(item)}
                    disabled={item.product.stock === 0}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    {item.product.stock === 0 ? "Sold Out" : "Add to Cart"}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => handleRemove(item.productId)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
