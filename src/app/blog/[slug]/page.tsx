import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Tag } from "lucide-react";
import Image from "next/image";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const post = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug },
    include: { author: true }
  });

  if (!post) {
    redirect('/blog');
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative min-h-[70vh] flex items-end pb-24 pt-40 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        {post.image ? (
          <div className="absolute inset-0 z-0">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover blur-[4px] scale-105"
              priority
              quality={100}
              sizes="100vw"
            />
            {/* Deep Purplish Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B4E] via-[#2D1B4E]/60 to-[#2D1B4E]/20"></div>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-[var(--primary-purple)] z-0"></div>
        )}
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-5xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 font-black text-[10px] uppercase tracking-[0.3em] mb-12 hover:text-white transition-all group">
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to The Journal
            </Link>
            
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  Platform News
                </span>
                <div className="h-px flex-1 bg-white/20"></div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-4 drop-shadow-2xl">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-10 py-10 border-t border-white/10">
                 <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white">
                     <User className="w-7 h-7" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Written By</span>
                     <span className="text-lg font-bold text-white leading-none">{post.author.name || 'Whole Purple Team'}</span>
                   </div>
                 </div>

                 <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white">
                     <Calendar className="w-7 h-7" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Published On</span>
                     <span className="text-lg font-bold text-white leading-none">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Section */}
      <article className="container mx-auto px-4 md:px-8 -mt-16 relative z-30 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-2/3 bg-white p-10 md:p-16 rounded-[48px] shadow-2xl shadow-purple-900/5 border border-gray-100">
              <div className="prose prose-2xl prose-purple max-w-none text-gray-800 leading-relaxed font-medium">
                {post.excerpt && (
                  <p className="text-3xl text-gray-900 font-bold mb-12 italic border-l-8 border-[var(--primary-purple)] pl-10 leading-tight">
                    {post.excerpt}
                  </p>
                )}
                <div className="whitespace-pre-wrap text-xl text-gray-700">
                  {post.content ? (
                    post.content
                  ) : (
                    <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-400 font-medium italic">This article has no content yet. Stay tuned for updates!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 flex flex-col gap-12">
               <div className="bg-white p-10 rounded-[40px] border border-gray-100 sticky top-32 shadow-xl shadow-purple-900/5">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-8 flex items-center gap-3">
                   <Tag className="w-4 h-4 text-[var(--primary-purple)]" /> Related Topics
                 </h3>
                 <div className="flex flex-wrap gap-3">
                   {['Sustainability', 'Ethical Farming', 'Recipes', 'Local Harvest'].map(tag => (
                     <span key={tag} className="px-5 py-3 bg-gray-50 text-[11px] font-black text-gray-600 uppercase tracking-widest rounded-2xl hover:bg-purple-50 hover:text-[var(--primary-purple)] cursor-pointer transition-all border border-gray-100 hover:border-purple-200">
                       #{tag.replace(' ', '')}
                     </span>
                   ))}
                 </div>
                 
                 <div className="mt-12 pt-10 border-t border-gray-100">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Share Article</h4>
                   <div className="flex gap-4">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer"></div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
