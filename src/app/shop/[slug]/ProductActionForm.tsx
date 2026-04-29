"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@prisma/client";

export default function ProductActionForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image || undefined,
      });
    }
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="font-bold text-gray-700">Quantity</span>
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1">
          <button 
            onClick={handleDecrease}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:text-[var(--primary-purple)] transition-all"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
          <button 
            onClick={handleIncrease}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:text-[var(--primary-purple)] transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="bg-[var(--primary-purple)] text-white w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-purple-700 transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />
        Add to Cart — ₦{(product.price * quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </button>
    </div>
  );
}
