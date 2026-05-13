"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Footer() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === '/login' || pathname === '/register' || pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="bg-[var(--section-bg)] pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={180} height={60} className="object-contain" />
          </Link>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            Ethically Sourced, Always. We partner directly with local farmers who use clean, chemical-free methods. No additives. No shortcuts.
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-gray-900 font-bold text-lg mb-2">Categories</h3>
          <Link href="/shop?category=fruits" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">Fruits</Link>
          <Link href="/shop?category=vegetables" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">Vegetables</Link>
          <Link href="/shop?category=spices" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">Spices</Link>
          <Link href="/shop?category=medleys" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">Medleys</Link>
          <Link href="/shop?category=builders" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">Builders</Link>
          <Link href="/shop?category=teas" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">Teas</Link>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-gray-900 font-bold text-lg mb-2">Information</h3>
          <Link href="/about" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">About Us</Link>
          <Link href="/faqs" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">FAQs</Link>
          <Link href="/contact" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">Contact Us</Link>
          <Link href="/privacy" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-gray-600 hover:text-[var(--primary-purple)] text-sm transition-colors">Terms of Service</Link>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-gray-900 font-bold text-lg mb-2">Contact</h3>
          <p className="text-gray-600 text-sm">Email: hello@wholepurple.com</p>
          <p className="text-gray-600 text-sm">Phone: 09163191000</p>
          <p className="text-gray-600 text-sm">Address: No. 32 Norman Williams, Ikoyi, Lagos</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 border-t border-gray-300 pt-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-gray-800 text-sm">© {new Date().getFullYear()} Whole Purple. All rights reserved.</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0 opacity-60">
           {/* Dummy payment icons could go here */}
           <span className="text-sm font-bold">Paystack Verified</span>
        </div>
      </div>
    </footer>
  );
}
