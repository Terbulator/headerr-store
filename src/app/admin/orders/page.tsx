"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, Filter, Download, MoreHorizontal, X, 
  Package, Truck, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight,
  MapPin, Phone, Mail
} from "lucide-react";

// --- DUMMY DATA ---
const dummyOrders = [
  {
    id: "ORD-9081",
    customer: { name: "Rahul Sharma", email: "rahul.s@example.com", phone: "+91 98765 43210" },
    date: "2024-10-24T10:24:00",
    status: "Pending",
    total: 4999,
    items: [{ name: "MBSG Home Kit 24/25", size: "L", qty: 1, price: 4999 }],
    address: "A-102, Green Valley Apts, Andheri West, Mumbai, Maharashtra 400053",
    payment: "Credit Card (Paid)"
  },
  {
    id: "ORD-9080",
    customer: { name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 91234 56789" },
    date: "2024-10-24T09:12:00",
    status: "Packed",
    total: 8998,
    items: [
      { name: "Argentina Away Jersey 2024", size: "M", qty: 1, price: 4999 },
      { name: "Real Madrid Third Kit", size: "M", qty: 1, price: 3999 }
    ],
    address: "45, Jubilee Hills, Road No. 36, Hyderabad, Telangana 500033",
    payment: "UPI (Paid)"
  },
  {
    id: "ORD-9079",
    customer: { name: "Arjun Reddy", email: "arjun.r@example.com", phone: "+91 99887 77665" },
    date: "2024-10-23T16:45:00",
    status: "Shipped",
    total: 3999,
    items: [{ name: "Arsenal Home Socks", size: "Free Size", qty: 4, price: 999.75 }],
    address: "Flat 2B, Residency Tower, MG Road, Bengaluru, Karnataka 560001",
    payment: "Cash on Delivery"
  },
  {
    id: "ORD-9078",
    customer: { name: "Karan Patel", email: "karan.p@example.com", phone: "+91 98712 34567" },
    date: "2024-10-23T14:20:00",
    status: "Rejected",
    total: 4999,
    items: [{ name: "Manchester United Retro 1999", size: "XL", qty: 1, price: 4999 }],
    address: "Block C, Sector 15, Noida, UP 201301",
    payment: "Failed"
  },
  {
    id: "ORD-9077",
    customer: { name: "Sneha Rao", email: "sneha.r@example.com", phone: "+91 90000 11111" },
    date: "2024-10-22T11:10:00",
    status: "Delivered",
    total: 2499,
    items: [{ name: "Brazil Training Top", size: "S", qty: 1, price: 2499 }],
    address: "12, Park Street, Kolkata, West Bengal 700016",
    payment: "Debit Card (Paid)"
  }
];

const TABS = [
  "All Orders", "Pending", "Accepted", "Packed", "Pickup Ready", 
  "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Rejected", 
  "Returned", "Refunded"
];

export default function CustomerOrdersPage() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<typeof dummyOrders[0] | null>(null);

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return dummyOrders.filter((order) => {
      const matchesTab = activeTab === "All Orders" || order.status === activeTab;
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Helper for Status Badge Colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
      case "Packed":
      case "Pickup Ready":
        return "bg-[#FFD400]/10 text-[#FFD400] border-[#FFD400]/20";
      case "Accepted":
      case "Shipped":
      case "Out for Delivery":
        return "bg-white/10 text-white border-white/20";
      case "Delivered":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Cancelled":
      case "Rejected":
      case "Returned":
      case "Refunded":
        return "bg-[#FF2E2E]/10 text-[#FF2E2E] border-[#FF2E2E]/20";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div className="relative pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Customer Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all customer purchases.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </button>
      </div>

      {/* TABS */}
      <div className="border-b border-white/10 mb-6 overflow-x-auto scrollbar-none">
        <div className="flex space-x-6 min-w-max px-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab ? "text-[#FFD400]" : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[#FFD400] rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTROLS: SEARCH & FILTER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111111] border border-white/10 rounded-md py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD400] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-[#111111] border border-white/10 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center hover:bg-white/5">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-black/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(order.date).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{order.customer.name}</p>
                      <p className="text-xs text-gray-500">{order.customer.email}</p>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">₹{order.total.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-gray-400 hover:text-[#FFD400] transition-colors p-2"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/20">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{filteredOrders.length}</span> of <span className="font-medium text-white">{filteredOrders.length}</span> results
          </p>
          <div className="flex space-x-2">
            <button className="p-2 border border-white/10 rounded-md text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-white/10 rounded-md text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- ORDER DETAILS DRAWER (SLIDE-OUT) --- */}
      {/* Overlay Backdrop */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setSelectedOrder(null)}
        />
      )}

      {/* Drawer Panel */}
      <div className={`
        fixed inset-y-0 right-0 z-[70] w-full md:w-[500px] bg-[#080808] border-l border-white/10 shadow-2xl
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${selectedOrder ? "translate-x-0" : "translate-x-full"}
      `}>
        {selectedOrder && (
          <>
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#111111]">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedOrder.id}</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Placed on {new Date(selectedOrder.date).toLocaleString("en-IN", { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
              
              {/* Status Update Banner */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  {selectedOrder.status === 'Delivered' ? <CheckCircle className="text-green-400 w-6 h-6" /> :
                   selectedOrder.status === 'Rejected' ? <XCircle className="text-[#FF2E2E] w-6 h-6" /> :
                   <Clock className="text-[#FFD400] w-6 h-6" />}
                  <div>
                    <p className="text-sm text-gray-400">Current Status</p>
                    <p className="font-bold text-white text-lg">{selectedOrder.status}</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-black bg-[#FFD400] px-4 py-2 rounded hover:bg-white transition-colors">
                  Update
                </button>
              </div>

              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Customer Details</h3>
                <div className="bg-[#111111] border border-white/10 rounded-lg p-4 space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FFD400] font-bold mr-3">
                      {selectedOrder.customer.name.charAt(0)}
                    </div>
                    <span className="text-white font-medium">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Mail className="w-4 h-4 mr-3" /> {selectedOrder.customer.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Phone className="w-4 h-4 mr-3" /> {selectedOrder.customer.phone}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Shipping Address</h3>
                <div className="bg-[#111111] border border-white/10 rounded-lg p-4 flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-gray-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedOrder.address}</p>
                </div>
              </div>

              {/* Items Summary */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Order Items</h3>
                <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
                  <ul className="divide-y divide-white/5">
                    {selectedOrder.items.map((item, idx) => (
                      <li key={idx} className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-black border border-white/10 rounded flex items-center justify-center mr-4">
                            <Package className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{item.name}</p>
                            <p className="text-xs text-gray-500">Size: {item.size} • Qty: {item.qty}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-white">₹{item.price.toLocaleString("en-IN")}</p>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Totals */}
                  <div className="p-4 bg-black/50 border-t border-white/10 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>₹{selectedOrder.total.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10 mt-2">
                      <span>Total</span>
                      <span>₹{selectedOrder.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-white/10 bg-[#111111] flex gap-3">
              <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-md transition-colors border border-white/10">
                Print Invoice
              </button>
              <button className="flex-1 bg-[#FFD400] hover:bg-white text-black font-bold py-3 rounded-md transition-colors flex items-center justify-center">
                <Truck className="w-4 h-4 mr-2" /> Fulfill Order
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}