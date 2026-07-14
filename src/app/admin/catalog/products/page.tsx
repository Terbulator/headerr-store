"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Plus, Search, Filter, Edit, Trash2, 
  Image as ImageIcon, ArrowLeft, Check, AlertCircle 
} from "lucide-react";
import { supabase } from "@/utils/supabase"; 

// --- TYPES ---
type Product = {
  id: string;
  name: string;
  description: string;
  mrp: number;
  price: number;
  sku: string;
  inventory: number;
  sizes: string[];
  category: string;
  collection: string;
  image_url: string;
  status: "Active" | "Draft" | "Out of Stock";
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<"list" | "form">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  // --- FETCH DATA ---
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching:", error.message);
    else setProducts(data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- HANDLERS ---
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await supabase.from("products").delete().eq("id", id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from("products").update(formData).eq("id", editingId);
    } else {
      await supabase.from("products").insert([formData]);
    }
    await fetchProducts();
    setView("list");
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // --- UI RENDER (FORM) ---
  if (view === "form") {
    return (
      <div className="space-y-6 pb-10 max-w-5xl">
        <div className="flex justify-between items-center">
          <button onClick={() => setView("list")} className="flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2" /> Back
          </button>
          <button onClick={handleSave} className="bg-[#FFD400] text-black px-6 py-2 rounded font-bold">Save Product</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4 bg-[#111111] p-6 rounded-xl border border-white/10">
            <input 
              className="w-full bg-[#080808] border border-white/10 p-3 text-white rounded"
              placeholder="Product Name"
              value={formData.name || ""}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              className="w-full bg-[#080808] border border-white/10 p-3 text-white rounded"
              placeholder="Image URL"
              value={formData.image_url || ""}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
            />
            <input 
              type="number"
              className="w-full bg-[#080808] border border-white/10 p-3 text-white rounded"
              placeholder="Price"
              value={formData.price || ""}
              onChange={e => setFormData({...formData, price: Number(e.target.value)})}
            />
          </div>
        </div>
      </div>
    );
  }

  // --- UI RENDER (LIST) ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <button onClick={() => { setEditingId(null); setFormData({}); setView("form"); }} className="bg-[#FFD400] text-black px-4 py-2 rounded font-bold">+ Add Product</button>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-gray-500 uppercase text-xs border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 text-white">{p.name}</td>
                <td className="px-6 py-4 text-white">₹{p.price}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(p.id)} className="text-[#FF2E2E]"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}