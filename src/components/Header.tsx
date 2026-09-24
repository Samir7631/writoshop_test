import { FormEvent, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BookOpenText, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";

import { categories } from "@/data/books";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/products?q=${encodeURIComponent(value)}` : "/products");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 shadow-[0_1px_0_rgba(45,24,48,0.08)] backdrop-blur-xl">
      <div className="bg-primary px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground sm:text-xs">
        New shelf drops every week · UPI / GPay checkout · Instant ebooks
      </div>

      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="WritoShop home">
          <span className="bounce-soft flex h-10 w-10 items-center justify-center rounded-[1rem] bg-accent text-accent-foreground shadow-sm">
            <BookOpenText className="h-5 w-5" />
          </span>
          <span className="hidden sm:block">
            <span className="font-display text-2xl font-semibold leading-none tracking-[-0.03em]">WritoShop</span>
            <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground">find your next page</span>
          </span>
        </Link>

        <form onSubmit={submitSearch} className="relative hidden flex-1 lg:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, author or category"
            className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-28 text-sm outline-none transition-all placeholder:text-muted-foreground/75 focus:border-primary/35 focus:ring-4 focus:ring-primary/5"
          />
          <button type="submit" className="absolute right-1.5 top-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-extrabold text-primary-foreground transition-transform hover:-translate-y-0.5">
            Search
          </button>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/login" className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm md:flex">
            <UserRound className="h-4 w-4" /> Sign in
          </Link>
          <Link to="/cart" className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg" aria-label={`Cart with ${totalItems} items`}>
            <ShoppingBag className="h-[18px] w-[18px]" />
            {totalItems > 0 && <span className="pulse-ring absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-black text-accent-foreground ring-2 ring-background">{totalItems}</span>}
          </Link>
          <button type="button" onClick={() => setMobileOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card lg:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="hidden border-t border-border/70 lg:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-2.5">
          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={({ isActive }) => cn("rounded-full px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.11em] transition-colors", isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground")}>Home</NavLink>
            {categories.map((category) => (
              <Link key={category.name} to={`/products?category=${encodeURIComponent(category.name)}`} className="rounded-full px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.11em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                {category.short}
              </Link>
            ))}
          </nav>
          <nav className="flex items-center gap-1">
            <NavLink to="/about" className="px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground">Our story</NavLink>
            <NavLink to="/contact" className="px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground">Help</NavLink>
          </nav>
        </div>
      </div>

      <div className={cn("grid overflow-hidden border-t border-border bg-background transition-[grid-template-rows] duration-300 lg:hidden", mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-transparent")}>
        <div className="min-h-0">
          <div className="space-y-4 px-4 py-4 sm:px-6">
            <form onSubmit={submitSearch} className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search books" className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none focus:border-primary/30" />
            </form>
            <nav className="grid grid-cols-2 gap-2">
              <Link to="/" className="rounded-2xl bg-secondary px-4 py-3 text-sm font-bold">Home</Link>
              <Link to="/products" className="rounded-2xl bg-secondary px-4 py-3 text-sm font-bold">All books</Link>
              {categories.map((category) => <Link key={category.name} to={`/products?category=${encodeURIComponent(category.name)}`} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold">{category.short}</Link>)}
              <Link to="/login" className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold">Sign in</Link>
              <Link to="/about" className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold">Our story</Link>
              <Link to="/contact" className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold">Help</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
