import { SITE } from "../../lib/products";
import { SOCIAL, CONTACT } from "../../lib/site";
import { Facebook, Instagram, Whatsapp, Youtube } from "../../components/Icons";

export const metadata = { title: "যোগাযোগ | CMart Shop" };

export default function Contact() {
  return (
    <div className="container section page-narrow">
      <div className="sec-head">
        <h2>যোগাযোগ করুন</h2>
        <p>যেকোনো প্রশ্নে আমরা সাহায্য করতে প্রস্তুত</p>
      </div>
      <div className="contact-grid">
        <div className="panel c-item"><span>📞</span><b>ফোন</b><p>{SITE.phone}</p></div>
        <div className="panel c-item"><span>✉️</span><b>ইমেইল</b><p>{CONTACT.email}</p></div>
        <div className="panel c-item"><span>📍</span><b>ঠিকানা</b><p>{CONTACT.address}</p></div>
        <div className="panel c-item"><span>🕘</span><b>সময়</b><p>{CONTACT.hours}</p></div>
      </div>
      <div className="panel center">
        <h3 style={{ color: "var(--deep)", marginBottom: 12 }}>সোশ্যাল মিডিয়ায় আমাদের সাথে থাকুন</h3>
        <div className="social big">
          <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
          <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
          <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Whatsapp /></a>
          <a href={SOCIAL.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube /></a>
        </div>
      </div>
    </div>
  );
}
