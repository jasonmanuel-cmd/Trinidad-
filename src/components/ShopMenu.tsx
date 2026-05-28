"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/mockProducts";
import { SlidersHorizontal, Filter } from "lucide-react";

const CATEGORIES = ["All", "Flower", "Edibles", "Concentrates", "Vapes"];

export default function ShopMenu({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">Menu</h1>
          <p className="text-muted-foreground">Premium delivery selections for Bakersfield.</p>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap border
                ${activeCategory === cat 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-secondary text-muted-foreground border-border hover:border-primary/50"}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Showing {filteredProducts.length} items</span>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-primary">
          <Filter className="w-4 h-4" />
          SORT & FILTER
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4">
          <h2 className="text-2xl font-bold uppercase italic">No items found</h2>
          <p className="text-muted-foreground leading-relaxed">Try selecting a different category or check back soon.</p>
        </div>
      )}
    </div>
  );
}
