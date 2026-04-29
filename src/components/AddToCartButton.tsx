"use client";

import { useCartStore } from "@/lib/store";
import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@prisma/client";

export default function AddToCartButton({ item }: { item: any }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if this is inside a Link
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <button 
      onClick={handleAdd}
      className="w-8 h-8 rounded-full border border-gray-200 text-gray-900 flex items-center justify-center hover:bg-[var(--accent-green)] hover:text-white hover:border-[var(--accent-green)] transition-all z-20 relative"
      aria-label="Add to cart"
    >
      <ShoppingBag className="w-3 h-3" />
    </button>
  );
}
