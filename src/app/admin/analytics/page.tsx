"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useOrderStore } from "@/store/useOrderStore";
import { useAdminStore } from "@/store/useAdminStore";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Crown,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

interface DailySales {
  date: string;
  orders: number;
  revenue: number;
  avgOrderValue: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminStore();
  const { orders } = useOrderStore();
  const [mounted, setMounted] = useState(false);
  const [dateRange, setDateRange] = useState<"7days" | "30days" | "all">("7days");

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/admin-login");
    }
  }, [isAuthenticated, router]);

  const filteredOrders = useMemo(() => {
    if (dateRange === "all") return orders;

    const days = dateRange === "7days" ? 7 : 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return orders.filter((order) => new Date(order.createdAt) >= cutoffDate);
  }, [orders, dateRange]);

  const dailySales = useMemo(() => {
    const salesByDate: Record<string, DailySales> = {};

    filteredOrders.forEach((order) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0];
      if (!salesByDate[date]) {
        salesByDate[date] = { date, orders: 0, revenue: 0, avgOrderValue: 0 };
      }
      salesByDate[date].orders += 1;
      salesByDate[date].revenue += order.total;
    });

    return Object.values(salesByDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((day) => ({
        ...day,
        avgOrderValue: day.orders > 0 ? day.revenue / day.orders : 0,
      }));
  }, [filteredOrders]);

  const totalRevenue = useMemo(
    () => filteredOrders.reduce((acc, order) => acc + order.total, 0),
    [filteredOrders]
  );

  const totalOrders = filteredOrders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const vipOrders = useMemo(
    () => filteredOrders.filter((order) => order.isVIPOrder).length,
    [filteredOrders]
  );

  const vipRevenue = useMemo(
    () =>
      filteredOrders
        .filter((order) => order.isVIPOrder)
        .reduce((acc, order) => acc + order.total, 0),
    [filteredOrders]
  );

  const deliveredOrders = filteredOrders.filter((order) => order.status === "delivered").length;
  const deliveryRate = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;

  const paymentMethods = useMemo(() => {
    const methods: Record<string, number> = { cod: 0 };
    filteredOrders.forEach((order) => {
      if (order.paymentMethod === "cod") methods.cod++;
    });
    return methods;
  }, [filteredOrders]);

  if (!mounted || !isAuthenticated) {
    return null;
  }

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: ShoppingBag,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
    },
    {
      title: "Avg Order Value",
      value: formatCurrency(avgOrderValue),
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
    },
    {
      title: "VIP Orders",
      value: vipOrders.toString(),
      icon: Crown,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-primary via-accent to-accent-purple bg-clip-text text-transparent">
              ANALYTICS & INSIGHTS
            </h1>
            <p className="text-muted-foreground">Sales performance and business metrics</p>
          </div>
          <button
            onClick={() => router.push("/admin")}
            className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-bold text-sm"
          >
            ← BACK TO ORDERS
          </button>
        </div>

        {/* Date Range Filter */}
        <div className="mb-8 flex gap-2">
          {(["7days", "30days", "all"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                dateRange === range
                  ? "border-primary bg-primary/10 font-bold"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {range === "7days" ? "Last 7 Days" : range === "30days" ? "Last 30 Days" : "All Time"}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 space-y-4"
              >
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-black mt-1">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* VIP Metrics */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-lg">VIP Metrics</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  VIP Orders
                </p>
                <p className="text-2xl font-black mt-1">{vipOrders}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalOrders > 0 ? ((vipOrders / totalOrders) * 100).toFixed(1) : 0}% of total
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  VIP Revenue
                </p>
                <p className="text-xl font-black text-primary mt-1">{formatCurrency(vipRevenue)}</p>
              </div>
            </div>
          </div>

          {/* Delivery Metrics */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-accent" />
              <h3 className="font-bold text-lg">Delivery Status</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  Delivered Orders
                </p>
                <p className="text-2xl font-black mt-1">{deliveredOrders}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {deliveryRate.toFixed(1)}% delivery rate
                </p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  Pending Orders
                </p>
                <p className="text-xl font-black text-yellow-500 mt-1">
                  {filteredOrders.filter((o) => o.status !== "delivered" && o.status !== "cancelled").length}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-green-500" />
              <h3 className="font-bold text-lg">Payment Methods</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  Cash on Delivery
                </p>
                <p className="text-2xl font-black mt-1">{paymentMethods.cod}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border">
                All orders are processed via Cash on Delivery. No online payment required.
              </p>
            </div>
          </div>
        </div>

        {/* Daily Sales Chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Daily Sales
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {dailySales.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No sales data available</p>
            ) : (
              dailySales.map((day, idx) => {
                const maxRevenue = Math.max(...dailySales.map((d) => d.revenue));
                const barWidth = (day.revenue / maxRevenue) * 100;

                return (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">
                        {new Date(day.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-muted-foreground">{day.orders} orders</span>
                    </div>
                    <div className="bg-secondary/30 rounded-lg h-8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ delay: idx * 0.05 + 0.2, duration: 0.5 }}
                        className="bg-gradient-to-r from-primary to-accent h-full flex items-center px-3"
                      >
                        <span className="text-xs font-bold text-white">{formatCurrency(day.revenue)}</span>
                      </motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Avg: {formatCurrency(day.avgOrderValue)}</span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
