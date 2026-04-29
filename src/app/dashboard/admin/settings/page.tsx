import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/SettingsForm";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch all settings
  const settingsList = await prisma.setting.findMany();
  const settings = settingsList.reduce((acc, curr) => ({
    ...acc,
    [curr.key]: curr.value
  }), {});

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Settings</h1>
        <p className="text-gray-800 font-medium">Configure platform-wide parameters and branding.</p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
