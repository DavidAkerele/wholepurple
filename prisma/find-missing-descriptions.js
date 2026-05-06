const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { description: null },
        { description: '' }
      ]
    },
    select: {
      name: true,
      slug: true,
      category: {
        select: {
          name: true
        }
      }
    }
  });

  console.log("Products missing descriptions:");
  console.log(JSON.stringify(products, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
