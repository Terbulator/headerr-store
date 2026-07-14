"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="w-full bg-black border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-bebas text-3xl text-white tracking-widest hover:text-accent transition-colors">
          HEADERR
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8 font-poppins text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">DROPS</Link>
          <Link href="/admin" className="hover:text-white transition-colors">VAULT (ADMIN)</Link>
        </div>

        {/* CART ICON */}
        <Link 
          href="/cart" 
          className="relative flex items-center text-white hover:text-accent transition-colors"
        >
          <ShoppingBag size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}