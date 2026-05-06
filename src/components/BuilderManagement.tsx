"use client";

import { useState } from "react";
import { Edit2, ExternalLink, Package, Save, X, Plus, Trash2, PlusCircle } from "lucide-react";
import { updateBuilder, createBuilder } from "@/app/actions/builder";
import toast from "react-hot-toast";
import Link from "next/link";

export default function BuilderManagement({ builders }: { builders: any[] }) {
  const [selectedBuilder, setSelectedBuilder] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = (builder: any) => {
    const categories = JSON.parse(builder.categories);
    setSelectedBuilder({ ...builder, categories });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setSelectedBuilder({
      type: "",
      title: "",
      description: "",
      basePrice: 0,
      image: "",
      categories: []
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!selectedBuilder) return;
    setLoading(true);
    
    let result;
    if (isCreating) {
      result = await createBuilder(selectedBuilder);
    } else {
      result = await updateBuilder(selectedBuilder.id, selectedBuilder);
    }
    
    if (result.success) {
      toast.success(isCreating ? "Builder created successfully" : "Builder updated successfully");
      setSelectedBuilder(null);
      setIsCreating(false);
    } else {
      toast.error(result.error || "Failed to save builder");
    }
    setLoading(false);
  };

  const updateCategory = (index: number, field: string, value: any) => {
    const newCategories = [...selectedBuilder.categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    setSelectedBuilder({ ...selectedBuilder, categories: newCategories });
  };

  const addCategory = () => {
    const newCategories = [...selectedBuilder.categories, { id: Date.now().toString(), name: "New Category", minItems: 1, maxItems: 1, items: [] }];
    setSelectedBuilder({ ...selectedBuilder, categories: newCategories });
  };

  const removeCategory = (index: number) => {
    const newCategories = selectedBuilder.categories.filter((_: any, i: number) => i !== index);
    setSelectedBuilder({ ...selectedBuilder, categories: newCategories });
  };

  const addItem = (catIndex: number) => {
    const newCategories = [...selectedBuilder.categories];
    newCategories[catIndex].items.push({ id: Date.now().toString(), name: "New Item", image: "" });
    setSelectedBuilder({ ...selectedBuilder, categories: newCategories });
  };

  const updateItem = (catIndex: number, itemIndex: number, field: string, value: any) => {
    const newCategories = [...selectedBuilder.categories];
    newCategories[catIndex].items[itemIndex] = { ...newCategories[catIndex].items[itemIndex], [field]: value };
    setSelectedBuilder({ ...selectedBuilder, categories: newCategories });
  };

  const removeItem = (catIndex: number, itemIndex: number) => {
    const newCategories = [...selectedBuilder.categories];
    newCategories[catIndex].items = newCategories[catIndex].items.filter((_: any, i: number) => i !== itemIndex);
    setSelectedBuilder({ ...selectedBuilder, categories: newCategories });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <button 
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[var(--primary-purple)] transition-all shadow-lg"
        >
          <PlusCircle className="w-5 h-5" /> Create New Builder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {builders.map((builder) => (
          <div key={builder.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-[var(--primary-purple)]">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">{builder.title}</h3>
                  <p className="text-sm text-gray-600 font-medium">Type: {builder.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link 
                  href={`/shop/builders/${builder.type}`} 
                  target="_blank"
                  className="p-3 bg-gray-50 text-gray-900 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => handleEdit(builder)}
                  className="p-3 bg-[var(--primary-purple)] text-white rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-6">{builder.description}</p>
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <span className="text-lg font-black text-gray-900">₦{builder.basePrice.toLocaleString()}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Base Price</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {selectedBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50 text-gray-900/50 shrink-0">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                {isCreating ? "Create New" : `Edit ${selectedBuilder.title}`} Builder
              </h2>
              <button onClick={() => setSelectedBuilder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  {isCreating && (
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">System Type (slug)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. stir-fry"
                        value={selectedBuilder.type}
                        onChange={(e) => setSelectedBuilder({ ...selectedBuilder, type: e.target.value })}
                        className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl font-bold focus:bg-white transition-all outline-none"
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Display Title</label>
                    <input 
                      type="text" 
                      value={selectedBuilder.title}
                      onChange={(e) => setSelectedBuilder({ ...selectedBuilder, title: e.target.value })}
                      className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl font-bold focus:bg-white transition-all outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Base Price (₦)</label>
                      <input 
                        type="number" 
                        value={selectedBuilder.basePrice}
                        onChange={(e) => setSelectedBuilder({ ...selectedBuilder, basePrice: parseFloat(e.target.value) })}
                        className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl font-bold focus:bg-white transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Hero Image URL</label>
                      <input 
                        type="text" 
                        value={selectedBuilder.image}
                        onChange={(e) => setSelectedBuilder({ ...selectedBuilder, image: e.target.value })}
                        className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl font-bold focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Description Narrative</label>
                  <textarea 
                    rows={5}
                    value={selectedBuilder.description}
                    onChange={(e) => setSelectedBuilder({ ...selectedBuilder, description: e.target.value })}
                    className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl font-medium text-sm focus:bg-white transition-all outline-none resize-none"
                  />
                </div>
              </div>

              <div className="space-y-12">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Builder Configuration</h3>
                  <button 
                    onClick={addCategory}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Category
                  </button>
                </div>

                {selectedBuilder.categories.map((cat: any, catIdx: number) => (
                  <div key={cat.id} className="bg-gray-50 text-gray-900 p-8 rounded-[32px] border border-gray-100 relative group/cat">
                    <button 
                      onClick={() => removeCategory(catIdx)}
                      className="absolute top-6 right-6 p-2 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover/cat:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Category Name</label>
                        <input 
                          type="text" 
                          value={cat.name}
                          onChange={(e) => updateCategory(catIdx, "name", e.target.value)}
                          className="w-full p-3 bg-white border border-gray-100 rounded-xl font-bold outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Min Selections</label>
                        <input 
                          type="number" 
                          value={cat.minItems}
                          onChange={(e) => updateCategory(catIdx, "minItems", parseInt(e.target.value))}
                          className="w-full p-3 bg-white border border-gray-100 rounded-xl font-bold outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Max Selections</label>
                        <input 
                          type="number" 
                          value={cat.maxItems}
                          onChange={(e) => updateCategory(catIdx, "maxItems", parseInt(e.target.value))}
                          className="w-full p-3 bg-white border border-gray-100 rounded-xl font-bold outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Available Items</span>
                        <button 
                          onClick={() => addItem(catIdx)}
                          className="text-[10px] font-black text-[var(--primary-purple)] hover:underline"
                        >
                          + Add New Item
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cat.items.map((item: any, itemIdx: number) => (
                          <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 group/item shadow-sm">
                            <div className="flex-1 space-y-3">
                              <input 
                                type="text" 
                                value={item.name}
                                onChange={(e) => updateItem(catIdx, itemIdx, "name", e.target.value)}
                                placeholder="Item name..."
                                className="w-full text-xs font-bold border-b border-gray-100 focus:border-purple-200 outline-none pb-1"
                              />
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  value={item.image}
                                  onChange={(e) => updateItem(catIdx, itemIdx, "image", e.target.value)}
                                  placeholder="image.png"
                                  className="flex-1 text-[10px] font-medium text-gray-600 outline-none"
                                />
                                <input 
                                  type="number" 
                                  value={item.price || 0}
                                  onChange={(e) => updateItem(catIdx, itemIdx, "price", parseFloat(e.target.value))}
                                  placeholder="0"
                                  className="w-16 text-[10px] font-black text-purple-600 outline-none text-right"
                                />
                              </div>
                            </div>
                            <button 
                              onClick={() => removeItem(catIdx, itemIdx)}
                              className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4 shrink-0">
              <button 
                onClick={() => setSelectedBuilder(null)}
                className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
              >
                Cancel Changes
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-purple-600 hover:shadow-xl hover:shadow-purple-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {loading ? "Saving Configuration..." : "Synchronize Builder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
