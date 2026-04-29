import { Leaf, ShieldCheck, HeartHandshake, Zap, ShoppingBag, Truck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-[#FAF7F2] min-h-screen pb-24">
      <PageHeader 
        tag="Our Story"
        title="Whole Purple"
        subtitle="Bridging the gap between Nigeria's finest local farms and your urban kitchen table."
        bgImage="/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg"
      />

      {/* Narrative Section */}
      <section className="container mx-auto px-4 md:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center max-w-7xl mx-auto">
          <div className="relative aspect-square rounded-[60px] overflow-hidden border-8 border-white shadow-2xl shadow-purple-900/5">
             <Image 
                src="/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg" 
                alt="Whole Purple Story" 
                fill 
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-purple)]/40 to-transparent"></div>
             <div className="absolute bottom-10 left-10 right-10">
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-[40px] shadow-2xl">
                   <p className="text-gray-900 font-bold leading-relaxed italic">
                     "We believe that high-quality, fresh food should be accessible without compromising on the urban pace of life."
                   </p>
                   <div className="mt-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary-purple)]"></div>
                      <span className="text-xs font-black uppercase tracking-widest text-gray-900">Powered by Briph</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <span className="text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">The Mission</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-[0.9] mb-8">
                Open. <span className="text-[var(--accent-green)]">Cook.</span> Eat.
              </h2>
              <p className="text-lg text-gray-500 font-medium leading-relaxed mb-6">
                Whole Purple focuses on "Ready to Roast" and "No Prep Grill" solutions, bridging the gap between Nigeria's finest local farms and your urban kitchen table. 
              </p>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                We believe that high-quality, fresh food should be accessible without compromising on the urban pace of life. Our mission is simple: No Prep. Less Stress. Just fresh, whole food delivered to your door.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="p-6 bg-white rounded-3xl border border-gray-100">
                  <h4 className="text-2xl font-black text-gray-900 mb-2">100%</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Local Sourcing</p>
               </div>
               <div className="p-6 bg-white rounded-3xl border border-gray-100">
                  <h4 className="text-2xl font-black text-gray-900 mb-2">24h</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Farm-to-Door</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Principles */}
      <section className="container mx-auto px-4 md:px-8 mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Our Principles</h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
              We operate on three core pillars that define every product we curate and every delivery we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Absolute Freshness",
                desc: "We don't do long-term storage. Our produce is harvested and delivered within hours to maintain peak nutrients.",
                color: "bg-green-50 text-[var(--accent-green)]"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Urban Convenience",
                desc: "Our 'Ready-to-Cook' range and marinated proteins mean you can enjoy gourmet meals with zero prep time.",
                color: "bg-purple-50 text-[var(--primary-purple)]"
              },
              {
                icon: <HeartHandshake className="w-8 h-8" />,
                title: "Support Local",
                desc: "By shopping with us, you are directly supporting small-scale Nigerian farmers and sustainable agriculture.",
                color: "bg-red-50 text-[var(--accent-red)]"
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[40px] border border-gray-100 text-center flex flex-col items-center group hover:shadow-2xl hover:shadow-purple-900/5 transition-all duration-500">
                <div className={`w-20 h-20 ${value.color} rounded-[30px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-4">{value.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Transparency */}
      <section className="container mx-auto px-4 md:px-8 mt-32">
         <div className="bg-[#1A0B2E] rounded-[60px] p-12 md:p-24 overflow-hidden relative">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <span className="text-[var(--accent-green)] font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Operations</span>
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-10">
                    Transparent <br /> <span className="text-[var(--accent-green)]">Fulfillment</span>
                  </h2>
                  <div className="flex flex-col gap-8">
                     <div className="flex gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                           <Truck className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="text-white font-bold mb-1">Weekly Delivery Cycle</h4>
                           <p className="text-white/60 text-sm font-medium leading-relaxed">
                             To ensure maximum freshness, we operate on a specialized Thursday to Saturday delivery schedule.
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                           <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="text-white font-bold mb-1">Pick-up Location</h4>
                           <p className="text-white/60 text-sm font-medium leading-relaxed">
                             Visit us at No. 32 Norman Williams, Ikoyi, Lagos for direct order pick-ups.
                           </p>
                        </div>
                     </div>
                  </div>
                  <Link href="/shop" className="inline-flex mt-12 bg-[var(--accent-green)] text-gray-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">
                    Browse the Collection
                  </Link>
               </div>
               
               <div className="hidden lg:block relative aspect-square">
                  <div className="absolute inset-0 bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center overflow-hidden">
                     <Image 
                        src="/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg" 
                        alt="Operations" 
                        fill 
                        className="object-cover opacity-40 grayscale"
                     />
                  </div>
               </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none"></div>
         </div>
      </section>
    </div>
  );
}
