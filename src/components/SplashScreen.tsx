"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"enter" | "hold" | "melt" | "gone">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 400);
    const t2 = setTimeout(() => setPhase("melt"), 2200);
    const t3 = setTimeout(() => setPhase("gone"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "gone" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          initial={false}
          animate={phase === "melt" ? {
            filter: ["blur(0px)", "blur(12px)", "blur(0px)"],
            scaleY: [1, 1.08, 0.6],
            opacity: [1, 0.8, 0],
            y: [0, 0, -60],
          } : {}}
          exit={{
            opacity: 0,
            transition: { duration: 0.3 },
          }}
          transition={{
            duration: 1.2,
            ease: [0.32, 0, 0.67, 0],
            times: [0, 0.6, 1],
          }}
        >
          {/* Background tie-dye glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-purple/10 rounded-full blur-[100px]" />
          </div>

          {/* Logo + Text */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={
              phase === "enter" 
                ? { scale: 1, opacity: 1 }
                : phase === "hold"
                ? { scale: [1, 1.02, 1], opacity: 1 }
                : {}
            }
            transition={
              phase === "enter"
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-4 ring-offset-background">
              <Image
                src="/trippy'sheadstashlogo.png"
                alt="Trinidad's Trippy Treats"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center space-y-1">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                TRINIDAD&apos;S
              </h1>
              <p className="text-lg md:text-xl font-bold italic text-primary tracking-tight">
                TRIPPY TREATS
              </p>
            </div>
          </motion.div>

          {/* Bottom tagline */}
          <motion.p
            className="absolute bottom-12 text-[10px] text-muted-foreground/40 uppercase tracking-[0.3em] font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Bakersfield · Premium Delivery
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
