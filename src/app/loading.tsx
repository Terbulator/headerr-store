import React from "react";

export default function Loading() {
  return (
    // This overlay takes up the whole screen, sitting right below the navbar
    <div className="fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Pulsing Brand Text */}
        <h1 className="font-bebas text-5xl md:text-7xl text-secondary tracking-widest animate-pulse">
          HEADER<span className="text-accent">R</span>
        </h1>
        
        {/* Custom Progress Bar */}
        <div className="w-48 h-[2px] bg-white/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-accent w-full origin-left animate-[marquee_1.5s_ease-in-out_infinite]" />
        </div>
        
      </div>
    </div>
  );
}