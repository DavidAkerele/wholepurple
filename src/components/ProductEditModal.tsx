import { useState, useEffect } from "react";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { updateProduct } from "@/app/actions/product";
import toast from "react-hot-toast";

interface ProductEditModalProps {
  product: any;
  categories: any[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductEditModal({ product, categories, isOpen, onClose }: ProductEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    slug: "",
    categoryId: "",
    price: 0,
    stock: 0,
    description: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        slug: product.slug,
        categoryId: product.categoryId,
        price: product.price,
        stock: product.stock || 0,
        description: product.description || "",
      });

      // Parse images if it's JSON, otherwise treat as single image
      try {
        const parsed = JSON.parse(product.image);
        if (Array.isArray(parsed)) {
          setImages(parsed);
        } else {
          setImages(product.image ? [product.image] : []);
        }
      } catch {
        setImages(product.image ? [product.image] : []);
      }
    }
  }, [product]);

  if (!isOpen) return null;

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });
    data.append("images", JSON.stringify(images));

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
      <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 text-gray-900/50 shrink-0">
          <h3 className="text-xl font-black text-gray-900">Edit Product Profile</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side: Basic Info */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Product Identity</label>
                <input
                  type="text"
                  required
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">URL Slug</label>
                <input
                  type="text"
                  required
                  placeholder="product-url-slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Category Classification</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pricing (₦)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Inventory</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                    className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Media & Description */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Visual Assets (URLs)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add Image URL..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  <button 
                    type="button"
                    onClick={handleAddImage}
                    className="p-4 bg-gray-900 text-white rounded-2xl hover:bg-purple-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-2 max-h-[120px] overflow-y-auto p-1">
                  {images.map((url, index) => (
                    <div key={index} className="group relative w-16 h-16 rounded-xl border border-gray-100 overflow-hidden bg-gray-50">
                      <img src={url.startsWith('http') ? url : `/images/scraped/${url}`} alt="" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Product Narrative</label>
                <textarea
                  rows={6}
                  placeholder="Enter detailed description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-12 pt-8 border-t border-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl border border-gray-200 font-black text-xs uppercase tracking-[0.2em] text-gray-600 hover:bg-gray-50 text-gray-900 transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-4 rounded-2xl bg-gray-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-[var(--primary-purple)] hover:shadow-xl hover:shadow-purple-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? "Synchronizing..." : (
                <>
                  <Save className="w-5 h-5" />
                  Apply Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
