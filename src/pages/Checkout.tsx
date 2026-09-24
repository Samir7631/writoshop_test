import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  QrCode,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useCommerce } from "@/context/CommerceContext";
import { formatPrice } from "@/data/books";

function buildOrderId() {
  return `ORD-${Date.now().toString().slice(-6)}`;
}

export default function Checkout() {
  const { user } = useAuth();
  const { items, totalPrice, clear } = useCart();
  const { createOrder } = useCommerce();
  const navigate = useNavigate();
  const [orderId] = useState(() => buildOrderId());
  const [paymentReference, setPaymentReference] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const upiId =
    (import.meta.env.VITE_UPI_ID as string | undefined)?.trim() ||
    "writoshop@upi";
  const payeeName =
    (import.meta.env.VITE_UPI_PAYEE_NAME as string | undefined)?.trim() ||
    "WritoShop";
  const isDemoUpi = !import.meta.env.VITE_UPI_ID;

  const upiUri = useMemo(() => {
    const params = new URLSearchParams({
      pa: upiId,
      pn: payeeName,
      tr: orderId,
      am: totalPrice.toFixed(2),
      cu: "INR",
      tn: `WritoShop ${orderId}`,
    });
    return `upi://pay?${params.toString()}`;
  }, [orderId, payeeName, totalPrice, upiId]);

  if (!user) return <Navigate to="/login" replace />;
  if (items.length === 0) return <Navigate to="/cart" replace />;

  const submitPayment = (event: FormEvent) => {
    event.preventDefault();
    const reference = paymentReference.trim();

    if (reference.length < 8) {
      setError("Enter the UPI transaction reference / UTR from your payment app.");
      return;
    }

    createOrder({
      id: orderId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      paymentMethod: "UPI QR",
      paymentReference: reference,
      total: totalPrice,
      items: items.map((item) => ({
        bookId: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    clear();
    navigate("/dashboard");
  };

  const copyUpiId = async () => {
    await navigator.clipboard?.writeText(upiId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to basket
      </Link>

      <div className="mt-7 grid gap-7 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-9">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
            Simple UPI checkout
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Scan. Pay. Submit the reference.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-primary-foreground/65">
            The QR already contains the exact order amount and reference. Pay in
            any UPI app, then paste the transaction reference below.
          </p>

          {isDemoUpi && (
            <div className="mt-6 rounded-2xl border border-accent/35 bg-accent/10 p-4 text-xs leading-5 text-primary-foreground/80">
              <strong className="text-accent">Demo payment address.</strong>{" "}
              Add <code>VITE_UPI_ID</code> in Vercel before accepting real
              payments.
            </div>
          )}

          <div className="mt-7 rounded-[1.6rem] bg-white p-5 text-[#241327]">
            <div className="mx-auto w-fit rounded-2xl bg-white p-3 shadow-sm">
              <QRCodeSVG
                value={upiUri}
                size={230}
                level="M"
                marginSize={2}
                title={`Pay ${formatPrice(totalPrice)} to ${payeeName}`}
              />
            </div>

            <div className="mt-5 text-center">
              <p className="text-xs font-bold text-black/50">Pay exactly</p>
              <p className="mt-1 font-display text-4xl font-semibold">
                {formatPrice(totalPrice)}
              </p>
              <p className="mt-2 text-xs font-semibold text-black/50">
                Order reference: {orderId}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a
                href={upiUri}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#241327] px-4 py-3 text-xs font-extrabold text-white"
              >
                <Smartphone className="h-4 w-4" /> Open UPI app
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={copyUpiId}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-3 text-xs font-extrabold"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied" : upiId}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-xl sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
              <QrCode className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-primary">
                Payment confirmation
              </p>
              <h2 className="font-display text-2xl font-semibold">
                Finish your order
              </h2>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {[
              ["1", "Scan the QR", "Use Google Pay, PhonePe, Paytm, BHIM or any UPI app."],
              ["2", "Pay the shown amount", `The amount is fixed at ${formatPrice(totalPrice)}.`],
              ["3", "Enter your reference", "Copy the transaction ID / UTR shown after successful payment."],
            ].map(([number, title, copy]) => (
              <div
                key={number}
                className="flex gap-4 rounded-2xl border border-border bg-background p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                  {number}
                </span>
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {copy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={submitPayment} className="mt-7">
            <label>
              <span className="mb-2 block text-xs font-extrabold">
                UPI transaction reference / UTR
              </span>
              <input
                value={paymentReference}
                onChange={(event) => {
                  setPaymentReference(event.target.value);
                  setError("");
                }}
                placeholder="e.g. 630112408799"
                className="h-13 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
              />
            </label>

            {error && (
              <p className="mt-3 rounded-xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
                {error}
              </p>
            )}

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-sm font-extrabold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-lg">
              <CheckCircle2 className="h-4 w-4" /> I’ve paid — submit order
            </button>
          </form>

          <div className="mt-5 flex gap-3 rounded-2xl bg-secondary/60 p-4">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs leading-5 text-muted-foreground">
              Your order will show as <strong>payment verification pending</strong>.
              The admin verifies the UTR and marks the payment paid before
              approving the order.
            </p>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{items.length} item(s)</span>
              <span className="font-display text-2xl font-semibold">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
