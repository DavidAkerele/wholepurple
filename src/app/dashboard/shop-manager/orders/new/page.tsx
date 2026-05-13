import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CreateOrderForm from "@/components/CreateOrderForm";

export default async function NewOrderPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "SHOP_MANAGER" && session?.user.role !== "SYSTEM_ADMIN") {
    redirect("/dashboard");
  }

  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    include: { category: true }
  });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Order</h1>
        <p className="text-gray-800 font-medium">Manually process an order for a customer.</p>
      </div>

      <CreateOrderForm products={products} />
    </div>
  );
}
