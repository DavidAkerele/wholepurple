import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Wallet, ChevronLeft, Plus, ArrowUpRight, History, ShieldCheck } from "lucide-react";

export default async function WalletPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/client" className="p-2 bg-white rounded-xl border border-gray-100 hover:text-[var(--primary-purple)] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">My Wallet</h1>
            <p className="text-gray-800 font-medium text-sm">Manage your funds and seamless payments.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Wallet Balance Card */}
        <div className="lg:col-span-2 bg-[#1A0B2E] p-8 md:p-12 rounded-[30px] md:rounded-[50px] text-white relative overflow-hidden flex flex-col justify-between min-h-[300px] md:min-h-[350px]">
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 md:mb-12">
                 <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center">
                    <Wallet className="w-6 md:w-8 h-6 md:h-8 text-[var(--accent-green)]" />
                 </div>
                 <div className="bg-white/10 px-3 md:px-4 py-2 rounded-full border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                    Active Balance
                 </div>
              </div>
              <h3 className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] text-white/40 mb-2 md:mb-4">Total Balance</h3>
              <div className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                ₦0<span className="text-2xl md:text-4xl opacity-40">.00</span>
              </div>
           </div>

           <div className="relative z-10 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[var(--accent-green)] text-gray-900 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 hover:scale-105 transition-all">
                 <Plus className="w-4 h-4" /> Top Up Wallet
              </button>
              <button className="flex-1 bg-white/10 border border-white/10 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                 <ArrowUpRight className="w-4 h-4" /> Withdraw
              </button>
           </div>

           {/* Background Circles */}
           <div className="absolute -top-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Quick Perks */}
        <div className="bg-white p-8 md:p-10 rounded-[30px] md:rounded-[50px] border border-gray-100 shadow-xl shadow-purple-900/5 flex flex-col gap-6 md:gap-8">
           <h3 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-tighter">Benefits</h3>
           
           <div className="flex gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl md:rounded-2xl flex items-center justify-center text-[var(--accent-green)] shrink-0">
                 <ShieldCheck className="w-5 md:w-6 h-5 md:h-6" />
              </div>
              <div>
                 <h4 className="font-black text-xs md:text-sm text-gray-900 uppercase tracking-tight mb-1">One-Click Checkout</h4>
                 <p className="text-[10px] md:text-xs text-gray-600 font-medium leading-relaxed">Skip forms. Pay instantly with your balance.</p>
              </div>
           </div>

           <div className="flex gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-xl md:rounded-2xl flex items-center justify-center text-[var(--primary-purple)] shrink-0">
                 <Plus className="w-5 md:w-6 h-5 md:h-6" />
              </div>
              <div>
                 <h4 className="font-black text-xs md:text-sm text-gray-900 uppercase tracking-tight mb-1">Instant Refunds</h4>
                 <p className="text-[10px] md:text-xs text-gray-600 font-medium leading-relaxed">Cancellations are credited immediately.</p>
              </div>
           </div>

           <div className="mt-auto p-4 md:p-6 bg-gray-50 text-gray-900 rounded-2xl md:rounded-3xl border border-gray-100">
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2">Secure Payments</p>
              <p className="text-[10px] md:text-xs font-bold text-gray-900">Protected by industry-leading encryption.</p>
           </div>
        </div>
      </div>

      {/* Transaction History Placeholder */}
      <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-2xl shadow-purple-900/5">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Transaction History</h2>
          <div className="p-2 bg-gray-50 text-gray-900 rounded-xl">
             <History className="w-5 h-5 text-gray-600" />
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-20 text-center">
           <div className="w-20 h-20 bg-gray-50 text-gray-900 rounded-full flex items-center justify-center mb-6">
              <History className="w-8 h-8 text-gray-200" />
           </div>
           <p className="text-gray-600 font-medium text-sm">No transactions found in your history.</p>
        </div>
      </div>
    </div>
  );
}
