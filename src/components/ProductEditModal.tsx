"use client";

import { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { updateProduct } from "@/app/actions/product";
import toast from "react-hot-toast";

interface ProductEditModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductEditModal({ product, isOpen, onClose }: ProductEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: 0,
    stock: 0,
    description: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock || 0,
        description: product.description || "",
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    const result = await updateProduct(data);

    if (result.success) {
      toast.success("Product updated successfully");
      onClose();
    } else {
      toast.error(result.error || "Failed to update product");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 text-gray-900/50">
          <h3 className="text-xl font-bold text-gray-900">Edit Product</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Price (₦)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Stock Level</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl border border-gray-100 font-bold text-gray-800 hover:bg-gray-50 text-gray-900 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 rounded-2xl bg-[var(--primary-purple)] text-white font-bold hover:shadow-lg hover:shadow-purple-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
