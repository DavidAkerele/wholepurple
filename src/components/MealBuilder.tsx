"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Check, Plus, ShoppingCart, Loader2, ArrowLeft, Info, ChefHat, Leaf } from "lucide-react";
import { useCartStore } from "@/lib/store";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BuilderItem {
  id: string;
  name: string;
  image: string;
  price?: number; // Optional add-on price
  calories?: number; // Optional calorie count
  size?: string; // Optional size/portion info
}

interface BuilderCategory {
  id: string;
  name: string;
  minItems: number;
  maxItems: number;
  items: BuilderItem[];
}

interface MealBuilderProps {
  type: "stir-fry" | "salad";
  title: string;
  description: string;
  basePrice: number;
  categories: BuilderCategory[];
  image: string;
}

export default function MealBuilder({ type, title, description, basePrice, categories, image }: MealBuilderProps) {
  // selections[categoryId][itemId] = quantity
  const [selections, setSelections] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(false);
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleToggleItem = (categoryId: string, item: BuilderItem) => {
    setSelections(prev => {
      const categorySelections = prev[categoryId] || {};
      const category = categories.find(c => c.id === categoryId);
      const selectedCount = Object.keys(categorySelections).length;
      
      if (categorySelections[item.id]) {
        const newCategorySelections = { ...categorySelections };
        delete newCategorySelections[item.id];
        return { ...prev, [categoryId]: newCategorySelections };
      }
      
      if (category && selectedCount >= category.maxItems) {
        toast.error(`You can only select up to ${category.maxItems} ${category.name.toLowerCase()}`);
        return prev;
      }
      
      return { 
        ...prev, 
        [categoryId]: { ...categorySelections, [item.id]: 1 } 
      };
    });
  };

  const handleUpdateQuantity = (categoryId: string, itemId: string, delta: number) => {
    setSelections(prev => {
      const categorySelections = prev[categoryId] || {};
      const currentQty = categorySelections[itemId] || 0;
      const newQty = Math.max(1, currentQty + delta);
      
      return {
        ...prev,
        [categoryId]: { ...categorySelections, [itemId]: newQty }
      };
    });
  };

  const totalPrice = useMemo(() => {
    let total = basePrice;
    Object.entries(selections).forEach(([catId, items]) => {
      const category = categories.find(c => c.id === catId);
      Object.entries(items).forEach(([itemId, qty]) => {
        const item = category?.items.find(i => i.id === itemId);
        if (item?.price) total += (item.price * qty);
      });
    });
    return total;
  }, [selections, basePrice, categories]);
  
  const totalCalories = useMemo(() => {
    let total = 0;
    // Estimate base calories (base greens/grains)
    total += type === 'salad' ? 120 : 250; 
    
    Object.entries(selections).forEach(([catId, items]) => {
      const category = categories.find(c => c.id === catId);
      Object.entries(items).forEach(([itemId, qty]) => {
        const item = category?.items.find(i => i.id === itemId);
        if (item) {
          // Fallback calories based on common ingredients if not provided
          const itemCalories = item.calories || 45; 
          total += (itemCalories * qty);
        }
      });
    });
    return total;
  }, [selections, categories, type]);

  const isValid = useMemo(() => {
    return categories.every(cat => {
      const count = Object.keys(selections[cat.id] || {}).length;
      return count >= cat.minItems && count <= cat.maxItems;
    });
  }, [selections, categories]);

  const handleAddToCart = async () => {
    if (!isValid) {
      toast.error("Please complete your selections");
      return;
    }

    setLoading(true);
    
    const allSelectedItems: string[] = [];
    Object.entries(selections).forEach(([catId, items]) => {
      const category = categories.find(c => c.id === catId);
      Object.entries(items).forEach(([itemId, qty]) => {
        const item = category?.items.find(i => i.id === itemId);
        if (item) {
          allSelectedItems.push(`${qty}x ${item.name}`);
        }
      });
    });

    const builderItem = {
      id: `${type}-${Date.now()}`,
      name: `${title} Bowl`,
      price: totalPrice,
      quantity: 1,
      image: image,
      selections: allSelectedItems
    };

    addItem(builderItem as any);
    toast.success(`${title} Bowl added to basket!`);
    router.push("/cart");
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB]">
      {/* Top Bar - Improved Mobile Padding */}
      <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-6 md:py-4 px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/shop" className="flex items-center gap-2 text-gray-800 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Shop</span>
          </Link>
          <div className="flex items-center gap-6">
             <div className="text-right">
               <div className="flex items-center gap-4 justify-end">
                 <div className="flex flex-col items-end">
                   <p className="text-[8px] md:text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Calories</p>
                   <p className="text-xs md:text-sm font-black text-orange-600 leading-none">{totalCalories} kcal</p>
                 </div>
                 <div className="w-px h-6 bg-gray-200"></div>
                 <div className="flex flex-col items-end">
                   <p className="text-[8px] md:text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Price</p>
                   <p className="text-lg md:text-xl font-black text-[var(--primary-purple)] leading-none">₦{totalPrice.toLocaleString()}</p>
                 </div>
               </div>
             </div>
               <div className="relative">
                 <button 
                   onClick={handleAddToCart}
                   disabled={!isValid || loading}
                   className={`flex items-center gap-3 px-6 md:px-8 py-3 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                     isValid 
                     ? 'bg-[var(--primary-purple)] text-white hover:shadow-xl hover:shadow-purple-200' 
                     : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-100'
                   }`}
                 >
                   {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
                   {isValid ? "Add To Basket" : "Complete Selections"}
                 </button>
                 {!isValid && (
                   <p className="absolute -bottom-6 right-0 text-[8px] font-black text-orange-600 uppercase tracking-[0.2em] animate-pulse whitespace-nowrap hidden md:block">
                     Check requirements below
                   </p>
                 )}
               </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Side: Header Card Only */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 lg:sticky lg:top-36 h-fit">
          <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl shadow-purple-900/10">
            <Image src={image} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">{title} Builder</h1>
              <p className="text-white/80 text-sm font-medium">{description}</p>
            </div>
          </div>
          
          <div className="hidden lg:block p-8 bg-purple-50 rounded-[40px] border border-purple-100">
             <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-5 h-5 text-[var(--primary-purple)]" />
                <h4 className="text-sm font-black text-[var(--primary-purple)] uppercase tracking-widest">Fresh Promise</h4>
             </div>
             <p className="text-xs font-medium text-purple-900/60 leading-relaxed italic">
                "Our harvest is picked daily. Your choices ensure no waste, just peak nutrition delivered to your door."
             </p>
          </div>
        </div>

        {/* Right Side: Selections & Final Summary */}
        <div className="w-full lg:w-2/3 flex flex-col gap-16">
          {categories.map((cat) => {
            const selectedItems = selections[cat.id] || {};
            const selectedCount = Object.keys(selectedItems).length;
            const isMaxReached = selectedCount >= cat.maxItems;

            return (
              <div key={cat.id} className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{cat.name}</h2>
                    <p className="text-gray-800 font-medium mt-1">
                      Select {cat.minItems === cat.maxItems ? cat.minItems : `${cat.minItems}-${cat.maxItems}`} items
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${isMaxReached ? 'bg-purple-100 text-[var(--primary-purple)]' : 'bg-gray-100 text-gray-600'}`}>
                        {selectedCount} / {cat.maxItems} Selected
                     </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {cat.items.map((item) => {
                    const quantity = selectedItems[item.id] || 0;
                    const isSelected = quantity > 0;
                    const isDisabled = isMaxReached && !isSelected;

                    return (
                      <div key={item.id} className="flex flex-col gap-4">
                        <button
                          disabled={isDisabled}
                          onClick={() => handleToggleItem(cat.id, item)}
                          className={`group relative flex flex-col items-center text-center p-6 rounded-[32px] border-2 transition-all duration-300 ${
                            isSelected 
                            ? 'border-[var(--primary-purple)] bg-purple-50/50 shadow-xl shadow-purple-900/5' 
                            : isDisabled
                              ? 'border-gray-50 bg-gray-50 text-gray-900/50 opacity-40 grayscale'
                              : 'border-gray-50 bg-white hover:border-purple-200'
                          }`}
                        >
                          <div className="relative w-20 h-20 mb-4 transition-transform group-hover:scale-110">
                            <Image src={item.image?.startsWith('http') ? item.image : `/images/scraped/${item.image}`} alt={item.name} fill className="object-contain" />
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--primary-purple)] text-white rounded-full flex items-center justify-center shadow-lg">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <span className={`text-sm font-bold transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                            {item.name}
                          </span>
                          
                          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 opacity-80">
                            <span className="text-[7px] md:text-[8px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-widest">
                              {item.calories || 45} kcal
                            </span>
                            <span className="text-[7px] md:text-[8px] font-black text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md uppercase tracking-widest">
                              {item.size || '100g'}
                            </span>
                          </div>

                          {item.price && (
                            <span className="text-[10px] font-black text-[var(--primary-purple)] mt-2 tracking-widest">
                              +₦{item.price.toLocaleString()}
                            </span>
                          )}
                        </button>

                        {/* Portion Selector Underneath */}
                        {isSelected && (
                          <div className="flex items-center justify-center gap-4 bg-white border border-gray-100 rounded-2xl p-2 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                             <button 
                               onClick={() => handleUpdateQuantity(cat.id, item.id, -1)}
                               className="w-8 h-8 rounded-xl bg-gray-50 text-gray-900 flex items-center justify-center text-gray-900 hover:bg-gray-100"
                             >
                                <Minus className="w-3 h-3" />
                             </button>
                             <span className="text-xs font-black text-gray-900 w-4 text-center">{quantity}</span>
                             <button 
                               onClick={() => handleUpdateQuantity(cat.id, item.id, 1)}
                               className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-[var(--primary-purple)]"
                             >
                                <Plus className="w-3 h-3" />
                             </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* FINAL SUMMARY SECTION - Moved to Bottom */}
          <div className="mt-8 pt-16 border-t border-gray-100">
             <div className="bg-white p-10 md:p-16 rounded-[60px] border border-gray-100 shadow-2xl shadow-purple-900/5 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-10 flex items-center gap-3">
                    <ChefHat className="w-8 h-8 text-[var(--primary-purple)]" /> Review Your Bowl
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="flex flex-col gap-6">
                        {categories.map(cat => {
                          const items = selections[cat.id] || {};
                          const itemIds = Object.keys(items);
                          return (
                            <div key={cat.id}>
                               <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3">{cat.name}</h4>
                               <div className="flex flex-wrap gap-2">
                                  {itemIds.length === 0 ? (
                                    <span className="text-xs text-gray-500 italic">No selections</span>
                                  ) : (
                                    itemIds.map(id => {
                                      const item = cat.items.find(i => i.id === id);
                                      const qty = items[id];
                                      return (
                                        <div key={id} className="px-4 py-2 bg-purple-50 text-[var(--primary-purple)] text-xs font-black rounded-xl border border-purple-100 flex items-center gap-2">
                                          <span className="text-[9px] bg-[var(--primary-purple)] text-white px-1.5 py-0.5 rounded-md">{qty}x</span>
                                          {item?.name}
                                        </div>
                                      );
                                    })
                                  )}
                               </div>
                            </div>
                          );
                        })}
                     </div>

                     <div className="flex flex-col justify-end items-end gap-6 text-right">
                         <div className="flex flex-col md:flex-row items-end gap-6 md:gap-10">
                            <div className="text-right">
                              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Total Nutrition</p>
                              <p className="text-4xl font-black text-orange-600 tracking-tighter">{totalCalories} kcal</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Final Build Total</p>
                              <p className="text-6xl font-black text-gray-900 tracking-tighter">₦{totalPrice.toLocaleString()}</p>
                            </div>
                         </div>
                        <button 
                          onClick={handleAddToCart}
                          disabled={!isValid || loading}
                          className={`w-full md:w-auto flex items-center justify-center gap-3 px-12 py-6 rounded-[30px] font-black text-sm uppercase tracking-widest transition-all ${
                            isValid 
                            ? 'bg-[var(--primary-purple)] text-white hover:scale-105 shadow-2xl shadow-purple-900/20' 
                            : 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-100'
                          }`}
                        >
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                          Add My Build to Basket
                        </button>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Minus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
    </svg>
  );
}
