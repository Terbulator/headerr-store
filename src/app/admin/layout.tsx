"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, Bell, Search, User, ChevronRight, ChevronDown, 
  Home, ShoppingBag, FolderTree, Users, Box, Tag, Star, 
  Image as ImageIcon, Gift, Truck, BarChart, Settings, Shield, LogOut
} from "lucide-react";

// --- NAVIGATION STRUCTURE ---
const navigation = [
  { name: "Dashboard", icon: Home, href: "/admin" },
  { 
    name: "Customer Orders", icon: ShoppingBag, 
    subItems: [
      { name: "All Orders", href: "/admin/orders" },
      { name: "Pending", href: "/admin/orders/pending" },
      { name: "Accepted", href: "/admin/orders/accepted" },
      { name: "Packed", href: "/admin/orders/packed" },
      { name: "Pickup Ready", href: "/admin/orders/pickup-ready" },
      { name: "Shipped", href: "/admin/orders/shipped" },
      { name: "Out for Delivery", href: "/admin/orders/out-for-delivery" },
      { name: "Delivered", href: "/admin/orders/delivered" },
      { name: "Cancelled", href: "/admin/orders/cancelled" },
      { name: "Rejected", href: "/admin/orders/rejected" },
      { name: "Returned", href: "/admin/orders/returned" },
      { name: "Refunded", href: "/admin/orders/refunded" },
    ]
  },
  { 
    name: "Catalog", icon: FolderTree,
    subItems: [
      { name: "Products", href: "/admin/catalog/products" },
      { name: "Categories", href: "/admin/catalog/categories" },
      { name: "Collections", href: "/admin/catalog/collections" },
    ]
  },
  { name: "Customers", icon: Users, href: "/admin/customers" },
  { name: "Inventory", icon: Box, href: "/admin/inventory" },
  { name: "Coupons", icon: Tag, href: "/admin/coupons" },
  { name: "Reviews", icon: Star, href: "/admin/reviews" },
  { name: "Banners", icon: ImageIcon, href: "/admin/banners" },
  { name: "Offers", icon: Gift, href: "/admin/offers" },
  { name: "Shipping", icon: Truck, href: "/admin/shipping" },
  { name: "Reports", icon: BarChart, href: "/admin/reports" },
  { name: "Website Settings", icon: Settings, href: "/admin/settings" },
  { name: "Admin Users", icon: Shield, href: "/admin/users" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    "Customer Orders": true,
    "Catalog": true
  });
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleSubMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFFFF] font-sans selection:bg-[#FFD400] selection:text-black flex">
      
      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#080808] border-r border-white/10 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/admin" className="font-bold text-2xl tracking-widest text-[#FFD400]">
            HEADERR <span className="text-white text-xs tracking-normal ml-2 bg-white/10 px-2 py-1 rounded">ADMIN</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                // Accordion Item
                <>
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md hover:bg-white/5 transition-colors text-gray-300 hover:text-white group"
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-[#FFD400] transition-colors" />
                      {item.name}
                    </div>
                    {openMenus[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  
                  {openMenus[item.name] && (
                    <div className="mt-1 mb-2 pl-11 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Standard Link
                <Link
                  href={item.href}
                  className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md hover:bg-white/5 transition-colors text-gray-300 hover:text-white group mb-1"
                >
                  <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-[#FFD400] transition-colors" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* --- TOP NAVBAR --- */}
        <header className="h-20 bg-[#080808] border-b border-white/10 flex items-center justify-between px-4 lg:px-8 shrink-0">
          
          <div className="flex items-center flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-4 text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            
            {/* Search Bar */}
            <div className="max-w-md w-full hidden md:flex items-center relative">
              <Search className="absolute left-3 h-5 w-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search orders, products, or customers..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD400] transition-colors"
              />
            </div>
          </div>

          {/* Right Nav Items */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            
            {/* Notification Area */}
            <button className="relative text-gray-400 hover:text-white transition-colors p-2">
              <Bell size={22} />
              {/* Warning/Error Red Indicator */}
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-[#FF2E2E] rounded-full border border-[#080808]"></span>
            </button>

            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

            {/* User Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="h-9 w-9 rounded-full bg-white/10 border border-[#FFD400]/50 flex items-center justify-center">
                  <User size={18} className="text-[#FFD400]" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-xs text-gray-500">Super User</p>
                </div>
                <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#080808] border border-white/10 rounded-md shadow-2xl py-1 z-50">
                  <Link href="/admin/profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                    <User size={16} className="mr-2" /> Profile
                  </Link>
                  <Link href="/admin/settings" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                    <Settings size={16} className="mr-2" /> Settings
                  </Link>
                  <div className="border-t border-white/10 my-1"></div>
                  <button className="w-full flex items-center px-4 py-2 text-sm text-[#FF2E2E] hover:bg-white/5 transition-colors">
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* --- MAIN SCROLLABLE CONTENT --- */}
        <div className="flex-1 overflow-auto bg-[#080808]">
          <main className="p-4 lg:p-8 max-w-7xl mx-auto">
            
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 font-medium">
              <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
              <ChevronRight size={14} />
              <span className="text-[#FFD400]">Current Page</span>
            </nav>

            {/* Dynamic Page Content Renders Here */}
            {children}
            
          </main>
          
          {/* --- FOOTER --- */}
          <footer className="border-t border-white/10 py-6 px-4 lg:px-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <p>© {new Date().getFullYear()} HEADERR. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white transition-colors">Support</Link>
                <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}