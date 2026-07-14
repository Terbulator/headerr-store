"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";

// High-end placeholder data
const trendingProducts = [
  {
    id: 1,
    name: "AFA '22 World Cup Authentic Jersey",
    price: "₹8,999",
    category: "FOOTBALL",
    image: "https://images.unsplash.com/photo-1508344928928-7157b66de6ee?q=80&w=2000&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 2,
    name: "MBSG '24 Pro Match Kit",
    price: "₹4,499",
    category: "FOOTBALL",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 3,
    name: "Phantom Elite Firm Ground Cleats",
    price: "₹12,499",
    category: "FOOTWEAR",
    image: "https://images.unsplash.com/photo-1627914436577-47bfae6b215f?q=80&w=2000&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 4,
    name: "Stadium Anthem Track Jacket",
    price: "₹5,999",
    category: "STREETWEAR",
    image: "https://images.unsplash.com/photo-1556822284-35bb63214b2d?q=80&w=2000&auto=format&fit=crop",
    isNew: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    // ADD 'as const' RIGHT HERE 👇
    transition: { type: "spring" as const, stiffness: 100 } 
  }
};

export default function TrendingGrid() {
  return (
    <section className="w-full bg-primary py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-5xl md:text-7xl text-secondary tracking-tight">TRENDING <span className="text-accent">NOW</span></h2>
            <p className="text-text-secondary font-poppins mt-2">The most hyped gear this week.</p>
          </div>
          <button className="font-bebas text-xl text-secondary border-b-2 border-accent pb-1 hover:text-accent transition-colors w-max">
            VIEW ALL DROPS
          </button>
        </div>

        {/* Product Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {trendingProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}