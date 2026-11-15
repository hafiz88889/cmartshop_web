import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getProduct, SITE } from "../../../lib/products";

// Part 1: অর্ডার আপাতত data/orders.json ফাইলে জমা হবে।
// Part 2-তে এটা Supabase ডাটাবেসে বদলে দেওয়া হবে।

const FILE = path.join(process.cwd(), "data", "orders.json");

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const address = String(body.address || "").trim();
    const area = body.area === "outside" ? "outside" : "dhaka";
    const note = String(body.note || "").trim().slice(0, 300);

    if (name.length < 2) return NextResponse.json({ error: "নাম দিন" }, { status: 400 });
    if (!/^01[3-9]\d{8}$/.test(phone))
      return NextResponse.json({ error: "সঠিক মোবাইল নম্বর দিন" }, { status: 400 });
    if (address.length < 8) return NextResponse.json({ error: "পূর্ণ ঠিকানা দিন" }, { status: 400 });

    // দাম সবসময় সার্ভার থেকে হিসাব হয়, ব্রাউজারের দামে ভরসা করা হয় না
    const items = [];
    for (const it of body.items || []) {
      const p = getProduct(it.slug);
      const qty = Math.min(20, Math.max(1, parseInt(it.qty, 10) || 1));
      if (p) items.push({ slug: p.slug, name: p.name, price: p.price, qty });
    }
    if (items.length === 0) return NextResponse.json({ error: "কার্ট খালি" }, { status: 400 });

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const delivery = area === "dhaka" ? SITE.deliveryDhaka : SITE.deliveryOutside;

    const d = new Date();
    const orderId =
      "CM" +
      String(d.getFullYear()).slice(2) +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0") +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    const order = {
      orderId,
      createdAt: d.toISOString(),
      status: "pending",
      name, phone, address, area, note,
      items, subtotal, delivery,
      total: subtotal + delivery,
      payment: "COD",
    };

    let list = [];
    try {
      list = JSON.parse(await fs.readFile(FILE, "utf8"));
    } catch (e) {}
    list.unshift(order);
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf8");

    return NextResponse.json({ ok: true, orderId });
  } catch (e) {
    return NextResponse.json({ error: "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন" }, { status: 500 });
  }
}
