import React from "react";

export default function Ticker() {
  const message = "FREE EXPRESS SHIPPING ON ALL ORDERS OVER ₹2,999 • 100% AUTHENTIC PREMIUM GEAR • ";
  
  return (
    <div className="w-full h-8 bg-accent flex items-center overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex font-poppins font-bold text-[12px] text-primary tracking-wider">
        <span>{message}</span>
        <span>{message}</span>
        <span>{message}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}