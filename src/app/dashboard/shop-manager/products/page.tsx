import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProductInventoryTable from "@/components/ProductInventoryTable";
import Pagination from "@/components/Pagination";

export default async function ShopManagerProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || "1");
  const ITEMS_PER_PAGE = 10;
  
  if (session?.user.role !== "SHOP_MANAGER" && session?.user.role !== "SYSTEM_ADMIN") {
    redirect("/dashboard");
  }

  const [products, categories, totalProducts] = await Promise.all([
    prisma.product.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: { name: 'asc' },
      include: { category: true }
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' }
    }),
    prisma.product.count()
  ]);

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Inventory Management</h1>
          <p className="text-gray-800 font-medium text-lg">Update stock, pricing, and product details across the catalog.</p>
        </div>
      </div>

      <ProductInventoryTable products={products} categories={categories} />

      <div className="flex justify-center mt-8">
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          baseUrl="/dashboard/shop-manager/products" 
        />
      </div>
    </div>
  );
}
