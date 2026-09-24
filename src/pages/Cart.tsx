import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, QrCode, ShoppingBag, Trash2 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/books";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, clear } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return <div className="mx-auto max-w-3xl px-4 py-24 text-center"><div className="bounce-soft mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-accent text-accent-foreground"><ShoppingBag className="h-7 w-7" /></div><h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em]">Your basket needs a book.</h1><p className="mt-3 text-sm text-muted-foreground">Pick something that earns a place on your shelf.</p><Link to="/products" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground">Browse books <ArrowRight className="h-4 w-4" /></Link></div>;
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Your basket</p>
      <h1 className="mt-2 font-display text-5xl font-semibold tracking-[-0.04em]">Almost yours.</h1>

      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="grid grid-cols-[88px_1fr] gap-4 rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:grid-cols-[110px_1fr_auto] sm:items-center sm:gap-5">
              <img src={item.image} alt={item.title} className="aspect-[3/4] w-full rounded-xl object-cover shadow-md" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.13em] text-muted-foreground">{item.category} · {item.format}</p>
                <Link to={`/products/${item.id}`} className="mt-1 block font-display text-xl font-semibold leading-tight hover:text-primary">{item.title}</Link>
                <p className="mt-1 text-xs text-muted-foreground">by {item.author}</p>
                <p className="mt-3 font-display text-xl font-semibold">{formatPrice(item.price)}</p>
              </div>
              <div className="col-span-2 flex items-center justify-between border-t border-border pt-4 sm:col-span-1 sm:block sm:border-0 sm:pt-0">
                <div className="flex items-center rounded-full border border-border bg-background p-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary" aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button><span className="w-8 text-center text-sm font-bold">{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary" aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <button onClick={() => removeItem(item.id)} className="mt-0 flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-destructive sm:mt-3 sm:ml-auto"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
              </div>
            </article>
          ))}
          <button onClick={clear} className="text-xs font-bold text-muted-foreground hover:text-foreground">Clear basket</button>
        </div>

        <aside className="h-fit rounded-[1.7rem] bg-primary p-6 text-primary-foreground lg:sticky lg:top-40">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-foreground/55">Order summary</p>
          <div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span className="text-primary-foreground/65">Subtotal</span><span className="font-bold">{formatPrice(totalPrice)}</span></div><div className="flex justify-between"><span className="text-primary-foreground/65">UPI QR payment</span><span className="font-bold">No fee</span></div></div>
          <div className="mt-5 flex items-end justify-between border-t border-primary-foreground/15 pt-5"><span className="font-bold">Total</span><span className="font-display text-3xl font-semibold">{formatPrice(totalPrice)}</span></div>
          <Link to={user ? "/checkout" : "/login"} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-accent-foreground transition-transform hover:-translate-y-1">
            <QrCode className="h-4 w-4" />
            {user ? "Pay with UPI QR" : "Sign in to pay"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-center text-[10px] leading-5 text-primary-foreground/50">
            Scan the QR, pay the exact amount, then submit your UPI reference.
          </p>
        </aside>
      </div>
    </div>
  );
}
