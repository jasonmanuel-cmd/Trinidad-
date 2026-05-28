"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/mockProducts";
import { Clock, Info } from "lucide-react";

export default function PreordersPage() {
  const preorderItems = PRODUCTS.filter(p => p.isPreorder);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                Upcoming Drops
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tight">PREORDERS</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Reserve limited inventory before it hits the main menu. Preorder items typically arrive within 24-48 hours of reservation.
              </p>
            </div>

            <div className="p-8 bg-card border border-border rounded-3xl space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Info className="w-6 h-6" />
                <h2 className="text-xl font-bold">How Preorders Work</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Preorder items are not available for same-day delivery. By placing a preorder, you are reserving stock from an inbound shipment. You will receive a notification as soon as the item is in stock and ready for dispatch. Payments for preorders are typically handled at the time of delivery (COD).
              </p>
            </div>

            {preorderItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {preorderItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center space-y-4 border border-dashed border-border rounded-3xl">
                <h2 className="text-2xl font-bold">No active preorders</h2>
                <p className="text-muted-foreground">Check back soon for upcoming drops and exclusive releases.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
