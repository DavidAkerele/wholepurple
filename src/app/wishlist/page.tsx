"use client";
import { useWishlistStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Trash2, HeartCrack } from "lucide-react";
import { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const wishlist = useWishlistStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[50vh] flex items-center justify-center">Loading wishlist...</div>;

  const { items, toggleItem } = wishlist;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 pt-20 bg-[#FAF7F2]">
        <div className="w-32 h-32 bg-purple-50 rounded-full flex items-center justify-center text-[var(--primary-purple)]">
          <HeartCrack className="w-16 h-16" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Your wishlist is empty</h2>
        <p className="text-gray-800">You haven't saved any items yet.</p>
        <Link href="/shop" className="btn-primary mt-4">Explore Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Your Saved Items</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-300">
              <div className="relative aspect-square bg-[#F9F9F9] flex items-center justify-center p-6">
                <Image 
                  src={item.image ? (item.image.startsWith('http') ? item.image : `/images/scraped/${item.image}`) : '/images/scraped/woocommerce-placeholder.webp'} 
                  alt={item.name} 
                  fill 
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
                />
                <button 
                  onClick={() => toggleItem(item)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors z-10"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <Link href={`/shop/${item.id}`} className="text-lg font-bold text-gray-900 hover:text-[var(--primary-purple)] mb-2 line-clamp-1">
                  {item.name}
                </Link>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-[var(--primary-purple)] font-bold text-xl">
                    ₦{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <AddToCartButton item={item} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
