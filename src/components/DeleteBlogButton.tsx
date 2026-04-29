"use client";

import { Trash2 } from "lucide-react";
import { deleteBlog } from "@/app/actions/blog";
import toast from "react-hot-toast";
import { useState } from "react";

export default function DeleteBlogButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    setLoading(true);
    const result = await deleteBlog(id);
    if (result.success) {
      toast.success("Article deleted");
    } else {
      toast.error(result.error || "Failed to delete");
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="p-2 hover:bg-red-50 hover:text-red-600 rounded-xl text-gray-600 transition-all disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
