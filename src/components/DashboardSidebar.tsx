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
  X,
  User,
  BookOpen,
  HelpCircle,
  Check,
  Search
} from "lucide-react";
import { signOut } from "next-auth/react";

import { useUIStore } from "@/lib/store";

export default function DashboardSidebar({ session, role }: { session: any, role: string }) {
  const { isSidebarCollapsed, setSidebarCollapsed, toggleSidebar } = useUIStore();
  const [isMobile, setIsMobile] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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
  if (role === "SYSTEM_ADMIN") {
    navItems = [
      { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Create Order", href: "/dashboard/shop-manager/orders/new", icon: Menu },
      { name: "All Orders", href: "/dashboard/admin/orders", icon: ShoppingBag },
      { name: "Manage Products", href: "/dashboard/shop-manager/products", icon: Package },
      { name: "Manage Blogs", href: "/dashboard/editor", icon: FileText },
      { name: "Site Content", href: "/dashboard/editor/content", icon: Settings },
      { name: "Users & Roles", href: "/dashboard/admin/users", icon: Users },
      { name: "Bowl Builders", href: "/dashboard/admin/builders", icon: Menu },
      { name: "Wallet & Rewards", href: "/dashboard/admin/wallet-rewards", icon: Wallet },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ];
  } else if (role === "SHOP_MANAGER") {
    navItems = [
      { name: "Overview", href: "/dashboard/shop-manager", icon: LayoutDashboard },
      { name: "Create Order", href: "/dashboard/shop-manager/orders/new", icon: Menu },
      { name: "Manage Products", href: "/dashboard/shop-manager/products", icon: Package },
      { name: "Bowl Builders", href: "/dashboard/admin/builders", icon: Menu },
      { name: "Fulfill Orders", href: "/dashboard/shop-manager/orders", icon: ShoppingBag },
    ];
  } else if (role === "EDITOR") {
    navItems = [
      { name: "Content CMS", href: "/dashboard/editor", icon: LayoutDashboard },
      { name: "Manage Blogs", href: "/dashboard/editor", icon: FileText },
      { name: "Site Content", href: "/dashboard/editor/content", icon: Settings },
    ];
  } else {
    navItems = [
      { name: "My Account", href: "/dashboard/client", icon: LayoutDashboard },
      { name: "My Profile", href: "/dashboard/client/profile", icon: User },
      { name: "Order History", href: "/dashboard/client/orders", icon: ShoppingBag },
      { name: "Wishlist", href: "/dashboard/client/wishlist", icon: Heart },
      { name: "My Wallet", href: "/dashboard/client/wallet", icon: Wallet },
      { name: "Rewards", href: "/dashboard/client/rewards", icon: Gift },
      { name: "Refer & Earn", href: "/dashboard/client/referrals", icon: Users },
    ];
  }

  const manualContent: Record<string, any> = {
    SYSTEM_ADMIN: {
      title: "Master Administrator Protocol",
      description: "As a Master Admin, you hold the highest level of authority. Your dashboard is the command center for the entire Whole Purple ecosystem.",
      steps: [
        { title: "Managing Access & Roles", content: "Go to 'Users & Roles' to see everyone on the platform. Use the 'Edit Role' dropdown to promote users to Shop Managers or Editors.", action: { label: "Manage Users", href: "/dashboard/admin/users" } },
        { title: "Bowl Builder Configuration", content: "The 'Bowl Builders' section uses a JSON-based system. You can update ingredient names, base prices, and category limits.", action: { label: "Open Builders", href: "/dashboard/admin/builders" } },
        { title: "Financial Oversight", content: "In 'Wallet & Rewards', you can manually adjust user balances or reward points for customer service resolutions.", action: { label: "Check Rewards", href: "/dashboard/admin/wallet-rewards" } },
        { title: "Global Site Settings", content: "Update the Announcement Bar text, change support emails, or adjust delivery fees in the 'Settings' tab.", action: { label: "Site Settings", href: "/dashboard/admin/settings" } }
      ]
    },
    SHOP_MANAGER: {
      title: "Operations & Logistics Manual",
      description: "You are responsible for the physical journey of our products. Efficiency and accuracy in this dashboard directly impact customer satisfaction.",
      steps: [
        { title: "The Order Lifecycle", content: "When a new order arrives, it starts as 'Pending'. Change it to 'Processing' while you pack it, and 'Delivered' once it reaches the customer.", action: { label: "Fulfill Orders", href: "/dashboard/shop-manager/orders" } },
        { title: "Inventory Mastery", content: "Use the 'Manage Products' table to keep stock levels updated. If an item is out of season, set its stock to 0.", action: { label: "Manage Stock", href: "/dashboard/shop-manager/products" } },
        { title: "Product Presentation", content: "You can update product prices and descriptions. Use the 'Quick Edit' feature to change prices instantly.", action: { label: "Edit Products", href: "/dashboard/shop-manager/products" } },
        { title: "Create Orders", content: "Manual order creation for special cases or phone-in orders.", action: { label: "New Order", href: "/dashboard/shop-manager/orders/new" } }
      ]
    },
    EDITOR: {
      title: "Editorial & Content CMS Guide",
      description: "You curate the brand's voice and aesthetic. Your goal is to maintain the luxury, editorial feel of the Whole Purple journal.",
      steps: [
        { title: "Crafting Premium Stories", content: "When creating a blog post, the 'Hero Image' is the most important element. Use high-resolution shots.", action: { label: "Write Blog", href: "/dashboard/editor/blogs/new" } },
        { title: "Publishing Workflow", content: "Articles start as drafts. Use the 'Publish' toggle to make them live. You can unpublish anytime.", action: { label: "Blog List", href: "/dashboard/editor" } },
        { title: "Site Content Updates", content: "Beyond blogs, you can update landing page headlines and the 'About Us' narrative.", action: { label: "Edit Content", href: "/dashboard/editor/content" } }
      ]
    },
    CLIENT: {
      title: "Your Harvest Experience Guide",
      description: "This is your personal hub for fresh living. Manage your orders, grow your rewards, and track your harvest journey with ease.",
      steps: [
        { title: "Using Your Harvest Wallet", content: "Top up your wallet in the 'My Wallet' section for a faster, one-click checkout experience.", action: { label: "My Wallet", href: "/dashboard/client/wallet" } },
        { title: "Earning & Spending Rewards", content: "For every ₦100 you spend, you earn 1 Reward Point. Convert them to wallet credit for discounts.", action: { label: "My Rewards", href: "/dashboard/client/rewards" } },
        { title: "Order Tracking", content: "View the progress of your current delivery in 'Order History'.", action: { label: "Order History", href: "/dashboard/client/orders" } },
        { title: "Referral Program", content: "Share your unique referral link to earn wallet credit when your friends make their first purchase.", action: { label: "Get Link", href: "/dashboard/client/referrals" } },
        { title: "Mastering the Meal Builders", content: "When building a custom bowl, follow the category rules. For example, choose exactly 1 base, at least 2 proteins, and 3-4 toppings. The 'Add to Basket' button activates only when all requirements are met.", action: { label: "Start Building", href: "/shop/builders" } }
      ]
    }
  };

  const currentManual = manualContent[role] || manualContent.CLIENT;

  const filteredSteps = currentManual.steps.filter((step: any) => 
    step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAllCompleted = completedSteps.length === currentManual.steps.length;

  const handleMarkAsRead = (index: number) => {
    setCompletedSteps(prev => {
      const isFinishing = !prev.includes(index);
      const newCompleted = isFinishing ? [...prev, index] : prev.filter(s => s !== index);
      
      // Auto-advance logic
      if (isFinishing && index < currentManual.steps.length - 1) {
        setExpandedStep(index + 1);
      } else if (isFinishing && index === currentManual.steps.length - 1) {
        setExpandedStep(null);
      }
      
      return newCompleted;
    });
  };

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

            <div className="mt-8 pt-8 border-t border-gray-100/50">
              <button 
                onClick={() => setShowManual(true)}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all text-gray-800 hover:text-[var(--primary-purple)] hover:bg-purple-50 group"
              >
                <BookOpen className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                {(!isSidebarCollapsed || isMobile) && <span className="text-[13px] font-black truncate tracking-tight">User Manual</span>}
              </button>
            </div>
          </nav>
        </div>

        {/* User Profile / Sign Out */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-gray-900/30">
          <div className={`flex items-center gap-3 p-2.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 mb-3 ${isSidebarCollapsed && !isMobile ? 'justify-center border-none bg-transparent shadow-none' : 'shadow-sm'}`}>
            {session.user.image ? (
              <Image src={session.user.image} alt={session.user.name || ""} width={40} height={40} className="rounded-full object-cover shadow-md shadow-purple-200" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-purple)] to-purple-400 text-white flex items-center justify-center font-black shrink-0 shadow-md shadow-purple-200">
                {session.user.name?.[0] || session.user.email?.[0] || "U"}
              </div>
            )}
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

      {/* Manual Modal */}
      {showManual && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setShowManual(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white max-h-[90vh] flex flex-col">
            
            {/* Header - Fixed */}
            <div className="p-8 md:p-10 border-b border-gray-100 bg-white sticky top-0 z-20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center text-[var(--primary-purple)]">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Interactive Guide</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{currentManual.title}</h2>
                </div>
                <button onClick={() => setShowManual(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[var(--primary-purple)] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search topics or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar bg-gray-50/30">
              {isAllCompleted && searchQuery === "" ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-[40px] border border-green-100 text-center animate-in zoom-in-95 duration-500 mb-8">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-3">Onboarding Complete!</h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed max-w-sm mx-auto mb-8">
                    You've mastered the basics of your {role.replace('_', ' ')} dashboard. You're ready to manage the harvest!
                  </p>
                  <button 
                    onClick={() => setCompletedSteps([])}
                    className="text-[10px] font-black text-[var(--accent-green)] uppercase tracking-widest hover:underline"
                  >
                    Reset & Practice Again
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredSteps.map((step: any) => {
                    const originalIndex = currentManual.steps.findIndex((s: any) => s.title === step.title);
                    const isExpanded = expandedStep === originalIndex;
                    const isCompleted = completedSteps.includes(originalIndex);
                    
                    return (
                      <div key={originalIndex} className={`flex flex-col rounded-3xl border transition-all duration-300 ${isExpanded ? 'bg-white border-purple-200 p-6 shadow-xl shadow-purple-900/5' : 'bg-white border-gray-100 p-4 hover:border-purple-100'}`}>
                        <div 
                          className="flex items-center gap-4 cursor-pointer"
                          onClick={() => setExpandedStep(isExpanded ? null : originalIndex)}
                        >
                          <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center font-black text-xs transition-all ${isCompleted ? 'bg-green-500 text-white' : 'bg-purple-50 text-[var(--primary-purple)]'}`}>
                            {isCompleted ? <Check className="w-4 h-4" /> : originalIndex + 1}
                          </div>
                          <h4 className={`text-sm font-black uppercase tracking-widest flex-1 ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {step.title}
                          </h4>
                          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                        
                        {isExpanded && (
                          <div className="mt-6 pl-12 animate-in fade-in slide-in-from-top-2 duration-300">
                            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
                              {step.content}
                            </p>
                            <div className="flex items-center gap-4">
                              {step.action && (
                                <Link 
                                  href={step.action.href}
                                  onClick={() => setShowManual(false)}
                                  className="px-5 py-2.5 bg-[var(--primary-purple)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-purple-900/10"
                                >
                                  {step.action.label}
                                </Link>
                              )}
                              <button 
                                onClick={() => handleMarkAsRead(originalIndex)}
                                className={`text-[10px] font-black uppercase tracking-widest transition-all ${isCompleted ? 'text-gray-400 hover:text-gray-900' : 'text-[var(--accent-green)] hover:text-green-700'}`}
                              >
                                {isCompleted ? "Unmark" : "Mark as Read"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {filteredSteps.length === 0 && (
                    <div className="py-20 text-center">
                       <p className="text-gray-400 font-medium italic">No matching help topics found...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer - Fixed */}
            <div className="p-8 border-t border-gray-100 bg-white">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                   <div className="h-2 w-32 md:w-48 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-[var(--primary-purple)] to-[var(--accent-green)] transition-all duration-1000" 
                        style={{ width: `${(completedSteps.length / currentManual.steps.length) * 100}%` }}
                      ></div>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
                        {Math.round((completedSteps.length / currentManual.steps.length) * 100)}% Mastered
                      </span>
                   </div>
                </div>
                <button 
                  onClick={() => setShowManual(false)}
                  className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[var(--primary-purple)] transition-all shadow-xl shadow-black/10"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
