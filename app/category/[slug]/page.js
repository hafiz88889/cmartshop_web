import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import { CATEGORIES, getProductsByCategory } from "../../../lib/products";

export default function CategoryPage({ params }) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) {
    return (
      <div className="container section">
        <h2>ক্যাটাগরি পাওয়া যায়নি</h2>
        <Link href="/" className="btn">হোমে যান</Link>
      </div>
    );
  }
  const list = getProductsByCategory(cat.slug);
  return (
    <div className="container section">
      <h2>{cat.emoji} {cat.name}</h2>
      {list.length === 0 ? (
        <div className="empty">
          <p>এই ক্যাটাগরিতে শীঘ্রই নতুন পণ্য আসছে। সাথে থাকুন! 💜</p>
          <Link href="/" className="btn">হোমে ফিরে যান</Link>
        </div>
      ) : (
        <div className="grid">
          {list.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
