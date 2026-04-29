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

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { name: 'asc' },
      include: { category: true }
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Inventory Management</h1>
          <p className="text-gray-800 font-medium text-lg">Update stock, pricing, and product details across the catalog.</p>
        </div>
      </div>

      <ProductInventoryTable products={products} categories={categories} />
    </div>
  );
}
