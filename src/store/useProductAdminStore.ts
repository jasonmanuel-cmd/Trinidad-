"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, type Product } from "@/data/mockProducts";
import { generateProductImageDataUrl } from "@/lib/productImages";

export type { Product };

type ProductFormData = Omit<Product, "id" | "slug" | "image">;

interface ProductAdminStore {
  products: Product[];
  addProduct: (data: ProductFormData) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const useProductAdminStore = create<ProductAdminStore>()(
  persist(
    (set, get) => ({
      products: PRODUCTS,

      addProduct: (data) => {
        const id = `p-${Date.now()}`;
        const slug = generateSlug(data.name);
        const image = generateProductImageDataUrl(data.name, data.category, data.thc);
        const product: Product = { id, ...data, slug, image };
        set((state) => ({ products: [...state.products, product] }));
      },

      updateProduct: (id, data) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProduct: (id) => {
        return get().products.find((p) => p.id === id);
      },
    }),
    { name: "product-admin-store" }
  )
);
