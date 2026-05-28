"use client";

import { PRODUCTS } from "@/data/mockProducts";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FeaturedProducts() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">FEATURED DROPS</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Curated selections from the finest growers and makers in California. Available for same-day delivery or preorder.
            </p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-primary font-bold hover:translate-x-1 transition-transform"
          >
            EXPLORE FULL MENU
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
