import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, CheckCircle2, QrCode, ShoppingBag, Sparkles } from "lucide-react";

import { books, formatPrice } from "@/data/books";
import { useCart } from "@/context/CartContext";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";

const assurances = [
  { icon: Sparkles, text: "Curated by WritoShop" },
  { icon: QrCode, text: "UPI / GPay checkout" },
  { icon: CheckCircle2, text: "Simple ordering flow" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const book = books.find((item) => item.id === id);

  if (!book) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold">This book isn’t on the shelf.</h1>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to all books
        </Link>
      </div>
    );
  }

  const related = books.filter(
    (item) => item.category === book.category && item.id !== book.id,
  );

  const handleAdd = () => {
    addItem(book);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the collection
        </Link>

        <div className="mt-7 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-secondary p-3 shadow-[0_25px_70px_rgba(60,50,35,0.10)] sm:p-4">
              <img src={book.image} alt={book.title} className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
            </div>
            <div className="absolute -bottom-4 right-5 rounded-2xl border border-border bg-background px-4 py-3 shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Category</p>
              <p className="mt-1 text-sm font-bold">{book.category}</p>
            </div>
          </Reveal>

          <Reveal delay={100} className="flex flex-col justify-center py-2 lg:py-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">{book.category}</span>
              <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
                {book.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">{book.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{book.description}</p>

            <div className="mt-8 flex flex-wrap items-end gap-5 border-y border-border py-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Price</p>
                <p className="mt-1 font-display text-4xl font-bold text-primary">{formatPrice(book.price)}</p>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={!book.inStock}
                className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_12px_28px_rgba(31,74,54,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                {added ? "Added to cart" : "Add to cart"}
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {assurances.map((item) => (
                <div key={item.text} className="flex items-center gap-2 rounded-2xl bg-secondary/60 px-3.5 py-3 text-xs font-semibold text-muted-foreground">
                  <item.icon className="h-4 w-4 shrink-0 text-primary" /> {item.text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border/70 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <Reveal className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Keep browsing</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">More in {book.category}</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 80}>
                  <BookCard book={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
