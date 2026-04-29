import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TrendingUp, Package, ShoppingBag, Clock, AlertTriangle, CheckCircle2, Truck, Activity } from "lucide-react";
import { SalesChart, OrderStatusChart } from "@/components/DashboardCharts";
import Link from "next/link";
import Image from "next/image";
import StatusBadge from "@/components/StatusBadge";

export default async function ShopManagerDashboard() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "SHOP_MANAGER") {
    redirect("/dashboard");
  }

  const [totalProducts, pendingOrders, recentOrders, lowStockProducts] = await Promise.all([
    prisma.product.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({
       take: 5,
       orderBy: { createdAt: 'desc' },
       include: { user: { select: { name: true } } }
    }),
    prisma.product.findMany({
       take: 3,
       where: { price: { gt: 0 } }, // Placeholder for 'stock < 5' logic if we had a stock field
    })
  ]);

  // Mock data for shop manager charts
  const inventoryData = [
    { name: 'Fruits', value: 45 },
    { name: 'Vegetables', value: 52 },
    { name: 'Spices', value: 38 },
    { name: 'Teas', value: 24 },
    { name: 'Builders', value: 18 },
  ];

  const fulfillmentData = [
    { name: 'Mon', sales: 12 },
    { name: 'Tue', sales: 15 },
    { name: 'Wed', sales: 10 },
    { name: 'Thu', sales: 22 },
    { name: 'Fri', sales: 18 },
    { name: 'Sat', sales: 25 },
    { name: 'Sun', sales: 30 },
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Operations Hub</h1>
          <p className="text-gray-800 font-medium text-lg">Inventory oversight and fulfillment logistics.</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 bg-white p-2 rounded-2xl border border-gray-100 self-start md:self-end">
           <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Status
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Products Card */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6 group hover:border-[var(--primary-purple)] transition-all">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-purple-50 rounded-[22px] flex items-center justify-center text-[var(--primary-purple)] group-hover:scale-110 transition-transform">
              <Package className="w-7 h-7" />
            </div>
            <Link href="/dashboard/shop-manager/products" className="text-[10px] font-black text-[var(--primary-purple)] uppercase tracking-widest hover:underline">Manage</Link>
          </div>
          <div>
            <span className="text-xs font-black text-gray-600 uppercase tracking-[0.2em]">Active Inventory</span>
            <div className="text-3xl font-black text-gray-900 mt-2">{totalProducts} Items</div>
          </div>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6 group hover:border-orange-200 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-orange-50 rounded-[22px] flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-1 text-orange-600 text-[10px] font-black bg-orange-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
              Action Required
            </div>
          </div>
          <div>
            <span className="text-xs font-black text-gray-600 uppercase tracking-[0.2em]">Pending Orders</span>
            <div className="text-3xl font-black text-gray-900 mt-2">{pendingOrders}</div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6 group hover:border-red-200 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-red-50 rounded-[22px] flex items-center justify-center text-[var(--accent-red)] group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1.5 rounded-full uppercase tracking-widest">3 Alerts</span>
          </div>
          <div>
            <span className="text-xs font-black text-gray-600 uppercase tracking-[0.2em]">Critical Levels</span>
            <div className="text-3xl font-black text-gray-900 mt-2">{lowStockProducts.length} Skus</div>
          </div>
        </div>

        {/* Fulfillment Rate */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6 group hover:border-green-200 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-green-50 rounded-[22px] flex items-center justify-center text-[var(--accent-green)] group-hover:scale-110 transition-transform">
              <Truck className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest">Excellent</span>
          </div>
          <div>
            <span className="text-xs font-black text-gray-600 uppercase tracking-[0.2em]">Dispatch Rate</span>
            <div className="text-3xl font-black text-gray-900 mt-2">98.4%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <OrderStatusChart data={inventoryData} title="Inventory Distribution" />
        <SalesChart data={fulfillmentData} title="Fulfillment Velocity" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Recent Activity Feed */}
        <div className="xl:col-span-3 bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-purple-900/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent Fulfillments</h2>
            <Link href="/dashboard/shop-manager/orders" className="text-xs font-black text-[var(--primary-purple)] uppercase tracking-widest hover:underline">View All Orders</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <Link 
                  key={order.id} 
                  href={`/dashboard/shop-manager/orders/${order.id}`}
                  className="flex items-center justify-between p-6 rounded-3xl hover:bg-gray-50 text-gray-900 transition-all border border-transparent hover:border-gray-100 group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-[var(--primary-purple)] font-black group-hover:scale-110 transition-transform">
                      {order.user.name?.[0] || 'G'}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{order.user.name || 'Guest'}</p>
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">Order #{order.id.slice(-6).toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="text-sm font-black text-gray-900">₦{order.total.toLocaleString()}</span>
                    <StatusBadge status={order.status} />
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-600 bg-gray-50 text-gray-900/50 rounded-3xl border border-dashed border-gray-200">
                <p className="font-bold uppercase tracking-widest text-xs">No Recent Orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Operational Performance */}
        <div className="flex flex-col gap-8">
           <div className="bg-[#1A0B2E] p-8 rounded-[40px] text-white relative overflow-hidden group h-full">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              
              <h3 className="relative z-10 text-lg font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                 <Activity className="w-5 h-5 text-purple-400" /> Operational Health
              </h3>
              
              <div className="relative z-10 flex flex-col gap-8">
                 <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-purple-300">
                       <span>Prep Efficiency</span>
                       <span>92%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-purple-500 w-[92%]" />
                    </div>
                 </div>

                 <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-purple-300">
                       <span>Inventory Accuracy</span>
                       <span>100%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-green-400 w-full" />
                    </div>
                 </div>

                 <div className="bg-white/5 rounded-[32px] p-6 mt-4 border border-white/5">
                    <p className="text-[10px] font-black text-purple-300 uppercase tracking-[0.2em] mb-2">Manager Note</p>
                    <p className="text-sm font-medium text-purple-100 leading-relaxed italic">
                       "Focus on dispatching all morning harvests before 11 AM today."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
