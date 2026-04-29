import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TrendingUp, TrendingDown, Users as UsersIcon, Package, ShoppingBag } from "lucide-react";
import { SalesChart, OrderStatusChart } from "@/components/DashboardCharts";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch metrics
  const [totalUsers, totalProducts, totalOrders, revenueData] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      _avg: { total: true },
    })
  ]);

  const totalRevenue = revenueData._sum.total || 0;
  const avgOrderValue = revenueData._avg.total || 0;
  const pendingOrders = await prisma.order.count({ where: { status: "PENDING" } });

  // Mock data for charts
  const salesData = [
    { name: 'Mon', sales: 45000 },
    { name: 'Tue', sales: 52000 },
    { name: 'Wed', sales: 48000 },
    { name: 'Thu', sales: 61000 },
    { name: 'Fri', sales: 55000 },
    { name: 'Sat', sales: 67000 },
    { name: 'Sun', sales: 72000 },
  ];

  const orderStatusData = [
    { name: 'Pending', value: 12 },
    { name: 'Shipped', value: 45 },
    { name: 'Delivered', value: 89 },
    { name: 'Cancelled', value: 5 },
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Executive Dashboard</h1>
          <p className="text-gray-500 font-medium text-base md:text-lg">Platform performance and strategic oversight.</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 bg-white p-2 rounded-2xl border border-gray-100 self-start md:self-end overflow-x-auto max-w-full">
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-xs md:sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">Today</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-xs md:sm font-bold bg-[var(--primary-purple)] text-white shadow-lg shadow-purple-100 transition-all">Month</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-xs md:sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">Year</button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6 group hover:border-[var(--primary-purple)] transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-50 rounded-[20px] md:rounded-[22px] flex items-center justify-center text-[var(--primary-purple)] group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-[10px] md:text-xs font-black bg-green-50 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24%</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Total Revenue</span>
            <div className="text-2xl md:text-3xl font-black text-gray-900 mt-2">₦{totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6 group hover:border-[var(--accent-green)] transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-[20px] md:rounded-[22px] flex items-center justify-center text-[var(--accent-green)] group-hover:scale-110 transition-transform">
              <UsersIcon className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-[10px] md:text-xs font-black bg-green-50 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18%</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Customer Base</span>
            <div className="text-2xl md:text-3xl font-black text-gray-900 mt-2">{totalUsers}</div>
          </div>
        </div>

        {/* AOV Card */}
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6 group hover:border-[var(--accent-red)] transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-red-50 rounded-[20px] md:rounded-[22px] flex items-center justify-center text-[var(--accent-red)] group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div className="flex items-center gap-1 text-red-600 text-[10px] md:text-xs font-black bg-red-50 px-3 py-1.5 rounded-full">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-3%</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Avg Order Value</span>
            <div className="text-2xl md:text-3xl font-black text-gray-900 mt-2">₦{avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6 group hover:border-orange-200 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-50 rounded-[20px] md:rounded-[22px] flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            {pendingOrders > 0 && (
              <div className="flex items-center gap-1 text-orange-600 text-[10px] font-black bg-orange-50 px-3 py-1.5 rounded-full animate-pulse">
                <span>Action Required</span>
              </div>
            )}
          </div>
          <div>
            <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Pending Orders</span>
            <div className="text-2xl md:text-3xl font-black text-gray-900 mt-2">{pendingOrders}</div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">
          <SalesChart data={salesData} title="Revenue Trajectory (Weekly)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <OrderStatusChart data={orderStatusData} title="Fulfillment Matrix" />
            <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6">
              <h2 className="text-xl font-bold text-gray-900">Inventory Health</h2>
              <div className="flex-1 flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>In Stock</span>
                    <span>85%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent-green)] w-[85%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>Low Stock</span>
                    <span>12%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 w-[12%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>Out of Stock</span>
                    <span>3%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent-red)] w-[3%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 flex flex-col gap-8 h-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Live Activity Feed</h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-purple-50 transition-colors">
                    <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-purple)]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-black text-gray-900 truncate">New order #WP-102{i}</p>
                    <p className="text-xs text-gray-500 font-medium truncate">₦{(15000 + i * 2500).toLocaleString()} • {i * 10}m ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-auto w-full py-4 rounded-2xl border border-gray-100 text-xs font-black text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest">
              View Detailed Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

