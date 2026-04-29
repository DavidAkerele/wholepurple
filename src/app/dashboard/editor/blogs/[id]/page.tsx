import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import BlogForm from "@/components/BlogForm";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "EDITOR" && session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const blog = await prisma.blog.findUnique({
    where: { id: params.id }
  });

  if (!blog) return notFound();

  // Editors can only edit their own blogs (Admins can edit any)
  if (session.user.role === "EDITOR" && blog.authorId !== session.user.id) {
    redirect("/dashboard/editor");
  }

  return (
    <div className="py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Edit Story</h1>
        <p className="text-gray-800 font-medium">Refining your voice for the community.</p>
      </div>
      <BlogForm initialData={blog} />
    </div>
  );
}
