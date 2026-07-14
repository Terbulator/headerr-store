"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const ref = useRef(null);
  
  // This hook tracks our scroll position for the Parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Move the background slightly slower than the user scrolls
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    // -mt-28 pulls the section up to hide underneath the glass navbar
    <section ref={ref} className="relative w-full h-[calc(100vh-32px)] flex items-center justify-center overflow-hidden -mt-28 pt-28">
      
      {/* Background Media with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        {/* Placeholder: High-res gritty stadium/sports image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518605368461-1e1e38ce1533?q=80&w=3270&auto=format&fit=crop')",
          }}
        />
        {/* Cinematic dark gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080808_100%)]" />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-7xl md:text-[120px] leading-none text-secondary tracking-tight drop-shadow-2xl"
        >
          WEAR THE <span className="text-accent">GLORY.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 text-lg md:text-xl text-text-secondary max-w-xl font-poppins"
        >
          Premium match-day armor for the modern fan. Engineered for the streets, built for the stadium.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="mt-10"
        >
          <Button size="lg" className="shadow-[0_0_40px_rgba(255,212,0,0.15)]">
            SHOP THE NEW DROP
          </Button>
        </motion.div>
      </div>
    </section>
  );
}