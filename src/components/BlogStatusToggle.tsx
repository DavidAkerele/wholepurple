"use client";

import { useState } from "react";
import { updateBlog } from "@/app/actions/blog";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface BlogStatusToggleProps {
  id: string;
  initialPublished: boolean;
}

export default function BlogStatusToggle({ id, initialPublished }: BlogStatusToggleProps) {
  const [published, setPublished] = useState(initialPublished);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const newStatus = !published;
    const result = await updateBlog(id, { published: newStatus });

    if (result.success) {
      setPublished(newStatus);
      toast.success(newStatus ? "Article Published" : "Article moved to Drafts");
    } else {
      toast.error(result.error || "Failed to update status");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 ${
        published 
          ? 'bg-green-50 text-green-600 border border-green-100' 
          : 'bg-orange-50 text-orange-600 border border-orange-100'
      }`}
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : (
        <div className={`w-1.5 h-1.5 rounded-full ${published ? 'bg-green-500' : 'bg-orange-500'}`} />
      )}
      {published ? 'Published' : 'Draft'}
    </button>
  );
}
