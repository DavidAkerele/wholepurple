import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Package, User, MapPin, Phone, Clock, CreditCard, ShoppingBag, FileText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import OrderActions from "@/components/OrderActions";
import InvoiceTemplate from "@/components/InvoiceTemplate";
import StatusBadge from "@/components/StatusBadge";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;
  
  if (session?.user.role !== "ADMIN" && session?.user.role !== "SHOP_MANAGER") {
    redirect("/dashboard");
  }

  const order = await prisma.order.findUnique({
    where: { id: resolvedParams.id },
    include: {
      user: { select: { name: true, email: true, image: true } },
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    notFound();
  }

  return (
    <>
      <InvoiceTemplate order={order} />
      
      <div className="flex flex-col gap-10 print:hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={session.user.role === "ADMIN" ? "/dashboard/admin/orders" : "/dashboard/shop-manager/orders"} className="p-2 bg-white rounded-xl border border-gray-100 hover:text-[var(--primary-purple)] transition-all">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Order Details</h1>
              <p className="text-gray-500 font-medium text-sm flex items-center gap-2">
                 ID: <span className="font-mono text-xs">{order.id}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <StatusBadge status={order.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Items & Customer Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
             {/* Items Card */}
             <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-purple-900/5 p-8 md:p-10">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-8 flex items-center gap-3">
                   <ShoppingBag className="w-6 h-6 text-[var(--primary-purple)]" /> Order Items
                </h3>
                <div className="flex flex-col gap-6">
                   {order.items.map((item) => (
                     <div key={item.id} className="flex items-center gap-6 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="relative w-20 h-20 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shrink-0">
                           {item.product.image ? (
                             <Image src={item.product.image.startsWith('http') ? item.product.image : `/images/scraped/${item.product.image}`} alt={item.product.name} fill className="object-contain p-2" />
                           ) : (
                             <Image src="/images/scraped/woocommerce-placeholder.webp" alt={item.product.name} fill className="object-contain p-2 opacity-20" />
                           )}
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight truncate">{item.product.name}</h4>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                              {item.quantity} x ₦{item.price.toLocaleString()}
                           </p>
                        </div>
                        <div className="text-right">
                           <p className="text-xl font-black text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                     </div>
                   ))}
                </div>
                
                <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col gap-3 text-right">
                   <div className="flex justify-end gap-12 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                      <span>Subtotal</span>
                      <span className="text-gray-900">₦{order.total.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-end gap-12 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                      <span>Delivery</span>
                      <span className="text-gray-900">Included</span>
                   </div>
                   <div className="flex justify-end gap-12 text-2xl font-black text-gray-900 mt-2">
                      <span className="uppercase tracking-tighter">Total</span>
                      <span className="text-[var(--primary-purple)]">₦{order.total.toLocaleString()}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Right: Customer Info & Status */}
          <div className="flex flex-col gap-8">
             {/* Customer Card */}
             <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-purple-900/5 p-8">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-6 flex items-center gap-3">
                   <User className="w-5 h-5 text-[var(--primary-purple)]" /> Customer Info
                </h3>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-50">
                   <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-[var(--primary-purple)] font-black">
                      {order.user.name?.[0] || order.user.email?.[0]}
                   </div>
                   <div className="overflow-hidden">
                      <p className="font-black text-gray-900 uppercase tracking-tight truncate">{order.user.name || "Guest"}</p>
                      <p className="text-xs font-medium text-gray-400 truncate">{order.user.email}</p>
                   </div>
                </div>
                <div className="flex flex-col gap-6">
                   <div className="flex gap-4">
                      <MapPin className="w-5 h-5 text-gray-300 shrink-0" />
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Delivery Address</p>
                         <p className="text-sm font-medium text-gray-700 leading-relaxed">{order.address || "No address provided"}</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <Phone className="w-5 h-5 text-gray-300 shrink-0" />
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone Number</p>
                         <p className="text-sm font-medium text-gray-700">{order.phone || "No phone provided"}</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <Clock className="w-5 h-5 text-gray-300 shrink-0" />
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Placed At</p>
                         <p className="text-sm font-medium text-gray-700">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <CreditCard className="w-5 h-5 text-gray-300 shrink-0" />
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
                         <p className="text-sm font-medium text-gray-700">Online Payment (Paystack)</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Actions Card */}
             <div className="bg-[#1A0B2E] rounded-[40px] p-8 text-white shadow-2xl shadow-purple-900/20 relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                
                <h3 className="relative z-10 text-lg font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                   <ShieldCheck className="w-5 h-5 text-purple-400" /> Internal Operations
                </h3>
                
                <div className="relative z-10 flex flex-col gap-4">
                   <OrderActions orderId={order.id} currentStatus={order.status} />
                   <Link 
                      href={`/dashboard/invoice/${order.id}`} 
                      target="_blank"
                      className="w-full py-4 rounded-2xl border border-white/10 text-white/70 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                    >
                       <FileText className="w-4 h-4" /> View Official Invoice
                    </Link>
                </div>
                
                <p className="relative z-10 text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mt-8 text-center border-t border-white/5 pt-6">
                   Authorized Personnel Only
                </p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
