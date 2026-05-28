"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/mockProducts";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-muted">
        {/* Placeholder for real product images */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-black text-4xl">
          {product.category.toUpperCase()}
        </div>
        <div className="absolute top-4 left-4 z-10">
          <span className={
            `px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border
            ${product.stockStatus === 'Preorder' ? 'bg-primary/20 text-primary border-primary/30' : 
              product.stockStatus === 'Low Stock' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 
              'bg-accent/20 text-accent border-accent/30'}`
          }>
            {product.stockStatus}
          </span>
        </div>
        {product.isPreorder && (
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-white">
            <Clock className="w-3 h-3 text-primary" />
            <span>ARRIVING {product.expectedArrival?.toUpperCase()}</span>
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-widest">
            <span>{product.brand}</span>
            {product.thc && <span>{product.thc} THC</span>}
          </div>
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xl font-black">{formatCurrency(product.price)}</span>
            <span className="text-xs text-muted-foreground">{product.weight}</span>
          </div>
          <button 
            onClick={() => addItem(product)}
            className="p-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
