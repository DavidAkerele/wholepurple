import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Filter, Heart, ArrowRight, ChevronRight, LayoutGrid, ListFilter } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 9;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string, page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const categoryFilter = resolvedParams.category;
  const currentPage = parseInt(resolvedParams.page || "1");

  const whereClause = categoryFilter 
    ? { category: { slug: categoryFilter } }
    : {};

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      include: { category: true },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.product.count({ where: whereClause })
  ]);

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const categories = await prisma.category.findMany();

  return (
    <div className="flex flex-col pb-24 bg-[#FAF7F2] min-h-screen">
      <PageHeader 
        tag="Ready to Roast"
        title={categoryFilter ? categoryFilter : "Seasonal"}
        subtitle="Open. Cook. Eat. — No Prep. Less Stress. Discover Nigeria's finest local harvests, prepped and ready for your kitchen."
        bgImage="/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg"
      />

      <section className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
          
          {/* Sidebar - Clean & Modern */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28 flex flex-col gap-10">
              {/* Category Filter */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                    <ListFilter className="w-5 h-5 text-[var(--primary-purple)]" />
                  </div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Filter by Aisle</h3>
                </div>
                
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link 
                      href="/shop" 
                      className={`group flex items-center justify-between p-4 rounded-2xl transition-all ${
                        !categoryFilter 
                        ? 'bg-white shadow-xl shadow-purple-900/5 text-[var(--primary-purple)] border border-gray-50' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      <span className="text-sm font-black uppercase tracking-tight">All Products</span>
                      {!categoryFilter && <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-purple)] animate-pulse"></div>}
                    </Link>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <Link 
                        href={`/shop?category=${cat.slug}`} 
                        className={`group flex items-center justify-between p-4 rounded-2xl transition-all ${
                          categoryFilter === cat.slug 
                          ? 'bg-white shadow-xl shadow-purple-900/5 text-[var(--primary-purple)] border border-gray-50' 
                          : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                        }`}
                      >
                        <span className="text-sm font-black uppercase tracking-tight">{cat.name}</span>
                        {categoryFilter === cat.slug && <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-purple)] animate-pulse"></div>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Promo Widget */}
              <div className="bg-[#1A0B2E] rounded-[40px] p-10 overflow-hidden relative group cursor-pointer">
                <div className="relative z-10">
                  <span className="text-[var(--accent-green)] font-black text-[9px] uppercase tracking-widest mb-3 block">Member Exclusive</span>
                  <h4 className="text-xl font-black text-white uppercase leading-tight mb-4">Get 20% Off <br /> Your First Box</h4>
                  <div className="flex items-center gap-2 text-white/60 font-black text-[9px] uppercase tracking-widest border-b border-white/10 pb-1 group-hover:text-white group-hover:border-white transition-all">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
              </div>
            </div>
          </aside>

          {/* Product Grid / Builder View */}
          <main className="flex-1">
            {categoryFilter === 'builders' ? (
              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                  {[
                    {
                      id: "stir-fry",
                      title: "Stir-Fry Builder",
                      description: "The Wok Masterpiece. Pick your base, toss in fresh local veggies, and select your favorite proteins.",
                      image: "/images/scraped/stir-fry-vegetables-in-a-bowl-isolated-on-transparent-background-png.webp",
                      color: "bg-white",
                      textColor: "text-[var(--primary-purple)]"
                    },
                    {
                      id: "salad",
                      title: "Salad Builder",
                      description: "The Raw Powerhouse. Create a crisp, refreshing, and nutrient-dense organic salad bowl.",
                      image: "/images/scraped/fresh-kale-leaves-on-a-clean-transparent-background-ready-to-be-used-in-healthy-cooking-and-salads-kale-transparent-background-free-png.webp",
                      color: "bg-white",
                      textColor: "text-[var(--accent-green)]"
                    }
                  ].map((builder) => (
                    <Link 
                      key={builder.id} 
                      href={`/shop/builders/${builder.id}`}
                      className={`group relative flex flex-col p-12 rounded-[50px] border border-gray-100 shadow-xl shadow-black/5 transition-all hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${builder.color}`}
                    >
                      <div className="relative z-10 flex flex-col items-start h-full">
                        <span className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 block ${builder.textColor}`}>
                          Custom Craft
                        </span>
                        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-6 leading-none">
                          {builder.title}
                        </h2>
                        <p className="text-gray-500 font-medium leading-relaxed max-w-xs mb-10">
                          {builder.description}
                        </p>
                        <div className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-[var(--primary-purple)] transition-all">
                          Start Building <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-1/2 h-2/3 pointer-events-none transition-transform duration-700 group-hover:scale-110 origin-bottom-right opacity-80">
                        <Image src={builder.image} alt={builder.title} fill className="object-contain" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {/* Grid Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 gap-4 shadow-sm">
                  <div className="flex items-center gap-6 px-4">
                    <div className="flex items-center gap-2 text-[var(--primary-purple)]">
                      <LayoutGrid className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">Grid View</span>
                    </div>
                    <div className="w-px h-4 bg-gray-100"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Showing {products.length} of {totalProducts} Products
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort By:</span>
                    <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-[var(--primary-purple)]/20 outline-none cursor-pointer">
                      <option>Newest Harvest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {products.length === 0 ? (
                  <div className="bg-white rounded-[50px] p-20 text-center border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
                      <Filter className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Empty Harvest</h3>
                    <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">We couldn't find any products in this collection. Check back later or try another aisle.</p>
                    <Link href="/shop" className="inline-flex items-center gap-2 bg-[var(--primary-purple)] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl transition-all">
                      Explore All Products <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                      {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    
                    <div className="mt-12 flex justify-center">
                      <Pagination 
                        totalPages={totalPages} 
                        currentPage={currentPage} 
                        baseUrl="/shop" 
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </main>

        </div>
      </section>
    </div>
  );
}
