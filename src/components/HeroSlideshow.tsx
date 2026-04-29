"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const images = [
  "/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg",
  "/images/scraped/nrd-D6Tu_L3chLE-unsplash.jpg",
  "/images/scraped/Home13_bg12.jpg",
];

export default function HeroSlideshow({ title, subtitle }: { title?: string, subtitle?: string }) {
  const [current, setCurrent] = useState(0);

  const heroTitle = title || "Ethically Sourced,\nAlways.";
  const heroSubtitle = subtitle || "Experience the purest ingredients. Clean, chemical-free methods. No additives. Just raw, whole goodness delivered straight from local farms to your table.";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500); // Faster slideshow
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-end justify-start overflow-hidden">
      {/* Background Images */}
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt="Fresh Farm Produce"
          fill
          className={`object-cover transition-all duration-1000 ease-in-out ${ idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105" }`}
          priority={idx === 0}
        />
      ))}

      {/* Cinematic Deep Purple/Black Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E]/90 via-[#1A0B2E]/40 to-transparent pointer-events-none"></div>
      
      {/* Content aligned to bottom-left, spanning edge-to-edge */}
      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10 flex flex-col items-start text-left mb-16 md:mb-24">
        <span className="inline-block px-5 py-2 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6 bg-black/20 backdrop-blur-md">
          100% Organic & Fresh
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[1.05] mb-6 tracking-tight max-w-full whitespace-pre-line">
          {heroTitle}
        </h1>
        <p className="text-white/80 text-lg md:text-2xl mb-10 max-w-3xl leading-relaxed font-medium">
          {heroSubtitle}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/shop" className="bg-[var(--primary-purple)] text-white font-bold text-base flex items-center gap-2 px-8 py-4 rounded-full hover:bg-purple-700 transition-colors">
            Shop The Harvest <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/shop?category=builders" className="bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-colors flex items-center gap-2 px-8 py-4 rounded-full border border-white/20">
            Explore Meal Builders
          </Link>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-6 md:right-16 lg:right-24 flex items-center gap-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${ idx === current ? "w-10 h-1.5 bg-[var(--primary-purple)]" : "w-2 h-1.5 bg-white/40 hover:bg-white/70" }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
