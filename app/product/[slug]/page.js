import Link from "next/link";
import BuyBox from "../../../components/BuyBox";
import { getProduct, taka, SITE } from "../../../lib/products";

export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  return { title: p ? `${p.name} | CMart Shop` : "CMart Shop" };
}

export default function ProductPage({ params }) {
  const p = getProduct(params.slug);
  if (!p) {
    return (
      <div className="container section">
        <h2>পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/" className="btn">হোমে যান</Link>
      </div>
    );
  }
  return (
    <div className="container section product">
      <div className="product-img">
        <img src={p.image} alt={p.name} />
      </div>
      <div className="product-info">
        <h1>{p.name}</h1>
        <div className="price-row big">
          <span className="price">{taka(p.price)}</span>
          {p.oldPrice && <span className="old">{taka(p.oldPrice)}</span>}
        </div>
        <ul className="features">
          {p.features.map((f) => (
            <li key={f}>✅ {f}</li>
          ))}
        </ul>
        <BuyBox slug={p.slug} />
        <div className="delivery-box">
          <p>🚚 ডেলিভারি চার্জ: ঢাকার ভেতরে {taka(SITE.deliveryDhaka)}, ঢাকার বাইরে {taka(SITE.deliveryOutside)}</p>
          <p>💵 পণ্য হাতে পেয়ে টাকা দিন (ক্যাশ অন ডেলিভারি)</p>
        </div>
        <p className="desc">{p.description}</p>
      </div>
    </div>
  );
}
