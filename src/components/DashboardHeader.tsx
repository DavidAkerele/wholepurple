"use client";
import { User, ShoppingCart, Search, Bell, ShoppingBag, Truck, Info, X } from "lucide-react";
import { useCartStore, useUIStore } from "@/lib/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DashboardHeader({ session }: { session: any }) {
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Role-based dummy notifications
  const notifications = session.user.role === "CLIENT" ? [
    { id: 1, type: 'status', title: 'Order Shipped', message: 'Your harvest is on its way to Ikoyi.', time: '2h ago', icon: Truck, color: 'text-blue-500 bg-blue-50' },
    { id: 2, type: 'info', title: 'Loyalty Points', message: 'You earned 50 points from your last order!', time: '1d ago', icon: Info, color: 'text-[var(--primary-purple)] bg-purple-50' }
  ] : [
    { id: 1, type: 'order', title: 'New Order #8271', message: 'Fresh Stir-fry order received from Jane Doe.', time: '5m ago', icon: ShoppingBag, color: 'text-green-500 bg-green-50' },
    { id: 2, type: 'status', title: 'Stock Alert', message: 'Organic Kale stock is running low.', time: '1h ago', icon: Info, color: 'text-orange-500 bg-orange-50' }
  ];

  return (
    <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-12 sticky top-0 z-40">
      <div className="flex items-center gap-8 flex-1">
          {/* Logo - Hidden when sidebar is active (expanded) */}
          <Link 
            href="/" 
            className={`shrink-0 transition-all duration-500 overflow-hidden ${
              !isSidebarCollapsed ? 'w-0 opacity-0 pointer-events-none translate-x-[-20px]' : 'w-[100px] opacity-100'
            }`}
          >
             <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={100} height={30} className="object-contain" />
          </Link>

          <div className="relative max-w-md w-full hidden xl:block">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
             <input 
               type="text" 
               placeholder="Search harvests, transactions..." 
               className="w-full bg-gray-50 text-gray-900 border-none rounded-[20px] pl-14 pr-6 py-3.5 text-sm font-medium text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-[var(--primary-purple)]/10 transition-all"
             />
          </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-3 rounded-2xl transition-all ${showNotifications ? 'bg-purple-50 text-[var(--primary-purple)] shadow-inner' : 'text-gray-600 hover:text-[var(--primary-purple)] hover:bg-gray-50 text-gray-900'}`}
          >
             <Bell className="w-5 h-5" />
             <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-[-1]" onClick={() => setShowNotifications(false)}></div>
              <div className="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-[32px] shadow-2xl shadow-purple-900/15 border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                   <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Notifications</h3>
                   <span className="text-[10px] font-black text-[var(--primary-purple)] uppercase tracking-widest px-2 py-1 bg-purple-50 rounded-lg">2 New</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                   {notifications.map((n) => (
                     <div key={n.id} className="p-6 hover:bg-gray-50 text-gray-900/50 transition-colors cursor-pointer border-b border-gray-50 last:border-0 group">
                        <div className="flex gap-4">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${n.color}`}>
                              <n.icon className="w-6 h-6" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                 <h4 className="text-xs font-black text-gray-900 uppercase tracking-tight">{n.title}</h4>
                                 <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{n.time}</span>
                              </div>
                              <p className="text-xs text-gray-800 font-medium leading-relaxed line-clamp-2">{n.message}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-[var(--primary-purple)] hover:bg-gray-50 text-gray-900 transition-all border-t border-gray-50">
                   View All Activity
                </button>
              </div>
            </>
          )}
        </div>

        {/* Basket */}
        <Link href="/cart" className="flex items-center gap-3 p-2 bg-gray-50 text-gray-900/50 rounded-2xl hover:bg-purple-50 transition-all group relative min-w-[140px] justify-start">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 group-hover:text-[var(--primary-purple)] transition-colors shadow-sm shrink-0">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Basket</span>
            <span className="text-xs font-black text-gray-900">{mounted ? getTotalItems() : 0} Items</span>
          </div>
          {mounted && getTotalItems() > 0 && (
             <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--primary-purple)] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                {getTotalItems()}
             </span>
          )}
        </Link>

        {/* Profile Link */}
        <Link href="/dashboard/client" className="flex items-center gap-3 p-2 border border-gray-100 rounded-2xl hover:border-[var(--primary-purple)] hover:bg-gray-50 text-gray-900 transition-all group min-w-[140px] justify-start">
          {session.user.image ? (
            <Image src={session.user.image} alt={session.user.name || ""} width={40} height={40} className="rounded-full object-cover shadow-lg shadow-purple-900/10 shrink-0" />
          ) : (
            <div className="w-10 h-10 bg-[var(--primary-purple)] rounded-full flex items-center justify-center text-white font-black shadow-lg shadow-purple-900/10 shrink-0">
              {session.user.name?.[0] || "U"}
            </div>
          )}
          <div className="hidden lg:flex flex-col pr-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 truncate max-w-[80px]">{session.user.name || "User"}</span>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{session.user.role?.replace('_', ' ') || "Client"}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
