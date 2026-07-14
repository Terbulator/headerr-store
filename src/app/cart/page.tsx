"use client";

import React from "react";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white p-6 md:p-12 flex flex-col items-center justify-center">
        <h1 className="font-bebas text-5xl mb-4 tracking-widest">YOUR CART IS EMPTY</h1>
        <p className="text-gray-400 mb-8 font-poppins">Looks like you haven't added any drops to your vault yet.</p>
        <Link 
          href="/" 
          className="bg-white text-black px-8 py-3 font-bold rounded hover:bg-accent hover:text-white transition-colors"
        >
          RETURN TO VAULT
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors text-sm font-poppins">
            <ArrowLeft size={16} className="mr-2" /> Continue Shopping
          </Link>
          <h1 className="font-bebas text-6xl tracking-widest uppercase">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* CART ITEMS LIST */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border-b border-white/10 pb-4 flex justify-between text-sm text-gray-400 font-poppins">
              <span>PRODUCT</span>
              <span>TOTAL</span>
            </div>
            
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 py-6 border-b border-white/10 items-center">
                <div className="w-24 h-32 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bebas text-2xl tracking-wide">{item.name}</h3>
                  <div className="text-xs text-gray-400 flex gap-2 mt-1">
                    {item.sizes && <span>Size: {item.sizes}</span>}
                    {item.sleeve_type && <span>| Sleeve: {item.sleeve_type}</span>}
                  </div>
                  <p className="text-gray-400 mt-2 text-sm font-poppins">Qty: {item.quantity}</p>
                </div>

                <div className="text-right flex flex-col justify-between h-full">
                  <p className="font-bebas text-2xl">₹{item.price * item.quantity}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors mt-auto flex justify-end"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-gray-900 p-8 rounded-xl h-max border border-white/5">
            <h2 className="font-bebas text-3xl tracking-widest mb-6 border-b border-white/10 pb-4">SUMMARY</h2>
            
            <div className="space-y-4 font-poppins text-sm mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-white">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-400">Calculated at next step</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between items-end mb-8">
              <span className="font-bebas text-2xl text-gray-400">TOTAL</span>
              <span className="font-bebas text-4xl text-accent">₹{totalPrice}</span>
            </div>

            <button 
              onClick={() => alert("Payment gateway integration coming soon!")}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-md hover:bg-blue-500 transition-colors text-lg tracking-wider"
            >
              PROCEED TO PAYMENT
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}