import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getBuilders } from "@/app/actions/builder";
import BuilderManagement from "@/components/BuilderManagement";

export default async function AdminBuildersPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "ADMIN" && session?.user.role !== "SHOP_MANAGER") {
    redirect("/dashboard");
  }

  const builders = await getBuilders();

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Bowl Builders</h1>
          <p className="text-gray-800 font-medium text-lg">Configure ingredients, pricing, and rules for custom meal builders.</p>
        </div>
      </div>

      <BuilderManagement builders={builders} />
    </div>
  );
}
