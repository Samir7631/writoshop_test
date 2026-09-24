import { FormEvent, useState } from "react";
import { Check, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

import Reveal from "@/components/Reveal";

const details = [
  { icon: Mail, title: "Email", text: "hello@writoshop.com" },
  { icon: Phone, title: "Phone", text: "+91 98765 43210" },
  { icon: MapPin, title: "Based in", text: "India" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Reveal className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <section>
          <div className="bounce-soft flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground"><MessageCircle className="h-5 w-5" /></div>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-primary">Talk to WritoShop</p>
          <h1 className="mt-3 max-w-xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">Questions, ideas or a book you think belongs here?</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">Send a note. The form is designed for order questions, recommendations, partnership ideas and general feedback.</p>
          <div className="mt-8 space-y-3">{details.map((detail) => <div key={detail.title} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary"><detail.icon className="h-4 w-4" /></span><div><p className="text-xs font-extrabold">{detail.title}</p><p className="mt-0.5 text-sm text-muted-foreground">{detail.text}</p></div></div>)}</div>
        </section>

        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-xl sm:p-8 lg:p-10">
          {sent ? <div className="flex min-h-[480px] flex-col items-center justify-center text-center"><div className="bounce-soft flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-6 w-6" /></div><h2 className="mt-5 font-display text-3xl font-semibold">Message captured.</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">This is currently a front-end confirmation state. Connect the form to your email/API endpoint before production.</p></div> : <form onSubmit={submit} className="space-y-5"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Send a message</p><h2 className="mt-2 font-display text-3xl font-semibold">What can we help with?</h2></div><label className="block"><span className="mb-2 block text-xs font-extrabold">Name</span><input required placeholder="Your name" className="h-13 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5" /></label><label className="block"><span className="mb-2 block text-xs font-extrabold">Email</span><input required type="email" placeholder="you@example.com" className="h-13 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5" /></label><label className="block"><span className="mb-2 block text-xs font-extrabold">Message</span><textarea required rows={6} placeholder="Tell us what’s on your mind…" className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5" /></label><button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-lg">Send message <Send className="h-4 w-4" /></button></form>}
        </section>
      </Reveal>
    </div>
  );
}
