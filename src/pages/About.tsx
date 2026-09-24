import { BookHeart, Sparkles, Users } from "lucide-react";

const values = [
  {
    icon: BookHeart,
    title: "Curated with care",
    text: "Every title on our shelf is read and hand-picked by our team.",
  },
  {
    icon: Sparkles,
    title: "Inspire young minds",
    text: "From colouring books to learning resources, we spark curiosity.",
  },
  {
    icon: Users,
    title: "For every reader",
    text: "Story books, ebooks and more for readers of all ages.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            About Writoshop
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Discover Books That Inspire Your Mind
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Writoshop is a curated bookstore bringing together ebooks, story
            books, colouring books and learning resources for readers who love
            to explore.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight">Our story</h2>
        <div className="mt-4 space-y-4 text-muted-foreground">
          <p>
            Writoshop started with a simple idea: reading should be joyful,
            accessible and inspiring. We wanted to build a place where readers
            could find thoughtfully chosen books without the noise of endless
            listings.
          </p>
          <p>
            Today we bring together a growing collection of titles across
            categories — from imaginative story books and creative colouring
            books to practical learning resources and instant ebooks. Each one
            is chosen to spark curiosity and a love of reading.
          </p>
          <p>
            Ordering is quick and payments are simple with UPI and GPay, so you
            can spend less time checking out and more time reading.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            What we stand for
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
