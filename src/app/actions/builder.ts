"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function createBuilder(data: {
  type: string;
  title: string;
  description: string;
  basePrice: number;
  image: string;
  categories: any[];
}) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== "SHOP_MANAGER" && session.user.role !== "ADMIN")) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const builder = await prisma.builder.create({
      data: {
        type: data.type,
        title: data.title,
        description: data.description,
        basePrice: data.basePrice,
        image: data.image,
        categories: JSON.stringify(data.categories),
      }
    });

    revalidatePath("/dashboard/admin/builders");
    return { success: true, builder };
  } catch (error) {
    console.error("Failed to create builder:", error);
    return { success: false, error: "Failed to create builder" };
  }
}

export async function updateBuilder(id: string, data: {
  title: string;
  description: string;
  basePrice: number;
  image: string;
  categories: any[];
}) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== "SHOP_MANAGER" && session.user.role !== "ADMIN")) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.builder.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        basePrice: data.basePrice,
        image: data.image,
        categories: JSON.stringify(data.categories),
      }
    });

    revalidatePath("/shop/builders/[type]");
    revalidatePath("/dashboard/admin/builders");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update builder:", error);
    return { success: false, error: "Failed to update builder" };
  }
}

export async function getBuilders() {
  return await prisma.builder.findMany({
    orderBy: { type: 'asc' }
  });
}
