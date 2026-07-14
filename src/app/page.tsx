"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // This reads the SAME data your Admin Panel creates
    const saved = localStorage.getItem("headerr-products");
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading products");
      }
    }
  }, []);

  // Prevent hydration errors
  if (!isMounted) return <main className="min-h-screen bg-primary" />;

  return (
    <main className="min-h-screen bg-primary text-secondary p-6 md:p-12">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <h1 className="font-bebas text-6xl md:text-8xl tracking-wider text-white">
          THE VAULT
        </h1>
        <p className="font-poppins text-text-secondary mt-4 max-w-lg mx-auto">
          Curated drops for the modern collector.
        </p>
      </section>

      {/* Product Grid */}
      <section>
        {products.length === 0 ? (
          <div className="text-center py-20 text-text-secondary">
            <p>No drops available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                name={product.name}
                price={product.price}
                image={product.image}
                desc={product.desc}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}