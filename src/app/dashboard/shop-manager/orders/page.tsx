import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";

export default async function ShopManagerOrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "SHOP_MANAGER") {
    redirect("/dashboard");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } }
    }
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Order Fulfillment</h1>
        <p className="text-gray-500 font-medium">Manage and fulfill pending harvests.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-purple-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase font-black text-[10px] tracking-widest">
              <tr>
                <th className="px-10 py-6">Order ID</th>
                <th className="px-6 py-6">Customer</th>
                <th className="px-6 py-6">Date</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-10 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-10 py-6 font-mono text-xs text-gray-500">
                    <Link href={`/dashboard/shop-manager/orders/${order.id}`} className="hover:text-[var(--primary-purple)] hover:underline">
                      {order.id.slice(-8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="px-6 py-6 font-black text-gray-900 uppercase tracking-tight">
                    {order.user.name || order.user.email}
                  </td>
                  <td className="px-6 py-6 text-gray-500 font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-6">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-10 py-6 text-right">
                    <Link href={`/dashboard/shop-manager/orders/${order.id}`} className="text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-widest hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No orders to fulfill.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
