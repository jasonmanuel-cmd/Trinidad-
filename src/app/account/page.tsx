"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useVIPStore } from "@/store/vipStore";
import { useOrderStore, type Order } from "@/store/useOrderStore";
import { formatCurrency } from "@/lib/utils";
import {
  Crown, Gift, Truck, Calendar, LogOut, User, Mail, Phone, MapPin,
  Clock, CheckCircle, X, ShoppingBag, ArrowRight, AlertCircle
} from "lucide-react";

export default function AccountPage() {
  const { user, signOut, isSupabaseConfigured, loading } = useAuth();
  const { vipMember, cancelVIP } = useVIPStore();
  const { orders } = useOrderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Not logged in - show prompt
  if (!loading && !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md">
            <User className="w-16 h-16 mx-auto text-muted-foreground" />
            <h1 className="text-4xl font-black">SIGN IN REQUIRED</h1>
            <p className="text-lg text-muted-foreground">
              Sign in or create an account to manage orders, track VIP status, and more.
            </p>
            {isSupabaseConfigured ? (
              <div className="flex flex-col gap-4 pt-4">
                <Link
                  href="/auth/login"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity"
                >
                  SIGN IN
                </Link>
                <Link
                  href="/auth/register"
                  className="px-8 py-3 bg-card border border-border rounded-full font-bold hover:border-primary transition-colors"
                >
                  CREATE ACCOUNT
                </Link>
              </div>
            ) : (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-sm text-muted-foreground">
                Account system is being configured. You can still browse and use the VIP features locally.
              </div>
            )}
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary block">
              Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const userOrders = orders.filter(
    (o) => o.customerEmail === user?.email || o.deliveryInfo.name === user?.user_metadata?.full_name
  );

  const STATUS_BADGE: Record<string, { color: string; icon: React.FC<{ className?: string }> }> = {
    pending: { color: "bg-yellow-500/20 text-yellow-600", icon: Clock },
    confirmed: { color: "bg-blue-500/20 text-blue-600", icon: CheckCircle },
    dispatched: { color: "bg-purple-500/20 text-purple-600", icon: Truck },
    delivered: { color: "bg-green-500/20 text-green-600", icon: CheckCircle },
    cancelled: { color: "bg-red-500/20 text-red-600", icon: X },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Profile Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-5xl font-black">MY ACCOUNT</h1>
              <p className="text-muted-foreground">
                {user?.user_metadata?.full_name || user?.email}
              </p>
            </div>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-secondary text-foreground rounded-xl font-bold hover:bg-secondary/80 transition-colors flex items-center gap-2 text-sm"
            >
              <LogOut className="w-4 h-4" />
              SIGN OUT
            </button>
          </div>

          {/* Profile Info */}
          <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              PROFILE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-semibold">{user?.user_metadata?.phone || "Not set"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="font-semibold">{user?.user_metadata?.full_name || "Not set"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* VIP Section */}
          <div className="p-6 bg-card border border-border rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                VIP MEMBERSHIP
              </h2>
              {!vipMember.isVIP ? (
                <Link
                  href="/delivery"
                  className="text-sm text-primary font-bold hover:underline"
                >
                  Learn more →
                </Link>
              ) : null}
            </div>

            {vipMember.isVIP ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-accent-purple/10 border border-primary/30 rounded-xl space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Credit</p>
                  <p className="text-3xl font-black text-primary">{formatCurrency(vipMember.creditBalance)}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-accent/10 to-teal/10 border border-accent/30 rounded-xl space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Deliveries</p>
                  <p className="text-3xl font-black text-accent">{vipMember.deliveryCount}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange/10 to-primary/10 border border-orange/30 rounded-xl space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Status</p>
                  <p className="text-lg font-black text-green-500">ACTIVE</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-secondary/30 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  You are not a VIP member. Join for $50/month to unlock free delivery, monthly credit, and more.
                </p>
              </div>
            )}
          </div>

          {/* Orders */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              MY ORDERS
            </h2>

            {userOrders.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-2xl">
                <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-4">No orders yet</p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity"
                >
                  START SHOPPING <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {userOrders.map((order) => {
                  const badge = STATUS_BADGE[order.status];
                  const StatusIcon = badge?.icon || Clock;
                  return (
                    <Link
                      key={order.id}
                      href={`/track?orderId=${order.id}`}
                      className="block p-6 bg-card border border-border rounded-xl hover:border-primary transition-all"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <StatusIcon className="w-5 h-5 text-primary shrink-0" />
                          <div className="min-w-0">
                            <p className="font-bold">{order.orderNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()} · {formatCurrency(order.total)}
                              {order.isVIPOrder && <span className="ml-2 text-primary">VIP</span>}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${badge?.color || ""}`}>
                          {order.status}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
