"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../lib/cart";
import { SITE } from "../lib/products";

const LINKS = [
  { href: "/", label: "হোম" },
  { href: "/products", label: "প্রোডাক্ট" },
  { href: "/contact", label: "যোগাযোগ" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
];

export default function Header() {
  const { count } = useCart();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (h) => (h === "/" ? path === "/" : path.startsWith(h));

  return (
    <>
      <div className="topbar">
        <div className="container topbar-in">
          <span>🚚 সারা বাংলাদেশে ডেলিভারি &nbsp;|&nbsp; 💵 ক্যাশ অন ডেলিভারি</span>
          <span className="topbar-phone">📞 {SITE.phone}</span>
        </div>
      </div>
      <header className="navbar">
        <div className="container navbar-in">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <img src="/logo.png" alt={SITE.name} />
          </Link>

          <nav className={`nav-links ${open ? "open" : ""}`}>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={active(l.href) ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-right">
            <Link href="/cart" className="cart-btn" onClick={() => setOpen(false)}>
              🛒 <span>কার্ট</span>
              {count > 0 && <b className="badge">{count}</b>}
            </Link>
            <button className="burger" onClick={() => setOpen(!open)} aria-label="মেনু">
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
