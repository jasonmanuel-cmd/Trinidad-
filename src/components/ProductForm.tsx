"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProductAdminStore, type Product } from "@/store/useProductAdminStore";

const CATEGORIES = ["Flower", "Edibles", "Concentrates", "Vapes", "Pre-Rolls"] as const;
const STOCK_STATUSES = ["In Stock", "Low Stock", "Sold Out", "Preorder"] as const;

interface Props {
  product?: Product;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const { addProduct, updateProduct } = useProductAdminStore();
  const isEditing = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState<Product["category"]>(product?.category ?? "Flower");
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [weight, setWeight] = useState(product?.weight ?? "");
  const [thc, setThc] = useState(product?.thc ?? "");
  const [stockStatus, setStockStatus] = useState<Product["stockStatus"]>(product?.stockStatus ?? "In Stock");
  const [isPreorder, setIsPreorder] = useState(product?.isPreorder ?? false);
  const [expectedArrival, setExpectedArrival] = useState(product?.expectedArrival ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [effects, setEffects] = useState(product?.effects ?? "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;
    setSaving(true);

    const data = {
      name: name.trim(),
      category,
      brand: brand.trim() || "Trippy",
      price: parseFloat(price),
      weight: weight.trim() || "N/A",
      thc: thc.trim() || undefined,
      stockStatus,
      isPreorder,
      expectedArrival: isPreorder ? expectedArrival.trim() || undefined : undefined,
      description: description.trim(),
      effects: effects.trim() || undefined,
    };

    if (isEditing && product) {
      updateProduct(product.id, data);
    } else {
      addProduct(data);
    }

    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Blue Dream"
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Product["category"])}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
            Brand
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Trippy"
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
            Price ($) *
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            placeholder="35.00"
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none"
          />
        </div>

        {/* Weight/Size */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
            Weight / Size
          </label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="3.5g"
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none"
          />
        </div>

        {/* THC */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
            THC %
          </label>
          <input
            type="text"
            value={thc}
            onChange={(e) => setThc(e.target.value)}
            placeholder="24%"
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none"
          />
        </div>

        {/* Stock Status */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
            Stock Status
          </label>
          <select
            value={stockStatus}
            onChange={(e) => {
              const status = e.target.value as Product["stockStatus"];
              setStockStatus(status);
              if (status === "Preorder") setIsPreorder(true);
              else if (isPreorder && !product?.isPreorder) {
                setIsPreorder(false);
                setExpectedArrival("");
              }
            }}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none"
          >
            {STOCK_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Expected Arrival (only for preorders) */}
        {stockStatus === "Preorder" && (
          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
              Expected Arrival
            </label>
            <input
              type="text"
              value={expectedArrival}
              onChange={(e) => setExpectedArrival(e.target.value)}
              placeholder="In 2-3 days"
              className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none"
            />
          </div>
        )}

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Product description..."
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none resize-none"
          />
        </div>

        {/* Effects */}
        <div className="md:col-span-2">
          <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
            Effects
          </label>
          <input
            type="text"
            value={effects}
            onChange={(e) => setEffects(e.target.value)}
            placeholder="Relaxed, Creative, Euphoric"
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary outline-none"
          />
          <p className="text-xs text-muted-foreground mt-1">Comma-separated list of effects</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-6 py-3 bg-secondary text-foreground font-bold rounded-lg hover:bg-secondary/80 transition-colors"
        >
          CANCEL
        </button>
        <button
          type="submit"
          disabled={saving || !name.trim() || !price}
          className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "SAVING..." : isEditing ? "UPDATE PRODUCT" : "CREATE PRODUCT"}
        </button>
      </div>
    </form>
  );
}
