"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { 
  Edit2, 
  Search, 
  Filter, 
  ChevronDown, 
  Package, 
  AlertCircle, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import ProductEditModal from "@/components/ProductEditModal";

export default function ProductInventoryTable({ products, categories }: { products: any[], categories: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || p.categoryId === selectedCategory;
        const matchesStock = stockFilter === "all" || 
          (stockFilter === "low" && p.stock > 0 && p.stock <= 10) ||
          (stockFilter === "out" && p.stock === 0) ||
          (stockFilter === "in" && p.stock > 10);
        return matchesSearch && matchesCategory && matchesStock;
      })
      .sort((a, b) => {
        const factor = sortOrder === "asc" ? 1 : -1;
        if (sortBy === "price" || sortBy === "stock") {
          return (a[sortBy] - b[sortBy]) * factor;
        }
        return a.name.localeCompare(b.name) * factor;
      });
  }, [products, searchQuery, selectedCategory, stockFilter, sortBy, sortOrder]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, stockFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search and Filters Glassmorphism Bar */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col xl:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800" />
          <input 
            type="text" 
            placeholder="Search products by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-50 text-gray-900 border-none rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-700 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          <div className="flex items-center gap-2 bg-gray-50 text-gray-900 p-2 rounded-2xl w-full sm:w-auto border border-gray-100">
            <Filter className="w-4 h-4 text-gray-600 ml-2" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-gray-800 outline-none cursor-pointer pr-8"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 text-gray-900 p-2 rounded-2xl w-full sm:w-auto border border-gray-100">
            <Package className="w-4 h-4 text-gray-600 ml-2" />
            <select 
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-gray-800 outline-none cursor-pointer pr-8"
            >
              <option value="all">Any Stock Status</option>
              <option value="in">In Stock (&gt;10)</option>
              <option value="low">Low Stock (1-10)</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-900/50 text-gray-600 uppercase font-black text-[10px] tracking-[0.2em] border-b border-gray-100">
                <th className="px-8 py-6 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => toggleSort("name")}>
                  <div className="flex items-center gap-2">
                    Product {sortBy === "name" && <ChevronDown className={`w-3 h-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />}
                  </div>
                </th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => toggleSort("price")}>
                  <div className="flex items-center gap-2">
                    Price {sortBy === "price" && <ChevronDown className={`w-3 h-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />}
                  </div>
                </th>
                <th className="px-8 py-6 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => toggleSort("stock")}>
                  <div className="flex items-center gap-2">
                    Inventory {sortBy === "stock" && <ChevronDown className={`w-3 h-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />}
                  </div>
                </th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-purple-50/30 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 relative bg-white rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                        <Image
                          src={product.image ? (product.image.startsWith('http') ? product.image : `/images/scraped/${product.image}`) : "/images/woocommerce-placeholder.webp"}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-gray-900 text-base tracking-tight">{product.name}</span>
                        <span className="text-[10px] text-gray-800 font-bold uppercase tracking-widest mt-0.5">SKU: {product.id.slice(-6).toUpperCase()}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-4 py-2 rounded-xl bg-gray-50 text-gray-900 text-gray-700 text-[10px] font-black uppercase tracking-widest border border-gray-100">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-[var(--primary-purple)] text-lg">
                        ₦{product.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-gray-800 font-bold">Standard Price</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between w-32">
                        <div className="flex items-center gap-2">
                          {product.stock > 10 ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : product.stock > 0 ? (
                            <AlertCircle className="w-4 h-4 text-orange-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`font-black text-sm ${product.stock > 10 ? 'text-gray-900' : product.stock > 0 ? 'text-orange-700' : 'text-red-700'}`}>
                            {product.stock} units
                          </span>
                        </div>
                      </div>
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 hover:text-[var(--primary-purple)] hover:border-[var(--primary-purple)] hover:shadow-lg hover:shadow-purple-100 transition-all group/btn"
                    >
                      <Edit2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-xs font-black uppercase tracking-widest">Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 max-w-xs mx-auto">
                      <div className="w-20 h-20 bg-gray-50 text-gray-900 rounded-[30px] flex items-center justify-center text-gray-600">
                        <Search className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">No products found</h3>
                      <p className="text-gray-600 font-medium">Try adjusting your filters or search query to find what you're looking for.</p>
                      <button 
                        onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setStockFilter("all"); }}
                        className="mt-2 px-6 py-3 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Pagination */}
        <div className="bg-gray-50 text-gray-900/50 px-8 py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xs font-black text-gray-600 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </p>
            <div className="hidden sm:flex items-center gap-2 ml-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-tight">Optimal</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-tight">Low</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-tight">Out</span>
              </div>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`p-2.5 rounded-xl border transition-all ${
                  currentPage === 1 
                  ? 'border-gray-100 text-gray-500 cursor-not-allowed' 
                  : 'border-gray-200 text-gray-700 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)] active:scale-90'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Only show current, first, last, and neighbors
                  if (
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                          currentPage === page
                          ? 'bg-[var(--primary-purple)] text-white shadow-lg shadow-purple-200'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)]'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 || 
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="text-gray-600 font-bold">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`p-2.5 rounded-xl border transition-all ${
                  currentPage === totalPages 
                  ? 'border-gray-100 text-gray-500 cursor-not-allowed' 
                  : 'border-gray-200 text-gray-700 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)] active:scale-90'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
