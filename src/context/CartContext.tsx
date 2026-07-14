"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of our data
type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
  totalPrice: number;
};

// Create the Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the Provider Wrapper
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from local storage on startup so users don't lose items on refresh
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("headerr-cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save to local storage whenever cart changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("headerr-cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // If it's already in the cart, just add 1 to the quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Otherwise, add it as a new item
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to easily use the cart anywhere
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}