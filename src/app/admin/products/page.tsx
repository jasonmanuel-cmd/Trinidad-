"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAdminStore } from "@/store/useAdminStore";
import { useProductAdminStore, type Product } from "@/store/useProductAdminStore";
import { formatCurrency } from "@/lib/utils";
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  AlertTriangle,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Flower", "Edibles", "Concentrates", "Vapes", "Pre-Rolls"] as const;
const STOCK_STATUSES = ["All", "In Stock", "Low Stock", "Sold Out", "Preorder"] as const;

export default function AdminProductsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminStore();
  const { products, deleteProduct } = useProductAdminStore();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [stockFilter, setStockFilter] = useState<string>("All");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) router.push("/admin-login");
  }, [isAuthenticated, router]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
      const matchStock = stockFilter === "All" || p.stockStatus === stockFilter;
      return matchSearch && matchCategory && matchStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  const handleDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  if (!mounted || !isAuthenticated) return null;

  const STOCK_BADGES: Record<string, string> = {
    "In Stock": "bg-green-500/20 text-green-600 border-green-500/30",
    "Low Stock": "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    "Sold Out": "bg-red-500/20 text-red-600 border-red-500/30",
    Preorder: "bg-purple-500/20 text-purple-600 border-purple-500/30",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-12 flex items-center justify-between flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-primary via-accent to-accent-purple bg-clip-text text-transparent">
              PRODUCTS
            </h1>
            <p className="text-muted-foreground">{products.length} products total</p>
          </div>
          <button
            onClick={() => router.push("/admin/products/new")}
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            ADD PRODUCT
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-card border border-border rounded-xl hover:border-primary transition-colors flex items-center gap-2 text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="flex flex-wrap gap-6 p-6 bg-card border border-border rounded-xl">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          categoryFilter === cat
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
                    Stock Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STOCK_STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStockFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          stockFilter === s
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products List */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold truncate">{product.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${STOCK_BADGES[product.stockStatus]}`}>
                        {product.stockStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{product.category}</span>
                      <span>•</span>
                      <span>{product.brand}</span>
                      <span>•</span>
                      <span>{formatCurrency(product.price)}</span>
                      {product.thc && (
                        <>
                          <span>•</span>
                          <span className="text-accent">{product.thc}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => router.push(`/admin/products/${product.id}`)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl max-w-md w-full p-6 space-y-4"
            >
              <div className="flex items-center gap-3 text-red-500">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-bold">Delete Product</h3>
              </div>
              <p className="text-muted-foreground">
                Are you sure you want to delete <span className="font-bold text-foreground">{deleteTarget.name}</span>?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2 bg-secondary text-foreground font-bold rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 bg-red-500/20 text-red-500 font-bold rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                >
                  DELETE
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
