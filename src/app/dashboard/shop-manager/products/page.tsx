import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProductInventoryTable from "@/components/ProductInventoryTable";

export default async function ShopManagerProductsPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "SHOP_MANAGER" && session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    include: { category: true }
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-500 font-medium">Update stock, pricing, and product details.</p>
        </div>
      </div>

      <ProductInventoryTable products={products} />
    </div>
  );
}
