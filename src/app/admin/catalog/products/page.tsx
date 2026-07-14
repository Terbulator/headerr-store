"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Plus, Search, Filter, MoreHorizontal, Edit, Trash2, 
  Image as ImageIcon, ArrowLeft, Check, X, AlertCircle, RefreshCw 
} from "lucide-react";
// 1. IMPORT SUPABASE (Adjust the path if your utils folder is somewhere else)
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
  image_url: string; // Changed to match Supabase schema
  status: "Active" | "Draft" | "Out of Stock";
};

export default function ProductsPage() {
    // --- ADD THESE STATES ---
const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
const [collections, setCollections] = useState<{id: string, name: string}[]>([]);

// --- UPDATE YOUR FETCH LOGIC ---
useEffect(() => {
  const loadInitialData = async () => {
    // 1. Fetch Products
    const { data: prodData } = await supabase.from("products").select("*");
    setProducts(prodData || []);
    
    // 2. Fetch Dropdown Data & DEBUG
    const { data: catData, error: catError } = await supabase.from("categories").select("*");
    const { data: colData, error: colError } = await supabase.from("collections").select("*");
    
    console.log("Categories from DB:", catData);
    console.log("Collections from DB:", colData);
    
    if (catError) console.error("Cat Error:", catError);
    if (colError) console.error("Col Error:", colError);
    
    setCategories(catData || []);
    setCollections(colData || []);
  };
  loadInitialData();
}, []);
  // 2. STATE MANAGEMENT
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"list" | "form">("list");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  // 3. FETCH DATA FROM SUPABASE
  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  // Trigger the fetch when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // --- HANDLERS (We will wire these up to the database next) ---
  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ status: "Draft", sizes: [], inventory: 0 });
    setView("form");
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setView("form");
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      // 1. Delete from Supabase
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting product:", error.message);
        alert("Failed to delete product: " + error.message);
      } else {
        // 2. Remove from local UI instantly
        setProducts(products.filter(p => p.id !== id));
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // UPDATE EXISTING PRODUCT
        const { error } = await supabase
          .from("products")
          .update({
            name: formData.name,
            description: formData.description,
            mrp: formData.mrp,
            price: formData.price,
            sku: formData.sku,
            inventory: formData.inventory,
            sizes: formData.sizes,
            category: formData.category,
            collection: formData.collection,
            image_url: formData.image_url,
            status: formData.status
          })
          .eq("id", editingId);

        if (error) throw error;
      } else {
        // CREATE NEW PRODUCT
        const { error } = await supabase
          .from("products")
          .insert([{
            name: formData.name,
            description: formData.description,
            mrp: formData.mrp,
            price: formData.price,
            sku: formData.sku,
            inventory: formData.inventory,
            sizes: formData.sizes,
            category: formData.category,
            collection: formData.collection,
            image_url: formData.image_url,
            status: formData.status || "Draft"
          }]);

        if (error) throw error;
      }

      // Refresh the table with the newest live data and return to list view
      await fetchProducts();
      setView("list");
      
    } catch (error: any) {
      console.error("Error saving product:", error.message);
      alert("Failed to save product: " + error.message);
    }
  };

  // --- FILTERING ---
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // ... KEEP YOUR EXISTING RENDER CODE BELOW THIS LINE ...
  // --- RENDER: FORM VIEW ---
  if (view === "form") {
    return (
      <div className="space-y-6 pb-10 max-w-5xl">
        
        {/* Form Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setView("list")}
              className="p-2 bg-[#111111] border border-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">{editingId ? "Edit Product" : "Add New Product"}</h1>
              <p className="text-sm text-gray-500">Fill in the details for your catalog.</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setView("list")}
              className="px-4 py-2 bg-transparent border border-white/10 text-white rounded-md hover:bg-white/5 transition-colors text-sm font-medium"
            >
              Discard
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-[#FFD400] text-black rounded-md hover:bg-white transition-colors text-sm font-bold flex items-center"
            >
              <Check className="w-4 h-4 mr-2" /> Save Product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column (Left) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Info */}
            <div className="bg-[#111111] border border-white/10 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Basic Information</h2>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Product Name</label>
                <input 
                  type="text" 
                  value={formData.name || ""}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Real Madrid Away Kit 24/25"
                  className="w-full bg-[#080808] border border-white/10 rounded-md py-2.5 px-4 text-white focus:outline-none focus:border-[#FFD400] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Description</label>
                <textarea 
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Premium player-issue fit..."
                  className="w-full bg-[#080808] border border-white/10 rounded-md py-2.5 px-4 text-white focus:outline-none focus:border-[#FFD400] transition-colors resize-none"
                />
              </div>
            </div>

            {/* Media/Images */}
            {/* MEDIA SECTION - FUNCTIONAL UPLOADER */}
<div className="bg-[#111111] border border-white/10 rounded-xl p-6">
  <h2 className="text-lg font-bold text-white mb-4">Media</h2>
  
  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#FFD400]/50 transition-colors">
    <ImageIcon className="w-10 h-10 text-gray-500 mx-auto mb-3" />
    <label className="cursor-pointer">
      <span className="text-sm text-white font-medium hover:text-[#FFD400]">Click to upload</span>
      <input 
        type="file" 
        className="hidden"
        accept="image/*" 
 onChange={async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  
  // 1. Manually build the upload URL
  const uploadUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/product-images/${fileName}`;

  try {
    // 2. Perform a raw HTTP POST (No SDK baggage)
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }

    // 3. Construct the public URL manually
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;
    
    setFormData({...formData, image_url: publicUrl});
    alert("Image uploaded successfully!");

  } catch (err: any) {
    console.error("Upload error:", err);
    alert("Upload failed: " + err.message);
  }
}} />
    </label>
    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
  </div>
  
  {/* Preview Area */}
  {formData.image_url && (
    <div className="mt-4 p-2 bg-black border border-white/10 rounded-md">
      <img src={formData.image_url} alt="Preview" className="h-32 w-full object-contain rounded" />
      <button 
        type="button"
        onClick={() => setFormData({...formData, image_url: ""})}
        className="mt-2 w-full text-xs text-[#FF2E2E] hover:underline"
      >
        Remove Image
      </button>
    </div>
  )}
</div>

            {/* Pricing */}
            <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Pricing</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">MRP (₹)</label>
                  <input 
                    type="number" 
                    value={formData.mrp || ""}
                    onChange={(e) => setFormData({...formData, mrp: Number(e.target.value)})}
                    className="w-full bg-[#080808] border border-white/10 rounded-md py-2.5 px-4 text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Selling Price (₹)</label>
                  <input 
                    type="number" 
                    value={formData.price || ""}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full bg-[#080808] border border-white/10 rounded-md py-2.5 px-4 text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column (Right) */}
          <div className="space-y-6">
            
            {/* Status */}
            <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Status</h2>
              <select 
                value={formData.status || "Draft"}
                onChange={(e) => setFormData({...formData, status: e.target.value as Product["status"]})}
                className="w-full bg-[#080808] border border-white/10 rounded-md py-2.5 px-4 text-white focus:outline-none focus:border-[#FFD400]"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            {/* Inventory & SKU */}
            <div className="bg-[#111111] border border-white/10 rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Inventory</h2>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">SKU (Stock Keeping Unit)</label>
                <input 
                  type="text" 
                  value={formData.sku || ""}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  className="w-full bg-[#080808] border border-white/10 rounded-md py-2.5 px-4 text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Available Quantity</label>
                <input 
                  type="number" 
                  value={formData.inventory || 0}
                  onChange={(e) => setFormData({...formData, inventory: Number(e.target.value)})}
                  className="w-full bg-[#080808] border border-white/10 rounded-md py-2.5 px-4 text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>
            </div>

            {/* --- CATEGORY SELECTOR --- */}
<div className="space-y-2">
  <label className="text-sm text-gray-400">Category</label>
  <select 
    className="w-full bg-[#080808] border border-white/10 p-3 text-white rounded focus:border-[#FFD400] outline-none"
    value={formData.category || ""}
    onChange={e => setFormData({...formData, category: e.target.value})}
  >
    <option value="">Select a Category</option>
    {categories.map((c) => (
      <option key={c.id} value={c.name}>{c.name}</option>
    ))}
  </select>
</div>

{/* --- COLLECTION SELECTOR --- */}
<div className="space-y-2">
  <label className="text-sm text-gray-400">Collection</label>
  <select 
    className="w-full bg-[#080808] border border-white/10 p-3 text-white rounded focus:border-[#FFD400] outline-none"
    value={formData.collection || ""}
    onChange={e => setFormData({...formData, collection: e.target.value})}
  >
    <option value="">Select a Collection</option>
    {collections.map((c) => (
      <option key={c.id} value={c.name}>{c.name}</option>
    ))}
  </select>
</div>

            {/* Variants */}
            <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Variants</h2>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Sizes (Comma separated)</label>
                <input 
                  type="text" 
                  value={formData.sizes?.join(", ") || ""}
                  onChange={(e) => setFormData({...formData, sizes: e.target.value.split(",").map(s => s.trim()).filter(s => s)})}
                  placeholder="S, M, L, XL"
                  className="w-full bg-[#080808] border border-white/10 rounded-md py-2.5 px-4 text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: LIST VIEW ---
  return (
    <div className="space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your inventory, pricing, and catalog.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-[#FFD400] text-black px-4 py-2.5 rounded-md text-sm font-bold transition-colors flex items-center hover:bg-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search products by name or SKU..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111111] border border-white/10 rounded-md py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD400]"
          />
        </div>
        <button className="bg-[#111111] border border-white/10 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center hover:bg-white/5">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-black/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Inventory</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-black border border-white/10 rounded-md overflow-hidden flex-shrink-0">
                        {product.image_url? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-500 m-auto mt-3" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{product.sizes.length} variants</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{product.sku}</td>
                  <td className="px-6 py-4 text-gray-400">{product.category}</td>
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">₹{product.price.toLocaleString("en-IN")}</p>
                    {product.mrp > product.price && (
                      <p className="text-xs text-gray-500 line-through">₹{product.mrp.toLocaleString("en-IN")}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.inventory === 0 ? (
                      <span className="text-[#FF2E2E] flex items-center text-xs font-medium">
                        <AlertCircle className="w-3 h-3 mr-1" /> Out of stock
                      </span>
                    ) : (
                      <span className="text-gray-300">{product.inventory} in stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                      ${product.status === 'Active' ? 'bg-[#FFD400]/10 text-[#FFD400] border-[#FFD400]/20' : 
                        product.status === 'Out of Stock' ? 'bg-[#FF2E2E]/10 text-[#FF2E2E] border-[#FF2E2E]/20' : 
                        'bg-white/10 text-gray-300 border-white/20'}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-gray-400 hover:text-[#FFD400] bg-black/50 rounded-md border border-white/5 transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-[#FF2E2E] bg-black/50 rounded-md border border-white/5 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No products found. Adjust your search or add a new product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}