import Link from "next/link";
import { SITE } from "../../lib/products";
import { WHY } from "../../lib/site";

export const metadata = { title: "আমাদের সম্পর্কে | CMart Shop" };

export default function About() {
  return (
    <div className="container section page-narrow">
      <div className="sec-head">
        <h2>আমাদের সম্পর্কে</h2>
      </div>
      <div className="panel">
        <p>
          <b>{SITE.name}</b>-এ আপনাকে স্বাগতম! আমরা বাচ্চা ও লেডিসদের প্রয়োজনীয় পণ্য সহজে আপনার দরজায় পৌঁছে
          দিতে কাজ করি। আমাদের লক্ষ্য হলো বাছাই করা ভালো পণ্য, সহজ অর্ডার এবং নির্ভরযোগ্য সেবা।
        </p>
        <p>
          অর্ডার করতে কোনো অ্যাকাউন্ট খোলার দরকার নেই। পণ্য বেছে নিয়ে নাম, ফোন নম্বর আর ঠিকানা দিলেই হবে। আমরা
          ফোন করে কনফার্ম করে পণ্য পাঠিয়ে দেব, আর আপনি পণ্য হাতে পেয়ে টাকা দেবেন।
        </p>
      </div>
      <div className="why about-why">
        {WHY.map((w) => (
          <div key={w.title} className="why-item">
            <span>{w.icon}</span>
            <div><b>{w.title}</b><p>{w.text}</p></div>
          </div>
        ))}
      </div>
      <div className="center" style={{ marginTop: 24 }}>
        <Link href="/products" className="btn">প্রোডাক্ট দেখুন</Link>
      </div>
    </div>
  );
}
