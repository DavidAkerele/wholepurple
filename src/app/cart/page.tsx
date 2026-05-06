"use client";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyCart from "@/components/EmptyCart";
import { getProductImageUrl } from "@/lib/image-utils";

import PageHeader from "@/components/PageHeader";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[50vh] flex items-center justify-center">Loading cart...</div>;

  const { items, updateQuantity, removeItem, getTotalPrice } = cart;

  if (items.length === 0) {
    return (
      <EmptyCart />
    );
  }

  return (
    <div className="flex flex-col bg-[#FAF7F2] min-h-screen pb-24">
      <PageHeader 
        tag="Order Summary"
        title="My Basket"
        subtitle="Review your selection of fresh harvests and artisanal products before checkout."
        bgImage="/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg"
      />

      <div className="container mx-auto px-4 md:px-8 mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-6">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-bold text-gray-800 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {items.map(item => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-8 border-b border-gray-100 group">
              <div className="col-span-1 md:col-span-6 flex items-center gap-4 lg:gap-6">
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center p-2 shrink-0 border border-gray-100 overflow-hidden">
                  <Image 
                    src={getProductImageUrl(item.image)} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-2" 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-base lg:text-lg text-gray-900 hover:text-[var(--primary-purple)] cursor-pointer leading-tight uppercase tracking-tight">{item.name}</h3>
                  {item.selections && item.selections.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.selections.map((selection, idx) => (
                        <span key={idx} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">
                          {selection}
                        </span>
                      ))}
                    </div>
                  )}
                  <button onClick={() => removeItem(item.id)} className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mt-3 hover:underline lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3.5 h-3.5" /> Remove Item
                  </button>
                </div>
              </div>
              
              <div className="flex md:contents justify-between items-center bg-white/50 p-4 rounded-2xl md:bg-transparent md:p-0">
                <div className="md:hidden text-[8px] font-black text-gray-400 uppercase tracking-widest">Price</div>
                <div className="col-span-1 md:col-span-2 text-center font-black text-gray-700 text-sm lg:text-base">
                  ₦{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
              
              <div className="flex md:contents justify-between items-center bg-white/50 p-4 rounded-2xl md:bg-transparent md:p-0">
                <div className="md:hidden text-[8px] font-black text-gray-400 uppercase tracking-widest">Quantity</div>
                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <div className="flex items-center border border-gray-100 rounded-full p-1 bg-white shadow-sm">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex md:contents justify-between items-center bg-white/50 p-4 rounded-2xl md:bg-transparent md:p-0">
                <div className="md:hidden text-[8px] font-black text-gray-400 uppercase tracking-widest">Subtotal</div>
                <div className="col-span-1 md:col-span-2 text-right font-black text-[var(--primary-purple)] text-base lg:text-lg tracking-tight">
                  ₦{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <aside className="w-full lg:w-96 shrink-0">
          <div className="bg-[var(--section-bg)] rounded-3xl p-8 sticky top-28">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">₦{getTotalPrice().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-bold text-[var(--accent-green)]">Calculated at checkout</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-[var(--primary-purple)]">₦{getTotalPrice().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>
            
            <p className="text-center text-xs text-gray-800 mt-6 flex items-center justify-center gap-2">
               <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
               Secure checkout powered by Dummy Paystack
            </p>
          </div>
        </aside>
        </div>
      </div>
    </div>
  );
}
