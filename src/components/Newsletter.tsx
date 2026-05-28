"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-widest text-primary">
              <Sparkles className="w-3 h-3" />
              <span>Inner Circle</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
              Get <span className="text-primary italic">Early Access</span> <br /> to Drops
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed italic">
              Join our inner circle for exclusive preorder notifications and members-only flower drops. No spam, just fire.
            </p>
          </div>

          <div className="w-full md:w-auto flex-1 max-w-sm">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-background border border-border rounded-2xl py-5 pl-12 pr-6 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/50 font-medium"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground font-black uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all italic shadow-lg shadow-primary/20"
              >
                Join Now
              </button>
              <p className="text-[10px] text-center text-muted-foreground/60 uppercase tracking-widest font-bold">
                21+ ONLY • WE RESPECT YOUR PRIVACY
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
