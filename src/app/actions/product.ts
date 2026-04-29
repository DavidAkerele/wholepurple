"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const description = formData.get("description") as string;

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        stock,
        description,
      },
    });

    revalidatePath("/dashboard/shop-manager/products");
    revalidatePath("/dashboard/admin");
    revalidatePath(`/shop/${id}`); // Potentially slug if we had it, but id works for now or we use generic shop
    revalidatePath("/shop");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Failed to update product" };
  }
}
