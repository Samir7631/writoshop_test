import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import BookCard from "@/components/BookCard";
import type { Book } from "@/data/books";

export default function BookRail({ books, title, eyebrow }: { books: Book[]; title: string; eyebrow?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => ref.current?.scrollBy({ left: direction * 720, behavior: "smooth" });

  return (
    <section className="py-14 lg:py-18">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          {eyebrow && <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => scroll(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md" aria-label={`Scroll ${title} left`}><ArrowLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => scroll(1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-md" aria-label={`Scroll ${title} right`}><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div ref={ref} className="hide-scrollbar flex snap-x gap-5 overflow-x-auto pb-5">
        {books.map((book) => <div key={book.id} className="w-[78vw] max-w-[285px] shrink-0 snap-start sm:w-[300px]"><BookCard book={book} /></div>)}
      </div>
    </section>
  );
}
