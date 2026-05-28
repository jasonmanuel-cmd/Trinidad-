import { PRODUCTS } from "@/data/mockProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, Clock } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { Metadata } from "next";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) return {};

  return {
    title: `${product.name} | ${product.brand} | Trinidad's Trippy Treats`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border border-border">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isPreorder && (
              <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest italic">
                Preorder
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-primary text-sm font-black uppercase tracking-widest">{product.brand}</span>
                <span className="w-1 h-1 bg-border rounded-full" />
                <span className="text-muted-foreground text-sm uppercase tracking-widest">{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">{product.name}</h1>
              <div className="flex items-baseline gap-4">
                <p className="text-3xl font-black text-primary">${product.price.toFixed(2)}</p>
                <p className="text-muted-foreground">{product.weight}</p>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-widest font-bold">Status</span>
                <span className={product.stockStatus === "Sold Out" ? "text-destructive" : "text-accent"}>
                  {product.stockStatus}
                </span>
              </div>
              {product.thc && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest font-bold">Potency</span>
                  <span className="text-primary font-black italic">{product.thc} THC</span>
                </div>
              )}
              {product.isPreorder && product.expectedArrival && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest font-bold">Expected Arrival</span>
                  <span className="text-primary font-bold italic">{product.expectedArrival}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-lg italic">
                &quot;{product.description}&quot;
              </p>
              <AddToCartButton product={product} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="flex flex-col items-center text-center p-4 bg-secondary/30 rounded-2xl gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="text-[10px] uppercase font-bold tracking-tighter">ID Required</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-secondary/30 rounded-2xl gap-2">
                <Truck className="w-6 h-6 text-primary" />
                <span className="text-[10px] uppercase font-bold tracking-tighter">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-secondary/30 rounded-2xl gap-2">
                <Clock className="w-6 h-6 text-primary" />
                <span className="text-[10px] uppercase font-bold tracking-tighter">Open til 10pm</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
