import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, ShieldCheck, MapPin, Clock } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-none">
              Delivery <span className="text-primary italic">Information</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bakersfield&apos;s fastest and most discreet premium cannabis delivery service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-card border border-border rounded-3xl space-y-6">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black uppercase italic">Hours & Timing</h3>
              <p className="text-muted-foreground leading-relaxed">
                We deliver daily from 9:00 AM to 10:00 PM. Most orders arrive within 45-60 minutes.
              </p>
            </div>

            <div className="p-10 bg-card border border-border rounded-3xl space-y-6">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black uppercase italic">Service Areas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Currently serving the greater Bakersfield area. We deliver to residential addresses and private residences only.
              </p>
            </div>

            <div className="p-10 bg-card border border-border rounded-3xl space-y-6">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black uppercase italic">Verification</h3>
              <p className="text-muted-foreground leading-relaxed">
                You must be present with a valid 21+ government photo ID. The name on the ID must match the name on the order.
              </p>
            </div>

            <div className="p-10 bg-card border border-border rounded-3xl space-y-6">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black uppercase italic">Delivery Fee</h3>
              <p className="text-muted-foreground leading-relaxed">
                Free delivery on all orders over $75. A flat $5 delivery fee applies to orders below $75.
              </p>
            </div>
          </div>

          <div className="p-12 bg-primary text-primary-foreground rounded-3xl text-center space-y-6 italic">
            <h2 className="text-3xl font-black uppercase">Ready for a treat?</h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto">
              Browse our premium selection of flowers, edibles, and concentrates for immediate delivery.
            </p>
            <div className="pt-4">
              <a 
                href="/shop" 
                className="inline-block bg-black text-white font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:scale-105 transition-transform"
              >
                Go to Shop
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
