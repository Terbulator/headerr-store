import React from "react";
import Button from "@/components/ui/Button";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

// Mock database fetch based on the ID in the URL
const getProductData = (id: string) => {
  return {
    id,
    name: "AFA '22 World Cup Authentic Jersey",
    price: "₹8,999",
    category: "FOOTBALL",
    description: "Engineered with moisture-wicking technology and a precise athletic cut for maximum performance. This is the exact match-day armor worn by the champions on the global stage.",
    image: "https://images.unsplash.com/photo-1508344928928-7157b66de6ee?q=80&w=2000&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
  };
};

// In Next.js 15+, params is a Promise, so we must await it
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = getProductData(resolvedParams.id);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Side: Sticky Product Image */}
        <div className="relative w-full h-[60vh] lg:h-[80vh] bg-surface-light rounded-2xl overflow-hidden border border-white/5 lg:sticky lg:top-32">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side: Product Details & Checkout */}
        <div className="flex flex-col pt-4">
          <span className="text-text-secondary font-poppins text-sm font-semibold tracking-widest uppercase mb-3">
            {product.category}
          </span>
          <h1 className="font-bebas text-5xl md:text-6xl text-secondary leading-none mb-4">
            {product.name}
          </h1>
          <span className="font-oswald font-medium text-accent text-3xl mb-8">
            {product.price}
          </span>

          <p className="font-poppins text-text-secondary leading-relaxed mb-10">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bebas text-xl text-secondary tracking-wide">SELECT SIZE</span>
              <button className="text-text-secondary text-sm font-poppins underline hover:text-accent transition-colors">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  className="h-12 border border-white/20 rounded-md text-secondary font-poppins hover:border-accent hover:text-accent transition-colors flex items-center justify-center focus:border-accent focus:text-primary focus:bg-accent"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 mb-12">
            <Button size="lg" className="w-full text-xl h-16">
              ADD TO CART
            </Button>
            <Button variant="secondary" size="lg" className="w-full text-xl h-16 border-white/20">
              FAVORITE
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
            <div className="flex flex-col items-center text-center space-y-3">
              <ShieldCheck size={24} className="text-accent" />
              <span className="font-poppins text-xs text-text-secondary uppercase tracking-wider">100% Authentic</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <Truck size={24} className="text-accent" />
              <span className="font-poppins text-xs text-text-secondary uppercase tracking-wider">Express Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <RotateCcw size={24} className="text-accent" />
              <span className="font-poppins text-xs text-text-secondary uppercase tracking-wider">30-Day Returns</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}