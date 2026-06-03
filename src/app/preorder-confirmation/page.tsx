import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Truck, Clock, Gift } from "lucide-react";
import Link from "next/link";

export default function PreorderConfirmationPage() {
  const orderNumber = "PRE-" + Math.floor(Math.random() * 90000 + 10000);

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
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">PREORDER CONFIRMED</h1>
            <p className="text-xl text-muted-foreground">
              Your preorder <span className="text-foreground font-bold">{orderNumber}</span> has been received and will arrive within 2-3 business days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold">2-3 Days Delivery</h3>
              <p className="text-xs text-muted-foreground">Your preorder will arrive within 2-3 business days of order confirmation.</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold">Free Delivery</h3>
              <p className="text-xs text-muted-foreground">Delivery is free for all preorders $100+.</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold">Track Your Order</h3>
              <p className="text-xs text-muted-foreground">SMS tracking updates will be sent as your order progresses.</p>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <Link
              href="/shop"
              className="inline-flex px-12 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            >
              CONTINUE SHOPPING
            </Link>
            <p className="text-sm text-muted-foreground">
              Check your email and SMS for order confirmation and tracking details.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
