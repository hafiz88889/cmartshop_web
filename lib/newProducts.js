// ======================================================
//  "নতুন প্রোডাক্ট লঞ্চ" সেকশনে কোন কোন পণ্য দেখাবে
// ======================================================
// নতুন পণ্য যোগ করার নিয়ম:
//   1) lib/products.js এ পণ্যটি যোগ করুন
//   2) তারপর নিচের তালিকায় পণ্যটির slug লিখে দিন
//   (অথবা products.js এর ভেতরে পণ্যটিতে  isNew: true  লিখে দিলেও হবে)

import { PRODUCTS } from "./products";

export const NEW_SLUGS = [
  "spinner-water-bottle",
  // "আরেকটা-পণ্যের-slug",
];

export const MIN_SLOTS = 4; // সেকশনে অন্তত কয়টা ঘর দেখাবে (খালি ঘরে "শীঘ্রই আসছে" লেখা থাকবে)

export function getNewProducts() {
  return PRODUCTS.filter((p) => p.isNew || NEW_SLUGS.includes(p.slug));
}
