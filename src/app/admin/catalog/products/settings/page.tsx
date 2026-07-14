"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Trash2 } from "lucide-react";

export default function CatalogSettingsPage() {
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [collections, setCollections] = useState<{id: string, name: string}[]>([]);
  const [newCat, setNewCat] = useState("");
  const [newCol, setNewCol] = useState("");

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const { data: catData } = await supabase.from("categories").select("*");
    const { data: colData } = await supabase.from("collections").select("*");
    setCategories(catData || []);
    setCollections(colData || []);
  };

  const addCategory = async () => {
    await supabase.from("categories").insert({ name: newCat, slug: newCat.toLowerCase().replace(/ /g, '-') });
    setNewCat("");
    loadData();
  };

  return (
    <div className="p-8 space-y-8 text-white">
      <h1 className="text-2xl font-bold">Catalog Settings</h1>
      
      <div className="grid grid-cols-2 gap-8">
        {/* CATEGORIES SECTION */}
        <div className="bg-[#111111] p-6 rounded-xl border border-white/10">
          <h2 className="font-bold mb-4">Categories</h2>
          <div className="flex gap-2 mb-4">
            <input className="bg-black border p-2 rounded w-full" value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="New Category" />
            <button onClick={addCategory} className="bg-[#FFD400] text-black px-4 py-2 rounded font-bold">+</button>
          </div>
          <ul className="space-y-2">
            {categories.map(c => <li key={c.id} className="flex justify-between bg-white/5 p-2 rounded">{c.name}</li>)}
          </ul>
        </div>

        {/* COLLECTIONS SECTION */}
        <div className="bg-[#111111] p-6 rounded-xl border border-white/10">
          <h2 className="font-bold mb-4">Collections</h2>
          {/* Similar input logic here */}
        </div>
      </div>
    </div>
  );
}