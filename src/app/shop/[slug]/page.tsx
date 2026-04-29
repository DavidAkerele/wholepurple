import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, ShieldCheck, Truck, Leaf } from "lucide-react";
import ProductActionForm from "./ProductActionForm";
import ProductDetailsTabs from "@/components/ProductDetailsTabs";

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
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-800 font-medium mb-8">
            <Link href="/" className="hover:text-[var(--primary-purple)] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <Link href="/shop" className="hover:text-[var(--primary-purple)] transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <Link href={`/shop?category=${product.category.slug}`} className="hover:text-[var(--primary-purple)] transition-colors capitalize">
              {product.category.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* Product Split Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-24">
            
            {/* Image Gallery Side */}
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-gray-50 text-gray-900 rounded-[40px] flex items-center justify-center p-12 border border-gray-100 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image 
                src={product.image?.startsWith('http') ? product.image : `/images/scraped/${product.image || 'woocommerce-placeholder.webp'}`} 
                alt={product.name}
                fill
                className="object-contain p-12 hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              {/* Note: In a Server Component we can't easily hook up useWishlistStore. 
                  But since it's just a top-right icon, we can either extract it or leave it static for the hero image.
                  Let's just leave it as a decorative element for now, the real interaction happens in the Shop Grid. */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-[var(--accent-red)] transition-colors z-10 cursor-pointer shadow-sm">
                <Heart className="w-6 h-6" />
              </div>
            </div>

            {/* Product Info Side */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-green-50 text-[var(--accent-green)] text-xs font-bold uppercase tracking-wider rounded-lg mb-4">
                  {product.category.name}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <div className="text-3xl font-black text-[var(--primary-purple)]">
                  ₦{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* Action Form */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 mb-8">
                <ProductActionForm product={product} />
              </div>

              {/* Enhanced Interactive Tabs instead of static description */}
              <ProductDetailsTabs product={product} />
              
              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[var(--primary-purple)]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">100% Quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[var(--accent-green)]">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">Organic</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-[var(--accent-red)]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">Fast Delivery</span>
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
                        src={relProduct.image?.startsWith('http') ? relProduct.image : `/images/scraped/${relProduct.image || 'woocommerce-placeholder.webp'}`} 
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
