import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowRight, ChevronRight, ShoppingCart } from "lucide-react";
import HomeHero from "@/components/HomeHero";
import CategoryTabs from "@/components/CategoryTabs";
import ProductSection from "@/components/ProductSection";
import AddToCartButton from "@/components/AddToCartButton";

export default async function Home() {
  const settings = await prisma.setting.findMany({
    where: { key: { in: ['home_hero_title', 'home_hero_subtitle'] } }
  });
  
  const content: Record<string, string> = {};
  settings.forEach(s => {
    content[s.key] = s.value;
  });

  const recipes = await prisma.blog.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const teas = await prisma.product.findMany({
    where: { category: { slug: 'teas' } },
    take: 3,
    include: { category: true }
  });

  return (
    <div className="flex flex-col bg-[#FAF7F2]">
      {/* 1. Hero Section */}
      <HomeHero 
        title={content.home_hero_title} 
        subtitle={content.home_hero_subtitle} 
      />

      {/* 2. Category Navigation Tabs */}
      <CategoryTabs />

      {/* 3. Product Rows Group 1 */}
      <div className="flex flex-col gap-10 mt-10">
        <ProductSection title="This Week's Raves" />
        <ProductSection title="Freshly Harvested Veggies" categorySlug="vegetables" />
        <ProductSection title="Fresh Fruits at Peak Season" categorySlug="fruits" />
        <ProductSection title="Customer Favourites" />
      </div>

      {/* 4. Meal Inspiration (Recipes) */}
      <section className="container mx-auto px-4 md:px-8 py-24 mt-12 bg-white rounded-[60px] border border-gray-100 shadow-sm">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[var(--accent-green)] font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Inspiration</span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Meal Inspiration</h2>
            <div className="w-16 h-1.5 bg-[var(--primary-purple)] mt-4"></div>
          </div>
          <Link href="/blog" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[var(--primary-purple)] transition-colors border-b border-gray-100 pb-1">
            View All Recipes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="group flex flex-col">
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden mb-8 shadow-xl shadow-purple-900/5">
                <Image 
                  src={recipe.image || "/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg"} 
                  alt={recipe.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-[var(--primary-purple)] transition-colors">
                {recipe.title}
              </h3>
              <p className="text-gray-500 font-medium mb-8 line-clamp-2 leading-relaxed">
                {recipe.excerpt || "Discover how to prepare this delicious, healthy meal using our fresh ingredients."}
              </p>
              <Link 
                href={`/blog/${recipe.slug}`}
                className="inline-flex items-center gap-2 text-[var(--accent-green)] font-black text-xs uppercase tracking-widest border-2 border-[var(--accent-green)] px-8 py-4 rounded-2xl self-start hover:bg-[var(--accent-green)] hover:text-white transition-all"
              >
                Get Recipe <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Split Wellness Teas Row */}
      <section className="container mx-auto px-4 md:px-8 py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Text */}
          <div className="w-full lg:w-1/3 flex flex-col items-start">
            <span className="text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Brewed Goodness</span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-6 leading-none">Wellness Teas</h2>
            <div className="w-12 h-1 bg-[var(--accent-green)] mb-8"></div>
            <p className="text-gray-500 font-medium mb-10 leading-relaxed">Experience our hand-crafted herbal infusions, designed to soothe the soul and nourish the body.</p>
            <Link 
              href="/shop?category=teas"
              className="inline-flex items-center gap-2 text-white bg-[var(--primary-purple)] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-purple-200 transition-all"
            >
              Explore Teas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Right Products (3) */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {teas.map(product => (
              <div key={product.id} className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="relative aspect-square bg-[#FBFBFB] p-6 flex items-center justify-center">
                  <Image 
                    src={`/images/scraped/${product.image || 'woocommerce-placeholder.webp'}`} 
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[var(--primary-purple)]">₦{product.price.toLocaleString()}</span>
                    <AddToCartButton item={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Snack Lounge Row */}
      <ProductSection title="Snack Lounge" categorySlug="spices" />

      {/* Instagram Community Grid */}
      <section className="mt-32 bg-white pt-24 pb-0 border-t border-gray-100 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-8 text-center mb-16">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8 text-[var(--primary-purple)]" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-4">Join the Community</h2>
          <p className="text-gray-500 text-lg font-medium">Tag @WholePurple to be featured on our page.</p>
        </div>
        <div className="flex w-full overflow-hidden">
          {[
            "ella-olsson-I-uYa5P-EgM-unsplash.jpg",
            "nrd-D6Tu_L3chLE-unsplash.jpg",
            "toni-cuenca-CvFARq2qu8Y-unsplash.jpg",
            "Home13_bg19.jpg",
            "home11_img-3.jpg",
            "land-o-lakes-inc-SLgCDEqHav4-unsplash.jpg"
          ].map((img, i) => (
            <div key={i} className="relative w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 aspect-square shrink-0 group">
              <Image src={`/images/scraped/${img}`} alt="Community" fill className="object-cover" />
              <div className="absolute inset-0 bg-[var(--primary-purple)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] cursor-pointer">
                <Camera className="w-8 h-8 text-white scale-50 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Discount Section */}
      <section className="container mx-auto px-4 md:px-8 py-32">
        <div className="relative rounded-[50px] overflow-hidden bg-[#1A0B2E]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#1A0B2E]/90 to-transparent z-10"></div>
          <Image src="/images/scraped/Home13_bg19.jpg" alt="Background" fill className="object-cover opacity-30" />
          <div className="relative z-20 p-12 md:p-24 flex flex-col items-start max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-none tracking-tighter uppercase">Get 10% Off Your First Harvest</h2>
            <p className="text-white/70 text-lg mb-10 font-medium leading-relaxed max-w-lg">Join our mailing list to receive exclusive discounts, fresh recipes, and early access to seasonal produce drops.</p>
            <div className="flex flex-col sm:flex-row w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-2 gap-2">
              <input type="email" placeholder="Your email address" className="flex-1 bg-transparent px-6 py-4 outline-none text-white font-medium placeholder:text-white/40" />
              <button className="bg-[var(--accent-green)] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
