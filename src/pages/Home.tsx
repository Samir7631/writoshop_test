import { ArrowRight, BookOpenCheck, Feather, Gift, GraduationCap, Palette, Sparkles, Tablet } from "lucide-react";
import { Link } from "react-router-dom";

import BookRail from "@/components/BookRail";
import HeroCarousel from "@/components/HeroCarousel";
import Reveal from "@/components/Reveal";
import { useCatalog } from "@/context/CatalogContext";
import { categories } from "@/data/books";

const categoryIcons = [Feather, GraduationCap, Palette, Tablet];
const ticker = ["Story Books", "Learning Books", "Creative Books", "Instant Ebooks", "Fresh Picks", "Curated Shelves"];

export default function Home() {
  const { books } = useCatalog();
  const bestsellers = books.filter((book) => book.badge).slice(0, 7);
  const newBooks = [...books].reverse().slice(0, 7);

  return (
    <div className="overflow-hidden">
      <HeroCarousel />

      <div className="border-b border-border bg-secondary/65 py-3">
        <div className="overflow-hidden">
          <div className="marquee-track flex items-center gap-8 pr-8">
            {[...ticker, ...ticker].map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-8 whitespace-nowrap text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                <span>{item}</span><Sparkles className="h-3.5 w-3.5 text-accent-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index];
              return (
                <Link key={category.name} to={`/products?category=${encodeURIComponent(category.name)}`} className="group relative overflow-hidden rounded-[1.6rem] border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"><Icon className="h-5 w-5" /></div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <h2 className="mt-8 font-display text-2xl font-semibold tracking-[-0.03em]">{category.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{category.tagline}</p>
                </Link>
              );
            })}
          </div>
        </Reveal>

        <BookRail books={bestsellers} eyebrow="Books readers notice" title="Trending on the shelf" />

        <Reveal className="grid overflow-hidden rounded-[2rem] bg-[#f2b24f] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <div className="bounce-soft flex h-12 w-12 items-center justify-center rounded-full bg-[#31162f] text-white"><Gift className="h-5 w-5" /></div>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#4b2a18]/65">The weekend edit</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#2c1723] sm:text-5xl">Books that pull kids away from the scroll.</h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#4b2a18]/75 sm:text-base">Stories to imagine, pages to colour and learning books designed to turn “I’m bored” into “one more page.”</p>
            <Link to="/products?category=Colouring%20Books" className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#31162f] px-6 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-1">Explore screen-free picks <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="relative min-h-[380px] overflow-hidden bg-[#38182f] p-8 sm:min-h-[440px]">
            <div className="soft-grid absolute inset-0 opacity-15" />
            <div className="relative mx-auto flex h-full max-w-2xl items-center justify-center gap-4">
              {books.slice(2, 6).map((book, index) => (
                <Link key={book.id} to={`/products/${book.id}`} className={`w-[24%] max-w-[150px] ${index % 2 ? "bounce-soft" : "float-slow"}`} style={{ animationDelay: `${index * 180}ms` }}>
                  <img src={book.image} alt={book.title} className="aspect-[3/4] w-full rounded-lg object-cover shadow-2xl" />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <BookRail books={newBooks} eyebrow="Just in" title="New & noteworthy" />
      </section>

      <section className="border-y border-border bg-secondary/55">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8 lg:py-18">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Why WritoShop</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl">Discovery should feel more like a bookstore, less like a database.</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: BookOpenCheck, title: "Curated shelves", copy: "Focused collections help you find a good book without endless filtering." },
              { icon: Sparkles, title: "Editorial discovery", copy: "Promos and lists are built around reading moods, not just product inventory." },
              { icon: Gift, title: "Easy gifting", copy: "A simple product flow makes it easy to find something thoughtful for another reader." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 90} className="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><item.icon className="h-5 w-5" /></div>
                <h3 className="mt-6 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-primary px-7 py-10 text-primary-foreground sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14 lg:py-14">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f2b24f]">Find your next page</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">There’s always room for one more good book.</h2>
          </div>
          <Link to="/products" className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-[#f2b24f] px-6 py-3.5 text-sm font-extrabold text-[#2d1830] transition-transform hover:-translate-y-1 lg:mt-0">Browse the full shelf <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </section>
    </div>
  );
}
