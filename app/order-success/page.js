import Link from "next/link";
import { SITE } from "../../lib/products";

export default function Success({ searchParams }) {
  const id = searchParams?.id || "";
  return (
    <div className="container section success">
      <div className="tick">✓</div>
      <h1>ধন্যবাদ! আপনার অর্ডার পেয়েছি 🎉</h1>
      {id && <p className="oid">অর্ডার নম্বর: <b>{id}</b></p>}
      <p>আমাদের প্রতিনিধি খুব শীঘ্রই আপনাকে ফোন করে অর্ডার কনফার্ম করবেন।</p>
      <p>প্রয়োজনে কল করুন: <b>{SITE.phone}</b></p>
      <Link href="/" className="btn">আরও কেনাকাটা করুন</Link>
    </div>
  );
}
