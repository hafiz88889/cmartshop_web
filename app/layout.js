import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import { CartProvider } from "../lib/cart";
import Header from "../components/Header";
import Footer from "../components/Footer";

const font = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "CMart Shop | বেবি ও লেডিস আইটেম",
  description: "CMart Shop - বেবি ও লেডিস আইটেমের বিশ্বস্ত অনলাইন শপ। ক্যাশ অন ডেলিভারি।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={font.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
