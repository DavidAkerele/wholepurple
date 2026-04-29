"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, ArrowUpRight } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
  category: {
    name: string;
    slug: string;
  };
}

export default function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-[40px] border border-gray-100/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-[#FDFCFB] overflow-hidden">
        <Image 
          src={product.image?.startsWith('http') ? product.image : `/images/scraped/${product.image || 'woocommerce-placeholder.webp'}`} 
          alt={product.name}
          fill
          className={`object-contain p-10 transition-all duration-700 ease-out ${isHovered ? 'scale-110 rotate-2' : 'scale-100 rotate-0'}`}
        />
        
        {/* Floating Category Tag */}
        <div className="absolute top-6 left-6 z-10">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-gray-100 text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">
            {product.category.name}
          </span>
        </div>

        {/* Hover Actions Overlay */}
        <div className={`absolute inset-0 bg-black/5 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-3 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-[var(--primary-purple)] hover:text-white transition-all shadow-xl">
            <Heart className="w-5 h-5" />
          </button>
          <Link href={`/shop/${product.slug}`} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-[var(--primary-purple)] hover:text-white transition-all shadow-xl">
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <Link href={`/shop/${product.slug}`} className="flex-1">
            <h3 className="text-xl font-black text-gray-900 leading-tight tracking-tight hover:text-[var(--primary-purple)] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Price</p>
            <p className="text-xl font-black text-[var(--primary-purple)] tracking-tighter">
              ₦{product.price.toLocaleString()}
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm font-medium mb-8 line-clamp-2 leading-relaxed">
          Sourced from our ethical partner farms, guaranteed fresh and delivered within 24 hours.
        </p>

        {/* Bottom Bar */}
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse"></div>
             <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent-green)]">In Stock</span>
           </div>
           <AddToCartButton item={product} />
        </div>
      </div>
    </div>
  );
}
