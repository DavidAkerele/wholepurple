"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingCart, Menu, X, LogOut, ChevronRight } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const wishlistItems = useWishlistStore((state) => state.items);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on admin/editor/manager dashboard pages
  if (pathname === '/login' || pathname === '/register' || pathname.startsWith('/dashboard')) {
    return null;
  }

  const isDarkNav = pathname !== '/' || isScrolled;

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isDarkNav ? 'bg-white border-b border-gray-100 py-0' : 'bg-white py-0'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-2">
          <div className="transition-all">
             <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={90} height={24} className="object-contain" priority />
          </div>
        </Link>

        {/* Desktop Nav - Center */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className={`hover:text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.2em] transition-colors ${pathname === '/' ? 'text-[var(--primary-purple)]' : 'text-black'}`}>Home</Link>
          <Link href="/shop" className={`hover:text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.2em] transition-colors ${pathname === '/shop' ? 'text-[var(--primary-purple)]' : 'text-black'}`}>Shop</Link>
          <Link href="/about" className={`hover:text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.2em] transition-colors ${pathname === '/about' ? 'text-[var(--primary-purple)]' : 'text-black'}`}>About Us</Link>
          <Link href="/blog" className={`hover:text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.2em] transition-colors ${pathname === '/blog' ? 'text-[var(--primary-purple)]' : 'text-black'}`}>Blog</Link>
          <Link href="/contact" className={`hover:text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.2em] transition-colors ${pathname === '/contact' ? 'text-[var(--primary-purple)]' : 'text-black'}`}>Contact</Link>
        </nav>

        {/* Actions - Right */}
        <div className="flex items-center gap-4 md:gap-6">
          <button aria-label="Search" className="hidden md:flex items-center gap-2 text-black hover:text-[var(--primary-purple)] transition-colors group">
            <Search className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            {session ? (
              <div className="relative group">
                <Link href="/dashboard" className="flex items-center gap-2 px-2 py-0.5 bg-gray-50 text-gray-900 rounded-full border border-gray-100 hover:bg-white transition-all group/btn">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary-purple)] flex items-center justify-center text-white text-[10px] font-bold">
                    {session.user.name?.charAt(0)}
                  </div>
                  <div className="hidden sm:flex flex-col items-start leading-none">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 group-hover/btn:text-[var(--primary-purple)]">{session.user.name}</span>
                    <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">{session.user.role}</span>
                  </div>
                </Link>

                {/* Hover Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/dashboard/client" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-purple-50 hover:text-[var(--primary-purple)] rounded-xl transition-all">
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <Link href="/dashboard/client/orders" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-purple-50 hover:text-[var(--primary-purple)] rounded-xl transition-all">
                      <Heart className="w-4 h-4" /> Order History
                    </Link>
                    <div className="h-px bg-gray-100 my-1 mx-2"></div>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 rounded-xl transition-all text-left"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" aria-label="Account" className="flex items-center gap-2 text-black hover:text-[var(--primary-purple)] transition-colors">
                <User className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>

          <Link href="/cart" aria-label="Cart" className={`flex items-center gap-2 px-2 py-0.5 rounded-full border ${isDarkNav ? 'border-gray-200 text-black hover:border-[var(--primary-purple)]' : 'border-gray-900/10 text-black hover:bg-black/5'} transition-all group relative`}>
            <ShoppingCart className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Basket</span>
            <span className="absolute -top-1 -right-1 bg-[var(--primary-purple)] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {mounted ? getTotalItems() : 0}
            </span>
          </Link>
          
          <button 
            aria-label="Menu" 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-black"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}>
        <div 
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white transition-transform duration-500 transform ease-out shadow-2xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={120} height={32} className="object-contain" />
            <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col p-8 gap-6 h-[calc(100%-80px)] overflow-y-auto custom-scrollbar">
            {/* User Profile in Mobile Menu */}
            {session ? (
              <div className="mb-4 p-4 bg-purple-50 rounded-3xl border border-purple-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-purple)] flex items-center justify-center text-white font-black">
                  {session.user.name?.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-900">{session.user.name}</span>
                  <span className="text-[10px] font-bold text-[var(--primary-purple)] uppercase tracking-widest">{session.user.role}</span>
                </div>
              </div>
            ) : (
              <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="mb-4 flex items-center justify-between p-5 bg-gray-900 text-white rounded-2xl group active:scale-95 transition-all">
                 <div className="flex items-center gap-3">
                   <User className="w-5 h-5" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">Account Login</span>
                 </div>
                 <ChevronRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2 px-2">Navigation</span>
              {[
                { name: 'Home', href: '/' },
                { name: 'Shop', href: '/shop' },
                { name: 'About us', href: '/about' },
                { name: 'Blog', href: '/blog' },
                { name: 'Faqs', href: '/faqs' },
                { name: 'Contact us', href: '/contact' },
              ].map((item) => (
                <Link 
                  key={item.name}
                  onClick={() => setMobileMenuOpen(false)} 
                  href={item.href} 
                  className={`flex items-center justify-between p-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${pathname === item.href ? 'bg-purple-50 text-[var(--primary-purple)]' : 'text-gray-900 hover:bg-gray-50'}`}
                >
                  {item.name}
                  <ChevronRight className={`w-3 h-3 ${pathname === item.href ? 'text-[var(--primary-purple)]' : 'text-gray-300'}`} />
                </Link>
              ))}
            </div>

            {session && (
              <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-2">
                <Link onClick={() => setMobileMenuOpen(false)} href="/dashboard" className="flex items-center gap-3 p-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50 rounded-xl">
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }} 
                  className="flex items-center gap-3 p-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-600 hover:bg-red-50 rounded-xl text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
