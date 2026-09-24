import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/books";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
          <ShoppingCart className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Add some books to get started.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse books
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <Link
                to={`/products/${item.id}`}
                className="font-semibold hover:underline"
              >
                {item.title}
              </Link>
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <p className="mt-1 font-medium">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-input hover:bg-accent"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-input hover:bg-accent"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4 border-t border-border pt-6">
        <div className="flex w-full max-w-xs items-center justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clear}
            className="rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Clear cart
          </button>
          <button className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Checkout via UPI
          </button>
        </div>
      </div>
    </div>
  );
}
