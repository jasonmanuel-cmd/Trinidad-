"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAdminStore } from "@/store/useAdminStore";
import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) router.push("/admin-login");
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-primary via-accent to-accent-purple bg-clip-text text-transparent">
            NEW PRODUCT
          </h1>
          <p className="text-muted-foreground">Add a new product to the catalog</p>
        </div>
        <ProductForm />
      </main>
      <Footer />
    </div>
  );
}
