import { FormEvent, useMemo, useState } from "react";
import {
  Banknote,
  BookPlus,
  Boxes,
  CircleDollarSign,
  ClipboardCheck,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import Reveal from "@/components/Reveal";
import { useCatalog } from "@/context/CatalogContext";
import { useCommerce } from "@/context/CommerceContext";
import { categories, formatPrice, type Book } from "@/data/books";

const emptyForm = {
  title: "",
  author: "",
  category: "Story Books",
  price: "299",
  description: "",
  image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=82",
  rating: "4.5",
  badge: "",
  format: "Paperback",
  stock: "10",
};

export default function AdminDashboard() {
  const {
    orders,
    approveOrder,
    advanceOrder,
    setRefundStatus,
    markPaymentPaid,
    resetOrders,
  } = useCommerce();
  const { books, addBook, deleteBook, updateStock, resetCatalog } = useCatalog();
  const [form, setForm] = useState(emptyForm);

  const paidSales = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter((order) => order.status === "Pending approval");
  const totalStock = books.reduce((sum, book) => sum + book.stock, 0);

  const lowStock = useMemo(
    () => books.filter((book) => book.stock <= 5),
    [books],
  );

  const submitBook = (event: FormEvent) => {
    event.preventDefault();
    addBook({
      title: form.title,
      author: form.author,
      category: form.category,
      price: Number(form.price),
      description: form.description,
      image: form.image,
      rating: Number(form.rating),
      badge: form.badge || undefined,
      format: form.format as Book["format"],
      stock: Number(form.stock),
    });
    setForm(emptyForm);
  };

  const stats = [
    { label: "Paid sales", value: formatPrice(paidSales), icon: Banknote },
    { label: "Pending orders", value: pendingOrders.length, icon: ClipboardCheck },
    { label: "Books listed", value: books.length, icon: Boxes },
    { label: "Units in stock", value: totalStock, icon: PackageCheck },
  ];

  return (
    <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Reveal className="overflow-hidden rounded-[2rem] bg-[#28132a] p-7 text-white sm:p-10 lg:flex lg:items-end lg:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-accent">
            <ShieldCheck className="h-4 w-4" /> Admin control room
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Store master control.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            Orders, payments, refunds, inventory and front-end catalogue management
            are all wired as a local prototype before the backend layer is added.
          </p>
        </div>
        <button
          onClick={() => {
            resetOrders();
            resetCatalog();
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-white/70 hover:text-white lg:mt-0"
        >
          <RefreshCcw className="h-4 w-4" /> Reset demo data
        </button>
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

      <div className="mt-8 grid gap-6 2xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-[1.7rem] border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
                Order operations
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">
                Approvals, payments & refunds
              </h2>
            </div>
            <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="pb-3">Order</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Refund</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border/70 align-top">
                    <td className="py-4">
                      <p className="font-bold">{order.id}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{order.placedAt}</p>
                    </td>
                    <td className="py-4">
                      <p className="font-semibold">{order.userName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{order.userEmail}</p>
                    </td>
                    <td className="py-4 font-semibold">{formatPrice(order.total)}</td>
                    <td className="py-4">{order.status}</td>
                    <td className="py-4">
                      <p>{order.paymentStatus}</p>
                      {order.paymentReference && (
                        <p className="mt-1 max-w-[150px] break-all text-[10px] font-semibold text-muted-foreground">
                          UTR: {order.paymentReference}
                        </p>
                      )}
                    </td>
                    <td className="py-4">{order.refundStatus}</td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        {order.status === "Pending approval" && order.paymentStatus === "Paid" && (
                          <button
                            onClick={() => approveOrder(order.id)}
                            className="rounded-full bg-primary px-3 py-2 text-[10px] font-black uppercase tracking-[0.08em] text-primary-foreground"
                          >
                            Approve
                          </button>
                        )}
                        {["Approved", "Processing"].includes(order.status) && (
                          <button
                            onClick={() => advanceOrder(order.id)}
                            className="rounded-full bg-secondary px-3 py-2 text-[10px] font-black uppercase tracking-[0.08em]"
                          >
                            Advance
                          </button>
                        )}
                        {["Pending", "Verification pending"].includes(order.paymentStatus) && (
                          <button
                            onClick={() => markPaymentPaid(order.id)}
                            className="rounded-full border border-border px-3 py-2 text-[10px] font-black uppercase tracking-[0.08em]"
                          >
                            {order.paymentStatus === "Verification pending"
                              ? "Verify payment"
                              : "Mark paid"}
                          </button>
                        )}
                        {order.refundStatus === "Requested" && (
                          <button
                            onClick={() => setRefundStatus(order.id, "Approved")}
                            className="rounded-full border border-border px-3 py-2 text-[10px] font-black uppercase tracking-[0.08em]"
                          >
                            Approve refund
                          </button>
                        )}
                        {order.refundStatus === "Approved" && (
                          <button
                            onClick={() => setRefundStatus(order.id, "Completed")}
                            className="rounded-full bg-accent px-3 py-2 text-[10px] font-black uppercase tracking-[0.08em] text-accent-foreground"
                          >
                            Complete refund
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[1.7rem] border border-border bg-card p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
            Stock watch
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold">
            Low stock
          </h2>
          <div className="mt-5 space-y-3">
            {(lowStock.length ? lowStock : books.slice(0, 4)).map((book) => (
              <div
                key={book.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-16 w-12 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{book.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {book.stock} units
                  </p>
                </div>
                <input
                  type="number"
                  min={0}
                  value={book.stock}
                  onChange={(event) =>
                    updateStock(book.id, Number(event.target.value))
                  }
                  className="h-9 w-20 rounded-xl border border-border bg-card px-2 text-center text-sm font-bold"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[1.7rem] border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <BookPlus className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
                Catalogue
              </p>
              <h2 className="font-display text-2xl font-semibold">Add a book</h2>
            </div>
          </div>

          <form onSubmit={submitBook} className="mt-5 grid gap-4">
            {[
              ["title", "Title"],
              ["author", "Author"],
              ["price", "Price"],
              ["image", "Image URL"],
              ["rating", "Rating"],
              ["stock", "Stock"],
              ["badge", "Badge (optional)"],
            ].map(([key, label]) => (
              <label key={key}>
                <span className="mb-1.5 block text-xs font-bold">{label}</span>
                <input
                  required={key !== "badge"}
                  value={form[key as keyof typeof form]}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [key]: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary/30"
                />
              </label>
            ))}

            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="mb-1.5 block text-xs font-bold">Category</span>
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category.name}>{category.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-bold">Format</span>
                <select
                  value={form.format}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      format: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
                >
                  <option>Paperback</option>
                  <option>Hardcover</option>
                  <option>Ebook</option>
                </select>
              </label>
            </div>

            <label>
              <span className="mb-1.5 block text-xs font-bold">Description</span>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-primary/30"
              />
            </label>

            <button className="rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground">
              Add book to storefront
            </button>
          </form>
        </section>

        <section className="rounded-[1.7rem] border border-border bg-card p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
            Inventory master
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold">
            Front-end catalogue
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {books.map((book) => (
              <article
                key={book.id}
                className="flex gap-3 rounded-2xl border border-border bg-background p-3"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-24 w-18 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-display text-lg font-semibold leading-tight">
                    {book.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {book.author} · {book.stock} units
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold">{formatPrice(book.price)}</span>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 text-destructive"
                      aria-label={`Delete ${book.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
