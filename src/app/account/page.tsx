"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVIPStore } from "@/store/vipStore";
import { formatCurrency } from "@/lib/utils";
import { Crown, Gift, Truck, Calendar, LogOut, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const { vipMember, cancelVIP } = useVIPStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Helper function for date formatting
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (!vipMember.isVIP) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center space-y-6">
            <Crown className="w-16 h-16 mx-auto text-muted-foreground" />
            <h1 className="text-4xl font-black">NOT A VIP MEMBER</h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Join our VIP membership program to unlock exclusive benefits, free delivery, monthly gifts, and more!
            </p>
            <div className="flex flex-col gap-4 pt-4">
              <button
                onClick={() => router.push("/")}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity"
              >
                BACK TO HOME
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCancelMembership = () => {
    if (confirm("Are you sure you want to cancel your VIP membership?")) {
      cancelVIP();
      router.push("/");
    }
  };

  // Calculate next gift bag date
  const today = new Date();
  const nextGiftBagDate = new Date(today.getFullYear(), today.getMonth() + 1, 15);
  if (nextGiftBagDate < today) {
    nextGiftBagDate.setMonth(nextGiftBagDate.getMonth() + 1);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Crown className="w-10 h-10 text-primary" />
              <h1 className="text-5xl font-black">VIP ACCOUNT</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Manage your VIP membership, track credits, and view upcoming perks.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Credit Balance */}
            <div className="p-8 bg-gradient-to-br from-primary/10 to-accent-purple/10 border border-primary/30 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Available Credit
                </h3>
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-black text-primary">
                  {formatCurrency(vipMember.creditBalance)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Use up to $10 per order. Resets monthly.
                </p>
              </div>
            </div>

            {/* Delivery Count */}
            <div className="p-8 bg-gradient-to-br from-accent/10 to-teal/10 border border-accent/30 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Deliveries
                </h3>
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-accent" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-black text-accent">{vipMember.deliveryCount}</p>
                <p className="text-xs text-muted-foreground">
                  Total VIP orders completed
                </p>
              </div>
            </div>

            {/* Membership Status */}
            <div className="p-8 bg-gradient-to-br from-orange/10 to-primary/10 border border-orange/30 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </h3>
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-black">ACTIVE</p>
                <p className="text-xs text-muted-foreground">
                  Renews automatically monthly
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Gift className="w-6 h-6 text-accent" />
              VIP BENEFITS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free Delivery */}
              <div className="p-6 bg-card border border-border rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-teal" />
                  </div>
                  <h3 className="font-bold">Free Delivery</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Free delivery on all orders $20 or more. Regular customers pay $10 for orders under $30.
                </p>
              </div>

              {/* Monthly Credit */}
              <div className="p-6 bg-card border border-border rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-bold">Monthly Credit</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive $50 in store credit monthly. Use up to $10 per order with free pre-rolls automatically added.
                </p>
              </div>

              {/* Free Pre-Roll */}
              <div className="p-6 bg-card border border-border rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold">Complimentary Pre-Roll</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Every order includes a free premium pre-roll automatically added to your cart.
                </p>
              </div>

              {/* Monthly Gift Bag */}
              <div className="p-6 bg-card border border-border rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-bold">Monthly Gift Bag</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Claim a free gift bag (edibles, flower, concentrate, or vape) on the 15th of each month.
                </p>
              </div>
            </div>
          </div>

          {/* Next Gift Bag */}
          <div className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-accent" />
              <h3 className="font-bold text-lg">Next Gift Bag Claim</h3>
            </div>
            <p className="text-3xl font-black text-accent">{formatDate(nextGiftBagDate)}</p>
            <p className="text-muted-foreground">
              Your next monthly gift bag will be available for claim on this date. A random selection of premium products awaits!
            </p>
          </div>

          {/* Membership Details */}
          <div className="space-y-4 p-8 bg-card border border-border rounded-2xl">
            <h3 className="font-bold text-lg">MEMBERSHIP DETAILS</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Monthly Fee</span>
                <span className="font-bold">$50.00 / month</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Included Credit</span>
                <span className="font-bold">$50.00 / month</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Usable Credit Per Order</span>
                <span className="font-bold">$10.00 max</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Effective Cost</span>
                <span className="font-bold text-accent">FREE (with credit)</span>
              </div>
            </div>
          </div>

          {/* Cancel Membership */}
          <div className="space-y-4">
            <button
              onClick={handleCancelMembership}
              className="w-full px-6 py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              CANCEL MEMBERSHIP
            </button>
            <p className="text-xs text-muted-foreground text-center">
              You can always rejoin anytime. Your credits will be forfeited if you cancel.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
