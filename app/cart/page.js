"use client";
import Link from "next/link";
import { useCart } from "../../lib/cart";
import { getProduct, taka, toBn } from "../../lib/products";

export default function CartPage() {
  const { items, setQty, remove } = useCart();
  const rows = items
    .map((i) => ({ ...i, p: getProduct(i.slug) }))
    .filter((r) => r.p);
  const subtotal = rows.reduce((s, r) => s + r.p.price * r.qty, 0);

  if (rows.length === 0) {
    return (
      <div className="container section empty">
        <h2>আপনার কার্ট খালি 🛒</h2>
        <Link href="/" className="btn">কেনাকাটা শুরু করুন</Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h2>আপনার কার্ট</h2>
      <div className="cart-list">
        {rows.map((r) => (
          <div className="cart-row" key={r.slug}>
            <img src={r.p.image} alt={r.p.name} />
            <div className="cart-info">
              <b>{r.p.name}</b>
              <span>{taka(r.p.price)}</span>
              <div className="qty small">
                <button onClick={() => setQty(r.slug, r.qty - 1)}>−</button>
                <span>{toBn(r.qty)}</span>
                <button onClick={() => setQty(r.slug, r.qty + 1)}>+</button>
              </div>
            </div>
            <div className="cart-right">
              <b>{taka(r.p.price * r.qty)}</b>
              <button className="link-btn" onClick={() => remove(r.slug)}>মুছুন</button>
            </div>
          </div>
        ))}
      </div>
      <div className="summary">
        <div className="line"><span>সাবটোটাল</span><b>{taka(subtotal)}</b></div>
        <p className="muted">ডেলিভারি চার্জ পরের ধাপে যুক্ত হবে</p>
        <Link href="/checkout" className="btn btn-big">অর্ডার করতে এগিয়ে যান →</Link>
      </div>
    </div>
  );
}
