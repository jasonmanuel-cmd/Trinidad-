"use client";

import { useState } from "react";
import { useVIPStore } from "@/store/vipStore";
import { Crown, Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface VIPSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VIPSignupModal({ isOpen, onClose }: VIPSignupModalProps) {
  const { vipMember, signupVIP } = useVIPStore();
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const handleSignup = async () => {
    setIsConfirming(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    signupVIP();
    setIsConfirming(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-primary rounded-3xl max-w-lg w-full p-8 space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-black tracking-tight">JOIN VIP</h2>
          <p className="text-muted-foreground text-sm">
            Unlock exclusive perks and save big on every delivery
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-3 bg-secondary/30 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4">Your VIP Benefits:</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">$50 Store Credit</p>
                <p className="text-xs text-muted-foreground">Use $10 at a time on any order</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On all orders $20+</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Free Pre-Roll</p>
                <p className="text-xs text-muted-foreground">On every order you place</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Monthly Gift Bag</p>
                <p className="text-xs text-muted-foreground">Free mystery bag on the 15th</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Priority Support</p>
                <p className="text-xs text-muted-foreground">Dedicated VIP service line</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-primary/20 to-accent-purple/20 rounded-2xl p-6 border border-primary/30 space-y-2 text-center">
          <p className="text-muted-foreground text-sm">Monthly Membership</p>
          <p className="text-4xl font-black">$50/mo</p>
          <p className="text-xs text-muted-foreground">Billed monthly • Cancel anytime</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="flex-1 px-6 py-3 bg-secondary text-foreground rounded-full font-bold hover:bg-secondary/80 transition-colors disabled:opacity-50"
          >
            Maybe Later
          </button>
          <button
            onClick={handleSignup}
            disabled={isConfirming}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-accent-purple text-white rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isConfirming ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                <Crown className="w-5 h-5" />
                Upgrade to VIP
              </>
            )}
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
}
