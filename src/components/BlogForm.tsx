"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, Image as ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import { createBlog, updateBlog } from "@/app/actions/blog";
import toast from "react-hot-toast";
import Link from "next/link";

interface BlogFormProps {
  initialData?: any;
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    image: initialData?.image || "",
    published: initialData?.published || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = initialData 
      ? await updateBlog(initialData.id, formData)
      : await createBlog(formData);

    if (result.success) {
      toast.success(initialData ? "Article updated!" : "Article created!");
      router.push("/dashboard/editor");
      router.refresh();
    } else {
      toast.error(result.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <Link href="/dashboard/editor" className="flex items-center gap-2 text-gray-800 font-bold hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setFormData({ ...formData, published: !formData.published })}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
              formData.published 
                ? 'bg-green-50 border-green-200 text-green-600' 
                : 'bg-orange-50 border-orange-200 text-orange-600'
            }`}
          >
            {formData.published ? 'Published' : 'Draft'}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[var(--primary-purple)] text-white font-black hover:shadow-xl hover:shadow-purple-100 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {initialData ? "Update Article" : "Publish Article"}
          </button>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-gray-100 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-gray-600 uppercase tracking-widest px-1">Article Title</label>
          <input 
            type="text"
            required
            placeholder="e.g. The Secret to Perfectly Ripe Ube"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="text-3xl font-black p-4 bg-gray-50 text-gray-900 border-none focus:bg-white focus:ring-0 transition-all placeholder:text-gray-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-gray-600 uppercase tracking-widest px-1">Featured Image URL</label>
          <div className="relative">
            <input 
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-4 pl-12 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-medium"
            />
            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-gray-600 uppercase tracking-widest px-1">Excerpt (Short Summary)</label>
          <textarea 
            rows={2}
            placeholder="A brief introduction to your article..."
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-medium resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-gray-600 uppercase tracking-widest px-1">Article Content (Markdown Supported)</label>
          <textarea 
            rows={15}
            required
            placeholder="Once upon a time in the world of whole foods..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="p-6 rounded-[32px] border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-medium leading-relaxed"
          />
        </div>
      </div>
    </form>
  );
}
