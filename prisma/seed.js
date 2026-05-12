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
    { name: "Belly Brew", slug: "belly-brew", price: 1000, categoryId: teas.id, image: "Gemini_Generated_Image_54937w54937w5493-removebg-preview.png", description: "A soothing blend of ginger, peppermint, and chamomile designed to calm digestion and ease bloating after meals." },
    { name: "Fire Quench", slug: "fire-quench", price: 1000, categoryId: teas.id, image: "Gemini_Generated_Image_2h44b12h44b12h44-removebg-preview.png", description: "A cooling infusion of hibiscus, lemongrass, and mint, perfect for lowering body heat and providing a refreshing citrus burst." },
    { name: "Ruby Bloom", slug: "ruby-bloom", price: 1000, categoryId: teas.id, image: "Gemini_Generated_Image_b8xgwab8xgwab8xg-removebg-preview.png", description: "A floral and antioxidant-rich tea featuring dried rose petals and berries, promoting radiant skin and a calm mind." },
    { name: "Sugar Soothe", slug: "sugar-soothe", price: 1000, categoryId: teas.id, image: "Gemini_Generated_Image_n92lnon92lnon92l-removebg-preview.png", description: "A specialized blend of cinnamon and fenugreek to help maintain balanced blood sugar levels naturally." },
    
    // Real Scraped Products - Ready to Cook
    { name: "Marinated Chicken Breast - Classic", slug: "chicken-breast-classic", price: 4500, categoryId: readyToCook.id, image: "Gemini_Generated_Image_gzf290gzf290gzf2-removebg-preview.png", description: "Tender, farm-fresh chicken breast infused with our signature herb blend, ready to be grilled or pan-seared for a quick, healthy meal." },
    { name: "Marinated Chicken Breast - Garlic Herb Butter", slug: "chicken-breast-garlic", price: 4500, categoryId: readyToCook.id, image: "Gemini_Generated_Image_iidz78iidz78iidz-removebg-preview.png", description: "Succulent chicken breast smothered in a rich garlic and herb butter marinade, delivering a restaurant-quality experience at home." },
    { name: "Herb Buttered Fresh Sweet Corn (1kg)", slug: "herb-corn-1kg", price: 5000, categoryId: readyToCook.id, image: "pngtree-pile-of-sweet-corn-kernels-isolated-on-transparent-background-png-image_16574129.png", description: "Golden kernels of sweet corn tossed in a savory herb butter, perfect as a side dish or a snack." },
    { name: "Olive Oil & Herbed Sweet Corn", slug: "olive-oil-corn", price: 5000, categoryId: readyToCook.id, image: "pngtree-pile-of-sweet-corn-kernels-isolated-on-transparent-background-png-image_16574129.png", description: "A lighter take on our sweet corn, seasoned with premium olive oil and garden-fresh herbs." },
    
    // Easter Moments
    { name: "Tri-Colour Coleslaw (Jumbo) 1.5kg", slug: "jumbo-coleslaw", price: 17000, categoryId: easter.id, image: "vibrant-vegetable-harvest-colorful-collection-fresh-produce.png", description: "A vibrant mix of shredded cabbage and carrots in a creamy dressing, ideal for large family gatherings and festive celebrations." },
    { name: "Honey Ginger Garlic Chicken Thighs", slug: "chicken-thighs-honey", price: 6000, categoryId: easter.id, image: "Gemini_Generated_Image_gzf290gzf290gzf2-removebg-preview.png", description: "Juicy chicken thighs marinated in a sweet and savory honey-ginger-garlic sauce, offering a perfect balance of flavors." },
    { name: "Honey Ginger Garlic Chicken Wings", slug: "chicken-wings-honey", price: 6000, categoryId: easter.id, image: "Gemini_Generated_Image_j41es1j41es1j41e-removebg-preview.png", description: "Our popular honey-ginger-garlic marinade applied to tender chicken wings, great for appetizers or game nights." },
    { name: "Marinated Drumstick Bites", slug: "drumstick-bites", price: 6000, categoryId: easter.id, image: "Gemini_Generated_Image_sve31jsve31jsve3-removebg-preview.png", description: "Bite-sized chicken drumsticks infused with a bold spice blend, perfect for quick roasting and easy snacking." },

    // Spices
    { name: "Whole Purple Stir-Dust - Original", slug: "stir-dust-original", price: 2500, categoryId: spices.id, image: "Gemini_Generated_Image_j41es1j41es1j41e-removebg-preview.png", description: "Our signature all-purpose seasoning, crafted to elevate the flavor of any stir-fry or roasted dish with just a sprinkle." },
    { name: "Mixed Pepper Flakes", slug: "mixed-pepper-flakes-premium", price: 2500, categoryId: spices.id, image: "Gemini_Generated_Image_gzf290gzf290gzf2-removebg-preview.png", description: "A premium blend of dried chili flakes and bell peppers, adding a balanced heat and vibrant color to your cooking." },
    { name: "Suya Spice", slug: "suya-spice-premium", price: 2500, categoryId: spices.id, image: "Gemini_Generated_Image_iidz78iidz78iidz-removebg-preview.png", description: "An authentic, nutty, and spicy dry rub made from ground peanuts and traditional West African spices, perfect for meat and poultry." },
    { name: "Epic Suya", slug: "epic-suya", price: 3500, categoryId: spices.id, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=60", description: "Our extra-bold take on the classic Suya spice, featuring smoked peppers and enhanced aromatics for a truly intense flavor." },

    { name: "Zucchini", slug: "zucchini", price: 1500, categoryId: vegetables.id, image: "zucchini-transparent-background-png.webp", description: "Versatile and low-calorie, our zucchinis are perfect for spiralizing into noodles, grilling, or adding to baked goods." },
    { name: "White Sweet Potato", slug: "white-sweet-potato", price: 800, categoryId: vegetables.id, image: "120163_46375542-982d-4238-94bb-7f655d078858.webp", description: "A creamy, less-sweet alternative to the orange variety, excellent for mashing, roasting, or making fries." },
    { name: "Ube (African Pear)", slug: "ube-african-pear", price: 1000, categoryId: vegetables.id, image: "comacam-african-plum-safou-ube-176-oz.png", description: "A unique, buttery African delicacy. When roasted or boiled, it offers a creamy texture that pairs perfectly with roasted corn." },
    { name: "Tete (Amaranth Greens)", slug: "tete-amaranth-greens", price: 1100, categoryId: vegetables.id, image: "120257_207c00c9-0a32-4f97-a246-7593bba45b19_800x.webp", description: "Nutrient-dense leafy greens that are staple in traditional stews, rich in iron and vitamins." },
    { name: "Sweet Corn", slug: "sweet-corn", price: 3000, categoryId: vegetables.id, image: "pngtree-pile-of-sweet-corn-kernels-isolated-on-transparent-background-png-image_16574129.png", description: "Farm-fresh ears of corn, bursting with natural sweetness and perfect for boiling, roasting, or grilling." },
    { name: "Spinach (1kg)", slug: "spinach-1kg", price: 5800, categoryId: vegetables.id, image: "pngimg.com-spinach_PNG33.png", description: "Crisp, dark green leaves packed with nutrients, ideal for salads, smoothies, or sautéing." },
    { name: "Shoko (Lagos Spinach)", slug: "shoko-lagos-spinach", price: 1100, categoryId: vegetables.id, image: "shoko1.jpg", description: "A local favorite, these sturdy greens hold up well in long-simmered stews and are rich in essential minerals." },
    { name: "Kale", slug: "kale", price: 2000, categoryId: vegetables.id, image: "fresh-kale-leaves-on-a-clean-transparent-background-ready-to-be-used-in-healthy-cooking-and-salads-kale-transparent-background-free-png.webp", description: "The ultimate superfood green, our kale is perfect for crunchy chips, hearty salads, or nutrient-packed smoothies." },
    { name: "Cauliflower", slug: "cauliflower", price: 4000, categoryId: vegetables.id, image: "cauliflower-r80bkgxtk5w0d297ig3mdeajnp5r94epwqb8d1bkig.webp", description: "A versatile vegetable that can be transformed into rice, steaks, or even pizza crust, offering a low-carb alternative for your favorite meals." },
    { name: "Broccoli", slug: "broccoli", price: 3900, categoryId: vegetables.id, image: "pngimg.com-broccoli_PNG72870.png", description: "Vibrant green florets rich in fiber and vitamins, excellent for steaming, stir-frying, or enjoying raw with dip." },
    { name: "Onion", slug: "onion", price: 2500, categoryId: vegetables.id, image: "fresh-red-onions-arranged-on-a-clean-transparent-background-perfect-for-culinary-use-or-food-photography-red-onion-on-transparent-background-free-png.webp", description: "Essential for every kitchen, our onions provide a foundational flavor for almost any savory dish." },
    { name: "Carrots", slug: "carrots", price: 3500, categoryId: vegetables.id, image: "ai-generated-fresh-carrot-isolated-free-png.webp", description: "Carrots are crunchy, beta-carotene-rich vegetables bursting with Vitamin A for eye health and immunity. Their sweet flavor shines in salads, soups, or as a snack, making them a versatile, low-calorie option for any diet." },
    { name: "Bell Pepper", slug: "bell-pepper", price: 10500, categoryId: vegetables.id, image: "https://www.vhv.rs/dpng/d/444-4447463_free-to-use-green-pepper-transparents-bell-pepper.png", description: "Vibrant and crisp, our bell peppers are a powerhouse of antioxidants and Vitamin C. Whether sautéed, roasted, or enjoyed raw, they add a sweet crunch and a burst of color to any dish." },
    { name: "Watermelon", slug: "watermelon", price: 4000, categoryId: fruits.id, image: "LDB0663-MVP_Retail-Product_Watermelon.png", description: "The ultimate hydration hero. Our watermelons are picked at peak ripeness to ensure a sweet, juicy interior. Perfect for summer salads, fresh juices, or a refreshing snack on a sunny day." },
    { name: "Pineapple", slug: "pineapple", price: 3000, categoryId: fruits.id, image: "pineaple.png", description: "Sweet, tart, and incredibly juicy, our pineapples are harvested at the peak of ripeness for maximum tropical flavor." },
    { name: "Passion Fruit", slug: "passion-fruit", price: 5000, categoryId: fruits.id, image: "Pasted-20210219-110059_clipped_rev_1.webp", description: "An exotic, aromatic fruit with a unique tart flavor, perfect for desserts, juices, or as a vibrant topping." },
    { name: "Orange (per set)", slug: "orange-per-set", price: 1500, categoryId: fruits.id, image: "oranges.png", description: "Sun-ripened oranges bursting with Vitamin C and refreshing juice, ideal for snacking or fresh squeezing." },
    { name: "Lemon", slug: "lemon", price: 2200, categoryId: fruits.id, image: "lemon.png", description: "Zesty and bright, our lemons are essential for seasoning, baking, and creating refreshing drinks." },
    { name: "Imported Tangerine", slug: "imported-tangerine", price: 7000, categoryId: fruits.id, image: "mandarins.png", description: "Small, easy-to-peel citrus fruits with a sweet, concentrated flavor that kids and adults alike will love." },
    { name: "Coconut", slug: "coconut", price: 1200, categoryId: fruits.id, image: "coconut.png", description: "Fresh coconuts providing both refreshing water and creamy meat, a versatile tropical staple for sweet and savory dishes." },
    { name: "Blueberries", slug: "blueberries", price: 5500, categoryId: fruits.id, image: "Blueberries_53184788.png", description: "Antioxidant-packed berries that are perfect for breakfast bowls, baking, or snacking straight from the punnet." },
    
    // Juices
    { name: "Cold Pressed Orange", slug: "cold-pressed-orange", price: 2500, categoryId: juices.id, image: "oranges.png", description: "Pure, 100% natural orange juice pressed cold to preserve every bit of flavor and nutrition." },
    { name: "Green Detox Juice", slug: "green-detox-juice", price: 3000, categoryId: juices.id, image: "fresh-kale-leaves-on-a-clean-transparent-background-ready-to-be-used-in-healthy-cooking-and-salads-kale-transparent-background-free-png.webp", description: "A refreshing blend of kale, apple, and lemon, designed to cleanse and energize your body." },
    { name: "Watermelon Splash", slug: "watermelon-splash", price: 2000, categoryId: juices.id, image: "LDB0663-MVP_Retail-Product_Watermelon.png", description: "A hydrating and sweet juice made from our peak-season watermelons, perfect for a hot day." },
    
    // Medleys
    { name: "Fruit Salad Medley", slug: "fruit-salad-medley", price: 4500, categoryId: medleys.id, image: "mandarins.png", description: "A colorful mix of our freshest seasonal fruits, pre-cut and ready to enjoy as a healthy dessert or snack." },
    { name: "Rainbow Veggie Mix", slug: "rainbow-veggie-mix", price: 5000, categoryId: medleys.id, image: "vibrant-vegetable-harvest-colorful-collection-fresh-produce.png", description: "A pre-chopped blend of vibrant vegetables, perfect for a quick stir-fry or as a base for a healthy salad." },
    
    // Proteins
    { name: "Marinated Chicken Breasts", slug: "marinated-chicken-breasts", price: 6500, categoryId: proteins.id, image: "Gemini_Generated_Image_gzf290gzf290gzf2-removebg-preview.png", description: "Premium chicken breasts tenderized and infused with a versatile herb marinade, ready for any cooking method." },
    { name: "Herb-Crusted Beef", slug: "herb-crusted-beef", price: 9500, categoryId: proteins.id, image: "Gemini_Generated_Image_iidz78iidz78iidz-removebg-preview.png", description: "High-quality beef cuts coated in a savory herb crust, delivering a rich and satisfying protein option." },
    { name: "All Purpose Seasoning", slug: "all-purpose-seasoning", price: 1000, categoryId: spices.id, image: "Gemini_Generated_Image_sve31jsve31jsve3-removebg-preview.png", description: "A balanced blend of salt, herbs, and spices that makes everything from poultry to vegetables taste better." },
    { name: "Gourmet Garlic Pepper", slug: "gourmet-garlic-pepper", price: 1000, categoryId: spices.id, image: "Gemini_Generated_Image_iidz78iidz78iidz-removebg-preview.png", description: "A sophisticated mix of toasted garlic and cracked black pepper, perfect for steaks and roasted vegetables." },
    { name: "Kickin' Chicken Powder", slug: "kickin-chicken-powder", price: 1000, categoryId: spices.id, image: "", description: "A spicy and smoky dry rub designed specifically to give your fried or roasted chicken a bold flavor kick." },
    { name: "Mixed Pepper Flakes", slug: "mixed-pepper-flakes", price: 1000, categoryId: spices.id, image: "Gemini_Generated_Image_gzf290gzf290gzf2-removebg-preview.png", description: "Our essential blend of dried chili and bell pepper flakes, adding depth and heat to any dish." },
    { name: "Stir-Dust", slug: "stir-dust", price: 1000, categoryId: spices.id, image: "Gemini_Generated_Image_j41es1j41es1j41e-removebg-preview.png", description: "The original Stir-Dust blend, a multi-purpose flavor enhancer for vegetables and proteins alike." },
    { name: "Red Meat Simmer", slug: "red-meat-simmer", price: 1000, categoryId: spices.id, image: "", description: "A rich, aromatic seasoning blend crafted specifically for slow-cooked beef and goat stews." },
  ];

  for (const prod of productsData) {
    if (!prod.categoryId) continue;
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: { price: prod.price, image: prod.image, categoryId: prod.categoryId },
      create: prod,
    });
  }

  // Clean up old test users
  const oldTestEmails = [
    'admin@wholepurple.com',
    'manager@wholepurple.com',
    'client@wholepurple.com',
    'editor@wholepurple.com'
  ];
  await prisma.user.deleteMany({
    where: {
      email: { in: oldTestEmails }
    }
  });

  // Seed Admin User
  const adminPassword = await bcrypt.hash('WhP_Admin#2026!$', 10);
  await prisma.user.upsert({
    where: { email: 'management@wholepurple.com' },
    update: { password: adminPassword },
    create: {
      email: 'management@wholepurple.com',
      name: 'System Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Seed Shop Manager User
  const managerPassword = await bcrypt.hash('WhP_Store#2026!$', 10);
  await prisma.user.upsert({
    where: { email: 'store@wholepurple.com' },
    update: { password: managerPassword },
    create: {
      email: 'store@wholepurple.com',
      name: 'Store Manager',
      password: managerPassword,
      role: 'SHOP_MANAGER',
    },
  });

  // Seed Client User
  const clientPassword = await bcrypt.hash('WhP_Cust#2026!$', 10);
  await prisma.user.upsert({
    where: { email: 'customer@wholepurple.com' },
    update: { password: clientPassword },
    create: {
      email: 'customer@wholepurple.com',
      name: 'Customer',
      password: clientPassword,
      role: 'CLIENT',
    },
  });

  // Seed Editor User
  const editorPassword = await bcrypt.hash('WhP_Edit#2026!$', 10);
  await prisma.user.upsert({
    where: { email: 'content@wholepurple.com' },
    update: { password: editorPassword },
    create: {
      email: 'content@wholepurple.com',
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
