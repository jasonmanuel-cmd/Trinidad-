"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PREORDER_PRODUCTS } from "@/data/preorderCatalog";
import { Clock, AlertCircle, ShoppingCart, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

export default function PreordersPage() {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  // Filter products
  const filtered = PREORDER_PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(PREORDER_PRODUCTS.map((p) => p.category)));

  // Calculate cart total
  const cartTotal = Object.entries(cart).reduce((sum, [productId, qty]) => {
    const product = PREORDER_PRODUCTS.find((p) => p.id === productId);
    return sum + (product?.price || 0) * qty;
  }, 0);

  const canCheckout = cartTotal >= 100;

  const handleAddToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) {
        updated[productId]--;
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  const handleCheckout = () => {
    // Add items to main cart (addItem will set quantity)
    Object.entries(cart).forEach(([productId, qty]) => {
      const product = PREORDER_PRODUCTS.find((p) => p.id === productId);
      if (product) {
        // Add first item via addItem
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          brand: product.brand,
          category: product.category,
          description: product.description,
        } as any); // Cast to any to avoid type issues

        // Then update quantity if more than 1
        if (qty > 1) {
          // Note: useCartStore will handle incrementing on multiple calls
          for (let i = 1; i < qty; i++) {
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              brand: product.brand,
              category: product.category,
              description: product.description,
            } as any);
          }
        }
      }
    });
    router.push("/preorder-checkout");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className={`container mx-auto px-4 py-12 ${Object.keys(cart).length > 0 ? "md:pb-0 pb-32" : ""}`}>
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Header */}
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                Preorder Catalog
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tight">PREORDER DROPS</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Mix & match premium LA brands. $100 minimum order. Free delivery. 2-3 business day delivery.
              </p>
            </div>

            {/* Info Callout */}
            <div className="p-6 bg-accent/10 border border-accent/30 rounded-3xl flex gap-4">
              <AlertCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-bold text-lg">How Preorders Work</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Build your order from 15+ LA cannabis brands</li>
                  <li>• $100 minimum order value required</li>
                  <li>• FREE delivery included on all preorders</li>
                  <li>• Estimated delivery: 2-3 business days after order</li>
                </ul>
              </div>
            </div>

            {/* Preorder Cart Summary (Sticky) */}
            {Object.keys(cart).length > 0 && (
              <div className="sticky bottom-4 left-4 right-4 bg-gradient-to-r from-primary to-accent-purple p-6 rounded-2xl text-white space-y-4 z-40 md:hidden">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">Order Total</p>
                    <p className="text-2xl font-black">{formatCurrency(cartTotal)}</p>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={!canCheckout}
                    className="px-6 py-3 bg-white text-primary rounded-xl font-bold disabled:opacity-50"
                  >
                    Checkout
                  </button>
                </div>
                {!canCheckout && (
                  <p className="text-xs opacity-90">Min ${100 - cartTotal} more needed</p>
                )}
              </div>
            )}

            {/* Search & Filter */}
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by brand or product name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-4 focus:border-primary outline-none"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    !selectedCategory
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors capitalize ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => {
                const qty = cart[product.id] || 0;
                return (
                  <div
                    key={product.id}
                    className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:border-primary transition-colors"
                  >
                    {/* Brand & Name */}
                    <div className="space-y-2">
                      <p className="text-xs font-black text-primary uppercase tracking-widest">{product.brand}</p>
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>

                    {/* Details */}
                    {product.thcPercentage && (
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-1 bg-secondary rounded-full">THC {product.thcPercentage}%</span>
                        {product.effects && product.effects[0] && (
                          <span className="px-2 py-1 bg-secondary rounded-full">{product.effects[0]}</span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="text-2xl font-black pt-2">{formatCurrency(product.price)}</div>

                    {/* Add to Cart */}
                    {qty === 0 ? (
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Order
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRemoveFromCart(product.id)}
                          className="flex-1 py-3 bg-secondary rounded-xl font-bold hover:bg-secondary/80 transition-colors"
                        >
                          -
                        </button>
                        <button disabled className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold">
                          {qty}
                        </button>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="flex-1 py-3 bg-secondary rounded-xl font-bold hover:bg-secondary/80 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="py-24 text-center space-y-4 border border-dashed border-border rounded-3xl">
                <h2 className="text-2xl font-bold">No products found</h2>
                <p className="text-muted-foreground">Try adjusting your search or filter</p>
              </div>
            )}

            {/* Desktop Cart Summary */}
            {Object.keys(cart).length > 0 && (
              <div className="hidden md:block sticky bottom-24 bg-card border border-primary rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-bold">Preorder Summary</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                  {Object.entries(cart).map(([productId, qty]) => {
                    const product = PREORDER_PRODUCTS.find((p) => p.id === productId);
                    return (
                      <div key={productId} className="flex justify-between text-sm">
                        <span>{qty}x {product?.name}</span>
                        <span className="font-medium">{formatCurrency((product?.price || 0) * qty)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-6 border-t border-border space-y-4">
                  <div className="flex justify-between font-black text-xl">
                    <span>Subtotal</span>
                    <span>{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="text-sm text-accent">FREE DELIVERY INCLUDED</div>
                  <button
                    onClick={handleCheckout}
                    disabled={!canCheckout}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {canCheckout ? "PROCEED TO CHECKOUT" : `Min $${100 - cartTotal} more needed`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
