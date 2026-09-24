import { useEffect, useRef, useState } from "react";

const scriptId = "google-identity-services";

type GoogleAccounts = {
  id: {
    initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
    renderButton: (element: HTMLElement, options: Record<string, string>) => void;
  };
};

export default function GoogleSignInButton() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (!clientId || !mountRef.current) return;

    const render = () => {
      const google = (window as typeof window & { google?: { accounts: GoogleAccounts } }).google;
      if (!google || !mountRef.current) return;
      google.accounts.id.initialize({
        client_id: clientId,
        callback: () => setMessage("Google sign-in completed. Connect this credential to your backend session next."),
      });
      mountRef.current.innerHTML = "";
      google.accounts.id.renderButton(mountRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        width: "360",
      });
    };

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === "true") render();
      else existing.addEventListener("load", render, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      render();
    }, { once: true });
    document.head.appendChild(script);
  }, [clientId]);

  if (!clientId) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setMessage("Add VITE_GOOGLE_CLIENT_ID in Vercel Environment Variables to activate Google sign-in.")}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-white px-5 py-3.5 text-sm font-bold text-[#222] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#4285F4] text-xs font-black text-white">G</span>
          Continue with Google
        </button>
        {message && <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">{message}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div ref={mountRef} className="min-h-11 w-full overflow-hidden rounded-full" />
      {message && <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">{message}</p>}
    </div>
  );
}
