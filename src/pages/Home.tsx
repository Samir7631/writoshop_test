import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  GraduationCap,
  Palette,
  QrCode,
  Sparkles,
  Tablet,
} from "lucide-react";

import { books, categories } from "@/data/books";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";

const features = [
  {
    icon: BookOpenCheck,
    title: "Curated, not crowded",
    text: "A smaller shelf of titles selected with intention, so discovery feels simple.",
  },
  {
    icon: QrCode,
    title: "Easy UPI checkout",
    text: "A familiar payment flow with UPI and GPay built around quick ordering.",
  },
  {
    icon: Sparkles,
    title: "Fresh picks often",
    text: "New titles join the shelf regularly across stories, creativity and learning.",
  },
];

const categoryIcons = [Tablet, BookOpen, Palette, GraduationCap];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-border/70">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute -right-24 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="hero-grid absolute inset-0 opacity-35" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="hero-enter inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> New titles every week
            </div>

            <h1 className="hero-enter hero-delay-1 mt-6 font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
              Books that make curiosity a habit.
            </h1>
            <p className="hero-enter hero-delay-2 mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Discover story books, colouring books, ebooks and learning resources chosen for readers who want less scrolling and better finds.
            </p>

            <div className="hero-enter hero-delay-3 mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_12px_30px_rgba(31,74,54,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_16px_36px_rgba(31,74,54,0.24)]"
              >
                Browse the collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card/80 px-6 py-3.5 text-sm font-bold shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-card"
              >
                Why WritoShop
              </Link>
            </div>

            <div className="hero-enter hero-delay-4 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" /> {categories.length} thoughtful categories
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent-foreground/70" /> UPI / GPay payments
              </span>
            </div>
          </div>

          <div className="hero-enter hero-delay-2 relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="relative rounded-[2.25rem] border border-border/70 bg-card/70 p-4 shadow-[0_30px_80px_rgba(60,50,35,0.12)] backdrop-blur sm:p-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {books.map((book, index) => (
                  <Link
                    key={book.id}
                    to={"/products/" + book.id}
                    className={"book-float group relative overflow-hidden rounded-[1.4rem] bg-secondary shadow-sm " + (index % 2 ? "mt-6" : "-mt-1")}
                    style={{ animationDelay: String(index * 160) + "ms" }}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 via-foreground/35 to-transparent px-4 pb-4 pt-10 text-background">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-background/70">{book.category}</p>
                      <p className="mt-1 line-clamp-2 font-display text-sm font-bold leading-tight sm:text-base">{book.title}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="absolute -bottom-5 -left-3 rounded-2xl border border-border bg-background px-4 py-3 shadow-lg sm:-left-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">WritoShop promise</p>
                <p className="mt-1 font-display text-base font-bold">Curated, never cluttered.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">On our shelf now</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Start with a reader favourite.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Four different ways to read, learn, imagine and create.
            </p>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3">
            See every title <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book, index) => (
            <Reveal key={book.id} delay={index * 80}>
              <BookCard book={book} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="categories" className="border-y border-border/70 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Find your corner</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Browse by mood, not by maze.</h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index] ?? BookOpen;
              return (
                <Reveal key={category.name} delay={index * 90}>
                  <Link
                    to={"/products?category=" + encodeURIComponent(category.name)}
                    className="group flex h-full min-h-52 flex-col justify-between rounded-[1.6rem] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-8">
                      <h3 className="font-display text-2xl font-bold">{category.name}</h3>
                      <div className="mt-2 flex items-end justify-between gap-4">
                        <p className="text-sm leading-6 text-muted-foreground">{category.tagline}</p>
                        <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">A calmer bookstore</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Less noise. Better choices.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
              WritoShop is designed around a simple idea: discovering your next book should feel enjoyable before you even open the first page.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.title} className="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/60 text-accent-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-primary-foreground/15" />
          <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full border border-primary-foreground/10" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/65">Your next good find is waiting</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Take a look around the shelf.</h2>
            <p className="mt-3 text-sm leading-6 text-primary-foreground/70 sm:text-base">
              Start with stories, learning, creativity or an ebook you can keep close.
            </p>
          </div>
          <Link
            to="/products"
            className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-bold text-foreground shadow-lg transition-all duration-200 hover:-translate-y-0.5 lg:mt-0"
          >
            Shop all books <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
