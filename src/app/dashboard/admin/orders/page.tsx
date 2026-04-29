import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "ADMIN") {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Orders</h1>
        <p className="text-gray-800">View all transactions across the platform.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 text-gray-800 uppercase font-bold text-xs">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 text-gray-900/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-gray-800">
                    <Link href={`/dashboard/admin/orders/${order.id}`} className="hover:text-[var(--primary-purple)] hover:underline">
                      {order.id.slice(-8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.user.name || order.user.email}
                  </td>
                  <td className="px-6 py-4 font-bold text-[var(--primary-purple)]">
                    ₦{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/admin/orders/${order.id}`} className="text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-800">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
