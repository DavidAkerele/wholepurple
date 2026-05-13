import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ChevronLeft, Package, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import Pagination from "@/components/Pagination";

export default async function OrderHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || "1");
  const ITEMS_PER_PAGE = 10;
  
  if (!session || session.user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  const [orders, totalOrders] = await Promise.all([
    prisma.order.findMany({
      where: { userId: session.user.id },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.count({ where: { userId: session.user.id } })
  ]);

  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/client" className="p-2 bg-white rounded-xl border border-gray-100 hover:text-[var(--primary-purple)] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Order History</h1>
            <p className="text-gray-800 font-medium text-sm">Review your past harvests and purchases.</p>
          </div>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
           <ShoppingBag className="w-5 h-5 text-[var(--primary-purple)]" />
           <span className="text-sm font-black uppercase tracking-widest text-gray-900">{totalOrders} Orders</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-10 md:p-20 rounded-[30px] md:rounded-[50px] border border-gray-100 shadow-2xl shadow-purple-900/5 flex flex-col items-center justify-center text-center">
          <div className="w-20 md:w-24 h-20 md:h-24 bg-purple-50 rounded-full flex items-center justify-center mb-8">
            <ShoppingBag className="w-8 md:w-10 h-8 md:h-10 text-purple-300" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">No orders yet</h2>
          <p className="text-gray-800 font-medium max-w-sm mb-10 leading-relaxed text-sm">
            Your journey with us hasn't started yet. Browse our seasonal collection to place your first order.
          </p>
          <Link href="/shop" className="btn-primary px-12">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 border border-gray-100 shadow-xl shadow-purple-900/5 group hover:border-[var(--primary-purple)] transition-all duration-500">
               {/* ... order card content ... */}
               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
                <div className="flex items-start gap-4 md:gap-6">
                   <div className="w-14 h-14 md:w-20 md:h-20 bg-gray-50 text-gray-900 rounded-2xl md:rounded-[28px] flex items-center justify-center text-[var(--primary-purple)] font-black text-lg md:text-xl shadow-inner shrink-0">
                      #
                   </div>
                   <div className="flex flex-col gap-1 overflow-hidden">
                      <h3 className="text-lg md:text-2xl font-black text-gray-900 uppercase tracking-tight truncate">Order #{order.id.substring(0, 8).toUpperCase()}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-widest">
                         <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                         <span className="hidden sm:inline w-1 h-1 bg-gray-300 rounded-full"></span>
                         <span className="flex items-center gap-1.5 text-[var(--primary-purple)]"><Package className="w-3 h-3" /> Standard Delivery</span>
                      </div>
                   </div>
                </div>

                <div className="flex flex-row items-center justify-between lg:justify-end gap-6 md:gap-12 border-t lg:border-none pt-4 lg:pt-0">
                   <div className="flex flex-col items-start lg:items-end gap-1 md:gap-2">
                      <span className={`px-3 md:px-4 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                        order.status === 'DELIVERED' || order.status === 'PAID'
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-yellow-50 text-yellow-600'
                      }`}>
                         {order.status === 'DELIVERED' && <CheckCircle2 className="w-3 h-3" />}
                         {order.status}
                      </span>
                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Status</p>
                   </div>
                   
                   <div className="w-px h-10 bg-gray-100 hidden sm:block"></div>

                   <div className="flex flex-col items-end gap-1">
                      <p className="text-xl md:text-3xl font-black text-gray-900">₦{order.total.toLocaleString()}</p>
                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Total</p>
                   </div>

                   <button className="w-10 h-10 md:w-14 md:h-14 bg-gray-50 text-gray-900 rounded-xl md:rounded-2xl flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all shrink-0">
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                   </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center mt-12">
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              baseUrl="/dashboard/client/orders" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
