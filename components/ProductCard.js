import Link from "next/link";
import { taka } from "../lib/products";

export default function ProductCard({ p, badge }) {
  return (
    <Link href={`/product/${p.slug}`} className="card">
      <div className="card-img">
        {badge && <span className="card-badge">{badge}</span>}
        <img src={p.image} alt={p.name} />
      </div>
      <div className="card-body">
        <h3>{p.name}</h3>
        <p className="muted">{p.short}</p>
        <div className="price-row">
          <span className="price">{taka(p.price)}</span>
          {p.oldPrice && <span className="old">{taka(p.oldPrice)}</span>}
        </div>
        <span className="btn btn-small">অর্ডার করুন</span>
      </div>
    </Link>
  );
}
