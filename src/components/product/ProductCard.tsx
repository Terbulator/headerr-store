"use client";

import React from "react";
import { useCart } from "@/context/CartContext"; // <-- 1. Import the hook

export default function ProductCard(product: any) {
  const { addToCart } = useCart(); // <-- 2. Get the function

  // (Destructure the props for easy reading below)
  const { name, price, image, desc, club, category, sizes, sleeve_type } = product;

  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all flex flex-col h-full group">
      
      {/* ... [Keep all your existing Image and Details code exactly the same] ... */}
      <div className="h-72 overflow-hidden relative bg-black">
        {category && (
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider z-10 border border-white/10">
            {category}
          </div>
        )}
        <img src={image || "https://via.placeholder.com/400x500"} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        {club && <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">{club}</p>}
        <h3 className="font-bebas text-2xl text-white tracking-wide">{name}</h3>
        
        <div className="flex gap-2 mt-2">
          {sleeve_type && <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded uppercase">{sleeve_type}</span>}
          {sizes && <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded uppercase">Sizes: {sizes}</span>}
        </div>
        
        <p className="text-sm text-gray-400 mt-4 line-clamp-2 flex-1">{desc}</p>
        
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-white font-bebas text-xl tracking-wider">₹{price}</p>
          
          {/* 3. Wire up the button! */}
          <button 
            onClick={() => {
              addToCart(product);
              alert(`${name} added to vault!`); // Quick visual feedback
            }}
            className="bg-white text-black px-4 py-2 text-sm font-bold rounded hover:bg-accent hover:text-white transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}