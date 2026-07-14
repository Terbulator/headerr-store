"use client";

import { motion } from "framer-motion";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  className = "", 
  ...props 
}: ButtonProps) {
  
  const baseStyles = "rounded-full flex items-center justify-center font-bebas tracking-wide transition-colors focus:outline-none";
  
  const variants = {
    primary: "bg-accent text-primary hover:shadow-[0_4px_20px_rgba(255,212,0,0.4)]",
    secondary: "bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-primary",
    ghost: "bg-transparent text-secondary hover:text-accent",
  };

  const sizes = {
    sm: "h-10 px-6 text-base",
    md: "h-12 px-8 text-lg",
    lg: "h-14 px-10 text-xl w-full sm:w-auto",
  };

  return (
    <motion.button
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}