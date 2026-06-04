"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAdminStore } from "@/store/useAdminStore";
import { Lock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAdminStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/admin");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate auth delay
    setTimeout(() => {
      if (login(password)) {
        router.push("/admin");
      } else {
        setError("Invalid password. Please try again.");
        setPassword("");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-accent to-accent-purple bg-clip-text text-transparent mb-2">
              ADMIN ACCESS
            </h1>
            <p className="text-muted-foreground">
              Trinidad&apos;s Trippy Treats Administration
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 focus:border-primary outline-none transition-colors"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "AUTHENTICATING..." : "ACCESS DASHBOARD"}
            </button>
          </form>

          {/* Info Section */}
          <div className="mt-12 p-6 bg-secondary/30 border border-border rounded-xl">
            <h3 className="font-bold text-sm mb-3">Security Note</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This admin panel is protected with a password. All orders and customer information are visible only to
              authenticated administrators. Session is stored locally on this device.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
