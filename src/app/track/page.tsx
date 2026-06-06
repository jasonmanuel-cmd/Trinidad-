"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useOrderStore, Order } from "@/store/useOrderStore";
import { formatCurrency } from "@/lib/utils";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Phone,
  AlertCircle,
  ChevronRight,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

const TIMELINE_STEPS = [
  { status: "pending" as const, label: "Order Placed", icon: Package, color: "text-yellow-500" },
  { status: "confirmed" as const, label: "Confirmed", icon: CheckCircle2, color: "text-blue-500" },
  { status: "dispatched" as const, label: "On the Way", icon: Truck, color: "text-purple-500" },
  { status: "delivered" as const, label: "Delivered", icon: CheckCircle2, color: "text-green-500" },
];

function OrderTracker({ order }: { order: Order }) {
  const currentStepIndex = TIMELINE_STEPS.findIndex((step) => step.status === order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      {/* Order Header */}
      <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">{order.orderNumber}</h2>
            <p className="text-sm text-muted-foreground">
              Ordered on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div
              className={`px-4 py-2 rounded-lg border font-bold uppercase text-sm tracking-widest inline-block ${
                order.status === "pending"
                  ? "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                  : order.status === "confirmed"
                    ? "bg-blue-500/20 text-blue-600 border-blue-500/30"
                    : order.status === "dispatched"
                      ? "bg-purple-500/20 text-purple-600 border-purple-500/30"
                      : "bg-green-500/20 text-green-600 border-green-500/30"
              }`}
            >
              {order.status}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <h3 className="font-bold text-lg mb-8">Delivery Timeline</h3>
        <div className="space-y-6">
          {TIMELINE_STEPS.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const StepIcon = step.icon;

            return (
              <div key={step.status} className="flex gap-6 relative">
                {/* Connector line */}
                {idx < TIMELINE_STEPS.length - 1 && (
                  <div
                    className={`absolute left-6 top-16 w-0.5 h-12 ${
                      isCompleted ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}

                {/* Step indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative z-10"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? isCurrent
                          ? "bg-primary border-primary scale-110"
                          : "bg-primary/20 border-primary"
                        : "bg-background border-border"
                    }`}
                  >
                    <StepIcon
                      className={`w-6 h-6 ${
                        isCompleted ? "text-white" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Step content */}
                <div className="flex-1 pt-1.5">
                  <h4
                    className={`font-bold text-lg ${
                      isCompleted ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isCurrent && "This is where your order is now"}
                    {!isCurrent && isCompleted && "Completed"}
                    {!isCompleted && "Pending"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated Delivery */}
      {order.status !== "delivered" && order.status !== "cancelled" && (
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8">
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-accent shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Estimated Delivery</h3>
              <p className="text-muted-foreground mt-1">
                {order.estimatedDeliveryDate
                  ? new Date(order.estimatedDeliveryDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Information */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <h3 className="font-bold text-lg mb-6">Delivery Information</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                Delivery Address
              </p>
              <p className="font-semibold mt-1">{order.deliveryInfo.address}</p>
              {order.deliveryInfo.instructions && (
                <p className="text-sm text-muted-foreground mt-1">
                  Note: {order.deliveryInfo.instructions}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                Contact Number
              </p>
              <p className="font-semibold mt-1">{order.deliveryInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
        <h3 className="font-bold text-lg mb-6">Order Summary</h3>
        <div className="space-y-3 bg-secondary/20 p-4 rounded-lg mb-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.quantity}x {item.name}
              </span>
              <span className="font-semibold">
                {item.price === 0
                  ? "FREE"
                  : formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span>{order.deliveryFee === 0 ? "FREE" : formatCurrency(order.deliveryFee)}</span>
          </div>
          {order.vipCreditUsed > 0 && (
            <div className="flex justify-between text-sm text-accent">
              <span className="text-muted-foreground">VIP Credit Used</span>
              <span className="font-bold">-{formatCurrency(order.vipCreditUsed)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
              Payment Method
            </p>
            <p className="font-semibold mt-2 capitalize">
              Cash on Delivery
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
              Order Type
            </p>
            <p className="font-semibold mt-2 capitalize">{order.type}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OrderTrackingPage() {
  const { getOrder } = useOrderStore();
  const [orderId, setOrderId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // Try to get orderId from URL on mount
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("orderId");
      if (id) {
        setOrderId(id);
        handleSearch(id);
      }
    }
  }, []);

  const handleSearch = (id?: string) => {
    const searchId = id || orderId;
    if (!searchId.trim()) return;

    setLoading(true);
    setSearched(true);

    // Simulate search delay
    setTimeout(() => {
      const order = getOrder(searchId);
      setSearchedOrder(order || null);
      setLoading(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-primary via-accent to-accent-purple bg-clip-text text-transparent">
              TRACK YOUR ORDER
            </h1>
            <p className="text-muted-foreground">
              Enter your order number to see real-time delivery status
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g., ORD-ABC123-XYZ or PRE-ABC123-XYZ"
                  className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 focus:border-primary outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Search
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Results */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">
                <Package className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground mt-4">Searching for your order...</p>
            </div>
          )}

          {searched && !loading && !searchedOrder && (
            <div className="text-center py-12 space-y-6">
              <div className="flex justify-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
                <p className="text-muted-foreground mb-4">
                  We couldn't find an order with the number <span className="font-mono font-bold">{orderId}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Please check your order number and try again. Order numbers start with "ORD-" for regular orders
                  or "PRE-" for preorders.
                </p>
              </div>
            </div>
          )}

          {searchedOrder && !loading && <OrderTracker order={searchedOrder} />}

          {!searched && (
            <div className="text-center py-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <Package className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Find Your Order</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your order number to track its status in real-time
                  </p>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <Truck className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Live Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    See exactly where your delivery is and when it will arrive
                  </p>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <Phone className="w-12 h-12 text-accent-purple mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Get Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact us anytime if you have questions about your order
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
