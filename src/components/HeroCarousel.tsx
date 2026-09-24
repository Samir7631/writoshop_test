import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { books } from "@/data/books";

const slides = [
  { eyebrow:"The WritoShop edit", title:"Stories worth staying up for.", copy:"Curated books for curious readers, creative kids and anyone who still loves the feeling of finding something unexpected.", cta:"Explore stories", to:"/products?category=Story%20Books", bookIds:["p1","p5","p9"], theme:"bg-[#3b1739] text-[#fff8ec]" },
  { eyebrow:"Learn by wondering", title:"Big questions. Better pages.", copy:"Illustrated learning books that make science, nature and discovery feel less like homework and more like an adventure.", cta:"Shop learning", to:"/products?category=Learning%20Books", bookIds:["p2","p6","p10"], theme:"bg-[#0d5c63] text-white" },
  { eyebrow:"Screen-free creativity", title:"Make a little mess on purpose.", copy:"Colour, doodle and create with books made for slow afternoons, busy hands and imagination without instructions.", cta:"Get creative", to:"/products?category=Colouring%20Books", bookIds:["p3","p7","p4"], theme:"bg-[#e96b4b] text-[#26120f]" },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 5600);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];
  const slideBooks = slide.bookIds.map((id) => books.find((book) => book.id === id)).filter(Boolean);

  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto max-w-[1440px]">
        <div className={`relative min-h-[590px] overflow-hidden rounded-[2rem] ${slide.theme} transition-colors duration-700 lg:min-h-[610px]`}>
          <div className="paper-noise pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-current opacity-10" />
          <div className="pointer-events-none absolute -bottom-36 left-1/3 h-96 w-96 rounded-full border border-current opacity-10" />

          <div key={active} className="relative grid min-h-[590px] items-center gap-8 px-6 py-10 sm:px-10 lg:min-h-[610px] lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-14">
            <div className="reveal-left z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-current/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {slide.eyebrow}
              </div>
              <h1 className="mt-7 font-display text-5xl font-semibold leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-[5.4rem]">{slide.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-7 opacity-80 sm:text-lg">{slide.copy}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={slide.to} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#2d1830] shadow-xl transition-transform duration-200 hover:-translate-y-1">{slide.cta} <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/products" className="inline-flex items-center rounded-full border border-current/30 px-6 py-3.5 text-sm font-bold backdrop-blur transition-colors hover:bg-white/10">Browse all books</Link>
              </div>
            </div>

            <div className="reveal-right relative mx-auto flex w-full max-w-2xl items-end justify-center gap-3 sm:gap-5 lg:justify-end">
              {slideBooks.map((book, index) => book && (
                <Link key={book.id} to={`/products/${book.id}`} className={`group relative w-[29%] max-w-[180px] ${index === 1 ? "bounce-soft -translate-y-8" : "float-slow"}`} style={{ animationDelay: `${index * 220}ms` }}>
                  <div className="book-shadow overflow-hidden rounded-xl border border-white/30 bg-white/10 p-2 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-2">
                    <img src={book.image} alt={book.title} className="aspect-[3/4] w-full rounded-lg object-cover" />
                  </div>
                  <div className="mt-3 text-center"><p className="line-clamp-2 text-xs font-extrabold leading-4 sm:text-sm">{book.title}</p></div>
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between sm:left-10 sm:right-10 lg:left-16 lg:right-16">
            <div className="flex gap-2">
              {slides.map((item, index) => <button key={item.title} type="button" onClick={() => setActive(index)} className={`h-2.5 rounded-full transition-all duration-300 ${active === index ? "w-9 bg-current" : "w-2.5 bg-current/35"}`} aria-label={`Show slide ${index + 1}`} />)}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setActive((active - 1 + slides.length) % slides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-current/30 bg-white/10 backdrop-blur transition-transform hover:-translate-y-0.5" aria-label="Previous promotion"><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => setActive((active + 1) % slides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-current/30 bg-white/10 backdrop-blur transition-transform hover:-translate-y-0.5" aria-label="Next promotion"><ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
