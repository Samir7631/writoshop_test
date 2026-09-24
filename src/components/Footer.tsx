import { Link } from "react-router-dom";
import { BookOpenText, Instagram, Mail, MoveUpRight } from "lucide-react";

const footerLinks = [
  { to: "/products", label: "All books" },
  { to: "/about", label: "Our story" },
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Account" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border/70 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.7fr_0.8fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background/10">
                <BookOpenText className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-bold">WritoShop</span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-background/65">
              A thoughtfully curated shelf of stories, learning books, creative titles and ebooks for readers who still enjoy discovering something new.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-background transition-opacity hover:opacity-75"
            >
              Browse the collection <MoveUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-background/45">Explore</p>
            <nav className="mt-4 flex flex-col gap-3">
              {footerLinks.map((item) => (
                <Link key={item.to} to={item.to} className="text-sm text-background/70 transition-colors hover:text-background">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-background/45">Stay in touch</p>
            <div className="mt-4 space-y-3 text-sm text-background/70">
              <a href="mailto:hello@writoshop.com" className="flex items-center gap-2 transition-colors hover:text-background">
                <Mail className="h-4 w-4" /> hello@writoshop.com
              </a>
              <span className="flex items-center gap-2">
                <Instagram className="h-4 w-4" /> @writoshop
              </span>
            </div>
            <p className="mt-6 rounded-2xl border border-background/10 bg-background/5 px-4 py-3 text-xs leading-5 text-background/60">
              Simple checkout with UPI / GPay.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-background/10 pt-6 text-xs text-background/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WritoShop. All rights reserved.</p>
          <p>Made for readers, learners and little explorers.</p>
        </div>
      </div>
    </footer>
  );
}
