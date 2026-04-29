import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

import ProductCard from "./ProductCard";

interface ProductSectionProps {
  title: string;
  categorySlug?: string;
  limit?: number;
}

export default async function ProductSection({ title, categorySlug, limit = 4 }: ProductSectionProps) {
  const products = await prisma.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : {},
    take: limit,
    include: { category: true }
  });

  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{title}</h2>
          <div className="w-12 h-1.5 bg-[var(--accent-green)] mt-3"></div>
        </div>
        <Link 
          href={categorySlug ? `/shop?category=${categorySlug}` : "/shop"}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-[var(--primary-purple)] transition-colors border-b border-gray-100 pb-1"
        >
          View Collection <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
