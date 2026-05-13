import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CustomerBulkUpload from "@/components/CustomerBulkUpload";
import UserManagementTable from "@/components/UserManagementTable";
import { Users, ShieldCheck, UserPlus, Info } from "lucide-react";

export default async function AdminUsersPage({
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

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.user.count()
  ]);

  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-[var(--primary-purple)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black text-[var(--primary-purple)] uppercase tracking-[0.3em]">Identity & Access</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Users & Roles</h1>
          <p className="text-gray-800 font-medium text-lg mt-2">Manage permissions, oversee registrations, and audit platform access.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <Users className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Accounts</p>
                <p className="text-xl font-black text-gray-900">{totalUsers}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Action Area: Bulk Upload & Information */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
           <UserManagementTable 
             users={users} 
             totalUsers={totalUsers} 
             currentPage={currentPage} 
             totalPages={totalPages} 
           />
        </div>
        
        <div className="flex flex-col gap-8">
          <CustomerBulkUpload />
          
          {/* Quick Info Card */}
          <div className="bg-purple-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Info className="w-6 h-6 text-purple-200" />
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">Role Definitions</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-1 h-10 bg-red-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-1">Admin</p>
                    <p className="text-xs text-purple-100/70 leading-relaxed">Full system access, including financial settings and user deletions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 h-10 bg-purple-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-purple-400 mb-1">Shop Manager</p>
                    <p className="text-xs text-purple-100/70 leading-relaxed">Inventory control, order fulfillment, and operational management.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 h-10 bg-green-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-green-400 mb-1">Client</p>
                    <p className="text-xs text-purple-100/70 leading-relaxed">Standard customer account with access to orders and wallet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
