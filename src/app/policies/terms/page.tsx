import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: May 28, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-primary uppercase italic">1. Age Requirement</h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 21 years of age to use this website and purchase products. By using this site, you represent that you meet this age requirement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-primary uppercase italic">2. Delivery Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Deliveries are only made to physical addresses within our designated service areas. We reserve the right to refuse service to any location or individual for any reason, including failure to provide valid identification.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-primary uppercase italic">3. Product Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                All products are subject to availability. We reserve the right to limit the quantities of any products or services that we offer.
              </p>
            </section>

            <section className="space-y-4 border-t border-border pt-8">
              <p className="text-xs text-muted-foreground italic">
                By placing an order with Trippy Head Stash Delivery, you agree to abide by these terms and all local and state regulations.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
