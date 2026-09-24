import { FormEvent, useCallback, useState } from "react";
import { ArrowRight, BookHeart, Eye, EyeOff, LockKeyhole, Sparkles } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { user, dashboardPath, loginWithPassword, loginWithGoogleCredential } =
    useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("user@writoshop.com");
  const [password, setPassword] = useState("User@123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    const result = loginWithPassword(email, password);
    if (!result.success) {
      setError(result.error || "Unable to sign in.");
      return;
    }
    navigate(result.user?.role === "admin" ? "/admin" : "/dashboard");
  };

  const handleGoogleCredential = useCallback(
    (credential: string) => {
      setError("");
      const result = loginWithGoogleCredential(credential);
      if (!result.success) {
        setError(result.error || "Google sign-in failed.");
        return;
      }
      navigate(result.user?.role === "admin" ? "/admin" : "/dashboard");
    },
    [loginWithGoogleCredential, navigate],
  );

  if (user) return <Navigate to={dashboardPath} replace />;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid min-h-[700px] overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#351632] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="paper-noise absolute inset-0 opacity-15" />
          <div className="relative">
            <span className="bounce-soft flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2b24f] text-[#2d1830]">
              <BookHeart className="h-5 w-5" />
            </span>
            <p className="mt-10 text-xs font-black uppercase tracking-[0.18em] text-[#f2b24f]">
              Secure area prototype
            </p>
            <h1 className="mt-4 max-w-xl font-display text-6xl font-semibold leading-[0.98] tracking-[-0.045em]">
              One sign-in. Two very different workspaces.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              Readers land in their personal account. Admins land in the store
              control room. The same route guard will later be backed by server
              sessions and database roles.
            </p>
          </div>

          <div className="relative grid grid-cols-3 gap-3">
            {[
              ["01", "OAuth + password"],
              ["02", "Role-based access"],
              ["03", "Persistent session"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-[10px] font-black tracking-[0.15em] text-[#f2b24f]">
                  {number}
                </p>
                <p className="mt-2 text-sm font-bold">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-xs font-extrabold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Welcome back
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Sign in to WritoShop.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Continue with Google or use a prototype email/password account.
            </p>

            <div className="mt-8">
              <GoogleSignInButton onCredential={handleGoogleCredential} />
            </div>

            <div className="my-7 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or use email and password
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-extrabold">
                  Email address
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-13 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition-all focus:border-primary/35 focus:ring-4 focus:ring-primary/5"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-extrabold">
                  Password
                </span>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-13 w-full rounded-2xl border border-border bg-background pl-11 pr-12 text-sm outline-none transition-all focus:border-primary/35 focus:ring-4 focus:ring-primary/5"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </label>

              {error && (
                <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-xs font-semibold text-destructive">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Sign in <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 rounded-[1.25rem] border border-border bg-secondary/55 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
                Prototype credentials
              </p>
              <div className="mt-3 grid gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("user@writoshop.com");
                    setPassword("User@123");
                  }}
                  className="rounded-xl bg-background p-3 text-left"
                >
                  <strong>User:</strong> user@writoshop.com / User@123
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@writoshop.com");
                    setPassword("Admin@123");
                  }}
                  className="rounded-xl bg-background p-3 text-left"
                >
                  <strong>Admin:</strong> admin@writoshop.com / Admin@123
                </button>
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] leading-5 text-muted-foreground">
              Prototype only: credentials and RBAC are stored client-side until
              the backend authentication layer is built.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
