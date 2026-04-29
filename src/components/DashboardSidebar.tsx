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

export default function DashboardSidebar({ session, role }: { session: any, role: string }) {
  const [isCollapsed, setIsCollapsed] = useState(true); // Collapsed by default for mobile
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Handle responsiveness
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsCollapsed(false); // Default open on desktop
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
    if (isMobile) setIsCollapsed(true);
  };

  return (
    <>
      {/* Floating Toggle Button - Visible on all devices when collapsed */}
      {isCollapsed && (
        <div className="fixed bottom-8 left-8 z-[60] animate-in slide-in-from-bottom-10 fade-in duration-500">
          <button 
            onClick={() => setIsCollapsed(false)}
            className="w-16 h-16 bg-[var(--primary-purple)] text-white rounded-full shadow-2xl shadow-purple-900/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-4 border-white group"
          >
            <Menu className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      )}

      {/* Overlay - Desktop and Mobile */}
      {!isCollapsed && (
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-opacity duration-500 ${isMobile ? 'opacity-100' : 'lg:opacity-0 lg:pointer-events-none'}`}
          onClick={closeMobile}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside 
        className={`bg-white flex flex-col shrink-0 h-screen transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) z-50
          ${isCollapsed 
            ? '-translate-x-full w-0 overflow-hidden border-none shadow-none' 
            : 'translate-x-0 w-[300px] md:w-64 border-r border-gray-200 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.1)] lg:shadow-none'}
          fixed lg:sticky top-0 left-0
        `}
      >
        {/* Header */}
        <div className={`p-8 border-b border-gray-100 flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'}`}>
          {(!isCollapsed || isMobile) && (
            <Link href="/" onClick={closeMobile}>
               <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={110} height={35} className="object-contain" />
            </Link>
          )}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2.5 rounded-2xl hover:bg-gray-50 text-gray-500 transition-colors ${isMobile && isCollapsed ? 'hidden' : ''}`}
          >
            {isMobile ? <X className="w-6 h-6" /> : (isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />)}
          </button>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-10 px-6 custom-scrollbar">
          {(!isCollapsed || isMobile) && (
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10 px-3 opacity-40">
              {role.replace('_', ' ')}
            </p>
          )}
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={closeMobile}
                  className={`flex items-center gap-4 px-4 py-4 rounded-[24px] transition-all group ${
                    isActive 
                    ? 'bg-[var(--primary-purple)] text-white shadow-xl shadow-purple-900/30 scale-[1.02]' 
                    : 'text-gray-500 hover:text-[var(--primary-purple)] hover:bg-purple-50'
                  }`}
                  title={isCollapsed && !isMobile ? item.name : ""}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform duration-300'}`} />
                  {(!isCollapsed || isMobile) && <span className="text-sm font-black truncate tracking-tight">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile / Sign Out */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/20">
          <div className={`flex items-center gap-3 p-3 rounded-[26px] bg-white border border-gray-100 mb-6 ${isCollapsed && !isMobile ? 'justify-center border-none bg-transparent shadow-none' : 'shadow-sm'}`}>
            <div className="w-11 h-11 rounded-[16px] bg-[var(--primary-purple)] text-white flex items-center justify-center font-black shrink-0 shadow-lg shadow-purple-900/10">
              {session.user.name?.[0] || session.user.email?.[0] || "U"}
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-[11px] font-black text-gray-900 truncate uppercase tracking-tight">{session.user.name || "User"}</span>
                <span className="text-[9px] font-bold text-gray-400 truncate tracking-wide">{session.user.email}</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className={`w-full flex items-center gap-3 px-4 py-4 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
            title={isCollapsed && !isMobile ? "Sign Out" : ""}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {(!isCollapsed || isMobile) && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
