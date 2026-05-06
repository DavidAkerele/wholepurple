import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllUsersForAdmin } from "@/app/actions/wallet-rewards";
import WalletRewardsTable from "@/components/WalletRewardsTable";

export default async function WalletRewardsAdminPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await getAllUsersForAdmin();

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-2">
          Wallet & Rewards
        </h1>
        <p className="text-gray-600 font-medium max-w-2xl">
          Manage customer financial balances and loyalty point distribution from a centralized administrative hub.
        </p>
      </div>

      <WalletRewardsTable initialUsers={users} />
    </div>
  );
}
