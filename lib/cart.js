"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ slug, qty }]
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cmart-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("cmart-cart", JSON.stringify(items));
    } catch (e) {}
  }, [items, loaded]);

  const add = (slug, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug);
      if (found) return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug, qty }];
    });

  const setQty = (slug, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const remove = (slug) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, setQty, remove, clear, count, loaded }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
