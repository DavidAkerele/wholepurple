"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingCart, Menu, X, LogOut } from "lucide-react";
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
             <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={60} height={16} className="object-contain" priority />
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
      <div className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}>
        <div 
          className={`absolute top-0 right-0 w-64 h-full bg-white transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="font-bold text-[var(--primary-purple)]">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-800 hover:text-red-500">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col p-4 gap-4">
            <Link onClick={() => setMobileMenuOpen(false)} href="/" className="text-gray-800 font-medium text-lg border-b border-gray-50 pb-2">Home</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/shop" className="text-gray-800 font-medium text-lg border-b border-gray-50 pb-2">Shop</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/about" className="text-gray-800 font-medium text-lg border-b border-gray-50 pb-2">About us</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/blog" className="text-gray-800 font-medium text-lg border-b border-gray-50 pb-2">Blog</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/faqs" className="text-gray-800 font-medium text-lg border-b border-gray-50 pb-2">Faqs</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/contact" className="text-gray-800 font-medium text-lg border-b border-gray-50 pb-2">Contact us</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="text-[var(--primary-purple)] font-bold text-lg mt-4 flex items-center gap-2"><User className="w-5 h-5"/> Account / Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
