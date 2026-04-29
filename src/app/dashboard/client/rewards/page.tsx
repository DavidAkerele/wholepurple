import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Gift, ChevronLeft, Star, Zap, ShoppingCart, ArrowRight, Award } from "lucide-react";

export default async function RewardsPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { rewardPoints: true }
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/client" className="p-2 bg-white rounded-xl border border-gray-100 hover:text-[var(--primary-purple)] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Whole Purple Rewards</h1>
            <p className="text-gray-500 font-medium text-sm">Earn while you eat. Redeen points for seasonal harvests.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Points Display Card */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[var(--primary-purple)] to-purple-900 p-8 md:p-16 rounded-[40px] md:rounded-[60px] text-white relative overflow-hidden group">
           <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-2xl md:rounded-[35px] flex items-center justify-center mb-6 md:mb-8 backdrop-blur-md border border-white/20">
                 <Star className="w-6 md:w-10 h-6 md:h-10 text-[var(--accent-green)] fill-[var(--accent-green)]" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-2 md:mb-4">Point Balance</h3>
              <div className="text-6xl md:text-[120px] font-black tracking-tighter leading-none mb-6 md:mb-8">
                 {user?.rewardPoints || 0}
              </div>
              <div className="bg-white/10 px-6 md:px-8 py-2 md:py-3 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-3">
                 <Zap className="w-3 md:w-4 h-3 md:h-4 text-[var(--accent-green)] fill-[var(--accent-green)]" />
                 <span className="text-[8px] md:text-xs font-black uppercase tracking-widest">Purple Tier Member</span>
              </div>
           </div>

           {/* Animated Background Elements */}
           <div className="absolute top-10 left-10 w-24 md:w-32 h-24 md:h-32 bg-white/5 rounded-full blur-2xl"></div>
           <div className="absolute bottom-10 right-10 w-32 md:w-48 h-32 md:h-48 bg-purple-400/10 rounded-full blur-3xl"></div>
           <Award className="absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 w-48 md:w-80 h-48 md:h-80 text-white/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
        </div>

        {/* Next Reward Progress */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="bg-white p-8 md:p-10 rounded-[30px] md:rounded-[50px] border border-gray-100 shadow-xl shadow-purple-900/5 flex-1 flex flex-col justify-between">
              <div>
                 <h3 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-tighter mb-6">Milestone</h3>
                 <div className="relative h-3 md:h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div className="absolute top-0 left-0 h-full bg-[var(--accent-green)] transition-all duration-1000" style={{ width: '40%' }}></div>
                 </div>
                 <div className="flex justify-between text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>{user?.rewardPoints || 0} PTS</span>
                    <span>1000 PTS</span>
                 </div>
              </div>

              <div className="mt-6 md:mt-8">
                 <p className="text-xs md:text-sm font-bold text-gray-900 mb-1 md:mb-2">₦5,000 Voucher</p>
                 <p className="text-[10px] md:text-xs text-gray-400 font-medium leading-relaxed">Keep shopping to unlock this exclusive harvest discount.</p>
              </div>

              <Link href="/shop" className="w-full mt-6 md:mt-8 bg-gray-900 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-[var(--primary-purple)] transition-all">
                 <ShoppingCart className="w-4 h-4" /> Earn Points
              </Link>
           </div>
        </div>
      </div>

      {/* Rewards Catalog Placeholder */}
      <div className="mt-8">
         <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-10">Available Rewards</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "₦1,000 Off", points: 250, desc: "Apply to any fresh harvest order." },
              { title: "Free Delivery", points: 500, desc: "Valid for one order this month." },
              { title: "Artisanal Gift", points: 750, desc: "One free mystery spice or tea." }
            ].map((reward, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[40px] border border-gray-100 group hover:border-[var(--primary-purple)] transition-all">
                 <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[var(--primary-purple)] mb-6 group-hover:scale-110 transition-transform">
                    <Gift className="w-6 h-6" />
                 </div>
                 <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">{reward.title}</h4>
                 <p className="text-xs text-gray-400 font-medium mb-8">{reward.desc}</p>
                 <button className="w-full border border-gray-100 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:bg-[var(--primary-purple)] group-hover:text-white group-hover:border-transparent transition-all">
                    {reward.points} Points Needed
                 </button>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
