"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function bulkUploadCustomers(csvData: string) {
  try {
    const lines = csvData.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
    
    const nameIndex = headers.indexOf("name");
    const emailIndex = headers.indexOf("email");
    const roleIndex = headers.indexOf("role");

    if (emailIndex === -1) {
      return { success: false, error: "CSV must contain an 'email' column." };
    }

    const usersToCreate = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map(v => v.trim());
      if (values.length < headers.length) continue;

      const email = values[emailIndex];
      const name = nameIndex !== -1 ? values[nameIndex] : null;
      const role = roleIndex !== -1 ? values[roleIndex].toUpperCase() : "CLIENT";

      if (!email) continue;

      usersToCreate.push({
        email,
        name,
        role: ["ADMIN", "SHOP_MANAGER", "CLIENT"].includes(role) ? role : "CLIENT",
      });
    }

    // Use transaction for bulk upsert
    const results = await Promise.all(
      usersToCreate.map(user => 
        prisma.user.upsert({
          where: { email: user.email },
          update: { name: user.name, role: user.role },
          create: user,
        })
      )
    );

    revalidatePath("/dashboard/admin/users");
    
    return { success: true, count: results.length };
  } catch (error) {
    console.error("Bulk upload failed:", error);
    return { success: false, error: "Failed to process CSV file." };
  }
}
