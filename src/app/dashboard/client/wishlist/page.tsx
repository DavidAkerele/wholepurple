import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ChevronLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  const wishlistItems = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: {
          category: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/client" className="p-2 bg-white rounded-xl border border-gray-100 hover:text-[var(--primary-purple)] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">My Wishlist</h1>
            <p className="text-gray-500 font-medium text-sm">Save your favorite harvests for later.</p>
          </div>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
           <Heart className="w-5 h-5 text-red-500 fill-red-500" />
           <span className="text-sm font-black uppercase tracking-widest text-gray-900">{wishlistItems.length} Items</span>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white p-10 md:p-20 rounded-[30px] md:rounded-[50px] border border-gray-100 shadow-2xl shadow-purple-900/5 flex flex-col items-center justify-center text-center">
          <div className="w-20 md:w-24 h-20 md:h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
            <Heart className="w-8 md:w-10 h-8 md:h-10 text-red-300" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 font-medium max-w-sm mb-10 leading-relaxed text-sm">
            Found something you love? Heart it to save it here for easy access later.
          </p>
          <Link href="/shop" className="btn-primary px-12">Explore Harvests</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-[30px] md:rounded-[40px] overflow-hidden border border-gray-100 shadow-xl shadow-purple-900/5 group hover:shadow-2xl transition-all duration-500">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image 
                  src={`/images/scraped/${item.product.image || 'placeholder.png'}`}
                  alt={item.product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 md:top-6 right-4 md:right-6">
                   <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 className="w-5 h-5" />
                   </button>
                </div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                   <span className="px-3 md:px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-900">
                      {item.product.category.name}
                   </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-black text-gray-900 uppercase tracking-tight mb-2 group-hover:text-[var(--primary-purple)] transition-colors truncate">
                  {item.product.name}
                </h3>
                <p className="text-xl md:text-2xl font-black text-[var(--primary-purple)] mb-6 md:mb-8">
                  ₦{item.product.price.toLocaleString()}
                </p>

                <div className="flex gap-3">
                   <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-[var(--primary-purple)] transition-all">
                      <ShoppingCart className="w-4 h-4" /> Add to Basket
                   </button>
                   <Link href={`/shop/${item.product.slug}`} className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-200 shrink-0">
                      <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
