"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, Truck, AlertCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PreorderCheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preorder specific: $100 minimum, free delivery
  const subtotal = total;
  const deliveryFee = 0; // Always free for preorders
  const finalTotal = subtotal + deliveryFee;
  const meetsMinimum = subtotal >= 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetsMinimum) return;

    setIsSubmitting(true);
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      router.push("/preorder-confirmation");
    }, 2000);
  };

  if (items.length === 0 || !meetsMinimum) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <h1 className="text-2xl font-bold">Preorder Requirement Not Met</h1>
            <p className="text-muted-foreground">Preorders require a minimum of $100. Your current order is {formatCurrency(total)}.</p>
            <button
              onClick={() => router.push("/preorders")}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold"
            >
              BACK TO PREORDERS
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-12">PREORDER CHECKOUT</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* ID Notice */}
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl flex gap-4">
              <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
              <div className="space-y-1">
                <h3 className="font-bold text-lg">ID Verification Required</h3>
                <p className="text-sm text-muted-foreground">
                  The person who places the order must be the person who receives it and presents a valid government-issued ID (21+) at delivery.
                </p>
              </div>
            </div>

            {/* Preorder Timeline */}
            <div className="p-6 bg-accent/10 border border-accent/30 rounded-2xl flex gap-4">
              <Clock className="w-8 h-8 text-accent shrink-0" />
              <div className="space-y-1">
                <h3 className="font-bold text-lg">Delivery Timeline</h3>
                <p className="text-sm text-muted-foreground">
                  Your preorder will be processed immediately and delivered within 2-3 business days. You'll receive a tracking number via SMS.
                </p>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="text-2xl font-bold">DELIVERY DETAILS</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <input required type="text" className="w-full bg-card border border-border rounded-xl p-4 focus:border-primary outline-none" placeholder="Matching your ID" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <input required type="tel" className="w-full bg-card border border-border rounded-xl p-4 focus:border-primary outline-none" placeholder="(661) 000-0000" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Delivery Address</label>
                  <input required type="text" className="w-full bg-card border border-border rounded-xl p-4 focus:border-primary outline-none" placeholder="Bakersfield, CA street address" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Apt / Suite / Notes</label>
                  <input type="text" className="w-full bg-card border border-border rounded-xl p-4 focus:border-primary outline-none" placeholder="e.g. Gate code, ring doorbell" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-sm">2</div>
                <h2 className="text-2xl font-bold">PAYMENT METHOD</h2>
              </div>
              <div className="relative flex items-center gap-4 p-6 bg-card border border-primary rounded-2xl">
                <input type="radio" name="payment" value="cod" defaultChecked className="accent-primary" readOnly />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">Cash on Delivery</h4>
                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-black uppercase">Preorder Only</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Pay with cash when your preorder arrives.</p>
                </div>
                <Truck className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-8 bg-card border border-border rounded-2xl space-y-6 sticky top-24">
              <h2 className="text-2xl font-bold">YOUR PREORDER</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-accent font-bold">
                    <span>Delivery</span>
                    <span>FREE</span>
                  </div>
                </div>

                <div className="flex justify-between font-black text-xl pt-4 border-t border-border">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "PROCESSING..." : "CONFIRM PREORDER"}
                </button>
              </div>

              <div className="flex gap-2 text-[10px] text-muted-foreground bg-secondary/30 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0 text-primary" />
                <p className="uppercase tracking-widest leading-relaxed">
                  By confirming, you agree to our 21+ policy, 2-3 day delivery timeline, and ID verification.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
