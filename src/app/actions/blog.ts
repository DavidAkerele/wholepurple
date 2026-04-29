"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function createBlog(formData: { title: string; content: string; excerpt?: string; image?: string; published: boolean }) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== "EDITOR" && session.user.role !== "ADMIN")) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const blog = await prisma.blog.create({
      data: {
        ...formData,
        slug,
        authorId: session.user.id,
      }
    });

    revalidatePath("/dashboard/editor");
    revalidatePath("/blog");
    
    return { success: true, blog };
  } catch (error) {
    console.error("Failed to create blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}

export async function updateBlog(id: string, formData: Partial<{ title: string; content: string; excerpt?: string; image?: string; published: boolean }>) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== "EDITOR" && session.user.role !== "ADMIN")) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const data: any = { ...formData };
    if (formData.title) {
      data.slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const blog = await prisma.blog.update({
      where: { id },
      data
    });

    revalidatePath("/dashboard/editor");
    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);
    
    return { success: true, blog };
  } catch (error) {
    console.error("Failed to update blog:", error);
    return { success: false, error: "Failed to update blog" };
  }
}

export async function deleteBlog(id: string) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== "EDITOR" && session.user.role !== "ADMIN")) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.blog.delete({
      where: { id }
    });

    revalidatePath("/dashboard/editor");
    revalidatePath("/blog");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return { success: false, error: "Failed to delete blog" };
  }
}
