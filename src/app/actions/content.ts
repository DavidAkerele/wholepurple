"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function updateContentSetting(key: string, value: string) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== "EDITOR" && session.user.role !== "ADMIN")) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/dashboard/editor/content");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update content setting:", error);
    return { success: false, error: "Failed to update content" };
  }
}

export async function getContentSettings(keys: string[]) {
  const settings = await prisma.setting.findMany({
    where: { key: { in: keys } }
  });
  
  const result: Record<string, string> = {};
  settings.forEach(s => {
    result[s.key] = s.value;
  });
  
  return result;
}
