"use client";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

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
      <div className="flex flex-col items-center justify-center min-h-[100vh] bg-[#FAF7F2] gap-6">
        <div className="w-32 h-32 bg-white rounded-[40px] shadow-xl shadow-purple-900/5 border border-gray-50 flex items-center justify-center text-[var(--primary-purple)]">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Your cart is empty</h2>
        <p className="text-gray-500 font-medium">Looks like you haven't added any fresh goodness yet.</p>
        <Link href="/shop" className="btn-primary mt-4">Start Shopping</Link>
      </div>
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
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {items.map(item => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 border-b border-gray-100 group">
              <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                <div className="relative w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2 shrink-0 border border-gray-100 overflow-hidden">
                  <Image 
                    src={item.image 
                      ? (item.image.startsWith('/') ? item.image : `/images/scraped/${item.image}`) 
                      : '/images/scraped/woocommerce-placeholder.webp'
                    } 
                    alt={item.name} 
                    fill 
                    className="object-contain p-2" 
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 hover:text-[var(--primary-purple)] cursor-pointer">{item.name}</h3>
                  {item.selections && item.selections.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.selections.map((selection, idx) => (
                        <span key={idx} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
                          {selection}
                        </span>
                      ))}
                    </div>
                  )}
                  <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm flex items-center gap-1 mt-2 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2 text-center font-bold text-gray-700">
                ₦{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <div className="flex items-center border border-gray-200 rounded-full p-1 bg-white">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-600">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2 text-right font-bold text-[var(--primary-purple)] text-lg">
                ₦{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
            
            <p className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-2">
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
