import { FormEvent, useState } from "react";
import { ArrowRight, BookHeart, Mail, Sparkles } from "lucide-react";

import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); if (email.trim()) setSent(true); };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid min-h-[680px] overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#351632] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="paper-noise absolute inset-0 opacity-15" />
          <div className="relative">
            <span className="bounce-soft flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2b24f] text-[#2d1830]"><BookHeart className="h-5 w-5" /></span>
            <p className="mt-10 text-xs font-black uppercase tracking-[0.18em] text-[#f2b24f]">Your WritoShop account</p>
            <h1 className="mt-4 max-w-xl font-display text-6xl font-semibold leading-[0.98] tracking-[-0.045em]">Keep your next read close.</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">Sign in to make checkout easier today and leave room for wishlists, order history and a personal library as WritoShop grows.</p>
          </div>
          <div className="relative grid grid-cols-3 gap-3">
            {[["01","Save favourites"],["02","Faster checkout"],["03","Build your library"]].map(([number,label]) => <div key={number} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-[10px] font-black tracking-[0.15em] text-[#f2b24f]">{number}</p><p className="mt-2 text-sm font-bold">{label}</p></div>)}
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-xs font-extrabold text-primary"><Sparkles className="h-3.5 w-3.5" /> Welcome back</div>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Sign in to WritoShop.</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Use Google for the quickest route, or continue with your email address.</p>

            <div className="mt-8"><GoogleSignInButton /></div>

            <div className="my-7 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground"><span className="h-px flex-1 bg-border" /> or continue with email <span className="h-px flex-1 bg-border" /></div>

            {sent ? (
              <div className="rounded-[1.5rem] border border-border bg-secondary/60 p-6 text-center"><Mail className="mx-auto h-6 w-6 text-primary" /><h3 className="mt-3 font-display text-2xl font-semibold">Check your inbox.</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The UI is ready for a passwordless email flow. Connect your auth backend to send the real sign-in link.</p></div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <label className="block"><span className="mb-2 block text-xs font-extrabold">Email address</span><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-13 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition-all focus:border-primary/35 focus:ring-4 focus:ring-primary/5" /></label>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-lg">Continue with email <ArrowRight className="h-4 w-4" /></button>
              </form>
            )}

            <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">By continuing, you agree to WritoShop’s account terms and privacy practices.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
