const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  const stirFryCategory = categories.find(c => c.slug === 'ready-to-cook');
  const saladCategory = categories.find(c => c.slug === 'seasonal'); // Or whichever fits better

  if (stirFryCategory) {
    await prisma.product.upsert({
      where: { slug: 'custom-stir-fry-bowl' },
      update: {},
      create: {
        name: 'Stir-Fry Custom Bowl',
        slug: 'custom-stir-fry-bowl',
        description: 'Bespoke stir-fry bowl created using our builder.',
        price: 0, // Base price is handled in the builder
        image: 'stir-fry-vegetables-in-a-bowl-isolated-on-transparent-background-png.webp',
        categoryId: stirFryCategory.id,
        stock: 999
      }
    });
  }

  if (saladCategory) {
    await prisma.product.upsert({
      where: { slug: 'custom-salad-bowl' },
      update: {},
      create: {
        name: 'Salad Custom Bowl',
        slug: 'custom-salad-bowl',
        description: 'Bespoke salad bowl created using our builder.',
        price: 0,
        image: 'fresh-kale-leaves-on-a-clean-transparent-background-ready-to-be-used-in-healthy-cooking-and-salads-kale-transparent-background-free-png.webp',
        categoryId: saladCategory.id,
        stock: 999
      }
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
