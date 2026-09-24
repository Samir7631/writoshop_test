import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { formatPrice, type Book } from "@/data/books";
import { useCart } from "@/context/CartContext";

export default function BookCard({ book }: { book: Book }) {
  const { addItem } = useCart();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border/80 bg-card shadow-[0_16px_45px_rgba(60,50,35,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_22px_55px_rgba(60,50,35,0.11)]">
      <Link to={"/products/" + book.id} className="relative block overflow-hidden bg-secondary/60">
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-70" />
        <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/90 px-3 py-1 text-[11px] font-bold text-foreground shadow-sm backdrop-blur-sm">
          {book.category}
        </span>
        <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {book.inStock ? "Ready to order" : "Out of stock"}
          </span>
          <span className="font-display text-xl font-bold text-primary">{formatPrice(book.price)}</span>
        </div>

        <Link to={"/products/" + book.id} className="font-display text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
          {book.title}
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">{book.description}</p>

        <div className="mt-5 flex gap-2 border-t border-border/70 pt-4">
          <Link
            to={"/products/" + book.id}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:border-primary/30 hover:bg-secondary"
          >
            View book
          </Link>
          <button
            type="button"
            onClick={() => addItem(book)}
            disabled={!book.inStock}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={"Add " + book.title + " to cart"}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
