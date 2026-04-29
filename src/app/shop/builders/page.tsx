import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Leaf } from "lucide-react";

export default function BuildersLandingPage() {
  const builders = [
    {
      id: "stir-fry",
      title: "Stir-Fry Builder",
      subtitle: "The Wok Masterpiece",
      description: "Pick your base, toss in fresh local veggies, and select your favorite marinated proteins for a sizzling hot meal.",
      image: "/images/scraped/stir-fry-vegetables-in-a-bowl-isolated-on-transparent-background-png.webp",
      color: "bg-[#F3EBF4]",
      textColor: "text-[var(--primary-purple)]",
      icon: <Flame className="w-8 h-8" />,
      cta: "Build Stir-Fry"
    },
    {
      id: "salad",
      title: "Salad Builder",
      subtitle: "The Raw Powerhouse",
      description: "Create a crisp, refreshing, and nutrient-dense salad bowl. Perfect for a light lunch or a healthy dinner side.",
      image: "/images/scraped/fresh-kale-leaves-on-a-clean-transparent-background-ready-to-be-used-in-healthy-cooking-and-salads-kale-transparent-background-free-png.webp",
      color: "bg-[#F3F6ED]",
      textColor: "text-[var(--accent-green)]",
      icon: <Leaf className="w-8 h-8" />,
      cta: "Design Salad"
    }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mb-20">
          <span className="text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Custom Creations</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-8">
            The Bowl <br /> Builder
          </h1>
          <p className="text-xl text-gray-800 font-medium leading-relaxed">
            Take full control of your plate. Select from our freshest farm arrivals to build a bowl that matches your taste and nutritional goals perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {builders.map((builder) => (
            <Link 
              key={builder.id} 
              href={`/shop/builders/${builder.id}`}
              className={`group relative flex flex-col p-12 rounded-[60px] border border-white shadow-xl shadow-black/5 transition-all hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${builder.color}`}
            >
              <div className="relative z-10 flex flex-col items-start h-full">
                <div className={`w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-sm mb-10 ${builder.textColor}`}>
                  {builder.icon}
                </div>
                <div className="mb-auto">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${builder.textColor}`}>
                    {builder.subtitle}
                  </span>
                  <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-6 leading-none">
                    {builder.title}
                  </h2>
                  <p className="text-gray-600 font-medium leading-relaxed max-w-xs mb-10">
                    {builder.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-[var(--primary-purple)] group-hover:text-white transition-all">
                  {builder.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              <div className="absolute bottom-0 right-0 w-1/2 h-2/3 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 origin-bottom-right">
                <Image src={builder.image} alt={builder.title} fill className="object-contain" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
