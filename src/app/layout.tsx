import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import { ClerkProvider } from "@clerk/nextjs"; // <-- 1. Import Clerk

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Headerr Store",
  description: "Curated football drops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. Wrap the entire app in the ClerkProvider
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}