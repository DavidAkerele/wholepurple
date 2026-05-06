const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const avocado = await prisma.product.findFirst({
    where: {
      OR: [
        { slug: 'avocado' },
        { name: { contains: 'Avocado' } }
      ]
    }
  });

  if (avocado) {
    console.log("Avocado description found:");
    console.log(avocado.description);
  } else {
    console.log("No avocado found in database.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
