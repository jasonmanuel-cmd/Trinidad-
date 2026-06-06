import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Trippy Head Stash Delivery",
  description: "Frequently asked questions about our premium cannabis delivery service in Bakersfield.",
};

const FAQS = [
  {
    q: "What areas do you deliver to?",
    a: "We currently deliver to the greater Bakersfield area. Enter your address at checkout to confirm service eligibility."
  },
  {
    q: "How long does delivery take?",
    a: "Same-day delivery typically arrives within 60 minutes. Preorder items follow the arrival date listed on the product page."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash on Delivery (COD) for all orders. Pay with cash when your driver arrives. VIP membership is a separate monthly subscription."
  },
  {
    q: "Do I need to show ID?",
    a: "Yes. Every delivery requires physical inspection of a valid, government-issued photo ID confirming you are 21 or older."
  },
  {
    q: "Is there a minimum order amount?",
    a: "Yes, we require a minimum order of $30 for delivery."
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">FAQ</h1>
            <p className="text-muted-foreground text-lg">Common questions about Bakersfield&apos;s premium delivery service.</p>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-8 bg-card border border-border rounded-3xl space-y-4">
                <h3 className="text-xl font-black text-primary uppercase italic">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
