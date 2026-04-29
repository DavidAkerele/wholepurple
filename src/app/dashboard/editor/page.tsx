import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FileText, Plus, Eye, Edit3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DeleteBlogButton from "@/components/DeleteBlogButton";

export default async function EditorDashboard() {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "EDITOR" && session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const blogs = await prisma.blog.findMany({
    where: session.user.role === "EDITOR" ? { authorId: session.user.id } : {},
    include: { author: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-500 font-medium">Create and manage stories for the Whole Purple community.</p>
        </div>
        <Link 
          href="/dashboard/editor/blogs/new"
          className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-[var(--primary-purple)] text-white font-black hover:shadow-xl hover:shadow-purple-100 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex flex-col gap-2">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Articles</span>
          <span className="text-4xl font-black text-gray-900">{blogs.length}</span>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex flex-col gap-2">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Published</span>
          <span className="text-4xl font-black text-[var(--accent-green)]">{blogs.filter(b => b.published).length}</span>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex flex-col gap-2">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Drafts</span>
          <span className="text-4xl font-black text-orange-500">{blogs.filter(b => !b.published).length}</span>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Recent Articles</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs tracking-widest">
              <tr>
                <th className="px-8 py-5">Article</th>
                <th className="px-8 py-5">Author</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 relative bg-gray-100 rounded-xl overflow-hidden shrink-0">
                        {blog.image ? (
                          <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full"><FileText className="w-5 h-5 text-gray-300" /></div>
                        )}
                      </div>
                      <span className="font-bold text-gray-900 line-clamp-1">{blog.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-gray-500 font-medium">{blog.author.name || 'Editor'}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${
                      blog.published ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-gray-500 font-medium">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/dashboard/editor/blogs/${blog.id}`}
                        className="p-2 hover:bg-[var(--primary-purple)] hover:text-white rounded-xl text-gray-400 transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <DeleteBlogButton id={blog.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-400">
                    <p className="font-bold">No articles found. Start writing your first story!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
