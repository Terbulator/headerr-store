"use client";

import React from "react";

export default function ProductCard({ name, price, image, desc }: any) {
  return (
    <div className="group cursor-pointer bg-surface p-4 rounded-xl border border-white/5 hover:border-accent/50 transition-all">
      {/* Image */}
      <div className="w-full h-80 overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      {/* Details */}
      <div className="mt-4">
        <h3 className="text-lg font-bebas text-secondary tracking-wide">{name}</h3>
        <p className="text-sm text-text-secondary line-clamp-2 mt-1 min-h-[40px] font-poppins">
          {desc}
        </p>
        <p className="text-accent font-oswald text-xl mt-3">₹{price.toLocaleString()}</p>
      </div>
      
      {/* Add to Cart Placeholder */}
      <button className="w-full mt-4 py-2 border border-white/10 rounded-md font-poppins text-xs text-secondary hover:bg-accent hover:text-primary transition-colors">
        VIEW DETAILS
      </button>
    </div>
  );
}