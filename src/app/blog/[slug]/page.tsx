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
    <div className="bg-[#FAF7F2] min-h-screen pt-14 md:pt-28 pb-20">
      <article className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--primary-purple)] font-black text-[10px] uppercase tracking-[0.2em] mb-12 hover:gap-4 transition-all group">
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to The Journal
          </Link>
          
          <div className="flex flex-col gap-8 mb-12">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-[var(--primary-purple)]/10 text-[var(--primary-purple)] text-[10px] font-black uppercase tracking-widest rounded-full">
                Platform News
              </span>
              <div className="h-px flex-1 bg-gray-100"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 py-6 border-y border-gray-100">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[var(--primary-purple)]">
                   <User className="w-5 h-5" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Written By</span>
                   <span className="text-sm font-bold text-gray-900">{post.author.name || 'Whole Purple Team'}</span>
                 </div>
               </div>

               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                   <Calendar className="w-5 h-5" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Published On</span>
                   <span className="text-sm font-bold text-gray-900">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                 </div>
               </div>
            </div>
          </div>

          {post.image && (
            <div className="aspect-[21/9] relative rounded-[40px] overflow-hidden mb-16 shadow-2xl shadow-purple-900/10">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/3">
              <div className="prose prose-xl prose-purple max-w-none text-gray-800 leading-relaxed font-medium">
                <p className="text-2xl text-gray-900 font-bold mb-8 italic border-l-4 border-[var(--primary-purple)] pl-8">
                  {post.excerpt}
                </p>
                <div className="whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 flex flex-col gap-10">
               <div className="bg-white p-8 rounded-[32px] border border-gray-100 sticky top-32">
                 <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2">
                   <Tag className="w-4 h-4" /> Related Topics
                 </h3>
                 <div className="flex flex-wrap gap-2">
                   {['Sustainability', 'Ethical Farming', 'Recipes', 'Local Harvest'].map(tag => (
                     <span key={tag} className="px-4 py-2 bg-gray-50 text-[10px] font-bold text-gray-600 uppercase tracking-widest rounded-xl hover:bg-purple-50 hover:text-[var(--primary-purple)] cursor-pointer transition-colors border border-gray-100">
                       #{tag.replace(' ', '')}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
