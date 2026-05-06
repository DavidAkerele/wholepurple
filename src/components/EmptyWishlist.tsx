"use client";

import Link from "next/link";
import { HeartCrack } from "lucide-react";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#FAF7F2] gap-6 p-8">
      <div className="w-32 h-32 bg-white rounded-[40px] shadow-xl shadow-purple-900/5 border border-gray-50 flex items-center justify-center text-[var(--accent-red)]">
        <HeartCrack className="w-16 h-16" />
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Wishlist is empty</h2>
        <p className="text-gray-800 font-medium">Save items you love to find them easily later.</p>
      </div>
      <Link href="/shop" className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[var(--primary-purple)] transition-all shadow-lg">
        Go Shopping
      </Link>
    </div>
  );
}
