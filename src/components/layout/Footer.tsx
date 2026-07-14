import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-white/5 pt-16 pb-8 px-6 md:px-10 mt-auto">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* Brand & Newsletter Section (Spans 5 columns) */}
          <div className="md:col-span-5 flex flex-col">
            <Link href="/" className="font-bebas text-4xl md:text-5xl text-secondary tracking-wide mb-6">
              HEADERR
            </Link>
            <p className="text-text-secondary font-poppins text-sm max-w-md mb-8 leading-relaxed">
              Unlock access to limited drops, exclusive match-day gear, and VIP events. Join the vault.
            </p>
            
            {/* Newsletter Input */}
            <div className="flex w-full max-w-md bg-primary rounded-full border border-white/10 overflow-hidden focus-within:border-accent transition-colors">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="w-full bg-transparent px-6 py-4 outline-none text-secondary font-poppins text-sm placeholder:text-text-secondary/50"
              />
              <button className="bg-accent text-primary px-6 flex items-center justify-center hover:bg-white transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Links (Spans 7 columns total) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="flex flex-col space-y-4">
              <h4 className="font-bebas text-xl text-secondary tracking-widest mb-2">SHOP</h4>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">New Arrivals</Link>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Football Kits</Link>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Cricket Gear</Link>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Streetwear</Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col space-y-4">
              <h4 className="font-bebas text-xl text-secondary tracking-widest mb-2">SUPPORT</h4>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Track Order</Link>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Returns & Exchanges</Link>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Size Guide</Link>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Contact Us</Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col space-y-4">
              <h4 className="font-bebas text-xl text-secondary tracking-widest mb-2">LEGAL</h4>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Terms of Service</Link>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="#" className="font-poppins text-sm text-text-secondary hover:text-accent transition-colors">Shipping Policy</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8">
          <p className="font-poppins text-xs text-text-secondary mb-4 md:mb-0">
            © {new Date().getFullYear()} HEADERR SPORTS. ALL RIGHTS RESERVED.
          </p>
          
          {/* Social Icons (Using Inline SVGs) */}
          <div className="flex space-x-6 text-text-secondary">
            {/* Instagram */}
            <a href="#" className="hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            {/* Twitter */}
            <a href="#" className="hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            {/* Youtube */}
            <a href="#" className="hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.4 5.3 3.1 4.5 4 3.6 5.1 3.6 5.6 3.5 9.1 3.2 12 3.2 12 3.2s2.9 0 6.4 0.3c0.5 0.1 1.6 0.1 2.5 1 0.7 0.8 0.6 2.6 0.6 2.6 0.2 1.9 0.2 3.8 0.2 3.8s0 1.9-0.2 3.8c0 0-0.1 1.8-0.8 2.6-0.9 0.9-2.1 0.9-2.6 1-3.1 0.3-6.4 0.3-6.4 0.3s-2.9 0-6.4-0.3c-0.5-0.1-1.6-0.1-2.5-1-0.7-0.8-0.6-2.6-0.6-2.6-0.2-1.9-0.2-3.8-0.2-3.8s0-1.9 0.2-3.8z"/><polygon points="9.75,15.02 15.47,11.97 9.75,8.97"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}