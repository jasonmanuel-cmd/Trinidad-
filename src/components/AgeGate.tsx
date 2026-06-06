"use client";

import { useState, useEffect } from "react";
import { useAgeStore } from "@/store/useAgeStore";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AgeGate() {
  const { isOfAge, setOfAge } = useAgeStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isOfAge) {
      const timer = setTimeout(() => setShow(true), 3400);
      return () => clearTimeout(timer);
    }
  }, [isOfAge]);

  const handleEnter = () => {
    setOfAge(true);
    setShow(false);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background"
        >
          {/* Background tie-dye glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent-purple/10 rounded-full blur-[100px]" />
          </div>

          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative max-w-md w-full mx-4 p-10 text-center space-y-8 bg-card border border-border rounded-3xl shadow-2xl"
          >
            <div className="flex justify-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-4 ring-offset-card">
                <Image
                  src="/trippy'sheadstashlogo.png"
                  alt="Trinidad's Trippy Treats"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-2xl font-black uppercase tracking-tight">
                TRINIDAD&apos;S <span className="text-primary italic">TRIPPY TREATS</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed text-base">
                You must be 21 or older to access this site. Valid government-issued ID required at delivery.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEnter}
                className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all italic shadow-lg shadow-primary/20"
              >
                I AM 21+
              </button>
              <button
                onClick={handleExit}
                className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-2xl font-bold text-lg uppercase tracking-widest hover:bg-muted transition-colors border border-border"
              >
                EXIT
              </button>
            </div>

            <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em] font-bold">
              Bakersfield · Premium Delivery
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
