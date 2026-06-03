"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Truck, ShieldCheck, Mail, Gift } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useVIPStore } from "@/store/vipStore";
import { formatCurrency } from "@/lib/utils";

export default function OrderConfirmationPage() {
  const { items } = useCartStore();
  const { vipMember } = useVIPStore();
  const [orderNumber] = useState("TT-" + Math.floor(Math.random() * 90000 + 10000));

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeItems = items.filter(item => item.price === 0);
  const paidItems = items.filter(item => item.price > 0);
  const paidSubtotal = paidItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-24">
        <div className="max-w-2xl w-full px-4 text-center space-y-12">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">ORDER CONFIRMED</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for choosing Trinidad&apos;s Trippy Treats. Your order <span className="text-foreground font-bold">{orderNumber}</span> has been received.
            </p>
          </div>

          {/* Order Items Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-card border border-border rounded-2xl text-left space-y-4">
              <h3 className="font-bold text-lg">Order Items</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {paidItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Free VIP Perks */}
              {freeItems.length > 0 && (
                <>
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 font-bold text-accent">
                      <Gift className="w-5 h-5" />
                      <span>VIP Perks (Free)</span>
                    </div>
                    {freeItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          {item.quantity}x {item.name}
                          <Gift className="w-3 h-3 text-accent" />
                        </span>
                        <span className="text-accent font-bold">FREE</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-border flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span>{formatCurrency(paidSubtotal + 0)}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-xs text-muted-foreground">Estimated arrival within 60 minutes in Bakersfield.</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold">ID Ready</h3>
              <p className="text-xs text-muted-foreground">Have your 21+ government-issued ID ready for the driver.</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold">Email Update</h3>
              <p className="text-xs text-muted-foreground">We&apos;ve sent a receipt and status link to your email.</p>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/shop"
              className="inline-flex px-12 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
