"use client";
import { useState } from "react";
import { Info, Truck, RefreshCcw, Leaf } from "lucide-react";

export default function ProductDetailsTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-8">
      {/* Tabs Header */}
      <div className="flex items-center gap-6 border-b border-gray-100 mb-6">
        <button 
          onClick={() => setActiveTab("description")}
          className={`pb-4 font-bold text-sm transition-colors relative ${activeTab === "description" ? "text-[var(--primary-purple)]" : "text-gray-500 hover:text-gray-900"}`}
        >
          Description
          {activeTab === "description" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary-purple)]"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("nutrition")}
          className={`pb-4 font-bold text-sm transition-colors relative ${activeTab === "nutrition" ? "text-[var(--primary-purple)]" : "text-gray-500 hover:text-gray-900"}`}
        >
          Nutritional Info
          {activeTab === "nutrition" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary-purple)]"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("shipping")}
          className={`pb-4 font-bold text-sm transition-colors relative ${activeTab === "shipping" ? "text-[var(--primary-purple)]" : "text-gray-500 hover:text-gray-900"}`}
        >
          Shipping & Returns
          {activeTab === "shipping" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary-purple)]"></div>}
        </button>
      </div>

      {/* Tabs Content */}
      <div className="min-h-[200px]">
        {activeTab === "description" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-gray-600 leading-relaxed mb-4">
              Freshly sourced and carefully selected. Our {product.name.toLowerCase()} provides the highest quality natural flavor, straight from sustainable farms to your kitchen.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We partner directly with local farmers who use clean, chemical-free methods. No additives, no shortcuts. Whether you are using this for a quick stir-fry, a family stew, or meal prep, you are getting the true, unadulterated taste of nature.
            </p>
          </div>
        )}

        {activeTab === "nutrition" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Leaf className="w-5 h-5 text-[var(--accent-green)]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Calories</div>
                  <div className="text-lg font-black text-gray-900">~45 kcal</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Info className="w-5 h-5 text-[var(--primary-purple)]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Vitamins</div>
                  <div className="text-lg font-black text-gray-900">High in C & A</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 italic">
              * Nutritional values are estimates per 100g serving and may vary slightly depending on harvest conditions.
            </p>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex shrink-0 items-center justify-center text-orange-600 mt-1">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Cold-Chain Delivery</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We use specialized cold-chain logistics to ensure your fresh produce and marinated proteins remain at optimal temperature from our hub to your doorstep. Deliveries are typically completed within 24 hours of dispatch.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-red-50 rounded-full flex shrink-0 items-center justify-center text-[var(--accent-red)] mt-1">
                <RefreshCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Freshness Guarantee</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  If your items arrive damaged or don't meet our freshness standard, please contact us within 2 hours of delivery with a photo, and we will issue a full replacement or store credit.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
