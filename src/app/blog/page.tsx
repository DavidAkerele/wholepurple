import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import Image from "next/image";

import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || "1");

  const [blogs, totalBlogs] = await Promise.all([
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: { author: true },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.blog.count({ where: { published: true } })
  ]);

  const totalPages = Math.ceil(totalBlogs / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-24 pb-20 bg-[#FAF7F2] min-h-screen">
      <PageHeader 
        tag="The Journal"
        title="Insights"
        subtitle="Recipes, sustainability guides, and stories from our ethical partner farms."
        bgImage="/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg"
      />

      <section className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {blogs.map((blog, i) => (
              <div key={blog.id} className="flex flex-col border border-gray-100 rounded-3xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-video relative bg-[#F5F1ED] flex items-center justify-center text-gray-400">
                  {blog.image ? (
                    <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                  ) : (
                    <FileText className="w-8 h-8 opacity-20" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-sm font-bold text-[var(--accent-green)] mb-2">Platform News</span>
                  <h2 className="text-xl font-bold mb-3 line-clamp-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-6 flex-1 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 font-medium">By {blog.author.name || 'Editor'}</span>
                    <Link href={`/blog/${blog.slug}`} className="text-[var(--primary-purple)] font-bold flex items-center gap-1 text-sm hover:underline">
                      Read more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {blogs.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <p className="text-xl font-medium">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              baseUrl="/blog" 
            />
          )}
        </div>
      </section>
    </div>
  );
}
