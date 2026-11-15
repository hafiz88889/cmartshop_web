"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../lib/cart";
import { toBn } from "../lib/products";

export default function BuyBox({ slug }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const router = useRouter();

  const addToCart = () => {
    add(slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
  const orderNow = () => {
    add(slug, qty);
    router.push("/checkout");
  };

  return (
    <div className="buybox">
      <div className="qty">
        <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="কমান">−</button>
        <span>{toBn(qty)}</span>
        <button onClick={() => setQty(qty + 1)} aria-label="বাড়ান">+</button>
      </div>
      <button className="btn btn-big" onClick={orderNow}>
        এখনই অর্ডার করুন →
      </button>
      <button className="btn btn-outline" onClick={addToCart}>
        {added ? "✓ কার্টে যোগ হয়েছে" : "কার্টে রাখুন"}
      </button>
    </div>
  );
}
