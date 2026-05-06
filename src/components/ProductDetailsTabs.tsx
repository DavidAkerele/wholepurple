"use client";
import { useState } from "react";
import { Info, Truck, RefreshCcw, Leaf } from "lucide-react";

export default function ProductDetailsTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("description");
  const getNutritionData = () => {
    // 1. Explicitly mapped products
    const productSpecific: Record<string, any> = {
      'carrots': {
        calories: "41 kcal",
        protein: "0.9g",
        carbs: "9.6g",
        fat: "0.2g",
        fiber: "2.8g",
        vitamins: "Vitamin A (16,706 IU), Vitamin C",
        minerals: "Potassium (320mg), Magnesium"
      },
      'bell-pepper': {
        calories: "31 kcal",
        protein: "1.0g",
        carbs: "6.0g",
        fat: "0.3g",
        fiber: "2.1g",
        vitamins: "Vitamin C (127mg), Vitamin B6",
        minerals: "Potassium, Manganese"
      },
      'watermelon': {
        calories: "30 kcal",
        protein: "0.6g",
        carbs: "8.0g",
        fat: "0.1g",
        fiber: "0.4g",
        vitamins: "Vitamin C, Lycopene",
        minerals: "Potassium, Copper"
      },
      'pineapple': {
        calories: "50 kcal",
        protein: "0.5g",
        carbs: "13.1g",
        fat: "0.1g",
        fiber: "1.4g",
        vitamins: "Vitamin C, B6, Thiamin",
        minerals: "Manganese, Copper"
      },
      'zucchini': {
        calories: "17 kcal",
        protein: "1.2g",
        carbs: "3.1g",
        fat: "0.3g",
        fiber: "1.0g",
        vitamins: "Vitamin C, A, B6",
        minerals: "Potassium, Manganese"
      }
    };

    if (productSpecific[product.slug]) return productSpecific[product.slug];

    // 2. Category-based defaults
    const categoryDefaults: Record<string, any> = {
      'fruits': {
        calories: "50-60 kcal",
        protein: "0.5-1g",
        carbs: "12-15g",
        fat: "0.1-0.3g",
        fiber: "2-3g",
        vitamins: "Vitamin C, B6",
        minerals: "Potassium, Magnesium"
      },
      'vegetables': {
        calories: "20-40 kcal",
        protein: "1-3g",
        carbs: "4-8g",
        fat: "0.1-0.2g",
        fiber: "2-4g",
        vitamins: "Vitamin A, K, C",
        minerals: "Iron, Calcium, Potassium"
      },
      'proteins': {
        calories: "160-200 kcal",
        protein: "25-30g",
        carbs: "0-2g",
        fat: "3-8g",
        fiber: "0g",
        vitamins: "B12, Niacin",
        minerals: "Zinc, Iron, Selenium"
      },
      'teas': {
        calories: "< 5 kcal",
        protein: "0g",
        carbs: "0g",
        fat: "0g",
        fiber: "0g",
        vitamins: "Antioxidants",
        minerals: "Polyphenols"
      },
      'juices': {
        calories: "40-50 kcal",
        protein: "0.5g",
        carbs: "10-12g",
        fat: "0.1g",
        fiber: "0.2g",
        vitamins: "Vitamin C, Folate",
        minerals: "Potassium"
      }
    };

    return categoryDefaults[product.category.slug] || {
      calories: "45 kcal",
      protein: "0.8g",
      carbs: "9g",
      fat: "0.2g",
      fiber: "2.5g",
      vitamins: "Vitamin C, A",
      minerals: "Potassium, Magnesium"
    };
  };

  const nutrition = getNutritionData();

  return (
    <div className="mt-8">
      {/* Tabs Header */}
      <div className="flex items-center gap-8 border-b border-gray-100 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button 
          onClick={() => setActiveTab("description")}
          className={`pb-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all relative ${activeTab === "description" ? "text-[var(--primary-purple)]" : "text-gray-400 hover:text-gray-900"}`}
        >
          Description
          {activeTab === "description" && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--primary-purple)] rounded-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("nutrition")}
          className={`pb-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all relative ${activeTab === "nutrition" ? "text-[var(--primary-purple)]" : "text-gray-400 hover:text-gray-900"}`}
        >
          Nutritional Info
          {activeTab === "nutrition" && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--primary-purple)] rounded-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("shipping")}
          className={`pb-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all relative ${activeTab === "shipping" ? "text-[var(--primary-purple)]" : "text-gray-400 hover:text-gray-900"}`}
        >
          Shipping & Returns
          {activeTab === "shipping" && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--primary-purple)] rounded-full"></div>}
        </button>
      </div>

      {/* Tabs Content */}
      <div className="min-h-[250px]">
        {activeTab === "description" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed font-medium">
              {product.description ? (
                <p>{product.description}</p>
              ) : (
                <>
                  <p className="mb-6 text-base text-gray-900 font-bold italic border-l-4 border-[var(--accent-green)] pl-6">
                    {product.name} is a premium selection from our {product.category.name.toLowerCase()} range, known for its {product.category.slug === 'fruits' ? 'natural sweetness and hydrating properties' : product.category.slug === 'vegetables' ? 'crisp texture and dense nutrient profile' : 'exceptional quality and flavor'}.
                  </p>
                  <p>
                    {product.category.slug === 'teas' 
                      ? `Our ${product.name.toLowerCase()} is crafted for those seeking a moment of tranquility and wellness. Sourced from organic herbs, it delivers a pure, unadulterated experience in every cup.`
                      : product.category.slug === 'proteins'
                      ? `This ${product.name.toLowerCase()} is expertly prepared and marinated to lock in moisture and flavor. Perfect for those who value both nutrition and convenience in their kitchen.`
                      : `Hand-selected from our sustainable partner farms, our ${product.name.toLowerCase()} is grown using clean, chemical-free methods. We prioritize freshness and quality so you get the true taste of nature, delivered straight to your door.`
                    }
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "nutrition" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Nutritional Breakdown (Per 100g Raw)</h4>
            <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {[
                    { label: 'Calories', value: nutrition.calories },
                    { label: 'Protein', value: nutrition.protein },
                    { label: 'Carbohydrates', value: nutrition.carbs },
                    { label: 'Fat', value: nutrition.fat },
                    { label: 'Fiber', value: nutrition.fiber },
                    { label: 'Vitamins', value: nutrition.vitamins },
                    { label: 'Minerals', value: nutrition.minerals },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-gray-500 w-1/2">{row.label}</td>
                      <td className="px-6 py-4 font-bold text-gray-900 text-right">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-[9px] font-medium text-gray-500 italic uppercase tracking-widest leading-relaxed">
              * Nutritional values are estimates based on standard averages and may vary depending on seasonal harvest conditions.
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
