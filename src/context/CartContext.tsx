import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Book } from "@/data/books";

export type CartItem = Book & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "writoshop-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (book: Book) =>
      setItems((prev) => {
        const existing = prev.find((i) => i.id === book.id);
        if (existing) {
          return prev.map((i) =>
            i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        }
        return [...prev, { ...book, quantity: 1 }];
      });

    const removeItem = (id: string) =>
      setItems((prev) => prev.filter((i) => i.id !== id));

    const updateQuantity = (id: string, quantity: number) =>
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((i) => i.id !== id)
          : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
      );

    const clear = () => setItems([]);

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: items.reduce((sum, i) => sum + i.quantity * i.price, 0),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
