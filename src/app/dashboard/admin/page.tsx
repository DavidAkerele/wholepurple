import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  TrendingUp, 
  TrendingDown, 
  Users as UsersIcon, 
  Package, 
  ShoppingBag, 
  Plus, 
  ArrowRight,
  Activity,
  AlertCircle
} from "lucide-react";
import { SalesChart, OrderStatusChart, CategoryDistributionChart } from "@/components/DashboardCharts";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "SYSTEM_ADMIN") {
    redirect("/dashboard");
  }

  // Fetch Core Metrics
  const [totalUsers, totalProducts, totalOrders, revenueData, pendingOrdersCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      _avg: { total: true },
    }),
    prisma.order.count({ where: { status: "PENDING" } })
  ]);

  const totalRevenue = revenueData._sum.total || 0;
  const avgOrderValue = revenueData._avg.total || 0;

  // 1. Revenue Trajectory (Last 7 Days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const ordersLast7Days = await prisma.order.findMany({
    where: {
      createdAt: { gte: last7Days[0] }
    },
    select: {
      total: true,
      createdAt: true
    }
  });

  const salesData = last7Days.map(date => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayTotal = ordersLast7Days
      .filter(o => new Date(o.createdAt).toDateString() === date.toDateString())
      .reduce((sum, o) => sum + o.total, 0);
    return { name: dayName, sales: dayTotal };
  });

  // 2. Fulfillment Matrix (Order Statuses)
  const orderStatuses = await prisma.order.groupBy({
    by: ['status'],
    _count: { id: true }
  });

  const orderStatusData = orderStatuses.map(s => ({
    name: s.status.charAt(0) + s.status.slice(1).toLowerCase(),
    value: s._count.id
  }));

  // 3. Category Distribution (Revenue)
  const categoryRevenue = await prisma.orderItem.findMany({
    include: {
      product: {
        include: { category: true }
      }
    }
  });

  const categoryMap: Record<string, number> = {};
  categoryRevenue.forEach(item => {
    const catName = item.product.category.name;
    categoryMap[catName] = (categoryMap[catName] || 0) + (item.price * item.quantity);
  });

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  // 4. Inventory Health
  const inStock = await prisma.product.count({ where: { stock: { gt: 10 } } });
  const lowStock = await prisma.product.count({ where: { stock: { gt: 0, lte: 10 } } });
  const outOfStock = await prisma.product.count({ where: { stock: 0 } });
  const totalInv = inStock + lowStock + outOfStock;

  // 5. Recent Activity
  const recentOrders = await prisma.order.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  // 6. Top Products
  const topProductsRaw = await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5
  });

  const topProducts = await Promise.all(topProductsRaw.map(async (p) => {
    const product = await prisma.product.findUnique({ where: { id: p.productId } });
    return {
      name: product?.name || 'Unknown',
      sales: p._sum.quantity || 0,
      price: product?.price || 0
    };
  }));

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-20">
      {/* Header with Glassmorphism Search or Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-[var(--primary-purple)]">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black text-[var(--primary-purple)] uppercase tracking-[0.3em]">System Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-gray-800 font-medium text-lg mt-2">Real-time platform insights and operational control.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Link 
            href="/dashboard/shop-manager/products" 
            className="flex items-center gap-2 bg-[var(--primary-purple)] text-white px-6 py-4 rounded-2xl font-black text-sm shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Product
          </Link>
          <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            {['Today', 'Month', 'Year'].map((period) => (
              <button 
                key={period}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${period === 'Month' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
        <MetricCard 
          title="Total Revenue" 
          value={`₦${totalRevenue.toLocaleString()}`} 
          trend="+24%" 
          isUp={true} 
          icon={ShoppingBag} 
          color="purple" 
        />
        <MetricCard 
          title="Customer Base" 
          value={totalUsers.toLocaleString()} 
          trend="+18%" 
          isUp={true} 
          icon={UsersIcon} 
          color="green" 
        />
        <MetricCard 
          title="Avg Order Value" 
          value={`₦${avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
          trend="-3%" 
          isUp={false} 
          icon={TrendingUp} 
          color="red" 
        />
        <MetricCard 
          title="Pending Orders" 
          value={pendingOrdersCount.toString()} 
          alert={pendingOrdersCount > 0} 
          icon={Package} 
          color="orange" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Column: Charts */}
        <div className="xl:col-span-3 flex flex-col gap-8">
          <SalesChart data={salesData} title="Revenue Trajectory (Weekly)" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategoryDistributionChart data={categoryData} title="Revenue by Category" />
            <OrderStatusChart data={orderStatusData} title="Fulfillment Matrix" />
          </div>

          {/* Top Products Table */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Best Selling Products</h2>
              <Link href="/dashboard/shop-manager/products" className="text-xs font-black text-[var(--primary-purple)] flex items-center gap-1 hover:underline">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {topProducts.length > 0 ? topProducts.map((p, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center font-black text-gray-600 group-hover:bg-purple-50 group-hover:text-[var(--primary-purple)] transition-all">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-600 font-medium">{p.sales} sales • ₦{p.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="h-2 w-24 bg-gray-50 text-gray-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--primary-purple)] rounded-full transition-all duration-1000" 
                      style={{ width: `${(p.sales / (topProducts[0]?.sales || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              )) : (
                <p className="text-center py-10 text-gray-600 font-bold">No sales data yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Feed & Health */}
        <div className="flex flex-col gap-8">
          {/* Live Activity */}
          <div className="bg-gray-900 p-8 rounded-[40px] shadow-2xl text-white flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight">Live Activity</h2>
                <p className="text-gray-400 text-xs font-medium mt-1">Real-time transaction log</p>
              </div>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            
            <div className="flex flex-col gap-6">
              {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                <div key={order.id} className="flex gap-4 items-start border-l-2 border-gray-800 pl-4 py-1 hover:border-[var(--primary-purple)] transition-colors group">
                  <div className="flex flex-col">
                    <p className="text-sm font-black group-hover:text-[var(--primary-purple)] transition-colors">Order #{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">{order.user.email} • ₦{order.total.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-2">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 text-sm font-bold py-10 text-center">Waiting for new orders...</p>
              )}
            </div>
            
            <Link href="/dashboard/admin/orders" className="mt-4 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-center text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Detailed Transaction Logs
            </Link>
          </div>

          {/* Inventory Health */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Inventory Health</h2>
            <div className="flex flex-col gap-8">
              <HealthBar label="Optimal Stock" value={inStock} total={totalInv} color="bg-green-500" />
              <HealthBar label="Low Stock Alert" value={lowStock} total={totalInv} color="bg-orange-400" />
              <HealthBar label="Out of Stock" value={outOfStock} total={totalInv} color="bg-red-500" />
            </div>
            {outOfStock > 0 && (
              <Link href="/dashboard/shop-manager/products?stock=out" className="mt-10 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 hover:bg-red-100/50 transition-all">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-xs font-bold text-red-700">Action needed: {outOfStock} products are currently unavailable.</p>
              </Link>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="bg-purple-50 p-8 rounded-[40px] border border-purple-100">
            <h2 className="text-lg font-black text-[var(--primary-purple)] mb-6 tracking-tight">Quick Insights</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-purple-100">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Active Users</p>
                <p className="text-xl font-black text-gray-900 mt-1">{totalUsers}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-purple-100">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Total SKU</p>
                <p className="text-xl font-black text-gray-900 mt-1">{totalProducts}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, isUp, icon: Icon, color, alert }: any) {
  const colors: any = {
    purple: "bg-purple-50 text-[var(--primary-purple)] border-purple-100 group-hover:border-[var(--primary-purple)]",
    green: "bg-green-50 text-green-600 border-green-100 group-hover:border-green-600",
    red: "bg-red-50 text-red-600 border-red-100 group-hover:border-red-600",
    orange: "bg-orange-50 text-orange-500 border-orange-100 group-hover:border-orange-500"
  };

  return (
    <div className={`bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm transition-all duration-300 group hover:shadow-xl hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-8">
        <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg] ${colors[color]}`}>
          <Icon className="w-7 h-7" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1.5 rounded-full ${isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{trend}</span>
          </div>
        )}
        {alert && (
          <div className="flex items-center gap-1 text-orange-600 text-[10px] font-black bg-orange-50 px-3 py-1.5 rounded-full animate-pulse">
            <span>Action Required</span>
          </div>
        )}
      </div>
      <div>
        <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">{title}</span>
        <div className="text-3xl font-black text-gray-900 mt-2 tracking-tight">{value}</div>
      </div>
    </div>
  );
}

function HealthBar({ label, value, total, color }: any) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
        <span>{label}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-3 w-full bg-gray-50 text-gray-900 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
}

