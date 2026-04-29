import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Package, MapPin, Phone, Clock, CreditCard, ShoppingBag, FileText } from "lucide-react";
import Image from "next/image";
import StatusBadge from "@/components/StatusBadge";

export default async function ClientOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;
  
  if (!session || session.user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  const order = await prisma.order.findUnique({
    where: { id: resolvedParams.id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order || order.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/client/orders" className="p-2 bg-white rounded-xl border border-gray-100 hover:text-[var(--primary-purple)] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Order Details</h1>
            <p className="text-gray-800 font-medium text-sm flex items-center gap-2">
               #{order.id.slice(-8).toUpperCase()} • {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <StatusBadge status={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
           {/* Items Card */}
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-purple-900/5 p-8 md:p-10">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-8">Your Items</h3>
              <div className="flex flex-col gap-6">
                 {order.items.map((item) => (
                   <div key={item.id} className="flex items-center gap-6 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="relative w-20 h-20 bg-gray-50 text-gray-900 rounded-2xl overflow-hidden shrink-0">
                         {item.product.image ? (
                           <Image src={item.product.image.startsWith('http') ? item.product.image : `/images/scraped/${item.product.image}`} alt={item.product.name} fill className="object-contain p-2" />
                         ) : (
                           <Image src="/images/scraped/woocommerce-placeholder.webp" alt={item.product.name} fill className="object-contain p-2 opacity-20" />
                         )}
                      </div>
                      <div className="flex-1 min-w-0">
                         <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight truncate">{item.product.name}</h4>
                         <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-1">{item.quantity} x ₦{item.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-black text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                   </div>
                 ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col gap-3 text-right">
                 <div className="flex justify-end gap-12 text-2xl font-black text-gray-900">
                    <span className="uppercase tracking-tighter">Total Paid</span>
                    <span className="text-[var(--primary-purple)]">₦{order.total.toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-8">
           {/* Logistics Info */}
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-purple-900/5 p-8 flex flex-col gap-6">
              <div className="flex gap-4">
                 <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
                 <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1 text-left">Delivery Address</p>
                    <p className="text-sm font-medium text-gray-700 text-left">{order.address}</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <Phone className="w-5 h-5 text-gray-500 shrink-0" />
                 <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1 text-left">Contact Number</p>
                    <p className="text-sm font-medium text-gray-700 text-left">{order.phone}</p>
                 </div>
              </div>
           </div>

           {/* Invoice Action */}
           <div className="bg-[var(--primary-purple)] rounded-[40px] p-8 text-white shadow-2xl shadow-purple-900/20 text-center flex flex-col gap-6">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                 <FileText className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-lg font-black uppercase tracking-tight mb-2">Need an Invoice?</h3>
                 <p className="text-xs text-purple-100 font-medium leading-relaxed">
                    Download your official harvest receipt for your records.
                 </p>
              </div>
              <Link 
                href={`/dashboard/invoice/${order.id}`} 
                target="_blank"
                className="w-full py-4 bg-white text-[var(--primary-purple)] rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
              >
                 View & Print Invoice
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
