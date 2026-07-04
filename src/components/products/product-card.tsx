"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { formatPrice, calculateDiscount } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice: number | null;
    stock: number;
    images: { url: string; altText: string | null }[];
    category: { name: string; slug: string } | null;
  };
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.compareAtPrice
    ? calculateDiscount(Number(product.price), Number(product.compareAtPrice))
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : undefined,
      image: product.images[0]?.url || "/placeholder.png",
      stock: product.stock,
    });
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setWishlisted(!data.removed);
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
    }
  };

  if (viewMode === "list") {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="group flex gap-4 p-4 border rounded-xl bg-white hover:shadow-md transition-all"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-honey-50 to-cream-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {product.images[0] ? (
            <img
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl">🍯</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          {product.category && (
            <span className="text-xs text-muted-foreground">{product.category.name}</span>
          )}
          <h3 className="font-medium text-forest-900 group-hover:text-honey-700 transition-colors mt-1">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-bold text-lg text-forest-900">
              {formatPrice(Number(product.price))}
            </span>
            {discount > 0 && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(Number(product.compareAtPrice))}
                </span>
                <Badge variant="destructive" className="text-xs">{discount}% OFF</Badge>
              </>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingCart className="h-3 w-3 mr-1" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="aspect-square bg-gradient-to-br from-honey-50 to-cream-100 flex items-center justify-center relative overflow-hidden">
        {product.images[0] ? (
          <img
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-6xl">🍯</span>
        )}
        {discount > 0 && (
          <Badge className="absolute top-3 left-3" variant="destructive">
            {discount}% OFF
          </Badge>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">Out of Stock</Badge>
          </div>
        )}
        <button
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity ${
            wishlisted ? "bg-red-50" : "bg-white hover:bg-honey-50"
          }`}
          onClick={handleToggleWishlist}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-forest-700"}`} />
        </button>
      </div>
      <div className="p-4">
        {product.category && (
          <span className="text-xs text-muted-foreground">{product.category.name}</span>
        )}
        <h3 className="font-medium text-sm text-forest-900 group-hover:text-honey-700 transition-colors line-clamp-2 mt-1">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold text-forest-900">{formatPrice(Number(product.price))}</span>
          {discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(Number(product.compareAtPrice))}
            </span>
          )}
        </div>
        <Button
          size="sm"
          className="w-full mt-3"
          variant="outline"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-3 w-3 mr-1" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </Link>
  );
}
