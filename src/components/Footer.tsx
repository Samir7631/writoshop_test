import { FormEvent } from "react";
import { ArrowRight, BookOpenText, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { categories } from "@/data/books";

export default function Footer() {
  const prevent = (event: FormEvent) => event.preventDefault();

  return (
    <footer className="mt-16 bg-[#241327] text-[#fff8ec]">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-14">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f4b45f]">Fresh shelf notes</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">A better inbox starts with better books.</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/60">New arrivals, curated reading lists and occasional creative prompts. No daily noise.</p>
          </div>
          <form onSubmit={prevent} className="flex items-center self-center rounded-full border border-white/15 bg-white/5 p-1.5">
            <input type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/35" />
            <button type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f4b45f] text-[#241327] transition-transform hover:scale-105" aria-label="Join newsletter"><ArrowRight className="h-4 w-4" /></button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4b45f] text-[#241327]"><BookOpenText className="h-5 w-5" /></span>
              <span className="font-display text-2xl font-semibold">WritoShop</span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-white/55">A modern little bookstore for stories, learning, creativity and instantly downloadable reads.</p>
            <div className="mt-6 flex gap-3">
              <a href="mailto:hello@writoshop.com" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white" aria-label="Email WritoShop"><Mail className="h-4 w-4" /></a>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70"><Instagram className="h-4 w-4" /></span>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">Browse</p>
            <nav className="mt-4 space-y-3 text-sm text-white/65">
              <Link to="/products" className="block hover:text-white">All books</Link>
              {categories.map((category) => <Link key={category.name} to={`/products?category=${encodeURIComponent(category.name)}`} className="block hover:text-white">{category.name}</Link>)}
            </nav>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">WritoShop</p>
            <nav className="mt-4 space-y-3 text-sm text-white/65">
              <Link to="/about" className="block hover:text-white">Our story</Link>
              <Link to="/contact" className="block hover:text-white">Contact</Link>
              <Link to="/login" className="block hover:text-white">My account</Link>
              <Link to="/cart" className="block hover:text-white">Basket</Link>
            </nav>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">Checkout</p>
            <p className="mt-4 text-sm leading-6 text-white/65">UPI / GPay supported. Ebook delivery can be instant once payment and backend fulfilment are connected.</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WritoShop.</p>
          <p>Built for curious minds.</p>
        </div>
      </div>
    </footer>
  );
}
