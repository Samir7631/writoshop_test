import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { books, categories } from "@/data/books";
import { cn } from "@/lib/utils";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const category = searchParams.get("category");
  const query = searchParams.get("q") ?? "";

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = books.filter((book) => {
      const categoryMatch = !category || book.category === category;
      const searchMatch = !needle || `${book.title} ${book.author} ${book.category} ${book.description}`.toLowerCase().includes(needle);
      return categoryMatch && searchMatch;
    });
    if (sort === "low") return [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") return [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, query, sort]);

  const updateCategory = (value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("category", value); else next.delete("category");
    setSearchParams(next);
  };

  return (
    <div>
      <section className="border-b border-border bg-[#30162f] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Reveal className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#f2b24f]"><Sparkles className="h-3.5 w-3.5" /> Browse our shelves</p>
              <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">Find something worth opening.</h1>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/65 sm:text-base">Search by title, author or category, then narrow the shelf by what you feel like reading today.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="sticky top-[128px] z-20 rounded-[1.5rem] border border-border bg-background/95 p-4 shadow-lg backdrop-blur-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => updateCategory(null)} className={cn("rounded-full px-4 py-2 text-xs font-extrabold transition-all", !category ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground")}>All</button>
              {categories.map((item) => <button key={item.name} onClick={() => updateCategory(item.name)} className={cn("rounded-full px-4 py-2 text-xs font-extrabold transition-all", category === item.name ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground")}>{item.short}</button>)}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><Search className="h-4 w-4" /> {query ? `Search: “${query}”` : `${filtered.length} titles`}</div>
              <label className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent text-xs font-bold outline-none">
                  <option value="featured">Featured</option><option value="rating">Top rated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-9 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((book, index) => <Reveal key={book.id} delay={(index % 4) * 70}><BookCard book={book} /></Reveal>)}
        </div>

        {filtered.length === 0 && <div className="py-24 text-center"><p className="font-display text-3xl font-semibold">That shelf is empty.</p><p className="mt-2 text-sm text-muted-foreground">Try another search or category.</p></div>}
      </section>
    </div>
  );
}
