"use client";

import React from "react";
import { 
  TrendingUp, TrendingDown, IndianRupee, ShoppingBag, 
  Users, Package, AlertCircle, ArrowUpRight 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

// --- DUMMY DATA ---
const revenueData = [
  { name: "Jan", total: 120000 }, { name: "Feb", total: 150000 },
  { name: "Mar", total: 180000 }, { name: "Apr", total: 140000 },
  { name: "May", total: 220000 }, { name: "Jun", total: 280000 },
];

const salesData = [
  { name: "Mon", sales: 45 }, { name: "Tue", sales: 52 },
  { name: "Wed", sales: 38 }, { name: "Thu", sales: 65 },
  { name: "Fri", sales: 85 }, { name: "Sat", sales: 110 },
  { name: "Sun", sales: 95 },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Rahul Sharma", date: "Today, 10:24 AM", amount: "₹4,999", status: "Pending" },
  { id: "#ORD-002", customer: "Vikram Singh", date: "Today, 09:12 AM", amount: "₹2,499", status: "Packed" },
  { id: "#ORD-003", customer: "Arjun Reddy", date: "Yesterday", amount: "₹8,998", status: "Delivered" },
  { id: "#ORD-004", customer: "Karan Patel", date: "Yesterday", amount: "₹4,999", status: "Rejected" },
];

const topProducts = [
  { name: "MBSG Home Kit 24/25", sales: 245, revenue: "₹6,12,255", image: "🟢" },
  { name: "Argentina Away Jersey 2024", sales: 189, revenue: "₹9,44,811", image: "🔵" },
  { name: "Real Madrid Third Kit", sales: 156, revenue: "₹7,79,844", image: "⚫" },
];

const lowStockProducts = [
  { name: "Manchester United Retro 1999", stock: 2, sku: "MU-RET-99" },
  { name: "Arsenal Home Socks", stock: 0, sku: "ARS-SOK-H" },
  { name: "Brazil Training Top", stock: 5, sku: "BRA-TRN-01" },
];

const recentCustomers = [
  { name: "Priya Desai", email: "priya.d@example.com", spent: "₹12,499", initials: "PD" },
  { name: "Aditya Verma", email: "aditya.v@example.com", spent: "₹4,999", initials: "AV" },
  { name: "Sneha Rao", email: "sneha.r@example.com", spent: "₹8,500", initials: "SR" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Here is what is happening with HEADERR today.</p>
      </div>

      {/* --- TOP ROW: METRIC CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <h3 className="text-3xl font-bold text-white mt-1">₹12,84,300</h3>
            </div>
            <div className="p-3 bg-[#FFD400]/10 rounded-lg">
              <IndianRupee className="w-5 h-5 text-[#FFD400]" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-[#FFD400] mr-1" />
            <span className="text-[#FFD400] font-medium">+14.5%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Orders</p>
              <h3 className="text-3xl font-bold text-white mt-1">842</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-[#FFD400] mr-1" />
            <span className="text-[#FFD400] font-medium">+8.2%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Customers</p>
              <h3 className="text-3xl font-bold text-white mt-1">3,291</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-[#FFD400] mr-1" />
            <span className="text-[#FFD400] font-medium">+22.4%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        {/* Conversion Card */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-400">Conversion Rate</p>
              <h3 className="text-3xl font-bold text-white mt-1">3.4%</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingDown className="w-4 h-4 text-[#FF2E2E] mr-1" />
            <span className="text-[#FF2E2E] font-medium">-1.2%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* --- MIDDLE ROW: GRAPHS --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Revenue Graph */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Revenue Overview</h2>
            <select className="bg-black border border-white/10 text-sm text-gray-400 rounded-md px-3 py-1 outline-none focus:border-[#FFD400]">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD400" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFD400" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#080808', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#FFD400' }}
                />
                <Area type="monotone" dataKey="total" stroke="#FFD400" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Graph */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Sales This Week</h2>
            <select className="bg-black border border-white/10 text-sm text-gray-400 rounded-md px-3 py-1 outline-none focus:border-[#FFD400]">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#080808', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="sales" fill="#FFFFFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* --- BOTTOM ROW: TABLES & LISTS --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent Orders Table (Takes up 2 columns on XL) */}
        <div className="xl:col-span-2 bg-[#111111] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <button className="text-sm text-[#FFD400] hover:text-white transition-colors flex items-center">
              View All <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-black/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                    <td className="px-6 py-4 text-gray-300">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-400">{order.date}</td>
                    <td className="px-6 py-4 text-white font-medium">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                        ${order.status === 'Delivered' ? 'bg-[#FFD400]/10 text-[#FFD400] border-[#FFD400]/20' : 
                          order.status === 'Rejected' ? 'bg-[#FF2E2E]/10 text-[#FF2E2E] border-[#FF2E2E]/20' : 
                          'bg-white/10 text-white border-white/20'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Stack */}
        <div className="space-y-6">
          
          {/* Low Stock Alert */}
          <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-[#FF2E2E] mr-2" />
                <h2 className="text-lg font-bold text-white">Low Stock</h2>
              </div>
              <span className="text-xs font-medium bg-[#FF2E2E]/10 text-[#FF2E2E] px-2 py-1 rounded-md">Action Required</span>
            </div>
            <div className="space-y-4">
              {lowStockProducts.map((product, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-white line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                  </div>
                  <span className="text-sm font-bold text-[#FF2E2E] bg-[#FF2E2E]/10 px-2.5 py-1 rounded">
                    {product.stock} Left
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-[#111111] border border-white/10 rounded-xl p-6 flex-1">
            <h2 className="text-lg font-bold text-white mb-4">Top Selling Products</h2>
            <div className="space-y-5">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-black border border-white/10 flex items-center justify-center text-xl">
                      {product.image}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#FFD400]">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* --- VERY BOTTOM: RECENT CUSTOMERS --- */}
      <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-6">Recent Customers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentCustomers.map((customer, idx) => (
            <div key={idx} className="flex items-center p-4 rounded-lg bg-black/50 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-[#FFD400] mr-4">
                {customer.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{customer.name}</p>
                <p className="text-xs text-gray-500">{customer.email}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-500">Spent</p>
                <p className="text-sm font-medium text-white">{customer.spent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}