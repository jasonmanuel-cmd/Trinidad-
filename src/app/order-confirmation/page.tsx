import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Truck, ShieldCheck, Mail } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const orderNumber = "TT-" + Math.floor(Math.random() * 90000 + 10000);

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
