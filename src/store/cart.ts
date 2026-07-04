import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemData {
  id: string;
  productId: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItemData[];
  isOpen: boolean;
  addItem: (item: Omit<CartItemData, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  syncFromServer: () => Promise<void>;
}

function syncAddToServer(productId: string, quantity: number) {
  fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  }).catch(() => {});
}

function syncUpdateToServer(productId: string, quantity: number) {
  fetch("/api/cart", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  }).catch(() => {});
}

function syncRemoveFromServer(productId: string) {
  fetch("/api/cart", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  }).catch(() => {});
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === item.productId);

        if (existing) {
          const newQty = Math.min(existing.quantity + (item.quantity || 1), item.stock);
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: newQty }
                : i
            ),
          });
          syncUpdateToServer(item.productId, newQty);
        } else {
          set({
            items: [...items, { ...item, quantity: item.quantity || 1 } as CartItemData],
          });
          syncAddToServer(item.productId, item.quantity || 1);
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
        syncRemoveFromServer(productId);
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.min(quantity, i.stock) }
              : i
          ),
        });
        syncUpdateToServer(productId, quantity);
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      syncFromServer: async () => {
        try {
          const res = await fetch("/api/cart");
          if (!res.ok) return;
          const serverItems = await res.json();
          if (Array.isArray(serverItems) && serverItems.length > 0) {
            set({
              items: serverItems.map((item: { productId: string; quantity: number; product: { id: string; name: string; price: number; compareAtPrice: number | null; stock: number; images: { url: string }[] } }) => ({
                id: item.product.id,
                productId: item.productId,
                name: item.product.name,
                price: Number(item.product.price),
                compareAtPrice: item.product.compareAtPrice ? Number(item.product.compareAtPrice) : undefined,
                image: item.product.images[0]?.url || "/placeholder.png",
                quantity: item.quantity,
                stock: item.product.stock,
              })),
            });
          }
        } catch {}
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
