import MealBuilder from "@/components/MealBuilder";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function BuilderPage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = await params;
  const type = resolvedParams.type;

  const builder = await prisma.builder.findUnique({
    where: { type }
  });

  if (!builder) {
    notFound();
  }

  const categories = JSON.parse(builder.categories);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <MealBuilder 
        type={type as any}
        title={builder.title}
        description={builder.description}
        basePrice={builder.basePrice}
        categories={categories as any}
        image={builder.image}
      />
    </div>
  );
}
