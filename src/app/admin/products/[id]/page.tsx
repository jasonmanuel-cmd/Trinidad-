"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAdminStore } from "@/store/useAdminStore";
import { useProductAdminStore } from "@/store/useProductAdminStore";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAdminStore();
  const { getProduct } = useProductAdminStore();
  const [mounted, setMounted] = useState(false);

  const product = getProduct(params.id as string);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) router.push("/admin-login");
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (mounted && !product) {
      router.push("/admin/products");
    }
  }, [mounted, product, router]);

  if (!mounted || !isAuthenticated || !product) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-primary via-accent to-accent-purple bg-clip-text text-transparent">
            EDIT PRODUCT
          </h1>
          <p className="text-muted-foreground">Editing: {product.name}</p>
        </div>
        <ProductForm product={product} />
      </main>
      <Footer />
    </div>
  );
}
