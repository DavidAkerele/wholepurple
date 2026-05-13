"use client";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Truck, CreditCard, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { getProductImageUrl } from "@/lib/image-utils";

import { createOrder } from "@/app/actions/order";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const { data: session } = useSession();

  // Split name for autofill
  const fullName = session?.user?.name || "";
  const firstName = fullName.split(" ")[0] || "";
  const lastName = fullName.split(" ").slice(1).join(" ") || "";

  useEffect(() => {
    setMounted(true);
    if (items.length === 0 && !isSuccess) {
      router.push('/cart');
    }
  }, [items, isSuccess, router]);

  if (!mounted) return <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-purple)]" /></div>;

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      toast.error("Please log in to complete your order");
      return;
    }

    setIsProcessing(true);
    
    const formData = new FormData(e.currentTarget);
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;

    try {
      const result = await createOrder({
        userId: session.user.id,
        address,
        phone,
        total: getTotalPrice() + 1500, // Including delivery
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selections: (item as any).selections
        }))
      });

      if (result.success) {
        setIsSuccess(true);
        clearCart();
      } else {
        toast.error(result.error || "Failed to create order");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF7F2] gap-8 text-center px-4 relative overflow-hidden">
        {/* Celebration Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 grayscale scale-150">
           <Image src="/images/scraped/vibrant-vegetable-harvest-colorful-collection-fresh-produce.png" alt="Celebration" fill className="object-cover" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl bg-white p-12 md:p-20 rounded-[60px] shadow-2xl shadow-purple-900/10 border border-white">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-[var(--accent-green)] animate-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">Order Secured!</h1>
          <p className="text-lg text-gray-800 font-medium leading-relaxed">
            Your fresh harvest is being prepared by our partner farmers. We'll notify you as soon as it's out for delivery.
          </p>
          
          <div className="bg-[#FDFCFB] p-8 rounded-[40px] w-full border border-gray-100 flex flex-col gap-2">
             <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Confirmation Number</p>
             <p className="font-black text-[var(--primary-purple)] text-3xl tracking-tighter">WP-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link href="/dashboard/client/orders" className="flex-1 bg-gray-900 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
              Track Harvest
            </Link>
            <Link href="/shop" className="flex-1 bg-white border border-gray-100 text-gray-900 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 text-gray-900 transition-all">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-[50px] p-10 md:p-16 border border-gray-100 shadow-2xl shadow-purple-900/5 text-center">
          <div className="w-20 h-20 bg-purple-50 rounded-[28px] flex items-center justify-center text-[var(--primary-purple)] mx-auto mb-8">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-none">Authentication Required</h2>
          <p className="text-gray-800 font-medium mb-10 leading-relaxed">
            To ensure a secure transaction and track your harvest, please log in or create an account before checking out.
          </p>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => signIn(undefined, { callbackUrl: '/checkout' })}
              className="w-full bg-[var(--primary-purple)] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] shadow-xl shadow-purple-900/20 transition-all"
            >
              Log In / Sign Up
            </button>
            <Link 
              href="/cart"
              className="w-full bg-gray-50 text-gray-600 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
            >
              Return to Basket
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-center gap-6">
             <Image src="/images/scraped/Gemini_Generated_Image_2h44b12h44b12h44-removebg-preview.png" alt="Trust" width={40} height={40} className="grayscale opacity-50" />
             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left max-w-[150px]">
                Your items are saved and will be waiting in your basket after login.
             </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 pt-32 pb-12">
        <div className="container mx-auto px-4 md:px-8">
           <Link href="/cart" className="text-gray-600 hover:text-[var(--primary-purple)] flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">Checkout</h1>
          <p className="text-gray-800 font-medium mt-4">Secure your premium local harvest in just a few steps.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          {/* Checkout Steps */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <form id="checkout-form" onSubmit={handlePayment} className="flex flex-col gap-10">
              
              {/* Delivery Info */}
              <div className="bg-white p-10 md:p-12 rounded-[50px] border border-gray-100 shadow-xl shadow-purple-900/5">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                   <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-[var(--primary-purple)]">
                      <Truck className="w-6 h-6" />
                   </div>
                   <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Delivery Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">First Name</label>
                    <input required name="firstName" type="text" defaultValue={firstName} className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent outline-none bg-gray-50 text-gray-900 font-medium transition-all" placeholder="Jane" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Last Name</label>
                    <input required name="lastName" type="text" defaultValue={lastName} className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent outline-none bg-gray-50 text-gray-900 font-medium transition-all" placeholder="Doe" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Email Address</label>
                    <input required name="email" type="email" defaultValue={session?.user?.email || ""} className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent outline-none bg-gray-50 text-gray-900 font-medium transition-all" placeholder="jane@example.com" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
                       <Phone className="w-3 h-3" /> Phone Number
                    </label>
                    <input required name="phone" type="tel" className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent outline-none bg-gray-50 text-gray-900 font-medium transition-all" placeholder="+234..." />
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Delivery Address (Lagos Only)</label>
                    <input required name="address" type="text" className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent outline-none bg-gray-50 text-gray-900 font-medium transition-all" placeholder="123 Fresh Lane, Ikoyi" />
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
                       <MessageSquare className="w-3 h-3" /> Special Instructions
                    </label>
                    <textarea name="instructions" rows={3} className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent outline-none bg-gray-50 text-gray-900 font-medium transition-all resize-none" placeholder="e.g. Leave with security, ring bell twice..." />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-10 md:p-12 rounded-[50px] border border-gray-100 shadow-xl shadow-purple-900/5 relative overflow-hidden">
                 <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[var(--accent-green)]">
                       <CreditCard className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Payment Selection</h2>
                    <span className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-[#09A5DB]/10 text-[#09A5DB] rounded-full text-[9px] font-black uppercase tracking-widest">
                       <ShieldCheck className="w-3 h-3" /> Secure Paystack
                    </span>
                 </div>

                 <div className="flex flex-col gap-4">
                   <label className="flex items-center gap-5 p-6 border-2 border-[var(--primary-purple)] bg-purple-50/50 rounded-3xl cursor-pointer transition-all group">
                     <div className="relative flex items-center justify-center w-6 h-6">
                        <input type="radio" name="payment" defaultChecked className="peer appearance-none w-6 h-6 border-2 border-gray-200 rounded-full checked:border-[var(--primary-purple)] transition-all" />
                        <div className="absolute w-3 h-3 bg-[var(--primary-purple)] rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                     </div>
                     <div className="flex flex-col">
                        <span className="font-black text-gray-900 uppercase tracking-tight text-sm">Pay with Card / Bank Transfer</span>
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Instant Fulfillment</span>
                     </div>
                   </label>
                   
                   <label className="flex items-center gap-5 p-6 border-2 border-gray-50 bg-gray-50 text-gray-900/30 rounded-3xl cursor-not-allowed opacity-50 grayscale">
                     <div className="w-6 h-6 border-2 border-gray-200 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                     </div>
                     <div className="flex flex-col">
                        <span className="font-black text-gray-600 uppercase tracking-tight text-sm">Pay on Delivery</span>
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Temporarily Disabled</span>
                     </div>
                   </label>
                 </div>
              </div>
            </form>
          </div>

          {/* Order Summary Side */}
          <div className="lg:col-span-5">
            <div className="bg-white p-10 rounded-[50px] sticky top-28 border border-gray-100 shadow-2xl shadow-purple-900/5">
               <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8 border-b border-gray-50 pb-6">Summary</h2>
               
               <div className="flex flex-col gap-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                 {items.map(item => (
                   <div key={item.id} className="flex gap-4 items-center">
                     <div className="relative w-16 h-16 bg-gray-50 text-gray-900 rounded-xl overflow-hidden shrink-0 p-2 border border-gray-100 flex items-center justify-center">
                        <Image 
                          src={getProductImageUrl(item.image)} 
                          alt={item.name} 
                          fill 
                          className="object-contain p-1" 
                        />
                        <div className="absolute top-0 right-0 bg-[var(--primary-purple)] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-bl-xl">
                           {item.quantity}
                        </div>
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-tight truncate">{item.name}</h4>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">Fresh Harvest</p>
                     </div>
                     <span className="font-black text-gray-900 text-sm">₦{(item.price * item.quantity).toLocaleString()}</span>
                   </div>
                 ))}
               </div>

               <div className="flex flex-col gap-4 mb-10 pt-6 border-t border-gray-50">
                 <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Subtotal</span>
                   <span className="font-bold text-gray-900">₦{getTotalPrice().toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Delivery (Lagos)</span>
                   <span className="font-bold text-gray-900">₦1,500</span>
                 </div>
                 <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                   <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">Grand Total</span>
                   <span className="text-3xl font-black text-[var(--primary-purple)] tracking-tighter">₦{(getTotalPrice() + 1500).toLocaleString()}</span>
                 </div>
               </div>

               <button 
                 form="checkout-form"
                 type="submit"
                 disabled={isProcessing}
                 className={`w-full flex items-center justify-center gap-3 py-6 rounded-3xl font-black text-xs uppercase tracking-widest transition-all ${
                   isProcessing 
                   ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                   : 'bg-[var(--primary-purple)] text-white hover:scale-[1.02] shadow-xl shadow-purple-900/20'
                 }`}
               >
                 {isProcessing ? (
                   <>
                     <Loader2 className="w-5 h-5 animate-spin" /> Securing Order...
                   </>
                 ) : (
                   `Confirm & Pay ₦${(getTotalPrice() + 1500).toLocaleString()}`
                 )}
               </button>
               
               <p className="text-center mt-6 text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> SSL Encrypted Checkout
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
