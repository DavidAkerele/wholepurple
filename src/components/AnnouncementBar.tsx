"use client";

import { usePathname } from "next/navigation";

export default function AnnouncementBar() {
  const pathname = usePathname();
  
  if (pathname.startsWith('/dashboard') || pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <div className="w-full bg-[#1A0B2E] text-white py-1.5 px-4 text-center border-b border-white/5">
      <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
        Free delivery on orders over ₦25,000 — <span className="text-[var(--accent-green)]">Shop the harvest</span>
      </p>
    </div>
  );
}
