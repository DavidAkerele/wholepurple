import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, ShieldCheck, Truck, Leaf } from "lucide-react";
import ProductActionForm from "./ProductActionForm";
import ProductDetailsTabs from "@/components/ProductDetailsTabs";
import { getProductImageUrl, getAllProductImages } from "@/lib/image-utils";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true }
  });

  if (!product) {
    notFound();
  }

  // Fetch related products
  const relatedProducts = await prisma.product.findMany({
    where: { 
      categoryId: product.categoryId,
      NOT: { id: product.id }
    },
    take: 4,
    include: { category: true }
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      
      {/* Spacer for fixed transparent navbar, but we want it to sit over the top content if we had a hero. Since there's no hero, we use a solid padding */}
      <div className="pt-24 lg:pt-32 pb-12 lg:pb-16">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] lg:text-sm text-gray-800 font-medium mb-6 lg:mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <Link href="/" className="hover:text-[var(--primary-purple)] transition-colors uppercase tracking-widest">Home</Link>
            <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
            <Link href="/shop" className="hover:text-[var(--primary-purple)] transition-colors uppercase tracking-widest">Shop</Link>
            <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
            <Link href={`/shop?category=${product.category.slug}`} className="hover:text-[var(--primary-purple)] transition-colors capitalize uppercase tracking-widest">
              {product.category.name}
            </Link>
            <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
            <span className="text-gray-900 uppercase tracking-widest">{product.name}</span>
          </nav>

          {/* Product Split Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 mb-16 lg:mb-24">
            
            {/* Image Gallery Side */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-gray-50 text-gray-900 rounded-[32px] lg:rounded-[40px] flex items-center justify-center p-8 lg:p-12 border border-gray-100 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image 
                  src={getProductImageUrl(product.image)} 
                  alt={product.name}
                  fill
                  className="object-contain p-6 lg:p-12 hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute top-4 lg:top-6 right-4 lg:right-6 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[var(--accent-red)] transition-colors z-10 cursor-pointer shadow-sm active:scale-90">
                  <Heart className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
              </div>

              {/* Thumbnails */}
              {(() => {
                const images = getAllProductImages(product.image);
                if (images.length > 1) {
                  return (
                    <div className="flex gap-3 lg:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative w-16 h-16 lg:w-24 lg:h-24 rounded-xl lg:rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 cursor-pointer hover:border-purple-300 transition-colors">
                          <Image 
                            src={img} 
                            alt={`${product.name} ${idx + 1}`} 
                            fill 
                            className="object-contain p-2" 
                          />
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })()}
            </div>

            {/* Product Info Side */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 lg:mb-8 text-center lg:text-left">
                <span className="inline-block px-3 py-1 bg-green-50 text-[var(--accent-green)] text-[10px] font-black uppercase tracking-widest rounded-lg mb-3">
                  {product.category.name}
                </span>
                <h1 className="text-3xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tighter uppercase leading-none">
                  {product.name}
                </h1>
                <div className="text-2xl lg:text-3xl font-black text-[var(--primary-purple)] mb-4">
                  ₦{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                
                {/* Loyalty Points */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex items-center justify-center w-6 h-6 bg-purple-50 text-[var(--primary-purple)] rounded-full">
                    <span className="text-[10px] font-black">★</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Purchase & earn <span className="text-[var(--primary-purple)]">{Math.floor(product.price / 100)}</span> points!
                  </span>
                </div>
              </div>

              {/* Action Form */}
              <div className="bg-white p-5 lg:p-6 rounded-[32px] border border-gray-100 mb-6 lg:mb-8 shadow-sm">
                <ProductActionForm product={product} />
              </div>

              {/* Enhanced Interactive Tabs instead of static description */}
              <ProductDetailsTabs product={product} />
              
              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[var(--primary-purple)]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">100% Quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[var(--accent-green)]">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Organic</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-[var(--accent-red)]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-16 border-t border-gray-100">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">You might also like</h2>
                  <p className="text-gray-800">Other fresh items in the {product.category.name} category.</p>
                </div>
                <Link href={`/shop?category=${product.category.slug}`} className="hidden md:flex text-[var(--primary-purple)] font-bold items-center gap-1 hover:underline">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map(relProduct => (
                  <Link key={relProduct.id} href={`/shop/${relProduct.slug}`} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col">
                    <div className="relative aspect-square bg-gray-50 text-gray-900 p-6 flex items-center justify-center">
                      <Image 
                        src={getProductImageUrl(relProduct.image)} 
                        alt={relProduct.name} 
                        fill 
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-[var(--accent-green)] uppercase tracking-wider mb-2 block">{relProduct.category.name}</span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[var(--primary-purple)] transition-colors">{relProduct.name}</h3>
                      <div className="text-[var(--primary-purple)] font-bold text-lg">
                        ₦{relProduct.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
