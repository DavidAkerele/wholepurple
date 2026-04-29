import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ContentEditor from "@/components/ContentEditor";
import { prisma } from "@/lib/prisma";

export default async function EditorContentPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role !== "EDITOR" && session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const keys = [
    "home_hero_title", 
    "home_hero_subtitle", 
    "about_title", 
    "about_content", 
    "footer_description",
    "contact_address"
  ];

  const settings = await prisma.setting.findMany({
    where: { key: { in: keys } }
  });
  
  const initialSettings: Record<string, string> = {};
  settings.forEach(s => {
    initialSettings[s.key] = s.value;
  });

  return (
    <div className="py-10">
      <ContentEditor initialSettings={initialSettings} />
    </div>
  );
}
