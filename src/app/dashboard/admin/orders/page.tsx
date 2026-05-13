import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminOrdersTable from "@/components/AdminOrdersTable";
import Pagination from "@/components/Pagination";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || "1");
  const ITEMS_PER_PAGE = 10;
  
  if (session?.user.role !== "SYSTEM_ADMIN") {
    redirect("/dashboard");
  }

  const [orders, totalOrders] = await Promise.all([
    prisma.order.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } }
      }
    }),
    prisma.order.count()
  ]);

  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter uppercase">Order Management</h1>
        <p className="text-gray-600 font-medium">Monitor and fulfill customer transactions across the platform.</p>
      </div>

      <AdminOrdersTable initialOrders={orders} />
      
      <div className="flex justify-center mt-4">
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          baseUrl="/dashboard/admin/orders" 
        />
      </div>
    </div>
  );
}
