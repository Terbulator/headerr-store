"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/useCartStore"; // NEW IMPORT

export default function CartDrawer() {
  // Grab everything we need from our global store
  const { items, isCartOpen, setCartOpen, removeItem, updateQuantity, cartTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-[100]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-surface border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-bebas text-3xl text-secondary tracking-wide">YOUR VAULT</h2>
              <button onClick={() => setCartOpen(false)} className="text-text-secondary hover:text-accent transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-text-secondary">
                  <p className="font-poppins">Your vault is currently empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-surface-light p-4 rounded-xl border border-white/5">
                    <div className="w-24 h-32 bg-primary rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
                    </div>
                    
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-poppins text-sm font-medium text-secondary line-clamp-2 leading-snug pr-4">
                          {item.name}
                        </h3>
                        <button onClick={() => removeItem(item.id, item.size)} className="text-text-secondary hover:text-highlight transition-colors mt-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <span className="font-poppins text-xs text-text-secondary mt-1">Size: {item.size}</span>
                      <span className="font-oswald text-accent text-lg mt-auto pb-2">₹{item.price.toLocaleString()}</span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4 border border-white/10 rounded-md w-max px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="text-text-secondary hover:text-secondary"><Minus size={14} /></button>
                        <span className="font-poppins text-sm text-secondary w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="text-text-secondary hover:text-secondary"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-surface-light">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-poppins text-text-secondary uppercase tracking-wider text-sm">Subtotal</span>
                  <span className="font-oswald text-2xl text-secondary">₹{cartTotal().toLocaleString()}</span>
                </div>
                <p className="font-poppins text-xs text-text-secondary mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button size="lg" className="w-full h-14 text-xl">
                  SECURE CHECKOUT
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}