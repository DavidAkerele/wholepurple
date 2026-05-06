"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  userId: string;
  address: string;
  phone: string;
  total: number;
  items: {
    id: string; // Product ID or builder-specific ID
    name: string;
    price: number;
    quantity: number;
    selections?: string[]; // Only for builder items
  }[];
}) {
  try {
    // 1. Get Builder Product IDs
    const stirFryBuilder = await prisma.product.findUnique({ where: { slug: 'custom-stir-fry-bowl' } });
    const saladBuilder = await prisma.product.findUnique({ where: { slug: 'custom-salad-bowl' } });

    // 2. Map items to database structure
    const orderItemsData = data.items.map((item) => {
      let productId = item.id;
      
      // If it's a builder item (starts with stir-fry or salad), use the virtual product ID
      if (item.id.startsWith('stir-fry') && stirFryBuilder) {
        productId = stirFryBuilder.id;
      } else if (item.id.startsWith('salad') && saladBuilder) {
        productId = saladBuilder.id;
      }

      return {
        productId,
        quantity: item.quantity,
        price: item.price,
      };
    });

    // 3. Create the Order
    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        address: data.address,
        phone: data.phone,
        status: "PAID",
        items: {
          create: orderItemsData,
        },
      },
    });

    revalidatePath("/dashboard/client/orders");
    revalidatePath("/dashboard/admin/orders");
    revalidatePath("/dashboard/shop-manager/orders");

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to process order" };
  }
}

export async function createManualOrder(data: {
  email: string;
  name: string;
  address?: string;
  phone?: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
}) {
  try {
    // 1. Find or create user
    let user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          role: "CLIENT", // Default for guest/new manual orders
        },
      });
    }

    // 2. Create Order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: data.total,
        status: "PAID", // Manual orders are often paid upfront or handled externally
        address: data.address,
        phone: data.phone,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // 3. Update stock (simplified)
    for (const item of data.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    revalidatePath("/dashboard/shop-manager/orders");
    revalidatePath("/dashboard/admin/orders");
    revalidatePath("/dashboard/client/orders");
    
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Failed to create manual order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SHOP_MANAGER")) {
      return { success: false, error: "Unauthorized" };
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    revalidatePath(`/dashboard/admin/orders/${orderId}`);
    revalidatePath(`/dashboard/shop-manager/orders/${orderId}`);
    revalidatePath("/dashboard/admin/orders");
    revalidatePath("/dashboard/shop-manager/orders");
    revalidatePath("/dashboard/client/orders");

    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
export async function bulkUpdateOrderStatus(orderIds: string[], status: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SHOP_MANAGER")) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.order.updateMany({
      where: { id: { in: orderIds } },
      data: { status }
    });

    revalidatePath("/dashboard/admin/orders");
    revalidatePath("/dashboard/shop-manager/orders");
    revalidatePath("/dashboard/client/orders");

    return { success: true };
  } catch (error) {
    console.error("Error bulk updating order status:", error);
    return { success: false, error: "Failed to update statuses" };
  }
}
