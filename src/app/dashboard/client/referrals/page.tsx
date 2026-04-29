import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, ChevronLeft, Copy, Share2, Gift, Send, UserPlus } from "lucide-react";

export default async function ReferralsPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  const referralCode = `PURPLE-${session.user.id.substring(0, 5).toUpperCase()}`;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/client" className="p-2 bg-white rounded-xl border border-gray-100 hover:text-[var(--primary-purple)] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Refer & Earn</h1>
            <p className="text-gray-800 font-medium text-sm">Grow the Whole Purple community and earn harvest credits.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#FAF7F2] border border-purple-100 rounded-[30px] md:rounded-[60px] p-6 md:p-20 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
           <div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-purple)] rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-6 md:mb-8 shadow-xl shadow-purple-900/20">
                 <UserPlus className="w-6 md:w-8 h-6 md:h-8" />
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-tight md:leading-[0.9] mb-6 md:mb-8">
                Share the <br /> <span className="text-[var(--primary-purple)]">Freshness</span>
              </h2>
              <p className="text-base md:text-xl text-gray-800 font-medium leading-relaxed mb-8 md:mb-10 max-w-md">
                Invite your friends to experience ethical sourcing. They get <span className="text-gray-900 font-black italic">₦2,000 off</span> their first harvest, and you get <span className="text-gray-900 font-black italic">₦2,000 credit</span> in your wallet.
              </p>
              
              <div className="flex flex-col gap-4">
                 <label className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 ml-1">Your Unique Invite Code</label>
                 <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white border border-gray-100 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 font-black text-base md:text-xl tracking-widest text-[var(--primary-purple)] shadow-sm">
                       {referralCode}
                    </div>
                    <button className="w-14 h-14 md:w-20 md:h-full aspect-square bg-gray-900 text-white rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-[var(--primary-purple)] transition-all shrink-0">
                       <Copy className="w-5 md:w-6 h-5 md:h-6" />
                    </button>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mt-8 md:mt-12">
                 <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[var(--primary-purple)] text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:shadow-2xl transition-all group">
                    Send Invites <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </button>
                 <button className="flex items-center gap-3 text-gray-800 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] md:text-xs transition-colors">
                    <Share2 className="w-4 h-4" /> Share Socially
                 </button>
              </div>
           </div>

           <div className="flex flex-col gap-4 md:gap-6">
              {[
                { step: "01", title: "Invite Friends", desc: "Send your code via email or social media.", icon: <Send className="w-4 md:w-5 h-4 md:h-5" /> },
                { step: "02", title: "They Shop", desc: "Your friends get ₦2,000 off their first basket.", icon: <ShoppingBag className="w-4 md:w-5 h-4 md:h-5" /> },
                { step: "03", title: "You Get Paid", desc: "We'll add ₦2,000 to your wallet instantly.", icon: <Gift className="w-4 md:w-5 h-4 md:h-5" /> }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[25px] md:rounded-[40px] border border-white flex items-start gap-4 md:gap-6 shadow-sm">
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[var(--primary-purple)] font-black text-sm shadow-sm shrink-0">
                      {item.icon}
                   </div>
                   <div>
                      <h4 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-tight mb-1 md:mb-2">{item.title}</h4>
                      <p className="text-[10px] md:text-xs text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <Users className="absolute -bottom-20 -left-20 w-80 h-80 text-purple-200/10 -rotate-12" />
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
         <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl shadow-purple-900/5 text-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Total Referrals</h4>
            <div className="text-4xl font-black text-gray-900">0</div>
         </div>
         <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl shadow-purple-900/5 text-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Pending Rewards</h4>
            <div className="text-4xl font-black text-gray-900">₦0</div>
         </div>
         <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl shadow-purple-900/5 text-center border-b-4 border-b-[var(--accent-green)]">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Total Earned</h4>
            <div className="text-4xl font-black text-[var(--accent-green)]">₦0</div>
         </div>
      </div>
    </div>
  );
}

function ShoppingBag({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
