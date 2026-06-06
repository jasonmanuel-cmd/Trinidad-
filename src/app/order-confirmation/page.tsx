"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Truck, ShieldCheck, Mail, Gift, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useOrderStore, Order } from "@/store/useOrderStore";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { getOrder } = useOrderStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract orderId from URL on client-side only
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get("orderId");
      if (orderId) {
        const foundOrder = getOrder(orderId);
        setOrder(foundOrder || null);
      }
      setLoading(false);
    }
  }, [getOrder]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="animate-spin">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="max-w-2xl w-full px-4 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black">Order Not Found</h1>
              <p className="text-muted-foreground">We couldn't find your order. Please try again.</p>
            </div>
            <Link
              href="/shop"
              className="inline-block py-3 px-8 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              BACK TO SHOP
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const freeItems = order.items.filter((item) => item.price === 0);
  const paidItems = order.items.filter((item) => item.price > 0);

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
              Thank you for choosing Trippy Head Stash Delivery. Your order <span className="text-foreground font-bold">{order.orderNumber}</span> has been received.
            </p>
          </div>

          {/* Order Items Summary */}
          {order.items.length > 0 && (
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

              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{order.deliveryFee === 0 ? "FREE" : formatCurrency(order.deliveryFee)}</span>
                </div>
                {order.vipCreditUsed > 0 && (
                  <div className="flex justify-between text-sm text-accent">
                    <span className="text-muted-foreground">VIP Credit Used</span>
                    <span className="font-bold">-{formatCurrency(order.vipCreditUsed)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-border flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(order.total)}</span>
                </div>
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
