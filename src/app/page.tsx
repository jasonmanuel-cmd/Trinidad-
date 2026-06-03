import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VIPSection from "@/components/VIPSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustSection from "@/components/TrustSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <VIPSection />
        <FeaturedProducts />
        <HowItWorks />
        <Newsletter />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}
