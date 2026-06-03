"use client";

import { useState } from "react";
import { Crown, Check } from "lucide-react";
import VIPSignupModal from "./VIPSignupModal";
import { useVIPStore } from "@/store/vipStore";

export default function VIPSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { vipMember } = useVIPStore();

  if (vipMember.isVIP) {
    return (
      <section className="py-24 bg-gradient-to-b from-primary/10 to-accent-purple/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary border border-primary/30 text-sm font-bold text-white uppercase tracking-widest">
              <Crown className="w-4 h-4" />
              You're VIP
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Enjoy Exclusive Perks
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              You're locked in with premium benefits, free delivery, and exclusive access to limited drops.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-24 bg-gradient-to-b from-primary/5 to-accent-purple/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: Benefits */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary uppercase tracking-widest">
                    <Crown className="w-4 h-4" />
                    Membership
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                    Join the VIP Club
                  </h2>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Unlock exclusive benefits, earn credits, and get priority access to drops.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">$50 Store Credit</h3>
                      <p className="text-sm text-muted-foreground">Use $10 at a time on any order</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Free Delivery on $20+</h3>
                      <p className="text-sm text-muted-foreground">Always free on qualifying orders</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Free Pre-Roll Every Order</h3>
                      <p className="text-sm text-muted-foreground">Automatic bonus with checkout</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Monthly Mystery Gift Bag</h3>
                      <p className="text-sm text-muted-foreground">Delivered on the 15th of each month</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent-purple text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
                  >
                    <Crown className="w-5 h-5" />
                    Become VIP - $50/mo
                  </button>
                  <p className="text-xs text-muted-foreground mt-4">Billed monthly • Cancel anytime</p>
                </div>
              </div>

              {/* Right: Pricing Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-purple rounded-3xl opacity-20 blur-2xl" />
                <div className="relative bg-card border border-primary/30 rounded-3xl p-8 space-y-8 text-center">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Monthly Membership</p>
                    <p className="text-6xl font-black">$50</p>
                    <p className="text-muted-foreground text-sm">/month</p>
                  </div>

                  <div className="space-y-3 text-left">
                    <h3 className="font-bold text-lg">What You Get:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        $50 instant store credit
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        Free delivery $20+
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        Free preroll every order
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        Monthly gift bag
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        Priority support
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VIPSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
