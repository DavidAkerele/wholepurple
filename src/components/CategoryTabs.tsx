"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CategoryTabs() {
  const tabs = [
    {
      title: "Build Your Own",
      subtitle: "Salads & Stir Fry",
      href: "/shop/builders",
      color: "bg-[#F3F6ED]",
      textColor: "text-[var(--accent-green)]",
      width: "lg:w-1/4"
    },
    {
      title: "Ready-To-Cook",
      subtitle: "Kits · Boxes · Packs",
      href: "/shop?category=medleys",
      color: "bg-[#F3EBF4]",
      textColor: "text-[var(--primary-purple)]",
      width: "lg:w-1/2",
      dominant: true
    },
    {
      title: "Medleys & Convenience",
      subtitle: "Quick Grabs",
      href: "/shop?category=juices",
      color: "bg-[#F9F0E6]",
      textColor: "text-orange-600",
      width: "lg:w-1/4"
    }
  ];

  return (
    <section className="container mx-auto px-4 md:px-8 mt-24 mb-16 relative z-20">
      <div className="flex flex-col lg:flex-row gap-4">
        {tabs.map((tab, idx) => (
          <Link 
            key={idx}
            href={tab.href}
            className={`flex flex-col items-center justify-center text-center p-10 rounded-[32px] border border-white shadow-xl shadow-black/5 transition-all hover:-translate-y-1 hover:shadow-2xl ${tab.color} ${tab.width}`}
          >
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${tab.textColor}`}>
              {tab.title}
            </span>
            <h3 className={`font-black text-gray-900 leading-tight mb-4 ${tab.dominant ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
              {tab.subtitle}
            </h3>
            <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
              <ChevronRight className={`w-4 h-4 ${tab.textColor}`} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
