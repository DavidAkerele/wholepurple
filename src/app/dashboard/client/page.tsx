import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingBag, 
  Wallet, 
  Gift, 
  Users, 
  ArrowUpRight, 
  ChevronRight,
  Star,
  Zap
} from "lucide-react";

export default async function ClientDashboard() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  // Get user details and orders
  const [userData, orders] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { rewardPoints: true, walletBalance: true, createdAt: true }
    }),
    prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ]);

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-white p-6 md:p-10 rounded-[30px] md:rounded-[50px] border border-gray-100 shadow-2xl shadow-purple-900/5">
        <div className="relative z-10">
          <span className="text-[var(--primary-purple)] font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-4 block">My Profile</span>
          <div className="flex items-center gap-6 mb-4">
             {session.user.image ? (
               <Image src={session.user.image} alt={session.user.name || ""} width={64} height={64} className="rounded-2xl border-2 border-purple-100 shadow-lg object-cover" />
             ) : (
               <div className="w-16 h-16 bg-[var(--primary-purple)] text-white rounded-2xl flex items-center justify-center text-2xl font-black">
                 {session.user.name?.charAt(0)}
               </div>
             )}
             <div>
               <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                 Welcome back, <br /> <span className="text-[var(--primary-purple)]">{session.user.name}</span>
               </h1>
             </div>
          </div>
          <p className="text-sm md:text-lg text-gray-800 font-medium max-w-md leading-relaxed">
            Manage your harvests, track your loyalty rewards, and explore your personal Whole Purple experience.
          </p>
        </div>
        {/* Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50 to-transparent pointer-events-none opacity-50"></div>
        <Zap className="absolute -bottom-10 -right-10 w-48 md:w-64 h-48 md:h-64 text-purple-100 rotate-12 opacity-30 md:opacity-100" />
      </div>

      {/* Gamified Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Loyalty Points */}
        <div className="bg-[var(--primary-purple)] p-8 rounded-[30px] md:rounded-[40px] text-white relative overflow-hidden group">
          <div className="relative z-10">
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Gift className="w-6 h-6 text-white" />
             </div>
             <h3 className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Loyalty Points</h3>
             <div className="text-4xl font-black mb-2">{userData?.rewardPoints || 0} <span className="text-sm font-bold opacity-60">PTS</span></div>
             <p className="text-xs font-medium text-white/70 mb-6">You're only 500 points away from a ₦5,000 voucher!</p>
             <Link href="/shop" className="inline-flex items-center gap-2 bg-white text-[var(--primary-purple)] px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                Redeem Now <ArrowUpRight className="w-3 h-3" />
             </Link>
          </div>
          <Star className="absolute -top-4 -right-4 w-32 h-32 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-500" />
        </div>

        {/* Wallet */}
        <div className="bg-white p-8 rounded-[30px] md:rounded-[40px] border border-gray-100 shadow-xl shadow-purple-900/5 relative overflow-hidden group">
          <div className="relative z-10">
             <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6 text-[var(--accent-green)]" />
             </div>
             <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2">My Wallet</h3>
             <div className="text-4xl font-black text-gray-900 mb-2">₦{(userData?.walletBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
             <p className="text-xs font-medium text-gray-600 mb-6">Use your wallet for faster, one-click checkouts.</p>
             <Link href="/dashboard/client/wallet" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                Top Up <ArrowUpRight className="w-3 h-3" />
             </Link>
          </div>
          <Wallet className="absolute -bottom-4 -right-4 w-32 h-32 text-gray-50 rotate-12 group-hover:scale-110 transition-transform duration-500" />
        </div>

        {/* Referral System */}
        <div className="bg-[#1A0B2E] p-8 rounded-[30px] md:rounded-[40px] text-white relative overflow-hidden group">
          <div className="relative z-10">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[var(--accent-green)]" />
             </div>
             <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Refer & Earn</h3>
             <div className="text-xl font-black mb-2 leading-tight">Give ₦2,000 <br /> Get ₦2,000</div>
             <p className="text-xs font-medium text-white/50 mb-6">Invite your friends to experience Whole Purple.</p>
             <Link href="/dashboard/client/referrals" className="inline-flex items-center gap-2 bg-[var(--accent-green)] text-gray-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                Invite <ChevronRight className="w-3 h-3" />
             </Link>
          </div>
          <Users className="absolute -top-4 -right-4 w-32 h-32 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-500" />
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white p-6 md:p-10 rounded-[30px] md:rounded-[50px] border border-gray-100 shadow-2xl shadow-purple-900/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter">Recent Harvests</h2>
          <Link href="/dashboard/client/orders" className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-purple)] hover:underline flex items-center gap-2">
             View All History <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-800 text-center">
            <div className="w-16 h-16 bg-gray-50 text-gray-900 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-gray-500" />
            </div>
            <p className="font-medium text-sm mb-6">No harvests found yet.</p>
            <Link href="/shop" className="btn-primary">Browse the Shop</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
             {orders.map((order) => (
                <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50 text-gray-900/50 rounded-3xl border border-gray-100 hover:border-[var(--primary-purple)] transition-all group gap-6">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center text-[var(--primary-purple)] font-black shadow-sm group-hover:scale-110 transition-transform">
                         #
                      </div>
                      <div>
                         <h4 className="font-black text-gray-900 uppercase tracking-tight">Order #{order.id.substring(0, 8).toUpperCase()}</h4>
                         <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                   </div>
                   <div className="flex items-center justify-between sm:justify-end gap-8 md:gap-12 border-t sm:border-none pt-4 sm:pt-0">
                      <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${
                        order.status === 'DELIVERED' || order.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                         {order.status}
                      </span>
                      <div className="text-right">
                         <p className="text-base md:text-lg font-black text-gray-900">₦{order.total.toLocaleString()}</p>
                         <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-600">Total Amount</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
  );
}
