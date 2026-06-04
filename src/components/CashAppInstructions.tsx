"use client";

import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface CashAppInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

export default function CashAppInstructions({
  isOpen,
  onClose,
  totalAmount,
}: CashAppInstructionsProps) {
  const [copied, setCopied] = useState(false);
  const cashAppTag = "$TreatsTrinidad"; // This would be the actual business Cash App tag

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-accent/50 rounded-3xl max-w-lg w-full p-8 space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black">Send via Cash App</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* QR Code Placeholder */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-secondary rounded-2xl flex items-center justify-center border-2 border-dashed border-accent/30">
            <div className="text-center space-y-2">
              <div className="text-4xl">📱</div>
              <p className="text-xs text-muted-foreground">QR Code</p>
              <p className="text-xs text-muted-foreground">(Scan with Cash App)</p>
            </div>
          </div>
        </div>

        {/* Cash App Tag */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Send money to:</p>
            <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
              <span className="font-black text-lg text-accent">{cashAppTag}</span>
              <button
                onClick={() => handleCopy(cashAppTag)}
                className="ml-auto p-2 hover:bg-card rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-accent" />
                ) : (
                  <Copy className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Amount to send:</p>
            <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
              <span className="font-black text-2xl text-primary">${totalAmount.toFixed(2)}</span>
              <button
                onClick={() => handleCopy(`$${totalAmount.toFixed(2)}`)}
                className="ml-auto p-2 hover:bg-card rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-accent" />
                ) : (
                  <Copy className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h3 className="font-bold text-sm uppercase tracking-widest text-accent">Steps:</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-black text-primary">1.</span>
              <span>Open Cash App on your phone</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-primary">2.</span>
              <span>Search for or scan the QR code above</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-primary">3.</span>
              <span>Enter the amount: ${totalAmount.toFixed(2)}</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-primary">4.</span>
              <span>Add note: "Trinidad Trippy Treats - Order"</span>
            </li>
            <li className="flex gap-3">
              <span className="font-black text-primary">5.</span>
              <span>Tap Send and confirm payment</span>
            </li>
          </ol>
        </div>

        {/* Confirmation */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Once payment is received, we'll confirm your order and start preparing your delivery.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Got It! I'll Send Payment
          </button>
        </div>

        {/* Support Info */}
        <div className="text-xs text-muted-foreground text-center border-t border-border pt-4">
          <p>Questions? Contact support: <span className="text-accent font-bold">SMS to +1 (661) 555-0199</span></p>
        </div>
      </motion.div>
    </div>
  );
}
