import Link from "next/link";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../lib/products";
import { getNewProducts, MIN_SLOTS } from "../lib/newProducts";
import { SLIDES, STEPS, WHY } from "../lib/site";

export default function Home() {
  const launch = PRODUCTS[0];
  const newProducts = getNewProducts();
  const emptySlots = Math.max(0, MIN_SLOTS - newProducts.length);
  return (
    <>
      {/* ---------- স্লাইডার ---------- */}
      <section className="container slider-wrap">
        <Slider slides={SLIDES} />
      </section>

      {/* ---------- কেন আমরা ---------- */}
      <section className="container why">
        {WHY.map((w) => (
          <div key={w.title} className="why-item">
            <span>{w.icon}</span>
            <div>
              <b>{w.title}</b>
              <p>{w.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ---------- ক্যাটাগরি ---------- */}
      <section className="container section">
        <div className="sec-head">
          <h2>ক্যাটাগরি</h2>
          <p>আপনার পছন্দের ক্যাটাগরি বেছে নিন</p>
        </div>
        <div className="cats">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="cat">
              <span className="emoji">{c.emoji}</span>
              <b>{c.name}</b>
              <small>দেখুন →</small>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- নতুন প্রোডাক্ট লঞ্চ ---------- */}
      <section className="launch-bg">
        <div className="container section">
          <div className="sec-head light">
            <h2>🚀 নতুন প্রোডাক্ট লঞ্চ</h2>
            <p>সবার আগে আমাদের নতুন পণ্যগুলো দেখে নিন</p>
          </div>
          <div className="launch-grid">
            {newProducts.map((p) => (
              <ProductCard key={p.slug} p={p} badge="NEW" />
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <div key={i} className="card soon dark-soon">
                <div className="soon-in">
                  <span>🔔</span>
                  <b>নতুন পণ্য</b>
                  <p className="muted">শীঘ্রই আসছে</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- সব প্রোডাক্ট ---------- */}
      <section className="container section">
        <div className="sec-head">
          <h2>আমাদের প্রোডাক্ট</h2>
          <p>বাছাই করা পণ্য, ঘরে বসেই অর্ডার করুন</p>
        </div>
        <div className="grid">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
          <div className="card soon">
            <div className="soon-in">
              <span>✨</span>
              <b>আরও পণ্য আসছে</b>
              <p className="muted">সাথে থাকুন</p>
            </div>
          </div>
        </div>
        <div className="center" style={{ marginTop: 22 }}>
          <Link href="/products" className="btn">সব প্রোডাক্ট দেখুন</Link>
        </div>
      </section>

      {/* ---------- কীভাবে অর্ডার করবেন ---------- */}
      <section className="steps-bg">
        <div className="container section">
          <div className="sec-head">
            <h2>কীভাবে অর্ডার করবেন?</h2>
            <p>মাত্র ৪টি সহজ ধাপে</p>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div key={s.title} className="step">
                <div className="step-no">{["১", "২", "৩", "৪"][i]}</div>
                <div className="step-icon">{s.icon}</div>
                <b>{s.title}</b>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- শেষ CTA ---------- */}
      <section className="container section">
        <div className="cta">
          <div>
            <h2>আজই অর্ডার করুন!</h2>
            <p>ক্যাশ অন ডেলিভারি, পণ্য হাতে পেয়ে টাকা দিন।</p>
          </div>
          <Link href={`/product/${launch.slug}`} className="btn btn-yel btn-lg">এখনই অর্ডার করুন →</Link>
        </div>
      </section>
    </>
  );
}
