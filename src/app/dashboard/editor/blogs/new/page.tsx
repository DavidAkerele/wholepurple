import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BlogForm from "@/components/BlogForm";

export default async function NewBlogPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "EDITOR" && session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2">New Story</h1>
        <p className="text-gray-800 font-medium">Craft a new piece for the Whole Purple community.</p>
      </div>
      <BlogForm />
    </div>
  );
}
