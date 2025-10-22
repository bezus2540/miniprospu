"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  size?: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (id: string, size: string | undefined, qty: number) => void;
  removeItem: (id: string, size: string | undefined) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "cart:v1";
const keyOf = (id: string, size?: string) => `${id}::${size ?? ""}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const api = useMemo<CartContextType>(
    () => ({
      items,
      addItem: (item) => {
        setItems((prev) => {
          const idx = prev.findIndex(
            (it) => keyOf(it.id, it.size) === keyOf(item.id, item.size)
          );
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
            return next;
          }
          return [...prev, item];
        });
      },
      updateQty: (id, size, qty) => {
        setItems((prev) => {
          const next = prev
            .map((it) =>
              keyOf(it.id, it.size) === keyOf(id, size) ? { ...it, qty } : it
            )
            .filter((it) => it.qty > 0);
          return next;
        });
      },
      removeItem: (id, size) => {
        setItems((prev) =>
          prev.filter((it) => keyOf(it.id, it.size) !== keyOf(id, size))
        );
      },
      clear: () => setItems([]),
    }),
    [items]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
