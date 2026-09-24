import { Heart, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { formatPrice, type Book } from "@/data/books";
import { useCart } from "@/context/CartContext";

export default function BookCard({ book }: { book: Book }) {
  const { addItem } = useCart();

  return (
    <article className="group flex h-full flex-col">
      <div className="relative rounded-[1.5rem] bg-secondary/65 p-4 transition-colors duration-300 group-hover:bg-secondary">
        {book.badge && <span className="absolute left-2 top-2 z-10 rounded-full bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.11em] text-accent-foreground shadow-sm">{book.badge}</span>}
        <button type="button" className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition-all hover:scale-105 hover:text-primary" aria-label={`Save ${book.title}`}>
          <Heart className="h-4 w-4" />
        </button>
        <Link to={`/products/${book.id}`} className="block">
          <div className="mx-auto max-w-[180px] overflow-hidden rounded-xl shadow-[0_18px_36px_rgba(45,24,48,0.18)] transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-[1deg] group-hover:shadow-[0_24px_48px_rgba(45,24,48,0.24)]">
            <img src={book.image} alt={book.title} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          <span>
            {book.format}
            {book.format !== "Ebook" && ` · ${book.stock} left`}
          </span>
          <span className="flex items-center gap-1 normal-case tracking-normal"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> {book.rating}</span>
        </div>
        <Link to={`/products/${book.id}`} className="mt-2 line-clamp-2 font-display text-xl font-semibold leading-[1.08] tracking-[-0.025em] transition-colors group-hover:text-primary">{book.title}</Link>
        <p className="mt-1.5 text-sm text-muted-foreground">by {book.author}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div>
            <p className="font-display text-2xl font-semibold text-foreground">{formatPrice(book.price)}</p>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{book.inStock ? "In stock" : "Out of stock"}</p>
          </div>
          <button type="button" onClick={() => addItem(book)} disabled={!book.inStock} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Add ${book.title} to cart`}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
