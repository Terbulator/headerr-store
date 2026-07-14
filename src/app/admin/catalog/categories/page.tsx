"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Trash2 } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [newCat, setNewCat] = useState("");

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  };

  const addCategory = async () => {
    if (!newCat) return;
    await supabase.from("categories").insert({ name: newCat });
    setNewCat("");
    loadCategories();
  };

  const deleteCategory = async (id: string) => {
    await supabase.from("categories").delete().eq("id", id);
    loadCategories();
  };

  return (
    <div className="p-8 space-y-8 text-white max-w-2xl">
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      
      <div className="bg-[#111111] p-6 rounded-xl border border-white/10">
        <div className="flex gap-2 mb-6">
          <input 
            className="bg-black border border-white/10 p-3 rounded w-full text-white" 
            value={newCat} 
            onChange={e => setNewCat(e.target.value)} 
            placeholder="Enter category name (e.g. Jerseys)" 
          />
          <button onClick={addCategory} className="bg-[#FFD400] text-black px-6 py-2 rounded font-bold">Add</button>
        </div>

        <ul className="space-y-2">
          {categories.map(c => (
            <li key={c.id} className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded border border-white/5">
              {c.name}
              <button onClick={() => deleteCategory(c.id)} className="text-red-500 hover:text-red-400">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}