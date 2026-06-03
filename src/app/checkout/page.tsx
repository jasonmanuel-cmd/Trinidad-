"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { useVIPStore } from "@/store/vipStore";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, Truck, CreditCard, AlertCircle, Crown, Gift } from "lucide-react";
import { useRouter } from "next/navigation";
import { VIP_FREE_PREROLL, VIP_GIFT_BAGS } from "@/data/mockProducts";

export default function CheckoutPage() {
  const { items, total, clearCart, addItem } = useCartStore();
  const { vipMember, useCredit, addDelivery, hasMonthlyGiftBag, claimMonthlyGiftBag } = useVIPStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [creditApplied, setCreditApplied] = useState(0);
  const [perksAdded, setPerksAdded] = useState(false);

  // Auto-add VIP perks on mount
  useEffect(() => {
    if (vipMember.isVIP && !perksAdded) {
      // Add free pre-roll
      addItem(VIP_FREE_PREROLL);

      // Add monthly gift bag if eligible
      if (hasMonthlyGiftBag()) {
        const randomGiftBag = VIP_GIFT_BAGS[Math.floor(Math.random() * VIP_GIFT_BAGS.length)];
        addItem(randomGiftBag);
        claimMonthlyGiftBag();
      }

      setPerksAdded(true);
    }
  }, [vipMember.isVIP, perksAdded, addItem, hasMonthlyGiftBag, claimMonthlyGiftBag]);

  // Calculate subtotal
  const subtotal = total;

  // Calculate delivery fee
  const getDeliveryFee = () => {
    if (vipMember.isVIP) {
      return subtotal >= 20 ? 0 : 20 - subtotal; // Free if $20+, otherwise charge difference to reach $20
    }
    return subtotal >= 30 ? 0 : 10; // $10 if under $30, free if $30+
  };

  const deliveryFee = getDeliveryFee();
  const subtotalWithDelivery = subtotal + deliveryFee;

  // Apply VIP credit if available
  useEffect(() => {
    if (vipMember.isVIP && vipMember.creditBalance > 0) {
      const canApply = Math.min(10, vipMember.creditBalance);
      setCreditApplied(canApply);
    }
  }, [vipMember.isVIP, vipMember.creditBalance]);

  const finalTotal = subtotalWithDelivery - creditApplied;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Apply VIP credit if used
    if (creditApplied > 0) {
      useCredit(creditApplied);
    }

    // Track VIP delivery
    if (vipMember.isVIP) {
      addDelivery();
    }

    // Simulate order processing
    setTimeout(() => {
      clearCart();
      router.push("/order-confirmation");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <button
              onClick={() => router.push("/shop")}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold"
            >
              GO SHOPPING
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
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-12">CHECKOUT</h1>

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

            {/* VIP Badge if applicable */}
            {vipMember.isVIP && (
              <div className="p-6 bg-gradient-to-r from-primary/10 to-accent-purple/10 border border-primary/30 rounded-2xl flex gap-4">
                <Crown className="w-8 h-8 text-primary shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    VIP Member Benefits Applied
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Free delivery on orders $20+. Available credit: {formatCurrency(vipMember.creditBalance)}
                  </p>
                </div>
              </div>
            )}

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
              <div className="space-y-4">
                {vipMember.isVIP ? (
                  <div className="relative flex items-center gap-4 p-6 bg-gradient-to-r from-primary/20 to-accent-purple/20 border border-primary rounded-2xl">
                    <input type="radio" name="payment" value="cod" defaultChecked className="accent-primary" readOnly />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold">Cash on Delivery (VIP Only)</h4>
                        <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-black uppercase">Exclusive</span>
                      </div>
                      <p className="text-sm text-muted-foreground">VIP members enjoy cash on delivery exclusively.</p>
                    </div>
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                ) : (
                  <label className="relative flex items-center gap-4 p-6 bg-card border border-primary rounded-2xl cursor-pointer">
                    <input type="radio" name="payment" value="cod" defaultChecked className="accent-primary" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold">Cash on Delivery</h4>
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-black uppercase">Recommended</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Pay with cash when your driver arrives.</p>
                    </div>
                    <Truck className="w-6 h-6 text-primary" />
                  </label>
                )}
                {!vipMember.isVIP && (
                  <label className="relative flex items-center gap-4 p-6 bg-card border border-border rounded-2xl cursor-pointer opacity-50 grayscale">
                    <input type="radio" name="payment" value="cashapp" disabled className="accent-primary" />
                    <div className="flex-1">
                      <h4 className="font-bold">Cash App / Manual</h4>
                      <p className="text-sm text-muted-foreground">Instructional payment flow (Coming Soon).</p>
                    </div>
                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-8 bg-card border border-border rounded-2xl space-y-6 sticky top-24">
              <h2 className="text-2xl font-bold">YOUR ORDER</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      {item.quantity}x {item.name}
                      {item.price === 0 && (
                        <Gift className="w-3 h-3 text-accent" />
                      )}
                    </span>
                    <span className={item.price === 0 ? "font-bold text-accent" : "font-medium"}>
                      {item.price === 0 ? "FREE" : formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                {/* Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className={deliveryFee === 0 ? "text-accent font-bold" : ""}>
                      {deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}
                    </span>
                  </div>
                  {creditApplied > 0 && (
                    <div className="flex justify-between text-accent">
                      <span className="text-muted-foreground">VIP Credit</span>
                      <span>-{formatCurrency(creditApplied)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between font-black text-xl pt-4 border-t border-border">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "PROCESSING..." : "CONFIRM ORDER"}
                </button>
              </div>

              <div className="flex gap-2 text-[10px] text-muted-foreground bg-secondary/30 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0 text-primary" />
                <p className="uppercase tracking-widest leading-relaxed">
                  By clicking confirm, you agree to our 21+ age policy and ID verification requirements.
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
