import {
  Banknote,
  Box,
  CircleCheck,
  Clock3,
  CreditCard,
  RotateCcw,
  UserRound,
} from "lucide-react";

import Reveal from "@/components/Reveal";
import { useAuth } from "@/context/AuthContext";
import { useCommerce } from "@/context/CommerceContext";
import { formatPrice } from "@/data/books";

function statusClass(value: string) {
  if (["Delivered", "Paid", "Completed", "Approved"].includes(value)) {
    return "bg-emerald-500/10 text-emerald-700";
  }
  if (["Pending approval", "Pending", "Verification pending", "Requested", "Processing"].includes(value)) {
    return "bg-amber-500/12 text-amber-800";
  }
  return "bg-secondary text-muted-foreground";
}

export default function UserDashboard() {
  const { user } = useAuth();
  const { orders } = useCommerce();

  if (!user) return null;

  const myOrders = orders.filter(
    (order) => order.userId === user.id || order.userEmail === user.email,
  );
  const paidTotal = myOrders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.total, 0);
  const activeOrders = myOrders.filter((order) =>
    ["Pending approval", "Approved", "Processing"].includes(order.status),
  );
  const refundOrders = myOrders.filter((order) => order.refundStatus !== "None");

  const stats = [
    { label: "Total orders", value: myOrders.length, icon: Box },
    { label: "Active orders", value: activeOrders.length, icon: Clock3 },
    { label: "Paid value", value: formatPrice(paidTotal), icon: Banknote },
    { label: "Refund cases", value: refundOrders.length, icon: RotateCcw },
  ];

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Reveal className="overflow-hidden rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-10 lg:flex lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
            Reader dashboard
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Welcome back, {user.name.split(" ")[0]}.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/65">
            Track placed orders, payment state and refunds from one place.
          </p>
        </div>
        <div className="mt-6 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-xs lg:mt-0">
          <p className="font-bold">{user.email}</p>
          <p className="mt-1 text-primary-foreground/55">
            Signed in via {user.provider}
          </p>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 70}
            className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                <stat.icon className="h-4 w-4" />
              </span>
              <span className="font-display text-3xl font-semibold">{stat.value}</span>
            </div>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <section className="rounded-[1.7rem] border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
                Orders
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">
                Past & placed orders
              </h2>
            </div>
            <CircleCheck className="h-5 w-5 text-muted-foreground" />
          </div>

          {myOrders.length === 0 ? (
            <div className="py-14 text-center text-sm text-muted-foreground">
              No orders are linked to this prototype account yet.
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {myOrders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl border border-border bg-background p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black">{order.id}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Placed {order.placedAt}
                      </p>
                    </div>
                    <p className="font-display text-xl font-semibold">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    {order.items
                      .map((item) => `${item.title} × ${item.quantity}`)
                      .join(", ")}
                  </p>

                  {order.paymentReference && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      UPI reference: <span className="font-semibold text-foreground">{order.paymentReference}</span>
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.09em] ${statusClass(order.status)}`}
                    >
                      {order.status}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.09em] ${statusClass(order.paymentStatus)}`}
                    >
                      Payment: {order.paymentStatus}
                    </span>
                    {order.refundStatus !== "None" && (
                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.09em] ${statusClass(order.refundStatus)}`}
                      >
                        Refund: {order.refundStatus}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="space-y-6">
          <section className="rounded-[1.7rem] border border-border bg-card p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
              <UserRound className="h-5 w-5" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-semibold">
              Basic details
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-bold text-muted-foreground">Name</dt>
                <dd className="mt-1 font-semibold">{user.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-muted-foreground">Email</dt>
                <dd className="mt-1 break-all font-semibold">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-muted-foreground">Role</dt>
                <dd className="mt-1 font-semibold capitalize">{user.role}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-[1.7rem] border border-border bg-[#f4b45f] p-6 text-[#2d1830]">
            <CreditCard className="h-5 w-5" />
            <h2 className="mt-4 font-display text-2xl font-semibold">
              Payment status
            </h2>
            <p className="mt-2 text-sm leading-6 opacity-70">
              {myOrders.filter((order) => ["Pending", "Verification pending"].includes(order.paymentStatus)).length} pending
              payment(s), {myOrders.filter((order) => order.paymentStatus === "Paid").length} paid.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
