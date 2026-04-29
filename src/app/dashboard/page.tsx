import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Redirect based on role
  switch (session.user.role) {
    case "ADMIN":
      redirect("/dashboard/admin");
      break;
    case "SHOP_MANAGER":
      redirect("/dashboard/shop-manager");
      break;
    case "EDITOR":
      redirect("/dashboard/editor");
      break;
    case "CLIENT":
    default:
      redirect("/dashboard/client");
      break;
  }

  return null; // Should never reach here due to redirects
}
