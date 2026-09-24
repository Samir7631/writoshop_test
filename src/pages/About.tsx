import { BookHeart, Compass, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

import Reveal from "@/components/Reveal";
import { books } from "@/data/books";

const values = [
  { icon: Compass, title: "Discovery over overload", text: "We organise the shelf around curiosity, mood and usefulness rather than making readers fight through endless listings." },
  { icon: BookHeart, title: "Books with a reason", text: "Every section is designed to feel chosen: stories, creativity, learning and digital reads with a clear place in someone’s day." },
  { icon: Users, title: "Made for real readers", text: "The experience is simple enough for a quick purchase and warm enough to feel like browsing a favourite little bookstore." },
];

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#351632] text-white">
        <div className="paper-noise absolute inset-0 opacity-15" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <Reveal className="relative">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#f2b24f]"><Sparkles className="h-3.5 w-3.5" /> Our story</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">A bookstore should make you want to read before you even choose a book.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">WritoShop is being built around a simple idea: thoughtful curation and joyful discovery can make online book shopping feel human again.</p>
          </Reveal>
          <Reveal delay={120} className="relative grid grid-cols-2 gap-3">
            {books.slice(0, 4).map((book, index) => <div key={book.id} className={`${index % 2 ? "mt-8" : ""} overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2`}><img src={book.image} alt={book.title} className="aspect-[3/4] w-full rounded-xl object-cover" /></div>)}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-primary">The idea</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em]">Less catalogue. More point of view.</h2></div>
          <div className="space-y-5 text-base leading-8 text-muted-foreground"><p>Online stores are brilliant at carrying everything. They are not always brilliant at helping you decide what deserves your attention. WritoShop takes the opposite route: smaller, clearer collections with enough context to make discovery enjoyable.</p><p>The current store brings together story books, learning resources, colouring books and ebooks. As the catalogue grows, the goal stays the same: make every new shelf feel intentional rather than crowded.</p></div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">{values.map((value, index) => <Reveal key={value.title} delay={index * 90} className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary"><value.icon className="h-5 w-5" /></div><h3 className="mt-6 font-display text-2xl font-semibold">{value.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{value.text}</p></Reveal>)}</div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-10 sm:px-6 lg:px-8"><Reveal className="rounded-[2rem] bg-accent p-8 text-accent-foreground sm:p-10 lg:flex lg:items-center lg:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] opacity-60">Ready to browse?</p><h2 className="mt-2 font-display text-3xl font-semibold">Find your next page.</h2></div><Link to="/products" className="mt-5 inline-flex rounded-full bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground lg:mt-0">Explore the shelves</Link></Reveal></section>
    </div>
  );
}
