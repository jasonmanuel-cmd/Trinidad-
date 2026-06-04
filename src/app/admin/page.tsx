"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useOrderStore, OrderStatus, Order } from "@/store/useOrderStore";
import { useVIPStore } from "@/store/vipStore";
import { useAdminStore } from "@/store/useAdminStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { formatCurrency } from "@/lib/utils";
import { exportOrdersToCSV, exportOrdersToJSON } from "@/lib/exportOrders";
import {
  Crown,
  ChevronDown,
  X,
  Clock,
  CheckCircle,
  Truck,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Calendar,
  LogOut,
  AlertTriangle,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdminStore();
  const { orders, updateOrderStatus, cancelOrder } = useOrderStore();
  const { addCredit } = useVIPStore();
  const [mounted, setMounted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/admin-login");
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return null;
  }

  const handleCancelOrder = () => {
    if (!selectedOrder || !cancelReason.trim()) return;

    cancelOrder(selectedOrder.id, cancelReason);

    // Refund VIP credit if used
    if (selectedOrder.isVIPOrder && selectedOrder.vipCreditUsed > 0) {
      addCredit(selectedOrder.vipCreditUsed);
    }

    // Trigger cancellation notification
    const cancellationMessage = `Order ${selectedOrder.orderNumber} has been cancelled. ${
      selectedOrder.vipCreditUsed > 0 ? `VIP credit of $${selectedOrder.vipCreditUsed} has been refunded.` : ""
    }`;

    useNotificationStore.getState().addNotification({
      orderId: selectedOrder.id,
      orderNumber: selectedOrder.orderNumber,
      customerEmail: selectedOrder.customerEmail,
      customerName: selectedOrder.deliveryInfo.name,
      type: "cancelled",
      message: cancellationMessage,
      status: "pending",
    });

    // Send cancellation email
    const notification = useNotificationStore.getState().notifications[0]; // Get the last added notification
    
    fetch("/api/notifications/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: selectedOrder.customerEmail,
        customerName: selectedOrder.deliveryInfo.name,
        orderNumber: selectedOrder.orderNumber,
        status: "cancelled",
        message: cancellationMessage,
        items: selectedOrder.items,
        total: selectedOrder.total,
      }),
    })
      .then((res) => {
        if (res.ok && notification) {
          useNotificationStore.getState().updateNotificationStatus(
            notification.id,
            "sent"
          );
        }
      })
      .catch((err) => {
        console.error("Failed to send cancellation email:", err);
        if (notification) {
          useNotificationStore.getState().updateNotificationStatus(
            notification.id,
            "failed",
            err.message
          );
        }
      });

    setSelectedOrder(null);
    setCancelModalOpen(false);
    setCancelReason("");
  };

  const STATUS_COLORS: Record<OrderStatus, string> = {
    pending: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    confirmed: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    dispatched: "bg-purple-500/20 text-purple-600 border-purple-500/30",
    delivered: "bg-green-500/20 text-green-600 border-green-500/30",
    cancelled: "bg-red-500/20 text-red-600 border-red-500/30",
  };

  const STATUS_ICONS: Record<OrderStatus, React.FC<{ className?: string }>> = {
    pending: Clock,
    confirmed: CheckCircle,
    dispatched: Truck,
    delivered: CheckCircle,
    cancelled: X,
  };

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    if (sortBy === "newest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return filtered;
  }, [orders, filterStatus, sortBy]);

  const statusCounts = useMemo(
    () => ({
      all: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      dispatched: orders.filter((o) => o.status === "dispatched").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    }),
    [orders]
  );

  const nextStatuses: Record<OrderStatus, OrderStatus | null> = {
    pending: "confirmed",
    confirmed: "dispatched",
    dispatched: "delivered",
    delivered: null,
    cancelled: null,
  };

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    
    // Trigger notification
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      const statusMessages: Record<OrderStatus, string> = {
        pending: `Your order ${order.orderNumber} has been received and is being prepared.`,
        confirmed: `Great news! Order ${order.orderNumber} has been confirmed and will be dispatched soon.`,
        dispatched: `Your order ${order.orderNumber} is on the way! Track your delivery on our website.`,
        delivered: `Your order ${order.orderNumber} has been delivered. Thank you for your purchase!`,
        cancelled: `Order ${order.orderNumber} has been cancelled.`,
      };

      useNotificationStore.getState().addNotification({
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerEmail: order.customerEmail,
        customerName: order.deliveryInfo.name,
        type: newStatus,
        message: statusMessages[newStatus],
        status: "pending",
      });

      // Send email notification via API
      const trackingUrl = `${window.location.origin}/track?orderId=${order.id}`;
      const notification = useNotificationStore.getState().notifications[0]; // Get the last added notification
      
      fetch("/api/notifications/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: order.customerEmail,
          customerName: order.deliveryInfo.name,
          orderNumber: order.orderNumber,
          status: newStatus,
          message: statusMessages[newStatus],
          estimatedDeliveryDate: order.estimatedDeliveryDate?.toLocaleDateString(),
          trackingUrl,
          items: order.items,
          total: order.total,
        }),
      })
        .then((res) => {
          if (res.ok && notification) {
            useNotificationStore.getState().updateNotificationStatus(
              notification.id,
              "sent"
            );
          }
        })
        .catch((err) => {
          console.error("Failed to send email:", err);
          if (notification) {
            useNotificationStore.getState().updateNotificationStatus(
              notification.id,
              "failed",
              err.message
            );
          }
        });
    }

    setSelectedOrder((prev) => {
      if (prev && prev.id === orderId) {
        return { ...prev, status: newStatus };
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-12 flex items-center justify-between flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-primary via-accent to-accent-purple bg-clip-text text-transparent">
              ADMIN DASHBOARD
            </h1>
            <p className="text-muted-foreground">Manage orders and track customer deliveries</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/admin/notifications")}
              className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors border border-accent/30 font-bold text-sm"
            >
              📧 NOTIFICATIONS
            </button>
            <button
              onClick={() => router.push("/admin/analytics")}
              className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors border border-primary/30 font-bold text-sm"
            >
              📊 ANALYTICS
            </button>
            <button
              onClick={() => {
                logout();
                router.push("/admin-login");
              }}
              className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2 font-bold text-sm"
            >
              <LogOut className="w-4 h-4" />
              LOGOUT
            </button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-12">
          {(["all", "pending", "confirmed", "dispatched", "delivered", "cancelled"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as OrderStatus | "all")}
                className={`p-4 rounded-xl border transition-all ${
                  filterStatus === status
                    ? "border-primary bg-primary/10 font-bold"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="text-2xl font-black text-primary">
                  {statusCounts[status as keyof typeof statusCounts]}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground capitalize mt-1">
                  {status}
                </div>
              </button>
            )
          )}
        </div>

        {/* Sorting and Controls */}
        <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
              className="px-4 py-2 bg-card border border-border rounded-lg text-sm focus:border-primary outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <button
              onClick={() =>
                exportOrdersToCSV(filteredOrders, `orders-${new Date().toISOString().split("T")[0]}.csv`)
              }
              className="px-4 py-2 bg-secondary/20 text-foreground border border-secondary rounded-lg hover:bg-secondary/30 transition-colors text-sm font-bold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
            <button
              onClick={() =>
                exportOrdersToJSON(filteredOrders, `orders-${new Date().toISOString().split("T")[0]}.json`)
              }
              className="px-4 py-2 bg-accent/20 text-accent border border-accent rounded-lg hover:bg-accent/30 transition-colors text-sm font-bold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              JSON
            </button>
          </div>
        </div>

        {/* Orders Table */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const StatusIcon = STATUS_ICONS[order.status];
              return (
                <motion.button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  layoutId={order.id}
                  className="w-full text-left p-6 bg-card border border-border rounded-xl hover:border-primary transition-all group"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <StatusIcon className="w-6 h-6 text-primary shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg">{order.orderNumber}</span>
                          {order.isVIPOrder && (
                            <Crown className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{order.deliveryInfo.name}</span>
                          <span>•</span>
                          <span>{formatCurrency(order.total)}</span>
                          <span>•</span>
                          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${
                          STATUS_COLORS[order.status]
                        }`}
                      >
                        {order.status}
                      </div>
                      <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </main>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {selectedOrder.orderNumber}
                    {selectedOrder.isVIPOrder && (
                      <Crown className="w-5 h-5 text-primary" />
                    )}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Status & Payment */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">
                      Status
                    </p>
                    <div
                      className={`px-3 py-2 rounded-lg border text-sm font-bold uppercase tracking-widest inline-block ${
                        STATUS_COLORS[selectedOrder.status]
                      }`}
                    >
                      {selectedOrder.status}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">
                      Payment Method
                    </p>
                    <p className="text-sm font-bold capitalize">
                      {selectedOrder.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Cash App"}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <User className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Name</p>
                        <p className="font-semibold">{selectedOrder.deliveryInfo.name}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Phone</p>
                        <p className="font-semibold">{selectedOrder.deliveryInfo.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Address</p>
                        <p className="font-semibold">{selectedOrder.deliveryInfo.address}</p>
                        {selectedOrder.deliveryInfo.instructions && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Note: {selectedOrder.deliveryInfo.instructions}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Order Items
                  </h3>
                  <div className="space-y-2 bg-secondary/20 p-4 rounded-lg">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-bold">
                          {item.price === 0
                            ? "FREE"
                            : formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-border pt-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-semibold">
                      {selectedOrder.deliveryFee === 0
                        ? "FREE"
                        : formatCurrency(selectedOrder.deliveryFee)}
                    </span>
                  </div>
                  {selectedOrder.vipCreditUsed > 0 && (
                    <div className="flex justify-between text-accent">
                      <span className="text-muted-foreground">VIP Credit Used</span>
                      <span className="font-bold">
                        -{formatCurrency(selectedOrder.vipCreditUsed)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Timeline
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Created</span>
                      <span className="font-semibold">
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Delivery</span>
                      <span className="font-semibold">
                        {selectedOrder.estimatedDeliveryDate
                          ? new Date(selectedOrder.estimatedDeliveryDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                {nextStatuses[selectedOrder.status] && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        selectedOrder.id,
                        nextStatuses[selectedOrder.status]!
                      )
                    }
                    className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity capitalize"
                  >
                    Mark as {nextStatuses[selectedOrder.status]}
                  </button>
                )}

                {/* Cancel Order Button */}
                {selectedOrder.status !== "cancelled" && selectedOrder.status !== "delivered" && (
                  <button
                    onClick={() => setCancelModalOpen(true)}
                    className="w-full py-3 bg-red-500/10 text-red-500 font-bold rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/30 flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    CANCEL ORDER
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancellation Modal */}
      <AnimatePresence>
        {cancelModalOpen && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setCancelModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl max-w-md w-full p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 text-red-500 mb-4">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-bold">Cancel Order</h3>
              </div>

              <p className="text-sm text-muted-foreground">
                Order <span className="font-bold">{selectedOrder.orderNumber}</span>
              </p>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2 block">
                  Cancellation Reason
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter reason for cancellation..."
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
                  rows={3}
                />
              </div>

              {selectedOrder.isVIPOrder && selectedOrder.vipCreditUsed > 0 && (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-sm">
                  <p className="text-muted-foreground mb-1">VIP Credit will be refunded:</p>
                  <p className="font-bold text-primary">{formatCurrency(selectedOrder.vipCreditUsed)}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="flex-1 py-2 bg-secondary text-foreground font-bold rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  KEEP ORDER
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={!cancelReason.trim()}
                  className="flex-1 py-2 bg-red-500/20 text-red-500 font-bold rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  CANCEL ORDER
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
