"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";

// 1. Strictly typed animation variants to satisfy Vercel's build checks
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This makes the cards pop in one after another
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100 } // <-- Add "as const" here
  }
};

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Reads the data your Admin Panel creates
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
      {/* Hero Section with smooth fade-in */}
      <section className="mb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bebas text-6xl md:text-8xl tracking-wider text-white"
        >
          THE VAULT
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-poppins text-text-secondary mt-4 max-w-lg mx-auto"
        >
          Curated drops for the modern collector.
        </motion.p>
      </section>

      {/* Product Grid */}
      <section>
        {products.length === 0 ? (
          <div className="text-center py-20 text-text-secondary">
            <p>No drops available yet. Check back soon.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard 
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  desc={product.desc}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}