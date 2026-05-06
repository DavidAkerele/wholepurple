import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const productCount = await prisma.product.count();
  const userCount = await prisma.user.count();
  const builderCount = await prisma.builder.count();
  
  console.log(`Supabase Stats:`);
  console.log(`- Products: ${productCount}`);
  console.log(`- Users: ${userCount}`);
  console.log(`- Builders: ${builderCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
