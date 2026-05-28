import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopMenu from "@/components/ShopMenu";
import { PRODUCTS } from "@/data/mockProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Menu | Trinidad's Trippy Treats",
  description: "Browse our premium selection of cannabis flower, edibles, and concentrates for fast delivery in Bakersfield.",
};

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ShopMenu products={PRODUCTS} />
      </main>
      <Footer />
    </div>
  );
}
