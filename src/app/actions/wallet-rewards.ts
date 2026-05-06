"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function adjustUserWalletAndPoints(userId: string, data: { walletBalance?: number; rewardPoints?: number }) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const updateData: any = {};
    if (data.walletBalance !== undefined) updateData.walletBalance = data.walletBalance;
    if (data.rewardPoints !== undefined) updateData.rewardPoints = data.rewardPoints;

    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    revalidatePath("/dashboard/admin/wallet-rewards");
    revalidatePath("/dashboard/client");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to adjust wallet/points:", error);
    return { success: false, error: "Failed to update user data" };
  }
}

export async function getAllUsersForAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      walletBalance: true,
      rewardPoints: true,
      role: true
    },
    orderBy: { name: 'asc' }
  });
}
