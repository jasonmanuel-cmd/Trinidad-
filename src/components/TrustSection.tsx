import { ShieldCheck, Scale, CreditCard, Clock } from "lucide-react";

const TRUST_ITEMS = [
  {
    title: "Licensed & Regulated",
    description: "Operating fully within California state guidelines for adult-use cannabis delivery.",
    icon: Scale,
  },
  {
    title: "Secure ID Check",
    description: "Physical ID verification at handoff ensures every transaction is safe and legal.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Payments",
    description: "Multiple safe payment paths including Cash on Delivery and manual reconciliation.",
    icon: CreditCard,
  },
  {
    title: "Fast & Discreet",
    description: "Professional couriers providing timely delivery in unmarked, clean vehicles.",
    icon: Clock,
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
