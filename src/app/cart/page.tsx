"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency, cn } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCartStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-12">YOUR CART</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 bg-card border border-border rounded-2xl">
                  <div className="relative w-24 h-24 bg-muted rounded-xl flex items-center justify-center font-bold text-xs text-muted-foreground/30">
                    {item.category.toUpperCase()}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand} • {item.weight}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 bg-secondary rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-black text-xl">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-card border border-border rounded-2xl space-y-6">
                <h2 className="text-2xl font-bold">ORDER SUMMARY</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-foreground font-medium">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-accent font-medium">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between text-xl text-foreground font-black">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  PROCEED TO CHECKOUT
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest">
                  Valid 21+ ID required at delivery
                </p>
              </div>

              <div className="p-6 bg-secondary/50 rounded-2xl border border-border space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest">Delivery Info</h4>
                <p className="text-sm text-muted-foreground">
                  Orders placed now will be delivered within <span className="text-foreground font-bold">60 minutes</span> in the Bakersfield area.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-24 text-center space-y-8 bg-card border border-border rounded-3xl">
            <div className="mx-auto w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Your cart is empty</h2>
              <p className="text-muted-foreground">Looks like you haven&apos;t added any treats yet.</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              BROWSE MENU
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
