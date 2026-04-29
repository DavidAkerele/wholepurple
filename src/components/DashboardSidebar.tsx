"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Package, 
  Settings, 
  LogOut, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Menu,
  FileText,
  Wallet,
  Gift,
  X
} from "lucide-react";
import { signOut } from "next-auth/react";

import { useUIStore } from "@/lib/store";

export default function DashboardSidebar({ session, role }: { session: any, role: string }) {
  const { isSidebarCollapsed, setSidebarCollapsed, toggleSidebar } = useUIStore();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Handle responsiveness
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarCollapsed(false); // Default open on desktop
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation based on role
  let navItems = [];
  if (role === "ADMIN") {
    navItems = [
      { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "All Orders", href: "/dashboard/admin/orders", icon: ShoppingBag },
      { name: "Manage Products", href: "/dashboard/shop-manager/products", icon: Package },
      { name: "Users & Roles", href: "/dashboard/admin/users", icon: Users },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ];
  } else if (role === "SHOP_MANAGER") {
    navItems = [
      { name: "Overview", href: "/dashboard/shop-manager", icon: LayoutDashboard },
      { name: "Create Order", href: "/dashboard/shop-manager/orders/new", icon: Menu },
      { name: "Manage Products", href: "/dashboard/shop-manager/products", icon: Package },
      { name: "Fulfill Orders", href: "/dashboard/shop-manager/orders", icon: ShoppingBag },
    ];
  } else if (role === "EDITOR") {
    navItems = [
      { name: "Content CMS", href: "/dashboard/editor", icon: LayoutDashboard },
      { name: "Manage Blogs", href: "/dashboard/editor/blogs", icon: FileText },
      { name: "Site Content", href: "/dashboard/editor/content", icon: Settings },
    ];
  } else {
    navItems = [
      { name: "My Account", href: "/dashboard/client", icon: LayoutDashboard },
      { name: "Order History", href: "/dashboard/client/orders", icon: ShoppingBag },
      { name: "Wishlist", href: "/dashboard/client/wishlist", icon: Heart },
      { name: "My Wallet", href: "/dashboard/client/wallet", icon: Wallet },
      { name: "Rewards", href: "/dashboard/client/rewards", icon: Gift },
      { name: "Refer & Earn", href: "/dashboard/client/referrals", icon: Users },
    ];
  }

  const closeMobile = () => {
    if (isMobile) setSidebarCollapsed(true);
  };

  return (
    <>
      {/* Floating Toggle Button - Visible on all devices when collapsed */}
      {isSidebarCollapsed && (
        <div className="fixed bottom-8 left-8 z-[60] animate-in slide-in-from-bottom-10 fade-in duration-500">
          <button 
            onClick={() => setSidebarCollapsed(false)}
            className="w-16 h-16 bg-[var(--primary-purple)] text-white rounded-full shadow-2xl shadow-purple-900/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-4 border-white group"
          >
            <Menu className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      )}

      {/* Overlay - Desktop and Mobile */}
      {!isSidebarCollapsed && (
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-opacity duration-500 ${isMobile ? 'opacity-100' : 'lg:opacity-0 lg:pointer-events-none'}`}
          onClick={closeMobile}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside 
        className={`bg-white flex flex-col shrink-0 h-screen transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) z-50
          ${isSidebarCollapsed 
            ? '-translate-x-full w-0 overflow-hidden border-none shadow-none' 
            : 'translate-x-0 w-[300px] md:w-64 border-r border-gray-200 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.1)] lg:shadow-none'}
          fixed lg:sticky top-0 left-0
        `}
      >
        {/* Header */}
        <div className={`px-6 py-5 border-b border-gray-100/50 flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'justify-between'} bg-white/50 backdrop-blur-sm sticky top-0 z-10`}>
          {(!isSidebarCollapsed || isMobile) && (
            <Link href="/" onClick={closeMobile} className="hover:opacity-80 transition-opacity">
               <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={120} height={35} className="object-contain" />
            </Link>
          )}
          
          <button 
            onClick={() => toggleSidebar()}
            className={`p-2 rounded-xl hover:bg-purple-50 text-gray-600 hover:text-[var(--primary-purple)] transition-all ${isMobile && isSidebarCollapsed ? 'hidden' : ''}`}
          >
            {isMobile ? <X className="w-5 h-5" /> : (isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />)}
          </button>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar">
          {(!isSidebarCollapsed || isMobile) && (
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-8 px-4 opacity-50">
              {role.replace('_', ' ')}
            </p>
          )}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={closeMobile}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all relative group ${
                    isActive 
                    ? 'bg-purple-50 text-[var(--primary-purple)] shadow-sm' 
                    : 'text-gray-800 hover:text-[var(--primary-purple)] hover:bg-gray-50 text-gray-900'
                  }`}
                  title={isSidebarCollapsed && !isMobile ? item.name : ""}
                >
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-[var(--primary-purple)] rounded-r-full" />
                  )}
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[var(--primary-purple)]' : 'group-hover:scale-110 group-hover:rotate-3 transition-all duration-300'}`} />
                  {(!isSidebarCollapsed || isMobile) && <span className="text-[13px] font-black truncate tracking-tight">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile / Sign Out */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-gray-900/30">
          <div className={`flex items-center gap-3 p-2.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 mb-3 ${isSidebarCollapsed && !isMobile ? 'justify-center border-none bg-transparent shadow-none' : 'shadow-sm'}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary-purple)] to-purple-400 text-white flex items-center justify-center font-black shrink-0 shadow-md shadow-purple-200">
              {session.user.name?.[0] || session.user.email?.[0] || "U"}
            </div>
            {(!isSidebarCollapsed || isMobile) && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-[11px] font-black text-gray-900 truncate uppercase tracking-tight">{session.user.name || "User"}</span>
                <span className="text-[9px] font-bold text-gray-600 truncate tracking-wide">{session.user.email}</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 rounded-xl transition-all ${isSidebarCollapsed && !isMobile ? 'justify-center' : ''}`}
            title={isSidebarCollapsed && !isMobile ? "Sign Out" : ""}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(!isSidebarCollapsed || isMobile) && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
