const fs = require('fs');

const products = JSON.parse(fs.readFileSync('/Users/davidakerele/.gemini/antigravity/brain/565b1c18-0723-4d25-9cdb-b55437889b9a/scratch/extracted_products.json', 'utf8'));

// Map category names to our slugs
const catMap = {
  'Vegetable': 'vegetables',
  'Fruits': 'fruits',
  'spices': 'spices',
  'Teas': 'teas'
};

const productsDataStr = products.map(p => {
  const catSlug = catMap[p.categoryName] || 'vegetables';
  return `    { name: ${JSON.stringify(p.name)}, slug: ${JSON.stringify(p.slug)}, price: ${p.price || 1000}, categoryId: ${catSlug}.id, image: ${JSON.stringify(p.image)} }`;
}).join(',\n');

const seedContent = `const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Categories
  const categoriesData = [
    { name: 'Fruits', slug: 'fruits', description: 'Freshly harvested fruits.' },
    { name: 'Vegetables', slug: 'vegetables', description: 'Crisp and clean vegetables.' },
    { name: 'Spices', slug: 'spices', description: 'Pure flavor.' },
    { name: 'Medleys', slug: 'medleys', description: 'Pre-mixed medleys.' },
    { name: 'Juices', slug: 'juices', description: 'Fresh pressed juices.' },
    { name: 'Builders', slug: 'builders', description: 'Stir-fry and salad builders.' },
    { name: 'Proteins', slug: 'proteins', description: 'Marinated proteins.' },
    { name: 'Teas', slug: 'teas', description: 'Soothing teas and brews.' }
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const fruits = await prisma.category.findUnique({ where: { slug: 'fruits' } });
  const vegetables = await prisma.category.findUnique({ where: { slug: 'vegetables' } });
  const builders = await prisma.category.findUnique({ where: { slug: 'builders' } });
  const spices = await prisma.category.findUnique({ where: { slug: 'spices' } });
  const juices = await prisma.category.findUnique({ where: { slug: 'juices' } });
  const medleys = await prisma.category.findUnique({ where: { slug: 'medleys' } });
  const teas = await prisma.category.findUnique({ where: { slug: 'teas' } });

  // Seed Products
  const productsData = [
${productsDataStr}
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: { price: prod.price, image: prod.image, categoryId: prod.categoryId },
      create: prod,
    });
  }

  // Seed Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@wholepurple.com' },
    update: {},
    create: {
      email: 'admin@wholepurple.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

fs.writeFileSync('/Users/davidakerele/Documents/wholepurple/prisma/seed.js', seedContent, 'utf8');
console.log("Updated seed.js");
