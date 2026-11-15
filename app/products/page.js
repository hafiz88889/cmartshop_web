import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../../lib/products";

export const metadata = { title: "প্রোডাক্ট | CMart Shop" };

export default function ProductsPage() {
  return (
    <div className="container section">
      <div className="sec-head">
        <h2>সব প্রোডাক্ট</h2>
        <p>আমাদের সব পণ্য এক জায়গায়</p>
      </div>
      <div className="filters">
        <Link href="/products" className="chip on">সব</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} className="chip">{c.emoji} {c.name}</Link>
        ))}
      </div>
      <div className="grid">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}
