// ======================================================
//  এই ফাইল থেকেই দোকানের সব তথ্য বদলাতে পারবেন
// ======================================================

export const SITE = {
  name: "CMart Shop",
  tagline: "বেবি ও লেডিস আইটেমের বিশ্বস্ত অনলাইন শপ",
  phone: "01852851232", // <-- আপনার ফোন নম্বর এখানে দিন
  deliveryDhaka: 60, // <-- ঢাকার ভেতরে ডেলিভারি চার্জ
  deliveryOutside: 120, // <-- ঢাকার বাইরে ডেলিভারি চার্জ
};

export const CATEGORIES = [
  { slug: "baby", name: "বেবি আইটেম", emoji: "🧸" },
  { slug: "ladies", name: "লেডিস আইটেম", emoji: "👜" },
];

export const PRODUCTS = [
  {
    slug: "spinner-water-bottle",
    name: "স্পিনার ওয়াটার বটল (৪৩০ মিলি)",
    category: "baby",
    price: 850, // <-- দাম এখানে বদলান
    oldPrice: null, // <-- আগের দাম দেখাতে চাইলে সংখ্যা দিন, যেমন 1100
    image: "/images/bottle.png",
    short: "ঘুরিয়ে খেলতে খেলতে বাচ্চা পানি খাবে",
    features: [
      "৪৩০ মিলি ধারণক্ষমতা",
      "ভেতরে SUS304 স্টিল, মরিচা ধরে না",
      "পানি থাকবে নিরাপদ ও সুরক্ষিত",
      "সহজে বহনের জন্য বেল্ট",
      "ঘুরানো রিং-এ খেলতে খেলতে মনোযোগ বাড়ে",
    ],
    description:
      "আপনার বাচ্চা পানি খেতে চায় না? এই স্পিনার ওয়াটার বটলের রঙিন নম্বর রিং ঘুরিয়ে খেলতে খেলতে বাচ্চা মজা করে পানি খাবে। ভেতরে SUS304 স্টিল থাকায় মরিচা ধরে না এবং পানি থাকে নিরাপদ।",
  },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug) {
  return PRODUCTS.filter((p) => p.category === slug);
}

const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export function toBn(n) {
  return String(n).replace(/\d/g, (d) => BN[d]);
}
export function taka(n) {
  return "৳" + toBn(n);
}
