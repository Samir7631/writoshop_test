import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";

import { books, categories } from "@/data/books";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("category");

  const filtered = useMemo(
    () => (active ? books.filter((book) => book.category === active) : books),
    [active],
  );

  const setCategory = (category: string | null) => {
    if (category) setSearchParams({ category });
    else setSearchParams({});
  };

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/70 bg-secondary/50">
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <Reveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> The collection
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Find the book that fits the moment.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Browse WritoShop’s curated mix of stories, creative books, learning resources and ebooks.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Reveal className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-lg font-bold">Browse by category</p>
                <p className="text-xs text-muted-foreground">{filtered.length} {filtered.length === 1 ? "title" : "titles"} showing</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory(null)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                  !active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/25 hover:text-foreground",
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setCategory(category.name)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                    active === category.name
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-primary/25 hover:text-foreground",
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((book, index) => (
            <Reveal key={book.id} delay={index * 80}>
              <BookCard book={book} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-2xl font-bold">Nothing on this shelf yet.</p>
            <button type="button" onClick={() => setCategory(null)} className="mt-3 text-sm font-bold text-primary hover:underline">
              View all books
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
