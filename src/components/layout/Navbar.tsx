"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import Link from "next/link";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCartStore } from "@/store/useCartStore"; // NEW IMPORT

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  
  // Pull from our global store!
  const { isCartOpen, setCartOpen, items } = useCartStore();

  // Calculate total items (so 2 of the same shirt counts as 2)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 100 && latest > previous && !isCartOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-8 left-0 right-0 z-50 glass h-16 md:h-20 px-6 md:px-10 flex items-center justify-between"
      >
        <button className="md:hidden text-secondary"><Menu size={24} /></button>

        <Link href="/" className="font-bebas text-3xl md:text-4xl text-secondary tracking-wide">HEADERR</Link>

        <div className="hidden md:flex items-center space-x-8 font-poppins text-sm font-medium">
          <Link href="/football" className="text-secondary hover:text-white/70 transition-colors">FOOTBALL</Link>
          <Link href="/cricket" className="text-secondary hover:text-white/70 transition-colors">CRICKET</Link>
          <Link href="/drops" className="text-highlight hover:text-highlight/80 transition-colors">LIMITED DROPS</Link>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6 text-secondary">
          <button className="hover:text-accent transition-colors"><Search size={20} /></button>
          <button className="hidden md:block hover:text-accent transition-colors"><User size={20} /></button>
          
          <button onClick={() => setCartOpen(true)} className="relative hover:text-accent transition-colors">
            <ShoppingBag size={20} />
            {/* Dynamic Cart Badge */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-primary flex items-center justify-center rounded-full font-poppins font-bold text-[10px]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </motion.nav>

      {/* The Cart Drawer component now controls its own open/close state via the store! */}
      <CartDrawer />
    </>
  );
}