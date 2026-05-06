import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminOrdersTable from "@/components/AdminOrdersTable";

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
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter uppercase">Order Management</h1>
        <p className="text-gray-600 font-medium">Monitor and fulfill customer transactions across the platform.</p>
      </div>

      <AdminOrdersTable initialOrders={orders} />
    </div>
  );
}
