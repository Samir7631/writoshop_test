import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-center text-3xl font-bold tracking-tight">Log in</h1>

      <div className="mt-8 space-y-3">
        <button className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
          Continue with Google
        </button>
        <button className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
          Continue with GitHub
        </button>
        <button className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
          Continue with Apple
        </button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs uppercase text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        Or
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4"
      >
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Create your account
        </Link>
      </p>
    </div>
  );
}
