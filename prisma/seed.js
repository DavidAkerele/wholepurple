const { PrismaClient } = require('@prisma/client');
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
    { name: 'Teas', slug: 'teas', description: 'Soothing teas and brews.' },
    { name: 'Ready-to-cook', slug: 'ready-to-cook', description: 'Ready to roast and grill.' },
    { name: 'Easter Moments', slug: 'easter-moments', description: 'Seasonal specials.' }
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
  const proteins = await prisma.category.findUnique({ where: { slug: 'proteins' } });
  const readyToCook = await prisma.category.findUnique({ where: { slug: 'ready-to-cook' } });
  const easter = await prisma.category.findUnique({ where: { slug: 'easter-moments' } });

  // Seed Products
  const productsData = [
    { name: "Belly Brew", slug: "belly-brew", price: 1000, categoryId: teas.id, image: "Gemini_Generated_Image_54937w54937w5493-removebg-preview.png" },
    { name: "Fire Quench", slug: "fire-quench", price: 1000, categoryId: teas.id, image: "Gemini_Generated_Image_2h44b12h44b12h44-removebg-preview.png" },
    { name: "Ruby Bloom", slug: "ruby-bloom", price: 1000, categoryId: teas.id, image: "Gemini_Generated_Image_b8xgwab8xgwab8xg-removebg-preview.png" },
    { name: "Sugar Soothe", slug: "sugar-soothe", price: 1000, categoryId: teas.id, image: "Gemini_Generated_Image_n92lnon92lnon92l-removebg-preview.png" },
    
    // Real Scraped Products - Ready to Cook
    { name: "Marinated Chicken Breast - Classic", slug: "chicken-breast-classic", price: 4500, categoryId: readyToCook.id, image: "Gemini_Generated_Image_gzf290gzf290gzf2-removebg-preview.png" },
    { name: "Marinated Chicken Breast - Garlic Herb Butter", slug: "chicken-breast-garlic", price: 4500, categoryId: readyToCook.id, image: "Gemini_Generated_Image_iidz78iidz78iidz-removebg-preview.png" },
    { name: "Herb Buttered Fresh Sweet Corn (1kg)", slug: "herb-corn-1kg", price: 5000, categoryId: readyToCook.id, image: "pngtree-pile-of-sweet-corn-kernels-isolated-on-transparent-background-png-image_16574129.png" },
    { name: "Olive Oil & Herbed Sweet Corn", slug: "olive-oil-corn", price: 5000, categoryId: readyToCook.id, image: "pngtree-pile-of-sweet-corn-kernels-isolated-on-transparent-background-png-image_16574129.png" },
    
    // Easter Moments
    { name: "Tri-Colour Coleslaw (Jumbo) 1.5kg", slug: "jumbo-coleslaw", price: 17000, categoryId: easter.id, image: "vibrant-vegetable-harvest-colorful-collection-fresh-produce.png" },
    { name: "Honey Ginger Garlic Chicken Thighs", slug: "chicken-thighs-honey", price: 6000, categoryId: easter.id, image: "Gemini_Generated_Image_gzf290gzf290gzf2-removebg-preview.png" },
    { name: "Honey Ginger Garlic Chicken Wings", slug: "chicken-wings-honey", price: 6000, categoryId: easter.id, image: "Gemini_Generated_Image_j41es1j41es1j41e-removebg-preview.png" },
    { name: "Marinated Drumstick Bites", slug: "drumstick-bites", price: 6000, categoryId: easter.id, image: "Gemini_Generated_Image_sve31jsve31jsve3-removebg-preview.png" },

    // Spices
    { name: "Whole Purple Stir-Dust - Original", slug: "stir-dust-original", price: 2500, categoryId: spices.id, image: "Gemini_Generated_Image_j41es1j41es1j41e-removebg-preview.png" },
    { name: "Mixed Pepper Flakes", slug: "mixed-pepper-flakes-premium", price: 2500, categoryId: spices.id, image: "Gemini_Generated_Image_gzf290gzf290gzf2-removebg-preview.png" },
    { name: "Suya Spice", slug: "suya-spice-premium", price: 2500, categoryId: spices.id, image: "Gemini_Generated_Image_iidz78iidz78iidz-removebg-preview.png" },

    { name: "Zucchini", slug: "zucchini", price: 1500, categoryId: vegetables.id, image: "zucchini-transparent-background-png.webp" },
    { name: "White Sweet Potato", slug: "white-sweet-potato", price: 800, categoryId: vegetables.id, image: "120163_46375542-982d-4238-94bb-7f655d078858.webp" },
    { name: "Ube (African Pear)", slug: "ube-african-pear", price: 1000, categoryId: vegetables.id, image: "comacam-african-plum-safou-ube-176-oz.png" },
    { name: "Tete (Amaranth Greens)", slug: "tete-amaranth-greens", price: 1100, categoryId: vegetables.id, image: "120257_207c00c9-0a32-4f97-a246-7593bba45b19_800x.webp" },
    { name: "Sweet Corn", slug: "sweet-corn", price: 3000, categoryId: vegetables.id, image: "pngtree-pile-of-sweet-corn-kernels-isolated-on-transparent-background-png-image_16574129.png" },
    { name: "Spinach (1kg)", slug: "spinach-1kg", price: 5800, categoryId: vegetables.id, image: "pngimg.com-spinach_PNG33.png" },
    { name: "Shoko (Lagos Spinach)", slug: "shoko-lagos-spinach", price: 1100, categoryId: vegetables.id, image: "shoko1.jpg" },
    { name: "Kale", slug: "kale", price: 2000, categoryId: vegetables.id, image: "fresh-kale-leaves-on-a-clean-transparent-background-ready-to-be-used-in-healthy-cooking-and-salads-kale-transparent-background-free-png.webp" },
    { name: "Cauliflower", slug: "cauliflower", price: 4000, categoryId: vegetables.id, image: "cauliflower-r80bkgxtk5w0d297ig3mdeajnp5r94epwqb8d1bkig.webp" },
    { name: "Broccoli", slug: "broccoli", price: 3900, categoryId: vegetables.id, image: "pngimg.com-broccoli_PNG72870.png" },
    { name: "Onion", slug: "onion", price: 2500, categoryId: vegetables.id, image: "fresh-red-onions-arranged-on-a-clean-transparent-background-perfect-for-culinary-use-or-food-photography-red-onion-on-transparent-background-free-png.webp" },
    { name: "Carrots", slug: "carrots", price: 3500, categoryId: vegetables.id, image: "ai-generated-fresh-carrot-isolated-free-png.webp" },
    { name: "Green Cabbage", slug: "green-cabbage", price: 2000, categoryId: vegetables.id, image: "fresh-pointed-cabbage-isolated-on-a-transparent-background-showcasing-its-vibrant-green-leaves-and-natural-textures-pointed-cabbage-isolated-on-transparent-background-free-png.webp" },
    { name: "Avocado", slug: "avocado", price: 2000, categoryId: fruits.id, image: "Layer1_1946x_bdece6b5-db92-4b57-8d7a-7771d6a5218e.webp" },
    { name: "Bell Pepper", slug: "bell-pepper", price: 10500, categoryId: vegetables.id, image: "Green-Bell-Pepper-hero@2x.png" },
    { name: "Watermelon", slug: "watermelon", price: 4000, categoryId: fruits.id, image: "LDB0663-MVP_Retail-Product_Watermelon.png" },
    { name: "Pineapple", slug: "pineapple", price: 3000, categoryId: fruits.id, image: "pineaple.png" },
    { name: "Passion Fruit", slug: "passion-fruit", price: 5000, categoryId: fruits.id, image: "Pasted-20210219-110059_clipped_rev_1.webp" },
    { name: "Orange (per set)", slug: "orange-per-set", price: 1500, categoryId: fruits.id, image: "oranges.png" },
    { name: "Lemon", slug: "lemon", price: 2200, categoryId: fruits.id, image: "lemon.png" },
    { name: "Imported Tangerine", slug: "imported-tangerine", price: 7000, categoryId: fruits.id, image: "mandarins.png" },
    { name: "Coconut", slug: "coconut", price: 1200, categoryId: fruits.id, image: "coconut.png" },
    { name: "Blueberries", slug: "blueberries", price: 5500, categoryId: fruits.id, image: "Blueberries_53184788.png" },
    
    // Juices
    { name: "Cold Pressed Orange", slug: "cold-pressed-orange", price: 2500, categoryId: juices.id, image: "oranges.png" },
    { name: "Green Detox Juice", slug: "green-detox-juice", price: 3000, categoryId: juices.id, image: "fresh-kale-leaves-on-a-clean-transparent-background-ready-to-be-used-in-healthy-cooking-and-salads-kale-transparent-background-free-png.webp" },
    { name: "Watermelon Splash", slug: "watermelon-splash", price: 2000, categoryId: juices.id, image: "LDB0663-MVP_Retail-Product_Watermelon.png" },
    
    // Medleys
    { name: "Fruit Salad Medley", slug: "fruit-salad-medley", price: 4500, categoryId: medleys.id, image: "mandarins.png" },
    { name: "Rainbow Veggie Mix", slug: "rainbow-veggie-mix", price: 5000, categoryId: medleys.id, image: "vibrant-vegetable-harvest-colorful-collection-fresh-produce.png" },
    
    // Proteins
    { name: "Marinated Chicken Breasts", slug: "marinated-chicken-breasts", price: 6500, categoryId: proteins.id, image: "Gemini_Generated_Image_gzf290gzf290gzf2-removebg-preview.png" },
    { name: "Herb-Crusted Beef", slug: "herb-crusted-beef", price: 9500, categoryId: proteins.id, image: "Gemini_Generated_Image_iidz78iidz78iidz-removebg-preview.png" }
  ];

  for (const prod of productsData) {
    if (!prod.categoryId) continue;
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

  // Seed Shop Manager User
  const managerPassword = await bcrypt.hash('manager123', 10);
  await prisma.user.upsert({
    where: { email: 'manager@wholepurple.com' },
    update: {},
    create: {
      email: 'manager@wholepurple.com',
      name: 'Store Manager',
      password: managerPassword,
      role: 'SHOP_MANAGER',
    },
  });

  // Seed Client User
  const clientPassword = await bcrypt.hash('client123', 10);
  await prisma.user.upsert({
    where: { email: 'client@wholepurple.com' },
    update: {},
    create: {
      email: 'client@wholepurple.com',
      name: 'Test Customer',
      password: clientPassword,
      role: 'CLIENT',
    },
  });

  // Seed Editor User
  const editorPassword = await bcrypt.hash('editor123', 10);
  await prisma.user.upsert({
    where: { email: 'editor@wholepurple.com' },
    update: {},
    create: {
      email: 'editor@wholepurple.com',
      name: 'Lead Editor',
      password: editorPassword,
      role: 'EDITOR',
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
