"use client";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore(state => state.addItem);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: `/images/scraped/${product.image || 'woocommerce-placeholder.webp'}`
    });
    // Visual feedback could be added here (e.g. a toast notification)
  };

  return (
    <button 
      onClick={handleAdd}
      className="w-10 h-10 rounded-full bg-[var(--accent-green)] text-white flex items-center justify-center hover:bg-green-600 transition-colors active:scale-95"
      aria-label="Add to cart"
    >
      <ShoppingBag className="w-5 h-5" />
    </button>
  );
}
