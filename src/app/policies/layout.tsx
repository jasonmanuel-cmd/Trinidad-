import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <article className="prose prose-invert max-w-none">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
