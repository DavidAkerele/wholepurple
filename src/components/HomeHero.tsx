"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface HomeHeroProps {
  title?: string;
  subtitle?: string;
}

const images = [
  "/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg",
  "/images/scraped/nrd-D6Tu_L3chLE-unsplash.jpg",
  "/images/scraped/Home13_bg12.jpg",
];

export default function HomeHero({ title, subtitle }: HomeHeroProps) {
  const [current, setCurrent] = useState(0);
  const heroTitle = title || "Premium Ready-to-Cook\nMeal Solutions";
  const heroSubtitle = subtitle || "Experience the ultimate convenience with our ethically sourced, pre-chopped, and marinated ingredients. Professional quality meals at your fingertips.";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-90px)] bg-[#FAF7F2] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
            <span className="inline-block px-4 py-1.5 bg-purple-50 text-[var(--primary-purple)] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg mb-6 border border-purple-100">
              Ethically Sourced, Always
            </span>
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.95] mb-8 tracking-tighter whitespace-pre-line">
              {heroTitle}
            </h1>
            <div className="w-24 h-1 bg-[var(--accent-green)] mb-8"></div>
            <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-medium">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <Link href="/shop" className="flex-1 sm:flex-none bg-[var(--primary-purple)] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 px-10 py-5 rounded-2xl hover:shadow-2xl hover:shadow-purple-200 transition-all group">
                Shop The Harvest <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/shop?category=medleys" className="flex-1 sm:flex-none bg-white text-gray-900 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all">
                Explore Kits <ShoppingBag className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image Slideshow */}
          <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-[4/3] rounded-[40px] overflow-hidden group shadow-2xl shadow-purple-900/10">
            {images.map((src, idx) => (
              <Image 
                key={src}
                src={src} 
                alt="Fresh Prepared Ingredients" 
                fill 
                className={`object-cover transition-all duration-1000 ease-in-out ${idx === current ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                priority={idx === 0}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Floating Quality Tag */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl max-w-[200px] z-20">
              <div className="text-[var(--accent-green)] font-black text-[10px] uppercase tracking-widest mb-1">Guaranteed</div>
              <div className="text-gray-900 font-bold text-sm">Farm-to-Door Freshness in 24 Hours</div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 right-8 flex gap-2 z-20">
              {images.map((_, idx) => (
                <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}></div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Vectors */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--primary-purple)] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--accent-green)] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
