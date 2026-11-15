"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../lib/cart";
import { getProduct, taka, toBn, SITE } from "../../lib/products";

export default function CheckoutPage() {
  const { items, clear, loaded } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", address: "", area: "dhaka", note: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const rows = items.map((i) => ({ ...i, p: getProduct(i.slug) })).filter((r) => r.p);
  const subtotal = rows.reduce((s, r) => s + r.p.price * r.qty, 0);
  const delivery = form.area === "dhaka" ? SITE.deliveryDhaka : SITE.deliveryOutside;
  const total = subtotal + delivery;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) return setError("আপনার নাম লিখুন");
    if (!/^01[3-9]\d{8}$/.test(form.phone.trim()))
      return setError("সঠিক মোবাইল নম্বর দিন (১১ ডিজিট, যেমন 01712345678)");
    if (form.address.trim().length < 8) return setError("পূর্ণ ঠিকানা লিখুন (গ্রাম/এলাকা, থানা, জেলা)");

    setSending(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: rows.map((r) => ({ slug: r.slug, qty: r.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "অর্ডার করা যায়নি");
      clear();
      router.push(`/order-success?id=${data.orderId}`);
    } catch (err) {
      setError(err.message || "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন");
      setSending(false);
    }
  }

  if (!loaded) return <div className="container section">লোড হচ্ছে...</div>;

  if (rows.length === 0) {
    return (
      <div className="container section empty">
        <h2>আপনার কার্ট খালি 🛒</h2>
        <Link href="/" className="btn">কেনাকাটা শুরু করুন</Link>
      </div>
    );
  }

  return (
    <div className="container section checkout">
      <form onSubmit={submit} className="form">
        <h2>ডেলিভারির তথ্য দিন</h2>
        <label>আপনার নাম *
          <input value={form.name} onChange={set("name")} placeholder="যেমন: রহিমা বেগম" />
        </label>
        <label>মোবাইল নম্বর *
          <input value={form.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" inputMode="numeric" maxLength={11} />
        </label>
        <label>পূর্ণ ঠিকানা *
          <textarea rows={3} value={form.address} onChange={set("address")} placeholder="বাসা/গ্রাম, এলাকা, থানা, জেলা" />
        </label>
        <label>ডেলিভারি এরিয়া *
          <select value={form.area} onChange={set("area")}>
            <option value="dhaka">ঢাকার ভেতরে ({taka(SITE.deliveryDhaka)})</option>
            <option value="outside">ঢাকার বাইরে ({taka(SITE.deliveryOutside)})</option>
          </select>
        </label>
        <label>বিশেষ নির্দেশনা (ঐচ্ছিক)
          <input value={form.note} onChange={set("note")} placeholder="যেমন: বিকেলে ডেলিভারি দিন" />
        </label>
        {error && <div className="error">⚠️ {error}</div>}
        <button className="btn btn-big" disabled={sending}>
          {sending ? "অপেক্ষা করুন..." : `অর্ডার কনফার্ম করুন (${taka(total)})`}
        </button>
        <p className="muted center">💵 পণ্য হাতে পেয়ে টাকা দিন (ক্যাশ অন ডেলিভারি)</p>
      </form>

      <aside className="summary">
        <h3>অর্ডার সামারি</h3>
        {rows.map((r) => (
          <div className="line" key={r.slug}>
            <span>{r.p.name} × {toBn(r.qty)}</span>
            <b>{taka(r.p.price * r.qty)}</b>
          </div>
        ))}
        <div className="line"><span>সাবটোটাল</span><b>{taka(subtotal)}</b></div>
        <div className="line"><span>ডেলিভারি চার্জ</span><b>{taka(delivery)}</b></div>
        <div className="line total"><span>মোট</span><b>{taka(total)}</b></div>
      </aside>
    </div>
  );
}
