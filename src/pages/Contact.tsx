import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const details = [
  {
    icon: Mail,
    title: "Email",
    text: "hello@writoshop.com",
  },
  {
    icon: Phone,
    title: "Phone",
    text: "+91 98765 43210",
  },
  {
    icon: MapPin,
    title: "Address",
    text: "Writoshop, India",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Contact us
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            We'd love to hear from you
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Questions about an order or a book? Send us a message and we'll get
            back to you soon.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        {/* Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Get in touch</h2>
          <p className="text-muted-foreground">
            Reach us through any of the channels below, or use the form and
            we'll reply to your email.
          </p>
          <div className="space-y-4">
            {details.map((d) => (
              <div key={d.title} className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <d.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{d.title}</p>
                  <p className="text-sm text-muted-foreground">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <h3 className="text-xl font-semibold">Thanks for reaching out!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We've received your message and will get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
