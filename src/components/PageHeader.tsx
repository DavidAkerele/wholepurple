import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  bgImage?: string;
}

export default function PageHeader({ 
  title, 
  subtitle = "Sourced from our ethical partner farms, guaranteed fresh and delivered within 24 hours.", 
  tag = "Whole Purple",
  bgImage = "/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg" 
}: PageHeaderProps) {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden bg-[#FAF7F2]">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">
            {tag}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase leading-[0.85] mb-10">
            {title}
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Editorial Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-25 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F3EBF4] z-10"></div>
        <Image 
          src={bgImage} 
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
