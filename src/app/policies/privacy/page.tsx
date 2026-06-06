import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Privacy Policy</h1>
            <p className="text-muted-foreground">Effective Date: May 28, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-primary uppercase italic">Information Collection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information necessary to process your delivery orders, including your name, contact information, and delivery address. To comply with California law, we must also verify your age using government-issued identification.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-primary uppercase italic">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information is used solely for order processing, delivery logistics, and regulatory compliance. We do not sell or share your personal data with third parties for marketing purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-primary uppercase italic">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your data. Your ID information is used for verification purposes only and is not stored permanently on our servers unless required by local regulations.
              </p>
            </section>

            <section className="space-y-4 border-t border-border pt-8">
              <p className="text-xs text-muted-foreground italic">
                If you have any questions about our privacy practices, please contact us at support@trippyheadstash.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
