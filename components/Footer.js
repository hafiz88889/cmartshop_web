import Link from "next/link";
import { SITE } from "../lib/products";
import { SOCIAL, CONTACT } from "../lib/site";
import { Facebook, Instagram, Whatsapp, Youtube } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="f-col f-left">
          <img src="/logo.png" alt={SITE.name} className="f-logo" />
          <p>{SITE.tagline}। বাচ্চা ও লেডিসদের প্রয়োজনীয় পণ্য এখন ঘরে বসেই পাবেন।</p>
          <div className="social">
            <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Whatsapp /></a>
            <a href={SOCIAL.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube /></a>
          </div>
        </div>

        <div className="f-col f-mid">
          <h4>দ্রুত লিংক</h4>
          <Link href="/">হোম</Link>
          <Link href="/products">প্রোডাক্ট</Link>
          <Link href="/category/baby">বেবি আইটেম</Link>
          <Link href="/category/ladies">লেডিস আইটেম</Link>
          <Link href="/cart">কার্ট</Link>
          <Link href="/about">আমাদের সম্পর্কে</Link>
          <Link href="/contact">যোগাযোগ</Link>
        </div>

        <div className="f-col f-right">
          <h4>যোগাযোগ</h4>
          <p>📞 {SITE.phone}</p>
          <p>✉️ {CONTACT.email}</p>
          <p>📍 {CONTACT.address}</p>
          <p>🕘 {CONTACT.hours}</p>
          <p className="pay">💵 ক্যাশ অন ডেলিভারি</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container fb-in">
          <span>© {new Date().getFullYear()} {SITE.name}। সর্বস্বত্ব সংরক্ষিত।</span>
          <span>🧸 বেবি &nbsp;•&nbsp; 👜 লেডিস</span>
        </div>
      </div>
    </footer>
  );
}
