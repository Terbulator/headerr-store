"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit2, LayoutDashboard, Package, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    price: "", 
    desc: "", 
    image: "" 
  });

  // 1. Load from LocalStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem("headerr-products");
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load products");
      }
    }
  }, []);

  // 2. Save to LocalStorage whenever products change
  useEffect(() => {
    localStorage.setItem("headerr-products", JSON.stringify(products));
  }, [products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // UPDATE: Update existing product
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId, price: formData.price } : p));
      setEditingId(null);
    } else {
      // CREATE: Add new product
      setProducts([...products, { ...formData, id: Date.now(), price: formData.price }]);
    }
    
    // Clear form
    setFormData({ name: "", price: "", desc: "", image: "" });
  };

  const startEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({ name: product.name, price: product.price, desc: product.desc, image: product.image });
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-primary p-6 md:p-10 text-secondary">
      <h1 className="font-bebas text-5xl mb-10 tracking-wide text-white">COMMAND CENTER</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* ADD / EDIT FORM */}
        <div className="bg-surface p-8 rounded-xl border border-white/5 h-max">
          <h2 className="font-bebas text-2xl mb-6 text-white">{editingId ? "UPDATE PRODUCT" : "ADD NEW PRODUCT"}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input 
              required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
              placeholder="Product Name" className="w-full bg-primary p-3 rounded-md border border-white/10 text-white" 
            />
            <input 
              required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} 
              type="number" placeholder="Price (₹)" className="w-full bg-primary p-3 rounded-md border border-white/10 text-white" 
            />
            <textarea 
              required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} 
              placeholder="Description" className="w-full bg-primary p-3 rounded-md border border-white/10 text-white" 
            />
            
            {/* FILE UPLOADER */}
            <label className="text-xs text-text-secondary uppercase">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full bg-primary p-3 rounded-md border border-white/10 text-text-secondary text-sm"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, image: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            
            <button type="submit" className="w-full bg-accent text-primary font-bold py-3 rounded-md mt-4 hover:bg-white transition-colors">
              {editingId ? "SAVE CHANGES" : "LAUNCH PRODUCT"}
            </button>
            
            {editingId && (
              <button type="button" onClick={() => setEditingId(null)} className="w-full py-2 border border-white/10 rounded-md text-sm text-gray-400">
                CANCEL
              </button>
            )}
          </form>
        </div>

        {/* INVENTORY LIST */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bebas text-2xl text-white mb-4">LIVE INVENTORY ({products.length})</h2>
          {products.map((p) => (
            <div key={p.id} className="flex gap-4 bg-surface p-4 rounded-lg border border-white/5 items-center">
              {p.image && <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />}
              <div className="flex-1">
                <h4 className="font-bold text-white">{p.name}</h4>
                <p className="text-sm text-gray-400 truncate">{p.desc}</p>
                <p className="text-accent text-sm font-bold">₹{p.price}</p>
              </div>
              <button onClick={() => startEdit(p)} className="text-blue-400 hover:text-blue-300 p-2"><Edit2 size={18} /></button>
              <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}