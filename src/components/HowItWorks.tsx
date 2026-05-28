import { Search, ShoppingCart, UserCheck, Bike } from "lucide-react";

const STEPS = [
  {
    title: "Browse the Menu",
    description: "Explore our curated selection of boutique flower, edibles, and concentrates.",
    icon: Search,
  },
  {
    title: "Secure Preorder",
    description: "Place your order or preorder upcoming drops to reserve limited inventory.",
    icon: ShoppingCart,
  },
  {
    title: "ID Verification",
    description: "Enter your details and prepare your government-issued ID for verification.",
    icon: UserCheck,
  },
  {
    title: "Speedy Delivery",
    description: "Receive your order at your door with professional, discreet handling.",
    icon: Bike,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">HOW IT WORKS</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Disciplined retail from browse to delivery. Here&apos;s what to expect when you order from Trinidad&apos;s.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative space-y-6 text-center group">
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full border-t border-dashed border-border z-0" />
              )}
              <div className="relative z-10 mx-auto w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                <step.icon className="w-10 h-10 text-primary" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
