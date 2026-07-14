import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      {/* Massive 404 text */}
      <h1 className="font-bebas text-9xl md:text-[180px] text-secondary leading-none drop-shadow-2xl mb-2">
        4<span className="text-accent">0</span>4
      </h1>
      
      <h2 className="font-poppins text-2xl md:text-3xl text-secondary font-medium tracking-widest mb-6">
        RESTRICTED AREA
      </h2>
      
      <p className="font-poppins text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
        The drop you are looking for does not exist, has been vaulted, or is completely sold out. 
      </p>
      
      <Link href="/">
        <Button size="lg" className="px-12">
          RETURN TO BASE
        </Button>
      </Link>
    </div>
  );
}