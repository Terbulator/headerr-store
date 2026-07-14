import type { Metadata } from "next";
import { Bebas_Neue, Poppins, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Ticker from "@/components/layout/Ticker";
import Footer from "@/components/layout/Footer";

const bebas = Bebas_Neue({ 
  weight: '400', 
  subsets: ["latin"],
  variable: '--font-bebas-neue',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'], 
  subsets: ["latin"],
  variable: '--font-poppins',
});

const oswald = Oswald({ 
  weight: ['400', '500', '700'], 
  subsets: ["latin"],
  variable: '--font-oswald',
});

export const metadata: Metadata = {
  title: "HEADERR | Premium Sports Gear",
  description: "Wear the glory. Premium match-day armor for the modern fan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${poppins.variable} ${oswald.variable} bg-primary text-text-primary flex flex-col min-h-screen`}>
        {/* Top UI */}
        <Ticker />
        <Navbar />
        
        {/* Main Page Content */}
        <main className="flex-grow pt-28">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}