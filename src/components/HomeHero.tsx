"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Leaf, ShieldCheck, Zap, Star } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);
  
  const heroTitle = title || "Ethically Sourced,\nCurated For Your Kitchen";
  const heroSubtitle = subtitle || "Discover the intersection of farm-fresh purity and urban culinary convenience. No shortcuts, no additives—just the finest ingredients delivered at their peak.";

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-54px)] min-h-[600px] bg-[#FAF7F2] flex items-center overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-purple-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-green-50/40 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-[1700px] mx-auto">
          
          {/* Left Content Area (7 Columns) */}
          <div className={`lg:col-span-7 flex flex-col items-start transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full border border-gray-100 shadow-sm mb-10 group cursor-default">
              <div className="w-5 h-5 bg-[var(--primary-purple)] rounded-full flex items-center justify-center">
                 <Leaf className="w-3 h-3 text-white" />
              </div>
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">
                Direct from Lagos' finest local farms
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl xl:text-[7.5rem] font-black text-gray-900 leading-[0.9] mb-10 tracking-tighter uppercase whitespace-pre-line">
              {heroTitle.split('\n').map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className="block animate-slide-up" style={{ animationDelay: `${i * 0.2}s` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-12 mb-12">
               <p className="text-gray-800 text-lg md:text-xl max-w-lg leading-relaxed font-medium opacity-90 border-l-4 border-[var(--accent-green)] pl-8">
                 {heroSubtitle}
               </p>
               
               <div className="flex flex-col gap-1 shrink-0">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent-green)] text-[var(--accent-green)]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Lagos Community</span>
                  <span className="text-lg font-black text-gray-900">4.9/5 User Rating</span>
               </div>
            </div>

            <div className="flex flex-wrap gap-6 w-full sm:w-auto">
              <Link 
                href="/shop" 
                className="group relative px-12 py-6 bg-gray-900 text-white font-black text-[10px] uppercase tracking-[0.25em] rounded-2xl overflow-hidden shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4"
              >
                <div className="absolute inset-0 bg-[var(--primary-purple)] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">Explore the Shop</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link 
                href="/shop/builders" 
                className="px-12 py-6 bg-white text-gray-900 font-black text-[10px] uppercase tracking-[0.25em] rounded-2xl border-2 border-gray-100 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)] transition-all flex items-center justify-center gap-4 shadow-xl shadow-black/5"
              >
                <ShoppingBag className="w-5 h-5" />
                Build Your Own
              </Link>
            </div>
          </div>

          {/* Right Visual Area (5 Columns) */}
          <div className={`lg:col-span-5 relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[80px] overflow-hidden shadow-[0_60px_100px_-20px_rgba(99,57,145,0.2)] border-[16px] border-white bg-white group">
              {images.map((src, idx) => (
                <Image 
                  key={src}
                  src={src} 
                  alt="Organic Produce" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={`object-cover transition-all duration-[2000ms] ease-in-out ${idx === current ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                  priority={idx === 0}
                />
              ))}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              {/* Minimalist Trust Indicator */}
              <div className="absolute top-10 right-10 flex flex-col items-end gap-3">
                 <div className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-xl border border-white/20 flex items-center gap-4 animate-float">
                    <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-[var(--accent-green)]">
                       <Zap className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Express Hub</p>
                       <p className="text-xs font-black text-gray-900 whitespace-nowrap">24h Delivery</p>
                    </div>
                 </div>
              </div>

              {/* Bottom Label Card */}
              <div className="absolute bottom-12 left-12 right-12 bg-white p-8 rounded-[40px] shadow-2xl flex items-center justify-between group-hover:-translate-y-2 transition-transform duration-500">
                 <div>
                    <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Peak Harvest</h4>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Seasonal Excellence</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[var(--primary-purple)]">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
              </div>
            </div>

            {/* Pagination Controls (Luxury Style) */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
               <div className="w-px h-12 bg-gray-200"></div>
               {images.map((_, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setCurrent(idx)}
                   className={`w-2 transition-all duration-500 rounded-full ${idx === current ? 'h-8 bg-[var(--primary-purple)]' : 'h-2 bg-gray-300'}`}
                 />
               ))}
               <div className="w-px h-12 bg-gray-200"></div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-[5%] left-[-5%] opacity-[0.02] select-none pointer-events-none hidden xl:block w-[1000px] h-[400px]">
         <Image 
           src="/images/scraped/cropped-wholepurplee-removebg-preview.png" 
           alt="WP Logo Watermark" 
           fill 
           className="object-contain"
         />
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce-slow">
         <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-400 rotate-90 translate-y-10">Scroll</span>
         <div className="w-px h-20 bg-gradient-to-b from-gray-300 to-transparent"></div>
      </div>
    </section>
  );
}
