"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, ArrowUpRight } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";
import { getProductImageUrl } from "@/lib/image-utils";

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
          src={getProductImageUrl(product.image)} 
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          quality={90}
          className={`object-contain p-4 sm:p-6 lg:p-10 transition-all duration-700 ease-out ${isHovered ? 'scale-110 rotate-2' : 'scale-100 rotate-0'}`}
        />
        
        {/* Floating Category Tag */}
        <div className="absolute top-3 lg:top-6 left-3 lg:left-6 z-10">
          <span className="px-2 lg:px-4 py-1 lg:py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-gray-100 text-[7px] lg:text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">
            {product.category.name}
          </span>
        </div>

        {/* Hover Actions Overlay */}
        <div className={`absolute inset-0 bg-black/5 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-2 lg:gap-3 z-20 lg:opacity-0 ${isHovered ? 'lg:opacity-100' : ''}`}>
          <button className="w-8 h-8 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-[var(--primary-purple)] hover:text-white transition-all shadow-xl active:scale-90">
            <Heart className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
          </button>
          <Link href={`/shop/${product.slug}`} className="w-8 h-8 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-[var(--primary-purple)] hover:text-white transition-all shadow-xl active:scale-90">
            <ArrowUpRight className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-8 flex flex-col flex-1">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-3 lg:mb-4 gap-1 lg:gap-4">
          <Link href={`/shop/${product.slug}`} className="flex-1 min-w-0">
            <h3 className="text-sm lg:text-xl font-black text-gray-900 leading-tight tracking-tight hover:text-[var(--primary-purple)] transition-colors line-clamp-1 lg:line-clamp-2 uppercase">
              {product.name}
            </h3>
          </Link>
          <div className="text-left lg:text-right">
            <p className="hidden lg:block text-[8px] lg:text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Price</p>
            <p className="text-sm lg:text-xl font-black text-[var(--primary-purple)] tracking-tighter whitespace-nowrap">
              ₦{product.price.toLocaleString()}
            </p>
            {/* Loyalty Points Badge */}
            <div className="flex items-center gap-1 mt-1 justify-start lg:justify-end">
              <div className="w-3 h-3 bg-purple-50 text-[var(--primary-purple)] rounded-full flex items-center justify-center text-[6px] font-black">★</div>
              <span className="text-[7px] font-black uppercase tracking-widest text-gray-400">+{Math.floor(product.price / 100)} Points</span>
            </div>
          </div>
        </div>
        
        <p className="hidden lg:block text-gray-600 text-xs lg:text-sm font-medium mb-6 lg:mb-8 line-clamp-2 leading-relaxed">
          Sourced from our ethical partner farms, guaranteed fresh and delivered within 24 hours.
        </p>

        {/* Bottom Bar */}
        <div className="mt-auto pt-3 lg:pt-6 border-t border-gray-50 flex items-center justify-between gap-2">
           <div className="hidden sm:flex items-center gap-2">
             <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-[var(--accent-green)] animate-pulse"></div>
             <span className="text-[7px] lg:text-[9px] font-black uppercase tracking-widest text-[var(--accent-green)]">Stock</span>
           </div>
           <div className="flex-1 lg:flex-none">
             <AddToCartButton item={product} />
           </div>
        </div>
      </div>
    </div>
  );
}
