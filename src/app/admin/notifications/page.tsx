"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useAdminStore } from "@/store/useAdminStore";
import {
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  LogOut,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationsPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdminStore();
  const { notifications, clearNotifications, updateNotificationStatus } = useNotificationStore();
  const [mounted, setMounted] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "sent" | "failed">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/admin-login");
    }
  }, [isAuthenticated, router]);

  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    if (filterStatus !== "all") {
      filtered = filtered.filter((notif) => notif.status === filterStatus);
    }

    if (sortBy === "newest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
      );
    } else {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
      );
    }

    return filtered;
  }, [notifications, filterStatus, sortBy]);

  const statusCounts = useMemo(
    () => ({
      all: notifications.length,
      pending: notifications.filter((n) => n.status === "pending").length,
      sent: notifications.filter((n) => n.status === "sent").length,
      failed: notifications.filter((n) => n.status === "failed").length,
    }),
    [notifications]
  );

  const statusIcons: Record<string, React.FC<{ className?: string }>> = {
    pending: Clock,
    sent: CheckCircle,
    failed: AlertCircle,
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    sent: "bg-green-500/20 text-green-600 border-green-500/30",
    failed: "bg-red-500/20 text-red-600 border-red-500/30",
  };

  if (!mounted || !isAuthenticated) {
    return null;
  }

  // Simulated sending of pending notifications
  const handleSendAll = async () => {
    const unsentNotifications = notifications.filter((n) => n.status === "pending");

    for (const notif of unsentNotifications) {
      try {
        const response = await fetch("/api/notifications/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: notif.customerEmail || "customer@example.com",
            customerName: notif.customerName,
            orderNumber: notif.orderNumber,
            status: notif.type,
            message: notif.message,
          }),
        });

        if (response.ok) {
          updateNotificationStatus(notif.id, "sent");
        } else {
          updateNotificationStatus(notif.id, "failed", "API error");
        }
      } catch (error) {
        updateNotificationStatus(notif.id, "failed", String(error));
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-primary via-accent to-accent-purple bg-clip-text text-transparent">
              NOTIFICATIONS
            </h1>
            <p className="text-muted-foreground">Order notification history and status</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-bold text-sm"
            >
              ← BACK TO ORDERS
            </button>
            <button
              onClick={() => {
                logout();
                router.push("/admin-login");
              }}
              className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2 font-bold text-sm border border-red-500/30"
            >
              <LogOut className="w-4 h-4" />
              LOGOUT
            </button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {(["all", "pending", "sent", "failed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
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
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""}
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
              onClick={handleSendAll}
              disabled={statusCounts.pending === 0}
              className="px-4 py-2 bg-primary/20 text-primary border border-primary rounded-lg hover:bg-primary/30 transition-colors text-sm font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-4 h-4" />
              SEND ALL ({statusCounts.pending})
            </button>
            <button
              onClick={() => clearNotifications()}
              className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-bold flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              CLEAR ALL
            </button>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No notifications found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notif, idx) => {
              const StatusIcon = statusIcons[notif.status];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`bg-card border rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-colors ${statusColors[notif.status]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <StatusIcon className="w-5 h-5" />
                        <p className="font-bold">{notif.orderNumber}</p>
                        <span className="text-xs uppercase tracking-widest font-bold px-2 py-1 rounded bg-current/20">
                          {notif.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notif.customerName}</p>
                      <p className="text-sm">{notif.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{notif.customerEmail}</span>
                        <span>{new Date(notif.sentAt).toLocaleString()}</span>
                      </div>
                      {notif.error && (
                        <p className="text-xs text-red-500 mt-2">Error: {notif.error}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
