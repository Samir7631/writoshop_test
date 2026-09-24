import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Heart, QrCode, ShieldCheck, ShoppingBag, Sparkles, Star } from "lucide-react";

import BookRail from "@/components/BookRail";
import Reveal from "@/components/Reveal";
import { books, formatPrice } from "@/data/books";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const book = books.find((item) => item.id === id);

  if (!book) {
    return <div className="mx-auto max-w-4xl px-4 py-24 text-center"><p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Not found</p><h1 className="mt-3 font-display text-4xl font-semibold">That book has left the shelf.</h1><Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"><ArrowLeft className="h-4 w-4" /> Back to books</Link></div>;
  }

  const related = books.filter((item) => item.category === book.category && item.id !== book.id);
  const handleAdd = () => { addItem(book); setAdded(true); window.setTimeout(() => setAdded(false), 1500); };

  return (
    <div>
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to shelves</Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[2rem] bg-secondary p-6 sm:p-10">
              <div className="soft-grid absolute inset-0 opacity-30" />
              {book.badge && <span className="bounce-soft absolute left-5 top-5 z-10 rounded-full bg-accent px-4 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-accent-foreground shadow-md">{book.badge}</span>}
              <button className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-background shadow-sm" aria-label="Save book"><Heart className="h-4 w-4" /></button>
              <div className="relative mx-auto max-w-[360px] overflow-hidden rounded-xl shadow-[0_28px_65px_rgba(45,24,48,0.22)]">
                <img src={book.image} alt={book.title} className="aspect-[3/4] w-full object-cover" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:py-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-muted-foreground"><span>{book.category}</span><span>•</span><span>{book.format}</span><span>•</span><span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> {book.rating}</span></div>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">{book.title}</h1>
            <p className="mt-3 text-base font-semibold text-muted-foreground">by {book.author}</p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{book.description}</p>

            <div className="mt-8 rounded-[1.5rem] border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">Price</p><p className="mt-1 font-display text-4xl font-semibold">{formatPrice(book.price)}</p></div>
                <p className="rounded-full bg-secondary px-3 py-2 text-xs font-extrabold text-primary">{book.inStock ? "In stock & ready" : "Out of stock"}</p>
              </div>
              <button onClick={handleAdd} disabled={!book.inStock} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-extrabold text-primary-foreground shadow-lg transition-all hover:-translate-y-1 disabled:opacity-40">
                {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />} {added ? "Added to basket" : "Add to basket"}
              </button>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {[
                  { icon: Sparkles, label: "Curated pick" },
                  { icon: QrCode, label: "UPI / GPay" },
                  { icon: ShieldCheck, label: "Simple checkout" },
                ].map((item) => <div key={item.label} className="flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-3 text-xs font-bold text-muted-foreground"><item.icon className="h-4 w-4 text-primary" /> {item.label}</div>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && <section className="border-t border-border bg-secondary/40"><div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8"><BookRail books={related} eyebrow="More like this" title={`Keep reading ${book.category.toLowerCase()}`} /></div></section>}
    </div>
  );
}
