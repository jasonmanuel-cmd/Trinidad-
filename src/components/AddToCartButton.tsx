"use client";

import { useState } from "react";
import { Product } from "@/data/mockProducts";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Plus, Minus } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    // Optional: show a toast or feedback
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center bg-secondary rounded-2xl p-1">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-3 hover:text-primary transition-colors"
          disabled={quantity <= 1}
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="p-3 hover:text-primary transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <button 
        onClick={handleAdd}
        disabled={product.stockStatus === "Sold Out"}
        className="flex-1 bg-primary text-primary-foreground font-black uppercase tracking-widest px-8 py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 italic"
      >
        <ShoppingBag className="w-6 h-6" />
        {product.stockStatus === "Sold Out" ? "Sold Out" : product.isPreorder ? "Reserve Now" : "Add to Order"}
      </button>
    </div>
  );
}
