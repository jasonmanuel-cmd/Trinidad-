"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-12 md:pt-32 md:pb-24">
      {/* Tie-dye background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium"
          >
            <Truck className="w-4 h-4 text-primary" />
            <span className="text-foreground">Premium Delivery in <span className="text-primary font-bold">Bakersfield</span></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-tight"
          >
            TRIPPY HEAD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-purple to-accent italic">
              STASH DELIVERY
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed"
          >
            Premium cannabis for Bakersfield adults who want quality, speed, and zero confusion.
            Boutique flower, edibles, and curated drops delivered to your door.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-black text-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest italic shadow-lg shadow-primary/25"
            >
              SHOP MENU
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/preorders"
              className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground border border-border rounded-full font-bold text-lg hover:bg-muted transition-colors uppercase tracking-widest"
            >
              VIEW PREORDERS
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/50"
          >
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">21+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Adult Use</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-accent">1hr</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Avg Delivery</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-accent-purple">COD</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Safe Payments</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">LOCAL</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Bakersfield</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
