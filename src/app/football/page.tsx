"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

// Expanded Mock Database for the Football Category
const footballProducts = [
  { id: 1, name: "AFA '22 World Cup Authentic Jersey", price: "₹8,999", category: "FOOTBALL", image: "https://images.unsplash.com/photo-1508344928928-7157b66de6ee?q=80&w=2000&auto=format&fit=crop", isNew: true },
  { id: 2, name: "MBSG '24 Pro Match Kit", price: "₹4,499", category: "FOOTBALL", image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop", isNew: true },
  { id: 5, name: "Predator Precision Firm Ground", price: "₹14,999", category: "FOOTWEAR", image: "https://images.unsplash.com/photo-1627914436577-47bfae6b215f?q=80&w=2000&auto=format&fit=crop", isNew: false },
  { id: 6, name: "Classic Pitch Training Top", price: "₹3,499", category: "TRAINING", image: "https://images.unsplash.com/photo-1556822284-35bb63214b2d?q=80&w=2000&auto=format&fit=crop", isNew: false },
  { id: 7, name: "Pro Grip Goalkeeper Gloves", price: "₹5,999", category: "ACCESSORIES", image: "https://images.unsplash.com/photo-1518605368461-1e1e38ce1533?q=80&w=2000&auto=format&fit=crop", isNew: false },
  { id: 8, name: "Stadium Anthem Jacket", price: "₹6,499", category: "OUTERWEAR", image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2000&auto=format&fit=crop", isNew: true },
];

export default function FootballCategory() {
  const [sortBy, setSortBy] = useState("LATEST");

  return (
    <div className="min-h-screen bg-primary pb-24">
      
      {/* Category Header Banner */}
      <div className="relative w-full h-[40vh] bg-surface-light flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518605368461-1e1e38ce1533?q=80&w=3270&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        
        <div className="relative z-10 text-center flex flex-col items-center mt-12">
          <span className="text-accent font-poppins text-sm tracking-[0.3em] font-semibold mb-4">THE COLLECTION</span>
          <h1 className="font-bebas text-6xl md:text-8xl text-secondary tracking-tight">FOOTBALL</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-12">
        
        {/* Toolbar: Filters & Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 mb-8 border-b border-white/10 space-y-4 md:space-y-0">
          
          {/* Filter Button */}
          <button className="flex items-center space-x-2 text-text-secondary hover:text-secondary transition-colors font-poppins text-sm uppercase tracking-wider">
            <SlidersHorizontal size={18} />
            <span>Filter By</span>
          </button>

          <div className="flex items-center space-x-6 text-sm">
            <span className="font-poppins text-text-secondary">{footballProducts.length} Results</span>
            
            {/* Custom Sort Dropdown */}
            <div className="relative group cursor-pointer">
              <div className="flex items-center space-x-2 font-poppins text-secondary uppercase tracking-wider">
                <span>Sort: <span className="text-accent">{sortBy}</span></span>
                <ChevronDown size={16} className="group-hover:text-accent transition-colors" />
              </div>
              
              {/* Dropdown Menu (Appears on Hover) */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40 overflow-hidden">
                <div className="flex flex-col py-2">
                  {["LATEST", "PRICE: LOW TO HIGH", "PRICE: HIGH TO LOW"].map((option) => (
                    <button 
                      key={option}
                      onClick={() => setSortBy(option)}
                      className="text-left px-4 py-2 font-poppins text-xs text-text-secondary hover:bg-white/5 hover:text-secondary transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {footballProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}